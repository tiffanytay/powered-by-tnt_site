import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

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

const projects = [
  {
    n: '01',
    title: 'Nonprofit Insights Dashboard',
    subtitle: 'Form 990 Data Aggregation',
    desc: 'Years of Form 990 filings aggregated into one Power BI model — leadership tracks trends, benchmarks against peers, and walks into board meetings with answers instead of spreadsheets.',
    image: 'graphics/coqual-990-financial-screenshot.png',
    tags: ['Power BI', 'Power Query'],
    featured: true,
  },
  {
    n: '02',
    title: 'Project Management Dashboard',
    desc: 'An Excel-based command center turning raw project data into a live view of timelines, budgets, and bottlenecks.',
    image: 'graphics/projmgmt-dashboard.png',
    tags: ['Excel', 'Tableau'],
  },
  {
    n: '03',
    title: 'Data for Paws',
    desc: 'Scattered Colorado shelter data wrangled into a clear, data-backed case for where animal welfare resources should go next.',
    image: 'graphics/nkc-screenshot_tiffany-tay.png',
    tags: ['Python', 'Tableau', 'Power BI'],
  },
  {
    n: '04',
    title: 'Grantseeking Tracker',
    desc: 'The full grant lifecycle — deadlines, drafts, follow-ups — in one practical system where nothing falls through the cracks.',
    image: 'graphics/grantseeking-tracker.png',
    tags: ['Power BI', 'Excel', 'Perplexity AI'],
  },
  {
    n: '05',
    title: 'User Documentation, Done Right',
    desc: 'Clear documentation that gets new tools adopted instead of ignored — systems only work if people use them.',
    image: 'graphics/doc-sample-cover.png',
    tags: ['Power BI', 'Google Docs'],
  },
];

export default function TiffanyPortfolio() {
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
      <section id="home" className="relative border-b border-line">
        {/* Mobile portrait (desktop version straddles the seam below) */}
        <div className="lg:hidden flex justify-center pt-10">
          <SplitPortrait className="relative w-36 h-36" />
        </div>
        <div className="grid lg:grid-cols-2 lg:min-h-[calc(100vh-4rem)]">
          {/* Left: The CPA */}
          <div className="bg-paper flex items-center">
            <div className="w-full max-w-xl ml-auto px-6 lg:pr-40 xl:pr-48 py-16 lg:py-0">
              <p className="font-mono text-xs font-bold tracking-widest uppercase text-emerald mb-5">Dr — The CPA</p>
              <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
                Finance that holds up to an audit.
              </h1>
              <p className="text-ink/60 leading-relaxed mb-8">
                Licensed CPA (NY &amp; TX) keeping nonprofit books, budgets, and Form 990s
                board-clear and funder-ready.
              </p>
              <a href="#services" className="inline-flex items-center gap-2 text-sm font-medium border-b-2 border-emerald pb-1 hover:gap-3 transition-all">
                What I take off your plate <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Right: The Analyst */}
          <div className="bg-pine text-paper flex items-center">
            <div className="w-full max-w-xl mr-auto px-6 lg:pl-40 xl:pl-48 py-16 lg:py-0">
              <p className="font-mono text-xs font-bold tracking-widest uppercase text-emerald mb-5">Cr — The Analyst</p>
              <h2 className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
                Data that people actually use.
              </h2>
              <p className="text-paper/60 leading-relaxed mb-8">
                Power BI, Tableau, and Python turning messy operational data into dashboards
                teams open every Monday.
              </p>
              <a href="#work" className="inline-flex items-center gap-2 text-sm font-medium border-b-2 border-emerald pb-1 hover:gap-3 transition-all">
                See the work <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Split portrait straddling the seam (desktop only) */}
        <SplitPortrait className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 xl:w-72 xl:h-72" />

        {/* Status bar */}
        <div className="border-t border-line bg-paper">
          <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 font-mono text-xs text-ink/50">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              accepting_new_clients: true
            </span>
            <span>location: New York, NY</span>
            <span className="hidden sm:inline">stack: [Power BI, Tableau, Python, Excel]</span>
          </div>
        </div>
      </section>

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
            <Reveal key={p.n} className="group grid md:grid-cols-2 border border-line mb-12 hover:border-ink transition-colors">
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
            </Reveal>
          ))}

          {/* Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {projects.filter((p) => !p.featured).map((p, i) => (
              <Reveal key={p.n} delay={i * 0.05} className="group border border-line hover:border-ink transition-colors flex flex-col">
                <div className="overflow-hidden border-b border-line">
                  <img src={p.image} alt={p.title} className="w-full h-48 object-cover object-top group-hover:scale-[1.03] transition-transform duration-500" />
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

      {/* CONTACT */}
      <section id="contact" className="border-b border-line">
        <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14">
          <div>
            <SectionHeader index="05" label="Contact" title="Let's close the gap between your books and your board." />
            <Reveal>
              <p className="text-ink/60 leading-relaxed mb-8 max-w-md">
                Tell me what&rsquo;s keeping your finance stack messy — I reply within two business days.
              </p>
              <div className="space-y-1 font-mono text-sm">
                <a href="mailto:ttay@poweredbytnt.com" className="flex items-center gap-3 py-3 border-b border-line hover:text-emerald transition-colors">
                  <Mail size={16} className="text-emerald" /> ttay@poweredbytnt.com
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
            <a href="mailto:ttay@poweredbytnt.com" className="hover:text-emerald transition-colors"><Mail size={16} /></a>
          </div>
          <span>&copy; 2026 — all figures reconciled</span>
        </div>
      </footer>
    </div>
  );
}
