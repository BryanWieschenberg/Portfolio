import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects, blogPosts } from '../constants';
import { FaLocationDot, FaFileLines, FaGithub, FaLinkedin } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeReveal from '../components/SwipeReveal';
import { useTheme } from '../context/ThemeContext';
import { PiArrowFatLinesRightFill } from 'react-icons/pi';
import ProjectCard from '../components/ProjectCard';
import { getAge } from '../lib/utils';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ContributionDay {
    date: string;
    contributionCount: number;
    color: string;
}

interface Commit {
    sha: string;
    message: string;
    repo: string;
    date: string;
    url: string;
}

interface LatestBlogPost {
    slug: string;
    views: number;
}

function useLgUp() {
    const [isLgUp, setIsLgUp] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const handler = () => setIsLgUp(mq.matches);
        handler();
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return isLgUp;
}

const GooglyEyes: React.FC<{
    mousePos: { x: number; y: number };
    profileRef: React.RefObject<HTMLDivElement>;
}> = ({ mousePos, profileRef }) => {
    const [eyeOffsets, setEyeOffsets] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });

    useEffect(() => {
        if (!profileRef.current) {
            return;
        }
        const rect = profileRef.current.getBoundingClientRect();

        const calculateOffset = (eyeXPercent: number, eyeYPercent: number) => {
            const eyeX = rect.left + rect.width * eyeXPercent;
            const eyeY = rect.top + rect.height * eyeYPercent;

            const dx = mousePos.x - eyeX;
            const dy = mousePos.y - eyeY;
            const angle = Math.atan2(dy, dx);
            const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 8, 10);

            return {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
            };
        };

        setEyeOffsets({
            left: calculateOffset(0.41, 0.42),
            right: calculateOffset(0.59, 0.42),
        });
    }, [mousePos, profileRef]);

    return (
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {/* Left Eye */}
            <div
                className="absolute w-4 h-4 lg:w-6 lg:h-6 rounded-full border-black flex items-center justify-center overflow-hidden shadow-inner"
                style={{ left: '41%', top: '42%', transform: 'translate(-50%, -50%)' }}
            >
                <div
                    className="w-2 h-2 lg:w-3 lg:h-3 bg-black rounded-full"
                    style={{
                        transform: `translate(${eyeOffsets.left.x / 2}px, ${eyeOffsets.left.y / 2}px)`,
                    }}
                />
            </div>
            {/* Right Eye */}
            <div
                className="absolute w-4 h-4 lg:w-6 lg:h-6 rounded-full flex items-center justify-center overflow-hidden shadow-inner"
                style={{ left: '59%', top: '42%', transform: 'translate(-50%, -50%)' }}
            >
                <div
                    className="w-2 h-2 lg:w-3 lg:h-3 bg-black rounded-full"
                    style={{
                        transform: `translate(${eyeOffsets.right.x / 2}px, ${eyeOffsets.right.y / 2}px)`,
                    }}
                />
            </div>
        </div>
    );
};

