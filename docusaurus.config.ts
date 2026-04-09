import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'LightClaw',
  tagline: '更易用、更省钱、越用越懂你的 AI 个人助手',
  favicon: 'img/lightclaw_logo.png',

  url: 'https://lightclaw.clawtown.cn',
  baseUrl: '/',

  organizationName: 'Yourdaylight',
  projectName: 'lightclaw-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/orcakit/finnie/edit/main/finnie-docs/docs/',
          lastVersion: 'current',
          versions: {
            current: {
              label: 'v0.1.x',
            },
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          { from: '/docs/getting-started/intro', to: '/docs/快速开始/关于LightClaw' },
          { from: '/docs/getting-started/installation', to: '/docs/快速开始/安装指南' },
          { from: '/docs/getting-started/quickstart', to: '/docs/快速开始/5分钟上手' },
          { from: '/docs/user-guide/core/scenes', to: '/docs/用户指南/核心功能/内置场景' },
          { from: '/docs/user-guide/core/skills', to: '/docs/用户指南/核心功能/技能系统' },
          { from: '/docs/user-guide/ui/dashboard', to: '/docs/用户指南/使用界面/Web-Dashboard' },
          { from: '/docs/user-guide/ui/cli-reference', to: '/docs/用户指南/使用界面/CLI命令参考' },
          { from: '/docs/config/basic/llm-providers', to: '/docs/配置指南/基础配置/LLM供应商配置' },
          { from: '/docs/config/basic/channels', to: '/docs/配置指南/基础配置/渠道接入配置' },
          { from: '/docs/config/advanced/memory-system', to: '/docs/配置指南/高级配置/记忆系统' },
          { from: '/docs/config/advanced/mcp-integration', to: '/docs/配置指南/高级配置/MCP集成' },
          { from: '/docs/config/advanced/offline-mode', to: '/docs/配置指南/高级配置/离线模式' },
          { from: '/docs/arch/core/overview', to: '/docs/架构设计/核心架构/系统架构概览' },
          { from: '/docs/arch/core/agent-engine', to: '/docs/架构设计/核心架构/Agent引擎' },
          { from: '/docs/arch/core/skill-framework', to: '/docs/架构设计/核心架构/技能框架' },
          { from: '/docs/arch/data-security/workspace-structure', to: '/docs/架构设计/数据与安全/工作区目录结构' },
          { from: '/docs/arch/data-security/memory-architecture', to: '/docs/架构设计/数据与安全/记忆架构' },
          { from: '/docs/arch/data-security/security', to: '/docs/架构设计/数据与安全/安全与隐私' },
          { from: '/docs/dev/setup/environment-setup', to: '/docs/开发指南/环境与项目/开发环境搭建' },
          { from: '/docs/dev/setup/project-structure', to: '/docs/开发指南/环境与项目/项目源码结构' },
          { from: '/docs/dev/contribute/custom-skill-dev', to: '/docs/开发指南/开发与贡献/自定义技能开发' },
          { from: '/docs/dev/contribute/contributing', to: '/docs/开发指南/开发与贡献/贡献指南' },
          { from: '/docs/dev/contribute/changelog', to: '/docs/开发指南/开发与贡献/更新日志' },
        ],
      },
    ],
  ],

  themeConfig: {
    image: 'img/lightclaw-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'LightClaw',
      logo: {
        alt: 'LightClaw',
        src: 'img/lightclaw_logo.png',
        srcDark: 'img/lightclaw_logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: '文档',
        },
        { href: 'https://cloud.tencent.com/developer/column/107398', label: '博客', position: 'left' },
        {
          href: 'https://github.com/orcakit/finnie',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {label: '快速开始', to: '/'},
            {label: '安装指南', to: '/docs/快速开始/安装指南'},
            {label: '内置场景', to: '/docs/用户指南/核心功能/内置场景'},
            {label: '技能系统', to: '/docs/用户指南/核心功能/技能系统'},
          ],
        },
        {
          title: '社区',
          items: [
            {label: 'GitHub', href: 'https://github.com/orcakit/finnie'},
            {label: '博客', href: 'https://cloud.tencent.com/developer/column/107398'},
            {label: '更新日志', to: '/docs/开发指南/开发与贡献/更新日志'},
          ],
        },
        {
          title: '更多',
          items: [
            {label: 'MIT 许可证', href: 'https://github.com/orcakit/finnie/blob/main/LICENSE'},
            {label: 'OrcaKit 团队', href: 'https://github.com/orcakit'},
          ],
        },
      ],
      copyright: `Copyright \u00A9 ${new Date().getFullYear()} OrcaKit Team. Built with Docusaurus.`,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'bash',
        'python',
        'json',
        'yaml',
        'typescript',
        'tsx',
        'diff',
      ],
    },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
  },

  // Enable PWA support
  // plugins: ['@docusaurus/plugin-pwa'],
};

export default config;
