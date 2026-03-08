import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Experience } from '../constants';
import { normalizeTitle, computeSpan, getSkillIconPath, getSkillIconFallback } from '../lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface ExperienceCardProps {
    experience: Experience;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    variants?: any;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, variants }) => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const slug = normalizeTitle(experience.role);

    const allSkillNames = Object.values(experience.skills).flatMap((cat) => Object.keys(cat));
    const totalSkills = new Set(allSkillNames).size;
    const topSkills = experience.top_skills || [];
    const remaining = totalSkills - topSkills.length;

    return (
        <motion.div
            variants={variants}
            whileHover={{ scale: 1.03 }}
            onClick={() => navigate(`/work/experience/${slug}`)}
            style={{ cursor: 'pointer' }}
            className={`group h-full relative p-[1px] rounded-2xl transition-shadow duration-500
                ${
                    theme === 'light'
                        ? 'bg-slate-200/80 shadow-md hover:shadow-[0_0_25px_rgba(100,116,139,0.3)]'
                        : 'bg-gradient-to-br from-[#1a1f2e] via-[#252b3b] to-[#1a1f2e] shadow-2xl hover:shadow-[0_0_30px_rgba(148,163,184,0.15)]'
                } 
                overflow-hidden`}
        >
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className={`absolute inset-0 bg-gradient-to-r from-transparent z-0 pointer-events-none
                    ${theme === 'light' ? 'via-slate-300/20' : 'via-slate-400/10'}`}
            ></motion.div>

            <div
                className={`relative z-10 rounded-2xl p-6 h-full flex flex-col
                ${theme === 'light' ? 'bg-white' : 'bg-[#111318]/95 border border-slate-700/50'}`}
            >
                {/* Row 1: Icon + Role & Company | GitHub */}
                <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-3">
                        <img
                            src={`/artifacts/experience/${slug}/icon.png`}
                            alt={`${experience.role} logo`}
                            className="w-8 h-8 rounded-lg object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                        <div>
                            <h3 className="card-title text-2xl">{experience.role}</h3>
                            <p
                                className={`text-sm font-medium ${
                                    theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                                }`}
                            >
                                {experience.company}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Row 2: Date + Span */}
                <div className="flex items-center mb-4">
                    <p
                        className={`text-xs font-semibold tracking-wider uppercase ${
                            theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                        }`}
                    >
                        {experience.date}
                        {(() => {
                            const span = experience.span || computeSpan(experience.date);
                            return span ? <span className="font-normal"> ({span})</span> : '';
                        })()}
                    </p>
                </div>

                {/* Row 3: Hook */}
                <p className="card-text mb-6 flex-grow">{experience.hook}</p>

                {/* Row 4: Top skill badges with icons */}
                <div
                    className={`mt-auto pt-4 border-t h-[82px] ${
                        theme === 'light' ? 'border-slate-200' : 'border-slate-700/50'
                    }`}
                >
                    <div className="flex flex-wrap gap-2">
                        {topSkills.map((skill, i) => (
                            <span
                                key={i}
                                className={`px-2.5 py-1 rounded-md text-xs font-medium border whitespace-nowrap flex items-center gap-1.5 ${
                                    theme === 'light'
                                        ? 'bg-slate-100 text-slate-600 border-slate-200'
                                        : 'bg-slate-800/50 text-slate-300 border-slate-600/50'
                                }`}
                            >
                                <img
                                    src={getSkillIconPath(skill, theme)}
                                    alt={skill}
                                    className="w-3.5 h-3.5 object-contain"
                                    onError={(e) => {
                                        const img = e.target as HTMLImageElement;
                                        const fallback = getSkillIconFallback(skill);
                                        if (img.src.endsWith(fallback)) {
                                            img.style.display = 'none';
                                        } else {
                                            img.src = fallback;
                                        }
                                    }}
                                />
                                {skill}
                            </span>
                        ))}
                        {remaining > 0 && (
                            <span className="px-2.5 py-1 text-slate-500 text-xs font-medium self-center">
                                +{remaining} more
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ExperienceCard;
