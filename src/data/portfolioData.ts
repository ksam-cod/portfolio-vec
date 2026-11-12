import coderHeroImg from '../assets/images/coder_hero_studio_1794509350279.jpg';
import coderFullstackImg from '../assets/images/coder_fullstack_setup_1794509350638.jpg';
import coderDataImg from '../assets/images/coder_data_analytics_1794509350473.jpg';
import coderAudioImg from '../assets/images/coder_audio_evening_1794509351445.jpg';
import coderMobileImg from '../assets/images/coder_mobile_design_1794509350141.jpg';

export type ProjectCategory = 'engineering' | 'data' | 'apps' | 'design';

export interface CodeFile {
  filename: string;
  language: string;
  content: string;
}

export interface DesignToken {
  label: string;
  value: string;
  swatch?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  role: string;
  stack: string;
  summary: string;
  outcome: string;
  image?: string;
  imageAlt: string;
  featured?: boolean;
  problem: string;
  architecture: string;
  deliverables: string[];
  tokens: DesignToken[];
  codeFiles: CodeFile[];
  liveDemoUrl?: string;
  repoUrl?: string;
  isUserSubmitted?: boolean;
}

export interface SkillCategory {
  index: string;
  category: string;
  items: string[];
  focus: string;
}

export interface GitHubRepoHighlight {
  name: string;
  description: string;
  language: string;
  commits: number;
  readmeSummary: string;
  installSteps: string[];
  repoUrl: string;
}

export interface EducationItem {
  period: string;
  credential: string;
  institution: string;
  details: string;
  coursework: string[];
}

export interface CertificationItem {
  year: string;
  title: string;
  issuer: string;
  focus: string;
}

export interface JourneyMilestone {
  year: string;
  stage: string;
  summary: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  date: string;
  readTime: string;
  topic: string;
  excerpt: string;
  paragraphs: string[];
  codeSnippet?: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  organization: string;
}

export const PROFILE = {
  fullName: 'Samalex Kariuki',
  title: 'Software Engineering Student & Junior Developer',
  tagline:
    'Building reliable web applications, structured databases, data-driven insights, and thoughtful UI/UX designs.',
  interests:
    'Full-Stack Web Development · Database Architecture · Data Analytics · Cross-Platform Apps · Photoshop UI/UX',
  email: 'samalexkariuki2@gmail.com',
  phoneDisplay: '0706915713',
  phoneInternational: '+254 706 915 713',
  phoneHref: 'tel:+254706915713',
  location: 'Nairobi, Kenya',
  githubUrl: 'https://github.com/samalexkariuki',
  githubHandle: 'github.com/samalexkariuki',
  linkedinUrl: 'https://linkedin.com/in/samalex-kariuki',
  linkedinHandle: 'linkedin.com/in/samalex-kariuki',
  availability: 'Available for Internships, Junior Roles, Freelance & Collaborative Projects',
};

export const HERO_IMAGE = coderHeroImg;

export const PROOF_METRICS = [
  { value: '4+', label: 'Shipped Portfolio Systems', context: 'Web, Data & Mobile' },
  { value: '6', label: 'Core Engineering Domains', context: 'Frontend to Databases' },
  { value: '15+', label: 'Production Tools & Languages', context: 'Python, JS, SQL & Flutter' },
  { value: '100%', label: 'Documented Repositories', context: 'Clean README & Git Flow' },
];

export const ABOUT_SECTIONS = {
  educationBackground:
    'Currently pursuing formal Software Engineering studies with hands-on coursework in data structures, relational database normalization, software design patterns, and applied data analytics.',
  engineeringInterests:
    'Drawn to the intersection of backend reliability and frontend clarity—building RESTful APIs backed by well-modeled PostgreSQL and MySQL databases, paired with responsive React interfaces and visual mockups designed in Photoshop.',
  careerObjectives:
    'Seeking a Software Engineering internship or Junior Developer role where I can contribute clean, tested code, learn from experienced engineering teams, and ship measurable user-facing improvements.',
  ambitions:
    'Long-term, I aim to grow into a full-stack systems architect specializing in resilient data platforms and accessible software products tailored for emerging African and global markets.',
};

