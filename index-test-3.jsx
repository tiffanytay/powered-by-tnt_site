import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Sparkles, Code2, Briefcase, User, ExternalLink, Mail, Layers, Eye } from 'lucide-react';

export default function ResumeWebsite() {
  const [activeTab, setActiveTab] = useState('experience');

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const energyParticle = {
    animate: {
      y: [0, -120],
      x: [0, Math.random() * 40 - 20],
      scale: [0, 1.5, 0],
      opacity: [0, 0.8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: Math.random() * 2
      }
    }
  };


    const tiers = [
        {
        title: "Core Stack & Production Ready",
        subtitle: "Daily drivers. Technologies I architect, optimize, and deploy at scale.",
        icon: Terminal,
        borderColor: "group-hover:border-cyan-500/50",
        skills: [
            "React", "Next.js", "Tailwind CSS", "TypeScript Core", 
            "Financial Controlling", "Operational Data Metrics", "RESTful APIs"
        ]
        },
        {
        title: "Design Mechanics & Animation Core",
        subtitle: "Libraries and design systems I leverage to build highly interactive UIs.",
        icon: Layers,
        borderColor: "group-hover:border-teal-500/50",
        skills: [
            "Framer Motion", "Lottie Modules", "State Architecture (Zustand)", 
            "CSS Grid/Flexbox Layouts", "Data Modeling", "UI Prototyping"
        ]
        },
        {
        title: "Exploring & Integrating",
        subtitle: "Active spaces where I am expanding capabilities and integrating new vectors.",
        icon: Eye,
        borderColor: "group-hover:border-indigo-500/50",
        skills: [
            "Google Gemini API Core", "AI Tooling Integration", "Automated Workflows"
        ]
        }
    ];
    

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-cyan-500 selection:text-black antialiased overflow-x-hidden">
      
      {/* BACKGROUND GRID & GLOW */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* HEADER / NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-zinc-800 bg-[#0a0a0a]/70">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 font-mono font-bold text-lg tracking-wider text-white"
          >
            <span className="p-1.5 bg-cyan-500 text-black rounded-md"><Cpu size={16} className="animate-pulse" /></span>
            POWEREDBY<span className="text-cyan-400">TNT</span>.COM
          </motion.div>
          <nav className="flex gap-6 text-sm font-mono text-zinc-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">.about()</a>
            <a href="#work" className="hover:text-cyan-400 transition-colors">.work()</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">.skills()</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION: THE POWER CORE */}
      <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[calc(100vh-4rem)]">
        
        {/* Left: Headline & Hook */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex-1 space-y-6 z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-mono text-cyan-400">
            <Sparkles size={12} /> SYSTEM STATUS: FULLY CHARGED
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500">
              High-Voltage
            </span> <br />
            Digital Solutions.
          </h1>
          <p className="text-lg text-zinc-400 max-w-lg">
            Hi, I'm <strong className="text-zinc-200">TNT</strong>. I bridge complex structural frameworks with highly performant, beautifully animated frontend design to build application environments that scale.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#work" className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300">
              View Deployment
            </a>
            <a href="mailto:contact@poweredbytnt.com" className="px-6 py-3 border border-zinc-700 rounded-lg hover:border-zinc-400 transition-colors flex items-center gap-2 text-zinc-300">
              <Mail size={16} /> Connect
            </a>
          </div>
        </motion.div>

        {/* Right: The Interactive Motion Reactor Asset */}
        <div className="flex-1 relative w-full max-w-[450px] aspect-square flex items-center justify-center">
          {/* Animated Energy Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 border-2 border-dashed border-zinc-800 rounded-full flex items-center justify-center"
          >
            <div className="w-[80%] h-[80%] border border-dashed border-cyan-900/40 rounded-full" />
          </motion.div>
          
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[70%] h-[70%] border border-cyan-500/20 rounded-full border-t-cyan-400 border-b-indigo-500"
          />

          {/* Central Generator Core Container */}
          <div className="relative w-48 h-48 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center p-6 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Rising Energy Floating Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                variants={energyParticle}
                animate="animate"
                className="absolute bottom-4 w-1.5 h-1.5 bg-cyan-400 rounded-full blur-[0.5px]"
                style={{ left: `${20 + i * 12}%` }}
              />
            ))}
            
            {/* Tech Avatar Line/Grid Concept */}
            <div className="w-16 h-16 rounded-full border-2 border-zinc-700 flex items-center justify-center bg-zinc-950 mb-3 z-10 group-hover:border-cyan-400 transition-colors">
              <Code2 className="text-zinc-400 group-hover:text-cyan-400 transition-colors" size={28} />
            </div>
            <div className="text-center z-10">
              <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase">Generator</div>
              <div className="text-sm font-bold font-mono text-white mt-0.5 group-hover:text-cyan-300">TNT_CORE_v1.0</div>
            </div>
          </div>
        </div>
      </section>

      ---

      {/* RECRUITER HUD: TIMELINE & SKILLS */}
      <section id="work" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Controls HUD */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Main Console</h2>
            <p className="text-2xl font-bold tracking-tight text-white">Interactive Profile Data</p>
            <div className="flex flex-col gap-2 pt-4">
              {[
                { id: 'experience', label: '01 // Professional Experience', icon: Briefcase },
                { id: 'projects', label: '02 // Live Architectures', icon: Terminal },
                { id: 'about', label: '03 // System Diagnostics', icon: User }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border font-mono text-sm text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-zinc-900 border-zinc-700 text-cyan-400 shadow-sm'
                        : 'border-transparent text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Content Display via Framer Motion Transitions */}
          <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-800 rounded-xl p-8 min-h-[400px] backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {activeTab === 'experience' && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="border-l-2 border-cyan-500/30 pl-6 relative space-y-8">
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-cyan-400 rounded-full ring-4 ring-[#0a0a0a]" />
                      <span className="text-xs font-mono text-zinc-500">2025 — PRESENT</span>
                      <h4 className="text-lg font-bold text-white mt-1">Lead Systems Controller & Interface Developer</h4>
                      <p className="text-sm text-zinc-400 mt-2">
                        Spearheading operational data scaling strategy while engineering custom client-facing metrics tools built in responsive JS/React.
                      </p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-zinc-700 rounded-full ring-4 ring-[#0a0a0a]" />
                      <span className="text-xs font-mono text-zinc-500">2023 — 2025</span>
                      <h4 className="text-lg font-bold text-white mt-1">Frontend Engineer & Consultant</h4>
                      <p className="text-sm text-zinc-400 mt-2">
                        Designed, optimized, and maintained internal tools using modular CSS architectures and streamlined state distribution patterns.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  {[
                    { title: 'FluffoMap UI', desc: 'A geospatial mapping matrix optimized for pet travel planning.', tech: ['React', 'Gemini Flash 2.0'] },
                    { title: '5S Flow System', desc: 'Digital productivity canvas modeling traditional workspace organization methodologies.', tech: ['Tailwind', 'Framer'] }
                  ].map((p, idx) => (
                    <div key={idx} className="p-5 bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col justify-between group hover:border-zinc-700 transition-colors">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{p.title}</h4>
                          <ExternalLink size={14} className="text-zinc-500" />
                        </div>
                        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{p.desc}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        {p.tech.map((t, i) => (
                          <span key={i} className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 text-sm text-zinc-400 leading-relaxed"
                >
                  <p>
                    <span className="text-white font-semibold">TNT System Diagnostics:</span> Highly analytical mindset with an exact balance of structured logical processing and creative visual design.
                  </p>
                  <p>
                    Specializing in engineering clean-lined, modern interfaces that make software feel interactive, organic, and lightning fast. Deeply committed to maintaining strict optimization parameters while utilizing the edge of modern browser rendering power.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="skills" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-900">
      
        {/* SECTION HEADER */}
        <div className="mb-12 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-mono text-cyan-400">
            <Cpu size={12} /> ENGINE SPECIFICATIONS
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-white">Technical Arsenal</h3>
            <p className="text-sm text-zinc-400 max-w-xl">
            Categorized by operational depth and execution frequency. No arbitrary percentages, just proven stack capabilities.
            </p>
        </div>

        {/* SKILLS TIERS GRID */}
        <div className="grid lg:grid-cols-3 gap-6">
            {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 bg-zinc-900/20 border border-zinc-800/80 rounded-xl flex flex-col justify-between group hover:bg-zinc-900/40 transition-all duration-300"
                >
                <div>
                    {/* Header Asset */}
                    <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400 group-hover:text-cyan-400 transition-colors">
                        <Icon size={18} />
                    </div>
                    <h4 className="font-bold text-zinc-100 tracking-wide text-sm">{tier.title}</h4>
                    </div>
                    
                    <p className="text-xs text-zinc-500 leading-relaxed mb-6 font-sans">
                    {tier.subtitle}
                    </p>

                    {/* Badges Container */}
                    <div className="flex flex-wrap gap-2">
                    {tier.skills.map((skill, sIdx) => (
                        <span 
                        key={sIdx}
                        className="text-xs font-mono bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white px-2.5 py-1 rounded-md transition-colors duration-200"
                        >
                        {skill}
                        </span>
                    ))}
                    </div>
                </div>
                </motion.div>
            );
            })}
        </div>
        </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 bg-zinc-950/60 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-zinc-500 font-mono">
          <div>© 2026 poweredbytnt.com. All rights initialized.</div>
          <div className="flex gap-4 text-zinc-400">
            <a href="#" className="hover:text-white transition-colors"><Terminal size={18} /></a>
            <a href="#" className="hover:text-white transition-colors"><Code2 size={18} /></a>
            </div>
        </div>
      </footer>
    </div>
  );
}