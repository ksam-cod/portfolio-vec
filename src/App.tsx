import { useState } from 'react';
import { PortfolioProject } from './data/portfolioData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectShowcase } from './components/ProjectShowcase';
import { CodeLabSection } from './components/CodeLabSection';
import { SkillsAndGithub } from './components/SkillsAndGithub';
import { EducationAndJournal } from './components/EducationAndJournal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111113]">
      <Header onContactClick={() => scrollToSection('contact')} />

      <main className="flex-1">
        <Hero />
        <AboutSection />
        <ProjectShowcase onSelectProject={setSelectedProject} />
        <CodeLabSection />
        <SkillsAndGithub />
        <EducationAndJournal />
        <ContactSection />
      </main>

      <Footer />

      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenCodeLab={() => scrollToSection('code-lab')}
      />
    </div>
  );
}
