import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoPersonCircleOutline, IoPersonCircle } from 'react-icons/io5';
import { MdWork, MdWorkOutline, MdOutlineContactless, MdContactless } from 'react-icons/md';
import { RiQuillPenFill, RiQuillPenLine } from 'react-icons/ri';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { FiPlus, FiX } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaFileAlt } from 'react-icons/fa';
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
    const [lineStyle, setLineStyle] = useState<{ left: number; width: number }>({
        left: 0,
        width: 0,
    });
    const [isExpanded, setIsExpanded] = useState(false);

    const isWorkActive = location.pathname.startsWith('/work');
    const isBlogActive = location.pathname.startsWith('/blog');

    const updateLinePosition = () => {
        let ref: React.RefObject<HTMLDivElement | null> | null = null;

        if (location.pathname === '/') {ref = homeRef;}
        else if (location.pathname === '/about') {ref = aboutRef;}
        else if (isWorkActive) {ref = workRef;}
        else if (isBlogActive) {ref = blogRef;}
        else if (location.pathname === '/contact') {ref = contactRef;}

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

    const handleResize = () => {
        const newWidth = window.innerWidth;
        if (newWidth >= 1024 && isExpanded) {
            setIsExpanded(false);
        }
        updateLinePosition();
    };

    useEffect(() => {
        updateLinePosition();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [location, isExpanded]);

    const handleNavigation = (e: React.MouseEvent, path: string) => {
        e.preventDefault();
        navigate(path);
    };

    return (
        <div
            className={`sticky top-0 left-0 w-full z-[100] backdrop-blur-3xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_1px_20px_rgba(255,255,255,0.15)] border-b
                ${theme === 'light' ? 'bg-white/20 border-white/30 border-gray-500' : 'bg-slate-900/40 border-white/10 border-gray-900'}`}
        >
            <div
                className={`w-full overflow-hidden transition-all duration-300 ease-in-out border-b
                    ${isExpanded ? 'h-10 opacity-100' : 'h-0 opacity-0'}`}
            >
                <div className="container mx-auto px-2 h-full flex items-center justify-center">
                    <ul className="flex items-center space-x-1.5 text-lg">
                        <li>
                            <a
                                href="/assets/attachments/Resume%20-%20Bryan%20Wieschenberg.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`hover:text-blue-400 flex items-center text-blue-200`}
                            >
                                <FaFileAlt className="w-7 h-7" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/BryanWieschenberg/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`hover:text-blue-400 flex items-center text-blue-200`}
                            >
                                <FaGithub className="w-7 h-7" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://linkedin.com/in/BryanWieschenberg/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`hover:text-blue-400 flex items-center text-blue-200`}
                            >
                                <FaLinkedin className="w-7 h-7" />
                            </a>
                        </li>
                        <li>
                            <button
                                onClick={toggleTheme}
                                className={`flex items-center p-1 rounded-full transition-colors ${theme === 'light' ? 'bg-slate-200/50 text-slate-800 hover:bg-slate-300' : 'bg-slate-800/50 text-yellow-400 hover:bg-slate-700'}`}
                            >
                                {theme === 'light' ? (
                                    <IoMoon className="w-5 h-5" />
                                ) : (
                                    <IoSunny className="w-5 h-5" />
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <header
                className={`relative flex items-center w-full py-2 transition-all duration-300 
                    ${isExpanded ? 'mt-0 border-t border-white/10' : ''}
                    ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={(e) => handleNavigation(e, '/')}
                    >
                        <img
                            src="./assets/images/favicon.ico"
                            alt="Logo"
                            className="w-6 h-6 lg:w-10 lg:h-10"
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
                                    className={`flex flex-col items-center cursor-pointer transition-colors ${
                                        location.pathname === '/'
                                            ? theme === 'light'
                                                ? 'text-blue-700'
                                                : 'text-blue-300'
                                            : theme === 'light'
                                              ? 'text-slate-600 hover:text-blue-600'
                                              : 'text-gray-400 hover:text-gray-300'
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
                                    className={`flex flex-col items-center cursor-pointer transition-colors ${
                                        isWorkActive
                                            ? theme === 'light'
                                                ? 'text-blue-700'
                                                : 'text-blue-300'
                                            : theme === 'light'
                                              ? 'text-slate-600 hover:text-blue-600'
                                              : 'text-gray-400 hover:text-gray-300'
                                    }`}
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
                                    className={`flex flex-col items-center cursor-pointer transition-colors ${
                                        location.pathname === '/about'
                                            ? theme === 'light'
                                                ? 'text-blue-700'
                                                : 'text-blue-300'
                                            : theme === 'light'
                                              ? 'text-slate-600 hover:text-blue-600'
                                              : 'text-gray-400 hover:text-gray-300'
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
                                    className={`flex flex-col items-center cursor-pointer transition-colors ${
                                        isBlogActive
                                            ? theme === 'light'
                                                ? 'text-blue-700'
                                                : 'text-blue-300'
                                            : theme === 'light'
                                              ? 'text-slate-600 hover:text-blue-600'
                                              : 'text-gray-400 hover:text-gray-300'
                                    }`}
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
                                    className={`flex flex-col items-center cursor-pointer transition-colors ${
                                        location.pathname === '/contact'
                                            ? theme === 'light'
                                                ? 'text-blue-700'
                                                : 'text-blue-300'
                                            : theme === 'light'
                                              ? 'text-slate-600 hover:text-blue-600'
                                              : 'text-gray-400 hover:text-gray-300'
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
                        <div className="hidden lg:flex items-center">
                            <ul className="flex items-center space-x-6 text-lg">
                                <li>
                                    <a
                                        href="./assets/attachments/Resume%20-%20Bryan%20Wieschenberg.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`hover:text-blue-400 flex flex-col items-center ${theme === 'light' ? 'text-blue-600' : 'text-blue-200'}`}
                                    >
                                        <FaFileAlt className="w-8 h-8" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/BryanWieschenberg/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`hover:text-blue-400 flex flex-col items-center ${theme === 'light' ? 'text-blue-600' : 'text-blue-200'}`}
                                    >
                                        <FaGithub className="w-8 h-8" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://linkedin.com/in/BryanWieschenberg/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`hover:text-blue-400 flex flex-col items-center text-blue-200`}
                                    >
                                        <FaLinkedin className="w-8 h-8" />
                                    </a>
                                </li>
                                <li>
                                    <button
                                        onClick={toggleTheme}
                                        className={`ml-2 flex items-center p-2 rounded-full transition-all duration-300 ${
                                            theme === 'light'
                                                ? 'bg-blue-100/50 text-blue-600 hover:bg-blue-200'
                                                : 'bg-slate-800/50 text-yellow-400 hover:bg-slate-700 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                                        }`}
                                    >
                                        {theme === 'light' ? (
                                            <IoMoon className="w-6 h-6" />
                                        ) : (
                                            <IoSunny className="w-6 h-6" />
                                        )}
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <button
                            className="lg:hidden text-blue-300 text-3xl ml-4"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? <FiX /> : <FiPlus />}
                        </button>
                    </div>
                </div>

                {(location.pathname === '/' ||
                    location.pathname === '/about' ||
                    isWorkActive ||
                    isBlogActive ||
                    location.pathname === '/contact') && (
                    <div
                        className="absolute bg-blue-400"
                        style={{
                            bottom: 0,
                            left: lineStyle.left,
                            width: lineStyle.width,
                            height: '2px',
                        }}
                    />
                )}
            </header>
        </div>
    );
};

export default Navbar;
