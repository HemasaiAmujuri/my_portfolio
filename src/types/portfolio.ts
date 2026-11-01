export interface SocialLink {
  name: string;
  url: string;
  iconName: string;
  handle?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  summary?: string;
  highlights: string[];
  techStack: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  liveUrl?: string;
  repoUrl?: string;
  techStack: string[];
  summary: string;
  keyContributions: string[];
  featuredBadge?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  badge?: string;
  type?: 'core' | 'wing' | 'foundation';
  skills: {
    name: string;
    level?: string;
    isPrimary?: boolean;
  }[];
}

export interface AchievementItem {
  id: string;
  metric: string;
  label: string;
  description: string;
  category: 'performance' | 'security' | 'cloud' | 'architecture' | 'ai';
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  gradeType: 'percentage' | 'gpa';
}

export interface PortfolioData {
  personalInfo: {
    fullName: string;
    shortName: string;
    title: string;
    subtitle: string;
    profileSummary: string;
    email: string;
    phone: string;
    formattedPhone: string;
    location: string;
    resumePath: string;
    resumeFileName: string;
    githubUrl: string;
    linkedinUrl: string;
    yearsOfExperience: string;
    tShape?: {
      coreTitle: string;
      coreSubtitle: string;
      coreSkills: string[];
      cloudTitle: string;
      cloudSubtitle: string;
      cloudSkills: string[];
      aiTitle: string;
      aiSubtitle: string;
      aiSkills: string[];
    };
  };
  keyStats: {
    label: string;
    value: string;
    subtext: string;
  }[];
  skillsCategories: SkillCategory[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  achievements: AchievementItem[];
  rolesAndResponsibilities: string[];
  education: EducationItem[];
}
