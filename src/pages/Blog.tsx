import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SwipeReveal from '../components/SwipeReveal';
import { FaArrowRight, FaClock, FaTag } from 'react-icons/fa';
import { blogPosts } from '../constants';

const Blog: React.FC = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

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
                    Technical deep-dives, lessons learned, and honest opinions.
                </motion.p>
            </div>

            <div className="container mx-auto px-4 lg:px-20 pt-14 pb-20 max-w-4xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="space-y-6"
                >
                    {blogPosts.map((post) => (
                        <motion.article
                            key={post.slug}
                            variants={itemVariants}
                            whileHover={{ x: 6 }}
                            transition={{ duration: 0.25 }}
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

                            <div className="pl-6 py-4">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <span className="blog-meta">
                                        <FaClock className="text-[10px]" />
                                        {post.date} • {post.readTime}
                                    </span>
                                    <div className="flex gap-1.5">
                                        {post.tags.map((tag, i) => (
                                            <span key={i} className="blog-tag">
                                                <FaTag className="text-[8px]" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <h2 className="card-title text-xl lg:text-2xl">{post.title}</h2>
                                <p className="item-subtitle mb-2">{post.subtitle}</p>

                                <p className="card-text lg:text-base mb-3">{post.preview}</p>

                                <span className="link-arrow">
                                    Read Post
                                    <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1 text-xs" />
                                </span>
                            </div>

                            <div
                                className={`ml-6 h-[1px]
                                ${theme === 'light' ? 'bg-slate-100' : 'bg-slate-800'}`}
                            />
                        </motion.article>
                    ))}
                </motion.div>
            </div>

            <br />
            <br />
        </>
    );
};

export default Blog;