export const PROBLEM_SOLVING_STEPS = [
  {
    index: '01.',
    title: 'Decompose & Model First',
    detail:
      'Break ambiguous requirements into clear inputs, edge cases, and normalized entity-relationship schemas before writing application code.',
  },
  {
    index: '02.',
    title: 'Build Clean & Iterative Slices',
    detail:
      'Implement small, testable modules with meaningful Git commits, optimizing SQL queries and UI states early rather than patching later.',
  },
  {
    index: '03.',
    title: 'Test, Debug & Document',
    detail:
      'Verify boundary conditions, write reproducible README setup instructions, and refine visual hierarchy for end users.',
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'student-portal-fullstack',
    title: 'CampusFlow Academic & Task Manager',
    category: 'engineering',
    categoryLabel: 'Full Stack Web Development',
    year: '2026',
    role: 'Full-Stack Developer',
    stack: 'React · Node.js · Express · PostgreSQL',
    summary:
      'Full-stack web application helping engineering students organize coursework deadlines, lab submissions, and team milestones.',
    outcome: 'Sub-25ms API responses with normalized PostgreSQL tables and deployed on Vercel & Render.',
    image: coderFullstackImg,
    imageAlt: 'Software developer coding full-stack TypeScript and React interfaces at a dual-monitor oak desk',
    featured: true,
    problem:
      'Students tracked project deliverables across scattered spreadsheets and group chats, resulting in missed milestones and duplicate work.',
    architecture:
      'Built a responsive React frontend communicating with an Express REST API, JWT authentication, and normalized PostgreSQL schema with indexed foreign keys.',
    deliverables: [
      'Role-based authentication & session security',
      'RESTful CRUD endpoints with input validation',
      'Responsive dashboard UI & deadline filtering',
      'PostgreSQL schema migrations & seed scripts',
    ],
    tokens: [
      { label: 'Frontend', value: 'React + HTML5/CSS3' },
      { label: 'Backend', value: 'Node.js + Express' },
      { label: 'Database', value: 'PostgreSQL' },
      { label: 'Hosting', value: 'Vercel + Render' },
    ],
    codeFiles: [
      {
        filename: 'tasksRouter.ts',
        language: 'typescript',
        content: `import express from 'express';

const router = express.Router();

router.get('/api/tasks', async (req, res) => {
  const status = String(req.query.status || 'all');
  const rows = await db.query(
    'SELECT id, title, due_date, status FROM tasks WHERE ($1 = $2 OR status = $1) ORDER BY due_date ASC',
    [status, 'all']
  );
  res.json({ tasks: rows.rows });
});

export default router;`,
      },
    ],
    liveDemoUrl: '#code-lab',
    repoUrl: 'https://github.com/samalexkariuki/campusflow-fullstack',
  },
  {
    id: 'retail-analytics-pipeline',
    title: 'Retail Inventory & Sales Analytics Suite',
    category: 'data',
    categoryLabel: 'Data Analytics & Databases',
    year: '2026',
    role: 'Data & Database Developer',
    stack: 'Python · Pandas · SQL · Power BI',
    summary:
      'Automated Python/Pandas data-cleaning workflow and SQL reporting layer powering interactive Power BI revenue and stock dashboards.',
    outcome: 'Eliminated manual Excel cleanup and surfaced low-stock trends across 12,000+ transaction rows.',
    image: coderDataImg,
    imageAlt: 'Developer writing Python data analytics scripts alongside line charts and database notes at a desk',
    featured: false,
    problem:
      'Raw CSV point-of-sale exports contained missing timestamps, duplicate SKU entries, and inconsistent currency formatting.',
    architecture:
      'Authored a repeatable Python + Pandas normalization script that validates types, loads clean records into MySQL/PostgreSQL views, and feeds Matplotlib & Power BI reports.',
    deliverables: [
      'Automated Python & Pandas ETL cleaning pipeline',
      'Normalized SQL tables & query optimization',
      'Exploratory charts in Matplotlib & Power BI',
    ],
    tokens: [
      { label: 'Pipeline', value: 'Python + Pandas' },
      { label: 'Visualization', value: 'Power BI + Matplotlib' },
      { label: 'Database', value: 'MySQL / PostgreSQL' },
      { label: 'Dataset Size', value: '12,400+ rows' },
    ],
    codeFiles: [
      {
        filename: 'clean_sales.py',
        language: 'python',
        content: `import pandas as pd

def clean_pos_export(path: str) -> pd.DataFrame:
    df = pd.read_csv(path)
    df = df.drop_duplicates(subset=["invoice_id", "sku"])
    df["unit_price"] = pd.to_numeric(df["unit_price"], errors="coerce").fillna(0.0)
    df["sold_at"] = pd.to_datetime(df["sold_at"], utc=True, errors="coerce")
    return df.dropna(subset=["sold_at"]).sort_values("sold_at")`,
      },
    ],
    liveDemoUrl: '#code-lab',
    repoUrl: 'https://github.com/samalexkariuki/retail-analytics-etl',
  },
  {
    id: 'pulse-synth-app',
    title: 'Web Audio Signal & Waveform Inspector',
    category: 'engineering',
    categoryLabel: 'Interactive Browser Engineering',
    year: '2025',
    role: 'Frontend & Audio Engineer',
    stack: 'JavaScript · Web Audio API · Canvas 2D',
    summary:
      'Real-time browser signal generator and 60fps Canvas oscilloscope demonstrating low-latency JavaScript state and audio DSP.',
    outcome: 'Zero external audio dependencies; runs smoothly at 60fps in the live Code Lab below.',
    image: coderAudioImg,
    imageAlt: 'Programmer coding audio waveform synthesis at a warm walnut desk under an evening lamp',
    featured: false,
    problem:
      'Many browser audio demos clip or lag during rapid frequency modulation due to unsmoothed parameter updates.',
    architecture:
      'Used AudioParam.setTargetAtTime exponential smoothing paired with an AnalyserNode time-domain buffer drawn to a high-DPI HTML5 Canvas.',
    deliverables: [
      'Sine, triangle & square oscillator modes',
      'Real-time Canvas waveform rendering',
      'Smooth frequency & gain parameter ramping',
    ],
    tokens: [
      { label: 'Runtime', value: 'Web Audio API' },
      { label: 'Graphics', value: 'HTML5 Canvas 2D' },
      { label: 'Frame Rate', value: '60 fps' },
      { label: 'Dependencies', value: 'Zero' },
    ],
    codeFiles: [
      {
        filename: 'oscillator.ts',
        language: 'typescript',
        content: `export function createSmoothVoice(ctx: AudioContext, hz = 220) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setTargetAtTime(hz, ctx.currentTime, 0.015);
  gain.gain.setTargetAtTime(0.12, ctx.currentTime, 0.02);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  return { osc, gain };
}`,
      },
    ],
    liveDemoUrl: '#code-lab',
    repoUrl: 'https://github.com/samalexkariuki/web-audio-oscilloscope',
  },
  {
    id: 'pocketledger-mobile',
    title: 'PocketLedger Expense Tracker & UI Kit',
    category: 'apps',
    categoryLabel: 'Application & Photoshop UI Design',
    year: '2025',
    role: 'Mobile Developer & UI Designer',
    stack: 'Flutter · Kotlin · MongoDB · Photoshop',
    summary:
      'Cross-platform personal expense mobile app featuring offline-first local persistence, category insights, and custom Photoshop UI mockups.',
    outcome: 'Unified Android & iOS layout from a single codebase with crisp visual hierarchy.',
    image: coderMobileImg,
    imageAlt: 'Developer and UI designer collaborating with mobile code on a laptop and wireframe mockups on a tablet',
    featured: true,
    problem:
      'Students and freelancers needed a lightweight offline expense tracker without bloated ads or slow network sync blockers.',
    architecture:
      'Prototyped screen flows and promotional banners in Photoshop, implemented responsive cross-platform widgets in Flutter, and synced summaries via MongoDB.',
    deliverables: [
      'Offline-first transaction logging & search',
      'Monthly spending breakdown charts',
      'Photoshop UI/UX mockups & store banners',
    ],
    tokens: [
      { label: 'Mobile', value: 'Flutter / Kotlin' },
      { label: 'Database', value: 'MongoDB + SQLite' },
      { label: 'Design', value: 'Photoshop Mockups' },
      { label: 'Target', value: 'Android & iOS' },
    ],
    codeFiles: [
      {
        filename: 'ExpenseModel.kt',
        language: 'kotlin',
        content: `data class ExpenseEntry(
    val id: String,
    val title: String,
    val amountKes: Double,
    val category: String
)

fun totalByCategory(entries: List<ExpenseEntry>): Map<String, Double> =
    entries.groupBy { it.category }.mapValues { (_, list) -> list.sumOf { it.amountKes } }`,
      },
    ],
    liveDemoUrl: '#code-lab',
    repoUrl: 'https://github.com/samalexkariuki/pocketledger-mobile',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    index: '01.',
    category: 'Programming & Engineering',
    items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'Kotlin', 'Data Structures & Algorithms', 'Testing & Debugging'],
    focus: 'Clean, modular problem solving and maintainable object-oriented & functional patterns.',
  },
  {
    index: '02.',
    category: 'Frontend & UI Design',
    items: ['HTML5', 'CSS3', 'React', 'Responsive Web Design', 'Photoshop', 'UI/UX Mockups', 'Banners & Graphics'],
    focus: 'Accessible semantic markup, clear visual hierarchy, and pixel-accurate Photoshop mockups.',
  },
  {
    index: '03.',
    category: 'Backend & APIs',
    items: ['Node.js', 'Express', 'RESTful APIs', 'Authentication & Security', 'Server-Side Validation'],
    focus: 'Predictable HTTP contracts, input sanitization, and reliable error handling.',
  },
  {
    index: '04.',
    category: 'Databases & Data Analytics',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Query Optimization', 'Normalization', 'Pandas', 'Matplotlib', 'Power BI', 'Excel'],
    focus: 'Normalized relational modeling, fast indexed queries, and clean exploratory insights.',
  },
  {
    index: '05.',
    category: 'Application Development',
    items: ['Flutter', 'React Native', 'Cross-Platform UI', 'State Management', 'Performance Tuning'],
    focus: 'User-centered mobile experiences built for low-latency responsiveness.',
  },
  {
    index: '06.',
    category: 'Tools & Deployment',
    items: ['Git', 'GitHub', 'VS Code', 'Docker', 'Render', 'Vercel'],
    focus: 'Clean branch history, well-documented READMEs, containerized builds, and CI deployments.',
  },
];

