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

const App: React.FC = () => (
    <Router basename="/">
        <style>
            {`
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow-x: hidden; /* Prevent horizontal scroll */
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
        
        /* Custom Dark Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #0a0a0a; /* Dark background */
        }
        ::-webkit-scrollbar-thumb {
          background: #444; /* Darker thumb */
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #777; /* Lighter on hover */
        }

        /* Firefox Scrollbar */
        * {
          scrollbar-color: #555 #0a0a0a;
        }
        
        /* Fixed positioning for content to respect navbar */
        .content-container {
          position: fixed;
          top: 46px; /* Height of your navbar */
          left: 0;
          right: 0;
          bottom: 0;
          overflow-y: auto;
          width: 100%;
          scrollbar-gutter: stable;
        }
        
        @media (min-width: 1024px) {
          .content-container {
            top: 60px; /* Increase top space for larger navbar */
          }
        }

        /* Account for expandable navbar section */
        .navbar-expanded .content-container {
          top: 90px; /* Adjusted height when navbar is expanded */
        }
      `}
        </style>

        <div className="app-container">
            <Background />
            <Navbar />

            <div className={`content-container`}>
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
);

export default App;
