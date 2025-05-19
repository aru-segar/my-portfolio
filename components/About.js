import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaCode, FaLaptopCode, FaBrain } from 'react-icons/fa';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  };

  const passionCards = [
    {
      icon: <FaCode className="text-2xl text-blue-400" />,
      title: "Clean Code",
      description: "I aim to write clear, efficient, and well-organized code that scales with projects."
    },
    {
      icon: <FaLaptopCode className="text-2xl text-purple-400" />,
      title: "Full-Stack Development",
      description: "I enjoy building applications across the full stack with thoughtful user experiences."
    },
    {
      icon: <FaBrain className="text-2xl text-pink-400" />,
      title: "AI & Machine Learning",
      description: "I’m curious about how intelligent systems can solve real-world problems creatively."
    }
  ];

  return (
    <section id="about" className="py-16 bg-dark-bg-primary relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-0 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-20 -left-40 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-2 text-center"
            >
              About <span className="gradient-text">Me</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-dark-text-secondary leading-relaxed text-lg"
            >
              I am a motivated and creative individual with a strong passion for building elegant, meaningful software.
              I thrive in solving problems through code, blending logical thinking with visual design to create
              intuitive user experiences. Whether it is frontend development, backend APIs, or experimenting with
              smart algorithms - I enjoy pushing boundaries and constantly improving my skills.
            </motion.p>

            <motion.p 
              variants={itemVariants}
              className="text-dark-text-secondary leading-relaxed text-lg"
            >
              My work philosophy is centered around adaptability, simplicity, and continuous learning. I value clean
              code, smart architecture, and user-first design. I am always excited to take on new challenges, explore
              the latest technologies, and collaborate with others to bring ideas to life.
            </motion.p>

            <motion.p 
              variants={itemVariants}
              className="text-dark-text-secondary leading-relaxed text-lg"
            >
              Outside of code, I enjoy exploring design trends, attending tech events, and contributing to
              communities that inspire creativity and innovation.
            </motion.p>
          </motion.div>

          {/* Passion cards */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-4 mt-16"
          >
            {passionCards.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-5 hover:border-dark-accent/50 transition-all duration-300"
              >
                <div className="mb-3">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold mb-1.5">{card.title}</h3>
                <p className="text-dark-text-secondary text-base">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
