---
sidebar_position: 2
title: Agent 引擎
description: 了解 LightClaw 的 ReAct Agent 引擎实现，包括思考-行动循环、工具调用和错误处理。
---

# Agent 引擎

LightClaw 基于 **LangGraph** 框架实现了 **ReAct (Reasoning + Acting)** 智能体，这是系统的核心"大脑"。

## ReAct 模式

ReAct 是一种结合推理和行动的 Agent 范式：

```mermaid
flowchart TD
    A[接收用户输入] --> T[Thought: 分析用户意图]
    T --> D{需要工具?}
    
    D -->|是| AT[Action: 选择并调用工具]
    AT --> O[Observation: 获取工具结果]
    O --> T
    
    D -->|否| AN[Answer: 直接生成回复]
    AN --> END[返回结果]
    
    T -->|达到最大轮数| AN
    
    style T fill:#3498db,color:#fff
    style AT fill:#e74c3c,color:#fff
    style O fill:#f39c12,color:#000
    style AN fill:#27ae60,color:#fff
```

## 核心流程

### 1. 输入处理

```python
# 伪代码示意
async def handle_message(user_input: str, channel: str):
    # 1. 构建上下文
    context = await build_context(
        user_input=user_input,
        channel=channel,
        memory=await memory_system.retrieve(user_input),
        scene=current_scene,
    )
    
    # 2. 创建 Agent 实例
    agent = create_react_agent(
        llm=get_llm_provider(),
        tools=get_available_tools(scene),
        system_prompt=get_scene_prompt(current_scene),
    )
    
    # 3. 运行 ReAct 循环
    result = await agent.invoke(context)
    
    # 4. 更新记忆
    await memory_system.extract_and_store(
        conversation=context + result,
    )
    
    # 5. 返回回复
    return format_response(result, channel)
```

### 2. 工具选择与调用

Agent 通过以下步骤决定使用哪个工具：

```mermaid
flowchart LR
    P[Prompt] --> L[LLM 推理]
    L --> TD[Tool Decision]
    TD --> TC[Tool Call]
    TC --> TE[Tool Execution]
    TE --> OR[Observation Result]
    OR --> P2[下一轮 Prompt]
    
    style TD fill:#9b59b6,color:#fff
    style TC fill:#e67e22,color:#fff
    style TE fill:#16a085,color:#fff
```

### 3. 错误处理

```mermaid
flowchart TD
    E[工具调用出错] --> ET{错误类型}
    
    ET -->|网络超时| R1[自动重试<br/>最多 3 次]
    ET -->|参数错误| R2[修正参数后重试]
    ET -->|权限不足| R3[告知用户并跳过]
    ET -->|未知错误| R4[降级为纯文本回复]
    
    R1 --> OK{重试成功?}
    R2 --> OK
    OK -->|是| CONT[继续循环]
    OK -->|否| FALLBACK[降级处理]
    R3 --> FALLBACK
    R4 --> FALLBACK
```

## Prompt 工程

### 系统 Prompt 结构

LightClaw 使用分层的 Prompt 架构：

```
┌─────────────────────────────────────┐
│ SOUL.md - 核心身份和原则             │  ← 最底层，始终生效
├─────────────────────────────────────┤
│ AGENTS.md - 行为规则和约束           │  ← 全局行为规范
├─────────────────────────────────────┤
│ Scene Prompt - 场景专属人格          │  ← 当前场景设定
├─────────────────────────────────────┤
│ USER.md - 用户画像信息               │  ← 动态注入
├─────────────────────────────────────┤
│ MEMORY.md - 相关记忆摘要             │  ← 检索后动态注入
├─────────────────────────────────────┤
│ Current Conversation - 当前对话      │  ← 实时上下文
└─────────────────────────────────────┘
```

### 场景 Prompt 示例

以证券市场助手为例：

```markdown
# 角色
你是「老钱」，一位经验丰富的证券分析师。

# 性格特点
- 专业但不刻板，偶尔带点幽默感
- 数据驱动，结论必须有数据支撑
- 风险意识强，永远提示风险

# 能力边界
- 你可以分析技术指标（MA/MACD/RSI/BOLL/KDJ）
- 你可以查询实时行情和历史数据
- 你不能提供投资建议或预测涨跌
- 你必须明确声明"不构成投资建议"

# 回复风格
- 关键数据加粗显示
- 使用表格对比多只股票
- 技术分析附图说明
```

## 性能优化

### Token 预算控制

```mermaid
pie title Token 分配策略
    "系统 Prompt" : 15
    "记忆上下文" : 20
    "对话历史" : 40
    "工具 Schema" : 10
    "输出预留" : 15
```

### 上下文窗口管理

```python
class ContextManager:
    def __init__(self, max_tokens: int = 8000):
        self.max_tokens = max_tokens
        self.budget = {
            'system': int(max_tokens * 0.15),
            'memory': int(max_tokens * 0.20),
            'history': int(max_tokens * 0.40),
            'tools_schema': int(max_tokens * 0.10),
            'output': int(max_tokens * 0.15),
        }
    
    def trim_history(self, messages):
        """裁剪历史对话，保留最近 N 轮"""
        token_count = count_tokens(messages)
        if token_count > self.budget['history']:
            # 保留系统消息 + 最近 N 轮
            return keep_recent_rounds(messages, n=10)
        return messages
```

## 并发处理

LightClaw 支持多用户并发请求：

```mermaid
sequenceDiagram
    participant U1 as 用户 A
    participant U2 as 用户 B
    participant Q as Request Queue
    participant W as Worker Pool
    participant L as LLM Provider
    
    U1->>Q: 请求 1
    U2->>Q: 请求 2
    
    Q->>W: 分配 Worker 1
    Q->>W: 分配 Worker 2
    
    par 并行处理
        W->>L: 处理请求 1
    and
        W->>L: 处理请求 2
    end
    
    L-->>W: 响应 1
    L-->>W: 响应 2
    
    W-->>U1: 回复 A
    W-->>U2: 回复 B
```

每个用户的会话状态独立隔离，互不影响。
