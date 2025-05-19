'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { FiSend } from 'react-icons/fi';
import emailjs from 'emailjs-com';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

const ContactInfo = ({ icon, title, value, href }) => (
  <div className="flex space-x-4 items-start">
    <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-dark-accent flex-shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-sm text-dark-text-secondary mb-1">{title}</h4>
      {href ? (
        <a 
          href={href} 
          className="text-dark-text-primary hover:text-dark-accent transition-colors duration-300"
        >
          {value}
        </a>
      ) : (
        <p className="text-dark-text-primary">{value}</p>
      )}
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch(() => {
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
  };

  return (
    <section id="contact" className="py-20 bg-dark-bg-primary relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-40 w-80 h-80 rounded-full bg-indigo-500 opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-dark-text-secondary max-w-2xl mx-auto">
            Have a project in mind or just want to chat about tech?
            I am always open to new opportunities and exciting ideas!
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="grid md:grid-cols-5 gap-8 md:gap-12"
          >
            <motion.div variants={itemVariants} className="md:col-span-2">
              <div className="glass-card p-6 md:p-8 h-full">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6 mb-8">
                  <ContactInfo icon={<HiOutlineMail />} title="Email" value="arunigagnanasegaran@gmail.com" href="mailto:arunigagnanasegaran@gmail.com" />
                  <ContactInfo icon={<HiOutlinePhone />} title="Phone" value="+94 76 602 2630" href="tel:+94766022630" />
                  <ContactInfo icon={<HiOutlineLocationMarker />} title="Location" value="Colombo, Sri Lanka" />
                </div>
                <div className="pt-6 border-t border-dark-border mt-auto">
                  <h4 className="text-sm font-medium mb-3">Availability</h4>
                  <p className="text-dark-text-secondary text-sm">
                    I am currently open to internships and part-time tech roles to grow alongside my academic journey.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="md:col-span-3">
              <div className="glass-card p-6 md:p-8">
                <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full bg-dark-bg-secondary/50 border border-dark-border rounded-lg px-4 py-2"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      className="w-full bg-dark-bg-secondary/50 border border-dark-border rounded-lg px-4 py-2"
                    />
                  </div>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="w-full bg-dark-bg-secondary/50 border border-dark-border rounded-lg px-4 py-2"
                  />

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={6}
                    required
                    className="w-full bg-dark-bg-secondary/50 border border-dark-border rounded-lg px-4 py-2 resize-none"
                  />

                  <div className="flex justify-between items-center pt-2">
                    {submitStatus === 'success' && (
                      <span className="text-green-400 text-sm">Message sent successfully!</span>
                    )}
                    {submitStatus === 'error' && (
                      <span className="text-red-400 text-sm">Something went wrong. Try again.</span>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <FiSend className="mr-2" /> Send Message
                        </span>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
