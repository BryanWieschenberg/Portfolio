import {
    FaLaptopCode,
    FaDatabase,
    FaChartBar,
    FaNetworkWired,
    FaServer,
    FaMicrochip,
    FaProjectDiagram,
    FaPuzzlePiece,
    FaLightbulb,
    FaDumbbell,
    FaUtensils,
    FaGamepad,
} from 'react-icons/fa';

type SkillMap = {
    [skill: string]: string;
};

type SkillCategories = {
    [category: string]: SkillMap;
};

export type ProjectScale = 'S' | 'M' | 'L' | 'XL';
export type ProjectType = 'Web App' | 'CLI Tool' | 'Automation';
export type ProjectStatus = 'Completed' | 'Maintained' | 'In Progress';

export type Concepts =
    | 'Auth/Security'
    | 'API Design'
    | 'DB Design'
    | 'AI/ML'
    | 'Full-Stack'
    | 'Frontend'
    | 'Backend'
    | 'Infra/DevOps'
    | 'Data Processing'
    | 'Real-Time';

export interface Project {
    name: string;
    date: string;
    span?: string;
    github?: string;
    url?: string;
    role?: string;
    role_desc?: string;
    scale: ProjectScale;
    type: ProjectType;
    status: ProjectStatus;
    hook: string;
    top_skills: string[];
    concepts?: Concepts[];
    artifacts?: string[];
    intro: string;
    desc: string;
    feats: string;
    res: string;
    skills: SkillCategories;
}

export interface Experience {
    role: string;
    company: string;
    date: string;
    span?: string;
    hook: string;
    top_skills: string[];
    concepts?: Concepts[];
    artifacts?: string[];
    intro: string;
    desc: string;
    feats: string;
    res: string;
    skills: SkillCategories;
}

export type SkillCategory =
    | 'Languages'
    | 'Frontend'
    | 'Backend'
    | 'Data'
    | 'Infra/Devops'
    | 'Python Libraries'
    | 'AI Tooling'
    | 'Soft Skills';

export const courses = [
    {
        name: 'Software Engineering',
        icon: <FaLaptopCode />,
    },
    { name: 'Database Systems', icon: <FaDatabase /> },
    { name: 'Data Science', icon: <FaChartBar /> },
    {
        name: 'Computer Networking',
        icon: <FaNetworkWired />,
    },
    { name: 'Operating Systems', icon: <FaServer /> },
    {
        name: 'Computer Architecture',
        icon: <FaMicrochip />,
    },
    {
        name: 'Data Structures & Algorithms',
        icon: <FaProjectDiagram />,
    },
    {
        name: 'Discrete Structures',
        icon: <FaPuzzlePiece />,
    },
    {
        name: 'Computational Problem Solving',
        icon: <FaLightbulb />,
    },
];

export const interests = [
    {
        name: 'Fitness',
        icon: <FaDumbbell />,
        description:
            'I love weightlifting, going on walks, and hiking, they just make me feel alive! I hate running, but I still make myself do it.',
    },
    {
        name: 'Cooking',
        icon: <FaUtensils />,
        description: 'I’ve always been a food lover, and really enjoy creating different cuisines!',
    },
    {
        name: 'Gaming',
        icon: <FaGamepad />,
        description: 'I love old-school platformers and RPGs.',
    },
    {
        name: 'Creating',
        icon: <FaLightbulb />,
        description:
            'I’m currently planning a YouTube channel around tech, coding, and project creation. The goal is to make CS feel accessible and fun, where I learn new things, build cool stuff, and try to tell an engaging story alongside it!',
    },
];

export type ProficiencyLevel = 'Familiar' | 'Proficient' | 'Advanced';

