// =============================================================
//  SINGLE SOURCE OF CONTENT
//  Edit values here to update the whole site.
// =============================================================

export const profile = {
  name: 'Harsh Karan',
  // rotating typewriter roles in the hero
  roles: ['Software Engineer', 'Problem Solver', 'Full Stack Developer'],
  // the vibe / headline tagline
  tagline:
    'Passionate about building features and adapting to new tech — for me, coding is a vibe. I turn ideas into fast, interactive, real-world products.',
  location: 'India',
  email: 'harshkaran163@gmail.com',
  resumeUrl: '/Harsh_Karan_Resume.pdf',
  // put your photo file in /public/assets/ and set the path here
  // e.g. '/assets/harsh.jpg'  — leave '' to show a styled placeholder
  photo: '/assets/harsh.webp',
}

export const socials = {
  linkedin: 'https://www.linkedin.com/in/harsh-karan-45961b228/',
  github: 'https://github.com/HarshKaran',
  leetcode: 'https://leetcode.com/u/HarshKaranIT/',
  gfg: 'https://www.geeksforgeeks.org/profile/harshkaran163',
}

export const about = {
  heading: 'About Me',
  paragraphs: [
    "I'm a Software Engineer who loves building full-stack products end to end — from interactive React front-ends to clean, performant backend APIs. I'm happiest when I'm shipping features, picking up a new tool, and turning a rough idea into something people actually use.",
    'Currently at MAQ Software, I build analytics dashboards, REST APIs, and AI-driven systems (RAG and multi-agent orchestration). I care about clean code, smooth UX, and solving hard problems — and I keep my problem-solving sharp with 600+ DSA problems across competitive platforms.',
  ],
  highlights: [
    { label: 'Experience', value: 2, suffix: '+ yrs' },
    { label: 'DSA Solved', value: 600, suffix: '+' },
    { label: 'Workflows Automated', value: 14, suffix: '' },
    { label: 'Certifications', value: 4, suffix: '' },
  ],
}

// skill groups — "level" (0–100) drives the animated progress bars
export const skills = [
  {
    category: 'Languages',
    items: [
      { name: 'TypeScript', level: 90 },
      { name: 'JavaScript', level: 92 },
      { name: 'Python', level: 85 },
      { name: 'SQL', level: 82 },
      { name: 'C++', level: 75 },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React', level: 92 },
      { name: 'Redux', level: 82 },
      { name: 'Three.js', level: 70 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Recharts / Chart.js', level: 85 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js / Express', level: 88 },
      { name: 'Python (FastAPI)', level: 85 },
      { name: 'REST APIs', level: 90 },
      { name: 'MongoDB', level: 80 },
      { name: 'SQL (MySQL, SQL Server)', level: 83 },
    ],
  },
  {
    category: 'AI & DevOps',
    items: [
      { name: 'RAG / LLM Integration', level: 85 },
      { name: 'Multi-Agent Orchestration', level: 80 },
      { name: 'Azure / Azure DevOps', level: 78 },
      { name: 'CI/CD', level: 80 },
      { name: 'Git / GitHub', level: 90 },
    ],
  },
]

export const experience = [
  {
    role: 'Software Engineer 1',
    company: 'MAQ Software',
    period: 'Jan 2025 — Present',
    points: [
      'Built full-stack analytics interfaces with React, TypeScript & Node.js — interactive BI dashboards (Recharts, Chart.js) for real-time usage monitoring and decision support.',
      'Developed REST APIs in Python (FastAPI) and Node.js/Express, improving analytics throughput by ~40% via optimized queries and response caching.',
      'Shipped a production-grade RAG solution and an AI multi-agent orchestration framework, delivering 13.6 hrs/week of savings across 14 production workflows.',
      'Engineered an automated validation framework (React, Node.js, Playwright) cutting manual report validation from 3 hours to 30–45 minutes.',
    ],
    tags: ['React', 'TypeScript', 'FastAPI', 'Node.js', 'RAG', 'Azure'],
  },
  {
    role: 'Software Engineer',
    company: 'MediaTek',
    period: 'May 2024 — Dec 2024',
    points: [
      'Developed responsive components with React.js, Tailwind CSS & JavaScript for internal tooling and platform enhancements.',
      'Created dashboards for MediaTek Dimensity 9400 and Imagiq systems, improving visualization and debugging accuracy.',
      'Engineered a 360° virtual-tour platform for scene uploading, rendering, and cross-chipset optimization.',
    ],
    tags: ['React', 'Tailwind CSS', 'JavaScript', 'Dashboards'],
  },
]

export const projects = [
  {
    title: 'Sandesha',
    description:
      'A full-stack real-time communication platform — chat, posts, audio/video calling, and presence indicators. Built for a responsive, user-focused experience.',
    tags: ['React', 'Node.js', 'Socket.IO', 'WebRTC', 'Redis', 'MongoDB'],
    live: '',
    source: 'https://github.com/HarshKaran/Sandesha',
    featured: true,
  },
  {
    title: 'LinkedIn Lead Extractor & Cold Mail Automation',
    description:
      'Finds HR contacts on LinkedIn, reveals their emails, and automates cold outreach — leads go to Supabase and Google Sheets for mail merge, with LLM-drafted emails from your resume.',
    tags: ['Playwright', 'Supabase', 'Google Sheets API', 'Gemini', 'Groq'],
    live: '',
    source: 'https://github.com/HarshKaran/Cold-Mail-Automation',
    featured: true,
  },
  {
    title: 'AI Multi-Agent Orchestration',
    description:
      'An AI-driven multi-agent framework that automates complex business and DevOps workflows across enterprise platforms — 13.6 hrs/week saved across 14 workflows.',
    tags: ['Agentic AI', 'RAG', 'Node.js', 'LLM'],
    live: '',
    source: '',
    featured: true,
  },
  {
    title: 'Automated Report Validation',
    description:
      'A validation framework running sanity checks across 90-page reports and auto-publishing consolidated HTML reports to Teams — cut validation time by ~80%.',
    tags: ['React', 'Node.js', 'Playwright'],
    live: '',
    source: '',
    featured: false,
  },
]

// education + certifications/achievements for the About / Experience area
export const education = {
  school: 'Bundelkhand Institute of Engineering and Technology, Jhansi',
  degree: 'B.Tech in Information Technology',
  detail: 'CGPA: 7.67',
  period: '2020 — 2024',
}

export const achievements = [
  'Global Rank 58 — CodeChef December Long Challenge 2022 (Div-3)',
  'Solved 600+ coding problems across LeetCode, GeeksforGeeks & CodeStudio',
  'Microsoft Certified: DP-600, DP-700, DP-800, AI-103',
]
