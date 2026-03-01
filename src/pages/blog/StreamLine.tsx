import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FaArrowLeft, FaClock, FaTag } from 'react-icons/fa';

const StreamLineBlog: React.FC = () => {
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
                                Jul 2025 • 12 min read
                            </span>
                            {['Rust', 'Systems', 'Cryptography', 'Networking'].map((tag, i) => (
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
                            Building StreamLine
                        </h1>
                        <p
                            className={`text-lg lg:text-xl font-semibold
                            ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                        >
                            An Encrypted, Multithreaded Chat Server in Rust
                        </p>
                        <p
                            className={`mt-3 text-base lg:text-lg italic
                            ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}
                        >
                            Why I chose the hardest possible way to build a chat app — and what that
                            taught me about systems engineering.
                        </p>
                    </motion.div>

                    {/* ── WHY RUST, WHY NOW ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>Why Rust, Why a Chat Server</h2>
                        <p className={p}>
                            I could've built a chat app in Node.js in a weekend. Socket.io, Express,
                            a MongoDB collection — done. But that wasn't the point. I wanted to
                            understand what happens{' '}
                            <span className={accent}>below the abstractions</span>: raw TCP sockets,
                            manual thread management, memory safety without a garbage collector,
                            real cryptographic protocols.
                        </p>
                        <p className={p}>
                            Rust was the obvious choice. It forces you to confront every ownership
                            question, every lifetime, every potential data race — at compile time
                            instead of in production at 2 AM. Writing concurrent code in Rust is
                            harder than any other language I've used, and that's exactly why it's
                            worth learning.
                        </p>
                        <p className={p}>
                            The concept: a multi-room chat platform where messages are encrypted
                            end-to-end with RSA-OAEP, users have roles with granular permissions,
                            and the whole thing handles concurrent connections without falling over.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ── THE CONCURRENCY MODEL ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>The Concurrency Model</h2>
                        <p className={subheading}>Arc, Mutex, and the borrow checker</p>
                        <p className={p}>
                            The core architecture is one thread per client connection, with shared
                            state managed through{' '}
                            <span className={accent}>Arc&lt;Mutex&lt;T&gt;&gt;</span>. Every room,
                            every user session, every piece of shared data goes through this
                            pattern.
                        </p>
                        <p className={p}>
                            If you've never fought the Rust borrow checker on a multithreaded
                            project, let me describe the experience: you write code that would
                            compile fine in any other language, and Rust says{' '}
                            <em>
                                "no, this reference could outlive this scope, and that Mutex guard
                                could be held across an await point, and this type doesn't implement
                                Send."
                            </em>{' '}
                            It's infuriating for the first few days. Then you realize every single
                            complaint is a real bug that would've been a race condition in C++ or a
                            deadlock in Java.
                        </p>
                        <p className={p}>
                            The discipline Rust enforces around shared mutable state changed how I
                            think about concurrency in every language. Even when I write Go or
                            TypeScript now, I mentally model the ownership of every piece of shared
                            data.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ── ENCRYPTION ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>End-to-End Encryption</h2>
                        <p className={p}>
                            I implemented RSA-OAEP with SHA-256 for message encryption. Each client
                            generates a keypair on connection, exchanges public keys during the
                            handshake, and all messages are encrypted before they leave the sender's
                            machine. The server never sees plaintext.
                        </p>
                        <p className={p}>
                            This was the part of the project where I learned the most about{' '}
                            <span className={accent}>
                                the gap between "theoretically secure" and "actually secure."
                            </span>{' '}
                            My first implementation had the key exchange happening over the same
                            unencrypted TCP connection — technically a man-in-the-middle
                            vulnerability. Fixing it required implementing a proper key-exchange
                            protocol that I could validate.
                        </p>
                        <p className={p}>
                            Working with PKCS#8 key serialization, raw byte manipulation, and crypto
                            libraries that expose very little hand-holding taught me a deep respect
                            for security engineering. Every decision has consequences that aren't
                            immediately visible, and "it works" is never sufficient — you need to
                            understand <em>why</em> it's correct.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ── THE COMMAND SYSTEM ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>50+ Commands and RBAC</h2>
                        <p className={p}>
                            StreamLine has a full command system — over 50 commands for account
                            management, room management, moderation, rate limiting, and session
                            control. Each command has role-based access control: a regular user
                            can't kick someone, a moderator can't delete a room, and only room
                            owners can transfer ownership.
                        </p>
                        <p className={p}>
                            Building the RBAC system was the most architecturally interesting part.
                            I wanted it to be{' '}
                            <span className={accent}>declarative, not imperative</span> — each
                            command declares what role level it requires, and the framework checks
                            permissions before dispatching. Adding a new command is one struct and
                            one handler function. No permission checks scattered across the
                            codebase.
                        </p>
                        <p className={p}>
                            I also built validated control packet handling — every message that
                            arrives is parsed, validated, and routed before any business logic
                            executes. Malformed packets get rejected at the protocol layer, not deep
                            inside a handler. This reduced unauthorized actions by{' '}
                            <span className={accent}>over 75%</span> in simulated attack tests.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ── PERFORMANCE ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>Performance Under Load</h2>
                        <p className={p}>
                            I benchmarked StreamLine with custom Python scripts simulating
                            concurrent client connections. The results were satisfying: stable under
                            1,000+ simultaneous connections, sub-millisecond message routing for
                            single-room broadcasts, and memory usage that stayed flat as connections
                            scaled.
                        </p>
                        <p className={p}>
                            The key insight was keeping the hot path simple: receive bytes → decrypt
                            → parse → validate → dispatch → encrypt → send. No allocations on the
                            critical path that could be avoided, no locks held longer than
                            necessary. Rust's zero-cost abstractions made this possible without
                            sacrificing readability.
                        </p>
                    </motion.div>

                    <div className={divider} />

                    {/* ── WHAT I LEARNED ── */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h2 className={heading}>What StreamLine Taught Me</h2>
                        <ul className="space-y-3 ml-1">
                            {[
                                {
                                    bold: 'Rust makes you a better engineer in every language.',
                                    text: "The ownership model isn't just a Rust thing — it's how you should think about shared state everywhere. After Rust, I write safer Go, safer TypeScript, safer everything.",
                                },
                                {
                                    bold: 'Security is architecture, not a feature.',
                                    text: "You can't bolt on encryption or access control after the fact. It has to be woven into the design from the first line of code.",
                                },
                                {
                                    bold: 'Protocol design is underrated.',
                                    text: 'Most bugs in networked systems come from ambiguous or poorly validated protocols. Getting the message format right prevented entire categories of bugs.',
                                },
                                {
                                    bold: 'The hard way is the fast way (long-term).',
                                    text: "Building from raw TCP sockets instead of using a framework taught me fundamentals I use every day. When something breaks in a high-level library, I can reason about what's actually happening.",
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
                            StreamLine is the project I'm most proud of — not because it's the most
                            polished, but because every line of it forced me to understand what I
                            was doing instead of trusting a framework to do it for me.
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            <br />
            <br />
        </>
    );
};

export default StreamLineBlog;
