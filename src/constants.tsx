export interface Class {
    id: string;
    name: string;
    taken: string;
    click: string;
    color: string;
    icon: React.ReactElement;
}

export interface Skill {
    type: number; // 0: Programming Languages, 1: Frameworks/Libraries, 2: Tools/Software, 3: Concepts, 4: Soft Skills
    name: string;
    yoe: string;
    desc: string;
    icon: string | React.ReactElement;
}

export interface Artifacts {
    screenshots?: string[];
    demoUrl?: string;
    liveUrl?: string;
    repoUrl?: string;
    writeup?: string;
}

export interface Work {
    role: string;
    company: string;
    slug: string;
    date: string;
    desc: string;
    skills: Record<string, number>;
    artifacts: Artifacts;
    contribution: string;
}

export interface Role {
    text: string;
    icon: React.ReactElement;
    desc: string;
}

export interface Project {
    name: string;
    slug: string;
    scale: number; // 0: Large (>4 weeks), 1: Medium (1-4 weeks), 2: Small (<1 week)
    date: string;
    span: string;
    desc: string;
    skills: Record<string, number>;
    github: string;
    artifacts: Artifacts;
    contribution: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    subtitle: string;
    date: string;
    readTime: string;
    tags: string[];
    preview: string;
}

export const skills: Skill[] = [
    {
        type: 0,
        name: 'Python',
        yoe: '4',
        desc: 'Computer Networking course, Amazon Web Scraper project, Flashcards App project, Computer Lab Finder project, Turtle Stack Hackathon game',
        icon: '/skills/py.png',
    },
    {
        type: 0,
        name: 'Rust',
        yoe: '0.5',
        desc: 'StreamLine project',
        icon: '/skills/Rust.svg',
    },
    {
        type: 0,
        name: 'C',
        yoe: '1.5',
        desc: 'Operating Systems course, Computer Architecture course, Analysis of Algorithms course, Command Line Shell Interface project',
        icon: '/skills/c.png',
    },
    {
        type: 0,
        name: 'C++',
        yoe: '2',
        desc: 'Data Structures course, Matrix Word Scanner project, AVL Tree Data Analyzer project',
        icon: '/skills/cpp.png',
    },
    {
        type: 0,
        name: 'Java',
        yoe: '5',
        desc: 'Computational Thinking course, Computer Networking course, Name Frequency Analyzer project',
        icon: '/skills/java.png',
    },
    {
        type: 0,
        name: 'HTML',
        yoe: '7',
        desc: 'This website, Software Engineering course, Database Systems course, Livestock Metrics Visualization App project, Dashboard & Applicant Manager project, Video Sharing Service project',
        icon: '/skills/html.png',
    },
    {
        type: 0,
        name: 'CSS',
        yoe: '7',
        desc: 'This website, Software Engineering course, Database Systems course, Livestock Metrics Visualization App project, Dashboard & Applicant Manager project, Video Sharing Service project',
        icon: '/skills/css.png',
    },
    {
        type: 0,
        name: 'JavaScript',
        yoe: '3',
        desc: '',
        icon: '/skills/js.png',
    },
    {
        type: 0,
        name: 'TypeScript',
        yoe: '1',
        desc: 'This website, Video Sharing Service project',
        icon: '/skills/ts.png',
    },
    {
        type: 0,
        name: 'SQL',
        yoe: '1',
        desc: 'Software Engineering course, Database Systems course, WorkWell Partnership Software Engineer role, Livestock Metrics Visualization App project, Dashboard & Applicant Manager project',
        icon: '/skills/sql.png',
    },
    {
        type: 0,
        name: 'Bash',
        yoe: '3',
        desc: 'AI/ML Researcher role, Command Line Shell Interface project',
        icon: '/skills/bash.png',
    },
    {
        type: 0,
        name: 'x86-64 Assembly',
        yoe: '1',
        desc: 'Operating Systems course, Computer Architecture course',
        icon: '/skills/asm.png',
    },
    {
        type: 1,
        name: 'Next.js',
        yoe: '0.5',
        desc: 'Video Sharing Service project',
        icon: '/skills/next.png',
    },
    {
        type: 1,
        name: 'React',
        yoe: '0.5',
        desc: 'This website, Video Sharing Service project',
        icon: '/skills/react.png',
    },
    {
        type: 1,
        name: 'Node.js',
        yoe: '0.5',
        desc: 'Video Sharing Service project',
        icon: '/skills/node.png',
    },
    {
        type: 1,
        name: 'Express.js',
        yoe: '0.5',
        desc: 'Productivity App project',
        icon: '/skills/ex.png',
    },
    {
        type: 1,
        name: 'Ruby on Rails',
        yoe: '0.5',
        desc: 'Software Engineering course, WorkWell Partnership Software Engineer role, Dashboard & Applicant Manager project',
        icon: '/skills/rails.png',
    },
    {
        type: 1,
        name: 'Flask',
        yoe: '1.5',
        desc: 'Database Systems course, Livestock Metrics Visualization App project',
        icon: '/skills/flask.png',
    },
    {
        type: 1,
        name: 'Tailwind CSS',
        yoe: '0.5',
        desc: 'This website',
        icon: '/skills/tw.png',
    },
    {
        type: 1,
        name: 'OpenCV',
        yoe: '0.5',
        desc: '',
        icon: '/skills/OpenCV.svg',
    },
    {
        type: 1,
        name: 'PyTorch',
        yoe: '0.5',
        desc: '',
        icon: '/skills/PyTorch.svg',
    },
    {
        type: 1,
        name: 'NumPy',
        yoe: '0.5',
        desc: '',
        icon: '/skills/NumPy.svg',
    },
    {
        type: 1,
        name: 'Pandas',
        yoe: '0.5',
        desc: '',
        icon: '/skills/pandas.svg',
    },
    {
        type: 1,
        name: 'Matplotlib',
        yoe: '0.5',
        desc: '',
        icon: '/skills/Matplotlib.svg',
    },
    {
        type: 2,
        name: 'Git',
        yoe: '2',
        desc: 'This website, Software Engineering course, Database Systems course, WorkWell Partnership Software Engineer role, Livestock Metrics Visualization App project, Dashboard & Applicant Manager project, Video Sharing Service project, Hackathon Event Scheduler project',
        icon: '/skills/git.png',
    },
    {
        type: 2,
        name: 'GitHub',
        yoe: '4',
        desc: 'Many experiences',
        icon: '/skills/github.png',
    },
    {
        type: 2,
        name: 'PostgreSQL',
        yoe: '1.5',
        desc: 'Software Engineering course, Database Systems course, WorkWell Partnership Software Engineer role, Livestock Metrics Visualization App project, Dashboard & Applicant Manager project',
        icon: '/skills/psql.png',
    },
    {
        type: 2,
        name: 'MongoDB',
        yoe: '0.5',
        desc: 'Various experiences',
        icon: '/skills/mdb.png',
    },
    {
        type: 2,
        name: 'Docker',
        yoe: '0.5',
        desc: 'Video Sharing Service project',
        icon: '/skills/docker.png',
    },
    {
        type: 2,
        name: 'Jupyter',
        yoe: '0.5',
        desc: '',
        icon: '/skills/Jupyter.png',
    },
    {
        type: 2,
        name: 'Robot Operating System (ROS)',
        yoe: '0.5',
        desc: '',
        icon: '/skills/ROS.svg',
    },
    {
        type: 2,
        name: 'Linux',
        yoe: '2',
        desc: 'Software Engineering course, Database Systems course, WorkWell Partnership Software Engineer role, Livestock Metrics Visualization App project, Dashboard & Applicant Manager project',
        icon: '/skills/linux.png',
    },
    {
        type: 2,
        name: 'Ubuntu',
        yoe: '1',
        desc: 'Video Sharing Service project',
        icon: '/skills/ubuntu.png',
    },
    {
        type: 2,
        name: 'Unified Modeling Language',
        yoe: '1.5',
        desc: 'Software Engineering course, Database Systems course, WorkWell Partnership Software Engineer role, Livestock Metrics Visualization App project, Dashboard & Applicant Manager project',
        icon: '/skills/uml.png',
    },
    {
        type: 2,
        name: 'Firebase',
        yoe: '0.5',
        desc: 'Video Sharing Service project',
        icon: '/skills/fb.png',
    },
    {
        type: 2,
        name: 'Google Cloud Platform (GCP)',
        yoe: '0.5',
        desc: 'Video Sharing Service project',
        icon: '/skills/gcp.png',
    },
    {
        type: 2,
        name: 'Amazon Web Services (AWS)',
        yoe: '0.5',
        desc: 'Productivity App project (Elastic Compute Cloud)',
        icon: '/skills/aws.png',
    },
    {
        type: 3,
        name: 'Agile Development',
        yoe: '0.5',
        desc: '',
        icon: '/skills/agile.png',
    },
    {
        type: 3,
        name: 'Secure Software Practices',
        yoe: '0.5',
        desc: '',
        icon: '/skills/ssp.png',
    },
    {
        type: 3,
        name: 'System Design',
        yoe: '0.5',
        desc: '',
        icon: '/skills/sd.png',
    },
    {
        type: 3,
        name: 'RESTful APIs',
        yoe: '0.5',
        desc: '',
        icon: '/skills/rest.png',
    },
    {
        type: 3,
        name: 'Authentication',
        yoe: '0.5',
        desc: '',
        icon: '/skills/auth.png',
    },
    {
        type: 3,
        name: 'OAuth 2.0',
        yoe: '0.5',
        desc: '',
        icon: '/skills/oauth.png',
    },
    {
        type: 3,
        name: 'Object-Oriented Programming (OOP)',
        yoe: '0.5',
        desc: '',
        icon: '/skills/oop.png',
    },
    {
        type: 3,
        name: 'Concurrency & Multithreadding',
        yoe: '0.5',
        desc: '',
        icon: '/skills/conc.png',
    },
    {
        type: 3,
        name: 'Data Structures & Algorithms',
        yoe: '0.5',
        desc: '',
        icon: '/skills/dsa.png',
    },
    {
        type: 3,
        name: 'Database Design',
        yoe: '0.5',
        desc: '',
        icon: '/skills/dd.png',
    },
    {
        type: 3,
        name: 'Continuous Integration & Continuous Delivery (CI/CD)',
        yoe: '0.5',
        desc: '',
        icon: '/skills/cicd.png',
    },
];

