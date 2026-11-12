import { useState } from 'react';
import { Check, Copy, ExternalLink, GitBranch, Terminal } from 'lucide-react';
import { GITHUB_REPOS, PROFILE, SKILL_CATEGORIES } from '../data/portfolioData';

export function SkillsAndGithub() {
  const [selectedRepoIdx, setSelectedRepoIdx] = useState(0);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const activeRepo = GITHUB_REPOS[selectedRepoIdx] ?? GITHUB_REPOS[0];

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(activeRepo.installSteps.join('\n'));
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 1800);
    } catch {
      setCopiedCmd(false);
    }
  };

  return (
    <>
      {/* 4. Categorized Technical Skills */}
      <section id="skills" className="py-20 lg:py-24 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111113]"
              style={{ textWrap: 'balance' }}
            >
              Technical Skills
            </h2>
            <p className="mt-3 text-base text-zinc-600">
              Technologies and engineering disciplines I actively build with—spanning full-stack code, databases, data analytics, mobile development, and Photoshop UI/UX design.
            </p>
          </div>

          {/* Clean Structured Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {SKILL_CATEGORIES.map((group) => (
              <div key={group.index} className="pt-6 border-t border-zinc-300">
                <div className="font-mono text-xs font-medium text-[#2563EB] mb-2 tabular-nums">
                  {group.index}
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight text-[#111113] mb-2">
                  {group.category}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                  {group.focus}
                </p>
                <p className="text-sm font-medium text-[#111113] leading-relaxed">
                  {group.items.map((skill, idx) => (
                    <span key={skill}>
                      <span>{skill}</span>
                      {idx < group.items.length - 1 && (
                        <span className="mx-2 text-zinc-400" aria-hidden="true">·</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GitHub Profile & Repository Standards */}
      <section id="github" className="py-20 lg:py-24 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111113]"
                style={{ textWrap: 'balance' }}
              >
                GitHub Profile &amp; Code Documentation
              </h2>
              <p className="mt-3 text-base text-zinc-600 max-w-2xl">
                Organized repositories with meaningful commit history, reproducible installation instructions, and structured README documentation.
              </p>
            </div>

            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#111113] hover:bg-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <GitBranch className="w-4 h-4" aria-hidden="true" />
              {PROFILE.githubHandle}
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Repository Selector */}
            <div className="lg:col-span-5 space-y-3">
              {GITHUB_REPOS.map((repo, idx) => {
                const isSelected = idx === selectedRepoIdx;
                return (
                  <button
                    key={repo.name}
                    type="button"
                    onClick={() => setSelectedRepoIdx(idx)}
                    className={`w-full text-left p-5 rounded-xl border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2563EB] ${
                      isSelected
                        ? 'bg-[#FAFAFA] border-[#2563EB]'
                        : 'bg-white border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-sm font-semibold text-[#111113]">
                        {repo.name}
                      </span>
                      <span className="font-mono text-xs text-zinc-500 tabular-nums shrink-0">
                        {repo.commits} commits
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {repo.description}
                    </p>
                    <div className="mt-3 text-xs font-medium text-zinc-500">
                      {repo.language}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* README & Installation Preview */}
            <div className="lg:col-span-7 rounded-2xl border border-zinc-200 bg-[#FAFAFA] overflow-hidden">
              <div className="p-6 border-b border-zinc-200 bg-white space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-mono text-zinc-500">README.md</div>
                    <h3 className="font-display text-xl font-bold text-[#111113] mt-0.5">
                      {activeRepo.name}
                    </h3>
                  </div>

                  <a
                    href={activeRepo.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:underline"
                  >
                    Inspect on GitHub
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>

                <p className="text-sm text-zinc-600 leading-relaxed">
                  {activeRepo.readmeSummary}
                </p>

                <div className="text-xs text-zinc-500 flex flex-wrap items-center gap-3 pt-1">
                  <span>Structured Commit History</span>
                  <span aria-hidden="true">·</span>
                  <span>Environment Template Included</span>
                  <span aria-hidden="true">·</span>
                  <span>Reproducible Setup Steps</span>
                </div>
              </div>

              <div className="bg-[#111113] text-zinc-100">
                <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400">
                    <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                    Installation Instructions
                  </span>

                  <button
                    type="button"
                    onClick={handleCopyInstall}
                    className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors cursor-pointer"
                  >
                    {copiedCmd ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#60A5FA]" aria-hidden="true" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                        Copy Commands
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-5 overflow-x-auto text-xs sm:text-sm leading-relaxed font-mono text-zinc-200">
                  <code>{activeRepo.installSteps.join('\n')}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
