import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaArrowLeft, FaClock, FaEye, FaTag, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BlogPost, blogPosts } from '../constants';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface BlogTemplateProps {
    post: BlogPost;
    views?: number;
    children: React.ReactNode;
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
        <div className="container mx-auto px-4 lg:px-20 pt-20 pb-20 max-w-[1000px]">
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate('/blog')}
                className="btn-back group"
            >
                <FaArrowLeft className="transform transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Back to Blog</span>
            </motion.button>

            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                <motion.div variants={itemVariants} className="mb-10">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="blog-meta">
                            <FaClock className="text-[10px]" />
                            {formatDisplayDate(post.date)} • {post.readMins} mins
                        </span>
                        <span className="blog-meta">
                            <FaEye className="text-[10px]" />
                            {viewCount.toLocaleString()} {viewCount === 1 ? 'view' : 'views'}
                        </span>
                        <span className="blog-tag">
                            <FaTag className="text-[8px]" />
                            {post.topic}
                        </span>
                    </div>

                    <h1
                        className={`text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3c86ff] to-[#69f1ff] mb-2
                        ${theme === 'light' ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]' : 'drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]'}`}
                    >
                        {post.title}
                    </h1>
                </motion.div>

                {children}
            </motion.div>

            {/* Bottom Navigation */}
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
                                Next Post
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
    );
};

export default BlogTemplate;
