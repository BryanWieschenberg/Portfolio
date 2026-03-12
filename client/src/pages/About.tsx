import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
    interests,
} from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SwipeReveal from '../components/SwipeReveal';
import SkillTooltipWrapper from '../components/SkillTooltipWrapper';
import { getSkillIconPath, getSkillIconFallback, normalizeTitle } from '../lib/utils';
import InteractiveFace from '../components/InteractiveFace';
import {
    FaFilter,
    FaSearch,
    FaTimes,
    FaChevronDown,
    FaCheck,
    FaChevronUp,
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
    const navigate = useNavigate();
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

    const courseGridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
        },
    };

    const skillVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: 'easeOut' },
        },
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut', delay: isInitialLoad ? 0.6 : 0 },
        },
    };

    const filteredSkillsList = useMemo(() => {
        return allSkills
            .filter((skill) => {
                if (
                    debouncedQuery &&
                    !skill.name.toLowerCase().includes(debouncedQuery.toLowerCase())
                ) {
                    return false;
                }
                if (selectedCategories.length > 0 && !selectedCategories.includes(skill.category)) {
                    return false;
                }
                if (
                    selectedProficiency.length > 0 &&
                    !selectedProficiency.includes(skill.proficiency)
                ) {
                    return false;
                }

                if (selectedUsedIn.length > 0) {
                    const usedInNames = [
                        ...skill.usedInProjects.map((p) => p.name),
                        ...skill.usedInExperience.map((e) => e.role), // Using company or role
                    ];
                    if (!selectedUsedIn.some((u) => usedInNames.includes(u))) {
                        return false;
                    }
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

    const subheading = 'section-subheading-lg';
    const divider = 'divider';

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
                                className={`text-lg lg:text-xl leading-relaxed lg:leading-relaxed text-center ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                            >
                                I'm currently focused on full-stack product work. I build things
                                that solve real friction, including better productivity workflows,
                                genuinely helpful AI integration, and replacements for tools that
                                have no business being as bad as they are. I have a long list of
                                projects I want to ship, so I'm not slowing down anytime soon!
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={sectionVariants}
                        className={divider}
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={sectionVariants}
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
                                    className={`text-base lg:text-sm leading-relaxed mb-6 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}
                                >
                                    TCNJ's transformative CS program has equipped me with the
                                    technical proficiency and intellectual depth to make a strong
                                    impact in building end-to-end systems that solve real problems.
                                    Its rigorous academic foundations, hands-on learning
                                    experiences, innovative research, and collaborative culture have
                                    prepared me to make a strong difference in the technology
                                    industry.
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
                            <motion.div
                                variants={courseGridVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-50px' }}
                                className="grid grid-cols-3 gap-1.5 md:gap-3"
                            >
                                {courses.map((course, i) => (
                                    <motion.div
                                        variants={skillVariants}
                                        key={i}
                                        whileHover={{ scale: 1.05 }}
                                        className={`leading-tight p-1.5 sm:p-2 md:px-4 md:py-3 rounded-lg border flex items-center justify-start gap-1 sm:gap-1.5 md:gap-3 text-center lg:text-left cursor-default
                                            ${
                                                theme === 'light'
                                                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:border-blue-300'
                                                    : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:shadow-[0_0_15px_rgba(96,165,250,0.2)] hover:border-blue-500/50'
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
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={sectionVariants}
                        className={divider}
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={sectionVariants}
                        className="space-y-6"
                    >
                        <h2
                            className={`text-4xl lg:text-6xl font-bold mb-4 text-center 
                            ${theme === 'light' ? 'text-slate-900 drop-shadow-[4px_4px_2px_rgba(80,140,255,0.45)]' : 'text-white drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                        >
                            Skills
                        </h2>

                        <div className="flex flex-col items-center gap-4">
                            {/* Filter toggle & View toggles */}
                            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
                                {/* Sort buttons */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <button
                                        onClick={() => {
                                            if (sortBy === 'featured') {
                                                setSortAsc(!sortAsc);
                                            } else {
                                                setSortBy('featured');
                                            }
                                        }}
                                        className={`sort-btn ${sortBy === 'featured' ? 'active' : ''}`}
                                    >
                                        Featured{' '}
                                        {sortBy === 'featured' &&
                                            (sortAsc ? (
                                                <FaChevronDown size={9} />
                                            ) : (
                                                <FaChevronUp size={9} />
                                            ))}
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (sortBy === 'proficiency') {
                                                setSortAsc(!sortAsc);
                                            } else {
                                                setSortBy('proficiency');
                                                setSortAsc(false);
                                            }
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
                                            if (sortBy === 'used') {
                                                setSortAsc(!sortAsc);
                                            } else {
                                                setSortBy('used');
                                                setSortAsc(false);
                                            }
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
                                            if (sortBy === 'alphabetical') {
                                                setSortAsc(!sortAsc);
                                            } else {
                                                setSortBy('alphabetical');
                                                setSortAsc(true);
                                            }
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

                                <div
                                    className={`flex rounded-lg overflow-hidden border p-0.5 ${theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-800/50 border-slate-700/50'}`}
                                >
                                    <button
                                        onClick={() => setViewMode('compact')}
                                        className={`px-3 py-1.5 rounded-md transition-all ${
                                            viewMode === 'compact'
                                                ? theme === 'light'
                                                    ? 'bg-white shadow-sm text-blue-600 font-bold'
                                                    : 'bg-slate-700 shadow-sm text-blue-400'
                                                : theme === 'light'
                                                  ? 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
                                        }`}
                                    >
                                        <FaTable size={12} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('expanded')}
                                        className={`px-3 py-1.5 rounded-md transition-all ${
                                            viewMode === 'expanded'
                                                ? theme === 'light'
                                                    ? 'bg-white shadow-sm text-blue-600 font-bold'
                                                    : 'bg-slate-700 shadow-sm text-blue-400'
                                                : theme === 'light'
                                                  ? 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
                                        }`}
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
                                            </div>

                                            {/* Selected Projects/Experience */}
                                            <div className="lg:row-span-3">
                                                <p className="filter-label">Selected</p>
                                                {selectedUsedIn.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5">
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
                                key="compact-view"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                className={`w-full rounded-xl border flex flex-col ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0f1117] border-slate-800'}`}
                            >
                                {allCategories.map((cat) => {
                                    const catSkills = filteredSkillsList.filter(
                                        (s) => s.category === cat,
                                    );
                                    if (catSkills.length === 0) {
                                        return null;
                                    }
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
                                            <motion.div
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true, margin: '-50px' }}
                                                variants={{
                                                    visible: {
                                                        transition: { staggerChildren: 0.02 },
                                                    },
                                                }}
                                                className="flex-1 p-2 flex flex-wrap gap-1 md:gap-1.5 items-center"
                                            >
                                                <AnimatePresence mode="popLayout">
                                                    {catSkills.map((skill, _) => (
                                                        <motion.div
                                                            variants={{
                                                                hidden: { opacity: 0, y: 15 },
                                                                visible: { opacity: 1, y: 0 },
                                                            }}
                                                            transition={{
                                                                duration: 0.25,
                                                                ease: 'easeOut',
                                                            }}
                                                            exit={{ opacity: 0, scale: 0.9 }}
                                                            layout
                                                            key={skill.name}
                                                            className="h-fit"
                                                        >
                                                            <SkillTooltipWrapper
                                                                theme={theme}
                                                                content={
                                                                    <>
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
                                                                                        ? theme ===
                                                                                          'light'
                                                                                            ? 'bg-green-100 text-green-700'
                                                                                            : 'bg-green-900/50 text-green-400'
                                                                                        : skill.proficiency ===
                                                                                            'Proficient'
                                                                                          ? theme ===
                                                                                            'light'
                                                                                              ? 'bg-blue-100 text-blue-700'
                                                                                              : 'bg-blue-900/50 text-blue-400'
                                                                                          : theme ===
                                                                                              'light'
                                                                                            ? 'bg-slate-100 text-slate-700'
                                                                                            : 'bg-slate-700/50 text-slate-300'
                                                                                }`}
                                                                            >
                                                                                {skill.proficiency}
                                                                            </span>
                                                                        </div>
                                                                        <p
                                                                            className={`text-xs leading-relaxed whitespace-normal ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'} ${skill.usedInProjects.length > 0 || skill.usedInExperience.length > 0 ? 'mb-3' : ''}`}
                                                                        >
                                                                            {skill.description}
                                                                        </p>

                                                                        {(skill.usedInProjects
                                                                            .length > 0 ||
                                                                            skill.usedInExperience
                                                                                .length > 0) && (
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
                                                                                                key={
                                                                                                    p.name
                                                                                                }
                                                                                                onClick={() =>
                                                                                                    navigate(
                                                                                                        `/work/projects/${normalizeTitle(p.name)}`,
                                                                                                    )
                                                                                                }
                                                                                                className={`cursor-pointer text-[10px] px-1.5 py-0.5 rounded border whitespace-nowrap transition-colors ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-blue-600 hover:border-blue-200' : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-blue-400 hover:border-blue-500/50'}`}
                                                                                            >
                                                                                                {
                                                                                                    p.name
                                                                                                }
                                                                                            </span>
                                                                                        ),
                                                                                    )}
                                                                                    {skill.usedInExperience.map(
                                                                                        (e) => (
                                                                                            <span
                                                                                                key={
                                                                                                    e.role
                                                                                                }
                                                                                                onClick={() =>
                                                                                                    navigate(
                                                                                                        `/work/experience/${normalizeTitle(e.role)}`,
                                                                                                    )
                                                                                                }
                                                                                                className={`cursor-pointer text-[10px] px-1.5 py-0.5 rounded border whitespace-nowrap transition-colors ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-blue-600 hover:border-blue-200' : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-blue-400 hover:border-blue-500/50'}`}
                                                                                            >
                                                                                                {
                                                                                                    e.role
                                                                                                }
                                                                                            </span>
                                                                                        ),
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                }
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
                                                                            img.src =
                                                                                img.src.endsWith(
                                                                                    fallback,
                                                                                )
                                                                                    ? '/skills/default.png'
                                                                                    : fallback;
                                                                        }}
                                                                    />
                                                                    {skill.name}
                                                                </div>
                                                            </SkillTooltipWrapper>
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <div key="expanded-view" className="flex flex-col gap-12 lg:gap-16">
                                {allCategories.map((cat) => {
                                    const catSkills = filteredSkillsList.filter(
                                        (s) => s.category === cat,
                                    );
                                    if (catSkills.length === 0) {
                                        return null;
                                    }

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

                                            <motion.div
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true, margin: '-50px' }}
                                                variants={{
                                                    visible: {
                                                        transition: { staggerChildren: 0.03 },
                                                    },
                                                }}
                                                className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
                                            >
                                                <AnimatePresence mode="popLayout">
                                                    {catSkills.map((skill, _) => (
                                                        <motion.div
                                                            variants={{
                                                                hidden: { opacity: 0, y: 15 },
                                                                visible: { opacity: 1, y: 0 },
                                                            }}
                                                            transition={{
                                                                duration: 0.3,
                                                                ease: 'easeOut',
                                                            }}
                                                            exit={{ opacity: 0, scale: 0.9 }}
                                                            layout
                                                            key={skill.name}
                                                            className={`flex flex-col gap-4 p-5 md:p-6 rounded-xl border transition-all hover:shadow-md hover:-translate-y-1 ${theme === 'light' ? 'bg-white border-slate-200 hover:border-blue-300' : 'bg-[#151821] border-slate-800 hover:border-blue-500/30 hover:shadow-blue-500/5'}`}
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
                                                                            img.src =
                                                                                img.src.endsWith(
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
                                                                                ? theme === 'light'
                                                                                    ? 'bg-green-100 text-green-700'
                                                                                    : 'bg-green-900/50 text-green-400'
                                                                                : skill.proficiency ===
                                                                                    'Proficient'
                                                                                  ? theme ===
                                                                                    'light'
                                                                                      ? 'bg-blue-100 text-blue-700'
                                                                                      : 'bg-blue-900/50 text-blue-400'
                                                                                  : theme ===
                                                                                      'light'
                                                                                    ? 'bg-slate-100 text-slate-700'
                                                                                    : 'bg-slate-700/50 text-slate-300'
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
                                                                                        onClick={() =>
                                                                                            navigate(
                                                                                                `/work/projects/${normalizeTitle(p.name)}`,
                                                                                            )
                                                                                        }
                                                                                        className={`cursor-pointer text-xs px-2.5 py-1 rounded-md border transition-colors ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-blue-600 hover:border-blue-200' : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-blue-400 hover:border-blue-500/50'}`}
                                                                                    >
                                                                                        {p.name}
                                                                                    </span>
                                                                                ),
                                                                            )}
                                                                            {skill.usedInExperience.map(
                                                                                (e) => (
                                                                                    <span
                                                                                        key={e.role}
                                                                                        onClick={() =>
                                                                                            navigate(
                                                                                                `/work/experience/${normalizeTitle(e.role)}`,
                                                                                            )
                                                                                        }
                                                                                        className={`cursor-pointer text-xs px-2.5 py-1 rounded-md border transition-colors ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-blue-600 hover:border-blue-200' : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-blue-400 hover:border-blue-500/50'}`}
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
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={sectionVariants}
                        className={divider}
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={sectionVariants}
                        className="space-y-6"
                    >
                        <h2
                            className={`text-4xl lg:text-6xl font-bold mb-4 text-center ${theme === 'light' ? 'text-slate-900 drop-shadow-[4px_4px_2px_rgba(80,140,255,0.45)]' : 'text-white drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                        >
                            More About Me
                        </h2>
                        <div className="flex flex-col gap-8 lg:gap-10 items-center">
                            <div className="w-full">
                                <p
                                    className={`text-lg lg:text-xl leading-relaxed lg:leading-relaxed text-center ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                                >
                                    Outside of computer science, I'm usually in the gym, cooking,
                                    gaming, or planning some cool stuff! I also love having deep
                                    conversations at 3am, and believe the best engineers are curious
                                    about everything, not just tech.
                                </p>
                            </div>

                            <motion.div
                                variants={{
                                    visible: { transition: { staggerChildren: 0.1 } },
                                }}
                                className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
                            >
                                {interests.map((interest, i) => (
                                    <motion.div
                                        variants={skillVariants}
                                        key={i}
                                        className={`group relative py-6 px-4 rounded-xl border flex flex-col items-center justify-center overflow-hidden transition-all duration-300 h-36 sm:h-44
                                            ${theme === 'light' ? 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-slate-800/40 border-slate-700/50 hover:border-blue-500/50 hover:shadow-[0_0_15px_rgba(96,165,250,0.2)]'}`}
                                    >
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 lg:gap-3 transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0 group-hover:pointer-events-none">
                                            <span
                                                className={`text-3xl lg:text-4xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                                            >
                                                {interest.icon}
                                            </span>
                                            <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-center">
                                                {interest.name}
                                            </span>
                                        </div>
                                        <div className="absolute inset-0 p-3 sm:p-5 translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 flex items-center justify-center text-center">
                                            <p
                                                className={`text-[11px] sm:text-xs font-medium leading-snug xl:leading-snug ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}
                                            >
                                                {interest.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={sectionVariants}
                        className={divider}
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={sectionVariants}
                        className="space-y-6 text-center"
                    >
                        <h2
                            className={`text-4xl lg:text-6xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900 drop-shadow-[4px_4px_2px_rgba(80,140,255,0.45)]' : 'text-white drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                        >
                            Let's Talk
                        </h2>
                        <p
                            className={`text-lg lg:text-xl leading-relaxed lg:leading-relaxed text-center pb-4 ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                        >
                            If you're working on hard problems and care about making a positive
                            difference, I'd love to chat! Our excellence as a species is all thanks
                            to collaboration.
                        </p>

                        <div className="flex justify-center mt-8">
                            <button
                                onClick={() => navigate('/contact')}
                                className="link-text group"
                            >
                                <span>Reach Out</span>
                                <span className="transform transition-transform duration-300 group-hover:translate-x-2">
                                    →
                                </span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <br />
            <br />
        </>
    );
};

export default About;
