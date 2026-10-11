import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, ArrowUpRight, Search, X } from 'lucide-react';
import dogRunUrl from './assets/dog-run.png';

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

// The Budget Canary mascot from budgetcanary.com/waitlist, in that site's own colors. Motion lives in index.css (.bc-*).
const BC_NOTES = [
  ['♪', 37.5, 9, 4.2, 1.95],
  ['♫', 39.5, 12, 3.2, 2.15],
  ['♪', 38, 15.5, 2.6, 2.4],
  ['$', 41.5, 7.5, 3.6, 2.05],
  ['#', 42, 14, 3, 2.28],
];

function CanaryVisual({ className = '' }) {
  return (
    <div className={`bg-[#f5f3f4] flex items-center justify-center overflow-hidden ${className}`}>
      <svg viewBox="2 2 40 40" className="h-[85%] w-auto overflow-visible" fill="none" stroke="#091426" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="The Budget Canary, chirping">
        <g className="bc-body">
          <path d="M25 9c-7 0-12 5-12 12 0 5 3 8 3 11h10c0-4 6-7 6-13 0-3-1-5-2-6" fill="#fadfb8" />
          <path d="M17 22c3 1 6 0 8-2" />
          <path d="M31 13l5-2-4 4" className="bc-beak" />
          <circle cx="28" cy="14" r="1.1" fill="#091426" stroke="none" />
          <path d="M19 32v4M24 32v4" />
        </g>
        <path d="M11 37.4h22" stroke="#c5c6cd" strokeWidth="0.5" />
        <g fill="#091426" stroke="none" fontFamily="Georgia, serif">
          {BC_NOTES.map(([ch, x, y, size, delay]) => (
            <text key={x} x={x} y={y} fontSize={size} className="bc-note" style={{ animationDelay: `${delay}s` }}
              {...(ch === '$' || ch === '#' ? { fontFamily: 'var(--font-display), sans-serif', fontWeight: 700 } : {})}>
              {ch}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}

const services = [
  {
    n: '01',
    title: 'Operations & Process Design',
    desc: 'The informal, inconsistent, lives-in-someone’s-head process, rebuilt as a repeatable system anyone on the team can run.',
    art: (<>
      <g className="stroke-emerald" fill="none" strokeWidth="1.5" strokeLinecap="round">
        <path className="a-draw d" pathLength="1" style={{ '--d': '750ms', '--t': '300ms' }} d="M313 180H342" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '850ms', '--t': '300ms' }} d="M368 180H397" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '950ms', '--t': '300ms' }} d="M423 180H452" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '1050ms', '--t': '300ms' }} d="M478 180H507" />
      </g>
      <g className="fill-paper stroke-emerald" strokeWidth="1.5">
        <rect className="a-fly" x="287" y="167" width="26" height="26" style={{ '--dx': '-70px', '--dy': '-120px', '--r': '-22deg', '--d': '0ms' }} />
        <rect className="a-fly" x="342" y="167" width="26" height="26" style={{ '--dx': '40px', '--dy': '-140px', '--r': '35deg', '--d': '50ms' }} />
        <rect className="a-fly" x="397" y="167" width="26" height="26" style={{ '--dx': '-95px', '--dy': '-50px', '--r': '18deg', '--d': '100ms' }} />
        <rect className="a-fly" x="452" y="167" width="26" height="26" style={{ '--dx': '15px', '--dy': '-100px', '--r': '-40deg', '--d': '150ms' }} />
        <rect className="a-fly" x="507" y="167" width="26" height="26" style={{ '--dx': '-30px', '--dy': '-150px', '--r': '26deg', '--d': '200ms' }} />
      </g>
      <circle className="a-travel fill-emerald-deep" cx="300" cy="180" r="4" />
      <path className="a-draw d stroke-emerald-deep" pathLength="1" style={{ '--d': '1300ms', '--t': '400ms' }} d="M513 180l4 4 9-9" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <text className="a-fade" x="533" y="218" textAnchor="end" fill="rgba(11,18,16,.45)" style={{ '--d': '1450ms' }}>runbook v1</text>
    </>),
  },
  {
    n: '02',
    title: 'Financial Operations & Controls',
    desc: 'Books, budgets, and spend under a CPA’s eye: clean lines, real oversight, and the recurring costs nobody has questioned in years.',
    art: (<>
      <g fill="none" stroke="rgba(102,195,255,.6)" strokeWidth="1">
        <path className="a-draw d" pathLength="1" style={{ '--d': '0ms' }} d="M300 70H540" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '70ms' }} d="M300 98H540" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '140ms' }} d="M300 126H540" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '210ms' }} d="M300 154H540" />
      </g>
      <g className="fill-emerald">
        <rect className="a-grow" x="300" y="56" width="92" height="6" fillOpacity=".45" style={{ '--d': '200ms' }} />
        <rect className="a-grow from-r" x="462" y="56" width="46" height="6" style={{ '--d': '300ms' }} />
        <rect className="a-grow" x="300" y="84" width="70" height="6" fillOpacity=".45" style={{ '--d': '270ms' }} />
        <rect className="a-grow from-r" x="462" y="84" width="46" height="6" style={{ '--d': '370ms' }} />
        <g className="a-dim" style={{ '--d': '1400ms' }}>
          <rect className="a-grow" x="300" y="112" width="112" height="6" fillOpacity=".45" style={{ '--d': '340ms' }} />
          <rect className="a-grow from-r" x="462" y="112" width="46" height="6" style={{ '--d': '440ms' }} />
        </g>
        <rect className="a-grow" x="300" y="140" width="82" height="6" fillOpacity=".45" style={{ '--d': '410ms' }} />
        <rect className="a-grow from-r" x="462" y="140" width="46" height="6" style={{ '--d': '510ms' }} />
      </g>
      <g className="stroke-emerald-deep" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path className="a-draw d" pathLength="1" style={{ '--d': '800ms', '--t': '300ms' }} d="M520 59l4 4 8-9" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '960ms', '--t': '300ms' }} d="M520 87l4 4 8-9" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '1250ms', '--t': '400ms' }} d="M294 115H514" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '1120ms', '--t': '300ms' }} d="M520 143l4 4 8-9" />
      </g>
      <text className="a-fade fill-emerald-deep" x="540" y="119" textAnchor="end" style={{ '--d': '1550ms' }}>cut</text>
      <g className="stroke-ink" fill="none" strokeOpacity=".5" strokeWidth="1">
        <path className="a-draw d" pathLength="1" style={{ '--d': '1500ms', '--t': '400ms' }} d="M440 172H540" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '1580ms', '--t': '400ms' }} d="M440 177H540" />
      </g>
      <text className="a-fade" x="300" y="193" fill="rgba(11,18,16,.45)" style={{ '--d': '1650ms' }}>total</text>
      <rect className="a-grow from-r fill-emerald-deep" x="462" y="186" width="46" height="7" style={{ '--d': '1700ms' }} />
    </>),
  },
  {
    n: '03',
    title: 'Diagnostics & Analysis',
    desc: 'Data scattered across apps, plus what people actually tell you, pulled into one view, so you fix the root cause, not the symptom.',
    art: (<>
      <path className="a-draw d" pathLength="1" style={{ '--t': '700ms' }} d="M300 36V204H548" fill="none" stroke="rgba(102,195,255,.7)" strokeWidth="1" />
      <line className="a-scan stroke-emerald" x1="300" y1="36" x2="300" y2="204" strokeWidth="1.5" />
      <g className="fill-emerald">
        <circle className="a-fly" cx="320" cy="184" r="4" style={{ '--dx': '-120px', '--dy': '-130px', '--d': '150ms' }} />
        <circle className="a-fly" cx="345" cy="174" r="4" style={{ '--dx': '180px', '--dy': '-150px', '--d': '190ms' }} />
        <circle className="a-fly" cx="370" cy="168" r="4" style={{ '--dx': '-90px', '--dy': '40px', '--d': '230ms' }} />
        <circle className="a-fly" cx="395" cy="154" r="4" style={{ '--dx': '140px', '--dy': '60px', '--d': '270ms' }} />
        <circle className="a-fly" cx="420" cy="148" r="4" style={{ '--dx': '-160px', '--dy': '-60px', '--d': '310ms' }} />
        <circle className="a-fly" cx="445" cy="134" r="4" style={{ '--dx': '90px', '--dy': '-120px', '--d': '350ms' }} />
        <circle className="a-fly" cx="470" cy="126" r="4" style={{ '--dx': '-60px', '--dy': '90px', '--d': '390ms' }} />
        <circle className="a-fly" cx="495" cy="114" r="4" style={{ '--dx': '60px', '--dy': '110px', '--d': '430ms' }} />
        <circle className="a-fly" cx="520" cy="104" r="4" style={{ '--dx': '-200px', '--dy': '20px', '--d': '470ms' }} />
      </g>
      <path className="a-draw d stroke-emerald" pathLength="1" style={{ '--d': '900ms', '--t': '600ms' }} d="M312 190L532 98" fill="none" strokeOpacity=".6" strokeWidth="1" />
      <circle className="a-fly fill-emerald-deep" cx="452" cy="66" r="4.5" style={{ '--dx': '110px', '--dy': '-40px', '--d': '510ms' }} />
      <circle className="a-ring stroke-emerald-deep" cx="452" cy="66" r="13" fill="none" strokeWidth="1.5" style={{ '--d': '1300ms' }} />
      <circle className="a-pulse stroke-emerald" cx="452" cy="66" r="13" fill="none" strokeWidth="1.5" style={{ '--d': '1900ms' }} />
      <path className="a-fade stroke-emerald-deep" style={{ '--d': '1450ms' }} d="M452 44V52M452 80V88M430 66H438M466 66H474" fill="none" strokeWidth="1.5" strokeLinecap="round" />
      <text className="a-fade fill-emerald-deep" x="480" y="62" style={{ '--d': '1650ms' }}>root cause</text>
    </>),
  },
  {
    n: '04',
    title: 'Product & Internal Tooling',
    desc: 'When the fix is a tool that doesn’t exist yet: PRD, stack decision, and a working build, not a recommendation deck.',
    art: (<>
      <rect className="a-draw d fill-paper stroke-emerald" pathLength="1" style={{ '--t': '700ms' }} x="330" y="34" width="210" height="150" fillOpacity=".6" strokeWidth="1.5" />
      <path className="a-draw d stroke-emerald" pathLength="1" style={{ '--d': '400ms', '--t': '400ms' }} d="M330 52H540" fill="none" strokeWidth="1" />
      <g className="fill-emerald">
        <circle className="a-pop" cx="340" cy="43" r="2.5" style={{ '--d': '500ms' }} />
        <circle className="a-pop" cx="348" cy="43" r="2.5" style={{ '--d': '550ms' }} />
        <circle className="a-pop" cx="356" cy="43" r="2.5" style={{ '--d': '600ms' }} />
        <rect className="a-fade" x="330" y="52" width="44" height="132" fillOpacity=".15" style={{ '--d': '650ms' }} />
        <rect className="a-grow" x="338" y="64" width="26" height="4" fillOpacity=".6" style={{ '--d': '750ms' }} />
        <rect className="a-grow" x="338" y="76" width="20" height="4" fillOpacity=".6" style={{ '--d': '800ms' }} />
        <rect className="a-grow" x="338" y="88" width="24" height="4" fillOpacity=".6" style={{ '--d': '850ms' }} />
        <rect className="a-grow" x="386" y="66" width="120" height="6" style={{ '--d': '800ms', '--t': '350ms', '--ease': 'steps(9,end)' }} />
        <rect className="a-grow" x="386" y="80" width="86" height="6" style={{ '--d': '1150ms', '--t': '300ms', '--ease': 'steps(7,end)' }} />
        <rect className="a-grow" x="386" y="94" width="136" height="6" style={{ '--d': '1450ms', '--t': '400ms', '--ease': 'steps(10,end)' }} />
      </g>
      <g className="a-fade" style={{ '--d': '1850ms' }}><rect className="a-blink fill-emerald-deep" x="525" y="92" width="2" height="10" /></g>
      <rect className="a-draw d stroke-emerald" pathLength="1" style={{ '--d': '1000ms', '--t': '500ms' }} x="386" y="112" width="140" height="44" fill="none" strokeWidth="1" />
      <g className="fill-emerald" fillOpacity=".55">
        <rect className="a-growy" x="396" y="138" width="12" height="14" style={{ '--d': '1250ms' }} />
        <rect className="a-growy" x="416" y="130" width="12" height="22" style={{ '--d': '1300ms' }} />
        <rect className="a-growy" x="436" y="134" width="12" height="18" style={{ '--d': '1350ms' }} />
        <rect className="a-growy" x="456" y="122" width="12" height="30" style={{ '--d': '1400ms' }} />
        <rect className="a-growy" x="476" y="126" width="12" height="26" style={{ '--d': '1450ms' }} />
        <rect className="a-growy" x="496" y="118" width="12" height="34" style={{ '--d': '1500ms' }} />
      </g>
      <rect className="a-pop fill-emerald-deep" x="470" y="164" width="56" height="12" style={{ '--d': '2000ms' }} />
      <text className="a-fade" x="330" y="208" fill="rgba(11,18,16,.5)" style={{ '--d': '300ms' }}>prd.md</text>
      <text className="a-fade" x="376" y="208" fill="rgba(11,18,16,.5)" style={{ '--d': '900ms' }}>→ stack</text>
      <text className="a-fade" x="430" y="208" fill="rgba(11,18,16,.5)" style={{ '--d': '1500ms' }}>→ build</text>
      <text className="a-fade fill-emerald-deep" x="540" y="208" textAnchor="end" style={{ '--d': '2100ms' }}>shipped</text>
    </>),
  },
];

