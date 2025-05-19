import { useEffect, useState } from 'react';
import Link from 'next/link';

const NavLink = ({ href, children }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;

      if (href === '#home' && window.scrollY < 400) {
        setIsActive(true);
        return;
      }

      try {
        const section = document.querySelector(href);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const isInView = rect.top <= 200 && rect.bottom >= 200;

        setIsActive(isInView);
      } catch (error) {
        console.error("Error in NavLink scroll handler:", error);
      }
    };

    const onScroll = () => requestAnimationFrame(handleScroll);

    window.addEventListener('scroll', onScroll);
    handleScroll(); // Initial check on mount

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [href]);

  const handleClick = (e) => {
    e.preventDefault();

    const section = document.querySelector(href);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      role="link"
      tabIndex={0}
      className={`relative text-sm font-medium transition-colors duration-300 ${
        isActive
          ? 'text-dark-accent'
          : 'text-dark-text-primary hover:text-dark-text-primary/80'
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-dark-accent rounded-full" />
      )}
    </Link>
  );
};

export default NavLink;
