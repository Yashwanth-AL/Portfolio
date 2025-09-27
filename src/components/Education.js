import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';
import { education } from '../data/mock';

const Education = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.6
      }
    }
  };

  return (
    <section id="education" className="py-20 bg-gradient-to-br from-blue-50/30 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-4">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            My academic journey and achievements.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {education.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl border border-blue-100/50 dark:border-blue-900/30 p-8 transition-all duration-300 relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 dark:from-blue-400/5 dark:to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
                    {/* Left Section - Main Info */}
                    <div className="flex items-center space-x-8">
                      <div className="flex-shrink-0">
                        <div className="w-28 h-28 relative rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-blue-100 dark:border-blue-900 group-hover:border-blue-300 dark:group-hover:border-blue-700">
                          <img 
                            src={item.logo} 
                            alt={item.institution}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {item.degree}
                        </h3>
                        <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold mb-3">
                          <MapPin size={16} />
                          <span>{item.institution}</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-3 sm:space-y-0">
                          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                            <Calendar size={16} className="text-blue-500" />
                            <span className="font-medium">{item.duration}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Award size={16} className="text-yellow-500" />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                              {item.grade}
                            </span>
                            {item.status === 'ongoing' && (
                              <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs rounded-full font-medium shadow-lg"
                              >
                                Ongoing
                              </motion.span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Visual Elements - Only visible on large screens */}
                    <div className="hidden lg:block flex-shrink-0 lg:ml-6">
                      <div className="flex flex-col items-center lg:items-end space-y-3">
                        <motion.div 
                          whileHover={{ rotate: 5, scale: 1.05 }}
                          className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-200 dark:border-blue-700"
                        >
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                            {index + 1}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;