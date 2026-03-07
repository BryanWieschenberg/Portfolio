import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { experience, Experience } from '../constants';
import { normalizeTitle, getSkillIconPath, getSkillIconFallback } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
    FaArrowLeft,
    FaCogs,
    FaClipboardList,
    FaBuilding,
    FaChevronLeft,
    FaChevronRight,
    FaSearchPlus,
    FaSearchMinus,
    FaTimes,
} from 'react-icons/fa';

const ExperienceDetail: React.FC = () => {
    const { theme } = useTheme();
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Lightbox State
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);

    const exp = experience.find(
        (w: Experience) => normalizeTitle(`${w.role} ${w.company}`) === slug,
    );

    if (!exp) {
        return (
            <div className="flex flex-col items-center justify-center pt-20 lg:pt-24">
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
    const expSlug = normalizeTitle(exp.role);
    const projectImages = (exp.artifacts ?? []).map(
        (_, i) => `/artifacts/experience/${expSlug}/image${i + 1}.png`,
    );
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
            <div className="container mx-auto px-4 lg:px-20 pt-8 lg:pt-12 pb-16 max-w-5xl">
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

                    {/* Artifact Gallery Carousel */}
                    {projectImages.length > 0 && (
                        <motion.div variants={itemVariants} className="mb-12 max-w-4xl mx-auto">
                            <div
                                className={`relative rounded-2xl overflow-hidden shadow-lg border group aspect-video flex items-center justify-center bg-black/95 ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}
                            >
                                <div
                                    className="w-full h-full flex items-center justify-center cursor-zoom-in"
                                    onClick={() => {
                                        setZoomLevel(1);
                                        setIsLightboxOpen(true);
                                    }}
                                >
                                    <img
                                        src={projectImages[currentImageIndex]}
                                        alt={
                                            exp.artifacts?.[currentImageIndex] ||
                                            `${exp.role} Artifact ${currentImageIndex + 1}`
                                        }
                                        className="w-full h-full object-contain transition-opacity duration-300"
                                    />
                                </div>

                                {/* Artifact Description Overlay (Main Gallery) */}
                                {exp.artifacts && exp.artifacts[currentImageIndex] && (
                                    <div className="absolute bottom-0 left-0 right-0 pb-10 pt-4 px-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                                        <p className="text-white text-sm font-medium text-center drop-shadow-md">
                                            {exp.artifacts[currentImageIndex]}
                                        </p>
                                    </div>
                                )}

                                {projectImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={() =>
                                                setCurrentImageIndex((prev) =>
                                                    prev === 0
                                                        ? projectImages.length - 1
                                                        : prev - 1,
                                                )
                                            }
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                        >
                                            <FaChevronLeft />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setCurrentImageIndex((prev) =>
                                                    prev === projectImages.length - 1
                                                        ? 0
                                                        : prev + 1,
                                                )
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                        >
                                            <FaChevronRight />
                                        </button>

                                        {/* Dots */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                                            {projectImages.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setCurrentImageIndex(i)}
                                                    className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={itemVariants}
                    className="card-static"
                >
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
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                        className="card-static"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <FaCogs className="text-xl icon-accent" />
                            <h2 className="section-subheading-lg">Tech Stack</h2>
                        </div>
                        <div
                            className={`w-full border rounded-xl ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#111318]/50 border-slate-700/50'}`}
                        >
                            {Object.entries(exp.skills).map(([category, skillMap], catIdx) => (
                                <div
                                    key={catIdx}
                                    className={`flex flex-col md:flex-row border-b last:border-b-0 first:rounded-t-xl last:rounded-b-xl ${theme === 'light' ? 'border-slate-200' : 'border-slate-700/50'}`}
                                >
                                    <div
                                        className={`w-full md:w-36 shrink-0 p-4 font-semibold text-sm uppercase tracking-wider flex items-center md:first:rounded-tl-xl md:last:rounded-bl-xl ${theme === 'light' ? 'bg-slate-50 text-slate-500' : 'bg-slate-800/30 text-slate-400'}`}
                                    >
                                        {category}
                                    </div>
                                    <div className="flex-1 p-4 flex flex-wrap gap-2">
                                        {Object.entries(skillMap).map(([skill, desc], i) => (
                                            <div
                                                key={i}
                                                className={`group relative px-2.5 py-1 rounded-md text-xs font-medium border whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 ${
                                                    theme === 'light'
                                                        ? 'bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300'
                                                        : 'bg-slate-800/50 text-slate-300 border-slate-600/50 hover:border-slate-500'
                                                }`}
                                            >
                                                <img
                                                    src={getSkillIconPath(skill, theme)}
                                                    alt={skill}
                                                    className="w-[18px] h-[18px] object-contain"
                                                    onError={(e) => {
                                                        const img = e.target as HTMLImageElement;
                                                        const fallback =
                                                            getSkillIconFallback(skill);
                                                        if (img.src.endsWith(fallback)) {
                                                            img.style.display = 'none';
                                                        } else {
                                                            img.src = fallback;
                                                        }
                                                    }}
                                                />
                                                {skill}

                                                {/* Custom Floating Panel */}
                                                <div
                                                    className={`absolute bottom-[calc(100%+10px)] left-0 min-w-[200px] w-max max-w-[280px] p-3 text-sm font-normal rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-[100] whitespace-normal pointer-events-none text-left border ${
                                                        theme === 'light'
                                                            ? 'bg-white text-slate-700 border-slate-200/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]'
                                                            : 'bg-[#111318] text-slate-300 border-slate-700/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-2 mb-1.5">
                                                        <span
                                                            className={`font-semibold ${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}
                                                        >
                                                            {skill}
                                                        </span>
                                                    </div>
                                                    <div className="leading-relaxed opacity-90">
                                                        {desc}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsLightboxOpen(false);
                            }}
                            className="absolute top-6 right-6 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-black/70 transition-colors z-50 shadow-lg"
                        >
                            <FaTimes className="text-xl" />
                        </button>

                        {/* Lightbox Navigation */}
                        {projectImages.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setZoomLevel(1);
                                        setCurrentImageIndex((prev) =>
                                            prev === 0 ? projectImages.length - 1 : prev - 1,
                                        );
                                    }}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-black/70 transition-colors z-50 shadow-lg"
                                >
                                    <FaChevronLeft className="text-xl" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setZoomLevel(1);
                                        setCurrentImageIndex((prev) =>
                                            prev === projectImages.length - 1 ? 0 : prev + 1,
                                        );
                                    }}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-black/70 transition-colors z-50 shadow-lg"
                                >
                                    <FaChevronRight className="text-xl" />
                                </button>
                            </>
                        )}

                        {/* Lightbox Info Bar (Position & Description) */}
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 w-full px-4 max-w-2xl text-center">
                            <div className="bg-black/50 backdrop-blur-md border border-white/10 shadow-lg rounded-full px-4 py-1 text-white/90 text-sm font-medium">
                                {currentImageIndex + 1} / {projectImages.length}
                            </div>
                            {exp.artifacts && exp.artifacts[currentImageIndex] && (
                                <h3 className="text-white text-lg font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                    {exp.artifacts[currentImageIndex]}
                                </h3>
                            )}
                        </div>

                        {/* Zoom Controls */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-md border border-white/10 shadow-lg rounded-full px-6 py-3 z-50">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setZoomLevel((prev) => Math.max(0.5, prev - 0.25));
                                }}
                                className="p-2 text-white hover:text-blue-400 transition-colors disabled:opacity-50"
                                disabled={zoomLevel <= 0.5}
                            >
                                <FaSearchMinus className="text-xl" />
                            </button>
                            <span className="text-white font-medium min-w-[3rem] text-center">
                                {Math.round(zoomLevel * 100)}%
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setZoomLevel((prev) => Math.min(4, prev + 0.25));
                                }}
                                className="p-2 text-white hover:text-blue-400 transition-colors disabled:opacity-50"
                                disabled={zoomLevel >= 4}
                            >
                                <FaSearchPlus className="text-xl" />
                            </button>
                        </div>

                        {/* Draggable & Zoomable Image */}
                        <div
                            className="w-full h-full flex items-center justify-center overflow-hidden"
                            onWheel={(e) => {
                                e.stopPropagation();
                                if (e.deltaY < 0) {
                                    setZoomLevel((prev) => Math.min(4, prev + 0.1));
                                } else {
                                    setZoomLevel((prev) => Math.max(0.5, prev - 0.1));
                                }
                            }}
                        >
                            <motion.img
                                src={projectImages[currentImageIndex]}
                                alt={`${exp.role} Zoomed Artifact`}
                                drag
                                dragConstraints={{
                                    left: -1000,
                                    right: 1000,
                                    top: -1000,
                                    bottom: 1000,
                                }}
                                dragElastic={0.1}
                                animate={{ scale: zoomLevel }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="max-w-[90vw] max-h-[90vh] object-contain cursor-grab active:cursor-grabbing"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <br />
            <br />
        </>
    );
};

export default ExperienceDetail;
