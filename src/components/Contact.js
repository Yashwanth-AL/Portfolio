import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Code, Facebook, Instagram, Twitter } from 'lucide-react';
import { personalInfo } from '../data/mock';

const Contact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-6 text-lg max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just a friendly hello!
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Contact Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Methods */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Let&apos;s Connect
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  I&apos;m always interested in new opportunities and exciting projects. 
                  You can reach out to me through any of the following channels:
                </p>
              </div>

              <div className="space-y-6">
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200"
                >
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Mail size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                    <span className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                      {personalInfo.email}
                    </span>
                  </div>
                </motion.a>

                <motion.a
                  href={`tel:${personalInfo.phone}`}
                  whileHover={{ x: 10 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200"
                >
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Phone size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Phone</h4>
                    <span className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
                      {personalInfo.phone}
                    </span>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Right Side - Social Links */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Follow Me
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Connect with me on social media for updates and more:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: Github, href: personalInfo.socialLinks.github, name: "GitHub", handle: personalInfo.socialHandles.github, color: 'hover:text-gray-700' },
                  { icon: Linkedin, href: personalInfo.socialLinks.linkedin, name: "LinkedIn", handle: personalInfo.socialHandles.linkedin, color: 'hover:text-blue-600' },
                  { icon: Facebook, href: personalInfo.socialLinks.facebook, name: "Facebook", handle: personalInfo.socialHandles.facebook, color: 'hover:text-blue-500' },
                  { icon: Instagram, href: personalInfo.socialLinks.instagram, name: "Instagram", handle: personalInfo.socialHandles.instagram, color: 'hover:text-pink-600' },
                  { icon: Twitter, href: personalInfo.socialLinks.twitter, name: "Twitter", handle: personalInfo.socialHandles.twitter, color: 'hover:text-blue-400' },
                  { icon: Code, href: personalInfo.socialLinks.leetcode, name: "LeetCode", handle: personalInfo.socialHandles.leetcode, color: 'hover:text-orange-500' }
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, x: 5 }}
                      className={`flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg ${social.color} transition-all duration-200`}
                    >
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <IconComponent size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 dark:text-white">{social.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{social.handle}</span>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;