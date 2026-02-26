import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/views/Navbar';
import Background from './pages/views/Background';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => (
    <ThemeProvider>
        <Router basename="/">
            <style>
                {`
            html, body {
              margin: 0;
              padding: 0;
              height: 100%;
              overflow-x: hidden;
              transition: background-color 0.3s ease, color 0.3s ease;
            }
            
            #root {
              height: 100%;
            }
            
            .app-container {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
              position: relative;
            }
            
            .light {
              background-color: #f8fafc;
              color: #0f172a;
            }
            .dark {
              background-color: #1e242b;
              color: #ffffff;
            }

            .dark ::-webkit-scrollbar-track { background: #0a0a0a; }
            .dark ::-webkit-scrollbar-thumb { background: #444; border-radius: 5px; }
            .dark * { scrollbar-color: #555 #0a0a0a; }

            .light ::-webkit-scrollbar-track { background: #f1f5f9; }
            .light ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 5px; }
            .light * { scrollbar-color: #cbd5e1 #f1f5f9; }
            
            .content-container {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              overflow-y: auto;
              width: 100%;
              scrollbar-gutter: stable;
            }
          `}
            </style>

            <div className="app-container">
                <Background />

                <div className="content-container">
                    <Navbar />
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/experience" element={<Experience />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </div>
        </Router>
    </ThemeProvider>
);

export default App;
