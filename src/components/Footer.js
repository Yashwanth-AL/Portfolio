import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Code } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Yashwanth A L
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Passionate Computer Science Engineer focused on creating impactful 
                solutions through innovative technology and clean code.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: Github, href: personalInfo.socialLinks.github, label: 'GitHub' },
                  { icon: Linkedin, href: personalInfo.socialLinks.linkedin, label: 'LinkedIn' },
                  { icon: Code, href: personalInfo.socialLinks.leetcode, label: 'LeetCode' }
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -2 }}
                      className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <IconComponent size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                {['Home', 'Education', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-white">Contact</h3>
              <p className="text-gray-300">
                Whether you’re looking to collaborate on an exciting project, share ideas and insights, or simply stop by with a friendly hello, I’d be more than happy to hear from you.
              </p>
              <div className="text-gray-300">
                <p className="mb-2">{personalInfo.email}</p>
                <p>{personalInfo.phone}</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="py-8 border-t border-gray-800 text-center relative">
          {/* Copyright Text */}
          <p className="text-gray-400">
            © {new Date().getFullYear()} Yashwanth A L
          </p>

          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 bottom-6 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;