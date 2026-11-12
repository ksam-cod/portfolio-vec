import { useEffect, useState } from 'react';
import { Check, Code2, Copy, ExternalLink, Layers, X } from 'lucide-react';
import { PortfolioProject } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface CaseStudyModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onOpenCodeLab: () => void;
}

export function CaseStudyModal({ project, onClose, onOpenCodeLab }: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'code'>('overview');
  const [activeFileIdx, setActiveFileIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setActiveTab('overview');
    setActiveFileIdx(0);
    setCopied(false);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentFile = project.codeFiles[activeFileIdx] ?? project.codeFiles[0];

  const handleCopyCode = async () => {
    if (!currentFile) return;
    try {
      await navigator.clipboard.writeText(currentFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-zinc-950/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between gap-4 bg-[#FAFAFA]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500">
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{project.year}</span>
              <span aria-hidden="true">·</span>
              <span>{project.role}</span>
            </div>
            <h2
              id="case-study-title"
              className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#111113] truncate mt-0.5"
            >
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:inline-flex p-1 bg-zinc-200/70 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-white text-[#111113] shadow-xs'
                    : 'text-zinc-600 hover:text-[#111113]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                Design &amp; Outcomes
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('code')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'code'
                    ? 'bg-white text-[#111113] shadow-xs'
                    : 'text-zinc-600 hover:text-[#111113]'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                Code &amp; Architecture
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study modal"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:text-[#111113] hover:border-zinc-300 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2563EB]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="sm:hidden px-6 py-2.5 border-b border-zinc-200 bg-zinc-50 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 text-xs font-semibold rounded-md cursor-pointer ${
              activeTab === 'overview' ? 'bg-[#111113] text-white' : 'bg-white text-zinc-700 border border-zinc-200'
            }`}
          >
            Design &amp; Outcomes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`flex-1 py-2 text-xs font-semibold rounded-md cursor-pointer ${
              activeTab === 'code' ? 'bg-[#111113] text-white' : 'bg-white text-zinc-700 border border-zinc-200'
            }`}
          >
            Code &amp; Architecture
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {activeTab === 'overview' ? (
            <>
              {project.image && (
                <div className="aspect-[16/9] max-h-[380px] w-full rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                  <ResilientImage
                    src={project.image}
                    alt={project.imageAlt}
                    title={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-7 space-y-6">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#111113] mb-2">
                      Problem &amp; Context
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-[#111113] mb-2">
                      Design &amp; Technical Approach
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                      {project.architecture}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-[#111113] mb-2">
                      Measured Outcome
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-[#111113]">
                      {project.outcome}
                    </p>
                  </div>

                  {(project.liveDemoUrl || project.repoUrl) && (
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {project.liveDemoUrl && /^https?:\/\//i.test(project.liveDemoUrl) && (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                        >
                          Visit Live Project
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      )}
                      {project.repoUrl && /^https?:\/\//i.test(project.repoUrl) && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#111113] bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
                        >
                          View Source / Design Link
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="md:col-span-5 space-y-6">
                  <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200">
                    <h3 className="font-display text-sm font-bold text-[#111113] mb-3">
                      Key Deliverables
                    </h3>
                    <ul className="space-y-2.5 text-sm text-zinc-600">
                      {project.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="text-[#2563EB] font-mono text-xs mt-1" aria-hidden="true">
                            0{project.deliverables.indexOf(item) + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200">
                    <h3 className="font-display text-sm font-bold text-[#111113] mb-3">
                      System Specifications
                    </h3>
                    <dl className="space-y-3">
                      {project.tokens.map((token) => (
                        <div key={token.label} className="flex items-center justify-between text-sm">
                          <dt className="text-zinc-500">{token.label}</dt>
                          <dd className="flex items-center gap-2 font-mono text-xs font-medium text-[#111113] tabular-nums">
                            {token.swatch && (
                              <span
                                className="w-3.5 h-3.5 rounded-sm border border-zinc-300 shrink-0"
                                style={{ backgroundColor: token.swatch }}
                                aria-hidden="true"
                              />
                            )}
                            {token.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {project.codeFiles.map((file, idx) => (
                    <button
                      key={file.filename}
                      type="button"
                      onClick={() => setActiveFileIdx(idx)}
                      className={`px-3 py-1.5 font-mono text-xs rounded-md border transition-colors cursor-pointer ${
                        idx === activeFileIdx
                          ? 'bg-[#111113] text-white border-[#111113]'
                          : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      {file.filename}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                      Copied Snippet
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>

              {currentFile && (
                <div className="rounded-xl bg-[#111113] text-zinc-100 border border-zinc-800 overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>{currentFile.filename}</span>
                    <span>{currentFile.language}</span>
                  </div>
                  <pre className="p-5 overflow-x-auto text-xs sm:text-sm leading-relaxed font-mono">
                    <code>{currentFile.content}</code>
                  </pre>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-zinc-200">
                <p className="text-sm text-zinc-600">
                  Stack: <span className="font-medium text-[#111113]">{project.stack}</span>
                </p>

                <div className="flex items-center gap-3">
                  {project.liveDemoUrl === '#code-lab' && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenCodeLab();
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer"
                    >
                      Run in Interactive Code Lab
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
