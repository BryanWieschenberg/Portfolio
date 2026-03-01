import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FaArrowLeft, FaClock, FaTag } from 'react-icons/fa';

const DSAJourney: React.FC = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const topRef = useRef<HTMLParagraphElement | null>(null);

    const p = `text-base lg:text-lg leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`;
    const accent =
        theme === 'light' ? 'text-blue-700 font-semibold' : 'text-[#69f1ff] font-semibold';
    const heading = `text-2xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3c86ff] to-[#69f1ff] ${theme === 'light' ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]' : 'drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]'}`;
    const subheading = `text-lg lg:text-xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-white'}`;
    const divider = `h-[1px] w-full my-12 ${theme === 'light' ? 'bg-gradient-to-r from-transparent via-slate-300 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-700 to-transparent'}`;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
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

            <div className="container mx-auto px-4 lg:px-20 pt-20 pb-20 max-w-4xl">
                {/* Back */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate('/blog')}
                    className={`mb-10 flex items-center gap-2 text-sm font-semibold transition-all duration-300 group
                    ${theme === 'light' ? 'text-slate-500 hover:text-blue-600' : 'text-gray-400 hover:text-[#69f1ff]'}`}
                >
                    <FaArrowLeft className="transform transition-transform duration-300 group-hover:-translate-x-1" />
                    <span>Back to Blog</span>
                </motion.button>

                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    {/* ── HEADER ── */}
                    <motion.div variants={itemVariants} className="mb-10">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span
                                className={`text-xs font-medium flex items-center gap-1
                                ${theme === 'light' ? 'text-slate-400' : 'text-gray-500'}`}
                            >
                                <FaClock className="text-[10px]" />
                                Feb 2026 • 10 min read
                            </span>
                            {['DSA', 'Learning', 'Problem Solving'].map((tag, i) => (
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

                        <h1
                            className={`text-4xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3c86ff] to-[#69f1ff] mb-2
                            ${theme === 'light' ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]' : 'drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]'}`}
                        >
                            My DSA Journey
                        </h1>
                        <p
                            className={`text-lg lg:text-xl font-semibold
                            ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                        >
                            Blind 75 → NeetCode 150 → NeetCode 250
                        </p>
                        <p
                            className={`mt-3 text-base lg:text-lg italic
                            ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}
                        >
                            What I actually learned grinding through 250+ problems — and why the
                            grind itself is only half the point.
                        </p>
                    </motion.div>

                    {/* ── WHY I STARTED ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>Why I Started</h2>
                        <p className={p}>
                            Let me be honest: I didn't start doing DSA problems because I woke up
                            one morning passionate about binary trees. I started because I bombed a
                            technical interview. Badly. The kind where you stare at the whiteboard
                            for 30 seconds, write a brute-force nested loop, and then watch the
                            interviewer's face tell you everything you need to know.
                        </p>
                        <p className={p}>
                            That experience pissed me off — not because the process is unfair (it
                            kind of is), but because I <em>knew</em> I could build real systems. I
                            just couldn't translate that ability into the language that interviews
                            demand. So I decided to learn that language.
                        </p>
                        <p className={p}>
                            I started with <span className={accent}>NeetCode's Blind 75</span> — the
                            canonical "if you only do these problems, you'll cover most interview
                            patterns" list. From there I expanded to the{' '}
                            <span className={accent}>NeetCode 150</span>, and eventually committed
                            to the full <span className={accent}>NeetCode 250</span>.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ── THE BLIND 75 ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>Phase 1: The Blind 75</h2>
                        <p className={subheading}>Learning to see the patterns</p>
                        <p className={p}>
                            The Blind 75 is brutal if you've never done structured DSA practice. I
                            remember spending 2 hours on "Two Sum" — not because it's hard, but
                            because I didn't even know what a hash map lookup optimization looked
                            like in the context of a coding problem.
                        </p>
                        <p className={p}>
                            The biggest lesson from this phase:{' '}
                            <span className={accent}>
                                most problems are just a small number of patterns wearing different
                                masks.
                            </span>{' '}
                            Sliding window, two pointers, BFS/DFS, dynamic programming — once you
                            see the skeleton, the "hard" problems become "I know what tool to reach
                            for, now I just need to adapt it."
                        </p>
                        <p className={p}>
                            By the end of the Blind 75, I could look at a problem and within 30
                            seconds have a reasonable hypothesis about which pattern applied. That
                            alone was a massive level-up.
                        </p>
                        <p className={p}>My key takeaways from this phase:</p>
                        <ul className="space-y-2 ml-1">
                            {[
                                "Don't memorize solutions. Memorize patterns and the reasoning behind when they apply.",
                                'Hash maps solve an embarrassing number of problems. If you\'re stuck, ask yourself "what if I cached this?"',
                                'Two pointers and sliding window are essentially the same intuition: avoid redundant work by tracking boundaries.',
                                "If the brute force is O(n²), there's almost always an O(n log n) or O(n) approach hiding in there.",
                            ].map((point, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span
                                        className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0
                                        ${theme === 'light' ? 'bg-blue-400' : 'bg-[#69f1ff]'}`}
                                    />
                                    <span
                                        className={`text-sm lg:text-base leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`}
                                    >
                                        {point}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <div className={divider} />

                    {/* ── THE NEETCODE 150 ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>Phase 2: The NeetCode 150</h2>
                        <p className={subheading}>Building depth, not just breadth</p>
                        <p className={p}>
                            The jump from 75 to 150 problems isn't just "more of the same." The 150
                            forces you into territory where the patterns are less obvious and the
                            edge cases are nastier. This is where I really learned to{' '}
                            <span className={accent}>think before I code.</span>
                        </p>
                        <p className={p}>
                            Graph problems were my nemesis. Topological sort, union-find, Dijkstra's
                            — each one felt like learning a new language. But that's also where I
                            had my biggest "aha" moments. When I finally understood why union-find
                            with path compression is nearly O(1) amortized, it clicked that DSA
                            isn't arbitrary trivia — these are real engineering tools.
                        </p>
                        <p className={p}>
                            Dynamic programming went from "what the hell is a subproblem" to
                            something I could reason about systematically. My framework became:
                            what's the state? What are the transitions? What's the base case? If I
                            can answer those three questions, I can write the DP.
                        </p>
                        <p className={p}>
                            The 150 also taught me that{' '}
                            <span className={accent}>
                                time complexity analysis isn't academic — it's how you make
                                decisions under pressure.
                            </span>{' '}
                            In an interview, being able to say "this is O(n log n) because of the
                            sort, and the remaining work is O(n)" shows you actually understand what
                            your code is doing, not just that it passes test cases.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ── THE NEETCODE 250 ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>Phase 3: The NeetCode 250</h2>
                        <p className={subheading}>Diminishing returns, but real confidence</p>
                        <p className={p}>
                            I'll be honest — the marginal value of each problem starts dropping
                            around the 180-200 mark. By that point, most new problems are variations
                            of things you've already seen. But that's not why I kept going.
                        </p>
                        <p className={p}>
                            I kept going because I wanted to reach the point where I could look at
                            any problem and <span className={accent}>not feel panic.</span> Not
                            "I've seen this exact problem" — but "I have enough tools and intuition
                            to figure this out." The 250 gave me that. It turned problem-solving
                            from a source of anxiety into something I genuinely enjoy.
                        </p>
                        <p className={p}>
                            The later problems also exposed me to more niche data structures —
                            tries, segment trees, monotonic stacks, LRU caches. These aren't just
                            interview artifacts. I've used monotonic stacks in production code for
                            scheduling logic, and understanding tries made me appreciate how
                            autocomplete systems work at scale.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ── HONEST OPINIONS ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>Honest Opinions</h2>

                        <p className={subheading}>On the grind:</p>
                        <p className={p}>
                            DSA grinding is both overhyped and underhyped. Overhyped because solving
                            500 LeetCode problems won't make you a better engineer. Underhyped
                            because the <em>way of thinking</em> it develops — breaking down complex
                            problems, reasoning about efficiency, writing clean code under time
                            pressure — absolutely transfers to real work.
                        </p>

                        <p className={subheading}>On NeetCode specifically:</p>
                        <p className={p}>
                            NeetCode's structure is the best I've found. The problems are grouped by
                            pattern, not difficulty, which means you're building genuine intuition
                            instead of just collecting random solves. The video explanations are
                            excellent — clear, concise, and they actually explain the "why" instead
                            of just walking through code.
                        </p>

                        <p className={subheading}>On the interview game:</p>
                        <p className={p}>
                            I still think DSA-heavy interviews are a flawed signal. They test
                            preparation more than engineering ability. But complaining about the
                            game doesn't change the rules. The pragmatic move is to get good enough
                            at DSA that it's not a bottleneck, and then let your real engineering
                            skills shine through the rest of the interview process.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ── WHAT I'D DO DIFFERENTLY ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>What I'd Do Differently</h2>
                        <ul className="space-y-3 ml-1">
                            {[
                                {
                                    bold: 'Start with patterns, not problems.',
                                    text: "I wasted weeks doing random problems before I had a mental model for the patterns. If I restarted, I'd learn the 10 core patterns first, then practice them.",
                                },
                                {
                                    bold: 'Time-box every problem.',
                                    text: "If I can't make meaningful progress in 25 minutes, I look at the solution. There's no valor in staring at a problem for 3 hours.",
                                },
                                {
                                    bold: 'Review > new problems.',
                                    text: 'Redoing problems I struggled with taught me more than doing new ones. Spaced repetition applies to DSA too.',
                                },
                                {
                                    bold: 'Write the approach before writing code.',
                                    text: 'The biggest time sink in interviews is coding the wrong approach. A 2-minute planning step saves you 15 minutes of debugging.',
                                },
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span
                                        className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0
                                        ${theme === 'light' ? 'bg-blue-400' : 'bg-[#69f1ff]'}`}
                                    />
                                    <span
                                        className={`text-sm lg:text-base leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`}
                                    >
                                        <span className={accent}>{item.bold}</span> {item.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <div className={divider} />

                    {/* ── CLOSING ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>Where I Am Now</h2>
                        <p className={p}>
                            I'm not done. I still do a few problems a week to keep the muscle memory
                            fresh. But the anxiety is gone. I can walk into a technical interview
                            knowing that even if I get a hard problem I've never seen, I have the
                            frameworks to attack it systematically.
                        </p>
                        <p className={p}>
                            More importantly, DSA practice changed how I think about code in
                            general. I think about edge cases earlier. I reason about complexity
                            naturally. I reach for the right data structure the first time instead
                            of refactoring later. Those are the skills that stick around long after
                            the interview is over.
                        </p>
                        <p className={`${p} italic`}>
                            If you're starting this journey — keep going. It sucks for the first few
                            weeks. Then it clicks. And once it clicks, you won't go back.
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            <br />
            <br />
        </>
    );
};

export default DSAJourney;
