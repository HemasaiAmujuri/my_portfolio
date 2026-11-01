import React from 'react';
import { ExternalLink, Github, Sparkles, Layers, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const { projects } = portfolioData;

  const getTechBadgeStyle = (tech: string) => {
    const lower = tech.toLowerCase();
    if (lower.includes('aws') || lower.includes('ec2') || lower.includes('s3')) {
      return 'bg-amber-950/40 border-amber-600/40 text-amber-300';
    }
    if (lower.includes('openai') || lower.includes('pinecone') || lower.includes('langchain') || lower.includes('vector')) {
      return 'bg-purple-950/40 border-purple-600/40 text-purple-300';
    }
    if (lower.includes('react') || lower.includes('typescript')) {
      return 'bg-cyan-950/40 border-cyan-700/40 text-cyan-300';
    }
    if (lower.includes('node') || lower.includes('express') || lower.includes('mongodb')) {
      return 'bg-emerald-950/40 border-emerald-700/40 text-emerald-300';
    }
    return 'bg-slate-900 border-slate-800 text-slate-300';
  };

  const getFeaturedBadgeStyle = (badge?: string) => {
    if (!badge) return 'bg-cyan-950/60 border-cyan-700/60 text-cyan-300';
    if (badge.toLowerCase().includes('rag') || badge.toLowerCase().includes('ai')) {
      return 'bg-purple-950/60 border-purple-700/60 text-purple-300';
    }
    return 'bg-cyan-950/60 border-cyan-700/60 text-cyan-300';
  };

  return (
    <section id="projects" className="py-24 relative bg-[#090d16]">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            Real-World Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Production & AI Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Production full-stack platforms, AWS cloud deployments, and Applied Generative AI systems engineered for real-world reliability.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card glass-card-hover rounded-2xl border-slate-800 p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group transition-all"
            >
              {/* Decorative Subtle Ambient Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div>
                {/* Header row: Badge & Action Links */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  {project.featuredBadge && (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getFeaturedBadgeStyle(project.featuredBadge)}`}>
                      <Sparkles className="w-3.5 h-3.5" />
                      {project.featuredBadge}
                    </span>
                  )}

                  <div className="flex items-center gap-2 ml-auto">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                        aria-label="View Source on GitHub"
                        title="GitHub Profile & Repos"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm"
                        aria-label="Live Demo"
                      >
                        <span>Demo / Code</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Role */}
                <h3 className="text-xl font-extrabold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-4">
                  <span className="font-semibold">{project.role}</span>
                </div>

                {/* Summary */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {project.summary}
                </p>

                {/* Contributions List */}
                <div className="space-y-3 mb-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Key Engineering Deliverables:</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {project.keyContributions.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Stack Pills Footer */}
              <div className="pt-5 border-t border-slate-800/80">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-mono border ${getTechBadgeStyle(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
