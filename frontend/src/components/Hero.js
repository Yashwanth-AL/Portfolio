import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Code, Mail, Phone } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const leftSlideVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  const rightSlideVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/20 dark:bg-blue-700/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-20"
        >
          {/* Left Side - Introduction Text */}
          <motion.div
            variants={leftSlideVariants}
            className="space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Name and Title */}
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <span className="block text-gray-800 dark:text-white">
                  Hi, I'm
                </span>
                <span className="block bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent">
                  {personalInfo.name}
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-xl lg:max-w-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                {personalInfo.tagline}
              </motion.p>
            </div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-8"
            >
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Phone size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-medium">{personalInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Mail size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-medium">{personalInfo.email}</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start space-x-6"
            >
              {[
                { icon: Github, href: personalInfo.socialLinks.github, color: 'hover:bg-gray-700 hover:text-white', name: 'GitHub' },
                { icon: Linkedin, href: personalInfo.socialLinks.linkedin, color: 'hover:bg-blue-600 hover:text-white', name: 'LinkedIn' },
                { icon: Code, href: personalInfo.socialLinks.leetcode, color: 'hover:bg-orange-500 hover:text-white', name: 'LeetCode' }
              ].map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 ${social.color}`}
                    aria-label={social.name}
                  >
                    <IconComponent size={24} />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* CTA Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Let's build something amazing together!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Photo */}
          <motion.div
            variants={rightSlideVariants}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative"
            >
              {/* Profile Image Container */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800"
                >
                  <img
                    src={personalInfo.profileImage}
                    alt="Yashwanth A L"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Decorative Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 rounded-full border-2 border-dashed border-blue-400/50 dark:border-blue-500/30"
                />

                {/* Glowing Background */}
                <div className="absolute -inset-8 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-full blur-2xl -z-10"></div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg"
              >
                <Code size={24} className="text-white" />
              </motion.div>

              <motion.div
                animate={{ 
                  rotate: [0, -15, 15, 0],
                  y: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-2 -left-6 w-10 h-10 bg-gradient-to-r from-blue-300 to-blue-400 rounded-lg flex items-center justify-center shadow-lg"
              >
                <Github size={20} className="text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-blue-400/60 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-3 bg-blue-400/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;