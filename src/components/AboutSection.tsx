import { ABOUT_SECTIONS, PROBLEM_SOLVING_STEPS } from '../data/portfolioData';

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Professional Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111113]"
                style={{ textWrap: 'balance' }}
              >
                About Me
              </h2>
              <p className="mt-3 text-base text-zinc-600 max-w-2xl">
                Software Engineering student and junior developer focused on turning real-world requirements into clean code, normalized databases, and clear user interfaces.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
              <div className="pt-5 border-t border-zinc-200">
                <h3 className="font-display text-base font-bold text-[#111113] mb-2">
                  Educational Background
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {ABOUT_SECTIONS.educationBackground}
                </p>
              </div>

              <div className="pt-5 border-t border-zinc-200">
                <h3 className="font-display text-base font-bold text-[#111113] mb-2">
                  Engineering Interests
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {ABOUT_SECTIONS.engineeringInterests}
                </p>
              </div>

              <div className="pt-5 border-t border-zinc-200">
                <h3 className="font-display text-base font-bold text-[#111113] mb-2">
                  Career Objectives
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {ABOUT_SECTIONS.careerObjectives}
                </p>
              </div>

              <div className="pt-5 border-t border-zinc-200">
                <h3 className="font-display text-base font-bold text-[#111113] mb-2">
                  Professional Ambitions
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {ABOUT_SECTIONS.ambitions}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Approach to Problem Solving */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#FAFAFA] border border-zinc-200">
            <h3 className="font-display text-xl font-bold tracking-tight text-[#111113] mb-2">
              Problem-Solving Approach
            </h3>
            <p className="text-sm text-zinc-600 mb-6">
              How I break down ambiguous engineering challenges from specification to deployment.
            </p>

            <div className="space-y-6">
              {PROBLEM_SOLVING_STEPS.map((step) => (
                <div key={step.index} className="pt-5 border-t border-zinc-200 first:border-t-0 first:pt-0">
                  <div className="font-mono text-xs font-medium text-[#2563EB] mb-1 tabular-nums">
                    {step.index}
                  </div>
                  <h4 className="font-display text-base font-bold text-[#111113]">
                    {step.title}
                  </h4>
                  <p className="mt-1.5 text-sm text-zinc-600 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
