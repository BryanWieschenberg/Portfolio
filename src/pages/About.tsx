import React, { useState, useMemo } from 'react';
import {
    skills,
    SkillCategory,
    Skill,
    courses,
    projects,
    experience,
    Project,
    Experience,
    ProficiencyLevel,
} from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SwipeReveal from '../components/SwipeReveal';
import { getSkillIconPath, getSkillIconFallback } from '../lib/utils';
import InteractiveFace from '../components/InteractiveFace';
import {
    FaGamepad,
    FaMusic,
    FaHiking,
    FaDumbbell,
    FaChess,
    FaBrain,
    FaFilter,
    FaSearch,
    FaTimes,
    FaChevronDown,
    FaCheck,
    FaChevronUp,
    FaRocket,
    FaTable,
    FaThList,
} from 'react-icons/fa';

interface SkillWithUsage extends Skill {
    category: SkillCategory;
    usedInProjects: Project[];
    usedInExperience: Experience[];
}

const allSkills: SkillWithUsage[] = Object.entries(skills).flatMap(([category, skillList]) =>
    skillList.map((s) => {
        const usedInProjects = projects.filter(
            (p) =>
                p.top_skills.includes(s.name) ||
                Object.values(p.skills).some((catSkills) =>
                    Object.keys(catSkills).includes(s.name),
                ),
        );
        const usedInExperience = experience.filter(
            (e) =>
                e.top_skills.includes(s.name) ||
                Object.values(e.skills).some((catSkills) =>
                    Object.keys(catSkills).includes(s.name),
                ),
        );
        return {
            ...s,
            category: category as SkillCategory,
            usedInProjects,
            usedInExperience,
        };
    }),
);

const allCategories: SkillCategory[] = [
    'Languages',
    'Frontend',
    'Backend',
    'Data',
    'Infra/Devops',
    'Python Libraries',
    'AI Tooling',
    'Soft Skills',
];

const allProficiencies: ProficiencyLevel[] = ['Advanced', 'Proficient', 'Familiar'];

const toggleChip = <T,>(list: T[], item: T, setList: React.Dispatch<React.SetStateAction<T[]>>) => {
    if (list.includes(item)) {
        setList(list.filter((i) => i !== item));
    } else {
        setList([...list, item]);
    }
};

