import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const { personalInfo } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060a12] border-t border-slate-900 py-12 relative">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm">
                AH
              </div>
              <span className="font-bold text-lg text-white">
                {personalInfo.fullName}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {personalInfo.title} • MERN Full Stack • AWS Cloud (EC2 & S3) • Applied GenAI & RAG
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-slate-700 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 hover:bg-cyan-900 hover:text-cyan-300 transition-colors ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3 text-center">
          <p>
            © {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 justify-center">
            <span>Built with React, TypeScript & Tailwind CSS</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-500/80 flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-cyan-400 fill-cyan-400" />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
