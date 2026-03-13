import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../constants';
import { FaLocationDot, FaFileLines, FaGithub, FaLinkedin } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeReveal from '../components/SwipeReveal';
import { useTheme } from '../context/ThemeContext';
import { PiArrowFatLinesRightFill } from 'react-icons/pi';
import ProjectCard from '../components/ProjectCard';
import { getAge } from '../lib/utils';
import SkillTooltipWrapper from '../components/SkillTooltipWrapper';

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

// interface LatestBlogPost {
//     slug: string;
//     views: number;
// }

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

const Home: React.FC = () => {
    const { theme } = useTheme();

    const navigate = useNavigate();
    const [isIntroComplete, setIsIntroComplete] = useState(false);
    const age = getAge();

    const [githubData, setGithubData] = useState<{
        totalContributions: number;
        weeks: { contributionDays: ContributionDay[] }[];
    } | null>(null);
    const [commits, setCommits] = useState<Commit[]>([]);
    const githubScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (githubData && isIntroComplete && githubScrollRef.current) {
            const scrollToEnd = () => {
                if (githubScrollRef.current) {
                    githubScrollRef.current.scrollLeft = githubScrollRef.current.scrollWidth;
                }
            };

            // Initial scroll
            const timeoutId = setTimeout(scrollToEnd, 100);

            // Also listen for resize to keep it right-aligned if it was at the end
            window.addEventListener('resize', scrollToEnd);

            return () => {
                clearTimeout(timeoutId);
                window.removeEventListener('resize', scrollToEnd);
            };
        }
    }, [githubData, isIntroComplete]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [contribRes, commitRes] = await Promise.all([
                    fetch(`${API_URL}/api/github/contributions`),
                    fetch(`${API_URL}/api/github/commits`),
                    // fetch(`${API_URL}/api/blog/latest`),
                ]);

                if (contribRes.ok) {
                    setGithubData(await contribRes.json());
                }
                if (commitRes.ok) {
                    setCommits(await commitRes.json());
                }
            } catch (error) {
                console.error('Error fetching home page data:', error);
            }
        };

        fetchData();
    }, []);

    const featuredProjects = projects.filter(
        (item) => item.name === 'Stellar Papers' || item.name === 'GoalGetter',
    );

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
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const isLgUp = useLgUp();

    const formatHeatmapHover = (count: number, dateStr: string) => {
        const [year, month, day] = dateStr.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        const fullMonthName = date.toLocaleString('default', { month: 'long' });
        const dayNum = date.getDate();
        let suffix = 'th';
        if (dayNum === 1 || dayNum === 21 || dayNum === 31) {
            suffix = 'st';
        } else if (dayNum === 2 || dayNum === 22) {
            suffix = 'nd';
        } else if (dayNum === 3 || dayNum === 23) {
            suffix = 'rd';
        }

        const countStr =
            count === 0 ? 'No contributions' : `${count} contribution${count !== 1 ? 's' : ''}`;
        return `${countStr} on ${fullMonthName} ${dayNum}${suffix}`;
    };

    const getHeatmapColor = (count: number, theme: string, defaultColor: string) => {
        if (count === 0) {
            return theme === 'light' ? '#cbd5e1' : '#1e293b';
        }
        if (theme === 'light') {
            return defaultColor;
        }

        if (count <= 3) {
            return '#0e4429';
        }
        if (count <= 6) {
            return '#006d32';
        }
        if (count <= 10) {
            return '#26a641';
        }
        return '#39d353';
    };

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
                className={`main-content relative z-[95] flex flex-col lg:flex-row items-center justify-center pt-6 lg:pt-10 w-full transition-all duration-300 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
            >
                <div className="flex flex-col lg:flex-row items-center justify-center container mx-auto px-4 lg:px-20 max-w-7xl">
                    <div className="text-center lg:text-left lg:w-3/5 flex flex-col items-center lg:items-start">
                        <div className="mt-4">
                            <SwipeReveal onComplete={() => setIsIntroComplete(true)}>
                                <h1
                                    className={`text-5xl lg:text-8xl font-bold leading-tight text-center lg:text-left whitespace-nowrap mb-3 pt-2
                                    ${theme === 'light' ? 'drop-shadow-[4px_4px_2px_rgba(80,140,255,0.45)]' : 'drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                                >
                                    Hi, I'm{' '}
                                    <span
                                        className={`relative bg-clip-text text-transparent pr-2 bg-gradient-to-r ${theme === 'light' ? 'from-[#00a3ff] to-[#2563eb]' : 'from-[#3c86ff] to-[#69f1ff]'}`}
                                    >
                                        Bryan
                                    </span>
                                    <motion.span
                                        className={`inline-block cursor-grab origin-[70%_70%] bg-clip-text text-transparent bg-gradient-to-r ${theme === 'light' ? 'from-[#2f6aeb] to-[#2563eb]' : 'from-[#69f1ff] to-[#6cf4ff]'}`}
                                        whileHover={{ rotate: [0, 25, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    >
                                        👋
                                    </motion.span>
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
                                        <button
                                            onClick={() => navigate('/work')}
                                            className="btn-primary"
                                        >
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
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {isIntroComplete && (
                <div className="container mx-auto px-4 lg:px-20 pt-24 pb-16">
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
                        className="w-full lg:w-fit mx-auto"
                    >
                        <motion.div
                            variants={itemVariants}
                            className={`flex flex-col gap-8 p-6 rounded-2xl h-full max-w-full ${
                                theme === 'light'
                                    ? 'bg-slate-200/80 shadow-md'
                                    : 'bg-[#111318]/95 border border-slate-700/50 shadow-2xl'
                            }`}
                        >
                            <div>
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
                                        <div className="flex min-w-0">
                                            <div className="flex flex-col gap-1 mt-[18px] text-[10px] text-slate-400 mr-2 flex-shrink-0 font-medium">
                                                <span className="h-[10px] leading-[10px] invisible">
                                                    S
                                                </span>
                                                <span className="h-[10px] leading-[10px]">Mon</span>
                                                <span className="h-[10px] leading-[10px] invisible">
                                                    T
                                                </span>
                                                <span className="h-[10px] leading-[10px]">Wed</span>
                                                <span className="h-[10px] leading-[10px] invisible">
                                                    T
                                                </span>
                                                <span className="h-[10px] leading-[10px]">Fri</span>
                                                <span className="h-[10px] leading-[10px] invisible">
                                                    S
                                                </span>
                                            </div>

                                            <div
                                                ref={githubScrollRef}
                                                className="flex flex-col overflow-x-auto pb-4 pt-1 -mt-1 flex-1"
                                            >
                                                <div className="flex text-[10px] font-medium text-slate-400 mb-1 h-[14px]">
                                                    {githubData.weeks.map((week, i) => {
                                                        const firstDay = new Date(
                                                            week.contributionDays[0].date +
                                                                'T00:00:00',
                                                        );
                                                        const prevWeek =
                                                            i > 0
                                                                ? new Date(
                                                                      githubData.weeks[i - 1]
                                                                          .contributionDays[0]
                                                                          .date + 'T00:00:00',
                                                                  )
                                                                : null;
                                                        const isNewMonth =
                                                            !prevWeek ||
                                                            prevWeek.getMonth() !==
                                                                firstDay.getMonth();

                                                        return (
                                                            <div
                                                                key={`m-${i}`}
                                                                className="flex-shrink-0 relative"
                                                                style={{ width: '14px' }}
                                                            >
                                                                {isNewMonth && (
                                                                    <span className="absolute left-0">
                                                                        {firstDay.toLocaleString(
                                                                            'default',
                                                                            { month: 'short' },
                                                                        )}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                <div className="flex gap-1">
                                                    {githubData.weeks.map((week, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex flex-col gap-1 flex-shrink-0"
                                                        >
                                                            {week.contributionDays.map((day, j) => (
                                                                <SkillTooltipWrapper
                                                                    key={j}
                                                                    theme={theme}
                                                                    compact={true}
                                                                    content={
                                                                        <div className="font-medium tracking-tight whitespace-nowrap">
                                                                            {formatHeatmapHover(
                                                                                day.contributionCount,
                                                                                day.date,
                                                                            )}
                                                                        </div>
                                                                    }
                                                                >
                                                                    <div
                                                                        className="w-[10px] h-[10px] rounded-[2px]"
                                                                        style={{
                                                                            backgroundColor:
                                                                                getHeatmapColor(
                                                                                    day.contributionCount,
                                                                                    theme,
                                                                                    day.color,
                                                                                ),
                                                                        }}
                                                                    />
                                                                </SkillTooltipWrapper>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
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

                            <div className="flex flex-col flex-1">
                                <h3 className="card-title text-2xl mb-4 flex items-center gap-2">
                                    Recent Commits
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {commits.length > 0
                                        ? commits.slice(0, 5).map((commit, i) => (
                                              <a
                                                  key={i}
                                                  href={commit.url}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className={`block py-2 px-3 rounded-xl transition-all ${
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
                    </motion.div>
                </div>
            )}

            <br />
            <br />
        </>
    );
};

export default Home;
