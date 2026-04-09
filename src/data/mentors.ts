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
  "Mathematics", "Physics", "Chemistry", "Biology",
  "English", "Programming", "History", "Music",
  "Art", "Economics",
];

export const mentors: Mentor[] = [
  {
    id: "1",
    name: "Aigerim Suleimenova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    subject: "Mathematics",
    subjects: ["Mathematics", "Physics"],
    rating: 4.9,
    reviewCount: 127,
    price: 5000,
    experience: 8,
    bio: "Experienced math tutor specializing in olympiad preparation and university entrance exams.",
    longBio: "I have been teaching mathematics for over 8 years, helping students excel in national and international olympiads. My approach combines deep theoretical understanding with practical problem-solving techniques. I graduated from Nazarbayev University with honors and have helped over 200 students achieve their academic goals.",
    education: "MSc Mathematics, Nazarbayev University",
    languages: ["Kazakh", "Russian", "English"],
    location: "Almaty",
    available: true,
    reviews: [
      { author: "Arman T.", text: "Aigerim helped me prepare for the math olympiad. Her explanations are very clear!", rating: 5, date: "2024-02-15" },
      { author: "Dana K.", text: "Best math tutor I've ever had. Highly recommended.", rating: 5, date: "2024-01-20" },
      { author: "Bekzat M.", text: "Great at explaining complex topics in simple terms.", rating: 4, date: "2023-12-10" },
    ],
  },
  {
    id: "2",
    name: "Nurlan Bekov",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    subject: "Programming",
    subjects: ["Programming", "Mathematics"],
    rating: 4.8,
    reviewCount: 95,
    price: 7000,
    experience: 6,
    bio: "Full-stack developer and coding mentor. Teaching Python, JavaScript, and web development.",
    longBio: "As a senior software engineer with 6 years of industry experience, I bring real-world knowledge to my teaching. I specialize in Python, JavaScript, React, and backend development. My students have gone on to work at top tech companies and launch their own startups.",
    education: "BSc Computer Science, KBTU",
    languages: ["Kazakh", "Russian", "English"],
    location: "Astana",
    available: true,
    reviews: [
      { author: "Marat S.", text: "Nurlan is an amazing teacher. He made programming fun and easy to understand.", rating: 5, date: "2024-03-01" },
      { author: "Aisha R.", text: "Very patient and knowledgeable. Helped me land my first internship!", rating: 5, date: "2024-02-10" },
    ],
  },
  {
    id: "3",
    name: "Madina Akhmetova",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    subject: "English",
    subjects: ["English"],
    rating: 4.7,
    reviewCount: 203,
    price: 4500,
    experience: 10,
    bio: "IELTS & TOEFL specialist with 10 years of experience. Score improvement guaranteed.",
    longBio: "With a decade of experience in English language teaching, I have helped hundreds of students achieve their target IELTS and TOEFL scores. I hold a CELTA certificate from Cambridge and have lived in the UK for 3 years. My methodology focuses on building confidence alongside language skills.",
    education: "MA Applied Linguistics, University of Leeds",
    languages: ["Kazakh", "Russian", "English"],
    location: "Almaty",
    available: true,
    reviews: [
      { author: "Zhaniya K.", text: "Got IELTS 7.5 after 2 months of classes! Thank you so much!", rating: 5, date: "2024-03-05" },
      { author: "Timur B.", text: "Professional and structured approach. Highly recommend for IELTS prep.", rating: 5, date: "2024-02-20" },
      { author: "Gulnara M.", text: "Very thorough and patient teacher.", rating: 4, date: "2024-01-15" },
    ],
  },
  {
    id: "4",
    name: "Dauren Kasymov",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    subject: "Physics",
    subjects: ["Physics", "Mathematics"],
    rating: 4.6,
    reviewCount: 68,
    price: 5500,
    experience: 5,
    bio: "Physics teacher who makes complex concepts simple. Preparing students for UNT and olympiads.",
    longBio: "I believe physics should be exciting, not intimidating. My teaching style involves lots of visual demonstrations, real-world examples, and hands-on experiments. I've been teaching for 5 years and my students consistently score in the top percentile on standardized tests.",
    education: "MSc Physics, Al-Farabi University",
    languages: ["Kazakh", "Russian"],
    location: "Almaty",
    available: false,
    reviews: [
      { author: "Alibek N.", text: "Dauren makes physics so interesting! Great teacher.", rating: 5, date: "2024-01-30" },
      { author: "Kamila S.", text: "Good explanations but sometimes runs over time.", rating: 4, date: "2023-12-20" },
    ],
  },
  {
    id: "5",
    name: "Asel Nurbekova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    subject: "Chemistry",
    subjects: ["Chemistry", "Biology"],
    rating: 4.9,
    reviewCount: 156,
    price: 6000,
    experience: 12,
    bio: "PhD in Chemistry with a passion for teaching. Expert in organic and analytical chemistry.",
    longBio: "I hold a PhD in Organic Chemistry and have been teaching at university level for 12 years. I now dedicate my time to private tutoring, helping students who struggle with chemistry concepts. My goal is to make chemistry accessible and enjoyable for everyone.",
    education: "PhD Chemistry, Moscow State University",
    languages: ["Kazakh", "Russian", "English"],
    location: "Astana",
    available: true,
    reviews: [
      { author: "Nursultan A.", text: "Dr. Asel is incredibly knowledgeable and explains everything so well.", rating: 5, date: "2024-03-10" },
      { author: "Aigerim B.", text: "Thanks to her, I fell in love with chemistry!", rating: 5, date: "2024-02-25" },
    ],
  },
  {
    id: "6",
    name: "Yerbol Tulegenov",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    subject: "History",
    subjects: ["History", "Economics"],
    rating: 4.5,
    reviewCount: 42,
    price: 4000,
    experience: 7,
    bio: "History teacher bringing the past to life. Specializing in world history and Kazakhstan history.",
    longBio: "History is not just about memorizing dates — it's about understanding the forces that shaped our world. I teach history through storytelling, debates, and critical analysis. My students develop not just knowledge but critical thinking skills that serve them well beyond the classroom.",
    education: "MA History, Eurasian National University",
    languages: ["Kazakh", "Russian"],
    location: "Astana",
    available: true,
    reviews: [
      { author: "Saltanat D.", text: "Makes history lessons so engaging! Never boring.", rating: 5, date: "2024-02-05" },
      { author: "Azamat K.", text: "Good teacher, could use more visual materials.", rating: 4, date: "2024-01-10" },
    ],
  },
  {
    id: "7",
    name: "Laura Ospanova",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    subject: "Biology",
    subjects: ["Biology"],
    rating: 4.8,
    reviewCount: 89,
    price: 5000,
    experience: 9,
    bio: "Biology teacher with medical background. Perfect for pre-med students and UNT preparation.",
    longBio: "Having studied medicine before transitioning to teaching, I bring a unique clinical perspective to biology education. I specialize in preparing students for medical school entrance exams and have a deep understanding of human anatomy, genetics, and molecular biology.",
    education: "MD, Kazakh National Medical University",
    languages: ["Kazakh", "Russian", "English"],
    location: "Shymkent",
    available: true,
    reviews: [
      { author: "Dina T.", text: "Laura's medical background makes biology so much more interesting!", rating: 5, date: "2024-03-08" },
      { author: "Ruslan M.", text: "Excellent preparation for medical school exams.", rating: 5, date: "2024-02-15" },
    ],
  },
  {
    id: "8",
    name: "Almas Zhunusov",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
    subject: "Music",
    subjects: ["Music"],
    rating: 4.7,
    reviewCount: 54,
    price: 6500,
    experience: 15,
    bio: "Professional pianist and music teacher. Classical piano, music theory, and composition.",
    longBio: "I've been playing piano for over 25 years and teaching for 15. I've performed at concert halls across Central Asia and Europe. Whether you're a beginner wanting to play your favorite songs or an advanced student preparing for conservatory auditions, I can help you reach your musical goals.",
    education: "Kazakh National Conservatory",
    languages: ["Kazakh", "Russian"],
    location: "Almaty",
    available: true,
    reviews: [
      { author: "Amir K.", text: "Incredible pianist and very patient teacher.", rating: 5, date: "2024-02-28" },
      { author: "Zhanna L.", text: "My daughter loves her piano lessons with Almas!", rating: 5, date: "2024-01-25" },
    ],
  },
];
