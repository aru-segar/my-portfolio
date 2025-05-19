import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FiGithub } from 'react-icons/fi';
import { allProjects } from '../data/projects';

const categories = ["All", "Full Stack", "ML", "Frontend", "Java"];
const itemsPerPage = 6;

const ProjectCard = ({ project }) => (
  <motion.div
    className="glass-card overflow-hidden group"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <div
      className="h-48 bg-dark-bg-secondary bg-cover bg-center"
      style={{ backgroundImage: `url(${project.image})` }}
    />
    <div className="p-4">
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-dark-text-secondary text-sm mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs px-2 py-1 rounded-full bg-dark-bg-secondary bg-opacity-30 border border-dark-accent/20 text-dark-accent/90"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-4 text-sm">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-text-secondary hover:text-dark-accent flex items-center gap-1"
          >
            <FiGithub /> Code
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const filtered = selectedCategory === "All"
    ? allProjects
    : allProjects.filter(p => p.category === selectedCategory);

  const visibleProjects = filtered.slice(0, visibleCount);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <section id="projects" className="py-20 bg-dark-bg-primary relative">
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(45deg, #38bdf8 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
        <div className="absolute -right-20 top-40 w-80 h-80 rounded-full bg-teal-500 opacity-10 blur-3xl"></div>
        <div className="absolute -left-20 bottom-40 w-80 h-80 rounded-full bg-indigo-500 opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-dark-text-secondary max-w-2xl mx-auto">
            A selection of real-world projects built using modern technologies.
          </p>
        </motion.div>

        {/* Filter Buttons Styled Like Hero Contact */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(itemsPerPage);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300
                ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md'
                    : 'border border-dark-accent/40 text-dark-text-secondary hover:text-white hover:border-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filtered.length && (
          <div className="mt-12 text-center">
            <motion.button
              onClick={() => setVisibleCount(prev => prev + itemsPerPage)}
              className="btn-primary px-6 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
