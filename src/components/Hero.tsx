import { ArrowRight, Mail } from 'lucide-react';
import { HERO_IMAGE, PROFILE, PROOF_METRICS } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

export function Hero() {
  return (
    <section id="home" className="pt-12 pb-16 lg:pt-20 lg:pb-20 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Professional Homepage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-sm font-medium text-zinc-500 mb-4">
                {PROFILE.title} <span aria-hidden="true">·</span> {PROFILE.location}
              </p>

              <h1
                className="font-display font-bold tracking-tight text-[#111113] leading-[1.06] mb-5"
                style={{
                  fontSize: 'clamp(2.35rem, 4.2vw, 3.85rem)',
                  textWrap: 'balance',
                }}
              >
                {PROFILE.fullName} — building reliable code, data &amp; visual systems.
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-[58ch] mb-4">
                {PROFILE.tagline}
              </p>

              <p className="text-xs sm:text-sm font-medium text-zinc-500 mb-8">
                Technical Interests: {PROFILE.interests}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                View Projects
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 py-2.5 text-sm font-semibold text-[#111113] hover:text-[#2563EB] transition-colors duration-150 whitespace-nowrap shrink-0 underline underline-offset-4 decoration-zinc-300 hover:decoration-[#2563EB] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] rounded-sm"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Contact Me
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[300px] lg:min-h-[440px] rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Samalex Kariuki software engineering and design workspace"
                title={PROFILE.fullName}
                className="w-full h-full object-cover lg:h-full"
              />
            </div>
          </div>
        </div>

        {/* Full-Width Proof Strip Below Hero Split */}
        <div className="mt-14 pt-10 border-t border-zinc-200 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {PROOF_METRICS.map((metric) => (
            <div key={metric.label}>
              <div className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111113] tabular-nums">
                {metric.value}
              </div>
              <div className="mt-1.5 text-sm font-semibold text-zinc-900">
                {metric.label}
              </div>
              <div className="mt-0.5 text-xs text-zinc-500">
                {metric.context}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Editorial Marquee Divider */}
      <div className="mt-14 border-t border-zinc-200/80 pt-5 overflow-hidden select-none" aria-hidden="true">
        <div className="animate-marquee text-xs font-medium tracking-wide text-zinc-400 whitespace-nowrap">
          <span className="mx-6">software engineering</span>
          <span>·</span>
          <span className="mx-6">full-stack web development</span>
          <span>·</span>
          <span className="mx-6">database management &amp; sql</span>
          <span>·</span>
          <span className="mx-6">python data analytics</span>
          <span>·</span>
          <span className="mx-6">flutter &amp; react native</span>
          <span>·</span>
          <span className="mx-6">photoshop ui/ux design</span>
          <span>·</span>
          <span className="mx-6">software engineering</span>
          <span>·</span>
          <span className="mx-6">full-stack web development</span>
          <span>·</span>
          <span className="mx-6">database management &amp; sql</span>
          <span>·</span>
          <span className="mx-6">python data analytics</span>
          <span>·</span>
          <span className="mx-6">flutter &amp; react native</span>
          <span>·</span>
          <span className="mx-6">photoshop ui/ux design</span>
          <span>·</span>
        </div>
      </div>
    </section>
  );
}
