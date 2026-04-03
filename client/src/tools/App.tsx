import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MarkdownMaker from './pages/MarkdownMaker';

const ToolsNavbar = () => (
    <nav className="w-full h-10 bg-slate-900 border-b border-slate-800 flex items-center px-4 shrink-0 z-50">
        <Link
            to="/"
            className="text-slate-400 hover:text-sky-400 font-medium text-xs uppercase tracking-wider transition-colors"
        >
            ← Bryan's Tools
        </Link>
    </nav>
);
const ToolsHome = () => {
    return (
        <div className="container">
            <h1>Bryan's Tools</h1>
            <p style={{ color: '#94a3b8', marginBottom: '32px' }}>
                A collection of independent utilities and small applications.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Link to="/md" className="tool-card">
                    <h2>Markdown Editor</h2>
                    <p>Browser-based markdown editor</p>
                </Link>

                <Link to="/geo" className="tool-card">
                    <h2>Geography Game</h2>
                    <p>Test your geography knowledge</p>
                </Link>
            </div>
        </div>
    );
};

const GeoMvp = () => {
    return (
        <div className="container">
            <Link to="/" style={{ fontSize: '14px', color: '#94a3b8' }}>
                ← Back to tools
            </Link>
            <h1>Geography Game</h1>
            <p>Geography game placeholder space.</p>
        </div>
    );
};

const ToolsApp: React.FC = () => {
    return (
        <Router basename="/">
            <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-100">
                <ToolsNavbar />
                <div className="flex-1 min-h-0 overflow-auto">
                    <Routes>
                        <Route path="/" element={<ToolsHome />} />
                        <Route path="/md" element={<MarkdownMaker />} />
                        <Route path="/geo" element={<GeoMvp />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default ToolsApp;
