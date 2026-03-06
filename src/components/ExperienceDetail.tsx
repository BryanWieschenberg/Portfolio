import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { experience, Experience } from '../constants';
import { normalizeTitle } from '../lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaArrowLeft, FaCogs, FaClipboardList, FaBuilding } from 'react-icons/fa';

const ExperienceDetail: React.FC = () => {
    const { theme } = useTheme();
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const exp = experience.find(
        (w: Experience) => normalizeTitle(`${w.role} ${w.company}`) === slug,
    );

    if (!exp) {
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

    const imagePath = `/images/${normalizeTitle(exp.company)}.png`;
    const bullets = exp.desc
        .split('\n')
        .map((b: string) => b.replace(/^•\s*/, '').trim())
        .filter((b: string) => b.length > 0);

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

    // Flatten all skills from nested categories
    const allSkills = Object.values(exp.skills).flatMap((category) =>
        Object.entries(category).map(([name, description]) => ({ name, description })),
    );

    return (
        <>
            <div className="container mx-auto px-4 lg:px-20 pt-20 pb-16 max-w-5xl">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate('/work')}
                    className="btn-back group mb-8"
                >
                    <FaArrowLeft className="transform transition-transform duration-300 group-hover:-translate-x-1" />
                    <span>Back to Work</span>
                </motion.button>

                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    <motion.div variants={itemVariants} className="mb-10">
                        <div className="flex items-start gap-6 mb-4">
                            <div className="logo-box w-20 h-20 lg:w-24 lg:h-24 rounded-2xl border-2 shadow-xl">
                                <img
                                    src={imagePath}
                                    alt={`${exp.company} logo`}
                                    className="w-14 h-14 lg:w-16 lg:h-16 object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/images/default.png';
                                    }}
                                />
                            </div>

                            <div>
                                <h1 className="section-heading-xl from-[#8580e7] to-[#3c86ff] text-3xl lg:text-5xl">
                                    {exp.role}
                                </h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <FaBuilding
                                        className={`text-sm ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                                    />
                                    <span className="item-subtitle text-lg">{exp.company}</span>
                                </div>
                                <p className="date-meta mt-1">{exp.date}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="card-static">
                        <div className="flex items-center gap-3 mb-4">
                            <FaClipboardList className="text-xl icon-accent" />
                            <h2 className="section-subheading-lg">Overview</h2>
                        </div>
                        <ul className="space-y-3">
                            {bullets.map((bullet: string, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="bullet-dot" />
                                    <span className="bullet-text">{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {allSkills.length > 0 && (
                        <motion.div variants={itemVariants} className="card-static">
                            <div className="flex items-center gap-3 mb-4">
                                <FaCogs className="text-xl icon-accent" />
                                <h2 className="section-subheading-lg">Tech Stack</h2>
                            </div>
                            {Object.entries(exp.skills).map(([category, skillMap], catIdx) => (
                                <div key={catIdx} className="mb-4">
                                    <h3
                                        className={`text-xs font-semibold uppercase tracking-wider mb-2 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}
                                    >
                                        {category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        {Object.entries(skillMap).map(([skill, desc], i) => (
                                            <div
                                                key={i}
                                                className={`skill-badge-lg ${theme === 'light' ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800/40 text-slate-300 border-slate-600/50'}`}
                                                title={desc}
                                            >
                                                <span>{skill}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
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