const About: React.FC = () => {
    const { theme } = useTheme();
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Filter states
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<SkillCategory[]>([]);
    const [selectedProficiency, setSelectedProficiency] = useState<ProficiencyLevel[]>([]);
    const [selectedUsedIn, setSelectedUsedIn] = useState<string[]>([]);
    const [showUsedInDropdown, setShowUsedInDropdown] = useState(false);
    const usedInDropdownRef = React.useRef<HTMLDivElement>(null);

    // Sort and View states
    const [sortBy, setSortBy] = useState<'featured' | 'proficiency' | 'used' | 'alphabetical'>(
        'featured',
    );
    const [sortAsc, setSortAsc] = useState(true);
    const [viewMode, setViewMode] = useState<'compact' | 'expanded'>('compact');

    React.useEffect(() => {
        const timer = setTimeout(() => setIsInitialLoad(false), 700);
        return () => clearTimeout(timer);
    }, []);

    React.useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                usedInDropdownRef.current &&
                !usedInDropdownRef.current.contains(event.target as Node)
            ) {
                setShowUsedInDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hasActiveFilters =
        debouncedQuery !== '' ||
        selectedCategories.length > 0 ||
        selectedProficiency.length > 0 ||
        selectedUsedIn.length > 0;

    const clearFilters = () => {
        setSearchQuery('');
        setDebouncedQuery('');
        setSelectedCategories([]);
        setSelectedProficiency([]);
        setSelectedUsedIn([]);
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
                delay: isInitialLoad ? 0.6 : 0,
            },
        },
    };

    const skillGridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.02 },
        },
    };

    const skillVariants = {
        hidden: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.25, ease: 'easeOut' },
        },
    };

    const filteredSkillsList = useMemo(() => {
        return allSkills
            .filter((skill) => {
                if (
                    debouncedQuery &&
                    !skill.name.toLowerCase().includes(debouncedQuery.toLowerCase())
                )
                    return false;
                if (selectedCategories.length > 0 && !selectedCategories.includes(skill.category))
                    return false;
                if (
                    selectedProficiency.length > 0 &&
                    !selectedProficiency.includes(skill.proficiency)
                )
                    return false;

                if (selectedUsedIn.length > 0) {
                    const usedInNames = [
                        ...skill.usedInProjects.map((p) => p.name),
                        ...skill.usedInExperience.map((e) => e.role), // Using company or role
                    ];
                    if (!selectedUsedIn.some((u) => usedInNames.includes(u))) return false;
                }

                return true;
            })
            .sort((a, b) => {
                let res = 0;
                if (sortBy === 'featured') {
                    const indexA = allSkills.indexOf(a);
                    const indexB = allSkills.indexOf(b);
                    res = indexA - indexB;
                } else if (sortBy === 'alphabetical') {
                    res = a.name.localeCompare(b.name);
                } else if (sortBy === 'proficiency') {
                    const profWeight: Record<ProficiencyLevel, number> = {
                        Familiar: 1,
                        Proficient: 2,
                        Advanced: 3,
                    };
                    res = profWeight[a.proficiency] - profWeight[b.proficiency];
                } else if (sortBy === 'used') {
                    const countA = a.usedInProjects.length + a.usedInExperience.length;
                    const countB = b.usedInProjects.length + b.usedInExperience.length;
                    res = countA - countB;
                }
                return sortAsc ? res : -res;
            });
    }, [
        allSkills,
        debouncedQuery,
        selectedCategories,
        selectedProficiency,
        selectedUsedIn,
        sortBy,
        sortAsc,
    ]);

    const allUsedInOptions = useMemo(() => {
        return [...projects.map((p) => p.name), ...experience.map((e) => e.role)];
    }, [projects, experience]);

    const p = 'text-body';
    const heading = 'section-heading-lg';
    const subheading = 'section-subheading-lg';
    const divider = 'divider-lg';

    const interests = [
        { icon: <FaDumbbell />, label: 'Fitness & lifting' },
        { icon: <FaMusic />, label: 'Music production' },
        { icon: <FaGamepad />, label: 'Competitive gaming' },
        { icon: <FaChess />, label: 'Strategy games' },
        { icon: <FaHiking />, label: 'Hiking & outdoors' },
        { icon: <FaBrain />, label: 'Psychology' },
    ];

    return (
        <>
            <div className="page-hero">
                <SwipeReveal
                    circleColor="bg-gradient-to-r from-[#3c86ff] to-[#69f1ff]"
                    shadowColor="shadow-[0_0_50px_rgba(60,134,255,0.6)]"
                    duration={0.6}
                >
                    <h1 className="page-title">About Me</h1>
                </SwipeReveal>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="page-subtitle"
                >
                    Here's who I actually am:
                </motion.p>
            </div>

            <div className="page-section -mt-2">
                <div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                        className="flex flex-col gap-8 lg:gap-12 w-full !max-w-4xl mx-auto"
                    >
                        {/* Top row with Image & First Text block */}
                        <div className="flex flex-col lg:flex-row gap-10 items-center lg:justify-between w-full">
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <motion.div
                                        animate={{
                                            scale: [0.9, 0.96, 0.9],
                                            opacity: [0.15, 0.45, 0.15],
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                        className="absolute -inset-2 bg-gradient-to-r from-[#3c86ff] to-[#69f1ff] rounded-2xl blur-lg"
                                    />
                                    <InteractiveFace
                                        src={
                                            theme === 'light'
                                                ? '/images/photo-light.png'
                                                : '/images/photo-dark.png'
                                        }
                                        theme={theme}
                                    />
                                </div>
                            </div>

                            <div className="flex-1 max-w-xl text-center">
                                <p
                                    className={`text-xl lg:text-2xl leading-relaxed lg:leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                                >
                                    I build things that{' '}
                                    <span
                                        className={`font-bold underline ${theme === 'light' ? 'text-sky-500' : 'text-sky-300'}`}
                                    >
                                        just work
                                    </span>
                                    . Fast response times, airtight security, and systems that hold
                                    up under real load are what I care about. If it's slow or
                                    insecure, it's not getting shipped.
                                </p>
                            </div>
                        </div>

                        {/* Bottom Text Row */}
                        <div className="w-full">
                            <p
                                className={`text-lg lg:text-xl leading-relaxed lg:leading-relaxed text-center lg:text-justify ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                            >
                                I'm currently focused on full-stack product work. I build things
                                that solve real friction, including better productivity workflows,
                                genuinely helpful AI integration, and replacements for tools that
                                have no business being as bad as they are. I have a long list of
                                projects I want to ship, so I'm not slowing down anytime soon!
                            </p>
                        </div>
                    </motion.div>

                    <div className={divider} />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                    >
                        <h2
                            className={`text-4xl lg:text-6xl font-bold mb-4 text-center 
                                ${theme === 'light' ? 'text-slate-900 drop-shadow-[4px_4px_2px_rgba(80,140,255,0.45)]' : 'text-white drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                        >
                            Education
                        </h2>

                        <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-10 md:gap-12 w-full">
                            <div className="flex-1 w-full text-center lg:text-left ">
                                <h3 className={subheading}>The College of New Jersey</h3>
                                <p className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-sky-400">
                                    B.S. Computer Science
                                </p>
                                <div
                                    className={`text-base lg:text-lg font-medium mt-2 mb-5 block ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}
                                >
                                    <p>Class of 2026 • Senior</p>
                                    <p>
                                        GPA: <span className="font-light">3.43/4.0</span>
                                    </p>
                                </div>
                                <p
                                    className={`text-base lg:text-sm leading-relaxed mb-6 ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}
                                >
                                    TCNJ's CS program has equipped me with the technical proficiency
                                    and intellectual depth to make a strong impact in building
                                    end-to-end systems that solve real problems. Its rigorous
                                    academic foundations, hands-on learning experiences, innovative
                                    research, and collaborative culture have prepared me to make a
                                    strong difference in the technology industry.
                                </p>
                            </div>

                            <div className="flex-shrink-0 w-32 h-32 md:w-56 md:h-56 lg:w-64 lg:h-64 flex justify-center items-center">
                                <img
                                    src="/images/education.png"
                                    alt="TCNJ"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <h4
                                className={`text-base lg:text-lg font-semibold mb-3 text-center lg:text-left ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}
                            >
                                Relevant Coursework:
                            </h4>
                            <div className="grid grid-cols-3 gap-1.5 md:gap-3">
                                {courses.map((course, i) => (
                                    <div
                                        key={i}
                                        className={`leading-tight p-1.5 sm:p-2 md:px-4 md:py-3 rounded-lg border flex items-center justify-center lg:justify-start gap-1 sm:gap-1.5 md:gap-3 text-center lg:text-left transition-transform hover:scale-105 cursor-default
                                            ${
                                                theme === 'light'
                                                    ? 'bg-slate-50 border-slate-200 text-slate-700'
                                                    : 'bg-slate-800/40 border-slate-700/50 text-slate-300'
                                            }`}
                                    >
                                        <span
                                            className={`text-[10px] sm:text-xs md:text-lg flex-shrink-0 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                                        >
                                            {course.icon}
                                        </span>
                                        <span className="text-[5px] sm:text-[10px] md:text-xs lg:text-sm font-medium">
                                            {course.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <div className={divider} />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                        className="space-y-6"
                    >
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <h2
                                className={`text-4xl lg:text-6xl font-bold mb-4 text-center 
                                ${theme === 'light' ? 'text-slate-900 drop-shadow-[4px_4px_2px_rgba(80,140,255,0.45)]' : 'text-white drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                            >
                                Skills
                            </h2>

                            {/* Filter toggle & View toggles */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                {/* Sort buttons */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <button
                                        onClick={() => {
                                            if (sortBy === 'featured') setSortAsc(!sortAsc);
                                            else setSortBy('featured');
                                        }}
                                        className={`sort-btn ${sortBy === 'featured' ? 'active' : ''}`}
                                    >
                                        Featured{' '}
                                        {sortBy === 'featured' &&
                                            (sortAsc ? (
                                                <FaChevronUp size={9} />
                                            ) : (
                                                <FaChevronDown size={9} />
                                            ))}
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (sortBy === 'proficiency') setSortAsc(!sortAsc);
                                            else setSortBy('proficiency');
                                        }}
                                        className={`sort-btn ${sortBy === 'proficiency' ? 'active' : ''}`}
                                    >
                                        Proficiency{' '}
                                        {sortBy === 'proficiency' &&
                                            (sortAsc ? (
                                                <FaChevronUp size={9} />
                                            ) : (
                                                <FaChevronDown size={9} />
                                            ))}
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (sortBy === 'used') setSortAsc(!sortAsc);
                                            else setSortBy('used');
                                        }}
                                        className={`sort-btn ${sortBy === 'used' ? 'active' : ''}`}
                                    >
                                        Most Used{' '}
                                        {sortBy === 'used' &&
                                            (sortAsc ? (
                                                <FaChevronUp size={9} />
                                            ) : (
                                                <FaChevronDown size={9} />
                                            ))}
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (sortBy === 'alphabetical') setSortAsc(!sortAsc);
                                            else setSortBy('alphabetical');
                                        }}
                                        className={`sort-btn ${sortBy === 'alphabetical' ? 'active' : ''}`}
                                    >
                                        A-Z{' '}
                                        {sortBy === 'alphabetical' &&
                                            (sortAsc ? (
                                                <FaChevronUp size={9} />
                                            ) : (
                                                <FaChevronDown size={9} />
                                            ))}
                                    </button>
                                </div>

                                <div
                                    className={`hidden sm:block w-px h-5 mx-1 ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-600'}`}
                                />

                                <div className="toggle-pill bg-slate-100 dark:bg-slate-800/50">
                                    <button
                                        onClick={() => setViewMode('compact')}
                                        className={`px-3 py-1.5 rounded transition-colors ${viewMode === 'compact' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-500 hover:text-blue-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                    >
                                        <FaTable size={12} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('expanded')}
                                        className={`px-3 py-1.5 rounded transition-colors ${viewMode === 'expanded' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-500 hover:text-blue-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                    >
                                        <FaThList size={12} />
                                    </button>
                                </div>

                                <div
                                    className={`w-px h-5 mx-1 ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-600'}`}
                                />

                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`sort-btn ${showFilters || hasActiveFilters ? 'active' : ''}`}
                                >
                                    <FaFilter size={10} />
                                    Filters
                                    {hasActiveFilters ? (
                                        <span className="ml-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">
                                            {[
                                                debouncedQuery ? 1 : 0,
                                                selectedCategories.length ? 1 : 0,
                                                selectedProficiency.length ? 1 : 0,
                                                selectedUsedIn.length ? 1 : 0,
                                            ].reduce((a, b) => a + b, 0)}
                                        </span>
                                    ) : null}
                                </button>
                            </div>
                        </div>

                        {/* Filter Panel */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative z-10"
                                >
                                    <div className="filter-panel">
                                        <div className="flex justify-between items-center mb-4">
                                            <span
                                                className={`text-xl lg:text-2xl font-semibold ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                                            >
                                                Filters
                                            </span>
                                            {hasActiveFilters && (
                                                <button
                                                    onClick={clearFilters}
                                                    className={`text-xs flex items-center gap-1 ${theme === 'light' ? 'text-slate-400 hover:text-red-500' : 'text-slate-500 hover:text-red-400'} transition-colors`}
                                                >
                                                    <FaTimes size={10} />
                                                    Clear all
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3">
                                            {/* Row 1 */}
                                            <div>
                                                <p className="filter-label">Search</p>
                                                <div className="relative">
                                                    <FaSearch
                                                        size={12}
                                                        className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}
                                                    />
                                                    <input
                                                        type="text"
                                                        value={searchQuery}
                                                        onChange={(e) =>
                                                            setSearchQuery(e.target.value)
                                                        }
                                                        placeholder="Search skills..."
                                                        className="filter-input"
                                                        style={{ paddingLeft: '2rem' }}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <p className="filter-label">Proficiency Level</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {allProficiencies.map((prof) => (
                                                        <button
                                                            key={prof}
                                                            onClick={() =>
                                                                toggleChip(
                                                                    selectedProficiency,
                                                                    prof,
                                                                    setSelectedProficiency,
                                                                )
                                                            }
                                                            className={`filter-chip ${selectedProficiency.includes(prof) ? 'active' : ''}`}
                                                        >
                                                            {prof}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="lg:row-span-3">
                                                <p className="filter-label">Used In</p>
                                                <div className="relative" ref={usedInDropdownRef}>
                                                    <button
                                                        onClick={() =>
                                                            setShowUsedInDropdown(
                                                                !showUsedInDropdown,
                                                            )
                                                        }
                                                        className="filter-input text-left flex items-center justify-between"
                                                    >
                                                        <span
                                                            className={
                                                                selectedUsedIn.length
                                                                    ? ''
                                                                    : theme === 'light'
                                                                      ? 'text-slate-400'
                                                                      : 'text-slate-500'
                                                            }
                                                        >
                                                            {selectedUsedIn.length
                                                                ? `${selectedUsedIn.length} selected`
                                                                : 'Select projects...'}
                                                        </span>
                                                        <FaChevronDown
                                                            size={10}
                                                            className={`transition-transform ${showUsedInDropdown ? 'rotate-180' : ''}`}
                                                        />
                                                    </button>
                                                    {showUsedInDropdown && (
                                                        <div
                                                            className={`absolute z-50 mt-1 w-full rounded-lg border max-h-52 overflow-y-auto ${theme === 'light' ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-800 border-slate-600 shadow-2xl'}`}
                                                        >
                                                            {allUsedInOptions.map((opt) => (
                                                                <button
                                                                    key={opt}
                                                                    onClick={() =>
                                                                        toggleChip(
                                                                            selectedUsedIn,
                                                                            opt,
                                                                            setSelectedUsedIn,
                                                                        )
                                                                    }
                                                                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center gap-2 ${
                                                                        selectedUsedIn.includes(opt)
                                                                            ? theme === 'light'
                                                                                ? 'bg-blue-50 text-blue-600'
                                                                                : 'bg-blue-900/30 text-blue-400'
                                                                            : theme === 'light'
                                                                              ? 'text-slate-600 hover:bg-slate-50'
                                                                              : 'text-slate-300 hover:bg-slate-700/50'
                                                                    }`}
                                                                >
                                                                    <div
                                                                        className={`w-3 h-3 rounded flex items-center justify-center border ${selectedUsedIn.includes(opt) ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}
                                                                    >
                                                                        {selectedUsedIn.includes(
                                                                            opt,
                                                                        ) && <FaCheck size={8} />}
                                                                    </div>
                                                                    {opt}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                {selectedUsedIn.length > 0 && (
                                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                                        {selectedUsedIn.map((opt) => (
                                                            <span
                                                                key={opt}
                                                                onClick={() =>
                                                                    toggleChip(
                                                                        selectedUsedIn,
                                                                        opt,
                                                                        setSelectedUsedIn,
                                                                    )
                                                                }
                                                                className={`px-2.5 py-1 rounded-md text-xs font-medium border whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                                                                    theme === 'light'
                                                                        ? 'bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300'
                                                                        : 'bg-slate-800/50 text-slate-300 border-slate-600/50 hover:border-slate-500'
                                                                }`}
                                                            >
                                                                {opt}{' '}
                                                                <FaTimes
                                                                    size={10}
                                                                    className="ml-1"
                                                                />
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Row 2 */}
                                            <div className="col-span-1 md:col-span-2">
                                                <p className="filter-label">Category</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {allCategories.map((cat) => (
                                                        <button
                                                            key={cat}
                                                            onClick={() =>
                                                                toggleChip(
                                                                    selectedCategories,
                                                                    cat,
                                                                    setSelectedCategories,
                                                                )
                                                            }
                                                            className={`filter-chip ${selectedCategories.includes(cat) ? 'active' : ''}`}
                                                        >
                                                            {cat}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Rendering Skills */}
                        {filteredSkillsList.length === 0 ? (
                            <div
                                className={`py-12 text-center ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}
                            >
                                No skills match your filters.
                            </div>
                        ) : viewMode === 'compact' ? (
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-50px' }}
                                variants={skillGridVariants}
                                className={`w-full rounded-xl border ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0f1117] border-slate-800'}`}
                            >
                                {allCategories.map((cat) => {
                                    const catSkills = filteredSkillsList.filter(
                                        (s) => s.category === cat,
                                    );
                                    if (catSkills.length === 0) return null;
                                    return (
                                        <div
                                            key={cat}
                                            className={`flex flex-col md:flex-row border-b last:border-b-0 ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}
                                        >
                                            <div
                                                className={`md:w-32 lg:w-40 p-4 shrink-0 flex items-center md:border-r ${theme === 'light' ? 'bg-slate-50/50 text-slate-500 border-slate-200' : 'bg-[#151821] text-slate-400 border-slate-800'}`}
                                            >
                                                <h3 className="text-xs uppercase tracking-widest font-bold">
                                                    {cat}
                                                </h3>
                                            </div>
                                            <div className="flex-1 p-2 flex flex-wrap gap-1 md:gap-1.5 items-center">
                                                <AnimatePresence mode="popLayout">
                                                    {catSkills.map((skill) => (
                                                        <motion.div
                                                            variants={skillVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="hidden"
                                                            layout
                                                            key={skill.name}
                                                            className="group relative"
                                                        >
                                                            <div
                                                                className={`px-2.5 py-1 rounded-md text-xs font-medium border whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 hover:cursor-default ${
                                                                    theme === 'light'
                                                                        ? 'bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300'
                                                                        : 'bg-slate-800/50 text-slate-300 border-slate-600/50 hover:border-slate-500'
                                                                }`}
                                                            >
                                                                <img
                                                                    src={getSkillIconPath(
                                                                        skill.name,
                                                                        theme,
                                                                    )}
                                                                    alt={skill.name}
                                                                    className="w-[18px] h-[18px] object-contain flex-shrink-0"
                                                                    onError={(e) => {
                                                                        const img =
                                                                            e.target as HTMLImageElement;
                                                                        const fallback =
                                                                            getSkillIconFallback(
                                                                                skill.name,
                                                                            );
                                                                        img.src = img.src.endsWith(
                                                                            fallback,
                                                                        )
                                                                            ? '/skills/default.png'
                                                                            : fallback;
                                                                    }}
                                                                />
                                                                {skill.name}
                                                            </div>

                                                            {/* Hover Tooltip/Popover */}
                                                            <div
                                                                className={`absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 min-w-[200px] w-max max-w-[280px] p-3 text-sm font-normal rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-[100] whitespace-normal pointer-events-none text-left border ${
                                                                    theme === 'light'
                                                                        ? 'bg-white text-slate-700 border-slate-200/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]'
                                                                        : 'bg-[#111318] text-slate-300 border-slate-700/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]'
                                                                }`}
                                                            >
                                                                <div className="flex items-start justify-between mb-2">
                                                                    <h4
                                                                        className={`font-bold text-base ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                                                                    >
                                                                        {skill.name}
                                                                    </h4>
                                                                    <span
                                                                        className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                                                                            skill.proficiency ===
                                                                            'Advanced'
                                                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                                                                                : skill.proficiency ===
                                                                                    'Proficient'
                                                                                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                                                                                  : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                                                                        }`}
                                                                    >
                                                                        {skill.proficiency}
                                                                    </span>
                                                                </div>
                                                                <p
                                                                    className={`text-xs mb-3 leading-relaxed whitespace-normal ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}
                                                                >
                                                                    {skill.description}
                                                                </p>

                                                                {(skill.usedInProjects.length > 0 ||
                                                                    skill.usedInExperience.length >
                                                                        0) && (
                                                                    <div>
                                                                        <p
                                                                            className={`text-[10px] font-semibold uppercase tracking-wider mb-1.5 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}
                                                                        >
                                                                            Used In:
                                                                        </p>
                                                                        <div className="flex flex-wrap gap-1">
                                                                            {skill.usedInProjects.map(
                                                                                (p) => (
                                                                                    <span
                                                                                        key={p.name}
                                                                                        className={`text-[10px] px-1.5 py-0.5 rounded border whitespace-nowrap ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-700/50 border-slate-600 text-slate-300'}`}
                                                                                    >
                                                                                        {p.name}
                                                                                    </span>
                                                                                ),
                                                                            )}
                                                                            {skill.usedInExperience.map(
                                                                                (e) => (
                                                                                    <span
                                                                                        key={e.role}
                                                                                        className={`text-[10px] px-1.5 py-0.5 rounded border whitespace-nowrap ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-700/50 border-slate-600 text-slate-300'}`}
                                                                                    >
                                                                                        {e.role}
                                                                                    </span>
                                                                                ),
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <div className="flex flex-col gap-12 lg:gap-16">
                                {allCategories.map((cat) => {
                                    const catSkills = filteredSkillsList.filter(
                                        (s) => s.category === cat,
                                    );
                                    if (catSkills.length === 0) return null;

                                    return (
                                        <div key={cat} className="space-y-4 lg:space-y-6">
                                            <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                                                <h3
                                                    className={`text-sm lg:text-base font-bold uppercase tracking-widest ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}
                                                >
                                                    {cat}
                                                </h3>
                                                <span
                                                    className={`text-xs px-2 py-0.5 rounded-full ${theme === 'light' ? 'bg-slate-100 text-slate-500' : 'bg-slate-800 text-slate-400'}`}
                                                >
                                                    {catSkills.length}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                                                {catSkills.map((skill) => (
                                                    <div
                                                        key={skill.name}
                                                        className={`flex flex-col gap-4 p-5 md:p-6 rounded-xl border transition-colors hover:shadow-sm ${theme === 'light' ? 'bg-white border-slate-200 hover:border-blue-200' : 'bg-[#151821] border-slate-800 hover:border-blue-500/30'}`}
                                                    >
                                                        <div className="flex gap-4 items-center">
                                                            <div
                                                                className={`w-12 h-12 flex-shrink-0 rounded-lg flex items-center justify-center border shadow-sm ${theme === 'light' ? 'bg-slate-50 border-slate-100' : 'bg-slate-800/50 border-slate-700/50'}`}
                                                            >
                                                                <img
                                                                    src={getSkillIconPath(
                                                                        skill.name,
                                                                        theme,
                                                                    )}
                                                                    alt={skill.name}
                                                                    className="w-8 h-8 object-contain"
                                                                    onError={(e) => {
                                                                        const img =
                                                                            e.target as HTMLImageElement;
                                                                        const fallback =
                                                                            getSkillIconFallback(
                                                                                skill.name,
                                                                            );
                                                                        img.src = img.src.endsWith(
                                                                            fallback,
                                                                        )
                                                                            ? '/skills/default.png'
                                                                            : fallback;
                                                                    }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <h3
                                                                    className={`text-lg font-bold ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}
                                                                >
                                                                    {skill.name}
                                                                </h3>
                                                                <span
                                                                    className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${
                                                                        skill.proficiency ===
                                                                        'Advanced'
                                                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                                                                            : skill.proficiency ===
                                                                                'Proficient'
                                                                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                                                                              : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                                                                    }`}
                                                                >
                                                                    {skill.proficiency}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 space-y-3">
                                                            <p
                                                                className={`text-sm leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}
                                                            >
                                                                {skill.description}
                                                            </p>

                                                            {(skill.usedInProjects.length > 0 ||
                                                                skill.usedInExperience.length >
                                                                    0) && (
                                                                <div className="pt-2">
                                                                    <p
                                                                        className={`text-[10px] font-semibold uppercase tracking-wider mb-2 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}
                                                                    >
                                                                        Used In:
                                                                    </p>
                                                                    <div className="flex flex-wrap gap-1.5">
                                                                        {skill.usedInProjects.map(
                                                                            (p) => (
                                                                                <span
                                                                                    key={p.name}
                                                                                    className={`text-xs px-2.5 py-1 rounded-md border ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-800/80 border-slate-700 text-slate-300'}`}
                                                                                >
                                                                                    {p.name}
                                                                                </span>
                                                                            ),
                                                                        )}
                                                                        {skill.usedInExperience.map(
                                                                            (e) => (
                                                                                <span
                                                                                    key={e.role}
                                                                                    className={`text-xs px-2.5 py-1 rounded-md border ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-slate-800/80 border-slate-700 text-slate-300'}`}
                                                                                >
                                                                                    {e.role}
                                                                                </span>
                                                                            ),
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>

                    <div className={divider} />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                        className="space-y-5"
                    >
                        <h2 className={heading}>Beyond the Code</h2>
                        <p className={p}>
                            I'm not just a terminal. Outside of coding, I'm usually in the gym,
                            producing music, gaming competitively, or going down some rabbit hole
                            about psychology or decision-making. I believe the best engineers are
                            curious about everything — not just tech.
                        </p>
                        <p className={p}>
                            I also manage a team of 15 in campus housing operations, which has
                            taught me more about communication, accountability, and crisis
                            management than any CS course could. Leading people and building
                            software exercise the same muscle: figure out what matters, cut the
                            noise, and execute.
                        </p>

                        <div className="flex flex-wrap gap-3 mt-4">
                            {interests.map((item, i) => (
                                <motion.span
                                    key={i}
                                    whileHover={{ scale: 1.06 }}
                                    className="interest-pill"
                                >
                                    <span className="text-base">{item.icon}</span>
                                    {item.label}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <div className={divider} />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                        className="text-center space-y-3"
                    >
                        <FaRocket className="mx-auto text-3xl icon-accent" />
                        <h2 className={subheading}>Let's Build Something</h2>
                        <p className="text-body max-w-xl mx-auto">
                            If you're working on hard problems with a team that cares about craft,
                            I'd love to talk. I bring velocity, ownership, and no ego.
                        </p>
                    </motion.div>
                </div>
            </div>

            <br />
            <br />
        </>
    );
};

export default About;
