import React from 'react';
import { ArrowRight, Download, Mail, Sparkles, Code2, Server, Database, Brain, Cloud } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const { personalInfo, keyStats } = portfolioData;

  const quickPills = [
    { label: 'React.js', icon: Code2, color: 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20' },
    { label: 'Node.js & Express', icon: Server, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20' },
    { label: 'MongoDB & PostgreSQL', icon: Database, color: 'text-teal-400 border-teal-500/30 bg-teal-950/20' },
    { label: 'AWS Cloud (EC2 & S3)', icon: Cloud, color: 'text-amber-400 border-amber-500/30 bg-amber-950/20' },
    { label: 'GenAI & RAG Systems', icon: Brain, color: 'text-purple-400 border-purple-500/30 bg-purple-950/20' },
  ];

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-600/15 via-indigo-600/15 to-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-36 left-12 w-64 h-64 bg-indigo-500/10 blur-[90px] rounded-full pointer-events-none -z-10" />

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="section-container relative z-10 w-full text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Availability & T-Shape Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full glass-card border-slate-700/60 text-xs sm:text-sm font-medium text-slate-300 mb-8 animate-fade-in shadow-inner">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-cyan-400 font-semibold">FULL STACK DEVELOPER</span>
          <span className="text-slate-600">+</span>
          <span className="text-amber-400 font-semibold">AWS CLOUD</span>
          <span className="text-slate-600">&</span>
          <span className="text-purple-400 font-semibold">AI ENGINEER</span>
        </div>

        {/* Hero Headings */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
          Hi, I'm{' '}
          <span className="gradient-text drop-shadow-sm font-black">
            {personalInfo.fullName}
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-300 mb-6 max-w-3xl">
          Full Stack Developer (MERN) with proven capabilities in{' '}
          <span className="text-amber-400 font-bold">AWS Cloud Deployments</span> &{' '}
          <span className="text-purple-400 font-bold">AI ENGINEER</span>.
        </p>

        {/* Profile Introduction snippet */}
        <p className="text-base sm:text-lg text-slate-400 mb-10 max-w-3xl leading-relaxed">
          Specialized in Javascript, React.js, Node.js, Express.js, MongoDB, MySQL and PostgreSQL with hands-on production expertise in deploying applications to AWS EC2, managing S3 cloud storage, and building intelligent GenAI RAG systems with LLM fine-tuning and workflow automations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14 w-full">
          <a
            href="#projects"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 group"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-200 glass-card hover:bg-slate-800/90 border-slate-700 hover:border-slate-500 transition-all hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>Contact Me</span>
          </a>

          <a
            href={personalInfo.resumePath}
            download={personalInfo.resumeFileName}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-cyan-300 glass-card hover:bg-cyan-950/30 border-cyan-800/60 hover:border-cyan-500/60 transition-all hover:-translate-y-0.5 group shadow-sm"
          >
            <Download className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Quick Tech Stack Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mr-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Core Stack:</span>
          </div>
          {quickPills.map((pill) => {
            const Icon = pill.icon;
            return (
              <span
                key={pill.label}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border ${pill.color} transition-all hover:scale-105`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{pill.label}</span>
              </span>
            );
          })}
        </div>

        {/* Key Metrics / Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {keyStats.map((stat, index) => (
            <div
              key={index}
              className="glass-card glass-card-hover p-4 sm:p-5 rounded-2xl text-left border-slate-800 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight gradient-text-cyan">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
