import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    // ── 快速开始 ──
    {
      type: 'category',
      label: '快速开始',
      collapsible: true,
      collapsed: false,
      items: [
        { type: 'doc', id: 'getting-started/intro', label: '关于 LightClaw' },
        { type: 'doc', id: 'getting-started/installation', label: '安装指南' },
        { type: 'doc', id: 'getting-started/quickstart', label: '5 分钟上手' },
      ],
    },

    // ── 用户指南 ──
    {
      type: 'category',
      label: '用户指南',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '核心功能',
          collapsed: false,
          items: [
            { type: 'doc', id: 'user-guide/scenes', label: '内置场景' },
            { type: 'doc', id: 'user-guide/skills', label: '技能系统' },
          ],
        },
        {
          type: 'category',
          label: '使用界面',
          collapsed: true,
          items: [
            { type: 'doc', id: 'user-guide/dashboard', label: 'Web Dashboard' },
            { type: 'doc', id: 'user-guide/cli-reference', label: 'CLI 命令参考' },
          ],
        },
      ],
    },

    // ── 配置指南 ──
    {
      type: 'category',
      label: '配置指南',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: '基础配置',
          collapsed: true,
          items: [
            { type: 'doc', id: 'config/llm-providers', label: 'LLM 供应商' },
            { type: 'doc', id: 'config/channels', label: '渠道接入' },
          ],
        },
        {
          type: 'category',
          label: '高级配置',
          collapsed: true,
          items: [
            { type: 'doc', id: 'config/memory-system', label: '记忆系统' },
            { type: 'doc', id: 'config/mcp-integration', label: 'MCP 集成' },
            { type: 'doc', id: 'config/offline-mode', label: '离线模式' },
          ],
        },
      ],
    },

    // ── 架构设计 ──
    {
      type: 'category',
      label: '架构设计',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: '核心架构',
          collapsed: true,
          items: [
            { type: 'doc', id: 'arch/overview', label: '系统架构概览' },
            { type: 'doc', id: 'arch/agent-engine', label: 'Agent 引擎' },
            { type: 'doc', id: 'arch/skill-framework', label: '技能框架' },
          ],
        },
        {
          type: 'category',
          label: '数据与安全',
          collapsed: true,
          items: [
            { type: 'doc', id: 'arch/memory-architecture', label: '记忆架构' },
            { type: 'doc', id: 'arch/workspace-structure', label: '工作区目录结构' },
            { type: 'doc', id: 'arch/security', label: '安全与隐私' },
          ],
        },
      ],
    },

    // ── 开发指南 ──
    {
      type: 'category',
      label: '开发指南',
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: 'category',
          label: '环境与项目',
          collapsed: true,
          items: [
            { type: 'doc', id: 'dev/environment-setup', label: '开发环境搭建' },
            { type: 'doc', id: 'dev/project-structure', label: '项目源码结构' },
          ],
        },
        {
          type: 'category',
          label: '开发与贡献',
          collapsed: true,
          items: [
            { type: 'doc', id: 'dev/custom-skill-dev', label: '自定义技能开发' },
            { type: 'doc', id: 'dev/contributing', label: '贡献指南' },
            { type: 'doc', id: 'dev/changelog', label: '更新日志' },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
