import styles from './index.module.css';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from '@docusaurus/Link';

/* ─────────────────────── Icons ─────────────────────── */
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
);
const ArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
);
const GitHub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
);
const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
);
const Terminal = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
);
const Zap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const Brain = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><ellipse cx="12" cy="12" rx="7" ry="5"/><path d="M12 7V3M12 21v-4M5 12H2M22 12h-3"/></svg>
);
const Shield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const Plug = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 01-4 4H10a4 4 0 01-4-4V8"/><path d="M8 2h8"/></svg>
);
const Layers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
);
const Globe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
);

/* ─────────────────────── Data ─────────────────────── */
const slides = [
  { src: '/img/screenshots/02_chat_main_viewport.png',     label: '智能对话',    desc: '多轮上下文对话',       icon: <Brain /> },
  { src: '/img/screenshots/03_channels_viewport.png',      label: '全渠道接入',  desc: '微信 · 飞书 · Discord', icon: <Globe /> },
  { src: '/img/screenshots/08_remote_browser_viewport.png',label: '远程浏览器',  desc: '可视化操控远程页面',    icon: <Terminal /> },
  { src: '/img/screenshots/09_scenes_viewport.png',        label: '场景引擎',    desc: '六大预置场景',          icon: <Layers /> },
  { src: '/img/screenshots/10_skills_market_viewport.png', label: '技能市场',    desc: 'SkillHub 一键安装',     icon: <Plug /> },
  { src: '/img/screenshots/11_memory_viewport.png',        label: '记忆系统',    desc: '越用越懂你',            icon: <Brain /> },
];

const features = [
  {
    icon: <Terminal />,
    title: 'AI 运维',
    desc: '用自然语言描述症状，自动执行诊断链路：系统体检 → 根因定位 → 处理建议。',
    items: ['CPU / 内存 / 磁盘 / 网络全面体检', '智能根因分析，不是关键词匹配', '一键执行修复或生成工单'],
    img: '/img/screenshots/08_remote_browser_viewport.png',
  },
  {
    icon: <Layers />,
    title: '场景引擎',
    desc: '六大深度定制场景，切换即变身领域专家。微信运营、股票分析、低代码开发。',
    items: ['微信公众号运营 · 内容创作', '股票技术分析 · 热点聚合', '低代码开发 · 定时任务'],
    img: '/img/screenshots/09_scenes_viewport.png',
  },
  {
    icon: <Brain />,
    title: '人格系统',
    desc: '基于规则引擎的 MBTI 框架，16 种人格零 Token 成本切换。',
    items: ['规则驱动，零 LLM 成本', '人格影响回答风格与决策', '支持自定义人格配置'],
    img: '/img/screenshots/11_memory_viewport.png',
  },
];

const capabilities = [
  { icon: <Plug />,    title: '技能无限扩展', desc: '11 个内置技能 + SkillHub 社区 + MCP 接入任意工具' },
  { icon: <Globe />,   title: '全渠道接入',   desc: '微信 / 企业微信 / 飞书 / 钉钉 / QQ / Discord / Web' },
  { icon: <Shield />,  title: '双层记忆',     desc: 'MEMORY.md 持久化长期记忆 + Qdrant 向量会话记忆' },
  { icon: <Zap />,     title: 'Token 优化',   desc: '三层压缩流水线 + 智能模型路由降低 90%+ 费用' },
];

