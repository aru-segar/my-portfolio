import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu } from 'react-icons/hi';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  const handleNavClick = (href) => {
    setIsOpen(false);
    setTimeout(() => {
      const section = document.querySelector(href);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={toggleMenu}
        className="p-2 focus:outline-none hover:scale-105 transition-transform duration-200"
        aria-label="Toggle menu"
      >
        <HiMenu className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            {/* Slide-in menu */}
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed top-0 right-0 w-full sm:w-80 h-screen glass z-50 shadow-xl p-6 flex flex-col"
            >
              <div className="flex justify-end">
                <button
                  onClick={toggleMenu}
                  className="text-dark-accent font-medium text-sm hover:underline transition duration-200"
                  aria-label="Close menu"
                >
                  Close
                </button>
              </div>

              <div className="flex flex-col space-y-8 mt-10">
                {[
                  { label: "Home", href: "#home" },
                  { label: "About", href: "#about" },
                  { label: "Skills", href: "#skills" },
                  { label: "Projects", href: "#projects" },
                  { label: "Contact", href: "#contact" },
                ].map((item) => (
                  <motion.a
                    key={item.href}
                    variants={itemVariants}
                    onClick={() => handleNavClick(item.href)}
                    className="text-lg font-medium hover:text-dark-accent transition-colors duration-300 cursor-pointer"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="mt-auto pt-10"
              >
                <a
                  href="/aruniga-gnanasegaran-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex justify-center"
                >
                  Download Resume
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
