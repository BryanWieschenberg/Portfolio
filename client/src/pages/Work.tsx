import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
    projects,
    experience,
    skills,
    Experience,
    ProjectType,
    ProjectStatus,
    ProjectScale,
    Concepts,
} from '../constants';
import { normalizeTitle, getSkillIconPath, getSkillIconFallback } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SwipeReveal from '../components/SwipeReveal';
import ProjectCard from '../components/ProjectCard';
import ExperienceCard from '../components/ExperienceCard';
import { FaChevronUp, FaChevronDown, FaFilter, FaTimes, FaSearch } from 'react-icons/fa';
import { FaLaptopCode, FaBuilding } from 'react-icons/fa';

type Tab = 'projects' | 'experience';
type SortKey = 'featured' | 'newest' | 'alphabetical';
type SortDir = 'asc' | 'desc';

const allSkillNames = Object.entries(skills)
    .filter(([category]) => category !== 'AI Tooling' && category !== 'Soft Skills')
    .flatMap(([, list]) => list.map((s) => s.name));
const uniqueSkillNames = [...new Set(allSkillNames)].sort();

function extractYear(dateStr: string): number {
    const match = dateStr.match(/(\d{4})/);
    return match ? parseInt(match[1], 10) : 0;
}

const projectYears = [...new Set(projects.map((p) => extractYear(p.date)))].sort((a, b) => b - a);
const experienceYears = [...new Set(experience.map((e) => extractYear(e.date)))].sort(
    (a, b) => b - a,
);

const projectTypes: ProjectType[] = ['Web App', 'Desktop App', 'CLI Tool', 'Automation'];
const projectStatuses: ProjectStatus[] = ['Completed', 'Maintained', 'In Development'];
const scaleValues: ProjectScale[] = ['S', 'M', 'L', 'XL'];
const recencyOptions = ['Last 6 Months', 'Last Year', 'Last 2 Years'];
const conceptValues: Concepts[] = [
    'Auth/Security',
    'API Design',
    'DB Design',
    'AI/ML',
    'Full-Stack',
    'Frontend',
    'Backend',
    'Infra/DevOps',
    'Data Processing',
    'Real-Time',
];

function parseDateToTimestamp(dateStr: string): number {
    const monthMap: Record<string, number> = {
        jan: 0,
        feb: 1,
        mar: 2,
        apr: 3,
        may: 4,
        jun: 5,
        jul: 6,
        aug: 7,
        sep: 8,
        oct: 9,
        nov: 10,
        dec: 11,
    };
    const startPart = dateStr.split('-')[0].trim();
    const tokens = startPart.split(/[\s.]+/).filter(Boolean);
    if (tokens.length >= 2) {
        const month = monthMap[tokens[0].toLowerCase()] ?? 0;
        const year = parseInt(tokens[1], 10);
        if (!isNaN(year)) {
            return new Date(year, month, 1).getTime();
        }
    }
    return 0;
}

