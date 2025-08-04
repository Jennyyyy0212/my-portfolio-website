import React, { useEffect, useState } from 'react';
import '../static/styles/navbar.css';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';



const Navbar = () => {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleThemeToggle = () => {
    setIsDark(prev => !prev)
  };


  return (

    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <span className="logo-full">Jenny Cheng</span>
          <span className="logo-short">Jenny</span>
        </Link>

      </div>
      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="#projects">Projects</Link>
        <Link to="#experience">Experience</Link>
        <Link to="#education">Education</Link>
        <Link to="/hobbies">Hobbies</Link>
      </div>
      <div className="navbar-right">
        <button id="theme-toggle" onClick={handleThemeToggle} aria-label="Toggle theme">
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
    </nav>
  );
};

export default Navbar;