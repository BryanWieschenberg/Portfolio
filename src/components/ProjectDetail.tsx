import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../constants';
import { normalizeTitle } from '../lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
    FaArrowLeft,
    FaGithub,
    FaExternalLinkAlt,
    FaUserCheck,
    FaCogs,
    FaClipboardList,
} from 'react-icons/fa';

const ProjectDetail: React.FC = () => {
    const { theme } = useTheme();
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const project = projects.find((p) => normalizeTitle(p.name) === slug);

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1
                    className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                >
                    Project Not Found
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

    const bullets = project.desc
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
                        <div className="flex flex-wrap items-start gap-4 mb-3">
                            <h1 className="section-heading-xl from-[#3c86ff] to-[#69f1ff] text-4xl lg:text-6xl">
                                {project.name}
                            </h1>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <p className="date-meta">
                                {project.date}
                                {project.span ? ` • ${project.span}` : ''}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-repo"
                                >
                                    <FaGithub /> View Repository
                                </a>
                            )}
                            {project.url && (
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-live"
                                >
                                    <FaExternalLinkAlt /> Live Demo
                                </a>
                            )}
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

                    {project.role_desc && (
                        <motion.div
                            variants={itemVariants}
                            className={`rounded-2xl p-6 mb-6 border relative overflow-hidden
                            ${
                                theme === 'light'
                                    ? 'bg-gradient-to-br from-blue-50 to-white border-blue-200/80 shadow-lg'
                                    : 'bg-gradient-to-br from-[#0b1021] to-[#111b33] border-blue-800/30 shadow-2xl'
                            }`}
                        >
                            <div
                                className={`absolute top-0 left-0 bottom-0 w-[3px]
                                ${theme === 'light' ? 'bg-gradient-to-b from-blue-400 to-cyan-400' : 'bg-gradient-to-b from-[#3c86ff] to-[#69f1ff]'}`}
                            />

                            <div className="flex items-center gap-3 mb-3 pl-3">
                                <FaUserCheck
                                    className={`text-xl ${theme === 'light' ? 'text-blue-600' : 'text-[#69f1ff]'}`}
                                />
                                <h2
                                    className={`text-xl lg:text-2xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                                >
                                    My Contribution
                                </h2>
                            </div>
                            <p
                                className={`text-sm lg:text-base leading-relaxed pl-3
                                ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                            >
                                {project.role_desc}
                            </p>
                        </motion.div>
                    )}

                    {project.skills && Object.keys(project.skills).length > 0 && (
                        <motion.div variants={itemVariants} className="card-static">
                            <div className="flex items-center gap-3 mb-4">
                                <FaCogs className="text-xl icon-accent" />
                                <h2 className="section-subheading-lg">Tech Stack</h2>
                            </div>
                            {Object.entries(project.skills).map(([category, skillMap], catIdx) => (
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

export default ProjectDetail;
