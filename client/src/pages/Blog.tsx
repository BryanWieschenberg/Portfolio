import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SwipeReveal from '../components/SwipeReveal';
import {
    FaArrowRight,
    FaClock,
    FaTag,
    FaChevronUp,
    FaChevronDown,
    FaFilter,
    FaTimes,
    FaSearch,
    FaEye,
} from 'react-icons/fa';
import { blogPosts, BlogTopic } from '../constants';

type SortKey = 'recency' | 'views';
type SortDir = 'asc' | 'desc';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const recencyOptions = ['Last 6 Months', 'Last Year', 'Last 2 Years'];

// Extract all years from blog dates
function extractYear(dateStr: string): number {
    const match = dateStr.match(/(\d{4})/);
    return match ? parseInt(match[1], 10) : 0;
}

const blogYears = [...new Set(blogPosts.map((p) => extractYear(p.date)))].sort((a, b) => b - a);
const topicValues: BlogTopic[] = ['Project', 'Career', 'Opinion'];

function parseDateToTimestamp(dateStr: string): number {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        const month = parseInt(parts[0], 10) - 1; // 0-indexed
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
            return new Date(year, month, day).getTime();
        }
    }
    return 0;
}

function formatDisplayDate(dateStr: string): string {
    const parts = dateStr.split('/');
    if (parts.length !== 3) {
        return dateStr;
    }
    const month = parseInt(parts[0], 10) - 1;
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    const d = new Date(year, month, day);
    if (isNaN(d.getTime())) {
        return dateStr;
    }
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

const Blog: React.FC = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const [views, setViews] = useState<Record<string, number>>({});

    // Ensure initial items get delayed appropriately given page load
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsInitialLoad(false), 700);
        return () => clearTimeout(timer);
    }, []);

    // Fetch views
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

    // Sort state
    const [sortKey, setSortKey] = useState<SortKey>('recency');
    const [sortDir, setSortDir] = useState<SortDir>('desc');

    // Filter state
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

        // Search text
        if (debouncedName) {
            const lower = debouncedName.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(lower) || p.hook.toLowerCase().includes(lower),
            );
        }

        // Topic Filter
        if (selectedTopics.length > 0) {
            result = result.filter((p) => selectedTopics.includes(p.topic));
        }

        // Recency Filter
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

        // Sorting
        result.sort((a, b) => {
            if (sortKey === 'recency') {
                const diff = parseDateToTimestamp(b.date) - parseDateToTimestamp(a.date);
                // b - a is descending (newest first). Flip it for ascending.
                return sortDir === 'desc' ? diff : -diff;
            } else {
                // views
                const vA = views[a.slug] || 0;
                const vB = views[b.slug] || 0;
                const diff = vA - vB;
                // typically views desc is largest first
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

            <div className="container mx-auto px-4 lg:px-20 pt-8 lg:pt-12 pb-20 max-w-[1000px]">
                {/* Toggle + Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col items-center gap-6 mb-8"
                >
                    {/* Sort + Filter Row */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {/* Sort buttons */}
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

                        {/* Filter toggle */}
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

                {/* Filter Panel */}
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
                                    {/* Name search */}
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

                                    {/* Topic */}
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

                                    {/* Recency */}
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
                                className="space-y-6"
                            >
                                {filteredPosts.map((post) => (
                                    <motion.article
                                        key={post.slug}
                                        variants={itemVariants}
                                        whileHover={{ x: 6 }}
                                        onClick={() => navigate(`/blog/${post.slug}`)}
                                        className="group cursor-pointer relative"
                                    >
                                        <div
                                            className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-500
                                            ${
                                                theme === 'light'
                                                    ? 'bg-slate-200 group-hover:bg-gradient-to-b group-hover:from-blue-400 group-hover:to-cyan-400'
                                                    : 'bg-slate-700 group-hover:bg-gradient-to-b group-hover:from-[#3c86ff] group-hover:to-[#69f1ff]'
                                            }`}
                                        />

                                        <div className="pl-6 py-4 flex flex-col sm:flex-row gap-6 sm:items-center">
                                            <div className="shrink-0 w-full sm:w-40 md:w-48 aspect-video rounded-lg overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700/50">
                                                <img
                                                    src={`/artifacts/blog/${post.slug}.png`}
                                                    alt={post.title}
                                                    className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                                                    onError={(e) => {
                                                        const parent = (e.target as HTMLElement)
                                                            .parentElement;
                                                        if (parent) {
                                                            parent.style.display = 'none';
                                                        }
                                                    }}
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                                    <span className="blog-meta">
                                                        <FaClock className="text-[10px]" />
                                                        {formatDisplayDate(post.date)} •{' '}
                                                        {post.readMins} mins
                                                    </span>
                                                    <span className="blog-meta">
                                                        <FaEye className="text-[10px]" />
                                                        {views[post.slug]?.toLocaleString() ||
                                                            0}{' '}
                                                        {views[post.slug] === 1 ? 'view' : 'views'}
                                                    </span>
                                                    <span className="blog-tag">
                                                        <FaTag className="text-[8px]" />
                                                        {post.topic}
                                                    </span>
                                                </div>

                                                <h2 className="card-title text-xl lg:text-2xl">
                                                    {post.title}
                                                </h2>
                                                <p className="card-text lg:text-base mb-3 leading-relaxed mt-2 line-clamp-2">
                                                    {post.hook}
                                                </p>

                                                <span className="link-arrow mt-2">
                                                    Read Post
                                                    <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1 text-xs" />
                                                </span>
                                            </div>
                                        </div>

                                        <div
                                            className={`ml-6 h-[1px]
                                            ${theme === 'light' ? 'bg-slate-100' : 'bg-slate-800'}`}
                                        />
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
