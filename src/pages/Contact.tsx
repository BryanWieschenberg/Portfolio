import React, { useState } from 'react';
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

const Contact: React.FC = () => {
    const { theme } = useTheme();
    const [status, setStatus] = useState('');

    const heading = 'section-heading';
    const divider = 'divider';

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
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('sending');
        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('https://formspree.io/f/xrbenbye', {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' },
            });

            if (response.ok) {
                setStatus('success');
                e.currentTarget.reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const openTo = [
        {
            icon: <FaBriefcase />,
            title: 'Full-time roles',
            desc: 'SWE, backend, infra, or systems positions',
        },
        {
            icon: <FaLaptopCode />,
            title: 'Freelance & contract',
            desc: 'Technical projects with clear scope',
        },
        {
            icon: <FaHandshake />,
            title: 'Collaborations',
            desc: 'Open-source, research, side projects',
        },
        {
            icon: <FaComments />,
            title: 'Just to chat',
            desc: 'Tech, career, ideas — always down',
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
    ];

    const inputClass = 'form-input';

    return (
        <>
            {/* Hero */}
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
                    I read every message. Seriously.
                </motion.p>
            </div>

            <div className="container mx-auto px-4 lg:px-20 pt-14 pb-20 max-w-4xl">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {/* ═══════════════ EMAIL — PROMINENT ═══════════════ */}
                    <motion.div variants={itemVariants} className="text-center mb-2">
                        <p className="meta-label mb-3">Fastest way to reach me</p>
                        <a
                            href="mailto:bryanwieschenberg@gmail.com"
                            className={`inline-flex items-center gap-3 text-2xl lg:text-3xl font-bold transition-all duration-300 group
                            ${theme === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-[#69f1ff] hover:text-white'}`}
                        >
                            <FaEnvelope className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                            <span className="border-b-2 border-transparent group-hover:border-current transition-all duration-300">
                                bryanwieschenberg@gmail.com
                            </span>
                        </a>
                    </motion.div>

                    <div className={divider} />

                    {/* ═══════════════ WHAT I'M OPEN TO ═══════════════ */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h2 className={heading}>What I'm Open To</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
                            {openTo.map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <span className="mt-1 text-lg icon-accent">{item.icon}</span>
                                    <div>
                                        <h3 className="item-title">{item.title}</h3>
                                        <p className="text-muted">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <div className={divider} />

                    {/* ═══════════════ CONTACT FORM ═══════════════ */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h2 className={heading}>Send a Message</h2>
                        <p
                            className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}
                        >
                            Or fill this out and I'll get back to you within 24 hours.
                        </p>

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
                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 justify-center text-red-400 font-semibold"
                                >
                                    <FaTimesCircle />
                                    <span>Something went wrong — try emailing me directly.</span>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    <div className={divider} />

                    {/* ═══════════════ SOCIALS ═══════════════ */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <h2 className={heading}>Elsewhere</h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {socials.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link group"
                                >
                                    <span className="social-icon">{s.icon}</span>
                                    <div>
                                        <p className="item-title text-sm">{s.label}</p>
                                        <p className="text-muted-xs">{s.handle}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <br />
            <br />
        </>
    );
};

export default Contact;
