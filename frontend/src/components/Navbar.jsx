import React, { useEffect, useState } from 'react';
import '../static/styles/navbar.css';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';




const Navbar = () => {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleThemeToggle = () => {
    setIsDark(prev => !prev)
  };


  return (

    <nav className="navbar">
      <div className="navbar-left">
        <a href="#home" className="logo">
          <span className="logo-full">Jenny Cheng</span>
          <span className="logo-short">Jenny</span>
        </a>

      </div>
      <div className="navbar-center hidden md:flex">
        <a href="#home">Home</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#education">Education</a>
        <a href="/hobbies">Hobbies</a>
      </div>
      <div className="navbar-right">
        <div className="flex items-center gap-4 md:hidden">
          {/* Mobile theme toggle */}
          <button onClick={handleThemeToggle} aria-label="Toggle theme" className="inline-flex">
            <div className="theme-icon-wrapper relative icon-website">
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    <MdLightMode className="icon" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    <MdDarkMode className="icon" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
          <a
            href="https://www.linkedin.com/in/an-chieh-cheng"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex"
          >
            <FaLinkedin size={22} />
          </a>
          <a
            href="https://github.com/Jennyyyy0212"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex"
          >
            <FaGithub size={22} />
          </a>
        </div>

        <div className="desktop-actions">
          <button id="theme-toggle" onClick={handleThemeToggle} aria-label="Toggle theme" className="hidden md:!flex ">
            <div className="theme-icon-wrapper">
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    <MdLightMode className="icon" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    <MdDarkMode className="icon" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;