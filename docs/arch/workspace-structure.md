---
sidebar_position: 5
title: 工作区目录结构
description: 详细说明 LightClaw 数据目录 `~/.lightclaw/` 的结构和各文件的用途。
---

# 工作区目录结构

LightClaw 的所有运行时数据存储在 `~/.lightclaw/` 目录下。了解这个目录结构对于备份、迁移和调试非常重要。

## 目录树

```
~/.lightclaw/                              ← 数据根目录
│
├── lightclaw.json                         # ⭐ 核心配置文件
├── auth.json                              # 🔐 认证信息（密码哈希等）
├── jobs.json                              # ⏰ Cron 定时任务定义
├── chats.json                             # 💬 对话元数据索引
│
├── logs/                                  # 📋 运行日志
│   ├── lightclaw.log                      # 主日志文件
│   ├── lightclaw.log.1                    # 旋转日志
│   ├── error.log                          # 错误日志
│   └── agent/                             # Agent 执行详细日志
│       └── 2026-04-08/
│           ├── session_abc123.jsonl       # 会话级日志
│           └── session_def456.jsonl
│
└── workspace/                             ← 🧠 Agent 工作空间
    │
    ├── .env                               # 📦 持久化环境变量
    │   OPENAI_API_KEY=sk-xxx
    │   DASHSCOPE_API_KEY=sk-xxx
    │
    ├── AGENTS.md                          # 📜 Agent 行为规则
    ├── SOUL.md                            # ✨ 核心身份与原则
    ├── MEMORY.md                          # 🧠 长期记忆汇总
    ├── USER.md                            # 👤 用户画像
    │
    ├── skills/                            # 🧩 已安装的技能
    │   ├── builtin/                       # 内置技能（只读）
    │   │   ├── cron/
    │   │   ├── pdf/
    │   │   ├── file-reader/
    │   │   ├── skill-creator/
    │   │   └── install-skill/
    │   └── community/                     # 社区安装的技能
    │       ├── weather-query/
    │       └── translator/
    │
    ├── memory/                            # 💾 记忆数据存储
    │   ├── qdrant/                        # Qdrant 向量数据库文件
    │   │   ├── collection_name/
    │   │   └── storage.sqlite
    │   ├── summaries/                     # 对话摘要
    │   │   └── <session_id>.json
    │   └── facts.db                       # 结构化事实 SQLite 库
    │
    ├── sessions/                          # 🗂️ 会话状态
    │   └── <session_id>.json             # 各会话的状态快照
    │
    ├── uploads/                           # 📁 用户上传文件
    │   ├── images/
    │   ├── documents/
    │   └── temp/                          # 临时文件（可清理）
    │
    └── scenes/                            # 🎭 场景自定义配置
        └── custom/                        # 用户修改的场景配置
            ├── wechat_ops_override.yml
            └── stock_assistant_config.yml
```

## 核心文件详解

### `lightclaw.json` — 核心配置

```json
{
  "version": "0.0.57",
  "llm": {
    "provider": "openai",
    "api_key": "sk-xxx",
    "base_url": "https://api.openai.com/v1",
    "model": "gpt-4o",
    "temperature": 0.7,
    "max_tokens": 4096
  },
  "dashboard": {
    "enabled": true,
    "port": 80,
    "host": "127.0.0.1",
    "auth_enabled": true
  },
  "channels": {
    "feishu": { "...": "..." },
    "qq": { "...": "..." }
  },
  "memory": {
    "enabled": true,
    "auto_extract": true,
    "max_entries": 10000
  },
  "offline_mode": false
}
```

### `auth.json` — 认证信息

```json
{
  "password_hash": "$2b$12$xxxxxxxxxxxx",
  "salt": "random_salt_string",
  "created_at": "2026-04-08T00:00:00Z",
  "last_login": null
}
```

:::warning 安全提醒
`auth.json` 包含敏感认证信息，不要分享或提交到版本控制系统！
:::

### `jobs.json` — 定时任务

```json
[
  {
    "id": "job_001",
    "name": "每日晨报",
    "cron_expression": "0 8 * * *",
    "type": "agent",
    "prompt": "帮我总结今天的科技新闻",
    "enabled": true,
    "next_run": "2026-04-09T08:00:00Z",
    "created_at": "2026-04-01T10:00:00Z"
  }
]
```

### `.env` — 环境变量

```bash
# LLM API Keys
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
DASHSCOPE_API_KEY=sk-xxxxxxxxxxxxxxxx

# 渠道凭证
FEISHU_APP_ID=cli_xxx
FEISHU_APP_SECRET=xxx

# 自定义变量
MY_CUSTOM_VAR=some_value
```

### `AGENTS.md` — Agent 行为规则

```markdown
# Agent 行为规范

## 核心原则
1. 始终保持礼貌和专业
2. 不确定的事实要标注不确定性
3. 保护用户隐私

## 回复规范
- 默认使用中文回复
- 技术术语保留英文原文
- 代码块标注语言类型
- 列表不超过 7 个项目

## 工具使用规范
- Shell 命令前先解释目的
- 浏览器操作要有明确目标
- 文件操作前确认路径

## 记忆提取规则
- 提取显式的偏好声明
- 记录重要的决策结果
- 忽略临时性闲聊内容
```

### `SOUL.md` — 核心身份

```markdown
# LightClaw 核心身份

我是 LightClaw，一个 AI 个人助手。

## 我的使命
帮助用户更高效地完成工作，更轻松地获取信息，更愉快地学习成长。

## 我的特点
- 知识广博但谦逊
- 乐于助人但不越界
- 幽默风趣但专业可靠
- 记忆力好（越用越懂你）

## 我的边界
- 不做违法的事情
- 不替用户做重大决策
- 不编造不确定的事实
- 明确区分事实和观点
```

### `USER.md` — 用户画像

详见 [记忆系统](/docs/config/memory-system) 中的用户画像部分。

## 备份与恢复

### 备份关键数据

```bash
# 打包整个工作区（推荐）
tar -czvf lightclaw-backup-$(date +%Y%m%d).tar.gz \
    ~/.lightclaw/

# 或选择性备份关键文件
cp ~/.lightclaw/lightclaw.json ./backup/
cp ~/.lightclaw/auth.json ./backup/
cp ~/.lightclaw/jobs.json ./backup/
cp -r ~/.lightclaw/workspace ./backup/
```

### 恢复

```bash
# 停止服务
lightclaw stop

# 解压备份
tar -xzvf lightclaw-backup-20260408.tar.gz -C ~/

# 重启服务
lightclaw start
```

### 迁移到新机器

```bash
# 1. 在旧机器上打包
tar -czvf lightclaw-migration.tar.gz ~/.lightclaw/

# 2. 传输到新机器
scp lightclaw-migration.tar.gz user@new-machine:~

# 3. 在新机器上解压
ssh user@new-machine
tar -xzvf lightclaw-migration.tar.gz -C ~/

# 4. 安装 LightClaw
curl -fsSL https://finnie-1258344699.cos.ap-guangzhou.myqcloud.com/install.sh | bash

# 5. 启动（配置已在备份中）
lightclaw run
```