export const work: Work[] = [
    {
        role: 'Operations Manager',
        company: 'The College of New Jersey',
        slug: 'operations-manager',
        date: 'Aug. 2025 – Present',
        desc: '• Leading a team of 15 staff in key inventory tracking, streamlining office workflows to support 3,000+ campus residents, resulting in a 40% reduction in key distribution errors and improved operational efficiency\n• Standardizing dormitory procedures through transaction logs, weekly audits, monthly team meetings, and emergency coordination protocols, reducing process overhead for staff and ensuring safe conditions across all properties',
        skills: {},
        artifacts: {},
        contribution:
            'Sole manager responsible for all key inventory operations and staff coordination across the entire residential campus.',
    },
    {
        role: 'Machine Learning Engineer',
        company: 'The College of New Jersey',
        slug: 'machine-learning-engineer',
        date: 'May 2025 – Jul. 2025',
        desc: '• Engineered a proprietary computer vision application with OpenCV to extract spatial data using trained model at a stable 30 FPS, ensuring low-latency perception and supporting reliable robotic decision-making\n• Trained and optimized a Convolutional Neural Network (CNN) in PyTorch on 40,000+ real-world images (captured and augmented), using NumPy and Matplotlib for analysis, improving accuracy by 50%+ and ensuring resilience to lighting/color variations\n• Implemented a closed-loop pipeline in ROS that transformed vision outputs into precise autonomous actuation, coordinating multiple robots and reducing manual operator intervention by 25% compared to baseline teleoperation',
        skills: {
            Python: 0,
            OpenCV: 1,
            PyTorch: 1,
            Matplotlib: 1,
            ROS: 2,
            Ubuntu: 2,
            'Computer Vision': 3,
            'Neural Networks': 3,
        },
        artifacts: {},
        contribution:
            'Designed and implemented the full computer vision pipeline end-to-end: data capture & augmentation, CNN architecture & training, OpenCV spatial extraction, and ROS integration for autonomous actuation.',
    },
];

