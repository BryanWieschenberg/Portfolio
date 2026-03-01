import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SwipeReveal from '../components/SwipeReveal';
import { FaArrowRight, FaClock, FaTag } from 'react-icons/fa';

export interface BlogPost {
    slug: string;
    title: string;
    subtitle: string;
    date: string;
    readTime: string;
    tags: string[];
    preview: string;
}

export const blogPosts: BlogPost[] = [
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
    {
        slug: 'streamline',
        title: 'Building StreamLine',
        subtitle: 'An Encrypted, Multithreaded Chat Server in Rust',
        date: 'Jul 2025',
        readTime: '12 min read',
        tags: ['Rust', 'Systems', 'Cryptography'],
        preview:
            'Why I chose the hardest possible way to build a chat app — and what it taught me about ownership, encryption, and protocol design.',
    },
    {
        slug: 'goalgetter',
        title: 'Building GoalGetter',
        subtitle: 'A Productivity App with 30+ Users and Zero Excuses',
        date: 'Aug 2025',
        readTime: '11 min read',
        tags: ['Full-Stack', 'Auth', 'Product'],
        preview:
            'What I learned shipping a real product — from auth nightmares to scheduling math to the moment someone said "I use this every day."',
    },
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
];

const Blog: React.FC = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const topRef = useRef<HTMLParagraphElement | null>(null);

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
            <p id="ToTop" ref={topRef} className="invisible text-white">
                ToTop
            </p>

            {/* Hero */}
            <div className="pt-16 lg:pt-20 text-center px-4">
                <SwipeReveal
                    circleColor="bg-gradient-to-r from-[#3c86ff] to-[#69f1ff]"
                    shadowColor="shadow-[0_0_50px_rgba(60,134,255,0.6)]"
                    duration={0.6}
                >
                    <h1
                        className={`text-6xl lg:text-8xl font-bold lg:mt-2 pb-2 text-center relative bg-clip-text text-transparent
                        ${
                            theme === 'light'
                                ? 'bg-gradient-to-r from-blue-700 to-cyan-500 drop-shadow-[3px_3px_1px_rgba(30,30,160,0.2)]'
                                : 'bg-gradient-to-r from-[#3c86ff] to-[#69f1ff] drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'
                        }`}
                    >
                        Blog
                    </h1>
                </SwipeReveal>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className={`mt-2 text-lg lg:text-xl max-w-2xl mx-auto
                    ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}
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
                            {/* Left accent line */}
                            <div
                                className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-500
                                ${
                                    theme === 'light'
                                        ? 'bg-slate-200 group-hover:bg-gradient-to-b group-hover:from-blue-400 group-hover:to-cyan-400'
                                        : 'bg-gray-700 group-hover:bg-gradient-to-b group-hover:from-[#3c86ff] group-hover:to-[#69f1ff]'
                                }`}
                            />

                            <div className="pl-6 py-4">
                                {/* Meta */}
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <span
                                        className={`text-xs font-medium flex items-center gap-1
                                        ${theme === 'light' ? 'text-slate-400' : 'text-gray-500'}`}
                                    >
                                        <FaClock className="text-[10px]" />
                                        {post.date} • {post.readTime}
                                    </span>
                                    <div className="flex gap-1.5">
                                        {post.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1
                                                ${
                                                    theme === 'light'
                                                        ? 'bg-blue-50 text-blue-600'
                                                        : 'bg-blue-900/30 text-blue-300'
                                                }`}
                                            >
                                                <FaTag className="text-[8px]" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Title */}
                                <h2
                                    className={`text-xl lg:text-2xl font-bold mb-1 transition-colors duration-300
                                    ${
                                        theme === 'light'
                                            ? 'text-slate-900 group-hover:text-blue-600'
                                            : 'text-white group-hover:text-[#69f1ff]'
                                    }`}
                                >
                                    {post.title}
                                </h2>
                                <p
                                    className={`text-sm font-semibold mb-2
                                    ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                                >
                                    {post.subtitle}
                                </p>

                                {/* Preview */}
                                <p
                                    className={`text-sm lg:text-base leading-relaxed mb-3
                                    ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}
                                >
                                    {post.preview}
                                </p>

                                {/* Read more */}
                                <span
                                    className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300
                                    ${theme === 'light' ? 'text-blue-500 group-hover:text-blue-700' : 'text-blue-400 group-hover:text-[#69f1ff]'}`}
                                >
                                    Read Post
                                    <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1 text-xs" />
                                </span>
                            </div>

                            {/* Bottom separator */}
                            <div
                                className={`ml-6 h-[1px]
                                ${theme === 'light' ? 'bg-slate-100' : 'bg-gray-800'}`}
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
