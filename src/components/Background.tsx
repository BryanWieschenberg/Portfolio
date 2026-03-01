import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

const Background: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    const sceneRef = useRef<{
        renderer: THREE.WebGLRenderer;
        scene: THREE.Scene;
        camera: THREE.PerspectiveCamera;
        geometry: THREE.BufferGeometry;
        angles: number[];
        radii: number[];
        speeds: number[];
        count: number;
        animId: number;
    } | null>(null);

    useEffect(() => {
        if (!mountRef.current) {
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            2000,
        );
        camera.position.z = 500;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const positions: number[] = [];
        const colors: number[] = [];
        const angles: number[] = [];
        const radii: number[] = [];
        const speeds: number[] = [];
        const sizes: number[] = [];
        const count = 500;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 30 + Math.random() * 500;
            angles.push(angle);
            radii.push(radius);

            const size = Math.random() < 0.99 ? 0.5 + Math.random() * 5 : 5 + Math.random() * 15;
            sizes.push(size);

            speeds.push(size * 0.25 * (0.0001 + Math.random() * 0.0005));

            positions.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);

            colors.push(0, 0, 0);
        }

        geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(new Float32Array(positions), 3),
        );
        geometry.setAttribute(
            'color',
            new THREE.Float32BufferAttribute(new Float32Array(colors), 3),
        );
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(new Float32Array(sizes), 1));

        const material = new THREE.ShaderMaterial({
            vertexColors: true,
            transparent: true,
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    vec2 glCoord = gl_PointCoord - 0.5;
                    if (length(glCoord) > 0.5) discard;
                    gl_FragColor = vec4(vColor, 1.0);
                }
            `,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        let animId = 0;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            const pos = geometry.attributes.position as THREE.BufferAttribute;
            for (let i = 0; i < count; i++) {
                angles[i] += speeds[i];
                const x = Math.cos(angles[i]) * radii[i];
                const y = Math.sin(angles[i]) * radii[i];
                pos.setXYZ(i, x, y, 0);
            }
            pos.needsUpdate = true;
            renderer.render(scene, camera);
        };
        animate();

        sceneRef.current = {
            renderer,
            scene,
            camera,
            geometry,
            angles,
            radii,
            speeds,
            count,
            animId,
        };

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            mountRef.current?.removeChild(renderer.domElement);
            sceneRef.current = null;
        };
    }, []);

    useEffect(() => {
        const s = sceneRef.current;
        if (!s) {
            return;
        }

        const colorAttr = s.geometry.attributes.color as THREE.BufferAttribute;
        const arr = colorAttr.array as Float32Array;

        for (let i = 0; i < s.count; i++) {
            const hue = theme === 'light' ? 170 + Math.random() * 15 : 210;
            const sat = theme === 'light' ? 85 : 80;
            const lightness = theme === 'light' ? 55 + Math.random() * 30 : 5 + Math.random() * 60;
            const c = new THREE.Color(`hsl(${hue}, ${sat}%, ${lightness}%)`);
            arr[i * 3] = c.r;
            arr[i * 3 + 1] = c.g;
            arr[i * 3 + 2] = c.b;
        }
        colorAttr.needsUpdate = true;
    }, [theme]);

    return (
        <div
            ref={mountRef}
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
        />
    );
};

export default Background;
