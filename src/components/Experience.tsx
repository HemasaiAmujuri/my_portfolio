import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Experience: React.FC = () => {
  const { experiences, rolesAndResponsibilities } = portfolioData;
  const [activeTab, setActiveTab] = useState<'timeline' | 'responsibilities'>('timeline');

  return (
    <section id="experience" className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            Career Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Proven track record designing scalable web applications, optimizing databases, and deploying real-time services.
          </p>

          {/* Toggle between Experience Timeline & Full Roles & Responsibilities */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 mt-6 shadow-inner">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'timeline'
                  ? 'bg-cyan-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Company Roles</span>
            </button>
            <button
              onClick={() => setActiveTab('responsibilities')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'responsibilities'
                  ? 'bg-cyan-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Roles & Responsibilities ({rolesAndResponsibilities.length})</span>
            </button>
          </div>
        </div>

        {activeTab === 'timeline' ? (
          /* Timeline View */
          <div className="relative max-w-4xl mx-auto">
            {/* Center Timeline Spine */}
            <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-slate-800 -translate-x-1/2 hidden sm:block" />

            <div className="space-y-12">
              {experiences.map((exp, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={exp.id}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    } gap-6 sm:gap-10`}
                  >
                    {/* Node Dot on spine */}
                    <div className="hidden sm:flex absolute left-1/2 top-6 -translate-x-1/2 w-6 h-6 rounded-full bg-[#090d16] border-2 border-cyan-400 items-center justify-center shadow-lg shadow-cyan-500/30 z-10">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    </div>

                    {/* Card Content */}
                    <div className="w-full sm:w-[calc(50%-2rem)]">
                      <div className="glass-card glass-card-hover p-6 sm:p-7 rounded-2xl border-slate-800 relative">
                        {/* Period & Location Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                              {exp.period}
                            </span>
                            {exp.current && (
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Present
                              </span>
                            )}
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {exp.location}
                          </span>
                        </div>

                        {/* Role & Company */}
                        <h3 className="text-xl font-bold text-white mb-1">
                          {exp.role}
                        </h3>
                        <div className="text-base font-semibold text-cyan-400 mb-4">
                          {exp.company}
                        </div>

                        {exp.summary && (
                          <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                            {exp.summary}
                          </p>
                        )}

                        {/* Bullet Highlights */}
                        <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-300">
                          {exp.highlights.map((item, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5">
                              <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                          {exp.techStack.map((tech) => {
                            const lower = tech.toLowerCase();
                            let pillStyle = 'bg-slate-900 border-slate-800 text-slate-300';
                            if (lower.includes('aws') || lower.includes('ec2') || lower.includes('s3')) {
                              pillStyle = 'bg-amber-950/40 border-amber-600/40 text-amber-300';
                            } else if (lower.includes('openai') || lower.includes('ai')) {
                              pillStyle = 'bg-purple-950/40 border-purple-600/40 text-purple-300';
                            } else if (lower.includes('react') || lower.includes('typescript')) {
                              pillStyle = 'bg-cyan-950/40 border-cyan-700/40 text-cyan-300';
                            } else if (lower.includes('node') || lower.includes('express') || lower.includes('mongo')) {
                              pillStyle = 'bg-emerald-950/40 border-emerald-700/40 text-emerald-300';
                            } else if (lower.includes('redux') || lower.includes('socket')) {
                              pillStyle = 'bg-indigo-950/40 border-indigo-700/40 text-indigo-300';
                            }
                            return (
                              <span
                                key={tech}
                                className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono border ${pillStyle}`}
                              >
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Responsibilities Grid */
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {rolesAndResponsibilities.map((resp, rIdx) => (
              <div
                key={rIdx}
                className="glass-card p-4 sm:p-5 rounded-xl border-slate-800 flex items-start gap-3 hover:border-cyan-500/30 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 leading-relaxed">
                  {resp}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
