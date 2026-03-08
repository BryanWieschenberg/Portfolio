import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Point {
    x: number;
    y: number;
    ox: number;
    oy: number;
    vx: number;
    vy: number;
}

const MESH_SIZE = 12;
const STIFFNESS = 0.06; // More liquid snap back
const DAMPING = 0.9; // Less friction for more "jiggle"
const INTERACTION_RADIUS = 100; // Wider area of effect
const PULL_STRENGTH = 0.25; // Base pull strength

const InteractiveFace: React.FC<{ src: string; theme: string }> = ({ src, theme }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const paintCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const meshRef = useRef<Point[][]>([]);
    const [isPainting, setIsPainting] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const mouseRef = useRef({ x: 0, y: 0, px: 0, py: 0, down: false });

    // Initialize mesh
    const initMesh = useCallback((width: number, height: number) => {
        const mesh: Point[][] = [];
        for (let y = 0; y <= MESH_SIZE; y++) {
            const row: Point[] = [];
            for (let x = 0; x <= MESH_SIZE; x++) {
                const px = (x / MESH_SIZE) * width;
                const py = (y / MESH_SIZE) * height;
                row.push({ x: px, y: py, ox: px, oy: py, vx: 0, vy: 0 });
            }
            mesh.push(row);
        }
        meshRef.current = mesh;
    }, []);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            imgRef.current = img;
            if (canvasRef.current) {
                const rect = containerRef.current?.getBoundingClientRect();
                if (rect) {
                    canvasRef.current.width = rect.width;
                    canvasRef.current.height = rect.height;
                    paintCanvasRef.current!.width = rect.width;
                    paintCanvasRef.current!.height = rect.height;
                    initMesh(rect.width, rect.height);
                }
            }
        };
    }, [src, initMesh]);

    const update = useCallback(() => {
        if (!meshRef.current.length) {
            return;
        }

        const { x: mx, y: my, down } = mouseRef.current;

        for (let y = 0; y <= MESH_SIZE; y++) {
            for (let x = 0; x <= MESH_SIZE; x++) {
                const p = meshRef.current[y][x];

                // Interaction: More like "grabbing" and "pulling"
                if (down && !isPainting) {
                    const dx = mx - p.x;
                    const dy = my - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < INTERACTION_RADIUS) {
                        const force = (1 - dist / INTERACTION_RADIUS) * PULL_STRENGTH;

                        // 1. Vector force (pulls points toward the mouse)
                        p.vx += dx * force * 0.5;
                        p.vy += dy * force * 0.5;

                        // 2. Velocity influence (drag effect)
                        p.vx += (mx - mouseRef.current.px) * force * 1.2;
                        p.vy += (my - mouseRef.current.py) * force * 1.2;
                    }
                }

                // Spring back to origin (with a bit more "slack")
                const ax = (p.ox - p.x) * STIFFNESS;
                const ay = (p.oy - p.y) * STIFFNESS;

                p.vx += ax;
                p.vy += ay;
                p.vx *= DAMPING;
                p.vy *= DAMPING;
                p.x += p.vx;
                p.y += p.vy;
            }
        }
        mouseRef.current.px = mx;
        mouseRef.current.py = my;
    }, [isPainting]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = imgRef.current;
        if (!ctx || !img || !meshRef.current.length) {
            return;
        }

        // Clear and set background color to hide sub-pixel gaps
        ctx.fillStyle = theme === 'light' ? '#f8fafc' : '#0f172a';
        ctx.fillRect(0, 0, canvas!.width, canvas!.height);

        // Turn off smoothing to prevent the "triangle seam" antialiasing issue
        ctx.imageSmoothingEnabled = false;

        const sw = img.width / MESH_SIZE;
        const sh = img.height / MESH_SIZE;

        // Helper for accurate affine triangle mapping
        const drawTriangle = (
            tp1: Point,
            tp2: Point,
            tp3: Point,
            u1: number,
            v1: number,
            u2: number,
            v2: number,
            u3: number,
            v3: number,
        ) => {
            ctx.save();
            ctx.beginPath();

            // Expand triangle vertices 1px outwards from center to prevent seams
            const cx = (tp1.x + tp2.x + tp3.x) / 3;
            const cy = (tp1.y + tp2.y + tp3.y) / 3;

            const expandPoint = (px: number, py: number) => {
                const dx = px - cx;
                const dy = py - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist === 0) {
                    return { x: px, y: py };
                }
                return {
                    x: px + (dx / dist) * 1.0,
                    y: py + (dy / dist) * 1.0,
                };
            };

            const e1 = expandPoint(tp1.x, tp1.y);
            const e2 = expandPoint(tp2.x, tp2.y);
            const e3 = expandPoint(tp3.x, tp3.y);

            ctx.moveTo(e1.x, e1.y);
            ctx.lineTo(e2.x, e2.y);
            ctx.lineTo(e3.x, e3.y);
            ctx.closePath();
            ctx.clip();

            const det = (u1 - u3) * (v2 - v3) - (u2 - u3) * (v1 - v3);
            const idet = 1 / det;
            const a = ((tp1.x - tp3.x) * (v2 - v3) - (tp2.x - tp3.x) * (v1 - v3)) * idet;
            const b = ((tp1.y - tp3.y) * (v2 - v3) - (tp2.y - tp3.y) * (v1 - v3)) * idet;
            const c = ((tp2.x - tp3.x) * (u1 - u3) - (tp1.x - tp3.x) * (u2 - u3)) * idet;
            const d = ((tp2.y - tp3.y) * (u1 - u3) - (tp1.y - tp3.y) * (u2 - u3)) * idet;
            const e = tp1.x - a * u1 - c * v1;
            const f = tp1.y - b * u1 - d * v1;

            ctx.setTransform(a, b, c, d, e, f);
            ctx.drawImage(img, 0, 0);
            ctx.restore();
        };

        for (let y = 0; y < MESH_SIZE; y++) {
            for (let x = 0; x < MESH_SIZE; x++) {
                const p1 = meshRef.current[y][x];
                const p2 = meshRef.current[y][x + 1];
                const p3 = meshRef.current[y + 1][x];
                const p4 = meshRef.current[y + 1][x + 1];

                drawTriangle(
                    p1,
                    p2,
                    p3,
                    x * sw,
                    y * sh,
                    (x + 1) * sw,
                    y * sh,
                    x * sw,
                    (y + 1) * sh,
                );
                drawTriangle(
                    p4,
                    p3,
                    p2,
                    (x + 1) * sw,
                    (y + 1) * sh,
                    x * sw,
                    (y + 1) * sh,
                    (x + 1) * sw,
                    y * sh,
                );
            }
        }

        // Reset transform for paint overlay
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.drawImage(paintCanvasRef.current!, 0, 0);
    }, [theme]);

    useEffect(() => {
        let frame: number;
        const loop = () => {
            update();
            draw();
            frame = requestAnimationFrame(loop);
        };
        frame = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frame);
    }, [update, draw]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseRef.current.x = x;
        mouseRef.current.y = y;

        if (isPainting && mouseRef.current.down) {
            const ctx = paintCanvasRef.current?.getContext('2d');
            if (ctx) {
                ctx.strokeStyle = theme === 'light' ? '#3b82f6' : '#69f1ff';
                ctx.lineWidth = 4;
                ctx.lineCap = 'round';
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
            }
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        mouseRef.current.down = true;
        if (isPainting) {
            const ctx = paintCanvasRef.current?.getContext('2d');
            if (ctx) {
                const rect = canvasRef.current!.getBoundingClientRect();
                ctx.beginPath();
                ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
            }
        }
    };

    const handleMouseUp = () => {
        mouseRef.current.down = false;
    };

    const clearPaint = () => {
        const ctx = paintCanvasRef.current?.getContext('2d');
        ctx?.clearRect(0, 0, paintCanvasRef.current!.width, paintCanvasRef.current!.height);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden cursor-crosshair group select-none shadow-2xl z-10 border-2 border-[#3c86ff]/40"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                mouseRef.current.down = false;
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            <canvas ref={canvasRef} className="absolute inset-0 block pointer-events-none z-10" />
            <canvas ref={paintCanvasRef} className="absolute inset-0 block hidden" />

            {/* Overlay Controls */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-2 left-2 right-2 flex justify-between gap-2 z-30"
                    >
                        <div className="flex gap-1">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsPainting(!isPainting);
                                }}
                                className={`p-1.5 rounded-lg backdrop-blur-md border border-white/20 transition-all ${isPainting ? 'bg-blue-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                                title={isPainting ? 'Switch to Stretch' : 'Switch to Paint'}
                            >
                                {isPainting ? '🖐️' : '🎨'}
                            </button>
                            {isPainting && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearPaint();
                                    }}
                                    className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
                                    title="Clear Drawing"
                                >
                                    🗑️
                                </button>
                            )}
                        </div>
                        <span className="text-[10px] text-white/60 self-center font-bold tracking-tight bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
                            {isPainting ? 'CLICK TO PAINT' : 'GRAB & PULL'}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveFace;
