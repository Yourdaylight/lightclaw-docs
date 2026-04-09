# LightClaw Docs

LightClaw 官方文档站，基于 [Docusaurus 3](https://docusaurus.io/) 构建。

线上地址：**https://lightclaw.clawtown.cn**

---

## 本地开发

```bash
npm install
npm start
```

浏览器打开 http://localhost:3000 即可预览。

---

## 内容维护

Sidebar 由目录和文件名自动生成，**目录名 = 分组名，文件名 = 文档名，零配置**。

### 新增文档

在对应目录下建中文 `.md` 文件，sidebar 自动出现：

```bash
vim docs/配置指南/基础配置/渠道接入配置.md
```

`sidebar_position` 控制排序（越小越靠前），不写则按文件名字母序：

```markdown
---
sidebar_position: 3
---

正文内容...
```

### 新增分类

建一个中文目录，往里放 `.md` 文件即可：

```bash
mkdir -p docs/用户指南/进阶技巧
vim docs/用户指南/进阶技巧/自定义Prompt.md
```

sidebar 自动显示「进阶技巧」分组和「自定义 Prompt」文档。

### 修改首页

编辑 `src/pages/index.tsx`，样式在 `src/css/custom.css`。

---

## 部署

```bash
./deploy.sh
```

### 完整更新流程

```bash
# 1. 编辑或新增文档
vim docs/配置指南/基础配置/渠道接入配置.md

# 2. 本地预览确认
npm start

# 3. 一键上线
./deploy.sh

# 4. 推送到 git
git add .
git commit -m "docs: 新增渠道接入配置文档"
git push
```
