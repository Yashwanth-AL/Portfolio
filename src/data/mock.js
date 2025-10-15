export const personalInfo = {
  name: "Yashwanth A L",
  tagline: "Computer Science Engineer | Problem Solver | Full-Stack Developer",
  email: "yashwanthal2004@gmail.com",
  phone: "9844955914",
  profileImage: "/assets/Profile.jpg",
  socialLinks: {
    github: "https://github.com/Yashwanth-AL",
    linkedin: "https://www.linkedin.com/in/yashwanth-al/",
    leetcode: "https://leetcode.com/u/Yashwanth-AL/",
    facebook: "https://facebook.com/Yashwanthal.2004",
    instagram: "https://instagram.com/yashwanth_al",
    twitter: "https://x.com/yashwanthal2004"
  },
  socialHandles: {
    github: "Yashwanth-AL",
    linkedin: "yashwanth-al",
    leetcode: "Yashwanth-AL",
    facebook: "Yashwanthal.2004",
    instagram: "yashwanth_al",
    twitter: "yashwanthal2004"
  }
};

export const education = [
  {
    id: 1,
    institution: "JSS Science and Technology University (SJCE)",
    degree: "B.E. Computer Science Engineering",
    duration: "2022 - 2026",
    grade: "9.52 CGPA",
    logo: "/assets/jssstu.png",
    status: "ongoing"
  },
  {
    id: 2,
    institution: "Sri Ramakrishna Vidyashala",
    degree: "PUC PCMB",
    duration: "2020 - 2022",
    grade: "97.66%",
    logo: "/assets/srkvs.png",
    status: "completed"
  },
  {
    id: 3,
    institution: "Sri Ramakrishna Vidyashala",
    degree: "SSLC",
    duration: "2017 - 2020",
    grade: "96.96%",
    logo: "/assets/srkvs.png",
    status: "completed"
  }
];

export const experience = [
  {
    id: 1,
    company: "Schneider Electric",
    position: "R&D Intern",
    duration: "May 2025 - July 2025",
    division: "Microgrid Solutions",
    description: [
      "Tested custom embedded Linux images for Harmony P6 IoT controller using Yocto-based EdgeOS",
      "Integrated Docker & MQTT for containerized services and lightweight communication",
      "Supported deployment in embedded energy management systems"
    ],
    technologies: ["Docker", "Linux", "MQTT", "Yocto", "EdgeOS"],
    logo: "/assets/se.png"
  }
];

export const projects = [
  {
    id: 1,
    title: "Inkwell",
    description: "A MERN Stack blog platform where anyone can read blogs, while authenticated users can create, edit, and manage their posts. Includes secure authentication, CRUD operations, and a responsive design.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    image: "/assets/inkwell.png",
    github: "https://github.com/Yashwanth-AL/Blog-App",
    demo: "https://inkwell-yash.vercel.app/",
    features: ["Public Blog Access", "User Authentication","CRUD Operations", "Responsive Design"]
  },
  {
    id: 2,
    title: "Tic-Tac-Toe Game",
    description: "Interactive Tic-Tac-Toe game built with vanilla JavaScript featuring smooth gameplay, win detection algorithm, and responsive UI design. Built using DOM manipulation and event handling",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    image: "/assets/tic-tac-toe.png",
    github: "https://github.com/Yashwanth-AL/Tic-Tac-Toe",
    demo: "https://yashwanth-al.github.io/Tic-Tac-Toe/",
    features: ["Win Detection", "Interactive UI", "Responsive Design", "Game Reset"]
  },
  {
    id: 3,
    title: "Simon Game",
    description: "Memory-based Simon game with increasing difficulty levels, sound effects, and visual feedback. Built using DOM manipulation and event handling.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    image: "/assets/simon.png",
    github: "https://github.com/Yashwanth-AL/Simon-Game/",
    demo: "https://yashwanth-al.github.io/Simon-Game/",
    features: ["Sound Effects", "Progressive Difficulty", "Score Tracking", "Visual Feedback"]
  }
];

export const skills = {
  programming: ["C", "Java", "Python", "JavaScript"],
  webTech: ["HTML5", "CSS3", "React", "Bootstrap", "Tailwind CSS"],
  backend: ["Node.js", "Express.js", "Docker"],
  databases: ["SQL", "PostgreSQL", "MongoDB"],
  problemSolving: ["Data Structures", "Algorithms", "Debugging", "Optimization"]
};

export const achievements = [
  {
    id: 1,
    title: "Data Structures and Algorithms in C (DSA)",
    description: "Completed a specialized course on data structures and algorithms in C.",
    date: "2023",
    certificate: "/assets/certificates/DSA_Deepali_Srivastava.jpg",
    organization: "Udemy (Instructor: Deepali Srivastava)"
  },
  {
    id: 2,
    title: "Flipkart GRiD 6.0 - Software Development Track",
    description: "Participated in Level 1 E-Commerce & Tech Quiz via Unstop platform as part of Flipkart GRiD 6.0.",
    date: "2024",
    certificate: "/assets/certificates/flipkart.jpg",
    organization: "Flipkart"
  },
  {
    id: 3,
    title: "Mastering Data Structures & Algorithms using C and C++",
    description: "Completed an in-depth course on mastering data structures and algorithms with C and C++.",
    date: "2024",
    certificate: "/assets/certificates/DSA_AbdulBari.jpg",
    organization: "Udemy (Instructor: Abdul Bari)"
  },
  {
    id: 4,
    title: "Learn JAVA Programming - Beginner to Master",
    description: "Completed a complete Java programming course covering beginner to advanced concepts (61.5 hours).",
    date: "2024",
    certificate: "/assets/certificates/JAVA_AbdulBari.jpg",
    organization: "Udemy (Instructor: Abdul Bari)"
  }, 
  {
    id: 5,
    title: "The Complete Full-Stack Web Development Bootcamp",
    description: "Completed an extensive course covering full-stack web development with hands-on projects, including frontend, backend, databases, and deployment.",
    date: "2025",
    certificate: "/assets/certificates/Web_dev.jpg",
    organization: "Udemy (Instructor: Dr. Angela Yu)"
  },
  {
    id: 6,
    title: "Oracle Cloud Infrastructure AI Foundations Associate",
    description: "Earned certification from Oracle, learning AI fundamentals and their integration with Oracle Cloud Infrastructure (OCI).",
    date: "2025",
    certificate: "/assets/certificates/OCI_Foundations_Associate.jpg",
    organization: "Oracle University"
  },
  {
    id: 7,
    title: "Problem Solving Badge",
    description: "Achieved proficiency in data structures and algorithms through consistent practice",
    date: "2025",
    certificate: "/assets/certificates/badges.png",
    organization: "LeetCode"
  },
];
