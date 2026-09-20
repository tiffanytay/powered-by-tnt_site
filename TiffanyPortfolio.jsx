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

function SectionHeader({ index, label, title, dark = false }) {
  return (
    <Reveal className="mb-14">
      <div className={`flex items-center gap-3 font-mono text-xs font-bold tracking-widest uppercase mb-4 ${dark ? 'text-emerald' : 'text-emerald-deep'}`}>
        <span>{index}</span>
        <span className={`h-px w-10 ${dark ? 'bg-emerald/50' : 'bg-emerald/50'}`} />
        <span>{label}</span>
      </div>
      <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] ${dark ? 'text-paper' : 'text-ink'}`}>
        {title}
      </h2>
    </Reveal>
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

// jQuery's easeOutExpo / easeOutBack as beziers.
const EASE_EXPO = [0.19, 1, 0.22, 1];
const EASE_BACK = [0.34, 1.56, 0.64, 1];

// One column, both headlines kept, portrait stays round. Copy fades up 20px in a stagger,
// the portrait pops on ease-back, the status dot pulses.
function Hero() {
  const reduce = useReducedMotion();
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.5, ease: EASE_EXPO } },
  };
  const portrait = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: reduce ? 0 : 0.8, ease: EASE_BACK } },
  };
  const cta = 'group inline-flex items-center gap-2 text-sm font-medium border-b-2 border-emerald pb-1 transition-opacity active:opacity-70';
  const ctaArrow = 'transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0';

  return (
    <section id="home" className="border-b border-line">
      {/* Reduced motion starts at the finished state, so nothing is ever left hidden. */}
      <motion.div
        variants={{ hidden: {}, show: { transition: { delayChildren: 0.1, staggerChildren: 0.08 } } }}
        initial={reduce ? 'show' : 'hidden'}
        animate="show"
      >
        <div className="max-w-6xl mx-auto px-6 pt-12 pb-10 lg:pt-26 lg:pb-24 grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] gap-8 lg:gap-16 items-center">
          {/* Portrait: above the copy on phones, right column on desktop */}
          <motion.div variants={portrait} className="lg:order-2 flex flex-col lg:items-center gap-7">
            <div className="relative w-30 h-30 lg:w-68 lg:h-68 rounded-full overflow-hidden border-4 border-paper shadow-2xl select-none pointer-events-none">
              <img src="graphics/13.jpeg" alt="Tiffany Tay" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
            <div className="hidden lg:grid gap-1 text-center font-mono text-xs text-ink/50">
              <span>accepting_new_clients: <span className="text-emerald-deep">true</span></span>
              <span>location: New York, NY</span>
            </div>
          </motion.div>

          <div className="lg:order-1">
            <motion.p variants={rise} className="font-mono text-xs font-bold tracking-widest uppercase text-emerald-deep mb-4 lg:mb-6">
              The Operator <span className="text-ink/25 mx-1 lg:mx-4">/</span> The Builder
            </motion.p>
            <motion.h1 variants={rise} className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05] mb-4 lg:mb-6">
              Somebody has to own the mess. <span className="text-ink/40">I make it run on process and numbers.</span>
            </motion.h1>
            <motion.p variants={rise} className="text-ink/60 leading-relaxed lg:text-lg max-w-[560px] mb-7 lg:mb-9">
              Licensed CPA (NY &amp; TX) who steps into ambiguous, under-owned operations — finance,
              delivery, people process — finds the root cause in the data, and hands back a system
              that runs without me. When the fix is a tool that doesn&rsquo;t exist yet, I build it.
            </motion.p>
            <motion.div variants={rise} className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href="#work" className={`${btn} gap-2 px-7 py-3`}>
                Open the work <ArrowRight size={15} />
              </a>
              <a href="#services" className={cta}>
                How I work <ArrowRight size={15} className={ctaArrow} />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Status bar */}
        <motion.div variants={rise} className="border-t border-line bg-paper">
          <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 font-mono text-xs text-ink/50">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse motion-reduce:animate-none" />
              accepting_new_clients: true
            </span>
            <span className="hidden sm:inline">location: New York, NY</span>
            <span className="hidden sm:inline">stack: [Power BI, Azure DevOps, QuickBooks, Next.js]</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Sticky chrome as a translucent material: content scrolls under it; `.site-header` goes solid under prefers-reduced-transparency.
const headerCls = 'site-header sticky top-0 z-50 bg-paper/80 backdrop-blur-xl border-b border-line';

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
          <a href="#work" className={`group inline-flex items-center gap-2 font-mono text-sm hover:text-emerald-deep transition-colors ${press}`}>
            <ArrowLeft size={15} className="transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:group-hover:translate-x-0" /> all work
          </a>
          <a href="#home" className="font-mono text-sm font-medium tracking-tight">
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

export default function TiffanyPortfolio() {
  const [status, setStatus] = useState('idle');
  // ponytail: hash routing (#/project/NN) — one detail view over static data doesn't warrant react-router
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Page swaps jump instantly (a new page has no spatial continuity to animate); in-page
  // anchor clicks are left to the browser so the CSS smooth-scroll (motion-safe) applies.
  const prevRoute = useRef(route);
  useEffect(() => {
    const from = prevRoute.current;
    prevRoute.current = route;
    if (route.startsWith('#/project/')) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    if (!from.startsWith('#/project/')) return;
    // Returning from a detail page: the anchor target only exists after React re-renders.
    const el = route.length > 1 && document.getElementById(route.slice(1));
    if (el) el.scrollIntoView({ behavior: 'instant' });
  }, [route]);

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

  return (
    <div className="bg-paper text-ink font-sans antialiased">
      {/* NAV */}
      <header className={headerCls}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <a href="#home" className="font-mono text-sm font-medium tracking-tight">
            tiffany<span className="text-emerald">.</span>tay<span className="text-ink/40 hidden sm:inline"> — CPA</span>
          </a>
          {/* Wayfinding at every width: "where can I go?" must have an answer on a phone too. */}
          <nav className="flex items-center gap-4 sm:gap-7 text-xs sm:text-sm font-medium text-ink/60">
            <a href="#work" className="hover:text-ink active:text-ink transition-colors">Work</a>
            <a href="#services" className="hover:text-ink active:text-ink transition-colors">Services</a>
            <a href="#about" className="hover:text-ink active:text-ink transition-colors">About</a>
          </nav>
          {/* Phone widths: icon-only so the logo, nav, and button share 375px without wrapping. */}
          <a href="#contact" aria-label="Contact" className={`${btn} gap-1.5 text-sm p-2.5 sm:px-4 sm:py-2`}>
            <Mail size={16} className="sm:hidden" />
            <span className="hidden sm:inline">Contact</span>
            <ArrowRight size={14} className="hidden sm:inline" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <Hero />

      {/* WORK */}
      <section id="work" className="border-b border-line">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionHeader index="01" label="Selected Work" title="Five messes, five systems." />

          {/* Featured */}
          {projects.filter((p) => p.featured).map((p) => (
            <Reveal key={p.n} className="mb-12">
              <a href={`#/project/${p.n}`} className="group grid md:grid-cols-2 border border-line hover:border-ink active:border-ink transition-colors">
              <div className="overflow-hidden border-b md:border-b-0 md:border-r border-line">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top max-h-80 md:max-h-none group-hover:scale-[1.02] motion-reduce:group-hover:scale-100 transition-transform duration-500"
                  />
                ) : (
                  <DataVisual {...p.visual} className="w-full h-full min-h-64" />
                )}
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-emerald-deep">{p.n} / FEATURED</span>
                    <ArrowUpRight size={18} className="text-ink/30 group-hover:text-emerald-deep transition-colors" />
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight mb-1">{p.title}</h3>
                  <p className="font-mono text-xs text-ink/40 mb-4">{p.subtitle}</p>
                  <p className="text-sm text-ink/60 leading-relaxed">{p.desc}</p>
                </div>
                <div className="font-mono text-xs text-ink/50 flex flex-wrap gap-x-4 gap-y-1">
                  {p.tags.map((t) => <span key={t}>[{t}]</span>)}
                </div>
              </div>
              </a>
            </Reveal>
          ))}

          {/* Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {projects.filter((p) => !p.featured).map((p, i) => (
              <Reveal key={p.n} delay={i * 0.05} className="h-full">
                <a href={`#/project/${p.n}`} className="group border border-line hover:border-ink active:border-ink transition-colors flex flex-col h-full">
                <div className="overflow-hidden border-b border-line">
                  {p.image ? (
                    <img src={p.image} alt={p.title} loading="lazy" className="w-full h-48 object-cover object-top group-hover:scale-[1.03] motion-reduce:group-hover:scale-100 transition-transform duration-500" />
                  ) : (
                    <DataVisual {...p.visual} className="w-full h-48" />
                  )}
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-deep">{p.n}</span>
                    <ArrowUpRight size={16} className="text-ink/30 group-hover:text-emerald-deep transition-colors" />
                  </div>
                  <h3 className="font-display text-lg font-bold tracking-tight">{p.title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed flex-1">{p.desc}</p>
                  <div className="font-mono text-xs text-ink/50 flex flex-wrap gap-x-4 gap-y-1">
                    {p.tags.map((t) => <span key={t}>[{t}]</span>)}
                  </div>
                </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-b border-line">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionHeader index="02" label="Services" title="What I take on." />
          <div className="grid sm:grid-cols-2 border-t border-l border-line">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05} className="group border-b border-r border-line p-8 hover:bg-mist active:bg-mist transition-colors">
                <div className="font-mono text-xs font-bold text-emerald-deep mb-6">{s.n}</div>
                <h3 className="font-display text-xl font-bold tracking-tight mb-3 group-hover:text-emerald-deep transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-ink/60 leading-relaxed">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-pine text-paper border-b border-line">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionHeader index="03" label="About" title="Both sides of the table." dark />
          <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            <Reveal>
              <div className="relative">
                <img src="graphics/6.jpeg" alt="Tiffany Tay" loading="lazy" className="w-full object-cover object-top grayscale contrast-110" />
                <div className="absolute inset-0 bg-emerald/20 mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 font-mono text-xs bg-paper text-ink px-3 py-2">
                  fig 1. — the person behind the systems
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-paper/70 leading-relaxed mb-5">
                For the past decade I&rsquo;ve led operations, finance, and delivery for
                venture-backed SaaS companies and mission-driven nonprofits — usually arriving at the
                point where something important has no owner and everyone has quietly worked around
                it for months.
              </p>
              <p className="text-paper/70 leading-relaxed mb-8">
                My work sits at the intersection of accounting rigor and building things: audited
                financials and spend controls on one side, Power BI, Azure DevOps, and a shipped
                product on the other. The pattern is the same either way — take the ambiguous,
                under-owned thing, find what the numbers say is actually wrong, and turn it into a
                process someone else can run.
              </p>
              <p className="font-display text-2xl font-bold tracking-tight text-emerald mb-10">
                &ldquo;A process only I can run isn&rsquo;t a process.&rdquo;
              </p>

              <div className="grid sm:grid-cols-2 gap-8 font-mono text-sm">
                <div>
                  <div className="text-xs uppercase tracking-widest text-paper/40 mb-3">// education</div>
                  <ul className="space-y-3 text-paper/80">
                    <li>
                      MPA + BBA
                      <div className="text-xs text-paper/50">The University of Texas at Austin</div>
                    </li>
                    <li>
                      Texas Academy of Math &amp; Science
                      <div className="text-xs text-paper/50">UNT, early entrance program</div>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-paper/40 mb-3">// credentials</div>
                  <ul className="space-y-3 text-paper/80">
                    <li>
                      CPA
                      <div className="text-xs text-paper/50">Licensed in New York State &amp; Texas</div>
                    </li>
                    <li>
                      Applied Data Science Lab
                      <div className="text-xs text-paper/50">WorldQuant University, 2025</div>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OFF THE CLOCK */}
      <section className="bg-mist border-b border-line">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionHeader index="04" label="Non-Billable Hours" title="Off the clock." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {offTheClock.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                {item.image ? (
                  <img src={item.image} alt={item.title} loading="lazy" className="w-full aspect-square object-cover border border-line mb-4" />
                ) : (
                  <div className="w-full aspect-square border border-line bg-paper mb-4 flex items-center justify-center p-3">
                    {/* The slot filename is an authoring hint; visitors never see an internal path. */}
                    {import.meta.env.DEV && (
                      <span className="font-mono text-[10px] text-ink/30 text-center break-all">{item.slot}</span>
                    )}
                  </div>
                )}
                <h3 className="font-display text-lg font-bold tracking-tight mb-2">{item.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-b border-line">
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14">
          <div>
            <SectionHeader index="05" label="Contact" title="Tell me where the process breaks down." />
            <Reveal>
              <p className="text-ink/60 leading-relaxed mb-8 max-w-md">
                Tell me what&rsquo;s running on heroics and good intentions — I reply within two business days.
              </p>
              <div className="space-y-1 font-mono text-sm">
                <a href="mailto:tnt@poweredbytnt.com" className="flex items-center gap-3 py-3 border-b border-line hover:text-emerald-deep transition-colors">
                  <Mail size={16} className="text-emerald-deep" /> tnt@poweredbytnt.com
                </a>
                <a href="https://www.linkedin.com/in/tiffany-n-tay/" className="flex items-center gap-3 py-3 border-b border-line hover:text-emerald-deep transition-colors">
                  <Linkedin size={16} className="text-emerald-deep" /> in/tiffany-n-tay
                </a>
                <a href="https://github.com/tiffanytay" className="flex items-center gap-3 py-3 border-b border-line hover:text-emerald-deep transition-colors">
                  <Github size={16} className="text-emerald-deep" /> tiffanytay
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:pt-24">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="border border-line h-full flex flex-col items-center justify-center text-center p-10"
              >
                <CheckCircle2 className="text-emerald mb-4" size={36} />
                <h3 className="font-display text-xl font-bold mb-2">Message sent</h3>
                <p className="text-ink/60 text-sm">Thanks for reaching out — I&rsquo;ll be in touch soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <input type="hidden" name="access_key" value="d5b0b07d-d2c0-4a93-acf3-259cf4caee86" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                <div>
                  <label htmlFor="name" className="block font-mono text-xs uppercase tracking-widest text-ink/50 mb-2">01 — Your name</label>
                  <input id="name" name="name" type="text" required className="w-full py-2.5 bg-transparent border-b border-ink/25 focus:border-emerald focus:outline-none transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-ink/50 mb-2">02 — Your email</label>
                  <input id="email" name="email" type="email" required className="w-full py-2.5 bg-transparent border-b border-ink/25 focus:border-emerald focus:outline-none transition-colors" />
                </div>
                <div>
                  <label htmlFor="message" className="block font-mono text-xs uppercase tracking-widest text-ink/50 mb-2">03 — What's messy?</label>
                  <textarea id="message" name="message" rows={3} required className="w-full py-2.5 bg-transparent border-b border-ink/25 focus:border-emerald focus:outline-none transition-colors resize-none" />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`${btn} gap-2 px-7 py-3 disabled:opacity-60`}
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={15} />
                </button>
                {status === 'error' && (
                  <p className="text-sm text-red-600 font-mono">error: submission failed — please email me directly.</p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-pine text-paper/50">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <span>tiffany<span className="text-emerald">.</span>tay — operations, process &amp; product</span>
          <div className="flex items-center gap-5">
            <a href="https://www.linkedin.com/in/tiffany-n-tay/" className="hover:text-emerald transition-colors"><Linkedin size={16} /></a>
            <a href="https://github.com/tiffanytay" className="hover:text-emerald transition-colors"><Github size={16} /></a>
            <a href="mailto:tnt@poweredbytnt.com" className="hover:text-emerald transition-colors"><Mail size={16} /></a>
          </div>
          <span>&copy; 2026 — built and maintained in-house</span>
        </div>
      </footer>
    </div>
  );
}
