import { useEffect, useState } from 'react';
import { ArrowUpRight, ExternalLink, Github, Link2, Plus, Trash2 } from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioProject, ProjectCategory } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';
import { AddProjectModal } from './AddProjectModal';

interface ProjectShowcaseProps {
  onSelectProject: (project: PortfolioProject) => void;
}

type FilterValue = 'all' | ProjectCategory;

const STORAGE_KEY = 'samalex_kariuki_projects_v1';

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'engineering', label: 'Full Stack' },
  { value: 'data', label: 'Data & SQL' },
  { value: 'apps', label: 'Mobile Apps' },
  { value: 'design', label: 'UI & Photoshop' },
];

export function ProjectShowcase({ onSelectProject }: ProjectShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [customProjects, setCustomProjects] = useState<PortfolioProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as PortfolioProject[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customProjects));
    } catch {
      // Ignore storage errors
    }
  }, [customProjects]);

  const allProjects = [...customProjects, ...PORTFOLIO_PROJECTS];

  const filteredProjects =
    activeFilter === 'all'
      ? allProjects
      : allProjects.filter((project) => project.category === activeFilter);

  const handleAddProject = (project: PortfolioProject) => {
    setCustomProjects((prev) => [project, ...prev]);
  };

  const handleDeleteCustom = (id: string) => {
    setCustomProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section id="projects" className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111113]"
              style={{ textWrap: 'balance' }}
            >
              Projects Showcase
            </h2>
            <p className="mt-3 text-base text-zinc-600 max-w-2xl">
              Quality builds showing the problem solved, technologies used, key functionalities, source repository, and live preview—plus a placeholder slot to post your own project links.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-zinc-100 rounded-lg border border-zinc-200/80"
            >
              {FILTER_OPTIONS.map((option) => {
                const isActive = activeFilter === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(option.value)}
                    className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2563EB] ${
                      isActive
                        ? 'bg-white text-[#111113] shadow-xs'
                        : 'text-zinc-600 hover:text-[#111113]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              Post Project Link
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isWide = project.featured && activeFilter === 'all' && !project.isUserSubmitted;
            const hasExternalLive = project.liveDemoUrl && /^https?:\/\//i.test(project.liveDemoUrl);

            return (
              <article
                key={project.id}
                className={`group bg-white border border-zinc-200 rounded-2xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 ${
                  isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <div className="flex flex-col h-full">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="text-left flex flex-col flex-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] rounded-t-2xl"
                  >
                    {project.image ? (
                      <div
                        className={`w-full overflow-hidden bg-zinc-100 border-b border-zinc-200/80 ${
                          isWide ? 'aspect-[16/9]' : 'aspect-[4/3]'
                        }`}
                      >
                        <ResilientImage
                          src={project.image}
                          alt={project.imageAlt}
                          title={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[4/3] bg-[#111113] text-white p-6 flex flex-col justify-between border-b border-zinc-800">
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                          <span>{project.categoryLabel}</span>
                          <Link2 className="w-4 h-4 text-[#60A5FA]" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="font-display text-2xl font-bold tracking-tight text-white">
                            {project.title}
                          </div>
                          <div className="mt-2 font-mono text-xs text-zinc-400 truncate">
                            {project.liveDemoUrl || project.repoUrl}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 mb-3">
                          <span>{project.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{project.year}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.stack}</span>
                        </div>

                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#111113] group-hover:text-[#2563EB] transition-colors duration-150">
                            {project.title}
                          </h3>
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-200 text-zinc-600 group-hover:border-[#2563EB] group-hover:text-[#2563EB] transition-colors shrink-0">
                            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                          </span>
                        </div>

                        <p className="mt-2.5 text-sm text-zinc-600 leading-relaxed">
                          {project.summary}
                        </p>

                        <p className="mt-3 text-xs text-zinc-500 leading-relaxed">
                          <span className="font-semibold text-zinc-800">Problem Solved:</span> {project.problem}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-zinc-100 text-xs text-zinc-600">
                        <span className="font-semibold text-zinc-900">Key Functionalities:</span>{' '}
                        {project.deliverables.slice(0, 2).join(' · ')}
                      </div>
                    </div>
                  </button>

                  {/* Direct GitHub & Live Link Bar */}
                  <div className="px-6 py-3.5 flex items-center justify-between gap-3 border-t border-zinc-100 bg-zinc-50/80 text-xs font-semibold">
                    <div className="flex flex-wrap items-center gap-4">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-zinc-700 hover:text-[#111113] hover:underline"
                        >
                          <Github className="w-3.5 h-3.5" aria-hidden="true" />
                          GitHub Repo
                        </a>
                      )}
                      {hasExternalLive ? (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#2563EB] hover:underline"
                        >
                          Live Website
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      ) : project.liveDemoUrl === '#code-lab' ? (
                        <a
                          href="#code-lab"
                          className="inline-flex items-center gap-1 text-[#2563EB] hover:underline"
                        >
                          Live Demo
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>

                    {project.isUserSubmitted ? (
                      <button
                        type="button"
                        onClick={() => handleDeleteCustom(project.id)}
                        aria-label={`Remove ${project.title}`}
                        className="inline-flex items-center gap-1 text-zinc-500 hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="text-zinc-500 hover:text-[#111113] cursor-pointer"
                      >
                        Full Details
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}

          {/* Placeholder Card for Posting Additional Project Links */}
          <article className="border-2 border-dashed border-zinc-300 hover:border-[#2563EB] bg-zinc-50/70 rounded-2xl transition-colors duration-150 flex flex-col">
            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="w-full h-full min-h-[320px] p-8 flex flex-col items-center justify-center text-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] rounded-2xl group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#2563EB] mb-4 group-hover:scale-105 transition-transform">
                <Plus className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-[#111113]">
                Post Your Project Link Here
              </h3>
              <p className="mt-2 text-sm text-zinc-600 max-w-xs leading-relaxed">
                Placeholder ready for additional projects—add a live website URL, GitHub repository, or Photoshop design showcase link.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#2563EB] bg-white border border-zinc-200 group-hover:border-[#2563EB] rounded-lg transition-colors">
                <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
                Add Project URL
              </span>
            </button>
          </article>
        </div>
      </div>

      <AddProjectModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddProject={handleAddProject}
      />
    </section>
  );
}
