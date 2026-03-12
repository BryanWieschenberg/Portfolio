import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoPersonCircleOutline, IoPersonCircle } from 'react-icons/io5';
import { MdWork, MdWorkOutline, MdOutlineContactless, MdContactless } from 'react-icons/md';
import { RiQuillPenFill, RiQuillPenLine } from 'react-icons/ri';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { IoSunny, IoMoon } from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const homeRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const workRef = useRef<HTMLDivElement>(null);
    const blogRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const isNavigating = useRef(false);
    const prevPathname = useRef(location.pathname);
    const [lineStyle, setLineStyle] = React.useState<{ left: number; width: number }>({
        left: 0,
        width: 0,
    });

    const isWorkActive = location.pathname.startsWith('/work');
    const isBlogActive = location.pathname.startsWith('/blog');

    const updateLinePosition = () => {
        let ref: React.RefObject<HTMLDivElement | null> | null = null;

        if (location.pathname === '/') {
            ref = homeRef;
        } else if (location.pathname === '/about') {
            ref = aboutRef;
        } else if (isWorkActive) {
            ref = workRef;
        } else if (isBlogActive) {
            ref = blogRef;
        } else if (location.pathname === '/contact') {
            ref = contactRef;
        }

        if (ref?.current) {
            const rect = ref.current.getBoundingClientRect();
            const headerRect = ref.current.closest('header')?.getBoundingClientRect();
            if (headerRect) {
                const left = rect.left - headerRect.left - 4;
                const width = rect.width + 8;
                setLineStyle({ left, width });
            }
        }
    };

    useEffect(() => {
        if (prevPathname.current !== location.pathname && lineStyle.width > 0) {
            isNavigating.current = true;
            prevPathname.current = location.pathname;
        }

        const rafId = requestAnimationFrame(() => {
            updateLinePosition();
        });
        const timer = setTimeout(() => {
            updateLinePosition();

            setTimeout(() => {
                isNavigating.current = false;
            }, 350);
        }, 100);
        window.addEventListener('resize', updateLinePosition);
        return () => {
            cancelAnimationFrame(rafId);
            clearTimeout(timer);
            window.removeEventListener('resize', updateLinePosition);
        };
    }, [location]);

    const handleNavigation = (e: React.MouseEvent, path: string) => {
        e.preventDefault();
        navigate(path);
    };

    return (
        <div
            className={`sticky top-0 left-0 w-full z-[100] backdrop-blur-3xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_1px_20px_rgba(255,255,255,0.15)] border-b
                ${theme === 'light' ? 'bg-white/20 border-white/30 border-slate-500' : 'bg-slate-900/40 border-white/10 border-slate-900'}`}
        >
            <header
                className={`relative flex items-center w-full py-1 lg:py-2 transition-all duration-300
                    ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={(e) => handleNavigation(e, '/')}
                    >
                        <img
                            src={
                                theme === 'light'
                                    ? '/images/logo-light.png'
                                    : '/images/logo-dark.png'
                            }
                            alt="Logo"
                            className="w-8 h-8 lg:w-10 lg:h-10"
                        />
                    </div>

                    <nav
                        className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex space-x-3 lg:space-x-10 text-lg ${theme === 'light' ? 'text-blue-600' : 'text-blue-300'}`}
                    >
                        <ul
                            className={`flex flex-wrap space-x-1.5 lg:space-x-8 text-lg ${theme === 'light' ? 'text-blue-600' : 'text-blue-300'}`}
                        >
                            <li>
                                <div
                                    ref={homeRef}
                                    onClick={(e) => handleNavigation(e, '/')}
                                    className={`${
                                        location.pathname === '/' ? 'nav-item-active' : 'nav-item'
                                    }`}
                                >
                                    {location.pathname === '/' ? (
                                        <GoHomeFill className="w-8 h-8" />
                                    ) : (
                                        <GoHome className="w-8 h-8" />
                                    )}
                                    <span className="hidden lg:block text-sm leading-tight mb-1">
                                        Home
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div
                                    ref={workRef}
                                    onClick={(e) => handleNavigation(e, '/work')}
                                    className={`${isWorkActive ? 'nav-item-active' : 'nav-item'}`}
                                >
                                    {isWorkActive ? (
                                        <MdWork className="w-8 h-8" />
                                    ) : (
                                        <MdWorkOutline className="w-8 h-8" />
                                    )}
                                    <span className="hidden lg:block text-sm leading-tight mb-1">
                                        Work
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div
                                    ref={aboutRef}
                                    onClick={(e) => handleNavigation(e, '/about')}
                                    className={`${
                                        location.pathname === '/about'
                                            ? 'nav-item-active'
                                            : 'nav-item'
                                    }`}
                                >
                                    {location.pathname === '/about' ? (
                                        <IoPersonCircle className="w-8 h-8" />
                                    ) : (
                                        <IoPersonCircleOutline className="w-8 h-8" />
                                    )}
                                    <span className="hidden lg:block text-sm leading-tight mb-1">
                                        About
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div
                                    ref={blogRef}
                                    onClick={(e) => handleNavigation(e, '/blog')}
                                    className={`${isBlogActive ? 'nav-item-active' : 'nav-item'}`}
                                >
                                    {isBlogActive ? (
                                        <RiQuillPenFill className="w-8 h-8" />
                                    ) : (
                                        <RiQuillPenLine className="w-8 h-8" />
                                    )}
                                    <span className="hidden lg:block text-sm leading-tight mb-1">
                                        Blog
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div
                                    ref={contactRef}
                                    onClick={(e) => handleNavigation(e, '/contact')}
                                    className={`${
                                        location.pathname === '/contact'
                                            ? 'nav-item-active'
                                            : 'nav-item'
                                    }`}
                                >
                                    {location.pathname === '/contact' ? (
                                        <MdContactless className="w-8 h-8" />
                                    ) : (
                                        <MdOutlineContactless className="w-8 h-8" />
                                    )}
                                    <span className="hidden lg:block text-sm leading-tight mb-1">
                                        Contact
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center">
                        <button onClick={toggleTheme} className="nav-theme-btn">
                            {theme === 'light' ? (
                                <IoMoon className="w-6 h-6" />
                            ) : (
                                <IoSunny className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {(location.pathname === '/' ||
                    location.pathname === '/about' ||
                    isWorkActive ||
                    isBlogActive ||
                    location.pathname === '/contact') &&
                    lineStyle.width > 0 && (
                        <div
                            className="absolute bg-blue-400"
                            style={{
                                bottom: 0,
                                left: lineStyle.left,
                                width: lineStyle.width,
                                height: '2px',
                                ...(isNavigating.current
                                    ? { transition: 'left 0.3s ease, width 0.3s ease' }
                                    : {}),
                            }}
                        />
                    )}
            </header>
        </div>
    );
};

export default Navbar;