export interface Skill {
    name: string;
    proficiency: ProficiencyLevel;
    description: string;
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

export const projects: Project[] = [
    {
        name: 'Stellar Papers',
        date: 'Feb. 2026',
        span: '1 week',
        github: 'https://github.com/AidanS39/stellar-papers',
        url: 'https://stellarpapers.vercel.app',
        role: 'Technical Lead',
        role_desc:
            'In a team of 4, I led the architectural decisions and tech stack of the system. I also managed key decisions involving both the frontend and backend, as well as the account functionality.',
        scale: 'L',
        type: 'Web App',
        status: 'Maintained',
        hook: 'Discover how research actually connects with this visualizer that turns 200k+ academic papers into an explorable, dynamic citation graph. Sub-50ms API latency and 200+ requests/sec throughput.',
        top_skills: ['Next.js', 'TypeScript', 'MongoDB', 'Neo4j', 'Google Gemini', 'Python'],
        concepts: [
            'Full-Stack',
            'Frontend',
            'Backend',
            'DB Design',
            'API Design',
            'Auth/Security',
            'AI/ML',
            'Data Processing',
            'Infra/DevOps',
        ],
        artifacts: [
            'Academic Paper Graph Visualization',
            'Inspecting Papers',
            'Filtering and Bookmarks',
            'AI Analysis',
            'System Architecture',
            'Hackathon Photo (Won "Best Use of MongoDB Atlas")',
        ],
        intro: 'I was researching quantum computing, which is a niche field where finding relevant academic findings meant digging through noisy, flat search results with no way to see how they connected. Additionally, I had a hackathon coming up, so I used it to build Stellar Papers!',
        desc: 'An interactive citation graph of academic papers. Instead of lists, you explore relationships, and see which papers are foundational, how topics actually connect, and where cross-disciplinary links exist.',
        feats: '• Interactive Paper Graph: Physics-based graph capable of rendering thousands of paper nodes at once\n• Dynamic Filtering: Filter by topic, year, citations, author, and field to narrow results instantly\n• Secure Accounts: Secure account authentication and personal bookmarking\n• AI-Powered Analysis: Intelligent insights surfaced directly from graph results\n• Highly Optimized Performance: Caching, indexing, and optimized graph queries throughout',
        res: '• Massive Dataset: 200,000+ academic papers preprocessed and into a graph database, with connections based of citations\n• Blazing Fast API: Sub-50ms average API latency under concurrent load\n• High Throughput: 200+ requests/second under concurrent load, an 8x improvement over initial implementation',
        skills: {
            Frontend: {
                'Next.js App Router':
                    'Full-stack React framework enabling a single-repo architecture',
                React: 'Component-based UI used to manage the complex interactive state of the graph interface',
                TypeScript:
                    'Static typing to catch errors at build time and improve maintainability',
                'Tailwind CSS': 'Utility-first styling framework for rapid UI development',
            },
            Backend: {
                'Next.js API Routes':
                    'Server-side API endpoints built directly into the Next.js application',
                TypeScript: 'Type safety for backend logic and data handling',
                'Auth.js': 'Authentication, session management, and OAuth provider integration',
                'Node.js': 'Server-side runtime executing backend logic',
            },
            Data: {
                MongoDB: 'NoSQL database used for user accounts and bookmarks',
                Neo4j: 'Graph database storing academic papers and citation relationships',
                Cypher: 'Query language used to retrieve and traverse graph relationships',
                Python: 'Data preprocessing pipeline used to transform and load academic datasets',
            },
            External: {
                'Google Gemini':
                    'AI model used to convert natural language queries into graph insights',
                'Google reCAPTCHA': 'Bot protection for authentication and signup forms',
                'OpenAlex API':
                    'Large-scale academic paper data source used to populate the graph database',
                'OAuth 2.0': 'Secure authentication protocol used for Google and GitHub sign-in',
            },
            Deployment: {
                Vercel: 'Serverless deployment platform optimized for Next.js with built-in CI/CD and edge caching',
            },
        },
    },
    {
        name: 'GoalGetter',
        date: 'Aug. 2025 - Jan. 2026',
        span: '6 months',
        github: 'https://github.com/BryanWieschenberg/GoalGetter',
        url: 'https://goalgetter.dev/',
        scale: 'L',
        type: 'Web App',
        status: 'Completed',
        hook: 'Unify tasks and calendars into a single high-performance workspace designed for security, speed, and productivity, achieving sub-30ms API latency and defense-in-depth authentication across 10+ security measures.',
        top_skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS'],
        concepts: [
            'Full-Stack',
            'Frontend',
            'Backend',
            'DB Design',
            'API Design',
            'Auth/Security',
            'Infra/DevOps',
        ],
        artifacts: [
            'Split-Screen Workspace',
            'Creating an Event',
            'Smart Deadline Indicators',
            'System Architecture',
        ],
        intro: 'I was tired of context-switching between task managers and calendar apps, losing time managing which tool I needed instead of actually getting things done. So I built GoalGetter.',
        desc: 'A unified productivity workspace combining tasks and calendar in a single split-screen interface. It removes tab-switching friction and mirrors how people naturally manage workloads by letting tasks and schedules coexist in the same workspace.',
        feats: '• Split-Screen Workspace: Dynamic resizable split-screen UI allowing tasks and calendar to be viewed and interacted with simultaneously\n• Fully-Featured Organization: Unlimited tasks, categories, tags, and calendars with due dates, priority levels, colors, sorting, filtering, and search\n• Smart Scheduling: Calendar events with recurrence support and automated deadline alerts\n• Enterprise-Grade Security: Social sign-in, bot protection, rate limiting, and email verification built into authentication\n• Highly Optimized Performance: Caching, indexing, pagination, prefetching, debouncing, and query optimization across the stack',
        res: '• Lightning Fast API: Sub-30ms API latency with 50,000+ entities stress-tested, a 70% improvement over the initial implementation\n• Near-Instant Load Times: ~110ms initial load time via optimized payloads, a 65% improvement\n• Airtight Security: Defense-in-depth authentication with 10+ layered protections securing user accounts',
        skills: {
            Frontend: {
                'Next.js App Router':
                    'Full-stack React framework enabling a unified frontend/backend architecture',
                React: 'Component-based UI managing the complex state of the split-screen productivity interface',
                TypeScript: 'Static typing for improved reliability and maintainability',
                'Tailwind CSS': 'Utility-first CSS framework for rapid UI styling',
                Motion: 'Smooth animations and micro-interactions that improve perceived responsiveness',
            },

            Backend: {
                'Next.js API Routes':
                    'Server-side API endpoints integrated directly into the Next.js application',
                TypeScript: 'Type safety for backend logic and data handling',
                'Auth.js':
                    'Authentication system providing session management and OAuth provider integration',
                'Node.js': 'Runtime executing backend application logic',
            },

            Data: {
                PostgreSQL:
                    'Relational database ensuring integrity for complex task and calendar relationships',
                SQL: 'Query language used for relational data retrieval and manipulation',
                Redis: 'High-speed in-memory store used for caching and rate limiting',
            },

            External: {
                'Google reCAPTCHA': 'Bot protection for authentication and account creation flows',
                'OAuth 2.0': 'Secure authentication protocol enabling Google and GitHub sign-in',
                Resend: 'Transactional email delivery used for account verification',
            },

            Deployment: {
                'AWS EC2':
                    'Cloud compute infrastructure providing scalable and secure application hosting',
            },
        },
    },
    {
        name: 'StreamLine',
        date: 'Jul. 2025 - Aug. 2025',
        span: '2 months',
        github: 'https://github.com/BryanWieschenberg/StreamLine',
        scale: 'M',
        type: 'CLI Tool',
        status: 'Completed',
        hook: 'Rust-powered LAN chat system combining a state-driven TUI, RBAC command infrastructure, and end-to-end encrypted messaging, achieving 3ms round-trip latency and 3.8k operations/sec throughput.',
        concepts: ['Backend', 'Auth/Security', 'Real-Time'],
        top_skills: ['Rust', 'ratatui', 'RSA', 'Argon2'],
        artifacts: [
            'Registering an Account',
            'A Lively Chatroom',
            'Commands and Moderation',
            'End-to-End Encryption (Server-Side View of Messages as Ciphertext)',
            'System Architecture',
        ],
        intro: 'I challenged myself to learn Rust, end-to-end encryption, and terminal UI creation by building a LAN chat platform that would be extremely fast while putting full control in the user’s hands. So I built StreamLine.',
        desc: 'A production-grade terminal chat platform written entirely in Rust. It provides high-performance LAN messaging with zero external dependencies, end-to-end encryption, role-based access control, and a powerful command system, all wrapped in a responsive terminal interface.',
        feats: '• Terminal UI Engine: State-driven terminal interface with smart command completions and multi-panel rendering for rooms and user rosters\n• RBAC Command Dispatcher: Role-based command system supporting 50+ commands for account, moderation, and administration operations\n• End-to-End Encryption: Messages encrypted client-side so the server only handles ciphertext\n• Persistent State Storage: Local JSON-based persistence enabling seamless cross-session usage without external databases',
        res: '• Lightweight Concurrency: Handles 1,000+ simultaneous TCP connections while using only ~25MB RAM at peak\n• Near-Instant Latency: 3ms average round-trip time under 1,000 parallel clients\n• High Throughput: 3,800 operations/sec sustained on a single-threaded dispatcher\n• Rock-Solid Reliability: Zero dropped packets or connection failures during stress testing',
        skills: {
            Core: {
                Rust: 'Systems programming language providing compile-time memory safety and reliable high-concurrency performance',
                ratatui:
                    'State-driven terminal UI framework used to build the multi-panel chat interface',
            },
            Security: {
                Argon2: 'Industry-standard password hashing algorithm used for secure credential storage',
                RSA: 'Asymmetric encryption scheme enabling end-to-end encrypted messaging',
            },
            Data: {
                JSON: 'Serde-based serialization for human-readable persistent state without requiring an external database',
            },
        },
    },
    {
        name: 'When2Meet Analyzer',
        date: 'Nov. 2025',
        span: '2 weeks',
        github: 'https://github.com/BryanWieschenberg/When2Meet-Analyzer',
        scale: 'S',
        type: 'Automation',
        status: 'Completed',
        hook: 'Automated scheduling engine that converts When2Meet availability data into optimized, constraint-aware staff schedules, achieving a 100% fill rate with sub-second schedule generation.',
        concepts: ['Backend', 'Data Processing'],
        top_skills: ['Python', 'Pandas', 'RegEx'],
        artifacts: ['Generated Schedule Report'],
        intro: 'I had to manually schedule staff across 40+ day periods, dealing with conflicting availability, constraints, and fairness concerns. The process was slow, error-prone, and biased. So I built When2Meet Analyzer.',
        desc: 'An automated scheduling engine that scrapes availability data from When2Meet and applies a weighted heuristic algorithm to generate optimized staff schedules. It handles complex constraints, shift capacities, preferences, and fairness requirements with fully deterministic results.',
        feats: '• Dynamic State Extraction: Uses advanced RegEx to parse embedded JavaScript and extract raw When2Meet availability data without relying on DOM scraping\n• Weighted Heuristic Engine: Multi-factor scoring algorithm balancing hour caps, fairness/diversity, and employee preferences\n• Fully Configurable: Constraints, scoring weights, and shift capacities adjustable through a simple configuration file\n• Schedule Report Generation: Outputs structured CSV reports showing assignments and full coverage visibility',
        res: '• 100% Coverage: Achieves perfect coverage across complex month-long schedules with consistent 100% fill rates\n• Sub-Second Execution: Processes thousands of availability slots and generates full schedule reports in under 1 second\n• Error-Free Scheduling: Zero assignment errors or bias detected compared to manual scheduling',
        skills: {
            Core: {
                Python: 'Primary language used to build the scheduling engine and heuristic assignment system',
                RegEx: 'Pattern matching used to parse JavaScript state and extract raw When2Meet availability data',
            },
            Data: {
                Pandas: 'Data analysis library used to structure availability data and perform scheduling calculations',
                CSV: 'Portable schedule report output compatible with Excel and spreadsheet tools',
                JSON: 'Human-readable configuration format allowing constraints and scoring weights to be adjusted without modifying code',
            },
        },
    },
];

export const experience: Experience[] = [
    {
        role: 'Operations Manager',
        company: 'The College of New Jersey',
        date: 'Aug. 2025 - Present',
        hook: 'Leading operations for a residential housing office serving 3,000+ residents, managing a team of 15 staff while building automation tools that reduced scheduling time by 70% and cut operational errors by 40%.',
        top_skills: ['Python', 'Pandas', 'RegEx'],
        artifacts: ["It's me!", 'Group photo!'],
        intro: 'As Operations Manager, I oversee key distribution, access control, and office workflow for a branch of the Residential Education & Housing department serving 3,000+ on-campus residents. I lead a team of 15 staff while managing shift scheduling, performance evaluations, and daily operations.',
        desc: 'Beyond day-to-day responsibilities, I focus on identifying operational bottlenecks and building systems that improve efficiency and accuracy. Many processes, including key distribution tracking and staff scheduling, were previously manual and error-prone, so I implemented structured logging systems and automation tools to streamline operations.',
        feats: '• Key Distribution & Tracking: Implemented a logging system capturing every key transaction, staff member involved, and relevant details while training staff on tools previously limited to management\n• Scheduling Automation: Built a Python-based scheduling engine that scrapes availability data and applies weighted heuristics to generate optimized schedules\n• Configurable System Design: Enabled non-technical staff to adjust constraints such as shift caps, preferences, and fairness weights through a JSON configuration file\n• Conflict Resolution: Serve on a rotating duty schedule, handling on-call situations and resolving resident and operational conflicts',
        res: '• 40% Error Reduction: Significantly reduced key distribution errors through improved logging systems and staff training\n• 70% Scheduling Time Reduction: Scheduling that previously took hours now completes in under a second\n• 100% Coverage: Consistently achieved full shift coverage while maintaining fairness and balance across staff assignments',
        skills: {
            Core: {
                Python: 'Built automation tools and scheduling engine to optimize staff coverage and reduce manual work',
                RegEx: 'Pattern matching used to parse availability data and extract scheduling information',
                'Microsoft Excel': 'Used for storing transaction logs and departmental records',
            },
            Data: {
                Pandas: 'Data analysis library used to structure availability data and compute schedule assignments',
                CSV: 'Portable format used for exporting schedule reports and operational data',
                JSON: 'Configuration format enabling non-technical staff to modify scheduling constraints and weights',
            },
        },
    },
    {
        role: 'Machine Learning Researcher',
        company: 'The College of New Jersey',
        date: 'May 2025 - Jul. 2025',
        span: '2.5 months',
        hook: 'Built a vision-driven pipeline enabling autonomous robotic navigation by training a CNN that improved perception accuracy by 50% and reduced manual operator intervention by 25%.',
        top_skills: ['Python', 'PyTorch', 'OpenCV'],
        artifacts: ['Group photo!'],
        intro: 'As a Machine Learning Researcher, I designed and implemented a computer vision system enabling autonomous navigation across multiple robots, spanning the full pipeline from raw camera input and dataset creation to model training and real-time closed-loop actuation.',
        desc: 'I improved existing implementations by developing higher-quality models, expanding and refining the training dataset, and building a modular preprocessing pipeline that made data collection easier to scale and iterate on. The system handled the full workflow from spatial data extraction and camera calibration to ROS integration and multi-robot coordination.',
        feats: '• Computer Vision Pipeline: Built an OpenCV-based preprocessing and data collection system preparing high-quality inputs for model training\n• CNN Training & Optimization: Designed and trained a convolutional neural network in PyTorch using augmented real-world datasets for robust perception\n• Closed-Loop ROS Integration: Implemented a ROS pipeline translating CNN predictions into real-time robot actuation and coordinated multi-robot navigation',
        res: '• 50% Accuracy Improvement: Advanced preprocessing, augmentation, and CNN training techniques significantly improved perception reliability\n• 25% Reduction in Manual Intervention: Closed-loop autonomy reduced reliance on manual teleoperation\n• Production-Ready Pipeline: Deployable system functioning across multiple coordinated robots',
        skills: {
            Core: {
                Python: 'Primary language used across the full ML, vision, and robotics pipeline',
                ROS: 'Robotics middleware enabling real-time perception-to-actuation pipelines and multi-robot coordination',
                Ubuntu: 'Linux-based development environment optimized for ROS and machine learning workflows',
            },
            'ML & Vision': {
                PyTorch:
                    'Deep learning framework used to build, train, and optimize CNN architectures',
                OpenCV: 'Computer vision library for camera calibration, spatial extraction, and preprocessing',
            },
            Data: {
                NumPy: 'High-performance numerical computing for matrix and spatial operations',
                Pandas: 'Dataset organization and analysis for training and evaluation metrics',
                Matplotlib:
                    'Visualization of model performance, training curves, and spatial outputs',
            },
        },
    },
];

export const skills: Record<SkillCategory, Skill[]> = {
    Languages: [
        {
            name: 'TypeScript',
            proficiency: 'Advanced',
            description:
                'My primary language for production work, used across every web project in both the frontend and backend with full end-to-end type safety.',
        },
        {
            name: 'JavaScript',
            proficiency: 'Advanced',
            description:
                'The foundation my TypeScript knowledge is built on, with a deep understanding of the underlying language semantics, async patterns, and runtime behavior.',
        },
        {
            name: 'Python',
            proficiency: 'Advanced',
            description:
                'My other primary language, used across several projects and professional roles in a variety of different contexts, including data preprocessing for Neo4j in Stellar Papers, the full scheduling engine in my Operations Manager scheduling tool, the entire ML/vision pipeline in my ML Research role, and more.',
        },
        {
            name: 'SQL',
            proficiency: 'Proficient',
            description:
                'Used to query and manage PostgreSQL in GoalGetter and AskJet, handling complex relational data for users, tasks, categories, calendars, and recurrent events.',
        },
        {
            name: 'Rust',
            proficiency: 'Proficient',
            description:
                'Primary language for StreamLine, used to build a high-performance LAN chat system, terminal UI, and end-to-end encryption.',
        },
        {
            name: 'Bash',
            proficiency: 'Proficient',
            description:
                'Highly comfortable navigating and operating in the terminal across Linux environments, with working knowledge of shell scripting for automation tasks.',
        },
    ],
    Frontend: [
        {
            name: 'React',
            proficiency: 'Advanced',
            description:
                'Core UI framework for every web project, managing complex interactive state including a dynamic graph interface and a split-screen productivity workspace.',
        },
        {
            name: 'Next.js',
            proficiency: 'Advanced',
            description:
                'Used as the full-stack framework for both Stellar Papers and GoalGetter, leveraging both the App Router and API routes.',
        },
        {
            name: 'Tailwind CSS',
            proficiency: 'Advanced',
            description:
                'Primary styling approach across every web project for building responsive, consistent interfaces rapidly.',
        },
        {
            name: 'Motion',
            proficiency: 'Proficient',
            description:
                'Used in GoalGetter, AskJet, and this website to add smooth animations and micro-interactions that make the split-screen UI feel polished and responsive.',
        },
        {
            name: 'HTML',
            proficiency: 'Advanced',
            description:
                'Foundational markup language underlying all my frontend work, used throughout every web project.',
        },
        {
            name: 'CSS',
            proficiency: 'Proficient',
            description:
                'Solid understanding of core styling and layout principles, though I primarily work through Tailwind CSS over raw CSS.',
        },
        {
            name: 'TanStack Start',
            proficiency: 'Proficient',
            description:
                'Adopted as the full-stack framework for AskJet, leveraging its type-safe routing and server function model.',
        },
    ],
    Backend: [
        {
            name: 'Node.js',
            proficiency: 'Advanced',
            description:
                'Server-side runtime powering every web project, handling API logic and server-side execution.',
        },
        {
            name: 'Express.js',
            proficiency: 'Proficient',
            description:
                "Solid foundation in building RESTful APIs and middleware pipelines, though I've migrated toward more modern backend frameworks for recent projects.",
        },
        {
            name: 'Fastify',
            proficiency: 'Proficient',
            description:
                'Adopted as the primary backend framework in AskJet, chosen for its performance, schema validation, and modern plugin architecture.',
        },
        {
            name: 'Auth.js',
            proficiency: 'Advanced',
            description:
                'Used in both Stellar Papers and GoalGetter for JWT session management, OAuth 2.0 social sign-in, email verifications, and general auth flows.',
        },
        {
            name: 'Better Auth',
            proficiency: 'Proficient',
            description:
                'Integrated in AskJet as a flexible, modern auth solution for JWT session management, OAuth 2.0 social sign-in, email verifications, and general auth flows.',
        },
        {
            name: 'OAuth 2.0',
            proficiency: 'Proficient',
            description:
                'Implemented secure Google and GitHub social sign-in across Stellar Papers, GoalGetter, and AskJet.',
        },
    ],
    Data: [
        {
            name: 'PostgreSQL',
            proficiency: 'Advanced',
            description:
                "Relational database powering GoalGetter's data layer, ensuring integrity across complex task, category, tag, and calendar event relationships.",
        },
        {
            name: 'Drizzle',
            proficiency: 'Proficient',
            description:
                'Used in AskJet as a type-safe ORM for schema definition, migrations, and database queries in a TypeScript-first environment.',
        },
        {
            name: 'MongoDB',
            proficiency: 'Familiar',
            description:
                'Used in Stellar Papers for flexible NoSQL storage of user data and bookmarks alongside the graph database.',
        },
        {
            name: 'Neo4j',
            proficiency: 'Familiar',
            description:
                'Graph database at the core of Stellar Papers, storing and querying citation-based relationships across academic papers using Cypher.',
        },
        {
            name: 'Redis',
            proficiency: 'Proficient',
            description:
                'Used in GoalGetter for fast rate limiting and caching to improve API latency and support horizontal scaling.',
        },
    ],
    'Infra/Devops': [
        {
            name: 'Git',
            proficiency: 'Advanced',
            description:
                'Used in every project for version control, branching, and maintaining clean commit history across solo and collaborative work.',
        },
        {
            name: 'GitHub',
            proficiency: 'Advanced',
            description:
                'Primary platform for source control, project management, and collaboration across every project.',
        },
        {
            name: 'Docker',
            proficiency: 'Proficient',
            description:
                'Used across various side projects and adopted more heavily in AskJet for containerizing services and ensuring consistent environments across development and deployment.',
        },
        {
            name: 'AWS',
            proficiency: 'Proficient',
            description:
                'Deployed GoalGetter on AWS EC2 for reliable compute infrastructure with full control over scaling and security configuration.',
        },
        {
            name: 'Vercel',
            proficiency: 'Advanced',
            description:
                'Used to deploy Stellar Papers and this website with serverless hosting and with built-in CI/CD and edge caching.',
        },
        {
            name: 'Linux',
            proficiency: 'Advanced',
            description:
                'Daily environment, and used heavily during ML Research role to run ROS and ML frameworks like PyTorch within Ubuntu.',
        },
    ],
    'Python Libraries': [
        {
            name: 'NumPy',
            proficiency: 'Proficient',
            description:
                'Used in the robotics ML pipeline for matrix operations and numerical computing of spatial and image data.',
        },
        {
            name: 'Pandas',
            proficiency: 'Proficient',
            description:
                'Used across both the scheduling engine and ML Research for organizing, structuring, and analyzing datasets.',
        },
        {
            name: 'Matplotlib',
            proficiency: 'Proficient',
            description:
                'Used during ML Research to visualize training performance, accuracy curves, and spatial data outputs.',
        },
        {
            name: 'PyTorch',
            proficiency: 'Proficient',
            description:
                'Deep learning framework used to design, train, and optimize a CNN for autonomous robotic navigation.',
        },
        {
            name: 'Scikit-learn',
            proficiency: 'Familiar',
            description:
                'Used during Research for ML techniques, model evaluation utilities, and data preprocessing workflows.',
        },
        {
            name: 'OpenCV',
            proficiency: 'Proficient',
            description:
                'Used in the preprocessing and data collection pipeline for the robotics vision system, handling camera calibration and image preprocessing to feed high-quality inputs into the CNN, and applied during autonomous robot operation.',
        },
        {
            name: 'PyGame',
            proficiency: 'Proficient',
            description:
                'Used to build a responsive, session-persistent flashcard study app with a dynamic UI that scales fluidly with window resizing and real-time HUD tracking.',
        },
    ],
    'AI Tooling': [
        {
            name: 'Google Antigravity',
            proficiency: 'Proficient',
            description:
                'Agent-first IDE for delegating complex, multi-step tasks to autonomous agents that can plan, code, and verify across editor, terminal, and browser environments simultaneously.',
        },
        {
            name: 'Claude Code',
            proficiency: 'Proficient',
            description:
                'Agentic coding tool used for accelerating development, handling complex refactors, and navigating large codebases with high autonomy.',
        },
        {
            name: 'Cursor',
            proficiency: 'Familiar',
            description: 'Used in a variety of projects as an AI-powered editor.',
        },
    ],
    'Soft Skills': [
        {
            name: 'Communication',
            proficiency: 'Advanced',
            description:
                'Developed across various experiences, including leading a 15-person team as Operations Manager, coordinating with a teammate during ML research, and directing a 4-person team as Technical Lead on Stellar Papers, all requiring clear feedback, delegation, and cross-functional coordination.',
        },
        {
            name: 'Collaboration',
            proficiency: 'Advanced',
            description:
                'Practiced as Technical Lead in a 4-person team on Stellar Papers, and through ongoing cross-functional coordination in my Operations Manager role.',
        },
        {
            name: 'Problem Solving',
            proficiency: 'Advanced',
            description:
                'Core to every project, from identifying scheduling bottlenecks in GoalGetter to architecting a graph database system for 200,000+ academic papers in Stellar Papers and building a closed-loop robotics pipeline from scratch.',
        },
        {
            name: 'Leadership',
            proficiency: 'Advanced',
            description:
                'Demonstrated through managing a 15-person team and building internal tooling as Operations Manager, driving architectural decisions as Technical Lead on Stellar Papers, and independently designing and shipping multiple production systems end-to-end.',
        },
    ],
};

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
