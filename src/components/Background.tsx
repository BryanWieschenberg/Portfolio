import React, { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
    x: number;
    y: number;
    radiusX: number;
    radiusY: number;
    size: number;
    speed: number;
    r: number;
    g: number;
    b: number;
    targetR: number;
    targetG: number;
    targetB: number;
    glow: boolean;
}

const PARTICLE_COUNT = 200;
const TARGET_INTERVAL = 1000 / 30;
const COLOR_LERP_SPEED = 2.5;
const DPR_CAP = 2;

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    h /= 360;
    s /= 100;
    l /= 100;
    let r: number, g: number, b: number;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) {t += 1;}
            if (t > 1) {t -= 1;}
            if (t < 1 / 6) {return p + (q - p) * 6 * t;}
            if (t < 1 / 2) {return q;}
            if (t < 2 / 3) {return p + (q - p) * (2 / 3 - t) * 6;}
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [r, g, b];
}

function makeColor(theme: string): [number, number, number] {
    const hue = theme === 'light' ? 170 + Math.random() * 15 : 210;
    const sat = theme === 'light' ? 65 : 55;
    const lightness = theme === 'light' ? 50 + Math.random() * 20 : 8 + Math.random() * 35;
    return hslToRgb(hue, sat, lightness);
}

function createParticles(theme: string): Particle[] {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const orbitBase = 30 + Math.random() * 500;
        const radiusX = orbitBase * 1.4;
        const radiusY = orbitBase * 0.8;
        const isBig = Math.random() > 0.95;
        const size = isBig ? 2 + Math.random() * 2 : 0.3 + Math.random() * 1.5;
        const speed = size * 0.25 * (0.0001 + Math.random() * 0.0025);
        const [r, g, b] = makeColor(theme);
        particles.push({
            x: Math.cos(angle) * radiusX,
            y: Math.sin(angle) * radiusY,
            radiusX,
            radiusY,
            size,
            speed,
            r,
            g,
            b,
            targetR: r,
            targetG: g,
            targetB: b,
            glow: isBig,
        });
    }
    return particles;
}

const Background: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    const particlesRef = useRef<Particle[]>([]);
    const themeRef = useRef(theme);

    useEffect(() => {
        if (particlesRef.current.length === 0) {
            particlesRef.current = createParticles(theme);
        }
    }, []);

    useEffect(() => {
        themeRef.current = theme;
        for (const p of particlesRef.current) {
            const [r, g, b] = makeColor(theme);
            p.targetR = r;
            p.targetG = g;
            p.targetB = b;
        }
    }, [theme]);

    const resize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) {return;}
        const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        const ctx = canvas.getContext('2d');
        if (ctx) {ctx.setTransform(dpr, 0, 0, dpr, 0, 0);}
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {return;}
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) {return;}

        resize();
        window.addEventListener('resize', resize);

        let animId = 0;
        let lastTime = 0;

        const draw = (now: number) => {
            animId = requestAnimationFrame(draw);

            const delta = now - lastTime;
            if (delta < TARGET_INTERVAL) {return;}
            lastTime = now - (delta % TARGET_INTERVAL);

            const dtSec = Math.min(delta / 1000, 0.1);
            const w = window.innerWidth;
            const h = window.innerHeight;
            const cx = w / 2;
            const cy = h / 2;

            ctx.clearRect(0, 0, w, h);

            const particles = particlesRef.current;
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                const dTheta = p.speed * dtSec * 60;
                const newX = p.x - p.y * dTheta;
                const newY = p.y + p.x * dTheta;

                // Renormalise onto the ellipse
                const nx = newX / p.radiusX;
                const ny = newY / p.radiusY;
                const ellipseDist = Math.sqrt(nx * nx + ny * ny) || 1;
                p.x = newX / ellipseDist;
                p.y = newY / ellipseDist;

                const lerpAmt = Math.min(1, COLOR_LERP_SPEED * dtSec);
                p.r += (p.targetR - p.r) * lerpAmt;
                p.g += (p.targetG - p.g) * lerpAmt;
                p.b += (p.targetB - p.b) * lerpAmt;

                const r255 = (p.r * 255) | 0;
                const g255 = (p.g * 255) | 0;
                const b255 = (p.b * 255) | 0;
                const alpha = p.glow ? 0.45 : 0.35;

                const sx = cx + p.x;
                const sy = cy + p.y;

                if (p.glow) {
                    ctx.shadowBlur = p.size * 2;
                    ctx.shadowColor = `rgba(${r255},${g255},${b255},0.3)`;
                }

                ctx.beginPath();
                ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r255},${g255},${b255},${alpha})`;
                ctx.fill();

                if (p.glow) {
                    ctx.shadowBlur = 0;
                    ctx.shadowColor = 'transparent';
                }
            }
        };

        animId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, [resize]);

    return (
        <div
            className="transition-all duration-700"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: -1,
                background:
                    theme === 'light'
                        ? 'linear-gradient(to bottom, #f1f5f9, #e2e8f0 40%, #d9e2ec 100%)'
                        : 'linear-gradient(to bottom, #1e242b, #0f1214ff 40%, #0c0d0dff 100%)',
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    willChange: 'transform',
                }}
            />
        </div>
    );
};

export default Background;
