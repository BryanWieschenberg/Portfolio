import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SwipeReveal from '../components/SwipeReveal';
import { FaChevronUp, FaChevronDown, FaFilter, FaTimes, FaSearch } from 'react-icons/fa';
import { blogPosts, BlogTopic } from '../constants';
import { formatDisplayDate } from '../lib/utils';

type SortKey = 'recency' | 'views';
type SortDir = 'asc' | 'desc';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const recencyOptions = ['Last 6 Months', 'Last Year', 'Last 2 Years'];

function extractYear(dateStr: string): number {
    const match = dateStr.match(/(\d{4})/);
    return match ? parseInt(match[1], 10) : 0;
}

const blogYears = [...new Set(blogPosts.map((p) => extractYear(p.date)))].sort((a, b) => b - a);
const topicValues: BlogTopic[] = ['Project', 'Career', 'Opinion'];

function parseDateToTimestamp(dateStr: string): number {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        const month = parseInt(parts[0], 10) - 1;
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
            return new Date(year, month, day).getTime();
        }
    }
    return 0;
}

const Blog: React.FC = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const [views, setViews] = useState<Record<string, number>>({});

    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsInitialLoad(false), 700);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchViews = async () => {
            try {
                const response = await fetch(`${API_URL}/api/blog/views`);
                if (response.ok) {
                    const data = await response.json();
                    setViews(data);
                }
            } catch (err) {
                console.error('Failed to fetch blog views', err);
            }
        };
        fetchViews();
    }, []);

    const [sortKey, setSortKey] = useState<SortKey>('recency');
    const [sortDir, setSortDir] = useState<SortDir>('desc');

    const [showFilters, setShowFilters] = useState(false);
    const [nameSearch, setNameSearch] = useState('');
    const [debouncedName, setDebouncedName] = useState('');
    const [selectedTopics, setSelectedTopics] = useState<BlogTopic[]>([]);
    const [selectedYears, setSelectedYears] = useState<(number | string)[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedName(nameSearch), 300);
        return () => clearTimeout(timer);
    }, [nameSearch]);

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
                setSortDir('desc');
            }
        },
        [sortKey],
    );

    const clearFilters = useCallback(() => {
        setNameSearch('');
        setSelectedTopics([]);
        setSelectedYears([]);
    }, []);

    const hasActiveFilters = Boolean(
        debouncedName || selectedTopics.length || selectedYears.length,
    );

    const filteredPosts = useMemo(() => {
        let result = [...blogPosts];

        if (debouncedName) {
            const lower = debouncedName.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(lower) || p.hook.toLowerCase().includes(lower),
            );
        }

        if (selectedTopics.length > 0) {
            result = result.filter((p) => selectedTopics.includes(p.topic));
        }

        if (selectedYears.length > 0) {
            const now = Date.now();
            const sixMonthsAgo = now - 6 * 30 * 24 * 60 * 60 * 1000;
            const oneYearAgo = now - 365 * 24 * 60 * 60 * 1000;
            const twoYearsAgo = now - 2 * 365 * 24 * 60 * 60 * 1000;

            result = result.filter((p) => {
                const year = extractYear(p.date);
                const timestamp = parseDateToTimestamp(p.date);

                if (selectedYears.includes(year)) {
                    return true;
                }
                if (selectedYears.includes('Last 6 Months') && timestamp >= sixMonthsAgo) {
                    return true;
                }
                if (selectedYears.includes('Last Year') && timestamp >= oneYearAgo) {
                    return true;
                }
                if (selectedYears.includes('Last 2 Years') && timestamp >= twoYearsAgo) {
                    return true;
                }

                return false;
            });
        }

        result.sort((a, b) => {
            if (sortKey === 'recency') {
                const diff = parseDateToTimestamp(b.date) - parseDateToTimestamp(a.date);
                return sortDir === 'desc' ? diff : -diff;
            } else {
                const vA = views[a.slug] || 0;
                const vB = views[b.slug] || 0;
                const diff = vA - vB;
                return sortDir === 'asc' ? diff : -diff;
            }
        });

        return result;
    }, [debouncedName, selectedTopics, selectedYears, sortKey, sortDir, views]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: isInitialLoad ? 0.6 : 0,
                staggerChildren: isInitialLoad ? 0.1 : 0.05,
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
                    <h1 className="page-title">Blog</h1>
                </SwipeReveal>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="page-subtitle"
                >
                    Deep-dives of my projects, talks about my career, and honest opinions:
                </motion.p>
            </div>

            <div className="container mx-auto px-4 lg:px-20 pt-8 lg:pt-12 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col items-center gap-6 mb-8"
                >
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <button
                            onClick={() => handleSort('recency')}
                            className={`sort-btn ${sortKey === 'recency' ? 'active' : ''}`}
                        >
                            Recent {sortKey === 'recency' && <SortArrow direction={sortDir} />}
                        </button>
                        <button
                            onClick={() => handleSort('views')}
                            className={`sort-btn ${sortKey === 'views' ? 'active' : ''}`}
                        >
                            Views {sortKey === 'views' && <SortArrow direction={sortDir} />}
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
                                        selectedTopics.length ? 1 : 0,
                                        selectedYears.length ? 1 : 0,
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
                                    <div className="lg:col-span-2">
                                        <p className="filter-label">Search</p>
                                        <div className="relative">
                                            <FaSearch
                                                size={12}
                                                className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}
                                            />
                                            <input
                                                type="text"
                                                value={nameSearch}
                                                onChange={(e) => setNameSearch(e.target.value)}
                                                placeholder="Search posts..."
                                                className="filter-input w-full"
                                                style={{ paddingLeft: '2rem' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2">
                                        <p className="filter-label">Topic</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {topicValues.map((topic) => (
                                                <button
                                                    key={topic}
                                                    onClick={() =>
                                                        toggleChip(
                                                            selectedTopics,
                                                            topic,
                                                            setSelectedTopics,
                                                        )
                                                    }
                                                    className={`filter-chip ${selectedTopics.includes(topic) ? 'active' : ''}`}
                                                >
                                                    {topic}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="lg:col-span-4">
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
                                            {blogYears.map((year) => (
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
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.div
                        key="blog-results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {filteredPosts.length > 0 ? (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={containerVariants}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {filteredPosts.map((post) => (
                                    <motion.article
                                        key={post.slug}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => navigate(`/blog/${post.slug}`)}
                                        className={`group h-full cursor-pointer relative p-[1px] rounded-2xl transition-shadow duration-500
                                            ${
                                                theme === 'light'
                                                    ? 'bg-slate-200/80 shadow-md hover:shadow-[0_0_25px_rgba(100,116,139,0.3)]'
                                                    : 'bg-gradient-to-br from-[#1a1f2e] via-[#252b3b] to-[#1a1f2e] shadow-2xl hover:shadow-[0_0_30px_rgba(148,163,184,0.15)]'
                                            }
                                            overflow-hidden flex flex-col`}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            animate={{ opacity: [0, 0.3, 0] }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            }}
                                            className={`absolute inset-0 bg-gradient-to-r from-transparent z-0 pointer-events-none
                                                ${
                                                    theme === 'light'
                                                        ? 'via-slate-300/20'
                                                        : 'via-slate-400/10'
                                                }`}
                                        ></motion.div>

                                        <div
                                            className={`relative z-10 rounded-2xl h-full flex flex-col
                                            ${theme === 'light' ? 'bg-white' : 'bg-[#111318]/95 border border-slate-700/50'}`}
                                        >
                                            <div className="w-full aspect-video rounded-t-2xl overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/50 shrink-0">
                                                <img
                                                    src={`/artifacts/blog/${post.slug}.png`}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        const parent = (e.target as HTMLElement)
                                                            .parentElement;
                                                        if (parent) {
                                                            parent.style.display = 'none';
                                                        }
                                                    }}
                                                />
                                            </div>

                                            <div className="p-6 -mt-3 flex flex-col flex-1">
                                                <div className="flex justify-end mb-1">
                                                    <p
                                                        className={`text-xs font-semibold tracking-wider ${
                                                            theme === 'light'
                                                                ? 'text-slate-500'
                                                                : 'text-slate-400'
                                                        }`}
                                                    >
                                                        {formatDisplayDate(post.date)}{' '}
                                                        <span className="font-normal">
                                                            ({post.readMins} mins) •{' '}
                                                            {views[post.slug]?.toLocaleString() ||
                                                                0}{' '}
                                                            {views[post.slug] === 1
                                                                ? 'view'
                                                                : 'views'}
                                                        </span>
                                                    </p>
                                                </div>

                                                <div className="flex justify-between items-start min-h-[4rem]">
                                                    <h3 className="card-title text-2xl">
                                                        {post.title}
                                                    </h3>
                                                </div>

                                                <p className="card-text flex-grow break-words">
                                                    {post.hook}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-16">
                                <p
                                    className={`text-lg ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}
                                >
                                    No posts match your filters.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-3 text-sm text-blue-500 hover:text-blue-400 transition-colors cursor-pointer"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <br />
            <br />
        </>
    );
};

export default Blog;