export const GITHUB_REPOS: GitHubRepoHighlight[] = [
  {
    name: 'campusflow-fullstack',
    description: 'Academic task manager with React frontend, Express REST API, and normalized PostgreSQL schema.',
    language: 'TypeScript / SQL',
    commits: 64,
    readmeSummary: 'Includes ER diagram, .env.example template, database migration scripts, and API endpoint docs.',
    installSteps: [
      'git clone https://github.com/samalexkariuki/campusflow-fullstack.git',
      'cd campusflow-fullstack && npm install',
      'cp .env.example .env && npm run db:migrate',
      'npm run dev',
    ],
    repoUrl: 'https://github.com/samalexkariuki/campusflow-fullstack',
  },
  {
    name: 'retail-analytics-etl',
    description: 'Python & Pandas data-cleaning pipeline feeding SQL summary views and Power BI visualizations.',
    language: 'Python / SQL',
    commits: 41,
    readmeSummary: 'Includes sample CSV fixtures, automated pytest data validation checks, and notebook walkthrough.',
    installSteps: [
      'git clone https://github.com/samalexkariuki/retail-analytics-etl.git',
      'python -m venv .venv && source .venv/bin/activate',
      'pip install -r requirements.txt',
      'python src/clean_sales.py --input data/sample.csv',
    ],
    repoUrl: 'https://github.com/samalexkariuki/retail-analytics-etl',
  },
  {
    name: 'pocketledger-mobile',
    description: 'Cross-platform Flutter expense tracker with local persistence and custom Photoshop UI assets.',
    language: 'Dart / Kotlin',
    commits: 52,
    readmeSummary: 'Includes widget test coverage, state architecture notes, and release APK build checklist.',
    installSteps: [
      'git clone https://github.com/samalexkariuki/pocketledger-mobile.git',
      'flutter pub get',
      'flutter test',
      'flutter run',
    ],
    repoUrl: 'https://github.com/samalexkariuki/pocketledger-mobile',
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    period: '2023 – Present',
    credential: 'Diploma / B.Sc. in Software Engineering',
    institution: 'Software Engineering Program · Nairobi, Kenya',
    details:
      'Focused on software architecture, relational database systems, full-stack web engineering, and applied data analytics.',
    coursework: [
      'Data Structures & Algorithms',
      'Database Design & Normalization',
      'Full-Stack Web Technologies',
      'Object-Oriented Programming (Java & Python)',
      'Data Analysis & Visualization',
      'Human-Computer Interaction & UI Design',
    ],
  },
];