/* ─────────────────────── Carousel ─────────────────────── */
function Carousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback((i?: number) => {
    setActive((p) => i !== undefined ? i : (p + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => next(), 4000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused, next]);

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide tabs */}
      <div className={styles.slideTabs}>
        {slides.map((s, i) => (
          <button
            key={s.label}
            className={`${styles.slideTab} ${i === active ? styles.slideTabActive : ''}`}
            onClick={() => next(i)}
          >
            <span className={styles.slideTabIcon}>{s.icon}</span>
            <span className={styles.slideTabText}>
              <strong>{s.label}</strong>
              <small>{s.desc}</small>
            </span>
            {i === active && <span className={styles.slideProgress} />}
          </button>
        ))}
      </div>

      {/* Screen */}
      <div className={styles.slideScreen}>
        <div className={styles.slideBar}><span/><span/><span/></div>
        <div className={styles.slideImgWrap}>
          {slides.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.label}
              className={`${styles.slideImg} ${i === active ? styles.slideImgActive : ''}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Page ─────────────────────── */
export default function Home(): JSX.Element {
  return (
    <main className={styles.page}>

      {/* ══════ HERO ══════ */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>

          {/* Eyebrow */}
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Cloud Native AI Agent · 腾讯云出品
          </div>

          {/* Headline */}
          <h1 className={styles.headline}>
            <span className={styles.headlineLine}>生而为云</span>
            <span className={styles.headlineAccent}>懂云更懂你</span>
          </h1>

          {/* Sub */}
          <p className={styles.sub}>
            以轻量服务器镜像交付的 AI 个人助手，深度集成腾讯云生态。<br />
            智能运维 · 多渠道对话 · 可扩展技能系统，一句话搞定。
          </p>

          {/* CTA */}
          <div className={styles.ctas}>
            <Link to="/docs/getting-started/installation" className={styles.ctaPrimary}>
              开始使用
              <ArrowRight />
            </Link>
            <a href="https://github.com/orcakit/finnie" className={styles.ctaGhost} target="_blank" rel="noopener noreferrer">
              <GitHub />
              GitHub
            </a>
            <Link to="/docs/getting-started/quickstart" className={styles.ctaLink}>
              快速上手 <ChevronRight />
            </Link>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {[
              { v: '6+', l: '预置场景' },
              { v: '11',  l: '内置技能' },
              { v: '8+', l: '接入渠道' },
              { v: '16', l: 'MBTI 人格' },
            ].map((s) => (
              <div key={s.l} className={styles.stat}>
                <b>{s.v}</b><span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width carousel below headline */}
        <div className={styles.heroCarousel}>
          <Carousel />
        </div>
      </section>

      {/* ══════ FEATURE DEEP-DIVES ══════ */}
      <section className={styles.features}>
        <div className={styles.featuresHead}>
          <p className={styles.overline}>核心能力</p>
          <h2>不是又一个 AI 助手</h2>
          <p className={styles.featDesc}>专为腾讯云用户构建的 Cloud Native Agent，每个功能都解决真实问题</p>
        </div>

        <div className={styles.featureList}>
          {features.map((f, i) => (
            <div key={f.title} className={`${styles.featureRow} ${i % 2 === 1 ? styles.featureRowReverse : ''}`}>
              <div className={styles.featureCopy}>
                <div className={styles.featureIconWrap}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <ul>
                  {f.items.map((item) => (
                    <li key={item}><Check />{item}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.featureImg}>
                <img src={f.img} alt={f.title} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ CAPABILITIES GRID ══════ */}
      <section className={styles.caps}>
        <div className={styles.capsHead}>
          <p className={styles.overline}>更多能力</p>
          <h2>完整的 AI 助手生态</h2>
        </div>
        <div className={styles.capGrid}>
          {capabilities.map((c) => (
            <div key={c.title} className={styles.capCard}>
              <div className={styles.capIconWrap}>{c.icon}</div>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ TECH STACK ══════ */}
      <div className={styles.techBar}>
        <span className={styles.techLabel}>技术栈</span>
        {['LangGraph', 'FastAPI', 'React 18', 'Qdrant', 'Playwright', 'TypeScript'].map((t, i, a) => (
          <span key={t} className={styles.techItem}>
            {t}{i < a.length - 1 && <span className={styles.techSep}>/</span>}
          </span>
        ))}
      </div>

      {/* ══════ FINAL CTA ══════ */}
      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <img src="/img/lightclaw_logo.png" alt="LightClaw" className={styles.finalLogo} />
          <h2>你的服务器，值得有一个专属 AI 助手</h2>
          <p>免费开源 · 腾讯云 Lighthouse 一键镜像部署 · 私有数据不出域</p>
          <div className={styles.finalCtaBtns}>
            <Link to="/docs/getting-started/installation" className={styles.ctaPrimary}>
              免费开始 <ArrowRight />
            </Link>
            <a href="https://github.com/orcakit/finnie" className={styles.ctaGhost} target="_blank" rel="noopener noreferrer">
              <GitHub /> 查看源码
            </a>
          </div>
          <p className={styles.finalNote}>已有腾讯云轻量服务器？3 分钟完成部署</p>
        </div>
      </section>

    </main>
  );
}
