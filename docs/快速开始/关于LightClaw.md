---
sidebar_position: 1
slug: /
description: LightClaw 是一个开源的 AI 个人助手，支持本地部署与云托管。更省钱、越用越懂你、开箱即用。
---

# LightClaw

<p align="center">
  <strong>更易用、更省钱、越用越懂你的 AI 个人助手</strong>
</p>

<p align="center">
  <a href="https://www.python.org/downloads/"><img alt="Python 3.11+" src="https://img.shields.io/badge/python-3.11%2B-blue?logo=python&logoColor=white" /></a>
  <a href="https://github.com/orcakit/finnie/blob/main/LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-green" /></a>
  <a href="https://github.com/orcakit/finnie/releases"><img alt="Version" src="https://img.shields.io/badge/version-0.0.57-orange" /></a>
  <a href="https://github.com/orcakit/finnie"><img alt="GitHub stars" src="https://img.shields.io/github/stars/orcakit/finnie?style=social" /></a>
</p>

**LightClaw** 是一个开源的 AI 个人助手，支持本地部署与云托管。相比同类项目，它聚焦三个核心差异：**省钱** — Token 消耗大幅降低；**懂你** — 内置多层记忆系统，越用越贴合你的习惯；**好用** — 内置场景开箱即用，零配置直接上手。

通过飞书、QQ、微信、Web Dashboard 等渠道随时对话，所有能力由可扩展的 **Skills（技能）** 系统和 **MCP** 协议驱动。

## 核心特性

| 特性 | 说明 |
|------|------|
| 💰 **更省钱** | 智能多模型路由引擎，根据任务复杂度自动分配最经济的模型；高效记忆管理大幅缩减上下文长度，Token 消耗降低一个数量级 |
| 🧠 **越用越懂你** | 长期记忆提取 + 用户画像 + 对话摘要，三层记忆架构让助手越来越贴合你的习惯 |
| 🎮 **内置场景** | 6 个深度打磨场景：公众号运营、证券分析、新闻追踪、轻代码开发、AI 视频生成、智能教育 |
| 🔌 **多渠道** | 飞书 · QQ · 钉钉 · Discord · Web Dashboard — 一个助手覆盖所有对话入口 |
| 🧩 **可扩展技能** | 5 个内置技能 + SkillHub 技能市场 + MCP 协议无限扩展 |
| 🏠 **本地优先** | 所有数据存储在 `~/.lightclaw/`，支持本地模型（Ollama / LLaMA-CPP / MLX）完全离线运行 |

## 技术栈

| 层级 | 技术 |
|------|------|
| **语言** | Python 3.11+ |
| **Agent 框架** | LangChain + LangGraph（ReAct Agent） |
| **API 服务** | FastAPI + Uvicorn |
| **前端** | React + TypeScript + Vite + Ant Design |
| **记忆系统** | Qdrant + SQLite FTS5 + 结构化事实系统 |
| **LLM 供应商** | OpenAI · DashScope（千问） · Ollama · LLaMA-CPP · MLX |
| **浏览器自动化** | Playwright |
| **MCP** | Model Context Protocol（stdio + HTTP + SSE） |

## 快速开始

:::info 前置条件
- Python **3.11 – 3.13**
- [uv](https://github.com/astral-sh/uv)（推荐）或 pip
:::

```bash title="一键安装"
# macOS / Linux
curl -fsSL https://finnie-1258344699.cos.ap-guangzhou.myqcloud.com/install.sh | bash

# 初始化配置
source ~/.zshrc   # Zsh 用户
# 或 source ~/.bashrc  # Bash 用户

# 初始化工作区
lightclaw init

# 启动服务
lightclaw run
```

打开浏览器访问 Web Dashboard，开始与 LightClaw 对话吧！

## 下一步

- [安装指南](/docs/快速开始/安装指南) - 详细安装说明
- [内置场景](/docs/用户指南/核心功能/内置场景) - 了解 6 大深度打磨场景
- [技能系统](/docs/用户指南/核心功能/技能系统) - 探索内置和自定义技能
- [配置指南](/docs/配置指南/基础配置/LLM供应商配置) - 配置 LLM 供应商和渠道
- [架构设计](/docs/架构设计/核心架构/系统架构概览) - 深入了解系统架构

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/orcakit">OrcaKit 团队</a>
</p>
