import React, { useState } from 'react';
import { work } from '../../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Timeline: React.FC = () => {
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
            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="roles-text lg:mb-2 pt-4 lg:pt-10 text-2xl lg:text-6xl font-bold pb-4 drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)] text-center relative text-[#8580e7] bg-clip-text"
            >
                My Timeline:
            </motion.h1>

            <div className="relative lg:mt-4">
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    whileInView={{ opacity: 1, height: '98%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    className="absolute left-1/2 transform -translate-x-1/2 top-0 w-3 bg-[#1e65ff]"
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
                                className="bg-[#182a51] text-white p-5 rounded-xl shadow-lg cursor-pointer flex items-center space-x-4 mx-auto"
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
                                    <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-[#a9c7ff] to-[#00e7ff] text-transparent bg-clip-text inline-block">
                                        {exp.role}
                                    </h3>
                                    <h4 className="text-md lg:text-lg font-semibold text-blue-300">
                                        {exp.company}
                                    </h4>
                                    <p className="text-sm text-gray-300">{exp.date}</p>
                                </div>
                            </motion.div>

                            <AnimatePresence>
                                {selectedIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden bg-[#2f4677] text-white rounded-xl shadow-lg mt-2"
                                    >
                                        <div className="p-3">
                                            <p className="text-sm lg:text-base text-gray-200 whitespace-pre-line">
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
