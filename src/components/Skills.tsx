import { useState } from 'react';
import { skills } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeReveal from './SwipeReveal';
import { useTheme } from '../context/ThemeContext';

interface Skill {
    name: string;
    icon: string | React.ReactNode;
    type: number;
}

const Skills = () => {
    const { theme } = useTheme();
    const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

    const categoryColors: { [key: number]: string } = {
        0: 'border-blue-500',
        1: 'border-green-500',
        2: 'border-yellow-500',
        3: 'border-fuchsia-500',
    };

    const categoryBgColors: { [key: number]: string } = {
        0: 'bg-blue-900',
        1: 'bg-green-900',
        2: 'bg-yellow-900',
        3: 'bg-fuchsia-900',
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.02,
            },
        },
    };

    const skillVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3, ease: 'easeOut' },
        },
    };

    return (
        <div className="container mx-auto px-4 relative">
            <div className="mt-24"></div>
            <motion.img
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                src="/images/arrowBig.png"
                className="custom-image mx-auto"
                style={{ width: '1600px', height: '20px' }}
            />
            <div className="pt-20 text-center">
                <SwipeReveal
                    circleColor="bg-gradient-to-r from-[#8580e7] to-[#3c86ff]"
                    shadowColor="shadow-[0_0_50px_rgba(133,128,231,0.8)]"
                    duration={0.6}
                >
                    <h1
                        className={`roles-text lg:mb-2 lg:pt-5 text-2xl lg:text-6xl font-bold pb-4 text-center relative text-[#8580e7] bg-clip-text
                        ${theme === 'light' ? 'drop-shadow-[3px_3px_1px_rgba(30,30,160,0.2)]' : 'drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)]'}`}
                    >
                        My Skills:
                    </h1>
                </SwipeReveal>
            </div>

            <div className="flex justify-center mt-6 gap-4">
                {[
                    { color: 'bg-blue-500', label: 'Programming Languages' },
                    { color: 'bg-green-500', label: 'Frameworks & Libraries' },
                    { color: 'bg-yellow-500', label: 'Systems & Tools' },
                    { color: 'bg-fuchsia-500', label: 'Core Concepts' },
                ].map((cat, i) => (
                    <div key={i} className="flex items-center">
                        <div
                            className={`mr-2 min-w-[1rem] min-h-[1rem] ${cat.color} rounded-full`}
                        ></div>
                        <span
                            className={`text-xs lg:text-sm ${theme === 'light' ? 'text-slate-700 font-medium' : 'text-white'}`}
                        >
                            {cat.label}
                        </span>
                    </div>
                ))}
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={containerVariants}
                className="mt-10 grid grid-cols-8 lg:grid-cols-12"
            >
                {skills.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={skillVariants}
                        whileHover={{
                            scale: 1.15,
                            zIndex: 50,
                            backgroundColor: 'rgba(255,255,255,0.1)',
                        }}
                        className={`relative flex flex-col items-center justify-center mb-[0.25px] border-2 transition-colors duration-300
                            ${categoryColors[item.type]} 
                            ${theme === 'light' ? 'bg-white/40 hover:bg-white/60' : categoryBgColors[item.type] + ' bg-opacity-50'}`}
                        onMouseEnter={() => setActiveSkill(item as Skill)}
                        onMouseLeave={() => setActiveSkill(null)}
                    >
                        <div className="w-8 h-8 lg:w-16 lg:h-16 text-white flex items-center justify-center mt-[1.5px] mb-[1.5px]">
                            {typeof item.icon === 'string' ? (
                                <img
                                    src={item.icon}
                                    alt={item.name}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/skills/default.png';
                                    }}
                                />
                            ) : (
                                (item.icon as React.ReactNode)
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="h-20 mt-6 flex justify-center">
                <AnimatePresence>
                    {activeSkill && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            className={`px-4 py-2 rounded-lg shadow-lg z-10 self-center border ${
                                theme === 'light'
                                    ? 'bg-white border-blue-200 shadow-blue-100/50'
                                    : 'bg-blue-900/50 border-blue-800/50 shadow-black/50'
                            }`}
                        >
                            <h3
                                className={`font-bold text-lg lg:text-2xl text-center
                                    ${activeSkill.type === 0 ? 'text-blue-500' : ''}
                                    ${activeSkill.type === 1 ? 'text-green-500' : ''}
                                    ${activeSkill.type === 2 ? 'text-yellow-500' : ''}
                                    ${activeSkill.type === 3 ? 'text-fuchsia-500' : ''}`}
                            >
                                <span
                                    className={
                                        theme === 'light'
                                            ? 'text-slate-500'
                                            : 'text-[rgb(157,230,255)]'
                                    }
                                >
                                    Skill:{' '}
                                </span>
                                {activeSkill.name}
                            </h3>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Skills;
