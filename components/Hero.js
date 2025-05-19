import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowRight } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';

const Hero = () => {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    let drops = new Array(columns).fill(1);
    const chars = '10アァカサタナハマヤャラワガザダ...'; // trimmed for brevity

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0ff');
      gradient.addColorStop(0.5, '#4facfe');
      gradient.addColorStop(1, '#00f2fe');
      ctx.fillStyle = gradient;
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.globalAlpha = Math.random() * 0.8 + 0.2;
        ctx.fillText(text, i * fontSize, y * fontSize);
        ctx.globalAlpha = 1;
        if (y * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const clickReset = () => {
      drops = drops.map(() => Math.floor(Math.random() * 10));
    };

    window.addEventListener('resize', resize);
    window.addEventListener('click', clickReset);
    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', clickReset);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg-primary via-transparent to-dark-bg-primary z-10" />

      <div className="absolute inset-0 z-10 overflow-hidden">
        {[1, 2, 3].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full blur-3xl opacity-20"
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              scale: Math.random() + 0.5,
              background:
                index % 2 === 0
                  ? 'radial-gradient(circle, rgba(0,247,255,0.5), rgba(10,179,216,0.2))'
                  : 'radial-gradient(circle, rgba(64,223,255,0.4), rgba(62,210,248,0.1))',
            }}
            animate={{
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              transition: {
                x: { duration: 20 + index * 5, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: 25 + index * 7, repeat: Infinity, ease: 'easeInOut' },
              },
            }}
            style={{
              width: `${150 + index * 100}px`,
              height: `${150 + index * 100}px`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="flex flex-col items-center md:items-start text-center md:text-left max-w-4xl mx-auto md:mx-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
              >
                Hi, I&apos;m{" "}
                <span className="gradient-text">Aruniga</span>
              </motion.h1>

              <motion.div variants={itemVariants} className="inline-block mb-6">
                <div className="glass px-5 py-2 rounded-full text-dark-accent flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-dark-accent animate-pulse"></span>
                  <span className="text-sm font-medium tracking-wide">Computer Science Undergraduate</span>
                </div>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-dark-text-secondary max-w-2xl mb-8 leading-relaxed"
              >
                Passionate about building elegant solutions to complex problems. Specializing in web development,
                algorithms, and AI/ML with a focus on creating impactful software that drives innovation.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
                <motion.a
                  href="#projects"
                  className="btn-primary group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Projects
                    <FaArrowRight className="h-4 w-4" />
                  </span>
                </motion.a>

                <motion.a
                  href="#contact"
                  className="px-6 py-2 rounded-lg font-medium border border-dark-text-secondary/30 hover:border-dark-accent/70 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact Me
                </motion.a>
              </motion.div>

              {/* ✅ Social icons: scale only, no rotation, no pink */}
              <motion.div variants={itemVariants} className="flex items-center space-x-5">
                <motion.a
                  href="https://github.com/aru-segar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full glass border border-white/10 hover:border-dark-accent/50 transition-all duration-300"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub size={22} />
                </motion.a>

                <motion.a
                  href="https://www.linkedin.com/in/aruniga-gnanasegaran"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full glass border border-white/10 hover:border-dark-accent/50 transition-all duration-300"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin size={22} />
                </motion.a>

                <motion.a
                  href="https://www.instagram.com/aru.segar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full glass border border-white/10 hover:border-dark-accent/50 transition-all duration-300"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaInstagram size={22} />
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5, ease: 'easeOut' }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center text-dark-text-secondary hover:text-dark-accent transition-colors duration-300 group"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-sm mb-2 opacity-70 group-hover:opacity-100">Scroll Down</span>
          <motion.div
            className="border border-dark-text-secondary/20 rounded-full p-1 group-hover:border-dark-accent/50"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
          >
            <HiChevronDown size={20} />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