// Drop a photo into public/graphics/ and set `image` to swap out the placeholder tile.
const offTheClock = [
  {
    title: 'Dogs',
    desc: 'Ask me about my dog; tell me about yours! ; )',
    image: 'graphics/personal-dogs.jpg',
    slot: 'personal-dogs.jpg',
    runner: true,
  },
  {
    title: 'Broadway',
    desc: 'Fifteen minutes from the theater district and fully taking advantage of it.',
    image: 'graphics/personal-broadway.jpg',
    slot: 'personal-broadway.jpg',
    broadway: true,
  },
  {
    title: 'Travel & Food',
    desc: 'New cities, and eating my way through them one unfamiliar menu at a time.',
    image: 'graphics/pasta.jpg',
    slot: 'personal-travel.jpg',
    passport: true,
  },
  {
    title: 'Puzzles',
    desc: 'The same pattern-finding itch that makes the day job fun, minus the deadlines.',
    image: null,
    slot: 'personal-puzzles.jpg',
    jigsaw: true,
  },
];

// 4x4 jigsaw cut of a 100x100 tile. Tab direction per shared edge is fixed so the cut is stable.
const JIG_N = 4, JIG_S = 100 / JIG_N;
const jigTab = (a, b) => ((a * 7 + b * 13) % 3 ? 1 : -1);
const jigEdge = (ax, ay, bx, by, s) => {
  if (!s) return `L${bx},${by}`;
  const dx = bx - ax, dy = by - ay;
  // u runs along the edge, v pushes out along the piece's outward normal.
  const p = (u, v) => `${ax + u * dx + v * s * dy},${ay + u * dy - v * s * dx}`;
  return `L${p(.35, 0)} C${p(.42, 0)} ${p(.3, .22)} ${p(.5, .22)} C${p(.7, .22)} ${p(.58, 0)} ${p(.65, 0)} L${bx},${by}`;
};
const jigPieces = Array.from({ length: JIG_N * JIG_N }, (_, i) => {
  const r = Math.floor(i / JIG_N), c = i % JIG_N, x = c * JIG_S, y = r * JIG_S, X = x + JIG_S, Y = y + JIG_S;
  const top = r ? -jigTab(r - 1, c + 5) : 0, bottom = r < JIG_N - 1 ? jigTab(r, c + 5) : 0;
  const left = c ? -jigTab(r + 9, c - 1) : 0, right = c < JIG_N - 1 ? jigTab(r + 9, c) : 0;
  const j = ((r * 5 + c * 3) % 5) - 2;
  return {
    d: `M${x},${y} ${jigEdge(x, y, X, y, top)} ${jigEdge(X, y, X, Y, right)} ${jigEdge(X, Y, x, Y, bottom)} ${jigEdge(x, Y, x, y, left)} Z`,
    style: { '--dx': `${(c - 1.5) * 3 + j * .6}px`, '--dy': `${(r - 1.5) * 3 - j * .5}px`, '--r': `${j * 3}deg`, '--d': `${(r + c) * 25}ms` },
  };
});

// Hover overlay: the tile cracks along the jigsaw cut and the pieces burst apart, then settle back on leave.
function JigsawShatter({ image }) {
  return (
    <svg className="jig-pieces" viewBox="0 0 100 100" aria-hidden="true">
      {image && (
        <defs>
          <pattern id="jig-img" patternUnits="userSpaceOnUse" width="100" height="100">
            <image href={image} width="100" height="100" preserveAspectRatio="xMidYMid slice" />
          </pattern>
        </defs>
      )}
      {jigPieces.map((p, i) => (
        <path key={i} d={p.d} style={p.style} fill={image ? 'url(#jig-img)' : 'var(--color-paper)'}
          stroke={image ? 'rgba(255,255,255,.85)' : 'rgba(11,18,16,.3)'} />
      ))}
    </svg>
  );
}

