import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';

// ponytail: lucide-react dropped brand/logo glyphs; inline the two marks we need instead of adding a dependency.
function Linkedin({ size = 18, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}
function Github({ size = 18, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.61-3.37-1.21-3.37-1.21-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

// Press feedback lands on pointer-down (transform only, so it stays on the compositor).
const press = 'active:scale-[0.97] motion-reduce:active:scale-100 motion-reduce:active:opacity-70';
const btn = `inline-flex items-center bg-ink text-paper font-medium hover:bg-emerald hover:text-ink transition-[color,background-color,transform] duration-150 ${press}`;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  // Delay rides in via `custom`: a variant-level transition wins over the component's
  // `transition` prop, so passing delay there never applied.
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay } }),
};

function Reveal({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

// ponytail: two case studies have no screenshot to show (a Slack bot, an HR process) — a
// stat card fits the site's aesthetic better than a stock/placeholder image.
function DataVisual({ eyebrow, flow, stat, statLabel, className = '' }) {
  return (
    <div className={`bg-pine text-paper flex flex-col justify-between p-6 ${className}`}>
      <div className="font-mono text-xs uppercase tracking-widest text-paper/40">{eyebrow}</div>
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs my-4">
        {flow.map((step, i) => (
          <React.Fragment key={step}>
            {i > 0 && <ArrowRight size={12} className="text-emerald shrink-0" />}
            <span className="border border-paper/20 px-2 py-1">{step}</span>
          </React.Fragment>
        ))}
      </div>
      <div>
        <div className="font-display text-3xl sm:text-4xl font-bold text-emerald">{stat}</div>
        <div className="font-mono text-xs text-paper/50 mt-1">{statLabel}</div>
      </div>
    </div>
  );
}

const services = [
  {
    n: '01',
    title: 'Operations & Process Design',
    desc: 'The informal, inconsistent, lives-in-someone’s-head process — rebuilt as a repeatable system anyone on the team can run.',
  },
  {
    n: '02',
    title: 'Financial Operations & Controls',
    desc: 'Books, budgets, and spend under a CPA’s eye: clean lines, real oversight, and the recurring costs nobody has questioned in years.',
  },
  {
    n: '03',
    title: 'Diagnostics & Analysis',
    desc: 'Data scattered across apps, plus what people actually tell you, pulled into one view — so you fix the root cause, not the symptom.',
  },
  {
    n: '04',
    title: 'Product & Internal Tooling',
    desc: 'When the fix is a tool that doesn’t exist yet: PRD, stack decision, and a working build — not a recommendation deck.',
  },
];

// Drop a photo into public/graphics/ and set `image` to swap out the placeholder tile.
const offTheClock = [
  {
    title: 'Dogs',
    desc: 'Ask me about my dog; tell me about yours! ; )',
    image: 'graphics/personal-dogs.jpg',
    slot: 'personal-dogs.jpg',
  },
  {
    title: 'Broadway',
    desc: 'Fifteen minutes from the theater district and fully taking advantage of it.',
    image: null,
    slot: 'personal-broadway.jpg',
  },
  {
    title: 'Travel & Food',
    desc: 'New cities, and eating my way through them one unfamiliar menu at a time.',
    image: null,
    slot: 'personal-travel.jpg',
  },
  {
    title: 'Puzzles',
    desc: 'The same pattern-finding itch that makes the day job fun, minus the deadlines.',
    image: null,
    slot: 'personal-puzzles.jpg',
  },
];

// STAR case studies. Each one carries an `image` slot — drop the file into public/graphics/
// and set `image` to swap the DataVisual placeholder for a real screenshot.
const projects = [
  {
    n: '01',
    title: 'Rebuilt Nonprofit Finance Ops as Operations Director',
    subtitle: 'Ownership under ambiguity',
    desc: 'Nominated and voted into a role that had sat vacant for months, then set the bookkeeping standard and audited every recurring expense.',
    image: null,
    slot: 'case-nonprofit-ops.png',
    tags: ['QuickBooks', 'BILL.com', 'Google Sheets'],
    featured: true,
    visual: {
      eyebrow: 'Finance Operations',
      flow: ['Elected to vacant role', 'Standards set', 'Expenses cut'],
      stat: '5%',
      statLabel: 'of recurring spend eliminated',
    },
    star: {
      situation: 'A nonprofit had gone months without an Operations Director, leaving bookkeeping and expense oversight unmanaged.',
      task: 'Nominated and voted into the role, bring structure back to financial operations across staff and the external bookkeeper.',
      action: 'Directed staff and the external bookkeeper on how the books should be kept, down to which lines to break out, and reviewed every recurring expense for necessity and cost.',
      result: 'Cut 5% of recurring expenses that were unnecessary or had cheaper alternatives.',
    },
  },
  {
    n: '02',
    title: 'Led a Distributed Dev Team on Kanban',
    subtitle: 'People management style',
    desc: 'Managed 5–8 developers across time zones while deliberately building a team that did not bottleneck on me.',
    image: null,
    slot: 'case-kanban-team.png',
    tags: ['Azure DevOps', 'Kanban', 'Daily Scrum'],
    visual: {
      eyebrow: 'Team Management',
      flow: ['Daily scrum', 'Seniors mentor juniors', 'Ownership pushed down'],
      stat: '+15%',
      statLabel: 'team throughput',
    },
    star: {
      situation: 'A cross-functional team of 5–8 geographically dispersed developers needed consistent delivery and clear ownership.',
      task: 'Manage throughput while building a team that did not bottleneck on me.',
      action: 'Ran daily scrum and kanban ticketing in Azure DevOps, and mentored senior developers to lead and teach the juniors — pushing ownership down instead of routing it through me.',
      result: 'Increased throughput 15% and removed myself as the review bottleneck.',
    },
  },
  {
    n: '03',
    title: 'Diagnosed an Engagement Gap With Data',
    subtitle: 'Diagnostic & analytical approach',
    desc: 'Pulled usage data out of three separate apps and combined it with interview feedback to find why a business unit could not standardize its client engagements.',
    image: null,
    slot: 'case-engagement-dashboard.png',
    tags: ['Power BI', 'Power Query', 'Stakeholder interviews'],
    visual: {
      eyebrow: 'Root Cause Analysis',
      flow: ['3 apps + interviews', 'One Power BI view', 'Action plan'],
      stat: '3 → 1',
      statLabel: 'data sources into one view',
    },
    star: {
      situation: 'A business unit was failing to standardize its engagement process across clients, and nobody could say why.',
      task: 'Find the root cause using data scattered across three different apps plus qualitative interview feedback.',
      action: 'Designed a Power BI dashboard that aggregated usage data from all three systems alongside the interview results, so the quantitative and qualitative evidence sat in one view.',
      result: 'Identified over-customization per client as the core issue and produced an action plan to standardize.',
    },
  },
  {
    n: '04',
    title: 'Streamlined an Executive Director Review Cycle',
    subtitle: 'Process design',
    desc: 'Turned an informal two-month review scramble into a repeatable six-week cycle with results comparable year over year.',
    image: null,
    slot: 'case-review-cycle.png',
    tags: ['Google Forms', 'Power BI', 'Power Query'],
    visual: {
      eyebrow: 'HR Process Redesign',
      flow: ['Structured intake', 'Standard questions', 'Board-ready report'],
      stat: '2mo → 6wk',
      statLabel: 'review cycle time',
    },
    star: {
      situation: 'The executive director review cycle took two months and lacked year-over-year consistency.',
      task: 'Shorten the cycle and make it repeatable and comparable across years.',
      action: 'Implemented technology suited to the budget and the need, standardized the review questions across cycles, and upgraded the reporting format delivered to the other directors.',
      result: 'Cut cycle time to 6 weeks and created a consistent, more informative reporting format.',
    },
  },
  {
    n: '05',
    title: 'Built Budget Canary as a Solo Founder',
    subtitle: 'Builder & technical range',
    desc: 'Took an unserved need for small accounting firms from PRD to a working product — stack choice, OAuth, payments, and automated reporting, built solo.',
    image: null,
    slot: 'case-budget-canary.png',
    tags: ['Next.js', 'Supabase', 'Stripe', 'Resend'],
    visual: {
      eyebrow: 'Product Build',
      flow: ['PRD', 'Architecture', 'Shipped'],
      stat: 'Demo-ready',
      statLabel: 'built end to end, solo',
    },
    star: {
      situation: 'Small accounting firms and bookkeepers lack affordable tooling for budget variance monitoring.',
      task: 'Design and ship a working product solo — from PRD to architecture to build.',
      action: 'Scoped the PRD, evaluated and chose the stack (Next.js and Supabase), then built the OAuth integrations, payments, and automated reporting.',
      result: 'Demo-ready product covering the full loop from connected books to delivered report.',
    },
  },
];

// Hero figure, in a 1152×400 viewBox: tangled cubic paths that straighten into five lanes,
// S-curve onto one rail, and pass three process stops. Each path lerps jumble → ordered by t.
const FIG_X = [0, 150, 260, 520, 700, 880, 1152];
const FIG_RAIL = 200;
const FIG_LANES = [48, 124, 200, 276, 352];
const FIG_SOURCES = ['[Excel]', '[Slack]', '[Inbox]', '[Bank feed]', '[Forms]'];
const FIG_STOPS = [
  { num: '01', name: 'capture', x: 590 },
  { num: '02', name: 'reconcile', x: 770 },
  { num: '03', name: 'report', x: 950 },
];

// Seeded so the tangle is the same on every load.
const FIGURE = (() => {
  let seed = 20261006;
  const rnd = () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const rg = (a, b) => a + (b - a) * rnd();
  const clampY = (v) => Math.max(-40, Math.min(440, v));
  const build = (lane) => {
    const jx = [], jy = [], j1x = [], j1y = [], j2x = [], j2y = [];
    for (let j = 0; j < 7; j++) {
      jx.push(j === 0 ? 0 : j === 6 ? 1152 : FIG_X[j] + rg(-80, 80));
      jy.push(rg(24, 376));
    }
    for (let i = 0; i < 6; i++) {
      j1x.push(jx[i] + rg(-140, 260));
      j1y.push(clampY(jy[i] + rg(-230, 230)));
      j2x.push(jx[i + 1] + rg(-260, 140));
      j2y.push(clampY(jy[i + 1] + rg(-230, 230)));
    }
    const R = FIG_RAIL;
    const oy = lane === null ? [R, R, R, R, R, R, R] : [lane, lane, lane, R, R, R, R];
    const o1x = [], o1y = [], o2x = [], o2y = [];
    for (let i = 0; i < 6; i++) {
      const dx = FIG_X[i + 1] - FIG_X[i];
      o1x.push(FIG_X[i] + dx * 0.5); o1y.push(oy[i]);
      o2x.push(FIG_X[i + 1] - dx * 0.5); o2y.push(oy[i + 1]);
    }
    return {
      J: { ax: jx, ay: jy, c1x: j1x, c1y: j1y, c2x: j2x, c2y: j2y },
      O: { ax: FIG_X, ay: oy, c1x: o1x, c1y: o1y, c2x: o2x, c2y: o2y },
    };
  };
  return { noise: [build(null), build(null), build(null)], core: FIG_LANES.map(build) };
})();

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const smooth = (v) => { const t = clamp01(v); return t * t * (3 - 2 * t); };
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;
const r1 = (v) => Math.round(v * 10) / 10;

function figPath({ J, O }, t) {
  const pt = (xs, ys, i) => `${r1(lerp(J[xs][i], O[xs][i], t))} ${r1(lerp(J[ys][i], O[ys][i], t))}`;
  let d = `M${pt('ax', 'ay', 0)}`;
  for (let i = 0; i < 6; i++) {
    d += ` C${pt('c1x', 'c1y', i)},${pt('c2x', 'c2y', i)},${pt('ax', 'ay', i + 1)}`;
  }
  return d;
}

// p: 0 = tangle, 1 = finished process. Returns the paths plus per-element opacity.
function figFrame(p) {
  const local = (delay) => easeInOutCubic(clamp01((p - 0.04 - delay) / 0.78));
  const lines = [];
  // Loose strays: pulled toward the rail, then dropped.
  FIGURE.noise.forEach((L, k) => {
    const t = local(k * 0.02);
    lines.push({ d: figPath(L, t), stroke: 'var(--color-ink)', width: 1.25, opacity: 0.3 * (1 - smooth(t * 1.4)) });
  });
  // Accent halo under the second lane: it becomes the glow on the finished rail.
  const th = local(0.03);
  lines.push({ d: figPath(FIGURE.core[1], th), stroke: 'var(--color-emerald)', width: lerp(3, 6, th), opacity: 1 });
  FIGURE.core.forEach((L, k) => {
    const t = local(k * 0.03);
    lines.push({ d: figPath(L, t), stroke: 'var(--color-ink)', width: lerp(1.25, 2, t), opacity: lerp(0.35, 1, t) });
  });
  return {
    lines,
    sources: smooth((p - 0.6) / 0.15),
    stops: FIG_STOPS.map((_, i) => smooth((p - 0.78 - i * 0.05) / 0.12)),
    tag: smooth((p - 0.9) / 0.08),
    eyebrow: smooth((p - 0.45) / 0.2),
    hint: 1 - clamp01(p * 10),
  };
}

const HERO_SCRUB_PX = 1400;
const NAV_H = 64; // matches the h-16 sticky header

// Sticky stage over a tall track: scrolling scrubs the figure from tangle to process.
// Reduced motion lands on the finished figure with no scroll track.
function Hero() {
  const reduce = useReducedMotion();
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const [scrollP, setScrollP] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const calc = () => {
      raf = 0;
      const track = trackRef.current.getBoundingClientRect();
      const span = track.height - stageRef.current.getBoundingClientRect().height;
      if (span > 0) setScrollP(clamp01((NAV_H - track.top) / span));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const f = figFrame(reduce ? 1 : scrollP);
  const lbl = 'max-sm:text-[10px]';

  return (
    <section id="home" ref={trackRef} className="relative border-b border-line">
      <div ref={stageRef} className="sticky top-16 min-h-[720px] px-6 pt-10 pb-6 bg-paper flex flex-col items-center">
        <div className="w-full max-w-6xl min-w-0 flex flex-col gap-5">
          <div className="flex items-baseline justify-between gap-4 font-mono text-xs leading-[1.4] text-ink/60">
            <div className="relative flex-auto min-w-0 h-[17px]">
              <span className="absolute left-0 top-0 whitespace-nowrap" style={{ opacity: 1 - f.eyebrow }}>fig 1. — the stack, before</span>
              <span className="absolute left-0 top-0 whitespace-nowrap" style={{ opacity: f.eyebrow }}>fig 2. — the stack, after</span>
            </div>
            <span className="whitespace-nowrap" style={{ opacity: f.hint }}>// scroll to reconcile</span>
          </div>

          <h1 className="font-display font-bold text-[clamp(40px,5.2vw,60px)] leading-[1.05] tracking-tight">
            <span className="block text-ink/50">Messy stack in.</span>
            <span className="block">Clean process out.</span>
          </h1>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <p className="flex-[1_1_360px] max-w-[560px] text-lg leading-relaxed text-ink/60">
              I rebuild the spreadsheets, inboxes and one-off exports your team runs on into
              workflows that reconcile — plain English in, board-ready out.
            </p>
            <a href="#/work" className={`${btn} gap-2 h-12 px-6 text-sm font-semibold`}>
              See selected work <ArrowRight size={16} />
            </a>
          </div>

          <div className="relative w-full mt-2 aspect-[342/300] sm:aspect-[1152/400]">
            <svg
              viewBox="0 0 1152 400"
              preserveAspectRatio="none"
              fill="none"
              role="img"
              aria-label="Tangled curved lines that straighten into five ordered lanes, merge into one rail and pass through three process stops"
              className="absolute inset-0 w-full h-full"
            >
              {f.lines.map((l, i) => (
                <path
                  key={i}
                  d={l.d}
                  stroke={l.stroke}
                  strokeWidth={l.width}
                  strokeOpacity={l.opacity}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            {FIG_SOURCES.map((s, i) => (
              <div
                key={s}
                className={`absolute left-0 -translate-y-1/2 bg-paper py-[3px] pr-2.5 font-mono text-xs leading-[1.4] text-ink/60 whitespace-nowrap ${lbl}`}
                style={{ top: `${(FIG_LANES[i] / 400) * 100}%`, opacity: f.sources }}
              >
                {s}
              </div>
            ))}

            {FIG_STOPS.map((s, i) => (
              <div
                key={s.num}
                className="absolute top-[calc(50%-7px)] flex flex-col items-center gap-2.5 whitespace-nowrap"
                style={{ left: `${(s.x / 1152) * 100}%`, opacity: f.stops[i], transform: `translate(-50%, ${(1 - f.stops[i]) * 10}px)` }}
              >
                <span className="block w-3.5 h-3.5 border-[1.5px] border-ink bg-emerald" />
                <span className="flex flex-col items-center gap-0.5 font-mono text-xs leading-[1.3]">
                  <span className={`font-medium ${lbl}`}>{s.num}</span>
                  <span className={`text-ink/60 ${lbl}`}>{s.name}</span>
                </span>
              </div>
            ))}

            {/* Hidden on phones: at that width it would cover the 02/03 stops. */}
            <div
              className="max-sm:hidden absolute right-0 top-1/2 -translate-y-1/2 border border-ink bg-paper px-3.5 py-2.5 font-mono font-medium text-xs leading-[1.4] tracking-widest uppercase whitespace-nowrap"
              style={{ opacity: f.tag }}
            >
              board-ready
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" style={{ height: reduce ? 0 : HERO_SCRUB_PX }} />
    </section>
  );
}

// Sticky chrome as a translucent material: content scrolls under it; `.site-header` goes solid under prefers-reduced-transparency.
const headerCls = 'site-header sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-line';

const STAR = [
  ['situation', 'Situation'],
  ['task', 'Task'],
  ['action', 'Action'],
  ['result', 'Result'],
];

function ProjectDetail({ project, prev, next }) {
  return (
    // Keyed by project so prev/next re-runs the fade; under reduced motion only the opacity cross-fade remains.
    <motion.div
      key={project.n}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-paper text-ink font-sans antialiased min-h-screen flex flex-col"
    >
      <header className={headerCls}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#/work" className={`group inline-flex items-center gap-2 font-mono text-sm hover:text-emerald-deep transition-colors ${press}`}>
            <ArrowLeft size={15} className="transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:group-hover:translate-x-0" /> all work
          </a>
          <a href="#/" className="font-mono text-sm font-medium tracking-tight">
            tiffany<span className="text-emerald">.</span>tay<span className="text-ink/40"> — CPA</span>
          </a>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="font-mono text-xs font-bold tracking-widest uppercase text-emerald-deep mb-4">
            {project.n} / {String(projects.length).padStart(2, '0')} — Selected Work
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-2">{project.title}</h1>
          {project.subtitle && <p className="font-mono text-sm text-ink/40 mb-8">{project.subtitle}</p>}
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full border border-line my-8" />
          ) : (
            <DataVisual {...project.visual} className="w-full h-64 sm:h-72 border border-line my-8" />
          )}
          <dl className="max-w-2xl grid sm:grid-cols-[7rem_minmax(0,1fr)] gap-x-8 gap-y-5">
            {STAR.map(([key, label]) => (
              <React.Fragment key={key}>
                <dt className="font-mono text-xs font-bold tracking-widest uppercase text-emerald-deep sm:pt-1">{label}</dt>
                <dd className="text-ink/70 leading-relaxed mb-3 sm:mb-0">{project.star[key]}</dd>
              </React.Fragment>
            ))}
            <dt className="font-mono text-xs font-bold tracking-widest uppercase text-emerald-deep sm:pt-1">Tools</dt>
            <dd className="font-mono text-xs text-ink/50 flex flex-wrap gap-x-4 gap-y-1 sm:pt-1">
              {project.tags.map((t) => <span key={t}>[{t}]</span>)}
            </dd>
          </dl>
        </div>
      </main>

      {/* Prev / next project */}
      <nav className="border-t border-line grid sm:grid-cols-2">
        <a href={`#/project/${prev.n}`} className="group p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-line hover:bg-mist active:bg-mist transition-colors">
          <div className="font-mono text-xs font-bold text-emerald-deep mb-2 flex items-center gap-2">
            <ArrowLeft size={13} className="transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:group-hover:translate-x-0" /> PREV — {prev.n}
          </div>
          <div className="font-display font-bold tracking-tight group-hover:text-emerald-deep transition-colors">{prev.title}</div>
        </a>
        <a href={`#/project/${next.n}`} className="group p-6 sm:p-8 text-right hover:bg-mist active:bg-mist transition-colors">
          <div className="font-mono text-xs font-bold text-emerald-deep mb-2 flex items-center justify-end gap-2">
            NEXT — {next.n} <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
          </div>
          <div className="font-display font-bold tracking-tight group-hover:text-emerald-deep transition-colors">{next.title}</div>
        </a>
      </nav>
    </motion.div>
  );
}

const navLinks = [
  ['#/work', 'Work'],
  ['#/services', 'Services'],
  ['#/about', 'About'],
  ['#/contact', 'Contact'],
];

const cta = `${btn} gap-2 h-12 px-6 text-sm font-semibold`;
const container = 'max-w-6xl mx-auto px-6';
const mono12 = 'font-mono text-xs leading-[1.4]';
const eyebrow = `${mono12} tracking-widest uppercase`;

function SiteHeader({ route }) {
  return (
    <header className={headerCls}>
      <div className={`${container} h-16 flex items-center justify-between gap-6`}>
        <a href="#/" className="font-mono text-sm font-medium whitespace-nowrap">
          tiffany<span className="text-emerald">.</span>tay<span className="hidden sm:inline"> — CPA</span>
        </a>
        {/* Every link stays visible on phones: "where can I go?" needs an answer at 375px too. */}
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm text-ink/60">
          {navLinks.map(([href, label]) => (
            <a
              key={href}
              href={href}
              aria-current={route === href ? 'page' : undefined}
              className="py-1 border-b-2 border-transparent hover:text-ink active:text-ink transition-colors aria-[current=page]:text-ink aria-[current=page]:border-emerald"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-pine text-paper/50 border-t border-paper/20">
      <div className={`${container} py-8 flex flex-wrap items-center justify-between gap-4 ${mono12}`}>
        <span>tiffany.tay — operations, process &amp; product</span>
        <span>&copy; 2026 — built and maintained in-house</span>
      </div>
    </footer>
  );
}

// Eyebrow + title that opens each page; `as="h2"` for a second section on the same page.
function PageHeader({ index, label, title, dark = false, as: Heading = 'h1' }) {
  return (
    <Reveal className="mb-14 flex flex-col gap-4">
      <span className={`${eyebrow} ${dark ? 'text-paper/50' : 'text-ink/60'}`}>{index} — {label}</span>
      <Heading className={`font-display font-bold text-[clamp(32px,4.4vw,48px)] leading-[1.15] tracking-tight ${dark ? 'text-paper' : 'text-ink'}`}>
        {title}
      </Heading>
    </Reveal>
  );
}

function WorkSection() {
  const total = String(projects.length).padStart(2, '0');
  return (
    <section className={`${container} py-20`}>
      <PageHeader index="01" label="Selected work" title="Five messes, five systems." />
      <div className="border-b border-line">
        {projects.map((p) => (
          <Reveal key={p.n}>
            <article className="grid md:grid-cols-2 gap-x-12 gap-y-8 py-10 border-t border-line">
              <div className="flex flex-col gap-2 min-w-0">
                <span className={`${mono12} text-ink/60`}>{p.n} / {total}</span>
                <h2 className="font-display font-bold text-2xl leading-[1.15] tracking-tight">
                  <a href={`#/project/${p.n}`} className="hover:text-emerald-deep transition-colors">{p.title}</a>
                </h2>
                <span className={`${mono12} text-ink/60`}>{p.subtitle}</span>
              </div>
              <div className="flex flex-col gap-5 min-w-0">
                <p className="text-ink/60 leading-relaxed max-w-[560px]">{p.desc}</p>
                {/* The case study's flow, then its headline number. */}
                <ul className="flex flex-col gap-2 text-sm leading-normal text-ink/70">
                  {[...p.visual.flow, `${p.visual.stat} — ${p.visual.statLabel}`].map((h) => (
                    <li key={h} className="flex gap-3"><span className="font-mono text-ink/60">+</span><span>{h}</span></li>
                  ))}
                </ul>
                <div className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2 ${mono12} text-ink/60`}>
                  <span className="flex flex-wrap gap-x-4 gap-y-2">
                    {p.tags.map((t) => <span key={t}>[{t}]</span>)}
                  </span>
                  <a href={`#/project/${p.n}`} className="group inline-flex items-center gap-2 text-ink hover:text-emerald-deep transition-colors">
                    read the case study
                    <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className={`${container} py-20`}>
      <PageHeader index="02" label="Services" title="What I take on." />
      <div className="grid md:grid-cols-2 border-t border-l border-line">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.05} className="group p-8 flex flex-col gap-3 border-r border-b border-line hover:bg-mist active:bg-mist transition-colors">
            <span className={`${mono12} text-ink/60`}>{s.n}</span>
            <h2 className="font-display font-bold text-xl leading-[1.15] tracking-tight group-hover:text-emerald-deep transition-colors">{s.title}</h2>
            <p className="text-ink/60 leading-relaxed">{s.desc}</p>
          </Reveal>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-6 mt-14">
        <p className="flex-[1_1_320px] max-w-[560px] text-lg leading-relaxed text-ink/60">
          Tell me what&rsquo;s running on heroics and good intentions — I reply within two business days.
        </p>
        <a href="#/contact" className={cta}>Get in touch <ArrowRight size={16} /></a>
      </div>
    </section>
  );
}

const credentials = [
  ['// education', [
    ['MPA + BBA', 'The University of Texas at Austin'],
    ['Texas Academy of Math & Science', 'UNT, early entrance program'],
  ]],
  ['// credentials', [
    ['CPA', 'Licensed in New York State & Texas'],
    ['Applied Data Science Lab', 'WorldQuant University, 2025'],
  ]],
];

function AboutSection() {
  return (
    <section className="bg-pine text-paper/70">
      <div className={`${container} py-20`}>
        <PageHeader index="03" label="About" title="Both sides of the table." dark />
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)] gap-12 items-start">
        <Reveal className="flex flex-col gap-6 max-w-2xl text-lg leading-relaxed">
          <p>
            For the past decade I&rsquo;ve led operations, finance, and delivery for
            venture-backed SaaS companies and mission-driven nonprofits — usually arriving at the
            point where something important has no owner and everyone has quietly worked around
            it for months.
          </p>
          <p>
            My work sits at the intersection of accounting rigor and building things: audited
            financials and spend controls on one side, Power BI, Azure DevOps, and a shipped
            product on the other. The pattern is the same either way — take the ambiguous,
            under-owned thing, find what the numbers say is actually wrong, and turn it into a
            process someone else can run.
          </p>
          <p className="mt-4 font-display font-semibold text-2xl leading-[1.3] tracking-tight text-paper">
            &ldquo;A process only I can run isn&rsquo;t a process.&rdquo;
          </p>
        </Reveal>
        <Reveal delay={0.1} className="relative max-w-sm lg:max-w-none border border-paper/20">
          <img src="graphics/6.jpeg" alt="Tiffany Tay" loading="lazy" className="w-full object-cover object-top" />
          <span className={`absolute bottom-0 left-0 bg-paper text-ink px-3 py-2 ${mono12}`}>fig 1. — the person behind the systems</span>
        </Reveal>
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mt-16 pt-10 border-t border-paper/20">
          {credentials.map(([heading, items]) => (
            <div key={heading} className="flex flex-col gap-5">
              <span className={`${eyebrow} text-paper/50`}>{heading}</span>
              <ul className="flex flex-col gap-4">
                {items.map(([title, sub]) => (
                  <li key={title} className="flex flex-col gap-0.5">
                    <span className="font-medium leading-[1.4] text-paper">{title}</span>
                    <span className="text-sm leading-normal text-paper/60">{sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OffTheClockSection() {
  return (
    <section className="bg-mist">
      <div className={`${container} py-20`}>
        <PageHeader as="h2" index="04" label="Non-billable hours" title="Off the clock." />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {offTheClock.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05} className="flex flex-col gap-2">
              {item.image ? (
                <img src={item.image} alt={item.title} loading="lazy" className="w-full aspect-square object-cover border border-line mb-2" />
              ) : (
                <div className="w-full aspect-square border border-line bg-paper mb-2 flex items-center justify-center p-3">
                  {/* The slot filename is an authoring hint; visitors never see an internal path. */}
                  {import.meta.env.DEV && (
                    <span className="font-mono text-[10px] text-ink/30 text-center break-all">{item.slot}</span>
                  )}
                </div>
              )}
              <h3 className="font-display font-bold text-lg tracking-tight">{item.title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const field = 'w-full pt-2 pb-3 bg-transparent border-b border-line rounded-none text-base leading-normal focus:border-emerald focus:outline-none transition-colors resize-none';
const fieldLabel = `${eyebrow} text-ink/60`;
const contactLink = 'inline-flex items-center gap-3 min-h-11 font-mono text-sm hover:text-emerald-deep transition-colors';

function ContactSection() {
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className={`${container} py-20 grid lg:grid-cols-2 gap-x-24 gap-y-14`}>
      <Reveal className="flex flex-col gap-6 min-w-0">
        <span className={`${eyebrow} text-ink/60`}>05 — Contact</span>
        <h1 className="font-display font-bold text-[clamp(32px,4.4vw,48px)] leading-[1.15] tracking-tight">
          Tell me where the process breaks down.
        </h1>
        <p className="max-w-md text-ink/60 leading-relaxed">
          Tell me what&rsquo;s running on heroics and good intentions — I reply within two business days.
        </p>
        <div className="flex flex-col mt-2">
          <a href="mailto:tnt@poweredbytnt.com" className={contactLink}><Mail size={16} /> tnt@poweredbytnt.com</a>
          <a href="https://www.linkedin.com/in/tiffany-n-tay/" className={contactLink}><Linkedin size={16} /> in/tiffany-n-tay</a>
          <a href="https://github.com/tiffanytay" className={contactLink}><Github size={16} /> tiffanytay</a>
        </div>
        <span className={`flex items-center gap-2 ${mono12} text-ink/60`}>
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse motion-reduce:animate-none" />
          accepting_new_clients: true
        </span>
      </Reveal>

      <Reveal delay={0.1} className="min-w-0 pt-2">
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="border border-line h-full flex flex-col items-center justify-center text-center p-10"
          >
            <CheckCircle2 className="text-emerald mb-4" size={36} />
            <h2 className="font-display text-xl font-bold mb-2">Message sent</h2>
            <p className="text-ink/60 text-sm">Thanks for reaching out — I&rsquo;ll be in touch soon.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <input type="hidden" name="access_key" value="d5b0b07d-d2c0-4a93-acf3-259cf4caee86" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className={fieldLabel}>01 — Your name</label>
              <input id="name" name="name" type="text" autoComplete="name" required className={field} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className={fieldLabel}>02 — Your email</label>
              <input id="email" name="email" type="email" autoComplete="email" required className={field} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className={fieldLabel}>03 — What&rsquo;s messy?</label>
              <textarea id="message" name="message" rows={3} required className={field} />
            </div>
            <div>
              <button type="submit" disabled={status === 'sending'} className={`${cta} disabled:opacity-60`}>
                {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={16} />
              </button>
            </div>
            {status === 'error' && (
              <p className="text-sm text-red-600 font-mono">error: submission failed — please email me directly.</p>
            )}
          </form>
        )}
      </Reveal>
    </section>
  );
}

// Anything not listed (#/, #home, unknown) is the homepage.
const PAGES = {
  '#/work': [WorkSection],
  '#/services': [ServicesSection],
  '#/about': [AboutSection, OffTheClockSection],
  '#/contact': [ContactSection],
};

// Old single-page anchors (#work, #about, …) still land on their new page.
const readRoute = () => window.location.hash.replace(/^#(?!\/)/, '#/');

export default function TiffanyPortfolio() {
  // ponytail: hash routing (#/work, #/project/NN) — a handful of static pages doesn't warrant react-router
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Every page swap starts at the top, instantly: a new page has no spatial continuity to animate.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  const projectIdx = projects.findIndex((p) => route === `#/project/${p.n}`);
  if (projectIdx !== -1) {
    const len = projects.length;
    return (
      <ProjectDetail
        project={projects[projectIdx]}
        prev={projects[(projectIdx + len - 1) % len]}
        next={projects[(projectIdx + 1) % len]}
      />
    );
  }

  const sections = PAGES[route] ?? [Hero];
  return (
    <div className="bg-paper text-ink font-sans antialiased min-h-screen flex flex-col">
      <SiteHeader route={route} />
      {/* Keyed by route so each page mounts fresh (its reveals replay, the form resets). */}
      <main key={route} className="flex-1">
        {sections.map((S, i) => <S key={i} />)}
      </main>
      <SiteFooter />
    </div>
  );
}
