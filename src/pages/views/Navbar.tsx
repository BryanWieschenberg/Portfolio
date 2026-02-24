import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    IoDocumentTextOutline,
    IoDocumentTextSharp,
    IoPersonCircleOutline,
    IoPersonCircle,
} from 'react-icons/io5';
import { MdWork, MdWorkOutline } from 'react-icons/md';
import { HiChatBubbleBottomCenterText, HiOutlineChatBubbleBottomCenterText } from 'react-icons/hi2';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { FiPlus, FiX } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaFileAlt, FaUniversity } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const homeRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const [lineStyle, setLineStyle] = useState<{ left: number; width: number }>({
        left: 0,
        width: 0,
    });
    const [isExpanded, setIsExpanded] = useState(false);

    const updateLinePosition = () => {
        if (location.pathname === '/' && homeRef.current) {
            const rect = homeRef.current.getBoundingClientRect();
            const headerRect = homeRef.current.closest('header')?.getBoundingClientRect();
            if (headerRect) {
                const left = rect.left - headerRect.left - 4;
                const width = rect.width + 8;
                setLineStyle({ left, width });
            }
        } else if (location.pathname === '/about' && aboutRef.current) {
            const rect = aboutRef.current.getBoundingClientRect();
            const headerRect = aboutRef.current.closest('header')?.getBoundingClientRect();
            if (headerRect) {
                const left = rect.left - headerRect.left - 4;
                const width = rect.width + 8;
                setLineStyle({ left, width });
            }
        } else if (location.pathname === '/experience' && experienceRef.current) {
            const rect = experienceRef.current.getBoundingClientRect();
            const headerRect = experienceRef.current.closest('header')?.getBoundingClientRect();
            if (headerRect) {
                const left = rect.left - headerRect.left - 4;
                const width = rect.width + 8;
                setLineStyle({ left, width });
            }
        } else if (location.pathname === '/projects' && projectsRef.current) {
            const rect = projectsRef.current.getBoundingClientRect();
            const headerRect = projectsRef.current.closest('header')?.getBoundingClientRect();
            if (headerRect) {
                const left = rect.left - headerRect.left - 4;
                const width = rect.width + 8;
                setLineStyle({ left, width });
            }
        } else if (location.pathname === '/contact' && contactRef.current) {
            const rect = contactRef.current.getBoundingClientRect();
            const headerRect = contactRef.current.closest('header')?.getBoundingClientRect();
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
        <div className="fixed top-0 left-0 w-full z-50">
            <div
                className={`w-full overflow-hidden transition-all duration-300 ease-in-out
                    ${isExpanded ? 'h-10 opacity-100' : 'h-0 opacity-0'}`}
                style={{ background: 'linear-gradient(to bottom, #6b87aa, #4b576a)' }}
            >
                <div className="container mx-auto px-2 h-full flex items-center justify-center">
                    <ul className="flex space-x-1.5 text-lg text-blue-200">
                        <li>
                            <a
                                href="/assets/attachments/Resume%20-%20Bryan%20Wieschenberg.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-300 flex items-center"
                            >
                                <FaFileAlt className="w-7 h-7" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://tcnj.edu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-300 flex items-center"
                            >
                                <FaUniversity className="w-7 h-7" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/BryanWieschenberg/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-300 flex items-center"
                            >
                                <FaGithub className="w-7 h-7" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://linkedin.com/in/BryanWieschenberg/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-300 flex items-center"
                            >
                                <FaLinkedin className="w-7 h-7" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <header
                className={`relative flex items-center w-full text-white shadow-lg py-2 ${isExpanded ? 'mt-0' : ''}`}
                style={{ background: 'linear-gradient(to bottom, #4b576a, #0e1528)' }}
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
                        <div className="ml-2 hidden lg:block">
                            <span className="text-blue-300">Bryan</span>
                            <span className="block text-blue-300">Wieschenberg</span>
                        </div>
                    </div>

                    <nav className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex space-x-3 lg:space-x-10 text-lg text-blue-300">
                        <ul className="flex flex-wrap space-x-1.5 lg:space-x-8 text-lg text-blue-300">
                            <li>
                                <div
                                    ref={homeRef}
                                    onClick={(e) => handleNavigation(e, '/')}
                                    className={`flex flex-col items-center cursor-pointer ${
                                        location.pathname === '/'
                                            ? 'text-blue-300'
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
                                    ref={aboutRef}
                                    onClick={(e) => handleNavigation(e, '/about')}
                                    className={`flex flex-col items-center cursor-pointer ${
                                        location.pathname === '/about'
                                            ? 'text-blue-300'
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
                                    ref={experienceRef}
                                    onClick={(e) => handleNavigation(e, '/experience')}
                                    className={`flex flex-col items-center cursor-pointer ${
                                        location.pathname === '/experience'
                                            ? 'text-blue-300'
                                            : 'text-gray-400 hover:text-gray-300'
                                    }`}
                                >
                                    {location.pathname === '/experience' ? (
                                        <MdWork className="w-8 h-8" />
                                    ) : (
                                        <MdWorkOutline className="w-8 h-8" />
                                    )}
                                    <span className="hidden lg:block text-sm leading-tight mb-1">
                                        Experience
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div
                                    ref={projectsRef}
                                    onClick={(e) => handleNavigation(e, '/projects')}
                                    className={`flex flex-col items-center cursor-pointer ${
                                        location.pathname === '/projects'
                                            ? 'text-blue-300'
                                            : 'text-gray-400 hover:text-gray-300'
                                    }`}
                                >
                                    {location.pathname === '/projects' ? (
                                        <IoDocumentTextSharp className="w-8 h-8" />
                                    ) : (
                                        <IoDocumentTextOutline className="w-8 h-8" />
                                    )}
                                    <span className="hidden lg:block text-sm leading-tight mb-1">
                                        Projects
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div
                                    ref={contactRef}
                                    onClick={(e) => handleNavigation(e, '/contact')}
                                    className={`flex flex-col items-center cursor-pointer ${
                                        location.pathname === '/contact'
                                            ? 'text-blue-300'
                                            : 'text-gray-400 hover:text-gray-300'
                                    }`}
                                >
                                    {location.pathname === '/contact' ? (
                                        <HiChatBubbleBottomCenterText className="w-8 h-8" />
                                    ) : (
                                        <HiOutlineChatBubbleBottomCenterText className="w-8 h-8" />
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
                            <ul className="flex space-x-6 text-lg text-blue-200">
                                <li>
                                    <a
                                        href="./assets/attachments/Resume%20-%20Bryan%20Wieschenberg.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-300 flex flex-col items-center"
                                    >
                                        <FaFileAlt className="w-8 h-8" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://tcnj.edu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-300 flex flex-col items-center"
                                    >
                                        <FaUniversity className="w-8 h-8" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/BryanWieschenberg/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-300 flex flex-col items-center"
                                    >
                                        <FaGithub className="w-8 h-8" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://linkedin.com/in/BryanWieschenberg/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-300 flex flex-col items-center"
                                    >
                                        <FaLinkedin className="w-8 h-8" />
                                    </a>
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
                    location.pathname === '/education' ||
                    location.pathname === '/experience' ||
                    location.pathname === '/projects' ||
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