// STAR case studies. Each one carries an `image` slot — drop the file into public/graphics/
// and set `image` to swap the DataVisual placeholder for a real screenshot.
const projects = [
  {
    n: '01',
    title: 'Rebuilt Nonprofit Finance Ops as Operations Director',
    subtitle: 'Ownership under ambiguity',
    desc: 'Nominated and voted into a role that had sat vacant for months, then set the bookkeeping standard, stood up a budget process for a $250k budget, oversaw the 990 filing, streamlined vendor onboarding, and audited every recurring expense.',
    image: null,
    slot: 'case-nonprofit-ops.png',
    tags: ['QuickBooks', 'BILL.com', 'Google Sheets'],
    featured: true,
    art: (<>
      <g className="a-dim" style={{ '--d': '800ms' }}>
        <text className="a-fade" x="300" y="36" fill="rgba(11,18,16,.5)">role: vacant</text>
        <rect className="a-fade" x="300" y="44" width="56" height="40" fill="none" stroke="rgba(11,18,16,.4)" strokeWidth="1.25" strokeDasharray="4 3" />
      </g>
      <rect className="a-draw d" pathLength="1" style={{ '--d': '700ms', '--t': '500ms' }} x="300" y="44" width="56" height="40" fill="#ffffff" fillOpacity=".7" stroke="#0b6bb0" strokeWidth="1.75" />
      <circle className="a-pop" cx="328" cy="58" r="5" fill="#0b6bb0" style={{ '--d': '1000ms' }} />
      <path className="a-draw d" pathLength="1" style={{ '--d': '1050ms', '--t': '300ms' }} d="M318 78c2-9 18-9 20 0" fill="none" stroke="#0b6bb0" strokeWidth="1.75" strokeLinecap="round" />
      <text className="a-fade" x="366" y="68" fill="#0b6bb0" style={{ '--d': '1200ms' }}>owned</text>
      <g fill="none" stroke="rgba(102,195,255,.6)" strokeWidth="1">
        <path className="a-draw d" pathLength="1" style={{ '--d': '300ms' }} d="M300 116H540" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '360ms' }} d="M300 138H540" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '420ms' }} d="M300 160H540" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '480ms' }} d="M300 182H540" />
      </g>
      <g fill="#66c3ff">
        <rect className="a-grow" x="300" y="104" width="84" height="6" fillOpacity=".45" style={{ '--d': '400ms' }} />
        <rect className="a-grow from-r" x="466" y="104" width="44" height="6" style={{ '--d': '500ms' }} />
        <rect className="a-grow" x="300" y="126" width="62" height="6" fillOpacity=".45" style={{ '--d': '460ms' }} />
        <rect className="a-grow from-r" x="466" y="126" width="44" height="6" style={{ '--d': '560ms' }} />
        <g className="a-dim" style={{ '--d': '1650ms' }}>
          <rect className="a-grow" x="300" y="148" width="100" height="6" fillOpacity=".45" style={{ '--d': '520ms' }} />
          <rect className="a-grow from-r" x="466" y="148" width="44" height="6" style={{ '--d': '620ms' }} />
        </g>
        <rect className="a-grow" x="300" y="170" width="74" height="6" fillOpacity=".45" style={{ '--d': '580ms' }} />
        <rect className="a-grow from-r" x="466" y="170" width="44" height="6" style={{ '--d': '680ms' }} />
      </g>
      <g fill="none" stroke="#0b6bb0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path className="a-draw d" pathLength="1" style={{ '--d': '1300ms', '--t': '300ms' }} d="M522 107l3.5 3.5 7-8" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '1400ms', '--t': '300ms' }} d="M522 129l3.5 3.5 7-8" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '1500ms', '--t': '250ms' }} d="M523 147l8 8M531 147l-8 8" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '1600ms', '--t': '400ms' }} d="M294 151H514" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '1700ms', '--t': '300ms' }} d="M522 173l3.5 3.5 7-8" />
      </g>
      <text className="a-fade" x="300" y="210" fill="rgba(11,18,16,.5)" style={{ '--d': '500ms' }}>recurring expenses</text>
      <text className="a-fade" x="540" y="210" textAnchor="end" fill="#0b6bb0" style={{ '--d': '1900ms' }}>−5%</text>
    </>),
    visual: {
      eyebrow: 'Finance Operations',
      flow: ['Elected to vacant role', 'Standards set', '$250k budget managed', '990 filing overseen', 'Vendor onboarding streamlined', 'Expenses cut'],
      stat: '5%',
      statLabel: 'of recurring spend eliminated',
    },
    star: {
      situation: 'A nonprofit had gone months without an Operations Director, leaving bookkeeping and expense oversight unmanaged.',
      task: 'Nominated and voted into the role, bring structure back to financial operations, compliance and vendor management across staff and the external bookkeeper.',
      action: 'Directed staff and the external bookkeeper on how the books should be kept, down to which lines to break out; stood up a budget process and managed the $250k budget; oversaw the annual 990 filing; streamlined onboarding for new vendors; and reviewed every recurring expense for necessity and cost.',
      result: 'Cut 5% of recurring expenses that were unnecessary or had cheaper alternatives, with a $250k budget under a working budget process, a filed 990, and a simpler path for onboarding new vendors.',
    },
  },
  {
    n: '02',
    title: 'Run Operations & Technology for a Lean Nonprofit',
    subtitle: 'Cross-functional ownership',
    desc: 'Joined mid-project and brought a stalled mobile app to launch, then took on the department’s budget, roadmap and staff — plus whatever else the organization needed.',
    image: null,
    slot: 'case-nonprofit-ops-tech.png',
    tags: ['Jira', 'Slack', 'Claude'],
    art: (<>
      <g fill="rgba(11,18,16,.5)">
        <text className="a-fade" x="300" y="40" style={{ '--d': '0ms' }}>todo</text>
        <text className="a-fade" x="384" y="40" style={{ '--d': '50ms' }}>doing</text>
        <text className="a-fade" x="468" y="40" style={{ '--d': '100ms' }}>done</text>
      </g>
      <g fill="none" stroke="#66c3ff" strokeWidth="1.5">
        <path className="a-draw d" pathLength="1" style={{ '--d': '100ms', '--t': '400ms' }} d="M300 48H372" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '160ms', '--t': '400ms' }} d="M384 48H456" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '220ms', '--t': '400ms' }} d="M468 48H540" />
      </g>
      <g fill="#ffffff" stroke="#66c3ff" strokeWidth="1.25">
        <rect className="a-fly" x="300" y="58" width="72" height="14" style={{ '--dx': '-60px', '--dy': '-70px', '--r': '-14deg', '--d': '250ms' }} />
        <rect className="a-fly" x="300" y="78" width="72" height="14" style={{ '--dx': '-90px', '--dy': '20px', '--r': '10deg', '--d': '300ms' }} />
        <rect className="a-fly" x="300" y="98" width="72" height="14" style={{ '--dx': '-40px', '--dy': '80px', '--r': '-18deg', '--d': '350ms' }} />
        <rect className="a-fly" x="384" y="58" width="72" height="14" style={{ '--dx': '20px', '--dy': '-100px', '--r': '16deg', '--d': '400ms' }} />
        <rect className="a-fly" x="384" y="78" width="72" height="14" style={{ '--dx': '-30px', '--dy': '110px', '--r': '-8deg', '--d': '450ms' }} />
        <rect className="a-fly" x="468" y="58" width="72" height="14" style={{ '--dx': '80px', '--dy': '-80px', '--r': '22deg', '--d': '500ms' }} />
        <rect className="a-fly" x="468" y="78" width="72" height="14" style={{ '--dx': '100px', '--dy': '30px', '--r': '-14deg', '--d': '550ms' }} />
      </g>
      <rect className="a-travel" x="300" y="118" width="72" height="14" fill="#0b6bb0" style={{ '--tx': '168px', '--d': '1300ms' }} />
      <text className="a-fade" x="300" y="160" fill="rgba(11,18,16,.5)" style={{ '--d': '600ms' }}>budget</text>
      <rect className="a-grow" x="300" y="168" width="200" height="8" fill="#66c3ff" fillOpacity=".45" style={{ '--d': '700ms', '--t': '700ms' }} />
      <rect className="a-grow" x="500" y="168" width="30" height="8" fill="#0b6bb0" style={{ '--d': '1500ms' }} />
      <text className="a-fade" x="540" y="160" textAnchor="end" fill="#0b6bb0" style={{ '--d': '1700ms' }}>$200k</text>
      <g fill="#66c3ff">
        <circle className="a-pop" cx="304" cy="208" r="4" style={{ '--d': '900ms' }} />
        <circle className="a-pop" cx="320" cy="208" r="4" style={{ '--d': '950ms' }} />
        <circle className="a-pop" cx="336" cy="208" r="4" style={{ '--d': '1000ms' }} />
        <circle className="a-pop" cx="352" cy="208" r="4" style={{ '--d': '1050ms' }} />
        <circle className="a-pop" cx="368" cy="208" r="4" style={{ '--d': '1100ms' }} />
        <circle className="a-pop" cx="384" cy="208" r="4" style={{ '--d': '1150ms' }} />
      </g>
      <g fill="none" stroke="#0b6bb0" strokeWidth="1.5" strokeLinecap="round">
        <path className="a-draw d" pathLength="1" style={{ '--d': '1300ms', '--t': '400ms' }} d="M304 202Q312 190 320 202" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '1400ms', '--t': '400ms' }} d="M336 202Q344 190 352 202" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '1500ms', '--t': '400ms' }} d="M368 202Q376 190 384 202" />
      </g>
      <text className="a-fade" x="540" y="212" textAnchor="end" fill="rgba(11,18,16,.5)" style={{ '--d': '1700ms' }}>team of 3+</text>
    </>),
    visual: {
      eyebrow: 'Operations & Technology',
      flow: ['Inherited stalled project', 'Owned budget & roadmap', 'Built intake automation', 'Led team of 3+'],
      stat: '3 staff + contractors',
      statLabel: 'managed across a $200k department',
    },
    star: {
      situation: 'A lean nonprofit had a mobile app project stalled mid-build and a technology department without clear ownership.',
      task: 'Join mid-project, get the app to launch, then take on the department’s budget, roadmap and staff.',
      action: 'Brought the stalled app to launch, owned the budget and roadmap, built intake automation, and led a team of 3+ staff and contractors, picking up whatever else the organization needed.',
      result: 'Launched the app and ran a $200k department with 3 staff plus contractors.',
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
    art: (<>
      <g fill="#ffffff" fillOpacity=".7" stroke="#66c3ff" strokeWidth="1.25">
        <rect className="a-draw d" pathLength="1" style={{ '--d': '0ms', '--t': '400ms' }} x="300" y="40" width="50" height="26" />
        <rect className="a-draw d" pathLength="1" style={{ '--d': '80ms', '--t': '400ms' }} x="300" y="78" width="50" height="26" />
        <rect className="a-draw d" pathLength="1" style={{ '--d': '160ms', '--t': '400ms' }} x="300" y="116" width="50" height="26" />
        <rect className="a-draw d" pathLength="1" style={{ '--d': '240ms', '--t': '400ms' }} x="300" y="154" width="50" height="26" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '300ms', '--t': '250ms' }} d="M308 180V188L316 180" strokeLinejoin="round" />
      </g>
      <g fill="rgba(11,18,16,.55)" textAnchor="middle">
        <text className="a-fade" x="325" y="57" style={{ '--d': '200ms', fontSize: '9px' }}>app 1</text>
        <text className="a-fade" x="325" y="95" style={{ '--d': '280ms', fontSize: '9px' }}>app 2</text>
        <text className="a-fade" x="325" y="133" style={{ '--d': '360ms', fontSize: '9px' }}>app 3</text>
        <text className="a-fade" x="325" y="171" style={{ '--d': '440ms', fontSize: '9px' }}>“…”</text>
      </g>
      <g fill="none" stroke="rgba(102,195,255,.8)" strokeWidth="1">
        <path className="a-draw d" pathLength="1" style={{ '--d': '400ms', '--t': '500ms' }} d="M350 53C380 53 378 110 404 110" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '440ms', '--t': '500ms' }} d="M350 91C376 91 380 110 404 110" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '480ms', '--t': '500ms' }} d="M350 129C376 129 380 110 404 110" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '520ms', '--t': '500ms' }} d="M350 167C380 167 378 110 404 110" />
      </g>
      <rect className="a-draw d" pathLength="1" style={{ '--d': '500ms', '--t': '600ms' }} x="404" y="44" width="136" height="132" fill="#ffffff" fillOpacity=".7" stroke="#66c3ff" strokeWidth="1.5" />
      <path className="a-draw d" pathLength="1" style={{ '--d': '800ms', '--t': '400ms' }} d="M404 60H540" fill="none" stroke="#66c3ff" strokeWidth="1" />
      <text className="a-fade" x="410" y="55" fill="rgba(11,18,16,.5)" style={{ '--d': '900ms', fontSize: '9px' }}>one view</text>
      <g fill="#66c3ff" fillOpacity=".55">
        <rect className="a-growy" x="416" y="134" width="12" height="30" style={{ '--d': '1000ms' }} />
        <rect className="a-growy" x="436" y="128" width="12" height="36" style={{ '--d': '1050ms' }} />
        <rect className="a-growy" x="456" y="136" width="12" height="28" style={{ '--d': '1100ms' }} />
        <rect className="a-growy" x="476" y="78" width="12" height="86" style={{ '--d': '1150ms' }} />
        <rect className="a-growy" x="496" y="130" width="12" height="34" style={{ '--d': '1200ms' }} />
        <rect className="a-growy" x="516" y="132" width="12" height="32" style={{ '--d': '1250ms' }} />
      </g>
      <rect className="a-pop" x="476" y="78" width="12" height="86" fill="#0b6bb0" style={{ '--d': '1450ms' }} />
      <circle className="a-ring" cx="482" cy="72" r="9" fill="none" stroke="#0b6bb0" strokeWidth="1.5" style={{ '--d': '1550ms' }} />
      <circle className="a-pulse" cx="482" cy="72" r="9" fill="none" stroke="#66c3ff" strokeWidth="1.5" style={{ '--d': '2100ms' }} />
      <text className="a-fade" x="540" y="198" textAnchor="end" fill="#0b6bb0" style={{ '--d': '1700ms' }}>over-customization</text>
      <text className="a-fade" x="300" y="214" fill="rgba(11,18,16,.5)" style={{ '--d': '600ms' }}>3 apps + interviews</text>
    </>),
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
    title: 'Streamlined a Nonprofit Executive Director Review Cycle',
    subtitle: 'Process design',
    desc: 'Turned an informal two-month review scramble into a repeatable six-week cycle with results comparable year over year.',
    image: null,
    slot: 'case-review-cycle.png',
    tags: ['Google Forms', 'Power BI', 'Power Query'],
    art: (<>
      <rect className="a-draw d" pathLength="1" style={{ '--t': '600ms' }} x="300" y="40" width="96" height="124" fill="#ffffff" fillOpacity=".7" stroke="#66c3ff" strokeWidth="1.5" />
      <g fill="#ffffff" stroke="#66c3ff" strokeWidth="1.25">
        <rect className="a-pop" x="310" y="54" width="10" height="10" style={{ '--d': '300ms' }} />
        <rect className="a-pop" x="310" y="80" width="10" height="10" style={{ '--d': '360ms' }} />
        <rect className="a-pop" x="310" y="106" width="10" height="10" style={{ '--d': '420ms' }} />
        <rect className="a-pop" x="310" y="132" width="10" height="10" style={{ '--d': '480ms' }} />
      </g>
      <g fill="#66c3ff" fillOpacity=".6">
        <rect className="a-grow" x="328" y="57" width="56" height="5" style={{ '--d': '350ms' }} />
        <rect className="a-grow" x="328" y="83" width="44" height="5" style={{ '--d': '410ms' }} />
        <rect className="a-grow" x="328" y="109" width="52" height="5" style={{ '--d': '470ms' }} />
        <rect className="a-grow" x="328" y="135" width="40" height="5" style={{ '--d': '530ms' }} />
      </g>
      <g fill="none" stroke="#0b6bb0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path className="a-draw d" pathLength="1" style={{ '--d': '700ms', '--t': '250ms' }} d="M312 59l2.5 2.5 5-6" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '800ms', '--t': '250ms' }} d="M312 85l2.5 2.5 5-6" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '900ms', '--t': '250ms' }} d="M312 111l2.5 2.5 5-6" />
        <path className="a-draw d" pathLength="1" style={{ '--d': '1000ms', '--t': '250ms' }} d="M312 137l2.5 2.5 5-6" />
      </g>
      <text className="a-fade" x="300" y="184" fill="rgba(11,18,16,.5)" style={{ '--d': '200ms' }}>standard Qs</text>
      <text className="a-fade" x="420" y="72" fill="rgba(11,18,16,.5)" style={{ '--d': '300ms' }}>before</text>
      <g className="a-dim" style={{ '--d': '1300ms' }}>
        <rect className="a-grow" x="420" y="80" width="120" height="8" fill="#66c3ff" fillOpacity=".45" style={{ '--d': '400ms', '--t': '700ms' }} />
        <text className="a-fade" x="540" y="72" textAnchor="end" fill="rgba(11,18,16,.5)" style={{ '--d': '700ms' }}>2 mo</text>
      </g>
      <path className="a-draw d" pathLength="1" style={{ '--d': '1200ms', '--t': '400ms' }} d="M414 84H546" fill="none" stroke="#0b6bb0" strokeWidth="1.75" strokeLinecap="round" />
      <text className="a-fade" x="420" y="118" fill="rgba(11,18,16,.5)" style={{ '--d': '1400ms' }}>after</text>
      <rect className="a-grow" x="420" y="126" width="84" height="8" fill="#0b6bb0" style={{ '--d': '1500ms' }} />
      <text className="a-fade" x="510" y="134" fill="#0b6bb0" style={{ '--d': '1800ms' }}>6 wk</text>
      <path className="a-draw d" pathLength="1" style={{ '--d': '1900ms', '--t': '600ms' }} d="M420 194L448 186L476 188L504 176L532 166" fill="none" stroke="#66c3ff" strokeWidth="1.5" strokeLinejoin="round" />
      <circle className="a-pop" cx="532" cy="166" r="3.5" fill="#0b6bb0" style={{ '--d': '2350ms' }} />
      <circle className="a-pulse" cx="532" cy="166" r="6" fill="none" stroke="#66c3ff" strokeWidth="1.5" style={{ '--d': '2500ms' }} />
      <text className="a-fade" x="540" y="214" textAnchor="end" fill="#0b6bb0" style={{ '--d': '2400ms' }}>year over year</text>
    </>),
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
    desc: 'Took an unserved need for small accounting firms from PRD to a working product: stack choice, OAuth, payments, and automated reporting, built solo.',
    image: null,
    slot: 'case-budget-canary.png',
    canary: true,
    tags: ['Next.js', 'Supabase', 'Stripe', 'Resend', 'Claude Code/Design'],
    link: 'https://budgetcanary.com/waitlist',
    art: (<>
      <path className="a-draw d" pathLength="1" style={{ '--t': '600ms' }} d="M300 50H346L356 60V122H300Z" fill="#ffffff" fillOpacity=".7" stroke="#66c3ff" strokeWidth="1.5" strokeLinejoin="round" />
      <path className="a-draw d" pathLength="1" style={{ '--d': '300ms', '--t': '250ms' }} d="M346 50V60H356" fill="none" stroke="#66c3ff" strokeWidth="1.25" />
      <g fill="#66c3ff" fillOpacity=".6">
        <rect className="a-grow" x="308" y="68" width="38" height="4" style={{ '--d': '350ms' }} />
        <rect className="a-grow" x="308" y="78" width="30" height="4" style={{ '--d': '400ms' }} />
        <rect className="a-grow" x="308" y="88" width="36" height="4" style={{ '--d': '450ms' }} />
        <rect className="a-grow" x="308" y="98" width="26" height="4" style={{ '--d': '500ms' }} />
        <rect className="a-grow" x="308" y="108" width="32" height="4" style={{ '--d': '550ms' }} />
      </g>
      <path className="a-draw d" pathLength="1" style={{ '--d': '650ms', '--t': '300ms' }} d="M356 86H380" fill="none" stroke="#66c3ff" strokeWidth="1.5" />
      <g fill="#ffffff" stroke="#66c3ff" strokeWidth="1.25">
        <rect className="a-pop" x="380" y="50" width="76" height="20" style={{ '--d': '750ms' }} />
        <rect className="a-pop" x="380" y="76" width="76" height="20" style={{ '--d': '900ms' }} />
        <rect className="a-pop" x="380" y="102" width="76" height="20" style={{ '--d': '1050ms' }} />
      </g>
      <g fill="rgba(11,18,16,.6)" textAnchor="middle">
        <text className="a-fade" x="418" y="64" style={{ '--d': '850ms', fontSize: '10px' }}>next.js</text>
        <text className="a-fade" x="418" y="90" style={{ '--d': '1000ms', fontSize: '10px' }}>supabase</text>
        <text className="a-fade" x="418" y="116" style={{ '--d': '1150ms', fontSize: '10px' }}>stripe</text>
      </g>
      <path className="a-draw d" pathLength="1" style={{ '--d': '1200ms', '--t': '300ms' }} d="M456 86H480" fill="none" stroke="#66c3ff" strokeWidth="1.5" />
      <rect className="a-draw d" pathLength="1" style={{ '--d': '1300ms', '--t': '500ms' }} x="480" y="70" width="52" height="34" fill="#ffffff" fillOpacity=".7" stroke="#0b6bb0" strokeWidth="1.5" />
      <path className="a-draw d" pathLength="1" style={{ '--d': '1500ms', '--t': '350ms' }} d="M480 70L506 90L532 70" fill="none" stroke="#0b6bb0" strokeWidth="1.5" strokeLinejoin="round" />
      <circle className="a-travel" cx="360" cy="86" r="4" fill="#0b6bb0" style={{ '--tx': '118px', '--d': '2000ms' }} />
      <path className="a-draw d" pathLength="1" style={{ '--d': '1800ms', '--t': '400ms' }} d="M497 120l4 4 9-9" fill="none" stroke="#0b6bb0" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <text className="a-pop" x="536" y="66" fill="#0b6bb0" style={{ '--d': '2000ms', fontFamily: 'Georgia,serif', fontSize: '13px' }}>♪</text>
      <text className="a-pop" x="544" y="54" fill="#0b6bb0" style={{ '--d': '2150ms', fontFamily: 'Georgia,serif', fontSize: '11px' }}>♫</text>
      <text className="a-fade" x="300" y="160" fill="rgba(11,18,16,.5)" style={{ '--d': '300ms' }}>prd.md</text>
      <text className="a-fade" x="380" y="160" fill="rgba(11,18,16,.5)" style={{ '--d': '900ms' }}>→ stack</text>
      <text className="a-fade" x="540" y="160" textAnchor="end" fill="#0b6bb0" style={{ '--d': '1900ms' }}>→ report</text>
      <path className="a-draw d" pathLength="1" style={{ '--d': '1600ms', '--t': '700ms' }} d="M300 186H540" fill="none" stroke="rgba(102,195,255,.6)" strokeWidth="1" />
      <rect className="a-grow" x="300" y="183" width="240" height="6" fill="#0b6bb0" style={{ '--d': '1900ms', '--t': '700ms' }} />
      <text className="a-fade" x="300" y="212" fill="rgba(11,18,16,.5)" style={{ '--d': '2100ms' }}>built solo</text>
      <text className="a-fade" x="540" y="212" textAnchor="end" fill="#0b6bb0" style={{ '--d': '2300ms' }}>demo-ready</text>
    </>),
    visual: {
      eyebrow: 'Product Build',
      flow: ['PRD', 'Architecture', 'Shipped'],
      stat: 'Demo-ready',
      statLabel: 'built end to end, solo',
    },
    star: {
      situation: 'Small accounting firms and bookkeepers lack affordable tooling for budget variance monitoring.',
      task: 'Design and ship a working product solo: from PRD to architecture to build.',
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

// CTA frames, ported from the "CTA floral frame" / "CTA — envelopes on hover" design canvases:
// the same vines and leaves, ending in flowers (landing) or envelopes (Services, Contact).
// Seeded, so each garden is identical every load; built once at module scope. `d` = enter delay in ms.
function buildGarden(kind) {
  let seed = 33;
  const rnd = () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  const r1 = (n) => Math.round(n * 10) / 10;
  const dl = (ms) => Math.max(0, Math.min(800, Math.round(ms / 40) * 40));
  const rot = (x, y, deg) => { const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return [x * c - y * s, x * s + y * c]; };
  const ell = (cx, cy, rx, ry, deg) => {
    const u = rot(0, ry, deg), p1 = [cx - u[0], cy - u[1]], p2 = [cx + u[0], cy + u[1]];
    const A = ` A${r1(rx)} ${r1(ry)} ${r1(deg)} 1 0 `;
    return `M${r1(p1[0])} ${r1(p1[1])}${A}${r1(p2[0])} ${r1(p2[1])}${A}${r1(p1[0])} ${r1(p1[1])}Z`;
  };
  const circ = (cx, cy, r) => ell(cx, cy, r, r, 0);
  const fillS = (d, fill) => ({ d, fill, stroke: 'none', sw: 0, op: 1 });
  const lineS = (d, stroke, sw, op) => ({ d, fill: 'none', stroke, sw, op });
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const pt = (p) => `${r1(p[0])} ${r1(p[1])}`;
  const bez = (P, t) => {
    const u = 1 - t;
    return [0, 1].map((k) => u*u*u*P[0][k] + 3*u*u*t*P[1][k] + 3*u*t*t*P[2][k] + t*t*t*P[3][k]);
  };
  const bezA = (P, t) => {
    const u = 1 - t;
    const [dx, dy] = [0, 1].map((k) => 3*u*u*(P[1][k]-P[0][k]) + 6*u*t*(P[2][k]-P[1][k]) + 3*t*t*(P[3][k]-P[2][k]));
    return Math.atan2(dy, dx) * 180 / Math.PI;
  };
  const pathOf = (P) => `M${pt(P[0])} C${pt(P[1])} ${pt(P[2])} ${pt(P[3])}`;

  const CREAM = '#fff4ea', PLUM = '#3a2033';
  const greens = ['#2e5a46', '#2e5a46', '#2e5a46', '#4f8062', '#4f8062', '#4f8062', '#86ab8f', '#86ab8f', '#b5d3c0', '#6f8f4a'];
  const vines = [], leaves = [], flowers = [];

  function addLeaf(x, y, ang, delay, kind) {
    const round = kind === 'round';
    const len = round ? 11 + rnd() * 4 : 16 + rnd() * 11;
    const w = len * (round ? 0.48 : 0.3);
    leaves.push({
      t: `translate(${r1(x)} ${r1(y)}) rotate(${r1(ang)})`,
      d: `M0 0 C${r1(len*0.25)} ${r1(-w)} ${r1(len*0.72)} ${r1(-w*1.05)} ${r1(len)} 0 C${r1(len*0.72)} ${r1(w*1.05)} ${r1(len*0.25)} ${r1(w)} 0 0Z`,
      rib: `M${r1(len*0.12)} 0 Q${r1(len*0.5)} ${r1(-w*0.12)} ${r1(len*0.82)} 0`,
      fill: round ? pick(['#86ab8f', '#b5d3c0', '#4f8062']) : pick(greens),
      d0: dl(delay),
    });
  }

  // Button perimeter: half-size 92 x 26, walked clockwise from top-left.
  const HW = 92, HH = 26, PER = 2 * (2 * HW + 2 * HH);
  function edgeAt(s) {
    s = ((s % PER) + PER) % PER;
    if (s < 2*HW) return { p: [-HW + s, -HH], n: [0, -1] };
    s -= 2*HW;
    if (s < 2*HH) return { p: [HW, -HH + s], n: [1, 0] };
    s -= 2*HH;
    if (s < 2*HW) return { p: [HW - s, HH], n: [0, 1] };
    s -= 2*HW;
    return { p: [-HW, HH - s], n: [-1, 0] };
  }

  // Filler stems: dense, short, hugging the button.
  const STEMS = 36;
  for (let i = 0; i < STEMS; i++) {
    const s = (i + rnd() * 0.6) * PER / STEMS;
    const e = edgeAt(s);
    let n = e.n, tg = [-n[1], n[0]];
    if (Math.abs(e.p[0]) > HW - 14 && Math.abs(e.p[1]) > HH - 8) { n = [Math.sign(e.p[0]) * 0.7, Math.sign(e.p[1]) * 0.7]; tg = [-n[1], n[0]]; }
    const sw = i % 2 === 0 ? 1 : -1;
    const out = 24 + rnd() * 14, drift = (14 + rnd() * 14) * sw;
    const P0 = [e.p[0] - n[0] * 4, e.p[1] - n[1] * 4];
    const P = [P0,
      [P0[0] + n[0] * 14, P0[1] + n[1] * 14],
      [P0[0] + n[0] * out * 0.8 + tg[0] * drift * 0.4, P0[1] + n[1] * out * 0.8 + tg[1] * drift * 0.4],
      [P0[0] + n[0] * out + tg[0] * drift, P0[1] + n[1] * out + tg[1] * drift]];
    const vd = (s / PER) * 120;
    vines.push({ d: pathOf(P), d0: dl(vd), w: r1(1.6 + rnd() * 0.6) });
    const a0 = bezA(P, 0.12);
    addLeaf(...bez(P, 0.1), a0 - 78, vd + 20, 'long');
    addLeaf(...bez(P, 0.14), a0 + 78, vd + 40, rnd() < 0.3 ? 'round' : 'long');
    [0.4, 0.65, 0.85].forEach((t, j) => {
      addLeaf(...bez(P, t), bezA(P, t) + (j % 2 === 0 ? -48 : 48), vd + t * 260, rnd() < 0.25 ? 'round' : 'long');
    });
    addLeaf(P[3][0], P[3][1], bezA(P, 1), vd + 300, 'long');
  }

  const peonyCols = [
    ['#ee6f57', '#f6a08a', '#d84f45'],
    ['#e45f84', '#f39ab2', '#c43c66'],
    ['#c9333d', '#e0626a', '#9e1f2e'],
    ['#f5a9a0', '#fbd0c6', '#e57f78'],
  ];
  const bloomCols = ['#f39a3d', '#ec7f9b', '#d23f45', '#f8b98a', '#ee6f57'];
  function peony(r, cols) {
    const out = [], a0 = rnd() * 360;
    for (let j = 0; j < 8; j++) { const c = rot(0, -0.62 * r, a0 + j * 45); out.push(fillS(circ(c[0], c[1], 0.45 * r), cols[0])); }
    for (let j = 0; j < 8; j += 2) {
      const ah = a0 + j * 45;
      out.push(lineS(`M${pt(rot(0, -0.86 * r, ah - 16))} Q${pt(rot(0, -0.98 * r, ah))} ${pt(rot(0, -0.86 * r, ah + 16))}`, CREAM, 1.1, 0.75));
    }
    for (let j = 0; j < 6; j++) { const c = rot(0, -0.36 * r, a0 + 30 + j * 60); out.push(fillS(circ(c[0], c[1], 0.36 * r), cols[1])); }
    for (let j = 0; j < 4; j++) { const c = rot(0, -0.15 * r, a0 + j * 90); out.push(fillS(circ(c[0], c[1], 0.24 * r), cols[2])); }
    out.push(fillS(circ(0, 0, 0.13 * r), cols[2]));
    out.push(lineS(`M${pt(rot(0, -0.3 * r, a0 + 200))} Q${pt(rot(0, -0.34 * r, a0 + 250))} ${pt(rot(0, -0.3 * r, a0 + 300))}`, CREAM, 0.9, 0.6));
    return out;
  }
  function bloom(r, col) {
    const out = [], a0 = rnd() * 360;
    for (let j = 0; j < 6; j++) {
      const a = a0 + j * 60, c = rot(0, -0.5 * r, a);
      out.push(fillS(ell(c[0], c[1], 0.36 * r, 0.52 * r, a), col));
      out.push(lineS(`M${pt(rot(0, -0.36 * r, a))} L${pt(rot(0, -0.78 * r, a))}`, CREAM, 0.8, 0.6));
    }
    out.push(fillS(circ(0, 0, 0.3 * r), PLUM));
    for (let j = 0; j < 7; j++) { const d = rot(0, -0.42 * r, a0 + j * 51); out.push(fillS(circ(d[0], d[1], 0.06 * r + 0.4), CREAM)); }
    return out;
  }
  function bud(r, col, ang) {
    const tipP = rot(0, -1.2 * r, ang), lA = rot(-0.7 * r, 0, ang), rA = rot(0.7 * r, 0, ang), bt = rot(0, 0.4 * r, ang);
    const s1 = rot(-0.55 * r, -0.2 * r, ang), s2 = rot(0.55 * r, -0.2 * r, ang), sb = rot(0, 0.5 * r, ang);
    return [
      fillS(`M${pt(bt)} Q${pt(lA)} ${pt(tipP)} Q${pt(rA)} ${pt(bt)}Z`, col),
      fillS(`M${pt(sb)} Q${r1(s1[0] - 0.1)} ${r1(s1[1])} ${r1(s1[0])} ${r1(s1[1] - 0.2 * r)} Q${r1(s1[0] * 0.3)} ${r1(s1[1] * 0.3)} ${pt(sb)}Z`, '#2e5a46'),
      fillS(`M${pt(sb)} Q${r1(s2[0] + 0.1)} ${r1(s2[1])} ${r1(s2[0])} ${r1(s2[1] - 0.2 * r)} Q${r1(s2[0] * 0.3)} ${r1(s2[1] * 0.3)} ${pt(sb)}Z`, '#4f8062'),
      lineS(`M${pt(rot(-0.15 * r, -0.2 * r, ang))} L${pt(rot(-0.05 * r, -0.85 * r, ang))}`, CREAM, 0.9, 0.6),
    ];
  }
  function berries(col) {
    const out = [], a0 = rnd() * 360;
    for (let j = 0; j < 3; j++) {
      const c = rot(0, -6.5, a0 + j * 120);
      out.push(lineS(`M0 0 L${pt(c)}`, '#3f6b4f', 1, 0.9));
      out.push(fillS(circ(c[0], c[1], 3.6), col));
      out.push(fillS(circ(c[0] - 1.1, c[1] - 1.1, 0.9), CREAM));
    }
    return out;
  }

  const EDGE = '#b98f84';
  const S = (d, fill, stroke = 'none', sw = 0, op = 1) => ({ d, fill, stroke, sw, op });
  const poly = (pts) => `M${pts.map(pt).join(' L')}Z`;
  const papers = [CREAM, '#fbd0c6', '#fbc9a0', '#f9d3dc', CREAM];
  const flaps = ['#ee6f57', '#e45f84', '#c9333d', '#f39a3d', '#f5a9a0'];
  // Open envelopes carry a letter (drawn between back and front) that rises after the frame lands.
  function envelope(w, h, open, paper, flap) {
    const L = -w / 2, R = w / 2, T = -h / 2, B = h / 2;
    if (open) {
      const lw = w * 0.4, lt = T - h * 0.42, hx = lw * 0.55, hy = lt + h * 0.14, hr = h * 0.07;
      return {
        back: [S(poly([[L, T], [0, T - h * 0.55], [R, T]]), flap, EDGE, 0.6), S(poly([[L, T], [R, T], [R, B], [L, B]]), paper, 'none', 0, 0.75)],
        letter: [
          S(poly([[-lw, lt], [lw, lt], [lw, B - h * 0.2], [-lw, B - h * 0.2]]), '#ffffff', EDGE, 0.6),
          S(`M${pt([-lw * 0.7, lt + h * 0.14])} L${pt([lw * 0.5, lt + h * 0.14])}`, 'none', PLUM, 0.8, 0.35),
          S(`M${pt([-lw * 0.7, lt + h * 0.27])} L${pt([lw * 0.7, lt + h * 0.27])}`, 'none', PLUM, 0.8, 0.35),
          S(`M${pt([hx, hy + hr * 1.2])} C${pt([hx - hr * 2, hy - hr * 0.2])} ${pt([hx - hr * 0.9, hy - hr * 1.6])} ${pt([hx, hy - hr * 0.5])} C${pt([hx + hr * 0.9, hy - hr * 1.6])} ${pt([hx + hr * 2, hy - hr * 0.2])} ${pt([hx, hy + hr * 1.2])}Z`, flap),
        ],
        front: [
          S(poly([[L, T], [0, h * 0.06], [L, B]]), paper, EDGE, 0.6),
          S(poly([[R, T], [0, h * 0.06], [R, B]]), paper, EDGE, 0.6),
          S(poly([[L, B], [0, -h * 0.02], [R, B]]), paper, EDGE, 0.6),
          S(poly([[L, B], [0, -h * 0.02], [R, B]]), PLUM, 'none', 0, 0.06),
        ],
      };
    }
    return {
      back: [S(poly([[L, T], [R, T], [R, B], [L, B]]), paper, EDGE, 0.7)],
      front: [
        S(poly([[L, B], [-w * 0.04, h * 0.02], [w * 0.04, h * 0.02], [R, B]]), PLUM, 'none', 0, 0.07),
        S(`M${pt([L, B])} L${pt([-w * 0.04, h * 0.02])} M${pt([R, B])} L${pt([w * 0.04, h * 0.02])}`, 'none', EDGE, 0.6),
        S(poly([[L, T], [0, h * 0.14], [R, T]]), flap, EDGE, 0.6),
        S(`M${pt([L + w * 0.12, T + h * 0.06])} L${pt([-w * 0.05, 0])}`, 'none', CREAM, 0.9, 0.55),
        S(circ(0, h * 0.1, h * 0.15), flap === '#c9333d' ? '#9e1f2e' : '#c9333d'),
        S(circ(0, h * 0.1, h * 0.08), 'none', CREAM, 0.7, 0.5),
        S(circ(-h * 0.05, h * 0.05, h * 0.03), CREAM, 'none', 0, 0.8),
      ],
    };
  }

  const specs = kind === 'envelopes' ? [
    { x: -122, y: -6, w: 44, h: 30, open: true }, { x: -28, y: -54, w: 42, h: 29 },
    { x: 124, y: 8, w: 44, h: 30 }, { x: 42, y: 54, w: 42, h: 29, open: true },
    { x: -78, y: -48, w: 30, h: 21 }, { x: 16, y: -60, w: 30, h: 21, open: true }, { x: 72, y: -52, w: 30, h: 21 },
    { x: 114, y: -44, w: 28, h: 20 }, { x: 118, y: 56, w: 30, h: 21 }, { x: -72, y: 52, w: 30, h: 21 },
    { x: -128, y: 44, w: 28, h: 20, open: true },
    { x: -158, y: -30, w: 22, h: 15 }, { x: 160, y: -20, w: 22, h: 15 }, { x: -12, y: 60, w: 22, h: 15 }, { x: 165, y: 34, w: 22, h: 15 },
    { x: -104, y: -50, w: 20, h: 14 }, { x: 98, y: -64, w: 20, h: 14 }, { x: -38, y: 64, w: 20, h: 14 }, { x: 84, y: 40, w: 20, h: 14 },
    { x: 150, y: -48, w: 20, h: 14 },
  ] : [
    { x: -124, y: -4, k: 'peony', r: 24, c: 0 }, { x: -28, y: -52, k: 'peony', r: 23, c: 2 },
    { x: 126, y: 10, k: 'peony', r: 24, c: 1 }, { x: 42, y: 52, k: 'peony', r: 23, c: 3 },
    { x: -78, y: -46, k: 'bloom', r: 14 }, { x: 14, y: -56, k: 'bloom', r: 13 }, { x: 72, y: -50, k: 'bloom', r: 14 },
    { x: 112, y: -44, k: 'bloom', r: 13 }, { x: 118, y: 56, k: 'bloom', r: 14 }, { x: -72, y: 50, k: 'bloom', r: 14 },
    { x: -126, y: 44, k: 'bloom', r: 13 },
    { x: -158, y: -30, k: 'bud', r: 9 }, { x: 160, y: -20, k: 'bud', r: 9 }, { x: -12, y: 58, k: 'bud', r: 9 }, { x: 165, y: 34, k: 'bud', r: 8 },
    { x: -104, y: -48, k: 'berry' }, { x: 98, y: -62, k: 'berry' }, { x: -36, y: 62, k: 'berry' }, { x: 82, y: 40, k: 'berry' },
    { x: 150, y: -46, k: 'berry' },
  ];
  specs.forEach((f) => { f.ang = Math.atan2(f.y, f.x); });
  specs.sort((a, b) => a.ang - b.ang);
  specs.forEach((f, idx) => {
    const nx = Math.max(-HW, Math.min(HW, f.x)), ny = Math.max(-HH, Math.min(HH, f.y));
    const dx = f.x - nx, dy = f.y - ny, len = Math.sqrt(dx*dx + dy*dy) || 1;
    const ux = dx / len, uy = dy / len;
    const P0 = [nx - ux * 4, ny - uy * 4];
    const side = idx % 2 === 0 ? 1 : -1;
    const P = [P0,
      [P0[0] + ux * len * 0.35 - uy * 6 * side, P0[1] + uy * len * 0.35 + ux * 6 * side],
      [f.x - ux * len * 0.3 + uy * 4 * side, f.y - uy * len * 0.3 - ux * 4 * side],
      [f.x, f.y]];
    const vd = 30 + (idx / specs.length) * 120;
    vines.push({ d: pathOf(P), d0: dl(vd), w: f.k === 'peony' || f.w > 40 ? 2.4 : 1.8 });
    addLeaf(...bez(P, 0.5), bezA(P, 0.5) + (side > 0 ? -50 : 50), vd + 140, 'long');
    if (kind === 'envelopes') {
      const tilt = (rnd() - 0.5) * 36 + Math.sign(f.x) * 6;
      const env = envelope(f.w, f.h, f.open, pick(papers), flaps[idx % flaps.length]);
      flowers.push({ t: `translate(${f.x} ${f.y}) rotate(${r1(tilt)})`, d0: dl(380 + idx * 24), ...env });
      return;
    }
    const deg = Math.atan2(uy, ux) * 180 / Math.PI;
    const shapes =
      f.k === 'peony' ? peony(f.r, peonyCols[f.c])
      : f.k === 'bloom' ? bloom(f.r, bloomCols[idx % bloomCols.length])
      : f.k === 'bud' ? bud(f.r, pick(['#ee6f57', '#e45f84', '#f5a9a0']), deg + 90)
      : berries(pick(['#d13b3f', '#f07a5a', '#c43c66']));
    flowers.push({ t: `translate(${f.x} ${f.y})`, d0: dl(380 + idx * 24), back: shapes });
  });
  return { vines, leaves, flowers };
}
const GARDENS = { flowers: buildGarden('flowers'), envelopes: buildGarden('envelopes') };

const framePaths = (shapes) => shapes.map((p, j) => (
  <path key={j} d={p.d} fill={p.fill} stroke={p.stroke} strokeWidth={p.sw} strokeLinecap="round" strokeLinejoin="round" opacity={p.op} />
));

// Wraps a CTA; the garden grows on hover or keyboard focus (pure CSS, see .fc in index.css).
function FramedCta({ kind = 'flowers', children }) {
  const garden = GARDENS[kind];
  return (
    <span className={`fc fc-${kind}`}>
      <svg className="fc-garden" viewBox="-200 -110 400 220" aria-hidden="true" focusable="false">
        <defs>
          <filter id="fc-gouache" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="3" result="warp" />
            <feDisplacementMap in="SourceGraphic" in2="warp" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="wobble" />
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="8" result="grain" />
            <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.55 1.18" result="grainAlpha" />
            <feComposite in="wobble" in2="grainAlpha" operator="in" />
          </filter>
        </defs>
        <g filter="url(#fc-gouache)">
          {garden.vines.map((v, i) => (
            <path key={i} className="fc-vine" style={{ '--d': `${v.d0}ms` }} d={v.d} pathLength="1" stroke="#3f6b4f" strokeWidth={v.w} strokeLinecap="round" />
          ))}
          {garden.leaves.map((l, i) => (
            <g key={i} transform={l.t}>
              <g className="fc-leaf" style={{ '--d': `${l.d0}ms` }}>
                <path d={l.d} fill={l.fill} />
                <path d={l.rib} fill="none" stroke="#eef5e8" strokeWidth="0.8" strokeLinecap="round" opacity="0.55" />
              </g>
            </g>
          ))}
        </g>
        <g filter="url(#fc-gouache)">
          {garden.flowers.map((f, i) => (
            <g key={i} transform={f.t}>
              <g className="fc-bloom" style={{ '--d': `${f.d0}ms` }}>
                {framePaths(f.back)}
                {f.letter && <g className="fc-letter">{framePaths(f.letter)}</g>}
                {f.front && framePaths(f.front)}
              </g>
            </g>
          ))}
        </g>
      </svg>
      {children}
    </span>
  );
}

const HERO_SCRUB_PX = 1400;
const NAV_H = 64; // matches the h-16 sticky header

// Sticky stage over a tall track: scrolling scrubs the figure from tangle to process.
// The stage fills the window so the track always leaves HERO_SCRUB_PX of scroll, even with
// nothing but the footer below it.
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
      // The page can end before the track does (mobile toolbar resizes, short footer):
      // finish the scrub at the last scroll position the page can actually reach.
      const room = document.documentElement.scrollHeight - window.innerHeight - (track.top + window.scrollY - NAV_H);
      const end = Math.min(span, room);
      if (end > 0) setScrollP(clamp01((NAV_H - track.top) / end));
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
      <div ref={stageRef} className="sticky top-16 min-h-[max(720px,calc(100svh-4rem))] px-6 pt-10 pb-6 bg-paper flex flex-col items-center">
        <div className="w-full max-w-6xl min-w-0 flex flex-col gap-5">
          <div className="flex items-baseline justify-between gap-4 font-mono text-xs leading-[1.4] text-ink/60">
            <div className="relative flex-auto min-w-0 h-[17px]">
              <span className="absolute left-0 top-0 whitespace-nowrap" style={{ opacity: 1 - f.eyebrow }}>fig 1: the stack, before</span>
              <span className="absolute left-0 top-0 whitespace-nowrap" style={{ opacity: f.eyebrow }}>fig 2: the stack, after</span>
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
              workflows that reconcile: plain English in, board-ready out.
            </p>
            <FramedCta>
              <a href="#/work" className={`${btn} gap-2 h-12 px-6 text-sm font-semibold`}>
                See selected work <ArrowRight size={16} className="fc-arrow" />
              </a>
            </FramedCta>
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
          <a href="#/" className="inline-flex items-center gap-2 font-mono text-sm font-medium tracking-tight">
            <img src="graphics/logo.svg" alt="" className="w-6 h-6" />
            <span>tiffany<span className="text-emerald">.</span>tay<span className="text-ink/40">, CPA</span></span>
          </a>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="font-mono text-xs font-bold tracking-widest uppercase text-emerald-deep mb-4">
            {project.n} / {String(projects.length).padStart(2, '0')}: Selected Work
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-2">{project.title}</h1>
          {project.subtitle && <p className="font-mono text-sm text-ink/40 mb-8">{project.subtitle}</p>}
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full border border-line my-8" />
          ) : project.canary ? (
            <CanaryVisual className="w-full h-64 sm:h-72 border border-line my-8" />
          ) : (
            <DataVisual {...project.visual} className="w-full h-64 sm:h-72 border border-line my-8" />
          )}
          <dl className="max-w-2xl grid sm:grid-cols-[7rem_minmax(0,1fr)] gap-x-8 gap-y-5">
            {STAR.map(([key, label]) => (
              <React.Fragment key={key}>
                <dt className="font-mono text-xs font-bold tracking-widest uppercase text-emerald-deep sm:pt-1">{label}</dt>
                <dd className="text-ink/70 leading-relaxed mb-3 sm:mb-0">
                  {project.star[key]}
                  {key === 'result' && project.link && (
                    <> <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-emerald-deep underline underline-offset-2 hover:text-ink transition-colors">{project.link.replace('https://', '')}</a></>
                  )}
                </dd>
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
            <ArrowLeft size={13} className="transition-transform duration-200 group-hover:-translate-x-1 motion-reduce:group-hover:translate-x-0" /> PREV: {prev.n}
          </div>
          <div className="font-display font-bold tracking-tight group-hover:text-emerald-deep transition-colors">{prev.title}</div>
        </a>
        <a href={`#/project/${next.n}`} className="group p-6 sm:p-8 text-right hover:bg-mist active:bg-mist transition-colors">
          <div className="font-mono text-xs font-bold text-emerald-deep mb-2 flex items-center justify-end gap-2">
            NEXT: {next.n} <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
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
        <a href="#/" className="inline-flex items-center gap-2 font-mono text-sm font-medium whitespace-nowrap">
          <img src="graphics/logo.svg" alt="" className="w-6 h-6" />
          <span>tiffany<span className="text-emerald">.</span>tay<span className="hidden sm:inline">, CPA</span></span>
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
    <footer id="site-footer" className="bg-pine text-paper/50 border-t border-paper/20">
      <div className={`${container} py-8 flex flex-wrap items-center justify-between gap-4 ${mono12}`}>
        <span>tiffany.tay: operations, process &amp; product</span>
        <span>&copy; 2026, built and maintained in-house</span>
      </div>
    </footer>
  );
}

// Eyebrow + title that opens each page; `as="h2"` for a second section on the same page.
function PageHeader({ index, label, title, dark = false, as: Heading = 'h1' }) {
  return (
    <Reveal className="mb-14 flex flex-col gap-4">
      <span className={`${eyebrow} ${dark ? 'text-paper/50' : 'text-ink/60'}`}>{index}: {label}</span>
      <Heading className={`font-display font-bold text-[clamp(32px,4.4vw,48px)] leading-[1.15] tracking-tight ${dark ? 'text-paper' : 'text-ink'}`}>
        {title}
      </Heading>
    </Reveal>
  );
}

// Everything searchable about a project, flattened to one lowercase string.
const projectText = (p) => JSON.stringify([p.title, p.subtitle, p.desc, p.tags, p.visual, p.star]).toLowerCase();

function WorkSection() {
  const total = String(projects.length).padStart(2, '0');
  const [query, setQuery] = useState('');
  // Every word must appear somewhere in the project, so "power bi kanban" narrows rather than widens.
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const shown = projects.filter((p) => words.every((w) => projectText(p).includes(w)));
  return (
    <section className={`${container} py-20`}>
      <PageHeader index="01" label="Selected work" title="Five messes, five systems." />
      <div role="search" className="mb-10 flex items-center gap-3 h-14 px-5 border-2 border-ink rounded-none focus-within:border-emerald transition-colors">
        <Search size={20} className="shrink-0 text-ink/60" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search skills, tools, experience (e.g. Power BI, team, Stripe)"
          aria-label="Search work by skill, tool, or experience"
          className="flex-1 min-w-0 bg-transparent text-base sm:text-lg focus:outline-none placeholder:text-ink/40 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className={`shrink-0 p-1 text-ink/60 hover:text-ink transition-colors ${press}`}>
            <X size={18} />
          </button>
        )}
      </div>
      {words.length > 0 && (
        <p className={`${mono12} text-ink/60 mb-4`} aria-live="polite">
          {shown.length} of {projects.length} projects match “{query.trim()}”
        </p>
      )}
      {shown.length === 0 && (
        <p className="py-10 border-t border-line text-ink/60">
          Nothing matches yet. Try a tool like <button type="button" onClick={() => setQuery('Power BI')} className="underline hover:text-emerald-deep">Power BI</button> or a skill like <button type="button" onClick={() => setQuery('team')} className="underline hover:text-emerald-deep">team</button>.
        </p>
      )}
      <div className="border-b border-line">
        {shown.map((p) => (
          <Reveal key={p.n}>
            <article className="wk grid md:grid-cols-2 gap-x-12 gap-y-8 py-10 px-6 -mx-6 border-t border-line">
              <div className="flex flex-col gap-2 min-w-0">
                <span className={`${mono12} text-ink/60`}>{p.n} / {total}</span>
                <h2 className="font-display font-bold text-2xl leading-[1.15] tracking-tight">
                  <a href={`#/project/${p.n}`} className="wk-ttl transition-colors">{p.title}</a>
                </h2>
                <span className={`${mono12} text-ink/60`}>{p.subtitle}</span>
                {/* Hover/focus plays the case study as a small diagram (index.css: .art). Desktop only: no room when stacked. */}
                <div className="relative hidden md:block flex-auto min-h-[150px] mt-4">
                  <svg className="art" viewBox="290 26 260 200" preserveAspectRatio="xMinYMax meet" aria-hidden="true" focusable="false">{p.art}</svg>
                </div>
              </div>
              <div className="flex flex-col gap-5 min-w-0">
                <p className="text-ink/60 leading-relaxed max-w-[560px]">{p.desc}</p>
                {/* The case study's flow, then its headline number. */}
                <ul className="flex flex-col gap-2 text-sm leading-normal text-ink/70">
                  {[...p.visual.flow, `${p.visual.stat} ${p.visual.statLabel}`].map((h) => (
                    <li key={h} className="flex gap-3"><span className="font-mono text-ink/60">+</span><span>{h}</span></li>
                  ))}
                </ul>
                <div className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2 ${mono12} text-ink/60`}>
                  <span className="flex flex-wrap gap-x-4 gap-y-2">
                    {p.tags.map((t) => (
                      <button key={t} type="button" onClick={() => setQuery(t)} title={`Show work using ${t}`} className="hover:text-emerald-deep transition-colors">[{t}]</button>
                    ))}
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
          <Reveal key={s.n} delay={i * 0.05} className="svc group relative overflow-hidden p-8 flex flex-col gap-3 border-r border-b border-line hover:bg-mist active:bg-mist transition-colors">
            <svg className="art" viewBox="0 0 560 240" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">{s.art}</svg>
            <span className={`${mono12} text-ink/60`}>{s.n}</span>
            <h2 className="font-display font-bold text-xl leading-[1.15] tracking-tight group-hover:text-emerald-deep transition-colors">{s.title}</h2>
            <p className="text-ink/60 leading-relaxed transition-opacity duration-200 group-hover:opacity-0 group-active:opacity-0">{s.desc}</p>
          </Reveal>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-6 mt-14">
        <p className="flex-[1_1_320px] max-w-[560px] text-lg leading-relaxed text-ink/60">
          Tell me what&rsquo;s running on heroics and good intentions. I reply within two business days.
        </p>
        <FramedCta kind="envelopes">
          <a href="#/contact" className={cta}>Get in touch <ArrowRight size={16} className="fc-arrow" /></a>
        </FramedCta>
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
            venture-backed SaaS companies and mission-driven nonprofits, usually arriving at the
            point where something important has no owner and everyone has quietly worked around
            it for months.
          </p>
          <p>
            My work sits at the intersection of accounting rigor and building things: audited
            financials and spend controls on one side, Power BI, Azure DevOps, and a shipped
            product on the other. The pattern is the same either way: take the ambiguous,
            under-owned thing, find what the numbers say is actually wrong, and turn it into a
            process someone else can run.
          </p>
          <p className="mt-4 font-display font-semibold text-2xl leading-[1.3] tracking-tight text-paper">
            &ldquo;A process only I can run isn&rsquo;t a process.&rdquo;
          </p>
        </Reveal>
        <Reveal delay={0.1} className="relative max-w-sm lg:max-w-none border border-paper/20">
          <img src="graphics/6.jpeg" alt="Tiffany Tay" loading="lazy" className="w-full object-cover object-top" />
          <span className={`absolute bottom-0 left-0 bg-paper text-ink px-3 py-2 ${mono12}`}>fig 1: the person behind the systems</span>
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

// Dog run cycle: assets/dog-run.png is a strip of 12 frames (each DOG_W x DOG_H, dog faces right, feet end
// DOG_PAD px above the frame bottom). CSS steps() flips frames while .dog-run slides across the screen (index.css).
// Imported (not in public/) so Vite hashes its URL: a new sprite can never pair with a stale cached copy.
const DOG_W = 260;
const DOG_H = 136;
const DOG_PAD = 5;
function DogSprite() {
  return <div className="dog-sprite" style={{ backgroundImage: `url(${dogRunUrl})` }} />;
}

// Hover the Dogs photo: the dog sprints across the viewport with the top of the footer as its ground.
// If the footer is below the fold, the bottom edge of the window stands in for it.
function useDogRun() {
  const [run, setRun] = useState(null);
  const reduce = useReducedMotion();
  const start = () => {
    if (reduce || run) return;
    const footerTop = document.getElementById('site-footer')?.getBoundingClientRect().top ?? window.innerHeight;
    setRun({ ground: Math.min(footerTop, window.innerHeight) });
  };
  const sprite = run && createPortal(
    <div
      aria-hidden="true"
      className="dog-run"
      style={{ top: run.ground - DOG_H + DOG_PAD }}
      onAnimationEnd={(e) => { if (e.target === e.currentTarget) setRun(null); }}
    >
      <DogSprite />
    </div>,
    document.body,
  );
  return { start, sprite };
}

// Travel & Food passport mode: click the tile and the section becomes a passport page (hover only hints).
// Each click lays down the next stamp in order (looping), tilted at random and dated today.
const STAMPS = [
  { country: 'Japan', city: 'Tokyo · Narita', label: 'Entry', food: 'ramen', color: '#c62a3a', shape: 'circle' },
  { country: 'France', city: 'Paris · CDG', label: 'Arrivée', food: 'croissant', color: '#2346a8', shape: 'rect' },
  { country: 'Mexico', city: 'Ciudad de México', label: 'Entrada', food: 'al pastor', color: '#1f7a4d', shape: 'ticket' },
  { country: 'Italy', city: 'Roma · Fiumicino', label: 'Arrivo', food: 'cacio e pepe', color: '#b5532a', shape: 'oval' },
  { country: 'Thailand', city: 'Bangkok', label: 'Arrival', food: 'khao soi', color: '#6a3fa0', shape: 'double' },
  { country: 'Morocco', city: 'Marrakech', label: 'Entrée', food: 'tagine', color: '#d9731a', shape: 'circle' },
  { country: 'Peru', city: 'Lima', label: 'Ingreso', food: 'ceviche', color: '#0f7c86', shape: 'rect' },
  { country: 'South Korea', city: 'Seoul · Incheon', label: 'Entry', food: 'bibimbap', color: '#1b2a6b', shape: 'oval' },
  { country: 'Vietnam', city: 'Hồ Chí Minh City', label: 'Nhập cảnh', food: 'phở', color: '#b0306e', shape: 'ticket' },
  { country: 'Greece', city: 'Athens', label: 'Άφιξη', food: 'souvlaki', color: '#2b7fc4', shape: 'double' },
];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const MAX_STAMPS = 30;
const stampDate = (d = new Date()) => `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;

function usePassport(rootRef) {
  const [mode, setMode] = useState(null); // null | 'on' | 'leaving'
  const [stamps, setStamps] = useState([]);
  const [next, setNext] = useState(0);
  const [ghost, setGhost] = useState(null);
  const seq = useRef(0);
  const timer = useRef();
  const exitRef = useRef(null);
  const focusExit = useRef(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  const toRoot = (x, y) => {
    const r = rootRef.current.getBoundingClientRect();
    return { x: Math.round(x - r.left), y: Math.round(y - r.top) };
  };
  const make = (i, p) => ({ ...STAMPS[i], ...p, id: ++seq.current, rot: Math.round(Math.random() * 30 - 15), date: stampDate() });

  const enter = (e) => {
    if (mode === 'on') return;
    clearTimeout(timer.current);
    const t = e.currentTarget.getBoundingClientRect();
    setStamps([make(next, toRoot(t.left + t.width / 2, t.top + t.height / 2))]);
    setNext((next + 1) % STAMPS.length);
    focusExit.current = e.detail === 0; // keyboard activation
    setMode('on');
  };
  const stampAt = (e) => {
    if (mode !== 'on') return;
    setStamps([...stamps, make(next, toRoot(e.clientX, e.clientY))].slice(-MAX_STAMPS));
    setNext((next + 1) % STAMPS.length);
  };
  const exit = () => {
    setMode('leaving');
    setGhost(null);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setMode(null); setStamps([]); }, 320);
  };

  useEffect(() => {
    if (mode !== 'on') return;
    if (focusExit.current) exitRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') exit(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode]);

  const nxt = STAMPS[next];
  const ui = mode && (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <filter id="stamp-ink" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -7 5.1" result="wear" />
          <feComposite in="SourceGraphic" in2="wear" operator="in" result="worn" />
          <feDisplacementMap in="worn" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div
        aria-hidden="true"
        className={`pp-layer${ghost ? ' no-cursor' : ''}${mode === 'leaving' ? ' is-leaving' : ''}`}
        onClick={stampAt}
        onPointerMove={(e) => { if (e.pointerType !== 'touch' && mode === 'on') setGhost(toRoot(e.clientX, e.clientY)); }}
        onPointerLeave={() => setGhost(null)}
      >
        {stamps.map((s) => (
          <div key={s.id} className="pp-stamp" style={{ left: s.x, top: s.y, color: s.color }}>
            <div style={{ transform: `rotate(${s.rot}deg)` }}>
              <div className={`pp-face pp-${s.shape}`}>
                <span className="pp-label">{s.label}</span>
                <span className="pp-country">{s.country}</span>
                <span className="pp-city">{s.city}</span>
                <span className="pp-date">{s.date}</span>
                <span className="pp-food">menu: {s.food}</span>
              </div>
            </div>
          </div>
        ))}
        {ghost && (
          <div className="pp-ghost" style={{ left: ghost.x, top: ghost.y, color: nxt.color }}>next · {nxt.city.split(' · ')[0]}</div>
        )}
      </div>
      <div className={`pp-banner absolute top-6 left-6 z-30 max-w-[calc(100%-152px)] pointer-events-none flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 bg-paper border border-line font-mono text-xs${mode === 'leaving' ? ' is-leaving' : ''}`}>
        <span className="flex items-center gap-2"><span className="pp-dot w-2 h-2 rounded-full bg-emerald" />passport_mode: on</span>
        <span className="text-ink/60">next_stamp: {String(next + 1).padStart(2, '0')} / {STAMPS.length}, {nxt.country}</span>
        <span className="text-ink/60">{'// click anywhere to stamp'}</span>
      </div>
      <div className="absolute top-6 right-6 z-30 flex flex-col items-center gap-2">
        <button
          ref={exitRef}
          type="button"
          aria-label="Exit passport stamp mode"
          onClick={exit}
          className="w-20 h-20 flex items-center justify-center bg-ink text-paper hover:bg-emerald hover:text-ink transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald focus-visible:outline-offset-3"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true"><path d="M5 5 L19 19" /><path d="M19 5 L5 19" /></svg>
        </button>
        <span className="font-mono text-[11px] font-medium tracking-widest uppercase text-ink/60 pointer-events-none">Exit</span>
      </div>
    </>
  );
  return { enter, ui, next: nxt };
}

function OffTheClockSection() {
  const dog = useDogRun();
  const rootRef = useRef(null);
  const passport = usePassport(rootRef);
  return (
    <section ref={rootRef} className="bg-mist relative overflow-hidden">
      {dog.sprite}
      {passport.ui}
      <div className={`${container} py-20`}>
        <PageHeader as="h2" index="04" label="Non-billable hours" title="Off the clock." />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {offTheClock.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05} className="flex flex-col gap-2">
              <div className={item.jigsaw ? 'jig relative mb-2' : item.broadway ? 'bw relative overflow-hidden mb-2' : 'mb-2'}>
                {item.passport ? (
                  <button
                    type="button"
                    aria-label={`${item.title}: start passport stamp mode`}
                    onClick={passport.enter}
                    className="pp-tile relative overflow-hidden w-full aspect-square border border-line hover:border-ink transition-colors bg-paper flex items-center justify-center p-3 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald focus-visible:outline-offset-3"
                  >
                    {item.image ? (
                      <img src={item.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                    ) : import.meta.env.DEV && (
                      <span className="font-mono text-[10px] text-ink/30 text-center break-all">{item.slot}</span>
                    )}
                    {/* Hover/focus hint previews the next stamp; touch screens get a standing badge instead. */}
                    <span className="pp-hint" aria-hidden="true">
                      <span className="pp-hint-stamp" style={{ color: passport.next.color }}>{passport.next.country}</span>
                      <span className="pp-hint-cta">Click to stamp →</span>
                    </span>
                    <span className="pp-badge" aria-hidden="true">Tap to stamp</span>
                  </button>
                ) : item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="jig-base block w-full aspect-square object-cover border border-line"
                    {...(item.runner ? { onPointerEnter: dog.start } : {})}
                  />
                ) : (
                  <div className="jig-base w-full aspect-square border border-line bg-paper flex items-center justify-center p-3">
                    {/* The slot filename is an authoring hint; visitors never see an internal path. */}
                    {import.meta.env.DEV && (
                      <span className="font-mono text-[10px] text-ink/30 text-center break-all">{item.slot}</span>
                    )}
                  </div>
                )}
                {item.jigsaw && <JigsawShatter image={item.image} />}
                {item.broadway && (<>
                  <img src="graphics/broadway-curtain.webp" alt="" aria-hidden="true" className="bw-layer bw-curtain inset-0 h-full" />
                  <img src="graphics/broadway-seats.webp" alt="" aria-hidden="true" className="bw-layer bw-seats bottom-0 h-1/4" />
                </>)}
              </div>
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

// Success burst: [dx, dy, rotate] per tick, fanned out around the check.
const OK_BURST = [[72, 0, 90], [94, 45, -120], [45, 56, 200], [23, 101, -70], [-16, 70, 160], [-65, 81, -200], [-65, 31, 110], [-104, 0, -90], [-65, -31, 220], [-65, -81, -150], [-16, -70, 75], [23, -101, -210], [45, -56, 130], [94, -45, -60]];

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
        <span className={`${eyebrow} text-ink/60`}>05: Contact</span>
        <h1 className="font-display font-bold text-[clamp(32px,4.4vw,48px)] leading-[1.15] tracking-tight">
          Tell me where the process breaks down.
        </h1>
        <p className="max-w-md text-ink/60 leading-relaxed">
          Tell me what&rsquo;s running on heroics and good intentions. I reply within two business days.
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
            role="status"
            className="border border-line h-full min-h-[520px] flex flex-col gap-6 p-8"
          >
            {/* the message flies from you to my inbox */}
            <div aria-hidden="true" className={`flex items-center gap-3 ${mono12} uppercase tracking-widest text-ink/60`}>
              <span>you</span>
              <div className="relative w-60 max-w-full h-2.5 shrink">
                <div className="absolute inset-x-0 top-1/2 border-t border-dotted border-ink/25" />
                <div className="ok-sq" />
              </div>
              <span className="ok-end text-ink">inbox</span>
            </div>

            <div aria-hidden="true" className="relative w-22 h-22">
              <div className="ok-ring absolute inset-0" />
              {OK_BURST.map(([dx, dy, r], i) => (
                <span key={i} className="ok-tk" style={{ '--dx': `${dx}px`, '--dy': `${dy}px`, '--r': `${r}deg` }} />
              ))}
              <svg width="88" height="88" viewBox="0 0 24 24" className="absolute inset-0">
                <path className="ok-circle" pathLength="1" d="M21.801 10A10 10 0 1 1 17 3.335" />
                <path className="ok-check" pathLength="1" d="m9 11 3 3L22 4" />
              </svg>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="ok-up font-display font-bold text-4xl leading-[1.15] tracking-tight" style={{ '--d': '1400ms' }}>Sent.</h2>
              <p className="ok-up max-w-md text-ink/60 leading-relaxed" style={{ '--d': '1550ms' }}>
                It&rsquo;s in my inbox. I&rsquo;ll write back myself, usually faster than that animation took.
              </p>
            </div>

            <div className="ok-up mt-auto pt-4 border-t border-line" style={{ '--d': '1900ms' }}>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className={`${eyebrow} min-h-11 border-b-2 border-emerald hover:text-emerald-deep transition-colors`}
              >
                Send another →
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <input type="hidden" name="access_key" value="d5b0b07d-d2c0-4a93-acf3-259cf4caee86" />
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className={fieldLabel}>01: Your name</label>
              <input id="name" name="name" type="text" autoComplete="name" required className={field} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className={fieldLabel}>02: Your email</label>
              <input id="email" name="email" type="email" autoComplete="email" required className={field} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className={fieldLabel}>03: What&rsquo;s messy?</label>
              <textarea id="message" name="message" rows={3} required className={field} />
            </div>
            <div className="mt-10">
              <FramedCta kind="envelopes">
                <button type="submit" disabled={status === 'sending'} className={`${cta} disabled:opacity-60`}>
                  {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={16} className="fc-arrow" />
                </button>
              </FramedCta>
            </div>
            {status === 'error' && (
              <p className="text-sm text-red-600 font-mono">error: submission failed. Please email me directly.</p>
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
