import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import BlogTemplate from '../../components/BlogTemplate';
import { blogPosts } from '../../constants';

const HackTCNJBlog: React.FC = () => {
    const { theme } = useTheme();

    const p = 'text-body';
    const accent = 'text-accent';
    const heading = 'section-heading';
    const subheading = 'section-subheading';
    const divider = 'divider-lg';

    const itemVariants = {
        hidden: { opacity: 0, y: 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const post = blogPosts.find((b) => b.slug === 'hacktcnj')!;

    return (
        <BlogTemplate post={post}>
            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={heading}>Section 1</h2>
                <p className={p}>Coming soon...</p>
                <p className={p}>
                    Coming soon... <span className={accent}>Highlight here.</span>
                </p>
            </motion.div>

            <div className={divider} />

            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={heading}>Section 2</h2>
                <p className={p}>
                    <span className={accent}>Important point</span>, details details details.
                </p>
                <p className={p}>More details.</p>
            </motion.div>

            <div className={divider} />

            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={heading}>Section 3</h2>
                <p className={subheading}>Subtitle goes here</p>
                <p className={p}>Details...</p>
                <p className={p}>More details...</p>
                <p className={p}>
                    The result: <span className={accent}>A cool outcome</span>.
                </p>
                <p className={p}>
                    Biggest lesson here: <span className={accent}>This is the takeaway.</span> Yep.
                </p>
            </motion.div>

            <div className={divider} />

            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={heading}>Section 4</h2>
                <p className={p}>Some intro text...</p>
                <p className={p}>
                    I built a <span className={accent}>cool thing</span> that does stuff.
                </p>
                <p className={p}>
                    The result was a <span className={accent}>huge improvement</span>.
                </p>
            </motion.div>

            <div className={divider} />

            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={heading}>Section 5</h2>
                <p className={p}>Intro for a list:</p>
                <ul className="space-y-2 ml-1">
                    {['Point 1.', 'Point 2.', 'Point 3.', 'Point 4.'].map((quote, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span
                                className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0
                                ${theme === 'light' ? 'bg-blue-400' : 'bg-[#69f1ff]'}`}
                            />
                            <span
                                className={`text-sm lg:text-base leading-relaxed italic ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}
                            >
                                {quote}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className={p}>Conclusion paragraph.</p>
            </motion.div>

            <div className={divider} />

            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={heading}>Section 6</h2>
                <p className={p}>Another section.</p>
                <p className={p}>With a second paragraph.</p>
            </motion.div>

            <div className={divider} />

            <motion.div variants={itemVariants} className="space-y-4">
                <h2 className={heading}>Section 7</h2>
                <ul className="space-y-3 ml-1">
                    {[
                        {
                            bold: 'Key Takeaway 1.',
                            text: 'Elaboration.',
                        },
                        {
                            bold: 'Key Takeaway 2.',
                            text: 'Elaboration.',
                        },
                        {
                            bold: 'Key Takeaway 3.',
                            text: 'Elaboration.',
                        },
                        {
                            bold: 'Key Takeaway 4.',
                            text: 'Elaboration.',
                        },
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span
                                className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0
                                ${theme === 'light' ? 'bg-blue-400' : 'bg-[#69f1ff]'}`}
                            />
                            <span
                                className={`text-sm lg:text-base leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-slate-200'}`}
                            >
                                <span className={accent}>{item.bold}</span> {item.text}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className={`${p} mt-4 italic`}>Final thought.</p>
            </motion.div>
        </BlogTemplate>
    );
};

export default HackTCNJBlog;
