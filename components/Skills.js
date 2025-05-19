import { useRef } from 'react';
import { Icon } from '@iconify/react';
import { motion, useInView } from 'framer-motion';

const skills = [
  // Frontend
  { name: 'JavaScript', icon: 'logos:javascript' },
  { name: 'React', icon: 'logos:react' },
  { name: 'Next.js', icon: 'simple-icons:nextdotjs', color: '#ffffff' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
  { name: 'HTML5', icon: 'logos:html-5' },
  { name: 'CSS3', icon: 'logos:css-3' },
  { name: 'Figma', icon: 'logos:figma' },

  // Backend
  { name: 'Java', icon: 'logos:java' },
  { name: 'Python', icon: 'logos:python' },
  { name: 'Node.js', icon: 'logos:nodejs-icon' },
  { name: 'Express', icon: 'skill-icons:expressjs-dark' },
  { name: 'FastAPI', icon: 'logos:fastapi' },
  { name: 'Spring Boot', icon: 'logos:spring-icon' },

  // Databases & ML
{ name: 'MongoDB', icon: 'simple-icons:mongodb', color: '#10aa50' },
  { name: 'MySQL', icon: 'logos:mysql-icon' },
  { name: 'Pandas', icon: 'simple-icons:pandas', color: '#FFFFFF' },
  { name: 'NumPy', icon: 'logos:numpy' },
  { name: 'Scikit-learn', icon: 'simple-icons:scikitlearn', color: '#FFFFFF' },
  { name: 'Google Colab', icon: 'simple-icons:googlecolab', color: '#FFD54F' },

  // Tools
  { name: 'Postman', icon: 'logos:postman-icon' },
  { name: 'Swagger', icon: 'logos:swagger' },
{ name: 'GitHub', icon: 'simple-icons:github', color: '#ffffff' },
{ name: 'VS Code', icon: 'logos:visual-studio-code' },
{ name: 'IntelliJ IDEA', icon: 'logos:intellij-idea' },

];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 px-6 bg-dark-bg-primary text-dark-text-primary relative">
      {/* blur effect */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-pink-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
<h2 className="text-4xl font-bold mb-2 text-center">
  Technical <span className="gradient-text">Skills</span>
</h2>
        <p className="text-dark-text-secondary mb-12 text-center text-lg">
          Tools and technologies I work with
        </p>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-card p-5 flex flex-col items-center justify-center text-center hover:shadow-neon"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon
                icon={skill.icon}
                width="48"
                height="48"
                className="text-white dark:text-white"
                color={skill.color || 'white'} // fallback color for visibility
              />
              <p className="mt-2 text-sm font-medium text-dark-text-secondary">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
