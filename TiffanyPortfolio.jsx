import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';
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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function Reveal({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function SplitPortrait({ className = '' }) {
  return (
    // position (relative/absolute) supplied by caller to avoid conflicting utilities
    <div className={`rounded-full overflow-hidden border-4 border-paper shadow-2xl select-none pointer-events-none ${className}`}>
      <img src="graphics/13.jpeg" alt="Tiffany Tay" className="absolute inset-0 w-full h-full object-cover object-top" />
    </div>
  );
}

// ponytail: two case studies have no screenshot to show (a Slack bot, an HR process) — a
// ledger-style stat card fits the site's aesthetic better than a stock/placeholder image.
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
      <div className={`flex items-center gap-3 font-mono text-xs font-bold tracking-widest uppercase mb-4 ${dark ? 'text-emerald' : 'text-emerald'}`}>
        <span>{index}</span>
        <span className={`h-px w-10 ${dark ? 'bg-emerald/50' : 'bg-emerald/50'}`} />
        <span>{label}</span>
      </div>
      <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${dark ? 'text-paper' : 'text-ink'}`}>
        {title}
      </h2>
    </Reveal>
  );
}

const ledger = [
  { item: 'Years in nonprofit & SaaS operations', value: '10+' },
  { item: 'CPA licenses held (New York, Texas)', value: '02' },
  { item: 'Form 990s translated into plain English', value: 'Many' },
  { item: 'Dashboards actually used after handoff', value: '100%' },
];

const services = [
  {
    n: '01',
    title: 'Financial Reporting & Form 990 Clarity',
    desc: 'Dense filings and financial statements, rebuilt as dashboards your board and funders read without a translator.',
  },
  {
    n: '02',
    title: 'Grant Lifecycle Systems',
    desc: 'Trackers and workflows that keep every proposal, deadline, and report moving — out of inboxes, into systems.',
  },
  {
    n: '03',
    title: 'Dashboards & Impact Measurement',
    desc: 'Power BI and Tableau builds that connect spend to mission outcomes, refreshed without manual heroics.',
  },
  {
    n: '04',
    title: 'Operations & Process Design',
    desc: 'Lean processes for teams doing more with less — rigor kept, busywork cut.',
  },
];

// Drop a photo into public/graphics/ and set `image` to swap out the placeholder tile.
const offTheClock = [
  {
    title: 'Dogs',
    desc: 'Will stop mid-sentence for a dog on the sidewalk. Every single time.',
    image: null,
    slot: 'personal-dogs.jpg',
  },
  {
    title: 'Broadway',
    desc: 'Twenty minutes from the theater district and fully taking advantage of it.',
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

const projects = [
  {
    n: '01',
    title: 'Nonprofit Insights Dashboard',
    subtitle: 'Form 990 Data Aggregation',
    desc: 'Years of Form 990 filings aggregated into one Power BI model — quick insights from dense tax returns, with a drill-down behind every number.',
    image: 'graphics/coqual-990-financial-screenshot.png',
    tags: ['Power BI', 'Power Query'],
    featured: true,
    detail: {
      body: [
        'A nonprofit’s Form 990s hold years of financial history — revenue mix, program spend, fundraising efficiency — but nobody has time to dig it out of hundreds of pages of dense tax filings.',
        'This dashboard does the digging. Years of filings are aggregated into a single Power BI model, so the headline story — where money comes from, where it goes, and how that’s shifting over time — surfaces in seconds instead of an afternoon of PDF archaeology.',
        'Every summary view drills down: start at the multi-year trends, then click through to the specific schedules and line items behind any number. Leadership walks into board meetings with answers and the receipts to back them up.',
      ],
      highlights: [
        'Years of dense Form 990 filings, one queryable model',
        'Headline revenue and spend trends surfaced in seconds',
        'Drill-down from any trend to the underlying line items',
        'Built in Power BI, refreshed via Power Query — no re-keying',
      ],
    },
  },
  {
    n: '02',
    title: 'Slack-to-Jira Ticketing Bot',
    desc: 'A Slack bot that turns IT support requests into fully-populated Jira tickets the moment they’re posted — nothing waits in a channel to be triaged by hand.',
    tags: ['Slack API', 'Jira API', 'Automation'],
    visual: {
      eyebrow: 'IT Support Automation',
      flow: ['Slack message', 'Bot', 'Jira ticket'],
      stat: '25%',
      statLabel: 'faster ticket turnaround',
    },
    detail: {
      body: [
        'IT support requests came in through a Slack channel, and nothing happened next until someone remembered to manually open a Jira ticket — which meant requests sat, got buried under other messages, or fell through the cracks entirely.',
        'This bot closes that gap. The moment a request is posted to the channel, it creates a Jira ticket automatically, pre-filled with the original message and context — so the Tech team sees exactly what’s being asked for and can prioritize it correctly without chasing down details.',
        'It also tags whoever is on call that day, so every ticket lands with a name attached from the start. The combined effect: about 25% faster turnaround on IT support requests, with a paper trail that starts the second someone asks for help.',
      ],
      highlights: [
        'Every Slack support request becomes a Jira ticket automatically',
        'Tickets pre-populated with the original message for faster triage',
        'On-call teammate auto-tagged on every new ticket',
        '~25% faster average ticket turnaround',
      ],
    },
  },
  {
    n: '03',
    title: 'Performance Review Overhaul',
    desc: 'Redesigned a nonprofit executive director’s performance review process — cutting a 3-month cycle down to 6 weeks with standardized forms and reporting.',
    tags: ['Forms', 'Reporting', 'HR Ops'],
    visual: {
      eyebrow: 'HR Process Redesign',
      flow: ['Structured intake', 'Standardized report', 'Board summary'],
      stat: '3mo → 6wk',
      statLabel: 'review cycle time',
    },
    detail: {
      body: [
        'The performance review process for this nonprofit’s executive director took three months from start to finish — collecting input, compiling it, and getting it in front of the board was a slow, manual slog every cycle.',
        'I rebuilt the process around form technology and reporting technology: structured intake forms replaced ad hoc collection, and a reporting layer turned raw responses into a board-ready summary automatically instead of by hand.',
        'I also standardized the questions across cycles, so results could be compared year over year instead of starting from scratch each time. The rebuilt process runs in 6 weeks instead of 3 months, and now produces a multi-year performance trend the board can actually track.',
      ],
      highlights: [
        'Review cycle cut from 3 months to 6 weeks',
        'Structured forms replaced manual data collection',
        'Automated reporting for board-ready summaries',
        'Standardized questions enable year-over-year comparison',
      ],
    },
  },
  {
    n: '04',
    title: 'Grantseeking Tracker',
    desc: 'The full grant lifecycle — deadlines, drafts, follow-ups — in one practical system where nothing falls through the cracks.',
    image: 'graphics/grantseeking-tracker.png',
    tags: ['Power BI', 'Excel', 'Perplexity AI'],
    detail: {
      body: [
        'Grant lifecycles have a lot of moving parts — deadlines, drafts, follow-ups, funder-specific requirements — and when they live across email threads and someone’s memory, things get missed.',
        'This tracker puts the full lifecycle in one system: every prospect, deadline, draft status, and follow-up in a single view, built in Power BI and Excel, with Perplexity AI used to help research and qualify new funding prospects.',
        'The result is a pipeline nothing falls out of — anyone on the team can see what stage a grant is at and what’s due next, instead of that knowledge living in one person’s inbox.',
      ],
      highlights: [
        'Every grant deadline and draft tracked in one system',
        'Funder research assisted by Perplexity AI',
        'Built in Power BI and Excel for easy handoff',
        'Nothing depends on one person’s inbox anymore',
      ],
    },
  },
  {
    n: '05',
    title: 'User Documentation, Done Right',
    desc: 'Clear documentation that gets new tools adopted instead of ignored — systems only work if people use them.',
    image: 'graphics/doc-sample-cover.png',
    tags: ['Power BI', 'Google Docs'],
    detail: {
      body: [
        'A new tool is only as good as the documentation behind it — without clear docs, teams default back to their old workaround the first time something’s unclear.',
        'This documentation was written to be used, not just filed away: step-by-step instructions with screenshots, written in plain language for the people actually doing the work, not the people who built the system.',
        'The measure of success wasn’t the doc itself — it was adoption. Teams picked up the new tool and stuck with it, because the documentation answered their questions before they had to ask.',
      ],
      highlights: [
        'Step-by-step, screenshot-led instructions',
        'Written in plain language for end users, not admins',
        'Built to drive adoption, not just satisfy a checklist',
        'Delivered in Power BI + Google Docs for easy updates',
      ],
    },
  },
];

// Motion ported from the adhamdannaway.com hero: jQuery's easeOutExpo / easeOutBack as beziers.
const EASE_EXPO = [0.19, 1, 0.22, 1];
const EASE_BACK = [0.34, 1.56, 0.64, 1];

const heroCopy = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_EXPO } },
};

function SplitHero() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  // Width doubles as the "is the seesaw live" flag: 0 => stacked layout, touch, or reduced motion.
  const [width, setWidth] = useState(0);

  // -1 = pointer hard left, 0 = centred, +1 = hard right. The spring reproduces the
  // reference's damped `xp += (target - xp) / 12` follow without its 30fps setInterval.
  const t = useSpring(0, { stiffness: 90, damping: 22, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const measure = () => setWidth(mq.matches && !reduce ? ref.current.getBoundingClientRect().width : 0);
    measure();
    mq.addEventListener('change', measure);
    window.addEventListener('resize', measure);
    return () => {
      mq.removeEventListener('change', measure);
      window.removeEventListener('resize', measure);
    };
  }, [reduce]);

  useEffect(() => {
    if (!width) return;
    const el = ref.current;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      t.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    };
    const onLeave = () => t.set(0);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [width, t]);

  // The seam slides toward the side you point at, so that half grows and the other shrinks.
  const seam = useTransform(t, (v) => -v * width * 0.07);
  const columns = useMotionTemplate`calc(50% + ${seam}px) 1fr`;
  // ponytail: reference fades the far side to 0; floored at 0.4 so the pitch stays readable.
  const dimLeft = useTransform(t, [0, 1], [1, 0.4]);
  const dimRight = useTransform(t, [-1, 0], [0.4, 1]);

  const slide = (dir) => ({
    hidden: { opacity: 0, x: reduce ? 0 : dir * 80 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: reduce ? 0 : 1, ease: EASE_EXPO, delayChildren: 0.7, staggerChildren: 0.08 },
    },
  });

  const portrait = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: reduce ? 0 : 0.9, delay: 0.3, ease: EASE_BACK } },
  };

  return (
    <section id="home" ref={ref} className="relative border-b border-line">
      {/* Reduced motion starts at the finished state, so nothing is ever left hidden. */}
      <motion.div variants={{ hidden: {}, show: {} }} initial={reduce ? 'show' : 'hidden'} animate="show">
        {/* Mobile portrait (desktop version straddles the seam below) */}
        <motion.div variants={portrait} className="lg:hidden flex justify-center pt-10">
          <SplitPortrait className="relative w-36 h-36" />
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 lg:min-h-[calc(100vh-4rem)]"
          style={width ? { gridTemplateColumns: columns } : undefined}
        >
          {/* Left: The CPA — wrappers stay motion.* so the variant chain reaches the copy */}
          <motion.div className="bg-paper flex items-center overflow-hidden">
            <motion.div
              variants={slide(-1)}
              className="w-full max-w-xl ml-auto px-6 lg:pr-40 xl:pr-48 py-16 lg:py-0"
            >
              <motion.div style={{ opacity: dimLeft }}>
              <motion.p variants={heroCopy} className="font-mono text-xs font-bold tracking-widest uppercase text-emerald mb-5">Dr — The CPA</motion.p>
              <motion.h1 variants={heroCopy} className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
                Finance that holds up to an audit.
              </motion.h1>
              <motion.p variants={heroCopy} className="text-ink/60 leading-relaxed mb-8">
                Licensed CPA (NY &amp; TX) keeping nonprofit books, budgets, and Form 990s
                board-clear and funder-ready.
              </motion.p>
              <motion.a variants={heroCopy} href="#services" className="inline-flex items-center gap-2 text-sm font-medium border-b-2 border-emerald pb-1 hover:gap-3 transition-all">
                What I take off your plate <ArrowRight size={15} />
              </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: The Analyst */}
          <motion.div className="bg-pine text-paper flex items-center overflow-hidden">
            <motion.div
              variants={slide(1)}
              className="w-full max-w-xl mr-auto px-6 lg:pl-40 xl:pl-48 py-16 lg:py-0"
            >
              <motion.div style={{ opacity: dimRight }}>
              <motion.p variants={heroCopy} className="font-mono text-xs font-bold tracking-widest uppercase text-emerald mb-5">Cr — The Analyst</motion.p>
              <motion.h2 variants={heroCopy} className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
                Data that people actually use.
              </motion.h2>
              <motion.p variants={heroCopy} className="text-paper/60 leading-relaxed mb-8">
                Power BI, Tableau, and Python turning messy operational data into dashboards
                teams open every Monday.
              </motion.p>
              <motion.a variants={heroCopy} href="#work" className="inline-flex items-center gap-2 text-sm font-medium border-b-2 border-emerald pb-1 hover:gap-3 transition-all">
                See the work <ArrowRight size={15} />
              </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Split portrait straddling the seam (desktop only) — rides the seam as it slides */}
        <motion.div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 xl:w-72 xl:h-72">
          <motion.div variants={portrait} style={width ? { x: seam } : undefined} className="w-full h-full">
            <SplitPortrait className="relative w-full h-full" />
          </motion.div>
        </motion.div>

        {/* Status bar */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: reduce ? 0 : 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1, ease: EASE_EXPO } } }}
          className="border-t border-line bg-paper"
        >
          <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 font-mono text-xs text-ink/50">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              accepting_new_clients: true
            </span>
            <span>location: New York, NY</span>
            <span className="hidden sm:inline">stack: [Power BI, Tableau, Python, Excel]</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProjectDetail({ project, prev, next }) {
  return (
    <div className="bg-paper text-ink font-sans antialiased min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#work" className="inline-flex items-center gap-2 font-mono text-sm hover:text-emerald transition-colors">
            <ArrowLeft size={15} /> all work
          </a>
          <a href="#home" className="font-mono text-sm font-medium tracking-tight">
            tiffany<span className="text-emerald">.</span>tay<span className="text-ink/40"> — CPA</span>
          </a>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="font-mono text-xs font-bold tracking-widest uppercase text-emerald mb-4">
            {project.n} / {String(projects.length).padStart(2, '0')} — Selected Work
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-2">{project.title}</h1>
          {project.subtitle && <p className="font-mono text-sm text-ink/40 mb-8">{project.subtitle}</p>}
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full border border-line my-8" />
          ) : (
            <DataVisual {...project.visual} className="w-full h-64 sm:h-72 border border-line my-8" />
          )}
          <div className="space-y-5 text-ink/70 leading-relaxed max-w-2xl">
            {(project.detail?.body ?? [project.desc]).map((t) => <p key={t}>{t}</p>)}
          </div>
          {project.detail?.highlights && (
            <ul className="mt-10 font-mono text-sm space-y-3">
              {project.detail.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="text-emerald font-bold">+</span>
                  <span className="text-ink/70">{h}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-10 font-mono text-xs text-ink/50 flex flex-wrap gap-x-4 gap-y-1">
            {project.tags.map((t) => <span key={t}>[{t}]</span>)}
          </div>
        </div>
      </main>

      {/* Prev / next project */}
      <nav className="border-t border-line grid sm:grid-cols-2">
        <a href={`#/project/${prev.n}`} className="group p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-line hover:bg-mist transition-colors">
          <div className="font-mono text-xs font-bold text-emerald mb-2 flex items-center gap-2">
            <ArrowLeft size={13} /> PREV — {prev.n}
          </div>
          <div className="font-display font-bold tracking-tight group-hover:text-emerald transition-colors">{prev.title}</div>
        </a>
        <a href={`#/project/${next.n}`} className="group p-6 sm:p-8 text-right hover:bg-mist transition-colors">
          <div className="font-mono text-xs font-bold text-emerald mb-2 flex items-center justify-end gap-2">
            NEXT — {next.n} <ArrowRight size={13} />
          </div>
          <div className="font-display font-bold tracking-tight group-hover:text-emerald transition-colors">{next.title}</div>
        </a>
      </nav>
    </div>
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

  useEffect(() => {
    if (route.startsWith('#/project/')) {
      window.scrollTo(0, 0);
      return;
    }
    // Re-scroll to plain anchors (#work etc.) after returning from a detail page,
    // since the target element doesn't exist until React re-renders the main page.
    const el = route.length > 1 && document.getElementById(route.slice(1));
    if (el) el.scrollIntoView();
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
      <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="font-mono text-sm font-medium tracking-tight">
            tiffany<span className="text-emerald">.</span>tay<span className="text-ink/40"> — CPA</span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-ink/60">
            <a href="#work" className="hover:text-ink transition-colors">Work</a>
            <a href="#services" className="hover:text-ink transition-colors">Services</a>
            <a href="#about" className="hover:text-ink transition-colors">About</a>
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 bg-ink text-paper text-sm font-medium px-4 py-2 hover:bg-emerald transition-colors"
          >
            Contact <ArrowRight size={14} />
          </a>
        </div>
      </header>

      {/* SPLIT HERO */}
      <SplitHero />

      {/* LEDGER */}
      <section className="bg-mist border-b border-line">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionHeader index="01" label="The Balance Sheet" title="A decade, itemized." />
          <Reveal className="max-w-3xl">
            <div className="font-mono text-sm">
              {ledger.map((row) => (
                <div key={row.item} className="flex items-baseline gap-3 py-4 border-b border-ink/10">
                  <span className="text-ink/70">{row.item}</span>
                  <span className="flex-1 border-b border-dotted border-ink/25 translate-y-[-4px]" />
                  <span className="font-medium text-ink tabular-nums">{row.value}</span>
                </div>
              ))}
              <div className="flex items-baseline gap-3 py-4 text-emerald">
                <span className="font-bold">Net position</span>
                <span className="flex-1 border-b border-dotted border-emerald/40 translate-y-[-4px]" />
                <span className="font-bold">Clarity</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-b border-line">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionHeader index="02" label="Services" title="What I take off your plate." />
          <div className="grid sm:grid-cols-2 border-t border-l border-line">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05} className="group border-b border-r border-line p-8 hover:bg-mist transition-colors">
                <div className="font-mono text-xs font-bold text-emerald mb-6">{s.n}</div>
                <h3 className="font-display text-xl font-bold tracking-tight mb-3 group-hover:text-emerald transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-ink/60 leading-relaxed">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="border-b border-line">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionHeader index="03" label="Selected Work" title="Real systems, real organizations." />

          {/* Featured */}
          {projects.filter((p) => p.featured).map((p) => (
            <Reveal key={p.n} className="mb-12">
              <a href={`#/project/${p.n}`} className="group grid md:grid-cols-2 border border-line hover:border-ink transition-colors">
              <div className="overflow-hidden border-b md:border-b-0 md:border-r border-line">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover object-top max-h-80 md:max-h-none group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-emerald">{p.n} / FEATURED</span>
                    <ArrowUpRight size={18} className="text-ink/30 group-hover:text-emerald transition-colors" />
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
                <a href={`#/project/${p.n}`} className="group border border-line hover:border-ink transition-colors flex flex-col h-full">
                <div className="overflow-hidden border-b border-line">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="w-full h-48 object-cover object-top group-hover:scale-[1.03] transition-transform duration-500" />
                  ) : (
                    <DataVisual {...p.visual} className="w-full h-48" />
                  )}
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald">{p.n}</span>
                    <ArrowUpRight size={16} className="text-ink/30 group-hover:text-emerald transition-colors" />
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

      {/* ABOUT */}
      <section id="about" className="bg-pine text-paper border-b border-line">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionHeader index="04" label="About" title="Both sides of the table." dark />
          <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            <Reveal>
              <div className="relative">
                <img src="graphics/6.jpeg" alt="Tiffany Tay" className="w-full object-cover object-top grayscale contrast-110" />
                <div className="absolute inset-0 bg-emerald/20 mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 font-mono text-xs bg-paper text-ink px-3 py-2">
                  fig 1. — the person behind the ledger
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-paper/70 leading-relaxed mb-5">
                For the past decade I&rsquo;ve led finance and operations for venture-backed SaaS
                companies and mission-driven nonprofits — which means I&rsquo;ve seen what happens
                when financial reporting is treated as a compliance checkbox instead of a
                decision-making tool.
              </p>
              <p className="text-paper/70 leading-relaxed mb-8">
                My work sits at the intersection of accounting rigor and modern analytics: Form 990s
                and audited financials on one side, Power BI and Python on the other. I use both to
                help small, resource-strapped teams see exactly where their money and time are going
                — and where they should go instead.
              </p>
              <p className="font-display text-2xl font-bold tracking-tight text-emerald mb-10">
                &ldquo;Good financial systems shouldn&rsquo;t require a translator.&rdquo;
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
          <SectionHeader index="05" label="Non-Billable Hours" title="Off the clock." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {offTheClock.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full aspect-square object-cover border border-line mb-4" />
                ) : (
                  <div className="w-full aspect-square border border-line bg-paper mb-4 flex items-center justify-center p-3">
                    <span className="font-mono text-[10px] text-ink/30 text-center break-all">{item.slot}</span>
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
            <SectionHeader index="06" label="Contact" title="Let's close the gap between your books and your board." />
            <Reveal>
              <p className="text-ink/60 leading-relaxed mb-8 max-w-md">
                Tell me what&rsquo;s keeping your finance stack messy — I reply within two business days.
              </p>
              <div className="space-y-1 font-mono text-sm">
                <a href="mailto:tnt@poweredbytnt.com" className="flex items-center gap-3 py-3 border-b border-line hover:text-emerald transition-colors">
                  <Mail size={16} className="text-emerald" /> tnt@poweredbytnt.com
                </a>
                <a href="https://www.linkedin.com/in/tiffany-n-tay/" className="flex items-center gap-3 py-3 border-b border-line hover:text-emerald transition-colors">
                  <Linkedin size={16} className="text-emerald" /> in/tiffany-n-tay
                </a>
                <a href="https://github.com/tiffanytay" className="flex items-center gap-3 py-3 border-b border-line hover:text-emerald transition-colors">
                  <Github size={16} className="text-emerald" /> tiffanytay
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:pt-24">
            {status === 'success' ? (
              <div className="border border-line h-full flex flex-col items-center justify-center text-center p-10">
                <CheckCircle2 className="text-emerald mb-4" size={36} />
                <h3 className="font-display text-xl font-bold mb-2">Message sent</h3>
                <p className="text-ink/60 text-sm">Thanks for reaching out — I&rsquo;ll be in touch soon.</p>
              </div>
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
                  className="inline-flex items-center gap-2 bg-ink text-paper px-7 py-3 font-medium hover:bg-emerald transition-colors disabled:opacity-60"
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
          <span>tiffany<span className="text-emerald">.</span>tay — nonprofit finance &amp; operations</span>
          <div className="flex items-center gap-5">
            <a href="https://www.linkedin.com/in/tiffany-n-tay/" className="hover:text-emerald transition-colors"><Linkedin size={16} /></a>
            <a href="https://github.com/tiffanytay" className="hover:text-emerald transition-colors"><Github size={16} /></a>
            <a href="mailto:tnt@poweredbytnt.com" className="hover:text-emerald transition-colors"><Mail size={16} /></a>
          </div>
          <span>&copy; 2026 — all figures reconciled</span>
        </div>
      </footer>
    </div>
  );
}
