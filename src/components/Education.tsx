import React from 'react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Education: React.FC = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-24 relative bg-[#090d16]">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            Academic Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Foundations in Computer Science, engineering fundamentals, and mathematics.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {education.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover p-6 rounded-2xl border-slate-800 flex flex-col justify-between relative"
            >
              <div>
                {/* Degree Header with Icon */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
                    <Award className="w-3.5 h-3.5" />
                    <span>{item.grade}</span>
                  </span>
                </div>

                {/* Degree Title */}
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {item.degree}
                </h3>

                {/* Institution Name */}
                <p className="text-sm font-medium text-cyan-300/90 mb-4">
                  {item.institution}
                </p>
              </div>

              {/* Card Meta Details */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
