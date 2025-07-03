'use client';

import { motion } from 'framer-motion';
import { FiLinkedin, FiGithub, FiMail, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FiGithub />, href: "https://github.com/aru-segar", label: "GitHub" },
    { icon: <FiLinkedin />, href: "https://linkedin.com/in/aruniga-gnanasegaran", label: "LinkedIn" },
    { icon: <FiInstagram />, href: "https://instagram.com", label: "Instagram" },
    { icon: <FiMail />, href: "mailto:arunigagnanasegaran@gmail.com", label: "Email" }
  ];

  return (
    <footer className="relative glass rounded-none w-full">
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Aruniga Gnanasegaran</h3>
            <p className="text-dark-text-secondary mb-6 max-w-md">
              Computer Science undergraduate passionate about building impactful software products.
            </p>

            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-dark-text-secondary hover:text-dark-accent transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-dark-accent mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-dark-text-secondary hover:text-dark-accent transition-colors duration-300">Home</a></li>
                <li><a href="#about" className="text-dark-text-secondary hover:text-dark-accent transition-colors duration-300">About</a></li>
                <li><a href="#skills" className="text-dark-text-secondary hover:text-dark-accent transition-colors duration-300">Skills</a></li>
                <li><a href="#projects" className="text-dark-text-secondary hover:text-dark-accent transition-colors duration-300">Projects</a></li>
                <li><a href="#contact" className="text-dark-text-secondary hover:text-dark-accent transition-colors duration-300">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-dark-accent mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-dark-text-secondary">Colombo, Sri Lanka</li>
                <li>
                  <a
                    href="mailto:arunigagnanasegaran@gmail.com"
                    className="text-dark-text-secondary hover:text-dark-accent transition-colors duration-300 break-all"
                  >
                    arunigagnanasegaran@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+94766022630"
                    className="text-dark-text-secondary hover:text-dark-accent transition-colors duration-300"
                  >
                    +94 76 602 2630
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-dark-border">
          <div className="text-center text-dark-text-secondary text-sm">
            <p>&copy; {currentYear} Aruniga Gnanasegaran. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
