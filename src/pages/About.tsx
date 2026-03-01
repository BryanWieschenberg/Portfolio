import React, { useRef, useState } from 'react';
import { skills } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SwipeReveal from '../components/SwipeReveal';
import {
    FaGamepad,
    FaMusic,
    FaHiking,
    FaDumbbell,
    FaChess,
    FaBrain,
    FaRocket,
    FaBalanceScale,
    FaTachometerAlt,
    FaShieldAlt,
    FaUsers,
} from 'react-icons/fa';

interface SkillItem {
    name: string;
    icon: string | React.ReactNode;
    type: number;
    yoe: string;
    desc: string;
}

const About: React.FC = () => {
    const { theme } = useTheme();
    const topRef = useRef<HTMLParagraphElement | null>(null);
    const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);

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
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    const skillGridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.02 },
        },
    };

    const skillVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.25, ease: 'easeOut' },
        },
    };

    const categoryColors: { [key: number]: string } = {
        0: 'border-blue-500',
        1: 'border-green-500',
        2: 'border-yellow-500',
        3: 'border-fuchsia-500',
    };

    const categoryBgColors: { [key: number]: string } = {
        0: theme === 'light' ? 'bg-blue-50' : 'bg-blue-900',
        1: theme === 'light' ? 'bg-green-50' : 'bg-green-900',
        2: theme === 'light' ? 'bg-yellow-50' : 'bg-yellow-900',
        3: theme === 'light' ? 'bg-fuchsia-50' : 'bg-fuchsia-900',
    };

    const categoryLabels = [
        { color: 'bg-blue-500', label: 'Languages' },
        { color: 'bg-green-500', label: 'Frameworks' },
        { color: 'bg-yellow-500', label: 'Tools' },
        { color: 'bg-fuchsia-500', label: 'Concepts' },
    ];

    const filteredSkills =
        activeCategory !== null ? skills.filter((s) => s.type === activeCategory) : skills;

    const p = `text-base lg:text-lg leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`;
    const accent =
        theme === 'light' ? 'text-blue-700 font-semibold' : 'text-[#69f1ff] font-semibold';
    const heading = `text-2xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3c86ff] to-[#69f1ff] ${theme === 'light' ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]' : 'drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]'}`;
    const subheading = `text-xl lg:text-2xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-white'}`;
    const divider = `h-[1px] w-full my-16 ${theme === 'light' ? 'bg-gradient-to-r from-transparent via-slate-300 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-700 to-transparent'}`;

    const workStyleTraits = [
        {
            icon: <FaBalanceScale />,
            title: 'Tradeoffs',
            desc: "I don't chase perfection when good-enough ships today. But I also don't ship garbage that I'll rewrite next week. I think about the lifecycle of every decision.",
        },
        {
            icon: <FaShieldAlt />,
            title: 'Quality',
            desc: "If it touches a user or another dev's codebase, I want it clean, readable, and defensible. I write code I'd walk through line-by-line in review.",
        },
        {
            icon: <FaTachometerAlt />,
            title: 'Speed',
            desc: 'I move fast by scoping ruthlessly. I figure out what actually matters, do that well, and skip the rest. Tight MVP over bloated half-finished feature.',
        },
        {
            icon: <FaUsers />,
            title: 'Collaboration',
            desc: "Plain English, not jargon. Direct feedback, dumb questions early. I'd rather overcommunicate than surprise someone at the 11th hour.",
        },
    ];

    const interests = [
        { icon: <FaDumbbell />, label: 'Fitness & lifting' },
        { icon: <FaMusic />, label: 'Music production' },
        { icon: <FaGamepad />, label: 'Competitive gaming' },
        { icon: <FaChess />, label: 'Strategy games' },
        { icon: <FaHiking />, label: 'Hiking & outdoors' },
        { icon: <FaBrain />, label: 'Psychology' },
    ];

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
                        About Me
                    </h1>
                </SwipeReveal>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className={`mt-2 text-lg lg:text-xl max-w-2xl mx-auto italic
                    ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}
                >
                    No fluff. Here's who I actually am.
                </motion.p>
            </div>

            <div className="container mx-auto px-4 lg:px-20 pt-16 pb-20 max-w-4xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {/* ═══════════════ INTRO + PHOTO ═══════════════ */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col lg:flex-row gap-10 items-center"
                    >
                        {/* Photo with glow */}
                        <div className="flex-shrink-0">
                            <div className="relative">
                                <motion.div
                                    animate={{
                                        scale: [0.85, 1, 0.85],
                                        opacity: [0.15, 0.45, 0.15],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                    className="absolute -inset-2 bg-gradient-to-r from-[#3c86ff] to-[#69f1ff] rounded-2xl blur-lg"
                                />
                                <img
                                    src="./assets/images/photo.png"
                                    alt="Bryan"
                                    className="relative rounded-2xl border-2 border-[#3c86ff]/40 object-cover w-48 h-48 lg:w-64 lg:h-64 shadow-2xl z-10"
                                />
                            </div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <p className={p}>
                                I'm Bryan — a 22-year-old full-stack engineer who's genuinely
                                obsessed with building things that work under pressure. Not "works
                                in the demo" — works when 1,000 users hit it at once, works when
                                someone tries to break it, works when the requirements change
                                halfway through.
                            </p>
                            <p className={p}>
                                I think like a systems person but I ship like a product person. I
                                care about architecture, security, and performance — but I care even
                                more about whether the thing actually solves the problem it's
                                supposed to solve.
                            </p>
                            <p className={p}>
                                <span className={accent}>Why I'm a good bet:</span> I take full
                                ownership. I don't wait for tickets. When I see something broken, I
                                fix it. When something's missing, I build it. Every project in my
                                portfolio was built end-to-end by me — from database schema to
                                deployment pipeline.
                            </p>
                        </div>
                    </motion.div>

                    <div className={divider} />

                    {/* ═══════════════ HOW I GOT HERE ═══════════════ */}
                    <motion.div variants={itemVariants} className="space-y-5">
                        <h2 className={heading}>How I Got Here</h2>
                        <p className={p}>
                            I started coding when I was 15 — HTML and CSS, hacking together little
                            websites just to see if I could. That turned into Java in high school,
                            then C++ and data structures in college, and eventually into the
                            full-stack, systems-level engineering that I do now.
                        </p>
                        <p className={p}>
                            At TCNJ, I didn't just take classes — I built things outside of them.
                            While everyone else was studying for exams, I was shipping side
                            projects: a multithreaded encrypted chat server in Rust, a productivity
                            app with real users, a computer vision pipeline for autonomous robots.
                            The classroom gave me foundations; the projects gave me the instincts.
                        </p>
                        <p className={p}>
                            The ML engineering role was a turning point — it was the first time I
                            saw my code directly control a physical system. Writing software that
                            moves a robot is a different kind of accountability. Bugs aren't just
                            errors in a log — they're a machine doing the wrong thing in real life.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ═══════════════ WHAT I CARE ABOUT BUILDING ═══════════════ */}
                    <motion.div variants={itemVariants} className="space-y-5">
                        <h2 className={heading}>What I Care About Building</h2>
                        <p className={p}>
                            I'm most excited about backend systems and infrastructure — the stuff
                            that has to be correct, fast, and resilient. I love working on problems
                            where you can <em>feel</em> the engineering: real-time messaging,
                            concurrency, auth systems, scheduling engines, data pipelines.
                        </p>
                        <p className={p}>
                            That said, I'm not allergic to frontend. I built this entire portfolio
                            in React + TypeScript + Tailwind, and I care about making things look
                            and feel premium. I just gravitate toward the problems that live below
                            the surface.
                        </p>
                        <p className={p}>
                            Right now I'm leaning into Rust and distributed systems — I like
                            languages and paradigms that force you to think harder up front so you
                            ship fewer bugs. The harder the constraints, the more I enjoy the
                            puzzle.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ═══════════════ WHAT I'M OPTIMIZING FOR ═══════════════ */}
                    <motion.div variants={itemVariants} className="space-y-5">
                        <h2 className={heading}>What I'm Optimizing For</h2>
                        <p className={p}>
                            <span className={accent}>Problems:</span> Systems with real constraints
                            — scale, security, concurrency, latency. I want to work on things where
                            "it depends" is the honest answer and the tradeoffs actually matter.
                        </p>
                        <p className={p}>
                            <span className={accent}>Teams:</span> Small, high-trust groups where
                            people ship fast and hold each other to a high bar. I want to learn from
                            engineers better than me and teach what I know.
                        </p>
                        <p className={p}>
                            <span className={accent}>Domains:</span> Developer tools,
                            infrastructure, security, real-time systems, anything with a strong
                            technical core. I'm less interested in what the product is and more
                            interested in whether the engineering is challenging.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ═══════════════ WORK STYLE ═══════════════ */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h2 className={heading}>How I Work</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                            {workStyleTraits.map((trait, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span
                                        className={`mt-1 text-xl flex-shrink-0 ${theme === 'light' ? 'text-blue-500' : 'text-[#69f1ff]'}`}
                                    >
                                        {trait.icon}
                                    </span>
                                    <div>
                                        <h3
                                            className={`font-bold text-base mb-1 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}
                                        >
                                            {trait.title}
                                        </h3>
                                        <p
                                            className={`text-sm leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}
                                        >
                                            {trait.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <div className={divider} />

                    {/* ═══════════════ EDUCATION ═══════════════ */}
                    <motion.div variants={itemVariants} className="space-y-5">
                        <h2 className={heading}>Education</h2>
                        <div className="flex items-start gap-5">
                            <div
                                className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden flex items-center justify-center shadow-lg
                                ${theme === 'light' ? 'bg-white border border-slate-200' : 'bg-white/10 border border-gray-600/50'}`}
                            >
                                <img
                                    src="./assets/images/tcnj.png"
                                    alt="TCNJ"
                                    className="w-12 h-12 lg:w-14 lg:h-14 object-contain"
                                />
                            </div>
                            <div>
                                <h3 className={subheading}>The College of New Jersey</h3>
                                <p
                                    className={`text-sm font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-300'}`}
                                >
                                    B.S. Computer Science
                                </p>
                                <p
                                    className={`text-xs mt-0.5 mb-3 ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}
                                >
                                    Class of 2026 • Senior
                                </p>
                                <p
                                    className={`text-sm lg:text-base leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`}
                                >
                                    Coursework in Operating Systems, Computer Architecture, Data
                                    Structures, Algorithms, Software Engineering, Database Systems,
                                    Computer Networking, and Computational Thinking. Built my
                                    strongest projects outside of class, applying what I learned to
                                    real systems.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <div className={divider} />

                    {/* ═══════════════ SKILLS ═══════════════ */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h2 className={heading}>Skills & Technologies</h2>

                        {/* Filter buttons */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300
                                ${
                                    activeCategory === null
                                        ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                                        : theme === 'light'
                                          ? 'text-slate-500 hover:text-blue-600'
                                          : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                All
                            </button>
                            {categoryLabels.map((cat, i) => (
                                <button
                                    key={i}
                                    onClick={() =>
                                        setActiveCategory(activeCategory === i ? null : i)
                                    }
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5
                                    ${
                                        activeCategory === i
                                            ? `${cat.color} text-white shadow-lg`
                                            : theme === 'light'
                                              ? 'text-slate-500 hover:text-blue-600'
                                              : 'text-gray-500 hover:text-gray-300'
                                    }`}
                                >
                                    <div
                                        className={`w-2 h-2 rounded-full ${activeCategory === i ? 'bg-white' : cat.color}`}
                                    />
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Grid */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-30px' }}
                            variants={skillGridVariants}
                            className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-12 gap-[2px]"
                        >
                            <AnimatePresence>
                                {filteredSkills.map((item) => (
                                    <motion.div
                                        key={item.name}
                                        variants={skillVariants}
                                        layout
                                        whileHover={{
                                            scale: 1.2,
                                            zIndex: 50,
                                        }}
                                        className={`relative flex flex-col items-center justify-center border-2 cursor-pointer transition-colors duration-200 aspect-square
                                            ${categoryColors[item.type]}
                                            ${
                                                theme === 'light'
                                                    ? 'bg-white/60 hover:bg-white'
                                                    : categoryBgColors[item.type] +
                                                      ' bg-opacity-50 hover:bg-opacity-80'
                                            }`}
                                        onMouseEnter={() => setActiveSkill(item as SkillItem)}
                                        onMouseLeave={() => setActiveSkill(null)}
                                    >
                                        <div className="w-7 h-7 lg:w-12 lg:h-12 flex items-center justify-center">
                                            {typeof item.icon === 'string' ? (
                                                <img
                                                    src={item.icon}
                                                    alt={item.name}
                                                    className="max-w-full max-h-full object-contain"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src =
                                                            '/assets/skills/default.png';
                                                    }}
                                                />
                                            ) : (
                                                (item.icon as React.ReactNode)
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Tooltip */}
                        <div className="h-16 flex justify-center">
                            <AnimatePresence>
                                {activeSkill && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        className="self-center text-center"
                                    >
                                        <span
                                            className={`font-bold text-lg lg:text-xl
                                            ${activeSkill.type === 0 ? 'text-blue-500' : ''}
                                            ${activeSkill.type === 1 ? 'text-green-500' : ''}
                                            ${activeSkill.type === 2 ? 'text-yellow-500' : ''}
                                            ${activeSkill.type === 3 ? 'text-fuchsia-500' : ''}`}
                                        >
                                            {activeSkill.name}
                                        </span>
                                        {activeSkill.yoe && (
                                            <span
                                                className={`ml-2 text-sm ${theme === 'light' ? 'text-slate-400' : 'text-gray-500'}`}
                                            >
                                                {activeSkill.yoe}+ yrs
                                            </span>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    <div className={divider} />

                    {/* ═══════════════ BEYOND THE CODE ═══════════════ */}
                    <motion.div variants={itemVariants} className="space-y-5">
                        <h2 className={heading}>Beyond the Code</h2>
                        <p className={p}>
                            I'm not just a terminal. Outside of coding, I'm usually in the gym,
                            producing music, gaming competitively, or going down some rabbit hole
                            about psychology or decision-making. I believe the best engineers are
                            curious about everything — not just tech.
                        </p>
                        <p className={p}>
                            I also manage a team of 15 in campus housing operations, which has
                            taught me more about communication, accountability, and crisis
                            management than any CS course could. Leading people and building
                            software exercise the same muscle: figure out what matters, cut the
                            noise, and execute.
                        </p>

                        <div className="flex flex-wrap gap-3 mt-4">
                            {interests.map((item, i) => (
                                <motion.span
                                    key={i}
                                    whileHover={{ scale: 1.06 }}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-default
                                    ${
                                        theme === 'light'
                                            ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                            : 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50'
                                    }`}
                                >
                                    <span className="text-base">{item.icon}</span>
                                    {item.label}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <div className={divider} />

                    {/* ═══════════════ CLOSING ═══════════════ */}
                    <motion.div variants={itemVariants} className="text-center space-y-3">
                        <FaRocket
                            className={`mx-auto text-3xl ${theme === 'light' ? 'text-blue-500' : 'text-[#69f1ff]'}`}
                        />
                        <h2 className={subheading}>Let's Build Something</h2>
                        <p
                            className={`text-base lg:text-lg max-w-xl mx-auto
                            ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}
                        >
                            If you're working on hard problems with a team that cares about craft,
                            I'd love to talk. I bring velocity, ownership, and no ego.
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            <br />
            <br />
        </>
    );
};

export default About;
