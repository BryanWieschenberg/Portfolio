import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function SkillTooltipWrapper({
    children,
    content,
    theme,
    compact,
}: {
    children: React.ReactNode;
    content: React.ReactNode;
    theme: 'light' | 'dark';
    compact?: boolean;
}) {
    const [hover, setHover] = useState(false);
    const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const updateRect = () => {
        if (ref.current) {
            const r = ref.current.getBoundingClientRect();
            setRect({ top: r.top, left: r.left, width: r.width });
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: TouchEvent | MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setHover(false);
            }
        };

        if (hover) {
            updateRect();
            const handleScroll = () => updateRect();
            const handleResize = () => updateRect();
            window.addEventListener('scroll', handleScroll, true);
            window.addEventListener('resize', handleResize);
            document.addEventListener('touchstart', handleClickOutside);
            document.addEventListener('mousedown', handleClickOutside);

            return () => {
                window.removeEventListener('scroll', handleScroll, true);
                window.removeEventListener('resize', handleResize);
                document.removeEventListener('touchstart', handleClickOutside);
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [hover]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div
            ref={ref}
            onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') {
                    setHover(true);
                }
            }}
            onPointerLeave={(e) => {
                if (e.pointerType === 'mouse') {
                    setHover(false);
                }
            }}
            onClick={() => setHover(!hover)}
            className="inline-block"
        >
            {children}
            {mounted &&
                createPortal(
                    <AnimatePresence>
                        {hover && rect && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                transition={{ duration: 0.15 }}
                                className="portal-tooltip z-[99999]"
                                style={
                                    {
                                        '--rect-top': `${rect.top}px`,
                                        '--rect-left': `${rect.left}px`,
                                        '--rect-width': `${rect.width}px`,
                                    } as React.CSSProperties
                                }
                            >
                                <div
                                    className={`portal-tooltip-inner font-normal rounded-xl shadow-2xl whitespace-normal text-left border ${
                                        compact
                                            ? 'px-3 py-1.5 text-xs w-max whitespace-nowrap'
                                            : 'p-3 text-sm w-[90vw] max-w-[320px] lg:w-max lg:min-w-[200px] lg:max-w-[280px]'
                                    } ${
                                        theme === 'light'
                                            ? 'bg-white text-slate-700 border-slate-200/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]'
                                            : 'bg-[#111318] text-slate-300 border-slate-700/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]'
                                    }`}
                                >
                                    {content}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
        </div>
    );
}
