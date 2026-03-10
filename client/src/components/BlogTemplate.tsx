import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BlogPost, blogPosts } from '../constants';
import { formatDisplayDate } from '../lib/utils';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface BlogTemplateProps {
    post: BlogPost;
    views?: number;
    children: React.ReactNode;
}

function truncateTitle(title: string, maxLength: number = 30): string {
    if (title.length <= maxLength) {
        return title;
    }
    return title.slice(0, maxLength).trimEnd() + '...';
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({ post, views = 0, children }) => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
    const prevPost =
        currentIndex !== -1 ? blogPosts[(currentIndex + 1) % blogPosts.length] : blogPosts[0];
    const nextPost =
        currentIndex !== -1
            ? blogPosts[(currentIndex - 1 + blogPosts.length) % blogPosts.length]
            : blogPosts[0];

    const handleNavigate = (targetSlug: string) => {
        navigate(`/blog/${targetSlug}`);
        window.scrollTo(0, 0);
    };

    const [viewCount, setViewCount] = useState(views);

    useEffect(() => {
        let isMounted = true;
        const trackView = async () => {
            try {
                const res = await fetch(`${API_URL}/api/blog/${post.slug}/view`, {
                    method: 'POST',
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.json();
                    if (isMounted && data.views !== undefined) {
                        setViewCount(data.views);
                    }
                }
            } catch (err) {
                console.error('Failed to track view', err);
            }
        };
        trackView();

        return () => {
            isMounted = false;
        };
    }, [post.slug]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    return (
        <>
            <div className="container mx-auto px-4 lg:px-20 pt-8 lg:pt-12 max-w-[1200px]">
                {/* Top Navigation */}
                <div className="flex items-center justify-between mb-8 sm:mb-12">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => navigate('/blog')}
                        className="btn-back group !mb-0 py-1"
                    >
                        <FaArrowLeft className="transform transition-transform duration-300 group-hover:-translate-x-1" />
                        <span>Back to Blog</span>
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-3"
                    >
                        <button
                            onClick={() => handleNavigate(prevPost.slug)}
                            className="btn-nav-compact group"
                            title={`Previous: ${prevPost.title}`}
                        >
                            <FaChevronLeft className="text-sm transform transition-transform duration-300 group-hover:-translate-x-0.5" />
                            <span className="hidden sm:inline">Prev</span>
                        </button>
                        <button
                            onClick={() => handleNavigate(nextPost.slug)}
                            className="btn-nav-compact group"
                            title={`Next: ${nextPost.title}`}
                        >
                            <span className="hidden sm:inline">Next</span>
                            <FaChevronRight className="text-sm transform transition-transform duration-300 group-hover:translate-x-0.5" />
                        </button>
                    </motion.div>
                </div>

                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    <motion.div variants={itemVariants} className="mb-10 text-center lg:text-left">
                        <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-6 mb-2">
                            <h1
                                className={`text-5xl lg:text-7xl font-bold
                                    ${theme === 'light' ? 'text-slate-900 drop-shadow-[4px_4px_2px_rgba(80,140,255,0.45)]' : 'text-white drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                            >
                                {post.title}
                            </h1>

                            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start">
                                <p className="date-meta font-bold pointer-events-none !mb-0 text-center lg:text-left">
                                    {formatDisplayDate(post.date)} • {post.readMins} mins •{' '}
                                    {viewCount.toLocaleString()}{' '}
                                    {viewCount === 1 ? 'view' : 'views'}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div variants={itemVariants} className="mb-12 max-w-4xl mx-auto">
                        <div
                            className={`relative rounded-2xl overflow-hidden shadow-lg border group aspect-video flex items-center justify-center bg-black/95 ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}
                        >
                            <div className="w-full h-full flex items-center justify-center">
                                <img
                                    src={`/artifacts/blog/${post.slug}.png`}
                                    alt={`${post.title} cover`}
                                    className="w-full h-full object-cover transition-opacity duration-300"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* CONTENT BODY */}
            <div className="container mx-auto px-4 lg:px-20 max-w-[1000px]">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {children}
                </motion.div>
            </div>

            {/* BOTTOM NAVIGATION */}
            <div className="container mx-auto px-4 lg:px-20 pb-16 max-w-[1200px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6 ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}
                >
                    <div className="flex flex-col items-center sm:items-start order-2 sm:order-1">
                        <button onClick={() => navigate('/blog')} className="btn-back group !mb-0">
                            <FaArrowLeft className="transform transition-transform duration-300 group-hover:-translate-x-1" />
                            <span>Back to Blog</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4 order-1 sm:order-2">
                        <button
                            onClick={() => handleNavigate(prevPost.slug)}
                            className="btn-nav-full group pr-6"
                        >
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold mb-0.5">
                                    Previous
                                </span>
                                <div className="flex items-center gap-2">
                                    <FaChevronLeft className="text-xs transition-transform group-hover:-translate-x-1" />
                                    <span className="font-bold text-sm sm:text-base">
                                        {truncateTitle(prevPost.title)}
                                    </span>
                                </div>
                            </div>
                        </button>

                        <button
                            onClick={() => handleNavigate(nextPost.slug)}
                            className="btn-nav-full group pl-6"
                        >
                            <div className="flex flex-col items-start text-right">
                                <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold mb-0.5">
                                    Next
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm sm:text-base">
                                        {truncateTitle(nextPost.title)}
                                    </span>
                                    <FaChevronRight className="text-xs transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default BlogTemplate;
