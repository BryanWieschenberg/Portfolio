import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import SwipeReveal from '../components/SwipeReveal';
import {
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaFileAlt,
    FaPaperPlane,
    FaCheckCircle,
    FaTimesCircle,
    FaBriefcase,
    FaHandshake,
    FaComments,
    FaLaptopCode,
} from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Contact: React.FC = () => {
    const { theme } = useTheme();
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsInitialLoad(false), 700);
        return () => clearTimeout(timer);
    }, []);

    const divider = 'divider';

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
                delay: isInitialLoad ? 0.6 : 0,
            },
        },
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        const lastSubmitStr = localStorage.getItem('contact_last_submit');
        if (lastSubmitStr) {
            const lastSubmit = parseInt(lastSubmitStr, 10);
            if (Date.now() - lastSubmit < 60 * 60 * 1000) {
                // Local rate limit: 1 hour
                setStatus('rate_limited');
                return;
            }
        }

        setStatus('sending');
        setErrorMessage('');
        const formData = new FormData(form);

        try {
            const data = Object.fromEntries(formData.entries());
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                setStatus('success');
                localStorage.setItem('contact_last_submit', Date.now().toString());
                form.reset();
            } else {
                const errorData = await response.json().catch(() => ({}));
                if (response.status === 429) {
                    setStatus('rate_limited');
                } else if (response.status >= 400 && response.status < 500 && errorData?.error) {
                    setErrorMessage(errorData.error);
                    setStatus('error');
                } else {
                    setErrorMessage('Oops, something went wrong! Try emailing me directly.');
                    setStatus('error');
                }
            }
        } catch {
            setErrorMessage('Could not reach the server. Please try again later.');
            setStatus('error');
        }
    };

    const openTo = [
        {
            icon: <FaBriefcase />,
            title: 'Full-Time Toles',
            desc: 'Full-stack, backend, or DevOps roles',
        },
        {
            icon: <FaLaptopCode />,
            title: 'Freelance & Contract',
            desc: 'Technical projects with clear scope',
        },
        {
            icon: <FaHandshake />,
            title: 'Collaborations',
            desc: 'Open-source, research, and side projects',
        },
        {
            icon: <FaComments />,
            title: 'Just to chat',
            desc: 'Thoughts, advice, and ideas',
        },
    ];

    const socials = [
        {
            icon: <FaGithub />,
            label: 'GitHub',
            handle: 'BryanWieschenberg',
            url: 'https://github.com/BryanWieschenberg/',
        },
        {
            icon: <FaLinkedin />,
            label: 'LinkedIn',
            handle: 'BryanWieschenberg',
            url: 'https://linkedin.com/in/BryanWieschenberg/',
        },
        {
            icon: <FaFileAlt />,
            label: 'Resume',
            handle: 'Download PDF',
            url: '/attachments/Resume%20-%20Bryan%20Wieschenberg.pdf',
        },
        {
            icon: <FaEnvelope />,
            label: 'Email',
            handle: 'bryan.wieschenberg@gmail.com',
            url: 'mailto:bryan.wieschenberg@gmail.com',
        },
    ];

    const inputClass = 'form-input';

    return (
        <>
            <div className="page-hero">
                <SwipeReveal
                    circleColor="bg-gradient-to-r from-[#3c86ff] to-[#69f1ff]"
                    shadowColor="shadow-[0_0_50px_rgba(60,134,255,0.6)]"
                    duration={0.6}
                >
                    <h1 className="page-title">Get in Touch</h1>
                </SwipeReveal>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="page-subtitle"
                >
                    Teamwork makes the dream work:
                </motion.p>
            </div>

            <div className="page-section -mt-2">
                <div className="w-full !max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                        className="space-y-6"
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="contact-name" className="text-label">
                                        Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Your name"
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="text-label">
                                        Email
                                    </label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="text-label">
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    rows={5}
                                    required
                                    placeholder="What's on your mind?"
                                    className={`${inputClass} resize-none`}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={status === 'sending'}
                                className={`w-full py-3.5 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300
                                ${
                                    status === 'sending'
                                        ? 'bg-blue-400 cursor-wait'
                                        : 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]'
                                } text-white`}
                            >
                                <FaPaperPlane />
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                            </motion.button>

                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 justify-center text-green-400 font-semibold"
                                >
                                    <FaCheckCircle />
                                    <span>Sent! I'll get back to you soon.</span>
                                </motion.div>
                            )}
                            {status === 'error' && errorMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 justify-center text-red-400 font-semibold"
                                >
                                    <FaTimesCircle />
                                    <span>{errorMessage}</span>
                                </motion.div>
                            )}
                            {status === 'rate_limited' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 justify-center text-yellow-500 font-semibold text-center"
                                >
                                    <FaTimesCircle />
                                    <span>
                                        You've already sent a message recently. Please try again
                                        later.
                                    </span>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                        className={divider}
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                        className="space-y-6"
                    >
                        <h2
                            className={`text-4xl lg:text-6xl font-bold mb-8 text-center 
                                ${theme === 'light' ? 'text-slate-900 drop-shadow-[4px_4px_2px_rgba(80,140,255,0.45)]' : 'text-white drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                        >
                            What I'm Open To
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {openTo.map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05 }}
                                    className={`leading-tight p-3 md:px-4 md:py-3 rounded-lg border flex items-center justify-start gap-3 text-left cursor-default
                                        ${
                                            theme === 'light'
                                                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:border-blue-300'
                                                : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:shadow-[0_0_15px_rgba(96,165,250,0.2)] hover:border-blue-500/50'
                                        }`}
                                >
                                    <span
                                        className={`text-lg md:text-xl flex-shrink-0 ${theme === 'light' ? 'text-blue-500' : 'text-blue-400'}`}
                                    >
                                        {item.icon}
                                    </span>
                                    <div className="flex flex-col">
                                        <h3 className="text-xs sm:text-sm font-bold">
                                            {item.title}
                                        </h3>
                                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                        className={divider}
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={itemVariants}
                        className="space-y-6"
                    >
                        <h2
                            className={`text-4xl lg:text-6xl font-bold mb-8 text-center 
                                ${theme === 'light' ? 'text-slate-900 drop-shadow-[4px_4px_2px_rgba(80,140,255,0.45)]' : 'text-white drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                        >
                            Elsewhere
                        </h2>

                        <div className="flex flex-wrap justify-center items-center gap-4">
                            {socials.map((s, i) => (
                                <motion.a
                                    key={i}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors duration-300 
                                        ${
                                            theme === 'light'
                                                ? 'bg-slate-100 text-slate-700 border border-slate-300'
                                                : 'bg-[#1e2330] text-slate-300 border border-slate-700 hover:border-slate-500'
                                        }`}
                                >
                                    <span className="text-xl flex-shrink-0">{s.icon}</span>
                                    <span className="text-sm">{s.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <br />
            <br />
        </>
    );
};

export default Contact;
