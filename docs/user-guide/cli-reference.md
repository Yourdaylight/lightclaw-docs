---
sidebar_position: 4
title: CLI 命令参考
description: LightClaw CLI 完整命令参考手册，包括所有子命令和选项。
---

# CLI 命令参考

`lightclaw` 是 LightClaw 的命令行工具，用于初始化、配置、启动和管理服务。

## 命令树

```bash
$ lightclaw --help

Usage: lightclaw [OPTIONS] COMMAND [ARGS]...

  LightClaw CLI - AI 个人助手命令行工具

Options:
  --version             Show version and exit
  --help                Show this message and exit

Commands:
  init                  Initialize workspace at ~/.lightclaw/
  config                Interactive re-configuration
  run                   Start LightClaw (API + Dashboard + channels)
  start                 Register as system service and start
  stop                  Stop system service
  restart               Restart system service
  channels              Install and manage chat channels
  skills                Manage skills
  models                Manage LLM providers
  cron                  Manage scheduled tasks
  chats                 Manage conversation history
  env                   Manage environment variables
  clean                 Clean temp files and caches
  uninstall             Uninstall and clean workspace
  scene                 Switch between built-in scenes
  auth                  Authentication management
  mcp                   Manage MCP tool services
```

## 核心命令

### `init` — 初始化工作区

```bash
lightclaw init [--force] [--language zh|en]
```

| 选项 | 说明 |
|------|------|
| `--force` | 强制重新初始化（覆盖现有配置） |
| `--language` | 指定界面语言 |

创建 `~/.lightclaw/` 目录及必要文件。

### `run` — 启动服务

```bash
lightclaw run [--host HOST] [--port PORT] [--debug] [--workers N]
```

| 选项 | 说明 |
|------|------|
| `--host` | 绑定地址（默认 `127.0.0.1`） |
| `--port` | 监听端口（默认 `80`） |
| `--debug` | 开启调试模式 |
| `--workers` | Worker 进程数 |

### `start` / `stop` / `restart` — 服务管理

```bash
# 注册为系统服务并启动
lightclaw start [--host HOST] [--port PORT]

# 停止服务
lightclaw stop

# 重启服务
lightclaw restart
```

### `config` — 重新配置

```bash
lightclaw config
```

启动交互式向导，重新配置 LLM 供应商、模型等。

## 渠道管理

### `channels` — 渠道命令

```bash
# 查看可用渠道
lightclaw channels install --help

# 安装飞书
lightclaw channels install feishu

# 安装 QQ
lightclaw channels install qq

# 安装钉钉
lightclaw channels install dingtalk

# 安装 Discord
lightclaw channels install discord
```

## 模型管理

### `models` — LLM 模型命令

```bash
# 查看当前配置的模型
lightclaw models

# 切换模型
lightclaw models switch

# 查看所有可用模型
lightclaw models list

# 添加新供应商
lightclaw models add-provider
```

## 技能管理

### `skills` — 技能命令

```bash
# 列出已安装技能
lightclaw skills list

# 安装技能
lightclaw skills install <skill-name>

# 搜索技能
lightclaw skills search <keyword>

# 创建新技能
lightclaw skills create <skill-name>

# 更新所有技能
lightclaw skills update
```

## 定时任务

### `cron` — Cron 任务命令

```bash
# 列出所有任务
lightclaw cron list

# 创建任务（Agent 模式）
lightclaw cron create --name NAME --cron CRON --prompt PROMPT

# 创建任务（固定消息）
lightclaw cron create --name NAME --cron CRON --message MESSAGE

# 查看任务详情
lightclaw cron show <task-id>

# 暂停任务
lightclaw cron pause <task-id>

# 恢复任务
lightclaw cron resume <task-id>

# 删除任务
lightclaw cron delete <task-id>

# 查看执行日志
lightclaw cron logs <task-id>
```

## 对话管理

### `chats` — 对话历史命令

```bash
# 列出最近的会话
lightclaw chats list

# 导出会话
lightclaw chats export <session-id>

# 清空会话
lightclaw chats clear [--all]

# 搜索对话内容
lightclaw chats search <keyword>
```

## 环境变量

### `env` — 环境变量命令

```bash
# 列出所有环境变量
lightclaw env list

# 设置环境变量
lightclaw env set KEY VALUE

# 删除环境变量
lightclaw env unset KEY

# 从文件导入
lightclaw env import FILE.env
```

## 场景管理

### `scene` — 场景命令

```bash
# 列出所有场景
lightclaw scene list

# 切换场景
lightclaw scene use <scene-name>

# 查看当前场景
lightclaw scene current
```

## MCP 管理

### `mcp` — MCP 命令

```bash
# 列出已注册的 MCP 服务
lightclaw mcp list

# 添加 stdio 类型 MCP
lightclaw mcp add NAME --command CMD --args ARGS... --transport stdio

# 添加 HTTP 类型 MCP
lightclaw mcp add NAME --url URL --transport sse

# 移除 MCP 服务
lightclaw mcp remove NAME

# 测试 MCP 连接
lightclaw mcp test NAME
```

## 维护命令

### `clean` — 清理缓存

```bash
# 清理临时文件和缓存
lightclaw clean [--deep]

# --deep 同时清理日志和旧会话
```

### `uninstall` — 卸载

```bash
# 完全卸载 LightClaw
lightclaw uninstall [--keep-data]

# --keep-data 保留 ~/.lightclaw/ 目录
```

## 全局选项

| 选项 | 说明 |
|------|------|
| `--version` | 显示版本号 |
| `--help` | 显示帮助信息 |
| `-v, --verbose` | 详细输出模式 |
| `--no-color` | 禁止彩色输出 |
| `--config PATH` | 指定配置文件路径 |
