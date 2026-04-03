import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../constants';
import { normalizeTitle, getSkillIconPath, getSkillIconFallback } from '../lib/utils';
import SkillTooltipWrapper from './SkillTooltipWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
    FaArrowLeft,
    FaGithub,
    FaExternalLinkAlt,
    FaChevronDown,
    FaChevronUp,
    FaChevronLeft,
    FaChevronRight,
    FaSearchPlus,
    FaSearchMinus,
    FaTimes,
} from 'react-icons/fa';

const ProjectDetail: React.FC = () => {
    const { theme } = useTheme();
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [expandedTech, setExpandedTech] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);

    const projectIndex = projects.findIndex((p) => normalizeTitle(p.name) === slug);
    const project = projects[projectIndex];

    let prevIndex = (projectIndex - 1 + projects.length) % projects.length;
    while (projects[prevIndex]?.indev && prevIndex !== projectIndex) {
        prevIndex = (prevIndex - 1 + projects.length) % projects.length;
    }
    const prevProject = projects[prevIndex];

    let nextIndex = (projectIndex + 1) % projects.length;
    while (projects[nextIndex]?.indev && nextIndex !== projectIndex) {
        nextIndex = (nextIndex + 1) % projects.length;
    }
    const nextProject = projects[nextIndex];

    const handleNavigate = (targetSlug: string) => {
        navigate(`/work/projects/${normalizeTitle(targetSlug)}`);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        setCurrentImageIndex(0);
        setIsLightboxOpen(false);
        setZoomLevel(1);
    }, [slug]);

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center pt-20 lg:pt-24">
                <h1
                    className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                >
                    Project Not Found
                </h1>
                <button
                    onClick={() => navigate('/work')}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all"
                >
                    ← Back to All Works
                </button>
            </div>
        );
    }

    const projectImages = (project.artifacts ?? []).map(
        (_, i) => `/artifacts/projects/${slug}/image${i + 1}.png`,
    );
    const renderBullets = (text: string) => {
        if (!text) {
            return null;
        }
        const bullets = text
            .split('\n')
            .map((b: string) => b.replace(/^•\s*/, '').trim())
            .filter((b: string) => b.length > 0);

        return (
            <ul className="space-y-3">
                {bullets.map((bullet: string, i: number) => {
                    const colonIndex = bullet.indexOf(':');
                    if (colonIndex !== -1) {
                        const prefix = bullet.substring(0, colonIndex + 1);
                        const rest = bullet.substring(colonIndex + 1);
                        return (
                            <li key={i} className="flex items-start gap-3">
                                <span className="bullet-dot mt-2" />
                                <span
                                    className={`text-lg leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}
                                >
                                    <strong
                                        className={`${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}
                                    >
                                        {prefix}
                                    </strong>
                                    {rest}
                                </span>
                            </li>
                        );
                    }
                    return (
                        <li key={i} className="flex items-start gap-3">
                            <span className="bullet-dot mt-2" />
                            <span
                                className={`text-lg leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}
                            >
                                {bullet}
                            </span>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
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

    const iconPath = `/artifacts/projects/${normalizeTitle(project.name)}/icon.png`;

    return (
        <div
            key={slug}
            className="container mx-auto px-4 lg:px-20 pt-8 lg:pt-12 pb-16 max-w-[1200px]"
        >
            <div className="flex items-center justify-between mb-10">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate('/work')}
                    className="btn-back group !mb-0 py-1"
                >
                    <FaArrowLeft className="transform transition-transform duration-300 group-hover:-translate-x-1" />
                    <span>Back to Work</span>
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3"
                >
                    <button
                        onClick={() => handleNavigate(prevProject.name)}
                        className="btn-nav-compact group"
                        title={`Previous: ${prevProject.name}`}
                    >
                        <FaChevronLeft className="text-sm transform transition-transform duration-300 group-hover:-translate-x-0.5" />
                        <span className="hidden sm:inline">Prev</span>
                    </button>
                    <button
                        onClick={() => handleNavigate(nextProject.name)}
                        className="btn-nav-compact group"
                        title={`Next: ${nextProject.name}`}
                    >
                        <span className="hidden sm:inline">Next</span>
                        <FaChevronRight className="text-sm transform transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                </motion.div>
            </div>

            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                <motion.div variants={itemVariants} className="mb-10 text-center lg:text-left">
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="flex items-center gap-4 lg:gap-6 mb-4">
                            <img
                                src={iconPath}
                                alt={`${project.name} logo`}
                                className="w-14 h-14 lg:w-20 lg:h-20 object-contain shrink-0"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/default.png';
                                }}
                            />
                            <h1
                                className={`text-5xl lg:text-7xl font-bold
                                    ${theme === 'light' ? 'text-slate-900 drop-shadow-[4px_4px_2px_rgba(80,140,255,0.45)]' : 'text-white drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                            >
                                {project.name}
                            </h1>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 justify-center lg:justify-start">
                            <p className="date-meta text-lg">
                                {project.date}
                                {project.span ? ` • ${project.span}` : ''}
                            </p>

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
                                        <FaExternalLinkAlt /> Visit Website
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

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
                                        project.artifacts?.[currentImageIndex] ||
                                        `${project?.name} Artifact ${currentImageIndex + 1}`
                                    }
                                    className="w-full h-full object-contain transition-opacity duration-300"
                                />
                            </div>

                            {project.artifacts && project.artifacts[currentImageIndex] && (
                                <div className="absolute bottom-0 left-0 right-0 pb-8 pt-4 px-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                                    <p className="text-white text-sm font-medium text-center drop-shadow-md">
                                        {project.artifacts[currentImageIndex]}
                                    </p>
                                </div>
                            )}

                            {projectImages.length > 1 && (
                                <>
                                    <button
                                        onClick={() =>
                                            setCurrentImageIndex((prev) =>
                                                prev === 0 ? projectImages.length - 1 : prev - 1,
                                            )
                                        }
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                    >
                                        <FaChevronLeft />
                                    </button>
                                    <button
                                        onClick={() =>
                                            setCurrentImageIndex((prev) =>
                                                prev === projectImages.length - 1 ? 0 : prev + 1,
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                                    >
                                        <FaChevronRight />
                                    </button>

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

            {project.intro && (
                <motion.div variants={itemVariants} className="mb-12 max-w-4xl mx-auto">
                    <p
                        className={`text-xl text-center lg:text-2xl ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}
                    >
                        {project.intro}
                    </p>
                </motion.div>
            )}

            <div className="flex flex-col space-y-8 mb-12 max-w-4xl mx-auto">
                {project.desc && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                        className="card-static"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="section-subheading-lg">What is it?</h2>
                        </div>
                        <p
                            className={`text-lg leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}
                        >
                            {project.desc}
                        </p>
                    </motion.div>
                )}

                {project.feats && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                        className="card-static"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="section-subheading-lg">Key Things Shipped:</h2>
                        </div>
                        <div className="text-lg">{renderBullets(project.feats)}</div>
                    </motion.div>
                )}

                <div className="!mt-[4px]"></div>

                {project.res && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                        className="card-static"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="section-subheading-lg">Result:</h2>
                        </div>
                        <div className="text-lg">{renderBullets(project.res)}</div>
                    </motion.div>
                )}

                <div className="!mt-[6px]"></div>

                {project.skills && Object.keys(project.skills).length > 0 && (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                        className="card-static"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <h2 className="section-subheading-lg !mb-0">Tech Used:</h2>
                            </div>
                            <button
                                onClick={() => setExpandedTech(!expandedTech)}
                                className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}
                                title={expandedTech ? 'Show Compact View' : 'Show Expanded View'}
                            >
                                {expandedTech ? (
                                    <FaChevronUp size={14} />
                                ) : (
                                    <FaChevronDown size={14} />
                                )}
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {expandedTech ? (
                                <motion.div
                                    key="expanded"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    {Object.entries(project.skills).map(
                                        ([category, skillMap], catIdx) => (
                                            <div key={catIdx}>
                                                <h3
                                                    className={`text-sm font-bold uppercase tracking-wider mb-3 ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}
                                                >
                                                    {category}
                                                </h3>
                                                <div className="space-y-2">
                                                    {Object.entries(skillMap).map(
                                                        ([skill, desc], i) => (
                                                            <div
                                                                key={i}
                                                                className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-3 rounded-lg border ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-800/20 border-slate-700/50'}`}
                                                            >
                                                                <div className="flex items-center gap-3 shrink-0 w-56">
                                                                    <img
                                                                        src={getSkillIconPath(
                                                                            skill,
                                                                            theme,
                                                                        )}
                                                                        alt={skill}
                                                                        className="w-5 h-5 object-contain"
                                                                        onError={(e) => {
                                                                            const img =
                                                                                e.target as HTMLImageElement;
                                                                            const fallback =
                                                                                getSkillIconFallback(
                                                                                    skill,
                                                                                );
                                                                            if (
                                                                                img.src.endsWith(
                                                                                    fallback,
                                                                                )
                                                                            ) {
                                                                                img.style.display =
                                                                                    'none';
                                                                            } else {
                                                                                img.src = fallback;
                                                                            }
                                                                        }}
                                                                    />
                                                                    <span
                                                                        className={`font-semibold text-base ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                                                                    >
                                                                        {skill}
                                                                    </span>
                                                                </div>
                                                                <span
                                                                    className={`text-sm leading-relaxed flex-1 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}
                                                                >
                                                                    {desc}
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="compact"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`w-full border rounded-xl ${theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#111318]/50 border-slate-700/50'}`}
                                >
                                    {Object.entries(project.skills).map(
                                        ([category, skillMap], catIdx) => (
                                            <div
                                                key={catIdx}
                                                className={`flex flex-col md:flex-row border-b last:border-b-0 first:rounded-t-xl last:rounded-b-xl ${theme === 'light' ? 'border-slate-200' : 'border-slate-700/50'}`}
                                            >
                                                <div
                                                    className={`w-full md:w-36 shrink-0 p-2 pl-4 font-semibold text-sm uppercase tracking-wider flex items-center md:first:rounded-tl-xl md:last:rounded-bl-xl ${theme === 'light' ? 'bg-slate-50 text-slate-500' : 'bg-slate-800/30 text-slate-400'}`}
                                                >
                                                    {category}
                                                </div>
                                                <div className="flex-1 p-2 flex flex-wrap gap-1 md:gap-1.5">
                                                    {Object.entries(skillMap).map(
                                                        ([skill, desc], i) => (
                                                            <div key={i}>
                                                                <SkillTooltipWrapper
                                                                    theme={theme}
                                                                    content={
                                                                        <div className="leading-relaxed opacity-90">
                                                                            {desc}
                                                                        </div>
                                                                    }
                                                                >
                                                                    <div
                                                                        className={`px-2.5 py-1 rounded-md text-xs font-medium border whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 hover:cursor-default ${
                                                                            theme === 'light'
                                                                                ? 'bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300'
                                                                                : 'bg-slate-800/50 text-slate-300 border-slate-600/50 hover:border-slate-500'
                                                                        }`}
                                                                    >
                                                                        <img
                                                                            src={getSkillIconPath(
                                                                                skill,
                                                                                theme,
                                                                            )}
                                                                            alt={skill}
                                                                            className="w-[18px] h-[18px] object-contain"
                                                                            onError={(e) => {
                                                                                const img =
                                                                                    e.target as HTMLImageElement;
                                                                                const fallback =
                                                                                    getSkillIconFallback(
                                                                                        skill,
                                                                                    );
                                                                                if (
                                                                                    img.src.endsWith(
                                                                                        fallback,
                                                                                    )
                                                                                ) {
                                                                                    img.style.display =
                                                                                        'none';
                                                                                } else {
                                                                                    img.src =
                                                                                        fallback;
                                                                                }
                                                                            }}
                                                                        />
                                                                        {skill}
                                                                    </div>
                                                                </SkillTooltipWrapper>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsLightboxOpen(false);
                            }}
                            className="absolute top-6 right-6 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-black/70 transition-colors z-50 shadow-lg"
                        >
                            <FaTimes className="text-xl" />
                        </button>

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

                        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50 w-full px-4 max-w-2xl text-center">
                            <div className="bg-black/50 backdrop-blur-md border border-white/10 shadow-lg rounded-full px-4 py-1 text-white/90 text-sm font-medium">
                                {currentImageIndex + 1} / {projectImages.length}
                            </div>
                            {project.artifacts && project.artifacts[currentImageIndex] && (
                                <h3 className="text-white text-lg font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                    {project.artifacts[currentImageIndex]}
                                </h3>
                            )}
                        </div>

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
                                alt={`${project?.name} Zoomed Artifact`}
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

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6 ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}
            >
                <div className="flex flex-col items-center sm:items-start order-2 sm:order-1">
                    <button onClick={() => navigate('/work')} className="btn-back group !mb-0">
                        <FaArrowLeft className="transform transition-transform duration-300 group-hover:-translate-x-1" />
                        <span>Back to All Works</span>
                    </button>
                </div>

                <div className="flex items-center gap-4 order-1 sm:order-2">
                    <button
                        onClick={() => handleNavigate(prevProject.name)}
                        className="btn-nav-full group pr-6"
                    >
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold mb-0.5">
                                Previous
                            </span>
                            <div className="flex items-center gap-2">
                                <FaChevronLeft className="text-xs transition-transform group-hover:-translate-x-1" />
                                <span className="font-bold text-sm sm:text-base">
                                    {prevProject.name}
                                </span>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => handleNavigate(nextProject.name)}
                        className="btn-nav-full group pl-6"
                    >
                        <div className="flex flex-col items-start text-right">
                            <span className="text-[10px] uppercase tracking-widest opacity-50 font-bold mb-0.5">
                                Next
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm sm:text-base">
                                    {nextProject.name}
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

export default ProjectDetail;