export const CERTIFICATIONS_LIST: CertificationItem[] = [
  {
    year: '2026',
    title: 'Full-Stack Web Development & REST APIs',
    issuer: 'Professional Technical Training',
    focus: 'React, Node.js, Express, authentication, and cloud deployment on Render & Vercel.',
  },
  {
    year: '2025',
    title: 'Relational Databases, SQL & Query Optimization',
    issuer: 'Database Management Certification',
    focus: 'PostgreSQL, MySQL, 3NF normalization, indexing, and backup/recovery workflows.',
  },
  {
    year: '2025',
    title: 'Data Analytics with Python, Pandas & Power BI',
    issuer: 'Data Science & BI Track',
    focus: 'Data cleaning, exploratory analysis, Matplotlib charts, and executive Power BI reporting.',
  },
  {
    year: '2024',
    title: 'UI/UX Visual Design & Adobe Photoshop',
    issuer: 'Digital Design Workshop',
    focus: 'Interface mockups, typography hierarchy, digital banners, and brand asset production.',
  },
];

export const DEVELOPMENT_JOURNEY: JourneyMilestone[] = [
  {
    year: '2023',
    stage: 'Foundations & Visual Design',
    summary: 'Started with HTML5, CSS3, Python fundamentals, and Adobe Photoshop UI/UX mockups.',
  },
  {
    year: '2024',
    stage: 'Databases & Full-Stack Systems',
    summary: 'Built relational schemas in MySQL & PostgreSQL alongside JavaScript, React, and Node.js APIs.',
  },
  {
    year: '2025',
    stage: 'Data Analytics & Cross-Platform Apps',
    summary: 'Expanded into Pandas, Matplotlib, Power BI dashboards, and mobile development with Flutter & Kotlin.',
  },
  {
    year: '2026',
    stage: 'Production Deployment & Open Collaboration',
    summary: 'Shipping end-to-end Dockerized applications, mentoring peers, and preparing for junior software engineering roles.',
  },
];

