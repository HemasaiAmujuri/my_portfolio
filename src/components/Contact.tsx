import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  Download, 
  FileText,
  Loader2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const { personalInfo } = portfolioData;

  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitStatus('loading');
    setStatusMessage('');

    try {
      let response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).catch(() => null);

      // If relative URL failed or returned 404 (e.g. Vite dev server proxy not restarted), connect directly to port 5000
      if (!response || !response.ok) {
        response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setSubmitStatus('success');
        setStatusMessage(
          data.message || 'Thank you for contacting me! Your email was sent successfully. I will review your message and reach out to you soon.'
        );
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 7000);
      } else {
        setSubmitStatus('error');
        setStatusMessage(
          data?.message || 'Failed to send message via Nodemailer. You can also send directly using your email app below.'
        );
      }
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setSubmitStatus('error');
      setStatusMessage(
        'Unable to reach Nodemailer server. Please make sure the backend server is running (`npm run server`), or use the direct email fallback below.'
      );
    }
  };

  const handleMailtoFallback = () => {
    const subjectParam = encodeURIComponent(formData.subject || `Portfolio Contact from ${formData.name}`);
    const bodyParam = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subjectParam}&body=${bodyParam}`;
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Let's discuss full-stack opportunities, backend optimization, or AI integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
          {/* Left Column: Direct Contact Info & Resume Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Contact Channels */}
            <div className="glass-card p-6 sm:p-7 rounded-2xl border-slate-800 space-y-5">
              <h3 className="text-xl font-bold text-white mb-2">
                Contact Information
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Feel free to reach out directly via email, phone, or connect through LinkedIn.
              </p>

              {/* Email Item */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-cyan-950/70 border border-cyan-800/50 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-400 font-medium">Email Address</div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors truncate block"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(personalInfo.email, 'email')}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 ml-2"
                  title="Copy email to clipboard"
                  aria-label="Copy Email"
                >
                  {copiedItem === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone Item */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-cyan-950/70 border border-cyan-800/50 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-400 font-medium">Direct Phone</div>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors block"
                    >
                      {personalInfo.formattedPhone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(personalInfo.formattedPhone, 'phone')}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 ml-2"
                  title="Copy phone to clipboard"
                  aria-label="Copy Phone"
                >
                  {copiedItem === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location Item */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="w-9 h-9 rounded-lg bg-cyan-950/70 border border-cyan-800/50 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Current Location</div>
                  <div className="text-sm font-semibold text-white">
                    {personalInfo.location}
                  </div>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-cyan-950/60 border border-slate-700 hover:border-cyan-600/50 text-cyan-300 text-xs font-semibold transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            {/* Resume Download Action Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-indigo-950/30 to-slate-900 border border-cyan-800/40 flex flex-col justify-between">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Download Full Resume
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Official 2-page PDF including comprehensive work history, system architecture, and technology proficiencies.
                  </p>
                </div>
              </div>

              <a
                href={personalInfo.resumePath}
                download={personalInfo.resumeFileName}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 shadow-md shadow-cyan-500/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border-slate-800">
              <h3 className="text-xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Send a direct message via our <span className="text-cyan-400 font-medium">Nodemailer API</span> to <span className="text-cyan-300 font-semibold">{personalInfo.email}</span>.
              </p>

              {/* Success Notification Banner */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/70 border border-emerald-600/50 text-emerald-300 text-sm flex items-start gap-3 shadow-lg shadow-emerald-950/40 animate-fade-in">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-emerald-200">Email Sent Successfully!</div>
                    <p className="text-xs text-emerald-300/90 mt-0.5 leading-relaxed">{statusMessage}</p>
                  </div>
                </div>
              )}

              {/* Error Notification Banner with Fallback */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-amber-950/60 border border-amber-600/50 text-amber-200 text-sm flex flex-col gap-3 shadow-lg shadow-amber-950/40 animate-fade-in">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-amber-300">Notice</div>
                      <p className="text-xs text-amber-200/90 mt-0.5 leading-relaxed">{statusMessage}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-amber-800/40 flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs text-slate-300">Prefer sending via your email app?</span>
                    <button
                      type="button"
                      onClick={handleMailtoFallback}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition-colors"
                    >
                      <span>Open in Mail App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Opportunity Discussion / Project Collaboration"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your team, tech stack, or opportunity..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all ${
                    submitStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {submitStatus === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
