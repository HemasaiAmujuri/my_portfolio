import React, { useState, useEffect } from 'react';
import { Menu, X, FileDown, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group font-mono font-bold text-xl tracking-tight text-white"
          aria-label="Home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-mono font-extrabold shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            AH
          </div>
          <span className="hidden sm:inline font-sans font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
            Amujuri Hemasai
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={portfolioData.personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={portfolioData.personalInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={portfolioData.personalInfo.resumePath}
            download={portfolioData.personalInfo.resumeFileName}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-900 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 font-semibold"
          >
            <FileDown className="w-4 h-4" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={portfolioData.personalInfo.resumePath}
            download={portfolioData.personalInfo.resumeFileName}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 flex items-center gap-1 shadow-sm"
            aria-label="Download Resume"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">CV</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c1322] border-b border-slate-800 px-4 pt-3 pb-6 animate-fade-in shadow-2xl">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-800/80 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={portfolioData.personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={portfolioData.personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-cyan-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${portfolioData.personalInfo.email}`}
                className="p-2.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <a
              href={portfolioData.personalInfo.resumePath}
              download={portfolioData.personalInfo.resumeFileName}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-500/25"
            >
              <FileDown className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
