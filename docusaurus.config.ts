import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'LightClaw',
  tagline: '更易用、更省钱、越用越懂你的 AI 个人助手',
  favicon: 'img/favicon.ico',

  url: 'https://orcakit.github.io',
  baseUrl: '/',

  organizationName: 'orcakit',
  projectName: 'finnie',

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
            {label: '安装指南', to: '/docs/getting-started/installation'},
            {label: '内置场景', to: '/docs/user-guide/scenes'},
            {label: '技能系统', to: '/docs/user-guide/skills'},
          ],
        },
        {
          title: '社区',
          items: [
            {label: 'GitHub', href: 'https://github.com/orcakit/finnie'},
            {label: '博客', href: 'https://cloud.tencent.com/developer/column/107398'},
            {label: '更新日志', to: '/docs/dev/changelog'},
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
