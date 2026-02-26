import React, { useState } from 'react';
import { work } from '../../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import SwipeReveal from '../../components/SwipeReveal';

const Timeline: React.FC = () => {
    const { theme } = useTheme();
    const items = work.map((item) => ({
        ...item,
        imagePath: `/assets/images/${item.company.toLowerCase().replace(/\s+/g, '')}.png`,
    }));

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    const handleClick = (index: number) => {
        setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="container mx-auto px-4 lg:px-20 mb-6 overflow-x-hidden">
            <div className="pt-4 lg:pt-10 text-center">
                <SwipeReveal
                    circleColor="bg-gradient-to-r from-[#8580e7] to-[#3c86ff]"
                    shadowColor="shadow-[0_0_50px_rgba(133,128,231,0.6)]"
                    duration={0.6}
                >
                    <h1
                        className={`roles-text lg:mb-2 text-2xl lg:text-6xl font-bold pb-4 text-center relative text-[#8580e7] bg-clip-text
                        ${theme === 'light' ? 'drop-shadow-[3px_3px_1px_rgba(30,30,160,0.2)]' : 'drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                    >
                        My Timeline:
                    </h1>
                </SwipeReveal>
            </div>

            <div className="relative lg:mt-4">
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    whileInView={{ opacity: 1, height: '98%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className={`absolute left-1/2 transform -translate-x-1/2 top-0 w-3 
                        ${theme === 'light' ? 'bg-blue-300' : 'bg-[#1e65ff]'}`}
                ></motion.div>

                <motion.div
                    className="w-full max-w-4xl mx-auto px-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={containerVariants}
                >
                    {items.map((exp, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="mb-[9px] relative"
                        >
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className={`p-5 rounded-xl shadow-lg cursor-pointer flex items-center space-x-4 mx-auto border
                                    ${
                                        theme === 'light'
                                            ? 'bg-white border-blue-100'
                                            : 'bg-[#182a51] border-blue-900/50'
                                    }`}
                                onClick={() => handleClick(index)}
                            >
                                <img
                                    src={exp.imagePath}
                                    alt={`${exp.company} logo`}
                                    className="w-12 h-12 lg:w-16 lg:h-16 object-contain rounded-lg bg-white p-2 shadow-md"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            '/assets/images/default.png';
                                    }}
                                />

                                <div className="flex-1">
                                    <h3
                                        className={`text-lg lg:text-xl font-bold inline-block
                                        ${
                                            theme === 'light'
                                                ? 'text-blue-700'
                                                : 'bg-gradient-to-r from-[#a9c7ff] to-[#00e7ff] text-transparent bg-clip-text'
                                        }`}
                                    >
                                        {exp.role}
                                    </h3>
                                    <h4
                                        className={`text-md lg:text-lg font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-300'}`}
                                    >
                                        {exp.company}
                                    </h4>
                                    <p
                                        className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-gray-300'}`}
                                    >
                                        {exp.date}
                                    </p>
                                </div>
                            </motion.div>

                            <AnimatePresence>
                                {selectedIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className={`overflow-hidden rounded-xl shadow-lg mt-2 border
                                            ${
                                                theme === 'light'
                                                    ? 'bg-blue-50/50 border-blue-100'
                                                    : 'bg-[#2f4677] border-blue-800'
                                            }`}
                                    >
                                        <div className="p-3">
                                            <p
                                                className={`text-sm lg:text-base whitespace-pre-line
                                                ${theme === 'light' ? 'text-slate-700' : 'text-gray-200'}`}
                                            >
                                                {exp.desc}
                                            </p>
                                            {exp.skills && Object.keys(exp.skills).length > 0 && (
                                                <div className="mt-2 flex flex-wrap gap-1">
                                                    {Object.entries(exp.skills).map(
                                                        ([skill, level], i) => {
                                                            let badgeColor;
                                                            switch (level) {
                                                                case 0:
                                                                    badgeColor = 'bg-blue-600';
                                                                    break;
                                                                case 1:
                                                                    badgeColor = 'bg-green-600';
                                                                    break;
                                                                case 2:
                                                                    badgeColor = 'bg-yellow-600';
                                                                    break;
                                                                case 3:
                                                                    badgeColor = 'bg-fuchsia-600';
                                                                    break;
                                                                default:
                                                                    badgeColor = 'bg-gray-600';
                                                            }
                                                            return (
                                                                <span
                                                                    key={i}
                                                                    className={`${badgeColor} px-2 py-1 rounded-lg border text-white border-white text-xs inline-block min-w-0 max-w-full truncate`}
                                                                >
                                                                    {skill}
                                                                </span>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <div className="mt-12 lg:mt-20"></div>
        </div>
    );
};

export default Timeline;