export const projects: Project[] = [
    {
        name: 'GoalGetter',
        slug: 'goalgetter',
        scale: 0,
        date: 'Aug. 2025',
        span: '1 month',
        desc: '• Engineered a production-ready web app with Next.js, TypeScript, Tailwind CSS, and PostgreSQL, integrating tasks and calendar in a dynamic split-screen interface adopted by 30+ active users, with AWS EC2 + Route 53 powering scalable deployment\n• Implemented enterprise-grade authentication with NextAuth.js, OAuth 2.0, bcrypt, SHA-256, and reCAPTCHA v3, reducing unauthorized access by 95%+ and securing sensitive user data through hashed credentials and tokenized email verification\n• Designed a high-performance scheduling engine with cached recurrence expansion and state calculations, improving processing speed by 60% in event-heavy weeks, enabling smooth navigation at all times',
        skills: {
            TypeScript: 0,
            'Next.js': 1,
            'NextAuth.js': 1,
            'Tailwind CSS': 1,
            Bcrypt: 1,
            PostgreSQL: 2,
            'AWS EC2': 2,
            'RESTful API': 4,
            'OAuth 2.0': 4,
            'System Design': 4,
            'Database Design': 4,
            'CI/CD': 4,
        },
        github: 'https://github.com/BryanWieschenberg/GoalGetter',
        artifacts: {
            repoUrl: 'https://github.com/BryanWieschenberg/GoalGetter',
        },
        contribution:
            'Solo-developed the entire application end-to-end: frontend UI, backend API, database schema, authentication system, scheduling engine, and AWS deployment infrastructure.',
    },
    {
        name: 'StreamLine',
        slug: 'streamline',
        scale: 0,
        date: 'Jul. 2025',
        span: '1 month',
        desc: '• Designed and implemented a multithreaded, multi-room chat platform in Rust with RSA-OAEP (SHA-256) end-to-end encryption, featuring robust data modeling, persistent JSON storage, LAN-based real-time messaging, and shared state management via Arc and Mutex\n• Engineered a modular command system with 50+ commands supporting full account and room management, moderation, message rate limiting, and session timeout control\n• Built a secure system architecture with per-command role-based access control (RBAC) and validated control packet handling, reducing unauthorized actions by over 75% in simulated attack and resilience tests',
        skills: {
            Rust: 0,
            RSA: 1,
            'PKCS#8': 1,
            SHA256: 1,
            Mulithreadding: 4,
            'Thread Safety': 4,
            'TCP Sockets': 4,
            RBAC: 4,
            'End-to-End Encryption': 4,
        },
        github: 'https://github.com/BryanWieschenberg/StreamLine',
        artifacts: {
            repoUrl: 'https://github.com/BryanWieschenberg/StreamLine',
        },
        contribution:
            'Solo-architected and built the entire platform: network protocol, encryption layer, multithreaded server, command system, RBAC, and persistent storage.',
    },
    {
        name: 'Personal Website',
        slug: 'personal-website',
        scale: 1,
        date: 'Jan. 2025 – Mar. 2025',
        span: '3 months',
        desc: '• Responsive portfolio showcasing skills and projects using TypeScript, React, and Tailwind CSS\n• Modern UI/UX design with dynamic content and interactive animations',
        skills: {
            HTML: 0,
            CSS: 0,
            TypeScript: 0,
            React: 1,
            'Tailwind CSS': 1,
            Vercel: 2,
            'Cloud Deployment': 4,
            Frontend: 4,
        },
        github: 'https://github.com/BryanWieschenberg/Personal-Website',
        artifacts: {
            repoUrl: 'https://github.com/BryanWieschenberg/Personal-Website',
        },
        contribution:
            'Designed and built the entire portfolio site from scratch, including all animations, theming, and deployment.',
    },
    {
        name: 'Flashcards App',
        slug: 'flashcards-app',
        scale: 2,
        date: 'Feb. 2025',
        span: '1.5 weeks',
        desc: '• Interactive study tool developed in Python for memorizing terms and definitions\n• Implements dynamic content switching with keyboard controls for adaptive learning',
        skills: { Python: 0, Tkinter: 1 },
        github: 'https://github.com/BryanWieschenberg/Flashcards-App',
        artifacts: {
            repoUrl: 'https://github.com/BryanWieschenberg/Flashcards-App',
        },
        contribution:
            'Solo-developed the entire application including UI, session persistence, and adaptive learning logic.',
    },
];

