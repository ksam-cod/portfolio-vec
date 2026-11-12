import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import {
  BlogArticle,
  CERTIFICATIONS_LIST,
  DEVELOPMENT_JOURNEY,
  EDUCATION_LIST,
  FUTURE_PROJECTS,
  TECHNICAL_BLOG,
  TESTIMONIALS,
} from '../data/portfolioData';

export function EducationAndJournal() {
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  useEffect(() => {
    if (!activeArticle) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveArticle(null);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [activeArticle]);

  return (
    <>
      {/* 6. Education, Certifications, Development Journey & Future Roadmap */}
      <section id="education" className="py-20 lg:py-24 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Education & Coursework */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-[#111113]">
                  Education &amp; Coursework
                </h2>
                <p className="mt-2 text-sm text-zinc-600">
                  Formal academic foundation paired with applied programming training.
                </p>
              </div>

              {EDUCATION_LIST.map((edu) => (
                <div key={edu.credential} className="p-6 rounded-2xl bg-white border border-zinc-200 space-y-4">
                  <div className="font-mono text-xs font-medium text-[#2563EB] tabular-nums">
                    {edu.period}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#111113]">
                      {edu.credential}
                    </h3>
                    <div className="text-xs font-medium text-zinc-500 mt-1">
                      {edu.institution}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {edu.details}
                  </p>
                  <div className="pt-3 border-t border-zinc-100">
                    <div className="text-xs font-semibold text-zinc-800 mb-2">
                      Relevant Coursework
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {edu.coursework.join(' · ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications & Training */}
            <div className="lg:col-span-6">
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#111113] mb-8">
                Certifications &amp; Training
              </h2>

              <div className="divide-y divide-zinc-200 border-y border-zinc-200">
                {CERTIFICATIONS_LIST.map((cert) => (
                  <div key={cert.title} className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4">
                    <div className="sm:col-span-2 font-mono text-xs font-medium text-zinc-500 tabular-nums pt-0.5">
                      {cert.year}
                    </div>
                    <div className="sm:col-span-10">
                      <h3 className="font-display text-base font-bold text-[#111113]">
                        {cert.title}
                      </h3>
                      <div className="text-xs font-medium text-zinc-500 mt-0.5">
                        {cert.issuer}
                      </div>
                      <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed">
                        {cert.focus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Development Journey & Future Projects */}
          <div className="pt-12 border-t border-zinc-200 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <h3 className="font-display text-2xl font-bold tracking-tight text-[#111113] mb-6">
                Development Journey
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {DEVELOPMENT_JOURNEY.map((step) => (
                  <div key={step.year} className="p-5 rounded-xl bg-white border border-zinc-200">
                    <div className="font-mono text-xs font-semibold text-[#2563EB] tabular-nums">
                      {step.year}
                    </div>
                    <h4 className="font-display text-base font-bold text-[#111113] mt-1">
                      {step.stage}
                    </h4>
                    <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {step.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <h3 className="font-display text-2xl font-bold tracking-tight text-[#111113] mb-6">
                Upcoming &amp; Future Projects
              </h3>
              <div className="space-y-4">
                {FUTURE_PROJECTS.map((proj) => (
                  <div key={proj.title} className="p-5 rounded-xl bg-white border border-zinc-200">
                    <h4 className="font-display text-base font-bold text-[#111113]">
                      {proj.title}
                    </h4>
                    <div className="text-xs font-mono text-zinc-500 mt-1">
                      {proj.scope}
                    </div>
                    <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                      {proj.goal}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standout Component: Technical Blog + Testimonials */}
      <section id="blog" className="py-20 lg:py-24 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <div className="max-w-2xl mb-10">
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111113]"
                style={{ textWrap: 'balance' }}
              >
                Technical Writing &amp; Engineering Notes
              </h2>
              <p className="mt-3 text-base text-zinc-600">
                Short essays explaining database architecture, responsive frontend systems, and REST API engineering decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TECHNICAL_BLOG.map((article) => (
                <article
                  key={article.id}
                  className="bg-[#FAFAFA] border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-300 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-3">
                      <span>{article.topic}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-[#111113] mb-2.5">
                      {article.title}
                    </h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">{article.date}</span>
                    <button
                      type="button"
                      onClick={() => setActiveArticle(article)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline cursor-pointer"
                    >
                      Read Note
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="pt-12 border-t border-zinc-200">
            <h3 className="font-display text-2xl font-bold tracking-tight text-[#111113] mb-6">
              Endorsements &amp; Feedback
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((item) => (
                <blockquote
                  key={item.author}
                  className="p-6 rounded-2xl bg-[#FAFAFA] border border-zinc-200"
                >
                  <p className="text-sm sm:text-base text-zinc-800 leading-relaxed">
                    “{item.quote}”
                  </p>
                  <footer className="mt-4 pt-4 border-t border-zinc-200 text-xs">
                    <span className="font-semibold text-[#111113]">{item.author}</span>
                    <span className="mx-1.5 text-zinc-400" aria-hidden="true">·</span>
                    <span className="text-zinc-600">
                      {item.role}, {item.organization}
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Blog Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="w-full max-w-2xl max-h-[88vh] bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-zinc-200 bg-[#FAFAFA] flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-medium text-zinc-500">
                  {activeArticle.topic} <span aria-hidden="true">·</span> {activeArticle.date}{' '}
                  <span aria-hidden="true">·</span> {activeArticle.readTime}
                </div>
                <h3 id="blog-modal-title" className="font-display text-xl font-bold text-[#111113] mt-1">
                  {activeArticle.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Close article"
                className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:text-[#111113] shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              {activeArticle.paragraphs.map((p, idx) => (
                <p key={idx} className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                  {p}
                </p>
              ))}
              {activeArticle.codeSnippet && (
                <pre className="mt-4 p-4 rounded-xl bg-[#111113] text-zinc-100 text-xs font-mono overflow-x-auto leading-relaxed">
                  <code>{activeArticle.codeSnippet}</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
