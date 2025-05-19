import { useState, useEffect } from 'react';
import Head from 'next/head';
import Footer from './Footer';
import { motion } from 'framer-motion';
import NavLink from './NavLink';
import MobileMenu from './MobileMenu';

const Layout = ({ children, title = 'Aruniga Gnanasegaran | Portfolio' }) => {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll events for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    setMounted(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-dark-bg-primary text-dark-text-primary">
      <Head>
        <title>{title}</title>
        <meta name="description" content="CS Undergraduate Portfolio" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-dark-bg-primary">
          <div className="absolute top-10 left-10 w-60 h-60 rounded-full bg-blue-500 mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-500 mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '-3s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-teal-500 mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '-1.5s' }}></div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrollY > 10 ? 'glass py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo or Brand */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className="text-4xl font-bold gradient-text">AG</span>
          </motion.div>

          {/* Desktop NavLinks */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-6"
          >
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#contact">Contact</NavLink>

            {/* Resume Button */}
            <motion.a
              href="/aruniga-gnanasegaran-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium px-4 py-1.5 rounded border border-dark-accent/30 hover:border-dark-accent hover:text-dark-accent transition duration-300"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Resume
            </motion.a>
          </motion.div>

          {/* Mobile Menu */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:hidden"
          >
            <MobileMenu />
          </motion.div>
        </div>
      </nav>

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
