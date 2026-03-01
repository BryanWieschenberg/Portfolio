import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';

interface SwipeRevealProps {
    children: React.ReactNode;
    onComplete?: () => void;
    circleColor?: string;
    shadowColor?: string;
    duration?: number;
    delay?: number;
}

const SwipeReveal: React.FC<SwipeRevealProps> = ({
    children,
    onComplete,
    circleColor = 'bg-gradient-to-r from-[#3c86ff] to-[#69f1ff]',
    shadowColor = 'shadow-[0_0_50px_rgba(60,134,255,1)]',
    duration = 0.7,
    delay = 0,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isRevealPhase, setIsRevealPhase] = useState(false);
    const [isCircleVisible, setIsCircleVisible] = useState(true);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const scale = useMotionValue(0);
    const opacity = useMotionValue(0);

    const clipPath = useTransform(x, (currentX) => {
        if (!isRevealPhase) {return 'inset(-100px 100% -100px -100px)';}
        const rightInsetPx = containerWidth - currentX;
        return `inset(-100px ${rightInsetPx}px -100px -100px)`;
    });

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        const timer = setTimeout(updateWidth, 200);

        return () => {
            window.removeEventListener('resize', updateWidth);
            clearTimeout(timer);
        };
    }, []);

    const hasStarted = useRef(false);

    useEffect(() => {
        if (containerWidth === 0 || hasStarted.current) {return;}
        hasStarted.current = true;

        const runSequence = async () => {
            if (delay > 0) {await new Promise((resolve) => setTimeout(resolve, delay * 1000));}

            x.set(0);
            y.set(0);
            scale.set(0);
            opacity.set(0);

            const chargeScale = animate(scale, 1.4, { duration: 0.1, ease: 'backOut' });
            const chargeOpacity = animate(opacity, 1, { duration: 0.1 });
            await Promise.all([chargeScale, chargeOpacity]);

            setIsRevealPhase(true);
            await animate(x, containerWidth + 40, {
                duration: duration,
                ease: [0.45, 0, 0.55, 1],
            });

            setIsCircleVisible(false);

            if (onComplete) {
                setTimeout(onComplete, 300);
            }
        };

        runSequence();
    }, [containerWidth, onComplete, x, y, scale, opacity, duration, delay]);

    return (
        <div className="relative inline-block overflow-visible">
            <div ref={containerRef} className="relative inline-block overflow-visible">
                <div className="invisible select-none pointer-events-none" aria-hidden="true">
                    {children}
                </div>

                <motion.div
                    style={{ clipPath }}
                    className="absolute inset-0 z-[91] pointer-events-none overflow-visible whitespace-nowrap"
                >
                    {children}
                </motion.div>

                <AnimatePresence>
                    {isCircleVisible && (
                        <motion.div
                            exit={{ opacity: 0, scale: 0 }}
                            style={{
                                x,
                                y,
                                scale,
                                opacity,
                                left: 0,
                                top: '50%',
                                translateY: '-50%',
                                translateX: '-50%',
                            }}
                            className={`absolute w-12 h-12 lg:w-16 lg:h-16 rounded-full ${circleColor} ${shadowColor} z-[92] pointer-events-none`}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SwipeReveal;
