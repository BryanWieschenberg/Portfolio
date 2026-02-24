import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PeriodTiming {
    month: number;
    period: string;
}

interface AvailabilityPeriod {
    name: string;
    start: PeriodTiming;
    end: PeriodTiming;
    type: string;
    color: string;
    isPartial?: boolean;
    partName?: string;
}

const Availability: React.FC = () => {
    const [hoveredName, setHoveredName] = useState<string>('');

    const availabilityPeriods: AvailabilityPeriod[] = [
        {
            name: 'Spring Academic Semester',
            start: { month: 1, period: 'late' },
            end: { month: 5, period: 'late' },
            type: 'Remote',
            color: '#10b981',
        },
        {
            name: 'Summer Break',
            start: { month: 5, period: 'late' },
            end: { month: 8, period: 'mid' },
            type: 'On-site, hybrid, or remote',
            color: '#eab308',
        },
        {
            name: 'Fall Academic Semester',
            start: { month: 8, period: 'mid' },
            end: { month: 12, period: 'late' },
            type: 'Remote',
            color: '#ef4444',
        },
        {
            name: 'Winter Break',
            start: { month: 12, period: 'late' },
            end: { month: 1, period: 'late' },
            type: 'On-site, hybrid, or remote',
            color: '#3b82f6',
        },
    ];

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const periods = ['early', 'mid', 'late'];

    const getPosition = (month: number, period: string) => {
        return (month - 1) * 3 + periods.indexOf(period);
    };

    const calculateTimelineBlocks = () => {
        const normalBlocks = availabilityPeriods
            .filter((period) => period.name !== 'Winter Break')
            .map((period) => {
                const startPos = getPosition(period.start.month, period.start.period);
                const endPos = getPosition(period.end.month, period.end.period);

                const width = ((endPos - startPos) / 36) * 100;
                const left = (startPos / 36) * 100;

                const isAtStart = startPos === 0;
                const isAtEnd = endPos === 36;

                return {
                    ...period,
                    width: `${width}%`,
                    left: `${left}%`,
                    isPartial: false,
                    isAtStart,
                    isAtEnd,
                };
            });

        const winterBreak = availabilityPeriods.find((period) => period.name === 'Winter Break');
        if (winterBreak) {
            const endPartStartPos = getPosition(12, 'late');
            const endPartWidth = ((36 - endPartStartPos) / 36) * 100;

            const startPartEndPos = getPosition(1, 'late');
            const startPartWidth = (startPartEndPos / 36) * 100;

            return [
                ...normalBlocks,
                {
                    ...winterBreak,
                    width: `${endPartWidth}%`,
                    left: `${(endPartStartPos / 36) * 100}%`,
                    isPartial: true,
                    partName: 'end',
                    isAtStart: false,
                    isAtEnd: true,
                },
                {
                    ...winterBreak,
                    width: `${startPartWidth}%`,
                    left: '0%',
                    isPartial: true,
                    partName: 'start',
                    isAtStart: true,
                    isAtEnd: false,
                },
            ];
        }

        return normalBlocks;
    };

    const timelineBlocks = calculateTimelineBlocks();

    const getCorrectedPeriod = (originalPeriod: string) => {
        if (originalPeriod === 'late') {
            return 'mid';
        }
        if (originalPeriod === 'mid') {
            return 'early';
        }
        return 'late';
    };

    const reorderedPeriods = [
        availabilityPeriods.find((p) => p.name === 'Summer Break'),
        availabilityPeriods.find((p) => p.name === 'Fall Academic Semester'),
        availabilityPeriods.find((p) => p.name === 'Winter Break'),
        availabilityPeriods.find((p) => p.name === 'Spring Academic Semester'),
    ].filter(Boolean) as AvailabilityPeriod[];

    return (
        <div>
            <div className="mt-20"></div>
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="roles-text lg:mb-2 lg:pt-5 text-2xl lg:text-6xl font-bold pb-4 drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)] text-center relative text-[#8580e7] bg-clip-text"
            >
                What Roles Am I Looking For?
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="lg:pt-8 text-xs text-center lg:text-xl text-white"
            >
                I'm based in New Jersey, but am open to relocating nationwide without financial
                assistance for the right opportunity.
                <br />I am authorized to work in the U.S. without sponsorship.
            </motion.p>

            <motion.h1
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="roles-text lg:mb-2 lg:pt-10 text-xl lg:text-5xl font-bold pb-4 drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)] text-center relative text-[#a1aeff] bg-clip-text"
            >
                Availability Timeline:
            </motion.h1>

            <div className="lg:mt-3 container mx-auto px-4 lg:px-20">
                <div className="relative mb-16">
                    <div className="flex justify-between mb-2">
                        {months.map((month, index) => (
                            <div key={index} className="flex-1">
                                <div className="text-xs lg:text-sm text-white">{month}</div>
                            </div>
                        ))}
                    </div>

                    {/* Timeline */}
                    <div className="h-6 lg:h-8 bg-gray-700 rounded-full relative overflow-hidden">
                        {timelineBlocks.map((block, index) => {
                            let borderRadius = '0';
                            if (block.isAtStart && block.isAtEnd) {
                                borderRadius = '9999px';
                            } else if (block.isAtStart) {
                                borderRadius = '9999px 0 0 9999px';
                            } else if (block.isAtEnd) {
                                borderRadius = '0 9999px 9999px 0';
                            }

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.5 + index * 0.1,
                                        ease: 'easeOut',
                                    }}
                                    className="absolute h-full flex items-center justify-center origin-left"
                                    style={{
                                        width: block.width,
                                        left: block.left,
                                        backgroundColor: block.color,
                                        boxShadow: '0 0 10px rgba(0, 100, 255, 0.6)',
                                        overflow: 'hidden',
                                        borderRadius,
                                        zIndex: block.isPartial ? 5 : 1,
                                    }}
                                    whileHover={{ filter: 'brightness(1.5)', zIndex: 10 }}
                                    onMouseEnter={() => setHoveredName(block.name)}
                                    onMouseLeave={() => setHoveredName('')}
                                />
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                        className="flex justify-center mt-6 gap-4"
                    >
                        <div className="flex items-center">
                            <div className="mr-2 w-4 h-4 min-w-[1rem] min-h-[1rem] bg-yellow-500 rounded-full flex-shrink-0"></div>
                            <span className="text-xs lg:text-sm text-white">Summer Break</span>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-2 w-4 h-4 min-w-[1rem] min-h-[1rem] bg-red-500 rounded-full flex-shrink-0"></div>
                            <span className="text-xs lg:text-sm text-white">
                                Fall Academic Semester
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-2 w-4 h-4 min-w-[1rem] min-h-[1rem] bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span className="text-xs lg:text-sm text-white">Winter Break</span>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-2 w-4 h-4 min-w-[1rem] min-h-[1rem] bg-emerald-500 rounded-full flex-shrink-0"></div>
                            <span className="text-xs lg:text-sm text-white">
                                Spring Academic Semester
                            </span>
                        </div>
                    </motion.div>

                    {/* Availability Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2 }}
                        className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4"
                    >
                        {reorderedPeriods.map((period, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.02, filter: 'brightness(1.2)' }}
                                className={`
                                    ${period.name === hoveredName ? 'bg-[#2d416c] border-white' : 'bg-gray-900 border-gray-600'} 
                                    bg-opacity-40 p-2 lg:p-4 rounded-2xl border-[3px] 
                                    text-sm lg:text-base shadow-lg transition-all duration-300
                                `}
                            >
                                <h3
                                    className="text-sm lg:text-lg font-semibold"
                                    style={{ color: period.color }}
                                >
                                    {period.name}
                                </h3>
                                <p className="text-xs lg:text-sm text-gray-300">
                                    {months[period.start.month - 1]} ({period.start.period}) -{' '}
                                    {months[(period.end.month - 1 + 12) % 12]} (
                                    {getCorrectedPeriod(period.end.period)})
                                </p>
                                <p className="text-xs lg:text-sm font-medium mt-1 text-white">
                                    Availability:{' '}
                                    <span style={{ color: '#2ddede' }}>{period.type}</span>
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Availability;
