import React, { useRef } from 'react';
import { projects, experience, Project, Experience } from '../constants';
import { normalizeTitle } from '../lib/utils';
import { motion } from 'framer-motion';
// import { useTheme } from '../context/ThemeContext';
import SwipeReveal from '../components/SwipeReveal';
import ProjectCard from '../components/ProjectCard';
import ExperienceCard from '../components/ExperienceCard';
import { FaBriefcase } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const Work: React.FC = () => {
    // const { theme } = useTheme(); commented to shut up build errors
    const experienceRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 },
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

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    const renderProjectCard = (project: Project) => (
        <ProjectCard key={normalizeTitle(project.name)} project={project} variants={itemVariants} />
    );

    const renderExperienceCard = (exp: Experience) => (
        <ExperienceCard key={normalizeTitle(exp.role)} experience={exp} variants={itemVariants} />
    );

    return (
        <>
            <div className="page-hero">
                <SwipeReveal
                    circleColor="bg-gradient-to-r from-[#3c86ff] to-[#69f1ff]"
                    shadowColor="shadow-[0_0_50px_rgba(60,134,255,0.6)]"
                    duration={0.6}
                >
                    <h1 className="page-title">My Work</h1>
                </SwipeReveal>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="page-subtitle"
                >
                    Case studies of projects I've built and professional experience I've gained.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-6 flex flex-wrap justify-center gap-4"
                >
                    <button
                        onClick={() =>
                            experienceRef.current?.scrollIntoView({ behavior: 'smooth' })
                        }
                        className="btn-solid-sm"
                    >
                        <FaBriefcase />
                        Experience
                    </button>
                    <button
                        onClick={() => projectsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-outline-sm"
                    >
                        <HiSparkles />
                        Projects
                    </button>
                </motion.div>
            </div>

            <div ref={projectsRef} className="page-section-wide">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={containerVariants}
                >
                    <motion.div variants={headerVariants} className="text-center mb-12">
                        <h2 className="section-heading-xl from-[#69f1ff] to-[#3c86ff]">Projects</h2>
                        <p className="page-subtitle text-base lg:text-lg">
                            Things I've built from scratch.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={containerVariants}
                    className="mb-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((p) => renderProjectCard(p))}
                    </div>
                </motion.section>
            </div>

            <div className="container mx-auto px-20 pt-8">
                <div className="divider my-0" />
            </div>

            <div ref={experienceRef} className="container mx-auto px-4 lg:px-20 pt-20 pb-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={containerVariants}
                >
                    <motion.div variants={headerVariants} className="text-center mb-10">
                        <h2 className="section-heading-xl from-[#8580e7] to-[#3c86ff]">
                            Professional Experience
                        </h2>
                        <p className="page-subtitle text-base lg:text-lg">
                            Roles where I've delivered real impact.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto space-y-5">
                        {experience.map((exp: Experience) => renderExperienceCard(exp))}
                    </div>
                </motion.div>
            </div>

            <br />
            <br />
        </>
    );
};

export default Work;
