import { FormEvent, useEffect, useState } from 'react';
import { Link2, Plus, X } from 'lucide-react';
import { PortfolioProject, ProjectCategory } from '../data/portfolioData';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: PortfolioProject) => void;
}

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  engineering: 'Full Stack Web Development',
  data: 'Data Analytics & Databases',
  apps: 'Application Development',
  design: 'Photoshop & UI/UX Design',
};

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function AddProjectModal({ isOpen, onClose, onAddProject }: AddProjectModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('engineering');
  const [liveUrl, setLiveUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [stack, setStack] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    const cleanLive = normalizeUrl(liveUrl);
    const cleanRepo = normalizeUrl(repoUrl);

    if (!cleanTitle) {
      setError('Please enter a project title.');
      return;
    }
    if (!cleanLive && !cleanRepo) {
      setError('Please provide at least one project URL (live link or repository/design link).');
      return;
    }

    const newProject: PortfolioProject = {
      id: `user-${Date.now()}`,
      title: cleanTitle,
      category,
      categoryLabel: CATEGORY_LABELS[category],
      year: String(new Date().getFullYear()),
      role: 'Creator & Developer',
      stack: stack.trim() || 'React · Node.js · PostgreSQL',
      summary:
        summary.trim() ||
        'Custom project published directly via link to showcase practical engineering and design work.',
      outcome: cleanLive ? `Live at ${cleanLive.replace(/^https?:\/\//, '')}` : 'Source & documentation linked',
      imageAlt: `${cleanTitle} project preview`,
      problem: summary.trim() || 'Created to solve a real-world workflow challenge with clean code and design.',
      architecture: `Built using ${stack.trim() || 'modern web and data technologies'} with a focus on performance and clarity.`,
      deliverables: [
        cleanLive ? `Live deployment: ${cleanLive}` : 'Production build',
        cleanRepo ? `Repository / design link: ${cleanRepo}` : 'Technical documentation',
      ],
      tokens: [
        { label: 'Category', value: CATEGORY_LABELS[category] },
        { label: 'Stack', value: stack.trim() || 'Custom' },
      ],
      codeFiles: [
        {
          filename: 'project-links.json',
          language: 'json',
          content: JSON.stringify(
            {
              title: cleanTitle,
              category: CATEGORY_LABELS[category],
              liveUrl: cleanLive || null,
              repositoryOrDesignUrl: cleanRepo || null,
              stack: stack.trim() || null,
            },
            null,
            2
          ),
        },
      ],
      liveDemoUrl: cleanLive || undefined,
      repoUrl: cleanRepo || undefined,
      isUserSubmitted: true,
    };

    onAddProject(newProject);
    setTitle('');
    setLiveUrl('');
    setRepoUrl('');
    setStack('');
    setSummary('');
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-project-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-zinc-200 bg-[#FAFAFA] flex items-center justify-between">
          <div>
            <h2 id="add-project-title" className="font-display text-xl font-bold text-[#111113]">
              Post a Project Link
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Add a live demo URL, GitHub repo, Power BI report, or design showcase link to your portfolio.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close add project dialog"
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:text-[#111113] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="proj-title" className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Project Title
            </label>
            <input
              id="proj-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Inventory Analytics Dashboard"
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-zinc-200 rounded-lg text-[#111113] placeholder:text-zinc-400 focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="proj-cat" className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Discipline
              </label>
              <select
                id="proj-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-zinc-200 rounded-lg text-[#111113] focus:outline-none focus:border-[#2563EB]"
              >
                <option value="engineering">Full Stack Web Development</option>
                <option value="data">Data Analytics &amp; Databases</option>
                <option value="apps">Application Development</option>
                <option value="design">Photoshop &amp; UI/UX Design</option>
              </select>
            </div>

            <div>
              <label htmlFor="proj-stack" className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Tech / Tools Used
              </label>
              <input
                id="proj-stack"
                type="text"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                placeholder="React · Node.js · PostgreSQL"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-zinc-200 rounded-lg text-[#111113] placeholder:text-zinc-400 focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="proj-live" className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Live Project URL
            </label>
            <div className="relative">
              <Link2 className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                id="proj-live"
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://your-project-url.com"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-zinc-200 rounded-lg text-[#111113] placeholder:text-zinc-400 focus:outline-none focus:border-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="proj-repo" className="block text-xs font-semibold text-zinc-700 mb-1.5">
              GitHub Repo / Behance / Figma Link (Optional)
            </label>
            <input
              id="proj-repo"
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/project"
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-zinc-200 rounded-lg text-[#111113] placeholder:text-zinc-400 focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div>
            <label htmlFor="proj-summary" className="block text-xs font-semibold text-zinc-700 mb-1.5">
              Short Summary
            </label>
            <textarea
              id="proj-summary"
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe what the project solves and key results..."
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAFA] border border-zinc-200 rounded-lg text-[#111113] placeholder:text-zinc-400 focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          {error && (
            <p role="alert" className="text-xs font-medium text-rose-600">
              {error}
            </p>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              Publish to Portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
