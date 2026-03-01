import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FaArrowLeft, FaClock, FaTag } from 'react-icons/fa';

const MLResearch: React.FC = () => {
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
                                Jun 2025 • 8 min read
                            </span>
                            {['Machine Learning', 'Computer Vision', 'Robotics'].map((tag, i) => (
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
                            Teaching Robots to See
                        </h1>
                        <p
                            className={`text-lg lg:text-xl font-semibold
                            ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                        >
                            My Summer in ML Research at TCNJ
                        </p>
                        <p
                            className={`mt-3 text-base lg:text-lg italic
                            ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}
                        >
                            What happens when a software engineer who's never touched a neural
                            network gets thrown into a robotics lab with a deadline and a camera.
                        </p>
                    </motion.div>

                    {/* ── THE ASSIGNMENT ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>The Assignment</h2>
                        <p className={p}>
                            Summer 2025, I walked into a robotics lab at TCNJ with one job: build a
                            computer vision system that could guide robots autonomously. Real
                            robots, real cameras, real-time constraints. I had strong software
                            engineering skills but precisely zero experience with machine learning,
                            neural networks, or anything that involved the word "tensor."
                        </p>
                        <p className={p}>
                            The goal was straightforward to describe and terrifying to execute:{' '}
                            <span className={accent}>
                                train a model to identify objects in a live camera feed at 30 FPS,
                                extract spatial data, and pipe that into ROS to control robot
                                movement — all with enough accuracy that the robot doesn't crash
                                into things.
                            </span>
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ── LEARNING ML FROM SCRATCH ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>Learning ML from Scratch</h2>
                        <p className={subheading}>Week 1 was humbling</p>
                        <p className={p}>
                            I'll be blunt: the first week I spent more time reading PyTorch
                            documentation than writing code. The gap between "I understand what a
                            convolutional layer does conceptually" and "I can actually wire this
                            into a training loop that converges" is enormous.
                        </p>
                        <p className={p}>
                            What saved me was treating it like any other engineering problem. I
                            didn't try to understand the theory perfectly before touching code — I
                            built the simplest possible pipeline first (input image → model →
                            prediction), got it working end-to-end, and then iterated. Ship the ugly
                            version, then make it good.
                        </p>
                        <p className={p}>
                            By the end of week two, I had a CNN that could classify objects in
                            static images with ~70% accuracy. Not great, but the pipeline worked.
                            Now I needed to make it actually useful.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ── THE DATA PROBLEM ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>The Data Problem</h2>
                        <p className={p}>
                            Here's something nobody tells you about ML:{' '}
                            <span className={accent}>
                                the model is the easy part. The data is where you live or die.
                            </span>
                        </p>
                        <p className={p}>
                            I needed training data that matched what the robot would actually see —
                            specific objects, specific lighting conditions, specific angles. You
                            can't just download ImageNet and call it a day. So I captured 40,000+
                            images myself, using the actual cameras mounted on the actual robots in
                            the actual lab.
                        </p>
                        <p className={p}>
                            Then came augmentation: flipping, rotation, brightness jitter, color
                            shifts. The lab had fluorescent lights that made everything look
                            slightly different depending on the time of day. Without aggressive
                            augmentation the model would overfit to "morning lab lighting" and fall
                            apart by 3 PM.
                        </p>
                        <p className={p}>
                            This process taught me something I carry into all my work now:
                            <span className={accent}>
                                {' '}
                                the quality of your inputs determines the ceiling of your outputs.
                            </span>{' '}
                            Doesn't matter how clever your architecture is if your training data is
                            garbage.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ── MAKING IT REAL-TIME ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>Making It Real-Time</h2>
                        <p className={p}>
                            Getting the model to work on static images was one challenge. Getting it
                            to run at <span className={accent}>30 FPS in a live video stream</span>{' '}
                            was a completely different beast.
                        </p>
                        <p className={p}>
                            The OpenCV pipeline had to grab frames, preprocess them, run inference,
                            extract spatial coordinates, and publish them over ROS — all within a
                            ~33ms window per frame. Any latency meant the robot was reacting to
                            where objects <em>were</em>, not where they <em>are</em>.
                        </p>
                        <p className={p}>
                            I spent a solid week profiling and optimizing. The biggest wins came
                            from reducing the input resolution (the model didn't need 1080p to make
                            accurate predictions), batching preprocessing operations, and being
                            ruthless about avoiding copies in the pipeline. Performance engineering
                            in ML is the same as anywhere else: measure first, optimize the
                            bottleneck, repeat.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ── THE ROS INTEGRATION ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>Closing the Loop</h2>
                        <p className={subheading}>Vision → Decision → Actuation</p>
                        <p className={p}>
                            The final piece was connecting the vision system to robot movement
                            through ROS. This is where "software controlling a physical thing" gets
                            real. A bug in a web app shows an error message. A bug in robot
                            actuation code means a machine doing something unpredictable in the
                            physical world.
                        </p>
                        <p className={p}>
                            I implemented a closed-loop pipeline: vision outputs spatial data →
                            decision logic determines the action → actuation commands are sent to
                            the motors. Multiple robots had to coordinate without conflicting, which
                            meant building in priority queues and conflict resolution at the control
                            layer.
                        </p>
                        <p className={p}>
                            The result:{' '}
                            <span className={accent}>
                                25% reduction in manual operator intervention
                            </span>{' '}
                            compared to the baseline teleoperation setup. The robots weren't fully
                            autonomous, but they could handle routine navigation independently while
                            operators focused on complex tasks.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ── WHAT I TOOK AWAY ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>What This Taught Me</h2>
                        <ul className="space-y-3 ml-1">
                            {[
                                {
                                    bold: 'ML is engineering, not magic.',
                                    text: "The mystique fades fast when you realize it's data pipelines, loss functions, and hyperparameter sweeps. The fundamentals are the same: understand your inputs, measure your outputs, iterate.",
                                },
                                {
                                    bold: 'Physical systems demand a different kind of rigor.',
                                    text: 'When your code controls something in the real world, "it works on my machine" is meaningless. You have to think about latency, failure modes, and graceful degradation from day one.',
                                },
                                {
                                    bold: 'Learning speed matters more than existing knowledge.',
                                    text: "I went from zero ML experience to shipping a production vision system in 10 weeks. The skill wasn't knowing PyTorch — it was knowing how to learn fast under pressure.",
                                },
                                {
                                    bold: 'Data quality > model complexity.',
                                    text: 'A simple CNN with good data beat a fancier architecture with mediocre data every time. This applies to software in general: clean inputs, clean outputs.',
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
                        <p className={`${p} mt-4 italic`}>
                            This role changed how I think about software. It's not enough to write
                            code that compiles and passes tests — it has to work in the real, messy,
                            unpredictable world. That standard has stayed with me in everything I've
                            built since.
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            <br />
            <br />
        </>
    );
};

export default MLResearch;
