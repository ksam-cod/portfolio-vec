import { FormEvent, useState } from 'react';
import { Check, Copy, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { PROFILE, SKILL_CATEGORIES } from '../data/portfolioData';

export function ContactSection() {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [scope, setScope] = useState('Junior Developer Role / Internship');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(null);
    }
  };

  const handleDownloadCv = () => {
    const cvContent = [
      `CURRICULUM VITAE — ${PROFILE.fullName.toUpperCase()}`,
      `${PROFILE.title}`,
      `Location: ${PROFILE.location}`,
      `Email: ${PROFILE.email} | Tel: ${PROFILE.phoneDisplay} (${PROFILE.phoneInternational})`,
      `GitHub: ${PROFILE.githubUrl} | LinkedIn: ${PROFILE.linkedinUrl}`,
      '',
      'PROFILE SUMMARY',
      PROFILE.tagline,
      '',
      'TECHNICAL SKILLS',
      ...SKILL_CATEGORIES.map((c) => `- ${c.category}: ${c.items.join(', ')}`),
      '',
      'KEY PROJECTS',
      '1. CampusFlow Academic & Task Manager (React, Node.js, Express, PostgreSQL)',
      '2. Retail Inventory & Sales Analytics Suite (Python, Pandas, SQL, Power BI)',
      '3. Web Audio Signal & Waveform Inspector (JavaScript, Web Audio API, Canvas 2D)',
      '4. PocketLedger Expense Tracker & UI Kit (Flutter, Kotlin, MongoDB, Photoshop)',
    ].join('\n');

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Samalex_Kariuki_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please complete your name, email address, and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSending(true);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      setSubmitted(true);
    } catch {
      setError(`Your message couldn't be sent. Please try again, or email me directly at ${PROFILE.email}.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111113]"
                style={{ textWrap: 'balance' }}
              >
                Get in Touch
              </h2>
              <p className="mt-3 text-base text-zinc-600 leading-relaxed">
                {PROFILE.availability}. Reach out by email, phone, or the inquiry form below.
              </p>
            </div>

            <div className="space-y-3">
              {/* Email */}
              <div className="p-4 rounded-xl bg-white border border-zinc-200 flex items-center justify-between gap-4">
                <div className="min-w-0 flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#2563EB] mt-1 shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-zinc-500">Professional Email</div>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="text-sm font-semibold text-[#111113] hover:text-[#2563EB] transition-colors truncate block"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE.email, 'email')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Telephone */}
              <div className="p-4 rounded-xl bg-white border border-zinc-200 flex items-center justify-between gap-4">
                <div className="min-w-0 flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#2563EB] mt-1 shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-zinc-500">Phone</div>
                    <a
                      href={PROFILE.phoneHref}
                      className="text-sm font-semibold text-[#111113] hover:text-[#2563EB] transition-colors tabular-nums block"
                    >
                      {PROFILE.phoneDisplay}{' '}
                      <span className="text-xs font-normal text-zinc-500">
                        ({PROFILE.phoneInternational})
                      </span>
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(PROFILE.phoneDisplay, 'phone')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Location, LinkedIn, GitHub & CV Download */}
              <div className="p-4 rounded-xl bg-white border border-zinc-200 space-y-3 text-sm">
                <div className="flex items-center gap-3 text-zinc-700">
                  <MapPin className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
                  <span>{PROFILE.location}</span>
                </div>
                <div className="flex flex-wrap items-center gap-5 pt-2 border-t border-zinc-100 text-xs font-semibold">
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-800 hover:text-[#2563EB]"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    GitHub
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-800 hover:text-[#2563EB]"
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                    LinkedIn
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownloadCv}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#111113] bg-white hover:bg-zinc-100 border border-zinc-300 rounded-xl transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#2563EB]" aria-hidden="true" />
                Download CV / Resume
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200">
              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#2563EB]/10 text-[#2563EB]">
                    <Check className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#111113]">
                    Thanks, {name}. Your message was sent
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-600 max-w-md mx-auto">
                    I received your inquiry about <span className="font-medium text-[#111113]">{scope}</span> and will reply to your email soon. You can also reach me directly at{' '}
                    <a href={`mailto:${PROFILE.email}`} className="text-[#2563EB] underline underline-offset-4">
                      {PROFILE.email}
                    </a>{' '}
                    or{' '}
                    <a href={PROFILE.phoneHref} className="text-[#2563EB] underline underline-offset-4 tabular-nums">
                      {PROFILE.phoneDisplay}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="mt-2 px-4 py-2 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="subject" value="New portfolio inquiry: %{submissionId}" />
                  <input type="hidden" name="topic" value={scope} />
                  <p className="hidden" aria-hidden="true">
                    <label>
                      Don't fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-zinc-700 mb-1.5">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-zinc-200 rounded-lg text-[#111113] placeholder:text-zinc-400 focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-zinc-700 mb-1.5">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-zinc-200 rounded-lg text-[#111113] placeholder:text-zinc-400 focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-zinc-700 mb-1.5">
                      Inquiry Topic
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Junior Developer Role / Internship',
                        'Full-Stack Web Project',
                        'Database & Data Analytics',
                        'UI/UX & Photoshop Design',
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setScope(option)}
                          className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                            scope === option
                              ? 'bg-[#111113] text-white border-[#111113]'
                              : 'bg-[#FAFAFA] text-zinc-700 border-zinc-200 hover:border-zinc-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-zinc-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share details about the role, project scope, or collaboration..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-zinc-200 rounded-lg text-[#111113] placeholder:text-zinc-400 focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-xs font-medium text-rose-600">
                      {error}
                    </p>
                  )}

                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 disabled:cursor-not-allowed rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {sending ? 'Sending…' : 'Send Message'}
                      <Send className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
