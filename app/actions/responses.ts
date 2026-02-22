"use server";

import { QuestionCategory } from "./categorize";
import { getGitHubProfile } from "./github";

interface ResponseData {
  text: string;
  links?: Array<{ label: string; url: string }>;
  image?: string;
  githubProfile?: any;
  showBusinessCard?: boolean;
  businessCard?: {
    name: string;
    role: string;
    email: string;
    location: string;
    socials: Array<{ label: string; url: string; icon?: string }>;
  };
}

export async function getResponseByCategory(
  category: QuestionCategory,
  originalQuestion: string,
): Promise<ResponseData> {
  switch (category) {
    case "skills":
      return {
        text: `I have expertise in various technologies across the full stack:\n\n**Frontend:** React, Next.js, TypeScript, Tailwind CSS, Framer Motion\n\n**Backend:** Node.js, Express, PostgreSQL, MongoDB\n\n**DevOps:** Docker, AWS, GitHub Actions\n\n**Design:** Figma, UI/UX Design\n\nI'm passionate about building modern web applications and integrating AI into solutions!`,
        links: [
          { label: "GitHub", url: "https://github.com/GwFirman" },
          { label: "LinkedIn", url: "https://linkedin.com" },
        ],
      };

    case "experience":
      return {
        text: `Here's my professional experience:\n\n**Web Developer Intern** @ CV Prabu Bima Tech (2025-2026)\n- Currently working on web development projects\n- Implementing modern web technologies\n\n**Mobile Developer Intern** @ PT Nemolab Nusa Infomedia (2021-2022)\n- Developed mobile applications\n- Gained experience in mobile development frameworks`,
        links: [
          { label: "LinkedIn Profile", url: "https://linkedin.com" },
          { label: "GitHub", url: "https://github.com/GwFirman" },
        ],
      };

    case "projects":
      // Check if asking about specific project
      const projectLower = originalQuestion.toLowerCase();

      if (projectLower.includes("daunesia") || projectLower.includes("best")) {
        return {
          text: `**Daunesia** is my flagship project!\n\nA revolutionary plant care application featuring:\n- 🌿 AI-based disease detection\n- 💧 Smart watering schedules\n- 👥 Community forum for plant enthusiasts\n- 📱 Mobile app with React Native\n\nBuilt with Next.js, Python/TensorFlow for AI, and modern web technologies.`,
          image: "/images/projects/daunesia.png",
          links: [
            { label: "View Project", url: "https://github.com/GwFirman" },
            { label: "GitHub", url: "https://github.com/GwFirman" },
          ],
        };
      }

      return {
        text: `I've worked on several exciting projects:\n\n**🌿 Daunesia** - Plant care app with AI disease detection\n\n**✨ Cetha** - Innovative web application\n\n**🚀 Aither Way** - Creative web solution\n\n**🎨 Arunika** - Modern web development project\n\nEach project showcases different aspects of full-stack development and modern web technologies!`,
        links: [
          { label: "View All Projects", url: "https://github.com/GwFirman" },
          { label: "GitHub", url: "https://github.com/GwFirman" },
        ],
      };

    case "achievements":
      return {
        text: `I'm proud of these achievements:\n\n🥈 **2nd Place** - Web Development National Competition UINIC 7.0 2025\n\n🥈 **2nd Place** - Software Engineering Competition 2025\n\n🏆 **Top 10 Finalist** - ProxCoris International Web Development Competition\n\nThese competitions have helped me grow as a developer and showcase my skills on national and international stages!`,
        links: [
          { label: "LinkedIn", url: "https://linkedin.com" },
          { label: "Portfolio", url: "https://github.com/GwFirman" },
        ],
      };

    case "github":
      const githubData = await getGitHubProfile();

      if (githubData.success && githubData.data) {
        return {
          text: `Here's my GitHub profile! I'm actively contributing to open source and building projects.\n\n📊 **${githubData.data.repos}** public repositories\n👥 **${githubData.data.followers}** followers\n⏱️ **${githubData.data.accountAge}+ years** on GitHub\n\nCheck out my latest contributions and projects!`,
          githubProfile: githubData.data,
          links: [{ label: "Visit GitHub", url: githubData.data.profileUrl }],
        };
      }

      return {
        text: `You can find all my code and projects on GitHub! I regularly contribute to open source and share my work.\n\nFeel free to check out my repositories and contributions.`,
        links: [
          { label: "GitHub Profile", url: "https://github.com/GwFirman" },
        ],
      };

    case "contact":
      return {
        text: `Feel free to reach out! I'm always open to interesting conversations and opportunities.\n\n📧 Contact me through:\n- GitHub: @GwFirman\n- LinkedIn: Professional inquiries\n- Portfolio: Browse my work\n\nLooking forward to connecting with you! 🚀`,
        links: [
          { label: "GitHub", url: "https://github.com/GwFirman" },
          { label: "LinkedIn", url: "https://linkedin.com" },
          { label: "Portfolio", url: "https://github.com" },
        ],
      };

    case "general":
      return {
        text: `Hi! I'm **Firman Aziz**, a passionate web developer who loves building modern web applications and integrating AI.\n\n👨‍💻 I specialize in full-stack development with React, Next.js, and modern web technologies.\n\n🎯 I've competed in national and international competitions, winning multiple awards.\n\n🚀 Currently working as a Web Developer Intern at CV Prabu Bima Tech.\n\nFeel free to ask me about my skills, projects, or experience!`,
        links: [
          { label: "GitHub", url: "https://github.com/GwFirman" },
          { label: "LinkedIn", url: "https://linkedin.com" },
        ],
      };

    case "unknown":
    default:
      return {
        text: `I'm not quite sure how to answer that specific question. 🤔\n\nMy assistant is trained to help you with:\n- 💻 My skills and technologies\n- 💼 Work experience\n- 🚀 Projects I've built\n- 🏆 Achievements and awards\n- 📱 GitHub profile\n- 📧 How to contact me\n\n**Have something else in mind?**\nI'd love to hear from you directly! Feel free to reach out for any questions, collaborations, or opportunities.`,
        showBusinessCard: true,
        businessCard: {
          name: "Firman Aziz",
          role: "Full-stack Web Developer",
          email: "firmanaziz@example.com",
          location: "Indonesia",
          socials: [
            {
              label: "GitHub",
              url: "https://github.com/GwFirman",
              icon: "github",
            },
            {
              label: "LinkedIn",
              url: "https://linkedin.com",
              icon: "linkedin",
            },
            { label: "Portfolio", url: "https://github.com", icon: "web" },
            {
              label: "Email",
              url: "mailto:firmanaziz@example.com",
              icon: "email",
            },
          ],
        },
        links: [],
      };
  }
}
