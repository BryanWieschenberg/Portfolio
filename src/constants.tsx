// PROJECT FORMAT:
// name
// date
// optional(span), if its ongoing, the span is inferred by calculating today - init month
// optional(github)
// optional(website url)
// optional: role (if group)
// optional: role desc (if group)
// intro
// desc
// feats
// res
// skills (with categories as keys)

// imgs aren't included in constants.tsx. they're deterministically taken from their respective /public/artifacts/projects/<name_normalized_from_/lib/utils.ts>. the icon lives in icon.png, and in individual project pages, the images section shows every image that isn't icon.png

type SkillMap = {
    [skill: string]: string;
};

type SkillCategories = {
    [category: string]: SkillMap;
};

export interface Project {
    name: string;
    date: string;
    span?: string;
    github?: string;
    url?: string;
    role?: string;
    role_desc?: string;
    hook: string;
    top_skills: string[];
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
    | 'Python Libraries'
    | 'Infrastructure & DevOps'
    | 'AI Tooling'
    | 'Soft Skills';

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
        hook: 'Discover how research actually connects with this visualizer that turns 200k+ academic papers into an explorable, dynamic citation graph. Sub-50ms API latency and 200+ requests/sec throughput.',
        top_skills: ['Next.js', 'TypeScript', 'MongoDB', 'Neo4j', 'Gemini', 'Python'],
        intro: 'I was researching quantum computing, which is a niche field where finding relevant academic findings meant digging through noisy, flat search results with no way to see how they connected. So I built Stellar Papers!',
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
                'NextAuth.js': 'Authentication, session management, and OAuth provider integration',
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
        hook: 'Unify tasks and calendars into a single high-performance workspace designed for security, speed, and productivity, achieving sub-30ms API latency and defense-in-depth authentication across 10+ security measures.',
        top_skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS'],
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
                'Framer Motion':
                    'Smooth animations and micro-interactions that improve perceived responsiveness',
            },

            Backend: {
                'Next.js API Routes':
                    'Server-side API endpoints integrated directly into the Next.js application',
                TypeScript: 'Type safety for backend logic and data handling',
                'NextAuth.js':
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
        hook: 'Rust-powered LAN chat system combining a state-driven TUI, RBAC command infrastructure, and end-to-end encrypted messaging, achieving 3ms round-trip latency and 3.8k operations/sec throughput.',
        top_skills: ['Rust', 'ratatui', 'RSA', 'Argon2'],
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
                'RSA-OAEP': 'Asymmetric encryption scheme enabling end-to-end encrypted messaging',
            },
            Data: {
                JSON: 'Serde-based serialization for human-readable persistent state without requiring an external database',
            },
        },
    },
    {
        name: 'When2Meet-Analyzer',
        date: 'Nov. 2025',
        span: '2 weeks',
        github: 'https://github.com/BryanWieschenberg/When2Meet-Analyzer',
        hook: 'Automated scheduling engine that converts When2Meet availability data into optimized, constraint-aware staff schedules, achieving a 100% fill rate with sub-second schedule generation.',
        top_skills: ['Python', 'Pandas', 'RegEx'],
        intro: 'I had to manually schedule staff across 40+ day periods, dealing with conflicting availability, constraints, and fairness concerns. The process was slow, error-prone, and biased. So I built When2Meet Analyzer.',
        desc: 'An automated scheduling engine that scrapes availability data from When2Meet and applies a weighted heuristic algorithm to generate optimized staff schedules. It handles complex constraints, shift capacities, preferences, and fairness requirements with fully deterministic results.',
        feats: '• Dynamic State Extraction: Uses advanced RegEx to parse embedded JavaScript and extract raw When2Meet availability data without relying on DOM scraping\n• Weighted Heuristic Engine: Multi-factor scoring algorithm balancing hour caps, fairness/diversity, and employee preferences\n• Fully Configurable: Constraints, scoring weights, and shift capacities adjustable through a simple configuration file\n• Schedule Report Generation: Outputs structured CSV reports showing assignments and full coverage visibility',
        res: '• 100% Coverage: Achieves perfect coverage across complex month-long schedules with consistent 100% fill rates\n• Sub-Second Execution: Processes 2,000+ availability slots and generates full schedule reports in ~650ms\n• Error-Free Scheduling: Zero assignment errors or bias detected compared to manual scheduling',
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
        intro: 'As Operations Manager, I oversee key distribution, access control, and office workflow for a branch of the Residential Education & Housing department serving 3,000+ on-campus residents. I lead a team of 15 staff while managing shift scheduling, performance evaluations, and daily operations.',
        desc: 'Beyond day-to-day responsibilities, I focus on identifying operational bottlenecks and building systems that improve efficiency and accuracy. Many processes, including key distribution tracking and staff scheduling, were previously manual and error-prone, so I implemented structured logging systems and automation tools to streamline operations.',
        feats: '• Key Distribution & Tracking: Implemented a logging system capturing every key transaction, staff member involved, and relevant details while training staff on tools previously limited to management\n• Scheduling Automation: Built a Python-based scheduling engine that scrapes availability data and applies weighted heuristics to generate optimized schedules\n• Configurable System Design: Enabled non-technical staff to adjust constraints such as shift caps, preferences, and fairness weights through a JSON configuration file\n• Conflict Resolution: Serve on a rotating duty schedule, handling on-call situations and resolving resident and operational conflicts',
        res: '• 40% Error Reduction: Significantly reduced key distribution errors through improved logging systems and staff training\n• 70% Scheduling Time Reduction: Scheduling that previously took hours now completes in under a second\n• 100% Coverage: Consistently achieved full shift coverage while maintaining fairness and balance across staff assignments',
        skills: {
            Core: {
                Python: 'Built automation tools and scheduling engine to optimize staff coverage and reduce manual work',
                RegEx: 'Pattern matching used to parse availability data and extract scheduling information',
            },
            Data: {
                Pandas: 'Data analysis library used to structure availability data and compute schedule assignments',
                CSV: 'Portable format used for exporting schedule reports and operational data',
                JSON: 'Configuration format enabling non-technical staff to modify scheduling constraints and weights',
            },
            Tools: {
                'Google Sheets':
                    'Collaborative spreadsheet tool used for operational tracking and team coordination',
                'Microsoft Excel': 'Used for storing transaction logs and departmental records',
            },
        },
    },
    {
        role: 'Machine Learning Researcher',
        company: 'The College of New Jersey',
        date: 'May 2025',
        span: '2.5 months',
        hook: 'Built a vision-driven pipeline enabling autonomous robotic navigation by training a CNN that improved perception accuracy by 50% and reduced manual operator intervention by 25%.',
        top_skills: ['Python', 'PyTorch', 'OpenCV'],
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
                'Primary language for all frontend and most backend work, used across every web project.',
        },
        {
            name: 'JavaScript',
            proficiency: 'Advanced',
            description:
                'Foundation of my web development experience before adopting TypeScript full-time.',
        },
        {
            name: 'Python',
            proficiency: 'Advanced',
            description:
                'Go-to language for ML pipelines, data processing, scripting, and automation tools.',
        },
        {
            name: 'SQL',
            proficiency: 'Proficient',
            description:
                'Used for relational data modeling, complex queries, and schema design across multiple projects.',
        },
        {
            name: 'Rust',
            proficiency: 'Familiar',
            description:
                'Explored for its performance and memory safety guarantees in systems-level contexts.',
        },
        {
            name: 'Bash',
            proficiency: 'Proficient',
            description:
                'Used for scripting, automation, and managing Linux-based development environments.',
        },
    ],
    Frontend: [
        {
            name: 'React',
            proficiency: 'Advanced',
            description:
                'Core framework for building dynamic, component-driven UIs across my web projects.',
        },
        {
            name: 'Next.js',
            proficiency: 'Advanced',
            description:
                'Used for full-stack web applications, leveraging server-side rendering and API routes.',
        },
        {
            name: 'Tailwind CSS',
            proficiency: 'Advanced',
            description:
                'Primary styling approach for building clean, responsive interfaces quickly.',
        },
        {
            name: 'Motion',
            proficiency: 'Proficient',
            description:
                'Used to add fluid animations and transitions that elevate the feel of web interfaces.',
        },
        {
            name: 'HTML',
            proficiency: 'Advanced',
            description: 'Foundational markup language underlying all of my frontend work.',
        },
        {
            name: 'CSS',
            proficiency: 'Advanced',
            description:
                'Used for custom styling and layout beyond what utility frameworks provide.',
        },
        {
            name: 'TanStack Start',
            proficiency: 'Familiar',
            description:
                'Explored as a modern full-stack React framework for type-safe routing and data fetching.',
        },
    ],
    Backend: [
        {
            name: 'Node.js',
            proficiency: 'Advanced',
            description:
                'Runtime powering most of my backend services, APIs, and server-side logic.',
        },
        {
            name: 'Express.js',
            proficiency: 'Advanced',
            description:
                'Used to build RESTful APIs with custom middleware, routing, and request handling.',
        },
        {
            name: 'Fastify',
            proficiency: 'Proficient',
            description:
                'Adopted for performance-critical backend services where throughput and low latency matter.',
        },
        {
            name: 'Auth.js',
            proficiency: 'Proficient',
            description:
                'Implemented for session-based authentication with social sign-in support in web projects.',
        },
        {
            name: 'Better Auth',
            proficiency: 'Proficient',
            description:
                'Used as a modern, flexible auth solution with fine-grained control over security policies.',
        },
        {
            name: 'OAuth 2.0',
            proficiency: 'Proficient',
            description:
                'Implemented social authentication flows and token-based authorization across multiple projects.',
        },
    ],
    Data: [
        {
            name: 'PostgreSQL',
            proficiency: 'Proficient',
            description:
                'Primary relational database used for structured data storage across web applications.',
        },
        {
            name: 'Drizzle',
            proficiency: 'Proficient',
            description:
                'Type-safe ORM used for schema definition, migrations, and database queries in TypeScript projects.',
        },
        {
            name: 'MongoDB',
            proficiency: 'Proficient',
            description:
                'Used for flexible, document-based storage in projects requiring dynamic or unstructured data.',
        },
        {
            name: 'Neo4j',
            proficiency: 'Proficient',
            description:
                'Graph database used to store and query citation-based relationships across 200,000+ academic papers.',
        },
        {
            name: 'Redis',
            proficiency: 'Proficient',
            description:
                'Used for caching, session storage, and performance optimization in high-throughput applications.',
        },
    ],
    'Python Libraries': [
        {
            name: 'NumPy',
            proficiency: 'Proficient',
            description:
                'Used for high-performance matrix operations and numerical computing in ML and vision pipelines.',
        },
        {
            name: 'Pandas',
            proficiency: 'Proficient',
            description:
                'Used for organizing, analyzing, and manipulating structured datasets across data and ML projects.',
        },
        {
            name: 'Matplotlib',
            proficiency: 'Proficient',
            description:
                'Used to visualize training performance, accuracy curves, and spatial data outputs.',
        },
        {
            name: 'PyTorch',
            proficiency: 'Proficient',
            description:
                'Deep learning framework used for CNN architecture, training, and optimization in robotics research.',
        },
        {
            name: 'scikit-learn',
            proficiency: 'Familiar',
            description:
                'Used for classical ML techniques, model evaluation, and preprocessing workflows.',
        },
        {
            name: 'OpenCV',
            proficiency: 'Proficient',
            description:
                'Used to build preprocessing and data collection pipelines for autonomous robotic navigation.',
        },
    ],
    'Infrastructure & DevOps': [
        {
            name: 'Git',
            proficiency: 'Advanced',
            description:
                'Used for version control across every project, including branching, merging, and code review workflows.',
        },
        {
            name: 'GitHub',
            proficiency: 'Advanced',
            description:
                'Primary platform for source control, project management, and open source collaboration.',
        },
        {
            name: 'Docker',
            proficiency: 'Proficient',
            description:
                'Used for containerizing applications and ensuring consistent environments across development and production.',
        },
        {
            name: 'AWS',
            proficiency: 'Familiar',
            description:
                'Used for cloud infrastructure, storage, and deploying scalable backend services.',
        },
        {
            name: 'Vercel',
            proficiency: 'Proficient',
            description:
                'Primary deployment platform for Next.js and frontend projects, with CI/CD out of the box.',
        },
        {
            name: 'Linux',
            proficiency: 'Proficient',
            description:
                'Daily development environment, particularly for ML workloads, ROS, and server management.',
        },
    ],
    'AI Tooling': [
        {
            name: 'Claude Code',
            proficiency: 'Familiar',
            description:
                'Primary AI coding assistant for accelerating development, debugging, and architectural decisions.',
        },
        {
            name: 'Cursor',
            proficiency: 'Familiar',
            description:
                'AI-powered editor used to streamline development workflows and code generation.',
        },
        {
            name: 'Google Antigravity',
            proficiency: 'Proficient',
            description:
                "Google's agent-first IDE for delegating complex tasks to autonomous AI agents that can plan, code, and verify across editor, terminal, and browser.",
        },
    ],
    'Soft Skills': [
        {
            name: 'Communication',
            proficiency: 'Advanced',
            description:
                'Developed through leading a team of 15, providing feedback, resolving conflicts, and coordinating across departments.',
        },
        {
            name: 'Collaboration',
            proficiency: 'Advanced',
            description:
                'Practiced across research, team leadership, and cross-functional project work.',
        },
        {
            name: 'Problem Solving',
            proficiency: 'Advanced',
            description:
                'Core to every project — from debugging distributed systems to identifying workflow bottlenecks in operations.',
        },
        {
            name: 'Leadership',
            proficiency: 'Advanced',
            description:
                'Demonstrated through managing a 15-person team, running scheduling, evaluations, and day-to-day operations.',
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
