import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { work } from '../constants';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
    FaArrowLeft,
    FaGithub,
    FaExternalLinkAlt,
    FaUserCheck,
    FaCogs,
    FaImages,
    FaClipboardList,
    FaBuilding,
} from 'react-icons/fa';

const ExperienceDetail: React.FC = () => {
    const { theme } = useTheme();
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const topRef = useRef<HTMLParagraphElement | null>(null);

    const experience = work.find((w) => w.slug === slug);

    if (!experience) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1
                    className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                >
                    Experience Not Found
                </h1>
                <button
                    onClick={() => navigate('/work')}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all"
                >
                    ← Back to Work
                </button>
            </div>
        );
    }

    const getSkillColor = (level: number) => {
        switch (level) {
            case 0:
                return theme === 'light'
                    ? 'bg-blue-100 text-blue-700 border-blue-200'
                    : 'bg-blue-900/40 text-blue-300 border-blue-700/50';
            case 1:
                return theme === 'light'
                    ? 'bg-green-100 text-green-700 border-green-200'
                    : 'bg-green-900/40 text-green-300 border-green-700/50';
            case 2:
                return theme === 'light'
                    ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                    : 'bg-yellow-900/40 text-yellow-300 border-yellow-700/50';
            case 3:
                return theme === 'light'
                    ? 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200'
                    : 'bg-fuchsia-900/40 text-fuchsia-300 border-fuchsia-700/50';
            default:
                return theme === 'light'
                    ? 'bg-slate-100 text-slate-600 border-slate-200'
                    : 'bg-slate-800/40 text-slate-300 border-slate-600/50';
        }
    };

    const getSkillTypeLabel = (level: number) => {
        switch (level) {
            case 0:
                return 'Language';
            case 1:
                return 'Framework';
            case 2:
                return 'Tool';
            case 3:
                return 'Research';
            case 4:
                return 'Concept';
            default:
                return '';
        }
    };

    const imagePath = `/images/${experience.company.toLowerCase().replace(/\s+/g, '')}.png`;
    const bullets = experience.desc
        .split('\n')
        .map((b) => b.replace(/^•\s*/, '').trim())
        .filter((b) => b.length > 0);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: 'easeOut' },
        },
    };

    return (
        <>
            <p id="ToTop" ref={topRef} className="invisible text-white">
                ToTop
            </p>

            <div className="container mx-auto px-4 lg:px-20 pt-20 pb-16 max-w-5xl">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate('/work')}
                    className={`mb-8 flex items-center gap-2 text-sm font-semibold transition-all duration-300 group
                    ${theme === 'light' ? 'text-slate-500 hover:text-blue-600' : 'text-gray-400 hover:text-[#69f1ff]'}`}
                >
                    <FaArrowLeft className="transform transition-transform duration-300 group-hover:-translate-x-1" />
                    <span>Back to Work</span>
                </motion.button>

                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    <motion.div variants={itemVariants} className="mb-10">
                        <div className="flex items-start gap-6 mb-4">
                            <div
                                className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden flex items-center justify-center shadow-xl
                                ${theme === 'light' ? 'bg-white border-2 border-slate-200' : 'bg-white/10 border-2 border-gray-600/50'}`}
                            >
                                <img
                                    src={imagePath}
                                    alt={`${experience.company} logo`}
                                    className="w-14 h-14 lg:w-16 lg:h-16 object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/images/default.png';
                                    }}
                                />
                            </div>

                            <div>
                                <h1
                                    className={`text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8580e7] to-[#3c86ff]
                                    ${theme === 'light' ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]' : 'drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]'}`}
                                >
                                    {experience.role}
                                </h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <FaBuilding
                                        className={`text-sm ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                                    />
                                    <span
                                        className={`text-lg font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-300'}`}
                                    >
                                        {experience.company}
                                    </span>
                                </div>
                                <p
                                    className={`text-sm font-semibold tracking-wider uppercase mt-1
                                    ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}
                                >
                                    {experience.date}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {experience.artifacts.liveUrl && (
                                <a
                                    href={experience.artifacts.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-blue-500 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    <FaExternalLinkAlt /> View Live
                                </a>
                            )}
                            {experience.artifacts.repoUrl && (
                                <a
                                    href={experience.artifacts.repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all duration-300 transform hover:-translate-y-0.5
                                    ${
                                        theme === 'light'
                                            ? 'bg-slate-900 text-white hover:bg-slate-700'
                                            : 'bg-white/10 text-white border border-gray-600 hover:bg-white/20'
                                    }`}
                                >
                                    <FaGithub /> View Repository
                                </a>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className={`rounded-2xl p-6 mb-6 border
                        ${
                            theme === 'light'
                                ? 'bg-white/80 backdrop-blur-sm border-slate-200/80 shadow-lg'
                                : 'bg-[#0b1021]/80 backdrop-blur-sm border-gray-700/50 shadow-2xl'
                        }`}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <FaClipboardList
                                className={`text-xl ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                            />
                            <h2
                                className={`text-xl lg:text-2xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                            >
                                Overview
                            </h2>
                        </div>
                        <ul className="space-y-3">
                            {bullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span
                                        className={`mt-2 w-2 h-2 rounded-full flex-shrink-0
                                        ${theme === 'light' ? 'bg-blue-400' : 'bg-[#69f1ff]'}`}
                                    />
                                    <span
                                        className={`text-sm lg:text-base leading-relaxed
                                        ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`}
                                    >
                                        {bullet}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {experience.contribution && (
                        <motion.div
                            variants={itemVariants}
                            className={`rounded-2xl p-6 mb-6 border relative overflow-hidden
                            ${
                                theme === 'light'
                                    ? 'bg-gradient-to-br from-purple-50 to-white border-purple-200/80 shadow-lg'
                                    : 'bg-gradient-to-br from-[#0b1021] to-[#1a1133] border-purple-800/30 shadow-2xl'
                            }`}
                        >
                            <div
                                className={`absolute top-0 left-0 bottom-0 w-[3px]
                                ${theme === 'light' ? 'bg-gradient-to-b from-purple-400 to-blue-400' : 'bg-gradient-to-b from-[#8580e7] to-[#3c86ff]'}`}
                            />

                            <div className="flex items-center gap-3 mb-3 pl-3">
                                <FaUserCheck
                                    className={`text-xl ${theme === 'light' ? 'text-purple-600' : 'text-[#8580e7]'}`}
                                />
                                <h2
                                    className={`text-xl lg:text-2xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                                >
                                    My Contribution
                                </h2>
                            </div>
                            <p
                                className={`text-sm lg:text-base leading-relaxed pl-3
                                ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`}
                            >
                                {experience.contribution}
                            </p>
                        </motion.div>
                    )}

                    {experience.skills && Object.keys(experience.skills).length > 0 && (
                        <motion.div
                            variants={itemVariants}
                            className={`rounded-2xl p-6 mb-6 border
                            ${
                                theme === 'light'
                                    ? 'bg-white/80 backdrop-blur-sm border-slate-200/80 shadow-lg'
                                    : 'bg-[#0b1021]/80 backdrop-blur-sm border-gray-700/50 shadow-2xl'
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <FaCogs
                                    className={`text-xl ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                                />
                                <h2
                                    className={`text-xl lg:text-2xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                                >
                                    Tech Stack
                                </h2>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {Object.entries(experience.skills).map(([skill, level], i) => (
                                    <div
                                        key={i}
                                        className={`group relative px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-300 hover:scale-105 cursor-default ${getSkillColor(level as number)}`}
                                    >
                                        <span>{skill}</span>
                                        <span className={`ml-1.5 text-[10px] opacity-60`}>
                                            {getSkillTypeLabel(level as number)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {(experience.artifacts.screenshots?.length || experience.artifacts.writeup) && (
                        <motion.div
                            variants={itemVariants}
                            className={`rounded-2xl p-6 mb-6 border
                            ${
                                theme === 'light'
                                    ? 'bg-white/80 backdrop-blur-sm border-slate-200/80 shadow-lg'
                                    : 'bg-[#0b1021]/80 backdrop-blur-sm border-gray-700/50 shadow-2xl'
                            }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <FaImages
                                    className={`text-xl ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                                />
                                <h2
                                    className={`text-xl lg:text-2xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                                >
                                    Artifacts
                                </h2>
                            </div>

                            {experience.artifacts.screenshots &&
                                experience.artifacts.screenshots.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        {experience.artifacts.screenshots.map((src, i) => (
                                            <div
                                                key={i}
                                                className={`rounded-xl overflow-hidden border
                                                ${theme === 'light' ? 'border-slate-200' : 'border-gray-700'}`}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`${experience.role} screenshot ${i + 1}`}
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                            {experience.artifacts.writeup && (
                                <div
                                    className={`text-sm leading-relaxed whitespace-pre-line
                                    ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`}
                                >
                                    {experience.artifacts.writeup}
                                </div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            <br />
            <br />
        </>
    );
};

export default ExperienceDetail;