export const blogPosts: BlogPost[] = [
    {
        slug: 'dsa_journey',
        title: 'My DSA Journey',
        subtitle: 'Blind 75 → NeetCode 150 → NeetCode 250',
        date: 'Feb 2026',
        readTime: '10 min read',
        tags: ['DSA', 'Learning', 'Problem Solving'],
        preview:
            'What I actually learned grinding through 250+ data structures & algorithms problems — and why the grind itself is only half the point.',
    },
    {
        slug: 'streamline',
        title: 'Building an End-to-End Encrypted Chat App in Rust',
        subtitle: 'An Encrypted, Multithreaded Chat Server in Rust',
        date: 'Jul 2025',
        readTime: '12 min read',
        tags: ['Rust', 'Systems', 'Cryptography'],
        preview:
            'Why I chose the hardest possible way to build a chat app — and what it taught me about ownership, encryption, and protocol design.',
    },
    {
        slug: 'goalgetter',
        title: 'Building a Production-Grade Productivity App',
        subtitle: 'A Productivity App with 30+ Users and Zero Excuses',
        date: 'Aug 2025',
        readTime: '11 min read',
        tags: ['Full-Stack', 'Auth', 'Product'],
        preview:
            'What I learned shipping a real product — from auth nightmares to scheduling math to the moment someone said "I use this every day."',
    },
    {
        slug: 'ml_research',
        title: 'Teaching Robots to See',
        subtitle: 'My Summer in ML Research at TCNJ',
        date: 'Jun 2025',
        readTime: '8 min read',
        tags: ['Machine Learning', 'Computer Vision', 'Robotics'],
        preview:
            "What happens when a software engineer who's never touched a neural network gets thrown into a robotics lab with a deadline and a camera.",
    },
];
