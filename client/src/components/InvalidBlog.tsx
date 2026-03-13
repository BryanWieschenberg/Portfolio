import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const InvalidBlog: React.FC = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center pt-20 lg:pt-24">
            <h1
                className={`text-4xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
            >
                Blog Post Not Found
            </h1>
            <button
                onClick={() => navigate('/blog')}
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all"
            >
                ← Back to Blog
            </button>
        </div>
    );
};

export default InvalidBlog;
