import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Code, Mail, Phone, ArrowUp } from 'lucide-react';
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
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="text-xl font-semibold text-white">Quick Links</h4>
              <nav className="space-y-2">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'Education', href: '#education' },
                  { name: 'Experience', href: '#experience' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Contact', href: '#contact' }
                ].map((link) => (
                  <motion.button
                    key={link.name}
                    onClick={() => {
                      const element = document.querySelector(link.href);
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    whileHover={{ x: 5 }}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </nav>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="text-xl font-semibold text-white">Get In Touch</h4>
              <div className="space-y-3">
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  <Mail size={18} />
                  <span>{personalInfo.email}</span>
                </motion.a>
                
                <motion.a
                  href={`tel:${personalInfo.phone}`}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors duration-200"
                >
                  <Phone size={18} />
                  <span>{personalInfo.phone}</span>
                </motion.a>
              </div>

              <div className="pt-4">
                <p className="text-gray-400 text-sm mb-3">Available for freelance work</p>
                <motion.button
                  onClick={() => {
                    const element = document.querySelector('#contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 text-gray-400"
            >
              <span>© {new Date().getFullYear()} Yashwanth A L. Built with</span>
              <Heart size={16} className="text-red-500" />
              <span>and React</span>
            </motion.div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 group"
              aria-label="Back to top"
            >
              <ArrowUp size={20} className="group-hover:text-blue-400 transition-colors duration-200" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;