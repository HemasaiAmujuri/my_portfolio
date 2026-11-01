import React from 'react';
import {
  Layers,
  Zap,
  MapPin,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Cloud,
  Brain,
  Sparkles,
  ArrowDown
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const About: React.FC = () => {
  const { personalInfo } = portfolioData;

  const pillars = [
    {
      title: 'MERN Full-Stack Mastery',
      description:
        'Building high-throughput web applications with modern React.js frontends, scalable Node.js/Express backends, MongoDB, and TypeScript with clean, modular architecture.',
      icon: Layers,
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
    },
    {
      title: 'AWS Cloud & Deployments',
      description:
        'Hands-on expertise deploying production applications to AWS EC2, configuring Amazon S3 buckets for media/document storage, IAM policies, and Nginx reverse proxy with PM2.',
      icon: Cloud,
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
    },
    {
      title: 'Applied GenAI & RAG Systems',
      description:
        'Architecting Retrieval-Augmented Generation (RAG) pipelines, Pinecone vector search, LLM fine-tuning, OpenAI API integrations, and building intelligent workflow automations.',
      icon: Brain,
      color: 'from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30',
    },
    {
      title: 'Performance & Redis Caching',
      description:
        'Specialized in diagnosing bottlenecks, database indexing to cut latency from ~2m to ~30s, and deploying in-memory Redis caching layers for a 40% API speedup.',
      icon: Zap,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            Profile Overview
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me & Engineering Focus
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            A <span className="text-cyan-400 font-semibold">T-Shaped Developer</span> bridging deep MERN stack full-stack engineering with modern AWS cloud deployments and applied Generative AI.
          </p>
        </div>

        {/* Visual T-Shaped Model Card */}
        <div className="mb-16 glass-card p-6 sm:p-8 rounded-3xl border-slate-800 relative overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-[#090d16]">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-700/60 text-cyan-300 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Architectural Model</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">

            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Deep, specialized mastery in core full-stack web engineering, complemented by agile breadth across AWS cloud hosting and applied Generative AI systems.
            </p>
          </div>

          {/* T-Shape Visual Structure */}
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Horizontal Bar: Cloud & AI Wings */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              {/* Left Wing: AWS Cloud */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/30 hover:border-amber-400/50 transition-all shadow-lg shadow-amber-500/5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <Cloud className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">AWS Cloud & Deployments</h4>
                      <span className="text-[11px] text-amber-400/90 font-mono">Horizontal Wing • Cloud Infra</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-300">
                    Deploy & Scale
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-3.5 leading-relaxed">
                  Can independently deploy applications to <strong className="text-amber-300">AWS EC2</strong>, configure <strong className="text-amber-300">Amazon S3</strong> buckets for secure asset storage, manage IAM policies, and configure Nginx reverse proxy with PM2.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {personalInfo.tShape?.cloudSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-950/40 border border-amber-700/40 text-amber-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Wing: Applied GenAI */}
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30 hover:border-purple-400/50 transition-all shadow-lg shadow-purple-500/5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Applied Generative AI</h4>
                      <span className="text-[11px] text-purple-400/90 font-mono">Horizontal Wing • Intelligence</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/15 border border-purple-500/30 text-purple-300">
                    RAG & Agents
                  </span>
                </div>
                <p className="text-xs text-slate-300 mb-3.5 leading-relaxed">
                  Designs production-ready <strong className="text-purple-300">RAG (Retrieval-Augmented Generation)</strong> pipelines, integrates vector databases (Pinecone/Chroma), executes prompt fine-tuning, and builds automated AI scoring workflows.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {personalInfo.tShape?.aiSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-950/40 border border-purple-700/40 text-purple-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Connecting Connector Indicator */}
            <div className="flex flex-col items-center my-1 z-10">
              <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-indigo-500" />
              <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-400 shadow-md">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-indigo-500 to-cyan-500" />
            </div>

            {/* Vertical Stem: Deep Core MERN Stack */}
            <div className="w-full max-w-2xl p-6 rounded-2xl bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-950 border-2 border-cyan-500/40 shadow-xl shadow-cyan-500/10 text-center relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Deep Vertical Stem • Core Mastery</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                Full-Stack MERN Architecture
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mb-4 max-w-lg mx-auto leading-relaxed">
                2+ years of production experience building responsive React.js interfaces, engineering scalable Node.js/Express APIs, designing MongoDB & PostgreSQL schemas, implementing Redis caching, and securing data with JWT & RBAC.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {personalInfo.tShape?.coreSkills.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-950/70 border border-cyan-500/50 text-cyan-200 shadow-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Facts + 4 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative Summary & Quick Facts Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Engineering Philosophy</span>
                </h3>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                  2+ Years Experience
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
                {personalInfo.profileSummary}
              </p>

              <div className="border-t border-slate-800/80 pt-6 space-y-3.5 text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                  <Briefcase className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-400">Experience:</span>
                  <span className="font-medium text-white">{personalInfo.yearsOfExperience} in Full Stack, Cloud & AI</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Cloud className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-400">Cloud Platform:</span>
                  <span className="font-medium text-white">AWS (EC2, S3, IAM, PM2, Nginx)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Brain className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-slate-400">AI Specialization:</span>
                  <span className="font-medium text-white">RAG, Vector DBs, Fine-Tuning & Agents</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-400">Location:</span>
                  <span className="font-medium text-white">{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-400">Education:</span>
                  <span className="font-medium text-white">B.Tech in CSE (70%)</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-400">Email:</span>
                  <a href={`mailto:${personalInfo.email}`} className="font-medium text-cyan-400 hover:underline truncate">
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-400">Phone:</span>
                  <a href={`tel:${personalInfo.phone}`} className="font-medium text-slate-200 hover:text-cyan-400">
                    {personalInfo.formattedPhone}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/30 to-slate-900 border border-cyan-800/30 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-cyan-300 block mb-1">Production-Ready & Versatile:</span>
              Equipped to take a product from early wireframes and React frontend to scalable backend APIs, containerized deployment on AWS EC2, and augmented with intelligent AI capabilities.
            </div>
          </div>

          {/* Right Column: 4 Architecture Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="glass-card glass-card-hover p-6 rounded-2xl border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} border flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
