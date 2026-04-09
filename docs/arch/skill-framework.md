---
sidebar_position: 3
title: 技能框架
description: 了解 LightClaw 的技能（Skill）框架设计，包括技能结构、注册机制和执行流程。
---

# 技能框架

技能是 LightClaw 能力的基本单元。技能框架提供了统一的定义、注册、发现和执行机制。

## 技能定义结构

每个技能是一个独立的模块，包含以下要素：

```yaml
# skill.yaml — 技能元数据定义示例
name: pdf-toolkit
version: "1.0.0"
author: OrcaKit Team
description: PDF 文件全功能处理工具
category: utility
tags:
  - pdf
  - file-processing
  - document

triggers:
  - "PDF"
  - "pdf"
  - "合并"
  - "拆分"
  - "提取"

permissions:
  required:
    - file-read
    - file-write
optional:
    - network-download

config:
  max_file_size_mb: 50
  supported_formats: [".pdf"]
  ocr_enabled: true
```

```python
# skill.py — 技能主逻辑示例
from lightclaw.agent.skills.base import BaseSkill, tool

class PDFToolkit(BaseSkill):
    """PDF 处理技能"""
    
    name = "pdf"
    description = "PDF 全功能处理工具"
    
    @tool
    async def extract_text(self, filepath: str) -> str:
        """提取 PDF 文件的文本内容
        
        Args:
            filepath: PDF 文件路径
            
        Returns:
            提取出的文本内容
        """
        import pymupdf
        doc = pymupdf.open(filepath)
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    
    @tool
    async def merge_pdfs(self, filepaths: list[str], output_path: str) -> str:
        """合并多个 PDF 文件为一个
        
        Args:
            filepaths: 要合并的 PDF 文件路径列表
            output_path: 输出文件路径
            
        Returns:
            合并后的文件路径
        """
        import pymupdf
        merged = pymupdf.open()
        for fp in filepaths:
            doc = pymupdf.open(fp)
            merged.insert_pdf(doc)
        merged.save(output_path)
        return output_path
    
    @tool
    async def split_pdf(
        self, 
        filepath: str, 
        page_ranges: list[str],
        output_dir: str
    ) -> list[str]:
        """拆分 PDF 文件
        
        Args:
            filepath: PDF 文件路径
            page_ranges: 页码范围列表，如 ["1-5", "6-10"]
            output_dir: 输出目录
            
        Returns:
            拆分后的文件路径列表
        """
        # ... 实现细节
        pass
```

## 技能分类

```mermaid
graph TB
    subgraph "技能生态"
        subgraph "全局技能 Global"
            G1[cron 定时任务]
            G2[pdf PDF处理]
            G3[file-reader 文件读取]
            G4[skill-creator 技能开发]
            G5[install-skill 技能安装]
        end
        
        subgraph "场景技能 Scene"
            S1[公众号运营]
            S2[证券分析]
            S3[新闻聚合]
            S4[代码生成]
            S5[视频制作]
            S6[智能教育]
        end
        
        subgraph "社区技能 Community"
            C1[翻译]
            C2[天气查询]
            C3[邮件管理]
            C4[...更多]
        end
    end
    
    style G1 fill:#3498db,color:#fff
    style G2 fill:#3498db,color:#fff
    style G3 fill:#3498db,color:#fff
    style G4 fill:#3498db,color:#fff
    style G5 fill:#3498db,color:#fff
    
    style S1 fill:#e74c3c,color:#fff
    style S2 fill:#e74c3c,color:#fff
    style S3 fill:#e74c3c,color:#fff
    style S4 fill:#e74c3c,color:#fff
    style S5 fill:#e74c3c,color:#fff
    style S6 fill:#e74c3c,color:#fff
    
    style C1 fill:#27ae60,color:#fff
    style C2 fill:#27ae60,color:#fff
    style C3 fill:#27ae60,color:#fff
    style C4 fill:#27ae60,color:#fff
```

## 技能注册机制

### 注册流程

```mermaid
sequenceDiagram
    participant D as 开发者
    participant F as Skill Framework
    participant R as Registry
    participant A as Agent Engine
    
    D->>F: 定义 Skill 类
    D->>R: register_skill(MySkill)
    R->>R: 解析 metadata
    R->>R: 验证依赖
    R-->>D: 注册成功
    
    Note over A: 运行时...
    
    A->>R: get_available_tools()
    R->>A: 返回工具列表
    
    A->>F: invoke("tool_name", args)
    F->>F: 权限检查
    F->>F: 参数验证
    F->>F: 执行工具逻辑
    F-->>A: 返回结果
```

### 自动发现

技能框架支持多种发现方式：

```python
# 1. 内置技能：在 agent/skills/ 目录下自动扫描
# src/lightclaw/agent/skills/
# ├── __init__.py
# ├── cron/
# ├── pdf/
# ├── file_reader/
# ├── skill_creator/
# └── install_skill/

# 2. 场景技能：随场景激活
# src/lightclaw/agent/scenes/wechat_ops/skills/

# 3. 社区技能：从 SkillHub 安装后注册
# ~/.lightclaw/workspace/skills/community/
```

## 技能执行生命周期

```mermaid
stateDiagram-v2
    [*] --> Registered: 注册
    Registered --> Loaded: 加载
    Loaded --> Enabled: 启用
    Enabled --> Triggered: 触发条件匹配
    Triggered --> Validating: 参数验证
    Validating --> Executing: 验证通过
    Validating --> Failed: 验证失败
    Executing --> Completed: 执行成功
    Executing --> Error: 执行异常
    Completed --> [*]
    Failed --> [*]: 返回错误信息
    Error --> [*]: 返回错误信息
    Enabled --> Disabled: 手动禁用
    Disabled --> Enabled: 重新启用
```

## 工具装饰器

`@tool` 装饰器将普通 Python 函数转化为 Agent 可调用的工具：

```python
@tool(
    name="calculate_bmi",
    description="计算身体质量指数 (BMI)",
    parameters={
        "weight_kg": {"type": "number", "description": "体重（公斤）"},
        "height_m": {"type": "number", "description": "身高（米）"},
    },
)
async def calculate_bmi(weight_kg: float, height_m: float) -> dict:
    bmi = weight_kg / (height_m ** 2)
    category = categorize_bmi(bmi)
    return {
        "bmi": round(bmi, 1),
        "category": category,
        "advice": get_health_advice(category),
    }
```

`@tool` 装饰器的功能：
1. **Schema 生成** — 自动生成 JSON Schema 给 LLM
2. **类型校验** — 运行时参数类型检查
3. **权限拦截** — 检查是否具备所需权限
4. **日志记录** — 自动记录调用日志和耗时
5. **错误包装** — 统一错误格式

## SkillHub 技能市场

### 发布流程

```bash
# 1. 打包技能
lightclaw skill package my-skill

# 2. 测试评估
lightclaw skill evaluate my-skill

# 3. 发布到 SkillHub
lightclaw skill publish my-skill
```

### 安装社区技能

```bash
# 从 SkillHub 安装
lightclaw skills install weather-query
lightclaw skills install email-manager

# 查看技能详情
lightclaw skills info weather-query

# 更新已安装技能
lightclaw skills update --all
```

### 安全审核

所有发布到 SkillHub 的技能都经过安全审核：

| 审核项 | 说明 |
|--------|------|
| 代码审计 | 无恶意代码、无后门 |
| 权限检查 | 只申请必要的权限 |
| 依赖审查 | 无已知漏洞依赖 |
| 功能测试 | 核心功能正常工作 |