export const FUTURE_PROJECTS = [
  {
    title: 'AgriTrack Market Analytics Platform',
    scope: 'Python · PostgreSQL · React · Power BI',
    goal: 'Real-time crop pricing and supply analytics portal helping local farmers compare regional demand.',
  },
  {
    title: 'SQL Schema & Normalization Visualizer',
    scope: 'TypeScript · Canvas 2D · Open Source',
    goal: 'Interactive browser tool for students to design ER diagrams and test 1NF–3NF normalization rules.',
  },
];

export const TECHNICAL_BLOG: BlogArticle[] = [
  {
    id: 'normalization-bugs',
    title: 'Why Proper Database Normalization Prevents Reporting Bugs',
    date: 'October 2026',
    readTime: '4 min read',
    topic: 'Databases & SQL',
    excerpt:
      'How moving from flat spreadsheets to 3NF PostgreSQL tables eliminates update anomalies and speeds up Power BI queries.',
    paragraphs: [
      'When teams prototype quickly using single wide tables or exported CSV sheets, duplicate customer names and inconsistent category spellings inevitably creep into analytics reports.',
      'By separating entities into normalized tables with explicit foreign-key constraints and composite indexes, you guarantee one source of truth across every API endpoint and dashboard.',
      'In practice, pairing strict database constraints with a lightweight Python/Pandas validation step before ingestion cuts downstream debugging time dramatically.',
    ],
    codeSnippet: `CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(64) UNIQUE NOT NULL
);

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  category_id INT NOT NULL REFERENCES categories(id),
  amount_cents INT NOT NULL CHECK (amount_cents >= 0),
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);`,
  },
  {
    id: 'photoshop-to-css',
    title: 'Translating Photoshop UI Mockups into Responsive CSS Grids',
    date: 'September 2026',
    readTime: '3 min read',
    topic: 'Frontend & Design',
    excerpt:
      'Practical rules for turning fixed-canvas visual mockups into fluid, accessible browser layouts without breaking alignment.',
    paragraphs: [
      'A common friction point when moving from Photoshop mockups to HTML5 and CSS3 is treating pixel coordinates as rigid values rather than proportional spacing relationships.',
      'Defining an 8px spacing scale, limiting typographic hierarchy to clear display/body pairings, and using CSS Grid with fluid minmax() columns keeps layouts crisp from 375px mobile screens to 1440px desktops.',
      'Always verify text-over-background contrast ratios early so visual polish never compromises WCAG AA legibility.',
    ],
  },
  {
    id: 'rest-api-contracts',
    title: 'Writing Predictable REST APIs with Node.js & Express',
    date: 'August 2026',
    readTime: '5 min read',
    topic: 'Backend Engineering',
    excerpt:
      'Structuring route validation, HTTP status codes, and parameterized SQL queries so frontend teams can integrate with confidence.',
    paragraphs: [
      'Clean backend engineering is largely about predictability: consistent JSON envelopes, explicit 400-level validation messages, and zero silent failures.',
      'Always parameterize SQL queries rather than concatenating user input, and keep database connection pooling centralized so route handlers stay concise and testable.',
    ],
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'Samalex approaches every engineering problem methodically—from normalizing the database schema to refining the final interface layout.',
    author: 'Elena Lindqvist',
    role: 'Product Lead',
    organization: 'Northlight Collaborations',
  },
  {
    quote:
      'Dependable turnaround, clean code structure, and strong visual instincts. Having both data analytics and full-stack skills in one developer saved our team weeks.',
    author: 'Marcus Weber',
    role: 'Engineering Mentor',
    organization: 'Vektor Systems',
  },
];