const Work: React.FC = () => {
    const { theme } = useTheme();

    const [activeTab, setActiveTab] = useState<Tab>('projects');
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsInitialLoad(false), 700);
        return () => clearTimeout(timer);
    }, []);

    const [sortKey, setSortKey] = useState<SortKey>('featured');
    const [sortDir, setSortDir] = useState<SortDir>('desc');

    const [showFilters, setShowFilters] = useState(false);
    const [nameSearch, setNameSearch] = useState('');
    const [debouncedName, setDebouncedName] = useState('');
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [skillSearch, setSkillSearch] = useState('');
    const [showSkillDropdown, setShowSkillDropdown] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState<ProjectType[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<string[]>([]);
    const [selectedScales, setSelectedScales] = useState<ProjectScale[]>([]);
    const [selectedYears, setSelectedYears] = useState<(number | string)[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([]);
    const [selectedConcepts, setSelectedConcepts] = useState<Concepts[]>([]);

    const skillDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedName(nameSearch), 300);
        return () => clearTimeout(timer);
    }, [nameSearch]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (skillDropdownRef.current && !skillDropdownRef.current.contains(e.target as Node)) {
                setShowSkillDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const toggleChip = useCallback(
        <T,>(_: T[], val: T, setter: React.Dispatch<React.SetStateAction<T[]>>) => {
            setter((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
        },
        [],
    );

    const handleSort = useCallback(
        (key: SortKey) => {
            if (sortKey === key) {
                setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
            } else {
                setSortKey(key);
                setSortDir(key === 'alphabetical' ? 'asc' : 'desc');
            }
        },
        [sortKey],
    );

    const clearFilters = useCallback(() => {
        setNameSearch('');
        setSelectedSkills([]);
        setSkillSearch('');
        setSelectedTypes([]);
        setSelectedTeam([]);
        setSelectedScales([]);
        setSelectedYears([]);
        setSelectedStatuses([]);
        setSelectedConcepts([]);
    }, []);

    const hasActiveFilters = Boolean(
        debouncedName ||
        selectedSkills.length ||
        selectedTypes.length ||
        selectedTeam.length ||
        selectedScales.length ||
        selectedYears.length ||
        selectedStatuses.length ||
        selectedConcepts.length,
    );

    const filteredDropdownSkills = useMemo(() => {
        if (!skillSearch) {
            return uniqueSkillNames;
        }
        const lower = skillSearch.toLowerCase();
        return uniqueSkillNames.filter((s) => s.toLowerCase().includes(lower));
    }, [skillSearch]);

    const filteredProjects = useMemo(() => {
        let result = [...projects];

        if (debouncedName) {
            const lower = debouncedName.toLowerCase();
            result = result.filter((p) => p.name.toLowerCase().includes(lower));
        }

        if (selectedSkills.length > 0) {
            result = result.filter((p) => {
                const projectSkills = [
                    ...p.top_skills,
                    ...Object.values(p.skills).flatMap((categoryObj) => Object.keys(categoryObj)),
                ].map((s) => s.toLowerCase());

                return selectedSkills.some((s) => projectSkills.includes(s.toLowerCase()));
            });
        }

        if (selectedTypes.length > 0) {
            result = result.filter((p) => selectedTypes.includes(p.type));
        }

        if (selectedTeam.length > 0) {
            result = result.filter((p) => {
                const isTeam = !!p.role;
                if (selectedTeam.includes('Solo') && !isTeam) {
                    return true;
                }
                if (selectedTeam.includes('Team') && isTeam) {
                    return true;
                }
                return false;
            });
        }

        if (selectedScales.length > 0) {
            result = result.filter(
                (p) => p.scale !== undefined && selectedScales.includes(p.scale),
            );
        }

        if (selectedYears.length > 0) {
            const now = Date.now();
            const sixMonthsAgo = now - 6 * 30 * 24 * 60 * 60 * 1000;
            const oneYearAgo = now - 365 * 24 * 60 * 60 * 1000;
            const twoYearsAgo = now - 2 * 365 * 24 * 60 * 60 * 1000;

            result = result.filter((p) => {
                const year = extractYear(p.date);
                const isPresent = p.date.toLowerCase().includes('present');
                const timestamp = parseDateToTimestamp(p.date);
                const effectiveTimestamp = isPresent ? now : timestamp;

                if (selectedYears.includes(year)) {
                    return true;
                }
                if (selectedYears.includes('Last 6 Months') && effectiveTimestamp >= sixMonthsAgo) {
                    return true;
                }
                if (selectedYears.includes('Last Year') && effectiveTimestamp >= oneYearAgo) {
                    return true;
                }
                if (selectedYears.includes('Last 2 Years') && effectiveTimestamp >= twoYearsAgo) {
                    return true;
                }

                return false;
            });
        }

        if (selectedStatuses.length > 0) {
            result = result.filter((p) => selectedStatuses.includes(p.status));
        }

        if (selectedConcepts.length > 0) {
            result = result.filter(
                (p) => p.concepts && selectedConcepts.some((c) => p.concepts!.includes(c)),
            );
        }

        if (sortKey === 'featured') {
            if (sortDir === 'asc') {
                result = result.reverse();
            }
        } else if (sortKey === 'newest') {
            result.sort((a, b) => {
                const diff = parseDateToTimestamp(b.date) - parseDateToTimestamp(a.date);
                return sortDir === 'desc' ? diff : -diff;
            });
        } else if (sortKey === 'alphabetical') {
            result.sort((a, b) => {
                const diff = a.name.localeCompare(b.name);
                return sortDir === 'asc' ? diff : -diff;
            });
        }

        return result;
    }, [
        debouncedName,
        selectedSkills,
        selectedTypes,
        selectedTeam,
        selectedScales,
        selectedYears,
        selectedStatuses,
        selectedConcepts,
        sortKey,
        sortDir,
    ]);

    const filteredExperience = useMemo(() => {
        let result = [...experience];

        if (debouncedName) {
            const lower = debouncedName.toLowerCase();
            result = result.filter(
                (e) =>
                    e.role.toLowerCase().includes(lower) || e.company.toLowerCase().includes(lower),
            );
        }

        if (selectedSkills.length > 0) {
            result = result.filter((e) => {
                const expSkills = [
                    ...e.top_skills,
                    ...Object.values(e.skills).flatMap((categoryObj) => Object.keys(categoryObj)),
                ].map((s) => s.toLowerCase());

                return selectedSkills.some((s) => expSkills.includes(s.toLowerCase()));
            });
        }

        if (selectedYears.length > 0) {
            const now = Date.now();
            const sixMonthsAgo = now - 6 * 30 * 24 * 60 * 60 * 1000;
            const oneYearAgo = now - 365 * 24 * 60 * 60 * 1000;
            const twoYearsAgo = now - 2 * 365 * 24 * 60 * 60 * 1000;

            result = result.filter((e) => {
                const year = extractYear(e.date);
                const isPresent = e.date.toLowerCase().includes('present');
                const timestamp = parseDateToTimestamp(e.date);
                const effectiveTimestamp = isPresent ? now : timestamp;

                if (selectedYears.includes(year)) {
                    return true;
                }
                if (selectedYears.includes('Last 6 Months') && effectiveTimestamp >= sixMonthsAgo) {
                    return true;
                }
                if (selectedYears.includes('Last Year') && effectiveTimestamp >= oneYearAgo) {
                    return true;
                }
                if (selectedYears.includes('Last 2 Years') && effectiveTimestamp >= twoYearsAgo) {
                    return true;
                }

                return false;
            });
        }

        if (selectedConcepts.length > 0) {
            result = result.filter(
                (e) => e.concepts && selectedConcepts.some((c) => e.concepts!.includes(c)),
            );
        }

        if (sortKey === 'featured') {
            if (sortDir === 'asc') {
                result = result.reverse();
            }
        } else if (sortKey === 'newest') {
            result.sort((a, b) => {
                const diff = parseDateToTimestamp(b.date) - parseDateToTimestamp(a.date);
                return sortDir === 'desc' ? diff : -diff;
            });
        } else if (sortKey === 'alphabetical') {
            result.sort((a, b) => {
                const diff = a.role.localeCompare(b.role);
                return sortDir === 'asc' ? diff : -diff;
            });
        }

        return result;
    }, [debouncedName, selectedSkills, selectedYears, selectedConcepts, sortKey, sortDir]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: isInitialLoad ? 0.6 : 0,
                staggerChildren: isInitialLoad ? 0.08 : 0.03,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: isInitialLoad ? 0.5 : 0.25, ease: 'easeOut' },
        },
    };

    const years = activeTab === 'projects' ? projectYears : experienceYears;

    const SortArrow = ({ direction }: { direction: SortDir }) =>
        direction === 'desc' ? <FaChevronDown size={9} /> : <FaChevronUp size={9} />;

    return (
        <>
            <div className="page-hero">
                <SwipeReveal
                    circleColor="bg-gradient-to-r from-[#3c86ff] to-[#69f1ff]"
                    shadowColor="shadow-[0_0_50px_rgba(60,134,255,0.6)]"
                    duration={0.6}
                >
                    <h1 className="page-title">My Work</h1>
                </SwipeReveal>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="page-subtitle"
                >
                    Things I've built that solve real problems:
                </motion.p>
            </div>

            <div className="container mx-auto px-4 lg:px-20 pt-8 lg:pt-12 pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col items-center gap-6 mb-8"
                >
                    <div className="toggle-pill">
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`toggle-btn flex items-center gap-2 ${activeTab === 'projects' ? 'active' : ''}`}
                        >
                            <FaLaptopCode size={16} />
                            Projects
                        </button>
                        <button
                            onClick={() => setActiveTab('experience')}
                            className={`toggle-btn flex items-center gap-2 ${activeTab === 'experience' ? 'active' : ''}`}
                        >
                            <FaBuilding size={14} />
                            Experience
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                            onClick={() => handleSort('featured')}
                            className={`sort-btn ${sortKey === 'featured' ? 'active' : ''}`}
                        >
                            Featured {sortKey === 'featured' && <SortArrow direction={sortDir} />}
                        </button>
                        <button
                            onClick={() => handleSort('newest')}
                            className={`sort-btn ${sortKey === 'newest' ? 'active' : ''}`}
                        >
                            Recent {sortKey === 'newest' && <SortArrow direction={sortDir} />}
                        </button>
                        <button
                            onClick={() => handleSort('alphabetical')}
                            className={`sort-btn ${sortKey === 'alphabetical' ? 'active' : ''}`}
                        >
                            A-Z {sortKey === 'alphabetical' && <SortArrow direction={sortDir} />}
                        </button>

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
                                        debouncedName ? 1 : 0,
                                        selectedSkills.length ? 1 : 0,
                                        selectedTypes.length ? 1 : 0,
                                        selectedTeam.length ? 1 : 0,
                                        selectedScales.length ? 1 : 0,
                                        selectedYears.length ? 1 : 0,
                                        selectedStatuses.length ? 1 : 0,
                                        selectedConcepts.length ? 1 : 0,
                                    ].reduce((a, b) => a + b, 0)}
                                </span>
                            ) : null}
                        </button>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-8"
                            style={{ overflow: 'visible' }}
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
                                    <div>
                                        <p className="filter-label">Name</p>
                                        <div className="relative">
                                            <FaSearch
                                                size={12}
                                                className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}
                                            />
                                            <input
                                                type="text"
                                                value={nameSearch}
                                                onChange={(e) => setNameSearch(e.target.value)}
                                                placeholder={
                                                    activeTab === 'projects'
                                                        ? 'Search projects...'
                                                        : 'Search roles...'
                                                }
                                                className="filter-input"
                                                style={{ paddingLeft: '2rem' }}
                                            />
                                        </div>
                                    </div>

                                    {activeTab === 'projects' ? (
                                        <div>
                                            <p className="filter-label">Status</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {projectStatuses.map((status) => (
                                                    <button
                                                        key={status}
                                                        onClick={() =>
                                                            toggleChip(
                                                                selectedStatuses,
                                                                status,
                                                                setSelectedStatuses,
                                                            )
                                                        }
                                                        className={`filter-chip ${selectedStatuses.includes(status) ? 'active' : ''}`}
                                                    >
                                                        {status}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="hidden md:block"></div>
                                    )}

                                    <div className="lg:row-span-4">
                                        <div ref={skillDropdownRef}>
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="filter-label !mb-0">Skills</p>
                                            </div>
                                            <div className="relative">
                                                <button
                                                    onClick={() =>
                                                        setShowSkillDropdown(!showSkillDropdown)
                                                    }
                                                    className="filter-input text-left flex items-center justify-between"
                                                >
                                                    <span
                                                        className={
                                                            selectedSkills.length
                                                                ? ''
                                                                : theme === 'light'
                                                                  ? 'text-slate-400'
                                                                  : 'text-slate-500'
                                                        }
                                                    >
                                                        {selectedSkills.length
                                                            ? `${selectedSkills.length} selected`
                                                            : 'Select skills...'}
                                                    </span>
                                                    <FaChevronDown
                                                        size={10}
                                                        className={`transition-transform ${showSkillDropdown ? 'rotate-180' : ''}`}
                                                    />
                                                </button>
                                                {showSkillDropdown && (
                                                    <div
                                                        className={`absolute z-50 mt-1 w-full rounded-lg border max-h-52 overflow-y-auto ${theme === 'light' ? 'bg-white border-slate-200 shadow-lg' : 'bg-slate-800 border-slate-600 shadow-2xl'}`}
                                                    >
                                                        <div
                                                            className="p-2 sticky top-0"
                                                            style={{ backgroundColor: 'inherit' }}
                                                        >
                                                            <input
                                                                type="text"
                                                                value={skillSearch}
                                                                onChange={(e) =>
                                                                    setSkillSearch(e.target.value)
                                                                }
                                                                placeholder="Search skills..."
                                                                className="filter-input text-xs"
                                                            />
                                                        </div>
                                                        {filteredDropdownSkills.map((skill) => (
                                                            <button
                                                                key={skill}
                                                                onClick={() =>
                                                                    toggleChip(
                                                                        selectedSkills,
                                                                        skill,
                                                                        setSelectedSkills,
                                                                    )
                                                                }
                                                                className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center gap-2 ${
                                                                    selectedSkills.includes(skill)
                                                                        ? theme === 'light'
                                                                            ? 'bg-blue-50 text-blue-600'
                                                                            : 'bg-blue-900/30 text-blue-400'
                                                                        : theme === 'light'
                                                                          ? 'text-slate-600 hover:bg-slate-50'
                                                                          : 'text-slate-300 hover:bg-slate-700/50'
                                                                }`}
                                                            >
                                                                <img
                                                                    src={getSkillIconPath(
                                                                        skill,
                                                                        theme,
                                                                    )}
                                                                    alt={skill}
                                                                    className="w-3.5 h-3.5 object-contain"
                                                                    onError={(e) => {
                                                                        const img =
                                                                            e.target as HTMLImageElement;
                                                                        const fallback =
                                                                            getSkillIconFallback(
                                                                                skill,
                                                                            );
                                                                        if (
                                                                            img.src.endsWith(
                                                                                fallback,
                                                                            )
                                                                        ) {
                                                                            img.style.display =
                                                                                'none';
                                                                        } else {
                                                                            img.src = fallback;
                                                                        }
                                                                    }}
                                                                />
                                                                {skill}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:row-span-4">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="filter-label !mb-0">Selected Skills</p>
                                        </div>
                                        {selectedSkills.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {selectedSkills.map((skill) => (
                                                    <span
                                                        key={skill}
                                                        onClick={() =>
                                                            toggleChip(
                                                                selectedSkills,
                                                                skill,
                                                                setSelectedSkills,
                                                            )
                                                        }
                                                        className={`px-2.5 py-1 rounded-md text-xs font-medium border whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                                                            theme === 'light'
                                                                ? 'bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300'
                                                                : 'bg-slate-800/50 text-slate-300 border-slate-600/50 hover:border-slate-500'
                                                        }`}
                                                    >
                                                        <img
                                                            src={getSkillIconPath(skill, theme)}
                                                            alt={skill}
                                                            className="w-3.5 h-3.5 object-contain"
                                                            onError={(e) => {
                                                                const img =
                                                                    e.target as HTMLImageElement;
                                                                const fallback =
                                                                    getSkillIconFallback(skill);
                                                                if (img.src.endsWith(fallback)) {
                                                                    img.style.display = 'none';
                                                                } else {
                                                                    img.src = fallback;
                                                                }
                                                            }}
                                                        />
                                                        {skill}{' '}
                                                        <FaTimes size={10} className="ml-1" />
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <p className="filter-label">Year / Recency</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {recencyOptions.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() =>
                                                        toggleChip(
                                                            selectedYears,
                                                            opt,
                                                            setSelectedYears,
                                                        )
                                                    }
                                                    className={`filter-chip ${selectedYears.includes(opt) ? 'active' : ''}`}
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                            {years.map((year) => (
                                                <button
                                                    key={year}
                                                    onClick={() =>
                                                        toggleChip(
                                                            selectedYears,
                                                            year,
                                                            setSelectedYears,
                                                        )
                                                    }
                                                    className={`filter-chip ${selectedYears.includes(year) ? 'active' : ''}`}
                                                >
                                                    {year}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {activeTab === 'projects' ? (
                                        <div>
                                            <p className="filter-label">Scale</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {scaleValues.map((s) => (
                                                    <button
                                                        key={s}
                                                        onClick={() =>
                                                            toggleChip(
                                                                selectedScales,
                                                                s,
                                                                setSelectedScales,
                                                            )
                                                        }
                                                        className={`filter-chip ${selectedScales.includes(s) ? 'active' : ''}`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="hidden md:block"></div>
                                    )}

                                    {activeTab === 'projects' && (
                                        <>
                                            <div>
                                                <p className="filter-label">Type</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {projectTypes.map((type) => (
                                                        <button
                                                            key={type}
                                                            onClick={() =>
                                                                toggleChip(
                                                                    selectedTypes,
                                                                    type,
                                                                    setSelectedTypes,
                                                                )
                                                            }
                                                            className={`filter-chip ${selectedTypes.includes(type) ? 'active' : ''}`}
                                                        >
                                                            {type}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <p className="filter-label">Team</p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {['Solo', 'Team'].map((team) => (
                                                        <button
                                                            key={team}
                                                            onClick={() =>
                                                                toggleChip(
                                                                    selectedTeam,
                                                                    team,
                                                                    setSelectedTeam,
                                                                )
                                                            }
                                                            className={`filter-chip ${selectedTeam.includes(team) ? 'active' : ''}`}
                                                        >
                                                            {team}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div className="lg:col-span-2">
                                        <p className="filter-label">Concepts</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {conceptValues.map((concept) => (
                                                <button
                                                    key={concept}
                                                    onClick={() =>
                                                        toggleChip(
                                                            selectedConcepts,
                                                            concept,
                                                            setSelectedConcepts,
                                                        )
                                                    }
                                                    className={`filter-chip ${selectedConcepts.includes(concept) ? 'active' : ''}`}
                                                >
                                                    {concept}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {activeTab === 'projects' ? (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredProjects.length > 0 ? (
                                <motion.div
                                    key={filteredProjects.map((p) => p.name).join(',')}
                                    initial="hidden"
                                    animate="visible"
                                    variants={containerVariants}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                >
                                    {filteredProjects.map((p) => (
                                        <ProjectCard
                                            key={normalizeTitle(p.name)}
                                            project={p}
                                            variants={itemVariants}
                                        />
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="text-center py-16">
                                    <p
                                        className={`text-lg ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}
                                    >
                                        No projects match your filters.
                                    </p>
                                    <button
                                        onClick={clearFilters}
                                        className="mt-3 text-sm text-blue-500 hover:text-blue-400 transition-colors"
                                    >
                                        Clear filters
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="experience"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredExperience.length > 0 ? (
                                <motion.div
                                    key={filteredExperience.map((e) => e.role).join(',')}
                                    initial="hidden"
                                    animate="visible"
                                    variants={containerVariants}
                                    className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {filteredExperience.map((exp: Experience) => (
                                        <ExperienceCard
                                            key={normalizeTitle(exp.role)}
                                            experience={exp}
                                            variants={itemVariants}
                                        />
                                    ))}
                                </motion.div>
                            ) : (
                                <div className="text-center py-16">
                                    <p
                                        className={`text-lg ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}
                                    >
                                        No experience matches your filters.
                                    </p>
                                    <button
                                        onClick={clearFilters}
                                        className="mt-3 text-sm text-blue-500 hover:text-blue-400 transition-colors"
                                    >
                                        Clear filters
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <br />
            <br />
        </>
    );
};

export default Work;
