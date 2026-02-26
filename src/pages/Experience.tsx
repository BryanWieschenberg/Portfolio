import React, { useRef } from 'react';
import Timeline from './subpages/Timeline';
import { useTheme } from '../context/ThemeContext';
import SwipeReveal from '../components/SwipeReveal';

const Experience: React.FC = () => {
    const { theme } = useTheme();
    const topRef = useRef<HTMLParagraphElement | null>(null);

    return (
        <>
            <p id="ToTop" ref={topRef} className="invisible text-white">
                ToTop
            </p>
            <div className="pt-16 lg:pt-20 text-center">
                <SwipeReveal
                    circleColor="bg-gradient-to-r from-[#0030ff] to-[#c4f9ff]"
                    shadowColor="shadow-[0_0_50px_rgba(0,48,255,0.6)]"
                    duration={0.6}
                >
                    <h1
                        className={`text-6xl lg:text-8xl font-bold lg:mt-2 pb-4 drop-shadow-[7px_7px_1.5px_rgba(30,30,160,1)] text-center relative bg-clip-text text-transparent
                        ${theme === 'light' ? 'bg-gradient-to-r from-blue-700 to-blue-400' : 'bg-gradient-to-r from-[#0030ff] to-[#c4f9ff]'}`}
                    >
                        Experience
                    </h1>
                </SwipeReveal>
            </div>
            <Timeline />
        </>
    );
};

export default Experience;
