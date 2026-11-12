import { Download } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-xs text-zinc-500">
        <div className="space-y-1.5">
          <div>
            <span className="font-display font-semibold text-[#111113]">
              {PROFILE.fullName}
            </span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{PROFILE.title}</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>{PROFILE.location}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href={`mailto:${PROFILE.email}`} className="hover:text-[#111113] transition-colors">
              {PROFILE.email}
            </a>
            <span aria-hidden="true">·</span>
            <a href={PROFILE.phoneHref} className="hover:text-[#111113] transition-colors tabular-nums">
              Tel: {PROFILE.phoneDisplay} ({PROFILE.phoneInternational})
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="./downloads/samalex-kariuki-portfolio-static.zip"
              download="samalex-kariuki-portfolio-static.zip"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-medium text-[#111113] bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
              Static Build (.zip)
            </a>
            <a
              href="./downloads/samalex-kariuki-portfolio-source.zip"
              download="samalex-kariuki-portfolio-source.zip"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-medium text-zinc-700 border border-zinc-200 hover:border-zinc-300 rounded-md transition-colors whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              Source Code (.zip)
            </a>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-5">
            <a href="#about" className="hover:text-[#111113] transition-colors whitespace-nowrap">
              About
            </a>
            <a href="#projects" className="hover:text-[#111113] transition-colors whitespace-nowrap">
              Projects
            </a>
            <a href="#skills" className="hover:text-[#111113] transition-colors whitespace-nowrap">
              Skills
            </a>
            <a href="#github" className="hover:text-[#111113] transition-colors whitespace-nowrap">
              GitHub
            </a>
            <a href="#education" className="hover:text-[#111113] transition-colors whitespace-nowrap">
              Education
            </a>
            <a href="#contact" className="hover:text-[#111113] transition-colors whitespace-nowrap">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
