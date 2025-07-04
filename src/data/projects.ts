export const mockProjects = [
    {
      id: '1',
      title: "Smart Attendance System",
      description: "A system that uses facial recognition to automatically mark attendance. It's built with Python and OpenCV for the backend, with a simple web interface for viewing records. Ideal for schools, colleges, and small offices.",
      techStack: ["Python", "OpenCV", "Firebase", "Flask"],
      price: 499,
      images: [
        { url: "https://placehold.co/800x600.png", hint: "facial recognition software"},
        { url: "https://placehold.co/800x600.png", hint: "attendance dashboard"},
        { url: "https://placehold.co/800x600.png", hint: "user profile screen"},
      ],
      tags: ["ML", "Computer Vision"],
    },
    {
      id: '2',
      title: "MERN-based Chat App",
      description: "A real-time chat application built on the MERN stack (MongoDB, Express, React, Node.js). Features include private messaging, group chats, and typing indicators. Uses Socket.IO for real-time communication.",
      techStack: ["MongoDB", "Express", "React", "Node.js", "Socket.IO"],
      price: 799,
      images: [
        { url: "https://placehold.co/800x600.png", hint: "chat application interface"},
        { url: "https://placehold.co/800x600.png", hint: "user messaging screen"},
        { url: "https://placehold.co/800x600.png", hint: "mobile chat app"},
      ],
      tags: ["Web Dev", "Real-time"],
    },
    {
      id: '3',
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform built with Next.js for the frontend and backed by PostgreSQL. Includes product listings, a shopping cart, and secure payments integrated with Stripe. The admin panel allows for easy product and order management.",
      techStack: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
      price: 1299,
      images: [
        { url: "https://placehold.co/800x600.png", hint: "online store homepage"},
        { url: "https://placehold.co/800x600.png", hint: "product listing page"},
        { url: "https://placehold.co/800x600.png", hint: "shopping cart checkout"},
      ],
      tags: ["Full-stack", "Payments"],
    },
    {
      id: '4',
      title: "AI-Powered Blog Generator",
      description: "A content creation tool that uses large language models (via Genkit) to generate blog posts from a simple prompt. The user provides a topic, and the AI generates a well-structured article. Built with Python and Flask.",
      techStack: ["Python", "Flask", "Genkit", "React"],
      price: 650,
      images: [
        { url: "https://placehold.co/800x600.png", hint: "artificial intelligence writing"},
        { url: "https://placehold.co/800x600.png", hint: "content management system"},
        { url: "https://placehold.co/800x600.png", hint: "blog post editor"},
      ],
      tags: ["AI", "Content Creation"],
    },
  ];
