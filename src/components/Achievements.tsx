import React from 'react';
import { Gauge, Zap, Cloud, Brain, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Achievements: React.FC = () => {
  const { achievements } = portfolioData;

  const icons: Record<string, React.ElementType> = {
    'latency-reduction': Gauge,
    'redis-caching': Zap,
    'aws-deployments': Cloud,
    'ai-rag-systems': Brain,
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cloud':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/50';
      case 'ai':
        return 'text-purple-400 bg-purple-950/60 border-purple-800/50';
      case 'performance':
      default:
        return 'text-cyan-400 bg-cyan-950/70 border-cyan-800/50';
    }
  };

  return (
    <section id="achievements" className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            Measurable Results
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Engineering Impacts
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            High-impact production optimizations, cloud deployments, and Applied AI automations.
          </p>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item) => {
            const Icon = icons[item.id] || CheckCircle2;
            const categoryStyle = getCategoryColor(item.category);

            return (
              <div
                key={item.id}
                className="glass-card glass-card-hover p-6 rounded-2xl border-slate-800 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

                <div>
                  {/* Icon Header */}
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 ${categoryStyle}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Stat Metric */}
                  <div className="text-3xl font-extrabold text-white mb-1 gradient-text-cyan tracking-tight">
                    {item.metric}
                  </div>

                  {/* Label */}
                  <h3 className="text-base font-bold text-slate-100 mb-3">
                    {item.label}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <span className={item.category === 'cloud' ? 'text-amber-400' : item.category === 'ai' ? 'text-purple-400' : 'text-cyan-400'}>
                    {item.category}
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full ${item.category === 'cloud' ? 'bg-amber-400' : item.category === 'ai' ? 'bg-purple-400' : 'bg-cyan-400'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
