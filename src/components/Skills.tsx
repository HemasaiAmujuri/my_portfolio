import React, { useState } from 'react';
import { 
  Layers, 
  Database, 
  Cpu, 
  Wrench, 
  Cloud, 
  Brain, 
  CheckCircle2, 
  Search
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { skillsCategories } = portfolioData;

  const categoryIcons: Record<string, React.ElementType> = {
    'mern-fullstack': Layers,
    'aws-cloud': Cloud,
    'generative-ai': Brain,
    databases: Database,
    'system-design': Cpu,
    'tools-devops': Wrench,
  };

  const allCategories = [
    { id: 'all', title: 'All Skills' },
    ...skillsCategories.map((c) => ({ id: c.id, title: c.title })),
  ];

  // Flatten or filter skills
  const filteredCategories = skillsCategories
    .filter((cat) => selectedCategory === 'all' || cat.id === selectedCategory)
    .map((cat) => {
      const filteredSkills = cat.skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return {
        ...cat,
        skills: filteredSkills,
      };
    })
    .filter((cat) => cat.skills.length > 0);

  const getCategoryStyles = (id: string, type?: string) => {
    if (id === 'aws-cloud' || (type === 'wing' && id.includes('cloud'))) {
      return {
        cardBorder: 'border-amber-500/30 hover:border-amber-400/50',
        iconBg: 'bg-amber-950/60 border-amber-500/40 text-amber-400',
        badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
        primarySkillBg: 'bg-slate-800/90 text-amber-200 border-amber-500/40',
        checkColor: 'text-amber-400',
      };
    }
    if (id === 'generative-ai' || (type === 'wing' && id.includes('ai'))) {
      return {
        cardBorder: 'border-purple-500/30 hover:border-purple-400/50',
        iconBg: 'bg-purple-950/60 border-purple-500/40 text-purple-400',
        badgeBg: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
        primarySkillBg: 'bg-slate-800/90 text-purple-200 border-purple-500/40',
        checkColor: 'text-purple-400',
      };
    }
    if (id === 'mern-fullstack' || type === 'core') {
      return {
        cardBorder: 'border-cyan-500/30 hover:border-cyan-400/50',
        iconBg: 'bg-cyan-950/60 border-cyan-800/50 text-cyan-400',
        badgeBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
        primarySkillBg: 'bg-slate-800/90 text-cyan-200 border-cyan-500/40',
        checkColor: 'text-cyan-400',
      };
    }
    return {
      cardBorder: 'border-slate-800 hover:border-slate-700',
      iconBg: 'bg-slate-900 border-slate-700/50 text-slate-300',
      badgeBg: 'bg-slate-800 border-slate-700 text-slate-300',
      primarySkillBg: 'bg-slate-800/90 text-slate-200 border-slate-600/40',
      checkColor: 'text-cyan-400',
    };
  };

  return (
    <section id="skills" className="py-24 relative bg-[#090d16]">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            Core Competencies
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Skills & Architecture
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Structured along the <strong className="text-cyan-300">T-Shaped Model</strong>: Deep MERN stack development supported by production AWS cloud hosting and Applied Generative AI.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {allCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                      : 'glass-card text-slate-300 hover:text-white hover:bg-slate-800/80 border-slate-800'
                  }`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills (e.g., EC2, RAG, Node)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg glass-card border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Skills Categories Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = categoryIcons[category.id] || Layers;
            const style = getCategoryStyles(category.id, category.type);

            return (
              <div
                key={category.id}
                className={`glass-card glass-card-hover p-6 rounded-2xl ${style.cardBorder} flex flex-col justify-between transition-all`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-5 pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${style.iconBg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">
                          {category.title}
                        </h3>
                        <span className="text-xs text-slate-400">
                          {category.skills.length} skills listed
                        </span>
                      </div>
                    </div>

                    {category.badge && (
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${style.badgeBg} shrink-0`}>
                        {category.badge}
                      </span>
                    )}
                  </div>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          skill.isPrimary
                            ? `${style.primarySkillBg} shadow-sm`
                            : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {skill.isPrimary ? (
                          <CheckCircle2 className={`w-3.5 h-3.5 ${style.checkColor} shrink-0`} />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        )}
                        <span>{skill.name}</span>
                        {skill.level && (
                          <span className="text-[10px] text-slate-400 ml-0.5 px-1 py-0.2 rounded bg-slate-800/80">
                            {skill.level}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
