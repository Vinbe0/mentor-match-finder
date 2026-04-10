export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  subject: string;
  subjects: string[];
  rating: number;
  reviewCount: number;
  price: number;
  experience: number;
  bio: string;
  longBio: string;
  education: string;
  languages: string[];
  location: string;
  available: boolean;
  reviews: { author: string; text: string; rating: number; date: string }[];
}

export const subjects = [
  "Programming", "Web Development", "Data Science", "UI/UX Design",
  "Digital Marketing", "Product Management", "Graphic Design", "Business Strategy",
  "Copywriting", "Finance & Accounting",
];

export const mentors: Mentor[] = [
  {
    id: "1",
    name: "Aigerim Suleimenova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    subject: "UI/UX Design",
    subjects: ["UI/UX Design", "Graphic Design"],
    rating: 4.9,
    reviewCount: 127,
    price: 8000,
    experience: 8,
    bio: "Senior product designer helping aspiring designers build portfolios and land jobs at top companies.",
    longBio: "I've spent 8 years designing digital products for startups and enterprises across Central Asia and Europe. I specialize in user research, interaction design, and design systems. My mentees have gone on to work at companies like Kaspi, Kolesa, and international startups. I focus on practical skills — portfolio reviews, real-world projects, and interview preparation.",
    education: "BFA Design, Nazarbayev University",
    languages: ["Kazakh", "Russian", "English"],
    location: "Almaty",
    available: true,
    reviews: [
      { author: "Arman T.", text: "Aigerim helped me completely revamp my portfolio. Got 3 offers within a month!", rating: 5, date: "2024-02-15" },
      { author: "Dana K.", text: "Best design mentor I've ever had. Very structured approach.", rating: 5, date: "2024-01-20" },
      { author: "Bekzat M.", text: "Great at explaining design thinking in practical terms.", rating: 4, date: "2023-12-10" },
    ],
  },
  {
    id: "2",
    name: "Nurlan Bekov",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    subject: "Programming",
    subjects: ["Programming", "Web Development"],
    rating: 4.8,
    reviewCount: 95,
    price: 10000,
    experience: 6,
    bio: "Full-stack developer and coding mentor. Teaching Python, JavaScript, React, and system design.",
    longBio: "As a senior software engineer with 6 years of industry experience at top tech companies, I bring real-world knowledge to my mentoring. I specialize in Python, JavaScript, React, and backend architecture. My mentees have landed roles at FAANG companies, local tech leaders, and launched their own startups. I focus on building production-ready skills, not just tutorial knowledge.",
    education: "BSc Computer Science, KBTU",
    languages: ["Kazakh", "Russian", "English"],
    location: "Astana",
    available: true,
    reviews: [
      { author: "Marat S.", text: "Nurlan helped me transition from QA to software engineering. Incredible mentor.", rating: 5, date: "2024-03-01" },
      { author: "Aisha R.", text: "Very patient and knowledgeable. Helped me land my first dev internship!", rating: 5, date: "2024-02-10" },
    ],
  },
  {
    id: "3",
    name: "Madina Akhmetova",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    subject: "Digital Marketing",
    subjects: ["Digital Marketing", "Copywriting"],
    rating: 4.7,
    reviewCount: 203,
    price: 7000,
    experience: 10,
    bio: "Growth marketing expert with 10 years of experience. From SEO to paid ads, I cover it all.",
    longBio: "With a decade of experience in digital marketing, I've managed campaigns with budgets from $1K to $500K across Google Ads, Meta, and TikTok. I specialize in growth strategy, SEO, content marketing, and conversion optimization. Whether you're building your own brand or want to start a marketing career, I'll give you the frameworks and hands-on skills you need.",
    education: "MBA Marketing, Almaty Management University",
    languages: ["Kazakh", "Russian", "English"],
    location: "Almaty",
    available: true,
    reviews: [
      { author: "Zhaniya K.", text: "Madina helped me grow my e-commerce store 3x in 2 months!", rating: 5, date: "2024-03-05" },
      { author: "Timur B.", text: "Professional and structured approach to marketing education.", rating: 5, date: "2024-02-20" },
      { author: "Gulnara M.", text: "Very thorough and patient mentor. Learned a ton about SEO.", rating: 4, date: "2024-01-15" },
    ],
  },
  {
    id: "4",
    name: "Dauren Kasymov",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    subject: "Data Science",
    subjects: ["Data Science", "Programming"],
    rating: 4.6,
    reviewCount: 68,
    price: 9000,
    experience: 5,
    bio: "Data scientist at a fintech company. Teaching ML, Python, SQL, and how to break into data careers.",
    longBio: "I believe data science should be practical, not intimidating. My mentoring focuses on real datasets, production ML pipelines, and the business context behind models. I've been in the industry for 5 years, working on fraud detection, recommendation systems, and analytics. My mentees consistently land data roles at top companies.",
    education: "MSc Applied Mathematics, Al-Farabi University",
    languages: ["Kazakh", "Russian"],
    location: "Almaty",
    available: false,
    reviews: [
      { author: "Alibek N.", text: "Dauren makes complex ML concepts so approachable!", rating: 5, date: "2024-01-30" },
      { author: "Kamila S.", text: "Good explanations, helped me prep for data science interviews.", rating: 4, date: "2023-12-20" },
    ],
  },
  {
    id: "5",
    name: "Asel Nurbekova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    subject: "Product Management",
    subjects: ["Product Management", "Business Strategy"],
    rating: 4.9,
    reviewCount: 156,
    price: 12000,
    experience: 12,
    bio: "VP of Product with 12 years of experience. Helping aspiring PMs break into the field.",
    longBio: "I've led product teams at startups and scale-ups, launching products used by millions. Now I dedicate time to mentoring the next generation of product managers. My program covers product strategy, roadmapping, stakeholder management, and the PM interview process. I've helped over 50 mentees land PM roles.",
    education: "MBA, London Business School",
    languages: ["Kazakh", "Russian", "English"],
    location: "Astana",
    available: true,
    reviews: [
      { author: "Nursultan A.", text: "Asel's mentorship was transformative. Landed a PM role at a top startup!", rating: 5, date: "2024-03-10" },
      { author: "Aigerim B.", text: "Her product thinking frameworks are incredibly valuable.", rating: 5, date: "2024-02-25" },
    ],
  },
  {
    id: "6",
    name: "Yerbol Tulegenov",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    subject: "Business Strategy",
    subjects: ["Business Strategy", "Finance & Accounting"],
    rating: 4.5,
    reviewCount: 42,
    price: 8000,
    experience: 7,
    bio: "Strategy consultant turned startup founder. Teaching business planning, fundraising, and growth.",
    longBio: "After 5 years at a Big 4 consulting firm and founding my own startup, I bring a unique perspective to business mentoring. I teach through real case studies, financial modeling, and strategic frameworks. My mentees include aspiring entrepreneurs, MBA candidates, and professionals transitioning into strategy roles.",
    education: "MA Economics, Eurasian National University",
    languages: ["Kazakh", "Russian"],
    location: "Astana",
    available: true,
    reviews: [
      { author: "Saltanat D.", text: "Yerbol's consulting frameworks are so practical!", rating: 5, date: "2024-02-05" },
      { author: "Azamat K.", text: "Helped me build my startup pitch deck. Got funded!", rating: 4, date: "2024-01-10" },
    ],
  },
  {
    id: "7",
    name: "Laura Ospanova",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    subject: "Web Development",
    subjects: ["Web Development", "Programming"],
    rating: 4.8,
    reviewCount: 89,
    price: 9000,
    experience: 9,
    bio: "Frontend architect specializing in React, TypeScript, and modern web technologies.",
    longBio: "With 9 years building web applications for companies ranging from startups to enterprises, I focus on teaching production-grade frontend development. My mentees learn React, TypeScript, testing, performance optimization, and how to collaborate effectively in engineering teams. I also help with career transitions into tech.",
    education: "BSc Software Engineering, Kazakh-British Technical University",
    languages: ["Kazakh", "Russian", "English"],
    location: "Shymkent",
    available: true,
    reviews: [
      { author: "Dina T.", text: "Laura's real-world experience makes her teaching incredibly practical!", rating: 5, date: "2024-03-08" },
      { author: "Ruslan M.", text: "Went from zero to junior frontend dev in 4 months with her guidance.", rating: 5, date: "2024-02-15" },
    ],
  },
  {
    id: "8",
    name: "Almas Zhunusov",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    subject: "Graphic Design",
    subjects: ["Graphic Design", "UI/UX Design"],
    rating: 4.7,
    reviewCount: 54,
    price: 7500,
    experience: 15,
    bio: "Creative director with 15 years in branding, visual identity, and motion design.",
    longBio: "I've been creating visual identities for brands across Central Asia and beyond for over 15 years. From logo design to full brand systems, I teach the principles and tools behind professional graphic design. Whether you're a beginner exploring Figma or an experienced designer wanting to level up, I can help you reach your creative goals.",
    education: "BFA, Kazakh National Academy of Arts",
    languages: ["Kazakh", "Russian"],
    location: "Almaty",
    available: true,
    reviews: [
      { author: "Amir K.", text: "Incredible eye for design and very patient teacher.", rating: 5, date: "2024-02-28" },
      { author: "Zhanna L.", text: "Almas helped me build a brand identity for my startup from scratch.", rating: 5, date: "2024-01-25" },
    ],
  },
];
