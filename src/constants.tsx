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

export const skills: Skill[] = [
    {
        type: 0,
        name: 'Python',
        yoe: '4',
        desc: 'Computer Networking course, Amazon Web Scraper project, Flashcards App project, Computer Lab Finder project, Turtle Stack Hackathon game',
        icon: '/assets/skills/py.png',
    },
    {
        type: 0,
        name: 'Rust',
        yoe: '0.5',
        desc: 'StreamLine project',
        icon: '/assets/skills/Rust.svg',
    },
    {
        type: 0,
        name: 'C',
        yoe: '1.5',
        desc: 'Operating Systems course, Computer Architecture course, Analysis of Algorithms course, Command Line Shell Interface project',
        icon: '/assets/skills/c.png',
    },
    {
        type: 0,
        name: 'C++',
        yoe: '2',
        desc: 'Data Structures course, Matrix Word Scanner project, AVL Tree Data Analyzer project',
        icon: '/assets/skills/cpp.png',
    },
    {
        type: 0,
        name: 'Java',
        yoe: '5',
        desc: 'Computational Thinking course, Computer Networking course, Name Frequency Analyzer project',
        icon: '/assets/skills/java.png',
    },
    {
        type: 0,
        name: 'HTML',
        yoe: '7',
        desc: 'This website, Software Engineering course, Database Systems course, Livestock Metrics Visualization App project, Dashboard & Applicant Manager project, Video Sharing Service project',
        icon: '/assets/skills/html.png',
    },
    {
        type: 0,
        name: 'CSS',
        yoe: '7',
        desc: 'This website, Software Engineering course, Database Systems course, Livestock Metrics Visualization App project, Dashboard & Applicant Manager project, Video Sharing Service project',
        icon: '/assets/skills/css.png',
    },
    {
        type: 0,
        name: 'JavaScript',
        yoe: '3',
        desc: '',
        icon: '/assets/skills/js.png',
    },
    {
        type: 0,
        name: 'TypeScript',
        yoe: '1',
        desc: 'This website, Video Sharing Service project',
        icon: '/assets/skills/ts.png',
    },
    {
        type: 0,
        name: 'SQL',
        yoe: '1',
        desc: 'Software Engineering course, Database Systems course, WorkWell Partnership Software Engineer role, Livestock Metrics Visualization App project, Dashboard & Applicant Manager project',
        icon: '/assets/skills/sql.png',
    },
    {
        type: 0,
        name: 'Bash',
        yoe: '3',
        desc: 'AI/ML Researcher role, Command Line Shell Interface project',
        icon: '/assets/skills/bash.png',
    },
    {
        type: 0,
        name: 'x86-64 Assembly',
        yoe: '1',
        desc: 'Operating Systems course, Computer Architecture course',
        icon: '/assets/skills/asm.png',
    },
    {
        type: 1,
        name: 'Next.js',
        yoe: '0.5',
        desc: 'Video Sharing Service project',
        icon: '/assets/skills/next.png',
    },
    {
        type: 1,
        name: 'React',
        yoe: '0.5',
        desc: 'This website, Video Sharing Service project',
        icon: '/assets/skills/react.png',
    },
    {
        type: 1,
        name: 'Node.js',
        yoe: '0.5',
        desc: 'Video Sharing Service project',
        icon: '/assets/skills/node.png',
    },
    {
        type: 1,
        name: 'Express.js',
        yoe: '0.5',
        desc: 'Productivity App project',
        icon: '/assets/skills/ex.png',
    },
    {
        type: 1,
        name: 'Ruby on Rails',
        yoe: '0.5',
        desc: 'Software Engineering course, WorkWell Partnership Software Engineer role, Dashboard & Applicant Manager project',
        icon: '/assets/skills/rails.png',
    },
    {
        type: 1,
        name: 'Flask',
        yoe: '1.5',
        desc: 'Database Systems course, Livestock Metrics Visualization App project',
        icon: '/assets/skills/flask.png',
    },
    {
        type: 1,
        name: 'Tailwind CSS',
        yoe: '0.5',
        desc: 'This website',
        icon: '/assets/skills/tw.png',
    },
    {
        type: 1,
        name: 'OpenCV',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/OpenCV.svg',
    },
    {
        type: 1,
        name: 'PyTorch',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/PyTorch.svg',
    },
    {
        type: 1,
        name: 'NumPy',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/NumPy.svg',
    },
    {
        type: 1,
        name: 'Pandas',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/pandas.svg',
    },
    {
        type: 1,
        name: 'Matplotlib',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/Matplotlib.svg',
    },
    {
        type: 2,
        name: 'Git',
        yoe: '2',
        desc: 'This website, Software Engineering course, Database Systems course, WorkWell Partnership Software Engineer role, Livestock Metrics Visualization App project, Dashboard & Applicant Manager project, Video Sharing Service project, Hackathon Event Scheduler project',
        icon: '/assets/skills/git.png',
    },
    {
        type: 2,
        name: 'GitHub',
        yoe: '4',
        desc: 'Many experiences',
        icon: '/assets/skills/github.png',
    },
    {
        type: 2,
        name: 'PostgreSQL',
        yoe: '1.5',
        desc: 'Software Engineering course, Database Systems course, WorkWell Partnership Software Engineer role, Livestock Metrics Visualization App project, Dashboard & Applicant Manager project',
        icon: '/assets/skills/psql.png',
    },
    {
        type: 2,
        name: 'MongoDB',
        yoe: '0.5',
        desc: 'Various experiences',
        icon: '/assets/skills/mdb.png',
    },
    {
        type: 2,
        name: 'Docker',
        yoe: '0.5',
        desc: 'Video Sharing Service project',
        icon: '/assets/skills/docker.png',
    },
    {
        type: 2,
        name: 'Jupyter',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/Jupyter.png',
    },
    {
        type: 2,
        name: 'Robot Operating System (ROS)',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/ROS.svg',
    },
    {
        type: 2,
        name: 'Linux',
        yoe: '2',
        desc: 'Software Engineering course, Database Systems course, WorkWell Partnership Software Engineer role, Livestock Metrics Visualization App project, Dashboard & Applicant Manager project',
        icon: '/assets/skills/linux.png',
    },
    {
        type: 2,
        name: 'Ubuntu',
        yoe: '1',
        desc: 'Video Sharing Service project',
        icon: '/assets/skills/ubuntu.png',
    },
    {
        type: 2,
        name: 'Unified Modeling Language',
        yoe: '1.5',
        desc: 'Software Engineering course, Database Systems course, WorkWell Partnership Software Engineer role, Livestock Metrics Visualization App project, Dashboard & Applicant Manager project',
        icon: '/assets/skills/uml.png',
    },
    {
        type: 2,
        name: 'Firebase',
        yoe: '0.5',
        desc: 'Video Sharing Service project',
        icon: '/assets/skills/fb.png',
    },
    {
        type: 2,
        name: 'Google Cloud Platform (GCP)',
        yoe: '0.5',
        desc: 'Video Sharing Service project',
        icon: '/assets/skills/gcp.png',
    },
    {
        type: 2,
        name: 'Amazon Web Services (AWS)',
        yoe: '0.5',
        desc: 'Productivity App project (Elastic Compute Cloud)',
        icon: '/assets/skills/aws.png',
    },
    {
        type: 3,
        name: 'Agile Development',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/agile.png',
    },
    {
        type: 3,
        name: 'Secure Software Practices',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/ssp.png',
    },
    {
        type: 3,
        name: 'System Design',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/sd.png',
    },
    {
        type: 3,
        name: 'RESTful APIs',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/rest.png',
    },
    {
        type: 3,
        name: 'Authentication',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/auth.png',
    },
    {
        type: 3,
        name: 'OAuth 2.0',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/oauth.png',
    },
    {
        type: 3,
        name: 'Object-Oriented Programming (OOP)',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/oop.png',
    },
    {
        type: 3,
        name: 'Concurrency & Multithreadding',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/conc.png',
    },
    {
        type: 3,
        name: 'Data Structures & Algorithms',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/dsa.png',
    },
    {
        type: 3,
        name: 'Database Design',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/dd.png',
    },
    {
        type: 3,
        name: 'Continuous Integration & Continuous Delivery (CI/CD)',
        yoe: '0.5',
        desc: '',
        icon: '/assets/skills/cicd.png',
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
        name: 'Dashboard and Applicant Manager',
        slug: 'dashboard-applicant-manager',
        scale: 1,
        date: 'Sep. 2024 – Nov. 2024',
        span: '3 months',
        desc: '• Full-stack dashboard built with Ruby on Rails and PostgreSQL for task management and application tracking\n• Advanced data filtering and analytics for WorkWell Partnership staff',
        skills: {
            HTML: 0,
            CSS: 0,
            Ruby: 0,
            SQL: 0,
            Rails: 1,
            Boostrap: 1,
            PostgreSQL: 2,
            'Agile Development': 4,
        },
        github: '',
        artifacts: {},
        contribution:
            'Led backend development including database schema design, Rails controllers, and complex SQL queries for analytics dashboards.',
    },
    {
        name: 'Video Sharing Service',
        slug: 'video-sharing-service',
        scale: 1,
        date: 'Oct. 2025 – Nov. 2024',
        span: '1 month',
        desc: '• Engineered a full stack application with a responsive frontend using React, Next.js, and TypeScript, to enable smooth video browsing and playback\n• Constructed a scalable Node.js backend with Docker for efficient deployment and streamlined uploads and processing\n• Integrated Google Cloud for storage and Firebase authentication API for secure and reliable user login\n• Built a modular system architecture for maintenance, scalability, and independent development across components',
        skills: {
            HTML: 0,
            CSS: 0,
            TypeScript: 0,
            React: 1,
            'Next.js': 1,
            'Node.js': 1,
            'Express.js': 1,
            'Google Cloud': 2,
            Firebase: 2,
            Docker: 2,
            DevOps: 4,
            Backend: 4,
        },
        github: 'https://github.com/BryanWieschenberg/Video-Sharing-Service',
        artifacts: {
            repoUrl: 'https://github.com/BryanWieschenberg/Video-Sharing-Service',
        },
        contribution:
            'Built the complete backend (Node.js API, Docker containers, GCP integration) and contributed to the Next.js frontend.',
    },
    {
        name: 'Livestock Metrics Visualization App',
        slug: 'livestock-metrics',
        scale: 1,
        date: 'Feb. 2024 – Apr. 2024',
        span: '3 months',
        desc: '• Created a web application with PostgreSQL and Flask to enable stakeholders to effectively manage a goat ranch\n• Designed insightful SQL views and queries to identify trends and uncover correlations between key factors\n• Added dynamic visualization to present results from 20+ years of data, improving interaction and data interpretation',
        skills: {
            HTML: 0,
            CSS: 0,
            SQL: 0,
            Flask: 1,
            PostgreSQL: 2,
            'Full-Stack': 4,
        },
        github: 'https://github.com/BryanWieschenberg/Livestock-Metrics-Visualization-App',
        artifacts: {
            repoUrl: 'https://github.com/BryanWieschenberg/Livestock-Metrics-Visualization-App',
        },
        contribution:
            'Owned the database layer (schema, views, complex analytical queries) and Flask backend; contributed to frontend visualizations.',
    },
    {
        name: 'Neural Networks',
        slug: 'neural-networks',
        scale: 2,
        date: 'Jun. 2025',
        span: '3 days',
        desc: '• Built a CNN in PyTorch to classify images, trained on the MNIST dataset\n• Developed an RNN to detect spam messages using NLP techniques\n• Visualized training performance and accuracy using Matplotlib',
        skills: {
            Python: 0,
            PyTorch: 1,
            Matplotlib: 1,
            CNNs: 4,
            'Image Classification': 4,
            RNNs: 4,
            NLP: 4,
        },
        github: 'https://github.com/BryanWieschenberg/Neural-Networks',
        artifacts: {
            repoUrl: 'https://github.com/BryanWieschenberg/Neural-Networks',
        },
        contribution:
            'Independently designed, trained, and evaluated both neural network architectures from scratch.',
    },
    {
        name: 'Command Line Shell Interface',
        slug: 'cli-shell',
        scale: 2,
        date: 'Feb. 2025',
        span: '2 weeks',
        desc: '• CLI built in C leveraging system calls (fork(), exec()) to emulate Linux shell commands\n• Supports I/O redirection, piping, and arrow key navigation for command history',
        skills: { C: 0, Bash: 0, Termios: 1, 'Parent/Child Processes': 4 },
        github: '',
        artifacts: {},
        contribution:
            'Sole developer — implemented the full shell including process management, I/O redirection, piping, and terminal control.',
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
    {
        name: 'Hackathon Event Scheduler',
        slug: 'hackathon-scheduler',
        scale: 2,
        date: 'Sep. 2024',
        span: '3 weeks',
        desc: '• Developed a Hackathon scheduler in Ruby, utilizing room and event CSV data to generate optimized scheduling plans\n• Implemented automated room allocation and conflict detection, keeping track of capacity, equipment, and event type',
        skills: { Ruby: 0 },
        github: 'https://github.com/BryanWieschenberg/Hackathon-Scheduling-Tool',
        artifacts: {
            repoUrl: 'https://github.com/BryanWieschenberg/Hackathon-Scheduling-Tool',
        },
        contribution:
            'Built the scheduling algorithm, conflict detection, and CSV parsing engine from scratch.',
    },
    {
        name: 'Amazon Web Scraper',
        slug: 'amazon-web-scraper',
        scale: 2,
        date: 'Oct. 2023',
        span: '2 weeks',
        desc: '• Automated web scraper using Python and Selenium for Amazon data extraction\n• Analyzes reviewer bias and creates trusted final conclusions on products',
        skills: { Python: 0, Selenium: 1, 'Beautiful Soup': 1, 'Web Scraping': 4 },
        github: 'https://github.com/BryanWieschenberg/Amazon-Web-Scraper',
        artifacts: {
            repoUrl: 'https://github.com/BryanWieschenberg/Amazon-Web-Scraper',
        },
        contribution:
            'Solo-developed the scraping pipeline, bias analysis algorithm, and result aggregation.',
    },
    {
        name: 'Turtle Stack',
        slug: 'turtle-stack',
        scale: 2,
        date: 'Feb. 2025',
        span: '24 hours',
        desc: '• Hackathon game built in Python featuring real-time turtle stacking mechanics\n• Implemented dynamic difficulty and unique turtle properties to create a challenging yet addicting experience',
        skills: { Python: 0, Pygame: 1, 'Game Development': 4 },
        github: 'https://github.com/BryanWieschenberg/Turtle-Stack',
        artifacts: {
            repoUrl: 'https://github.com/BryanWieschenberg/Turtle-Stack',
        },
        contribution:
            'Designed and coded all game mechanics, physics, difficulty scaling, and visual assets within 24 hours.',
    },
    {
        name: 'Computer Lab Finder',
        slug: 'computer-lab-finder',
        scale: 2,
        date: 'Oct. 2024',
        span: '2 days',
        desc: '• Python-based tool for locating TCNJ computer labs by analyzing room occupancy and class/event schedules\n• Outputs availability and scheduling data with an easy-to-read format',
        skills: { Python: 0 },
        github: 'https://github.com/BryanWieschenberg/Computer-Lab-Finder',
        artifacts: {
            repoUrl: 'https://github.com/BryanWieschenberg/Computer-Lab-Finder',
        },
        contribution: 'Sole developer — built the scheduling parser and availability engine.',
    },
    {
        name: 'AVL Tree Data Analyzer',
        slug: 'avl-tree-analyzer',
        scale: 2,
        date: 'Apr. 2023',
        span: '1 week',
        desc: '• Built an extremely optimized and fast AVL tree in C++ in a team of two other students, which analyzes large data sets of randomly-generated names and social security numbers\n• The user can choose which data set they want to be analyzed using the command line, spanning from 15 lines of data to 500,000 lines, with each line containing the operation needed to be performed on that line of data, along with the corresponding name and social security number\n• Implemented three operations for data in the set: insertion, delete, and retrieval, with each line telling the program which operation to perform',
        skills: { 'C++': 0, 'AVL Trees': 4 },
        github: 'https://github.com/BryanWieschenberg/AVL-Tree-Data-Analyzer',
        artifacts: {
            repoUrl: 'https://github.com/BryanWieschenberg/AVL-Tree-Data-Analyzer',
        },
        contribution:
            'Led AVL tree implementation including rotation logic, balancing, and performance optimization for 500K+ records.',
    },
    {
        name: 'Matrix Word Scanner',
        slug: 'matrix-word-scanner',
        scale: 2,
        date: 'Feb. 2023',
        span: '5 days',
        desc: '• Planned and executed a program built in C++ to scan a matrix of any size in a 2-dimensional array and use the command line to find any amount of words of any length listed and color the successfully found words red\n• Can search for any words listed in the command line after the name of the executable, followed by <, then the matrix file name',
        skills: { 'C++': 0 },
        github: 'https://github.com/BryanWieschenberg/Matrix-Word-Scanner',
        artifacts: {
            repoUrl: 'https://github.com/BryanWieschenberg/Matrix-Word-Scanner',
        },
        contribution:
            'Sole developer — designed the matrix traversal algorithm and ANSI color output system.',
    },
    {
        name: 'Name Frequency Analyzer',
        slug: 'name-frequency-analyzer',
        scale: 2,
        date: 'Nov. 2022',
        span: '5 days',
        desc: '• Designed and implemented a program built in Java that analyzes baby name popularities in public data given by the Social Security Administration\n• Sorted a dataset of 2,052,781 lines, with each consisting of names, genders, and number of occurrences through every male and female name with two to fifteen characters from the year 1880 to 2021, and ranked each name by popularity for each year through an optimized object-oriented algorithmn\n• Created six seamless search functions for the user',
        skills: { Java: 0, 'Object-Oriented Programming': 4 },
        github: 'https://github.com/BryanWieschenberg/Name-Frequency-Analyzer',
        artifacts: {
            repoUrl: 'https://github.com/BryanWieschenberg/Name-Frequency-Analyzer',
        },
        contribution:
            'Sole developer — built the data parser, sorting algorithms, and all six search functions from scratch.',
    },
];
