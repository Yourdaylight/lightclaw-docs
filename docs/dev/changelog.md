---
sidebar_position: 5
title: 更新日志
description: LightClaw 各版本的更新记录。
---

# 更新日志

本文档记录了 LightClaw 的重要变更。

## v0.0.57 (2026-04-08)

### 🆕 新增
- 新增 MLX 供应商支持（macOS Apple Silicon 本地推理）
- 新增视频 TTS 多引擎支持（Edge-TTS / Kokoro / XTTS）
- 新增 QQ 语音能力（graiax-silkcoder）
- MCP 协议升级至 v1.26

### 🔧 改进
- fastembed 版本锁定 `<0.8`，解决兼容性问题
- onnxruntime 版本上限提升至 `<1.24`
- Qdrant protobuf 兼容性修复

---

## v0.0.23 (2026-03-20)

### 🆕 新增
- 新增 **智能教育助手** 场景（第 6 个内置场景）
- 新增 **视频剪辑助手** 场景
- 新增 SkillHub 技能市场基础架构
- 新增 `skill-creator` 内置技能

### 🔧 改进
- 记忆提取准确度提升
- 多模型路由策略优化
- Dashboard UI 全面升级

---

## v0.0.17 (2026-03-18)

### 🆕 新增
- 新增 **热点新闻趋势** 场景
- 新增 **轻代码开发** 场景
- 新增 Discord 渠道支持
- 新增 `file-reader` 内置技能

---

## v0.0.10 (2026-03-05)

### 🆕 新增
- 新增 **证券市场助手** 场景（akshare 1090+ 数据接口）
- 新增 **微信公众号运营** 场景
- 新增飞书、QQ、钉钉渠道支持
- 新增 Web Dashboard V1

### 🔧 改进
- ReAct Agent 引擎优化
- 记忆系统三层架构上线

---

## v0.0.1 (2026-03-17)

🎉 **首次公开发布**

- 🎮 6 个内置场景：微信公众号运营、证券市场助手、热点新闻趋势、轻代码开发、视频剪辑助手、智能教育助手
- 🧠 多层记忆系统：长期记忆 + 用户画像 + 对话摘要
- 💰 智能多模型路由引擎，大幅降低 Token 消耗
- 🔌 多渠道支持：飞书、QQ、钉钉、Discord、Web Dashboard
- 🧩 5 个内置技能 + SkillHub 技能市场 + MCP 协议集成
- 🏠 本地优先架构，支持完全离线模式（Ollama / LLaMA-CPP / MLX）
- 🖥️ Web Dashboard：对话、会话管理、配置、技能管理、定时任务
- 📄 MIT 开源许可证
