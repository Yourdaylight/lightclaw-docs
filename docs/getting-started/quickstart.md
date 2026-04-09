---
sidebar_position: 3
title: 快速开始
description: 三步完成 LightClaw 的初始化、配置和启动，立即体验 AI 个人助手。
---

# 快速开始

按照以下三个步骤，即可完成 LightClaw 的初始化并开始使用。

## 第一步：初始化工作区

```bash
lightclaw init
```

交互式向导会引导你完成以下配置：

1. **选择界面语言** — 中文 / English
2. **选择 LLM 供应商** — OpenAI / DashScope / Ollama 等
3. **填写 API Key** — 如果选择了需要认证的供应商
4. **选择默认模型** — 根据供应商选择合适的模型

:::tip 小提示
如果之后想修改配置，可以随时运行 `lightclaw config` 重新配置。
:::

## 第二步：启动服务

```bash
# 默认启动（端口 80）
lightclaw run

# 自定义主机和端口
lightclaw run --host 0.0.0.0 --port 3000

# 注册为系统服务（开机自启）
lightclaw start --host 0.0.0.0 --port 80
```

启动成功后，你会看到类似输出：

```
╔══════════════════════════════════════╗
║       🐾 LightClaw 已启动!          ║
║                                      ║
║  Dashboard: http://localhost:80      ║
║  API Docs:   http://localhost:80/docs ║
╚══════════════════════════════════════╝
```

## 第三步：开始对话

打开浏览器访问 `http://localhost:80`（或你指定的端口），进入 Web Dashboard 开始聊天！

<!-- ![Dashboard Preview](../../assets/dashboard-preview.png) -->

## 连接更多渠道

LightClaw 支持通过多个渠道同时使用：

```bash
# 安装飞书渠道
lightclaw channels install feishu

# 安装 QQ 渠道
lightclaw channels install qq

# 查看所有可用渠道
lightclaw channels install --help
```

## 基本使用示例

### 日常问答

> **你**: 今天天气怎么样？

LightClaw 会调用浏览器工具查询当前天气并回答。

### 文件处理

> **你**: 帮我总结一下这个 PDF 的内容

上传 PDF 文件后，LightClaw 会自动提取内容并生成摘要。

### 定时任务

> **你**: 每天早上 8 点给我推送科技新闻

```bash
# 或者使用 CLI 直接创建
lightclaw cron create \
  --name "每日科技新闻" \
  --cron "0 8 * * *" \
  --message "帮我总结今天的科技新闻"
```

### 浏览器操作

> **你**: 帮我去 GitHub 看看今天有什么热门项目

LightClaw 会使用 Playwright 打开浏览器，浏览 GitHub Trending 页面并汇报结果。

## 下一步

- [内置场景](/docs/user-guide/scenes) - 了解 6 大深度打磨场景
- [技能系统](/docs/user-guide/skills) - 探索内置和自定义技能
- [Web Dashboard](/docs/user-guide/dashboard) - 深入了解 Dashboard 功能
- [CLI 参考](/docs/user-guide/cli-reference) - 完整的命令行手册