const Home: React.FC = () => {
    const { theme } = useTheme();
    const featuredRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();
    const [isIntroComplete, setIsIntroComplete] = useState(false);
    const age = getAge();

    const [githubData, setGithubData] = useState<{
        totalContributions: number;
        weeks: { contributionDays: ContributionDay[] }[];
    } | null>(null);
    const [commits, setCommits] = useState<Commit[]>([]);
    const [latestBlog, setLatestBlog] = useState<LatestBlogPost | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [contribRes, commitRes, blogRes] = await Promise.all([
                    fetch(`${API_URL}/api/github/contributions`),
                    fetch(`${API_URL}/api/github/commits`),
                    fetch(`${API_URL}/api/blog/latest`),
                ]);

                if (contribRes.ok) setGithubData(await contribRes.json());
                if (commitRes.ok) setCommits(await commitRes.json());
                if (blogRes.ok) setLatestBlog(await blogRes.json());
            } catch (error) {
                console.error('Error fetching home page data:', error);
            }
        };

        fetchData();
    }, []);

    const featuredProjects = projects.filter(
        (item) => item.name === 'Stellar Papers' || item.name === 'GoalGetter',
    );

    const scrollToFeatured = (e: React.MouseEvent) => {
        e.preventDefault();
        featuredRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const ContactMe = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/contact');
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const isLgUp = useLgUp();

    return (
        <>
            <AnimatePresence>
                {!isIntroComplete && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[90] pointer-events-none"
                        style={{
                            background:
                                theme === 'light'
                                    ? 'linear-gradient(to bottom, #f1f5f9, #e2e8f0 40%, #cbd5e1 100%)'
                                    : 'linear-gradient(to bottom, #1e242b, #0f1214ff 40%, #0c0d0dff 100%)',
                        }}
                    />
                )}
            </AnimatePresence>

            <div
                className={`main-content relative z-[95] flex flex-col lg:flex-row items-center justify-center pt-8 lg:pt-12 w-full transition-all duration-300 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
            >
                <div className="flex flex-col lg:flex-row items-center justify-center container mx-auto px-4 lg:px-20 max-w-7xl">
                    <div className="text-center lg:text-left lg:w-3/5 flex flex-col items-center lg:items-start">
                        <div className="mt-4">
                            <SwipeReveal onComplete={() => setIsIntroComplete(true)}>
                                <h1
                                    className={`text-5xl lg:text-8xl font-bold leading-tight text-center lg:text-left whitespace-nowrap 
                                    ${theme === 'light' ? 'drop-shadow-[4px_4px_2px_rgba(80,140,255,0.45)]' : 'drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                                >
                                    Hi, I'm{' '}
                                    <span className="relative bg-gradient-to-r from-[#3c86ff] to-[#69f1ff] bg-clip-text text-transparent">
                                        Bryan 👋
                                    </span>
                                </h1>
                            </SwipeReveal>
                        </div>

                        <AnimatePresence>
                            {isIntroComplete && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full flex flex-col items-center lg:items-start"
                                >
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className={`mt-1 flex text-xl lg:text-3xl font-semibold leading-relaxed drop-shadow-lg ${theme === 'light' ? 'text-slate-800' : 'text-[#f0f4f8]'}`}
                                    >
                                        {isLgUp && (
                                            <PiArrowFatLinesRightFill className="shrink-0 text-xl lg:text-3xl" />
                                        )}
                                        <span className="lg:pl-2">Full-Stack Engineer</span>
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className={`mt-2 flex items-center font-medium ${theme === 'light' ? 'text-blue-600' : 'text-[#69f1ff]'}`}
                                    >
                                        <FaLocationDot className="mr-2" />
                                        <span>{age} y/o from Montville, New Jersey</span>
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className={`mt-6 text-base lg:text-xl max-w-2xl text-center lg:text-left leading-relaxed italic ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}
                                    >
                                        I build full-stack solutions and backend systems that scale,
                                        are secure, and can perform under even the harshest
                                        conditions.
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="mt-8 flex flex-row justify-center lg:justify-start space-x-4 w-full"
                                    >
                                        <button onClick={scrollToFeatured} className="btn-primary">
                                            View Work
                                        </button>
                                        <button onClick={ContactMe} className="btn-outline">
                                            Get in Touch
                                        </button>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className={`mt-6 flex flex-wrap justify-center lg:justify-start gap-6 font-medium ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}
                                    >
                                        <a
                                            href="https://github.com/BryanWieschenberg/"
                                            target="_blank"
                                            className={`transition-colors flex items-center gap-2 ${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-white'}`}
                                        >
                                            <FaGithub />
                                            <span>GitHub</span>
                                        </a>
                                        <a
                                            href="https://linkedin.com/in/BryanWieschenberg/"
                                            target="_blank"
                                            className={`transition-colors flex items-center gap-2 ${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-white'}`}
                                        >
                                            <FaLinkedin />
                                            <span>LinkedIn</span>
                                        </a>
                                        <a
                                            href="/attachments/Resume%20-%20Bryan%20Wieschenberg.pdf"
                                            target="_blank"
                                            className={`transition-colors flex items-center gap-2 ${theme === 'light' ? 'hover:text-blue-600' : 'hover:text-white'}`}
                                        >
                                            <FaFileLines />
                                            <span>Resume</span>
                                        </a>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex justify-center items-center mt-12 lg:mt-0 lg:w-2/5 w-full">
                        <AnimatePresence>
                            {isIntroComplete && (
                                <motion.div
                                    ref={profileRef}
                                    onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative group perspective"
                                >
                                    <motion.div
                                        animate={{
                                            scale: [0.95, 1.05, 0.95],
                                            opacity: [0.25, 0.6, 0.25],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                        className="absolute -inset-1 bg-gradient-to-r from-[#3c86ff] to-[#69f1ff] rounded-full blur"
                                    ></motion.div>
                                    <img
                                        src={
                                            theme === 'light'
                                                ? '/images/photo-light.png'
                                                : '/images/photo-dark.png'
                                        }
                                        alt="Bryan"
                                        className="relative rounded-full border-4 border-[#3c86ff] object-cover w-64 h-64 lg:w-96 lg:h-96 transform transition duration-500 hover:scale-105 shadow-2xl z-10"
                                    />
                                    <GooglyEyes mousePos={mousePos} profileRef={profileRef} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {isIntroComplete && (
                <div ref={featuredRef} className="container mx-auto px-4 lg:px-20 pt-24 pb-16">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            variants={itemVariants}
                            className={`text-4xl lg:text-6xl font-bold mb-4 text-center 
                                ${theme === 'light' ? 'text-slate-900 drop-shadow-[4px_4px_2px_rgba(80,140,255,0.45)]' : 'text-white drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                        >
                            Featured Work
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="page-subtitle mb-12 text-center"
                        >
                            A selection of my strongest engineering projects:
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {featuredProjects.map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    project={project}
                                    variants={itemVariants}
                                />
                            ))}
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-12 text-center transition-all duration-700 ease-out transform"
                        >
                            <button onClick={() => navigate('/work')} className="link-text group">
                                <span>View All Work</span>
                                <span className="transform transition-transform duration-300 group-hover:translate-x-2">
                                    →
                                </span>
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            )}

            {isIntroComplete && (
                <div className="container mx-auto px-4 lg:px-20 pb-24">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={containerVariants}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
                    >
                        {/* Left Column: GitHub Activity */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-8">
                            {/* Commit Heatmap */}
                            <div
                                className={`p-6 rounded-2xl ${theme === 'light' ? 'bg-slate-200/80 shadow-md' : 'bg-[#111318]/95 border border-slate-700/50 shadow-2xl'}`}
                            >
                                <h3 className="card-title text-2xl mb-4 flex items-center gap-2">
                                    <FaGithub /> GitHub Activity
                                </h3>
                                {githubData ? (
                                    <>
                                        <p
                                            className={`mb-4 text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}
                                        >
                                            {githubData.totalContributions} contributions in the
                                            last year
                                        </p>
                                        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
                                            {githubData.weeks.map((week, i) => (
                                                <div
                                                    key={i}
                                                    className="flex flex-col gap-1 flex-shrink-0"
                                                >
                                                    {week.contributionDays.map((day, j) => (
                                                        <div
                                                            key={j}
                                                            className="w-[10px] h-[10px] rounded-[2px]"
                                                            style={{
                                                                backgroundColor:
                                                                    day.contributionCount > 0
                                                                        ? day.color
                                                                        : theme === 'light'
                                                                          ? '#cbd5e1'
                                                                          : '#1e293b',
                                                            }}
                                                            title={`${day.contributionCount} contributions on ${day.date}`}
                                                        />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="animate-pulse flex gap-1 overflow-hidden">
                                        {[...Array(52)].map((_, i) => (
                                            <div key={i} className="flex flex-col gap-1">
                                                {[...Array(7)].map((_, j) => (
                                                    <div
                                                        key={j}
                                                        className={`w-[10px] h-[10px] rounded-[2px] ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-800'}`}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Commit History */}
                            <div
                                className={`p-6 rounded-2xl flex flex-col ${theme === 'light' ? 'bg-slate-200/80 shadow-md' : 'bg-[#111318]/95 border border-slate-700/50 shadow-2xl'}`}
                            >
                                <h3 className="card-title text-2xl mb-4 flex items-center gap-2">
                                    Recent Commits
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {commits.length > 0
                                        ? commits.slice(0, 5).map((commit, i) => (
                                              <a
                                                  key={i}
                                                  href={commit.url}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className={`block p-3 rounded-xl transition-all ${
                                                      theme === 'light'
                                                          ? 'bg-white hover:shadow-md'
                                                          : 'bg-[#1a1f2e] hover:bg-[#252b3b]'
                                                  }`}
                                              >
                                                  <h4 className="font-bold text-sm truncate">
                                                      {commit.message}
                                                  </h4>
                                                  <p
                                                      className={`text-xs mt-1 flex justify-between ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}
                                                  >
                                                      <span className="truncate mr-2">
                                                          {commit.repo}
                                                      </span>
                                                      <span>
                                                          {new Date(
                                                              commit.date,
                                                          ).toLocaleDateString()}
                                                      </span>
                                                  </p>
                                              </a>
                                          ))
                                        : [...Array(5)].map((_, i) => (
                                              <div
                                                  key={i}
                                                  className={`h-[68px] rounded-xl animate-pulse ${theme === 'light' ? 'bg-white' : 'bg-[#1a1f2e]'}`}
                                              />
                                          ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Latest Blog Post */}
                        <motion.div variants={itemVariants} className="flex flex-col">
                            <div
                                className={`p-6 rounded-2xl h-full flex flex-col ${theme === 'light' ? 'bg-slate-200/80 shadow-md' : 'bg-[#111318]/95 border border-slate-700/50 shadow-2xl'}`}
                            >
                                <h3 className="card-title text-2xl mb-4">Latest Blog Post</h3>
                                {latestBlog && blogPosts.find((p) => p.slug === latestBlog.slug) ? (
                                    (() => {
                                        const post = blogPosts.find(
                                            (p) => p.slug === latestBlog.slug,
                                        )!;
                                        return (
                                            <div
                                                onClick={() => navigate(`/blog/${post.slug}`)}
                                                className={`group cursor-pointer relative flex flex-col flex-grow p-6 rounded-xl transition-all ${
                                                    theme === 'light'
                                                        ? 'bg-white hover:shadow-lg'
                                                        : 'bg-[#1a1f2e] hover:bg-[#252b3b]'
                                                }`}
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <span
                                                        className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                                                            theme === 'light'
                                                                ? 'bg-slate-100 text-slate-600 border-slate-200'
                                                                : 'bg-slate-800/50 text-slate-300 border-slate-600/50'
                                                        }`}
                                                    >
                                                        {post.topic}
                                                    </span>
                                                    <p
                                                        className={`text-xs font-medium ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}
                                                    >
                                                        {post.date}
                                                    </p>
                                                </div>
                                                <h4 className="text-2xl font-bold mb-4 group-hover:text-[#3c86ff] transition-colors">
                                                    {post.title}
                                                </h4>
                                                <p
                                                    className={`text-sm mb-6 flex-grow leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}
                                                >
                                                    {post.hook}
                                                </p>
                                                <div
                                                    className={`mt-auto flex justify-between items-center text-sm font-medium pt-4 border-t ${
                                                        theme === 'light'
                                                            ? 'border-slate-100'
                                                            : 'border-slate-700/50'
                                                    }`}
                                                >
                                                    <span className="flex items-center gap-1.5">
                                                        <FaFileLines /> {post.readMins} min read
                                                    </span>
                                                    <span>{latestBlog.views} views</span>
                                                </div>
                                            </div>
                                        );
                                    })()
                                ) : (
                                    <div
                                        className={`flex-grow rounded-xl animate-pulse ${theme === 'light' ? 'bg-white' : 'bg-[#1a1f2e]'}`}
                                    />
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            )}

            <br />
            <br />
        </>
    );
};

export default Home;
