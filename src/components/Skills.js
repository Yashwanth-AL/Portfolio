import React from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Server, Database, Zap } from 'lucide-react';
import { skills } from '../data/mock';

const Skills = () => {
  const skillCategories = [
    {
      name: 'Programming',
      icon: Code,
      skills: skills.programming,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      name: 'Web Technologies',
      icon: Globe,
      skills: skills.webTech,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      name: 'Backend',
      icon: Server,
      skills: skills.backend,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      name: 'Databases',
      icon: Database,
      skills: skills.databases,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    },
    {
      name: 'Problem Solving',
      icon: Zap,
      skills: skills.problemSolving,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/30'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const skillVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-6 text-lg max-w-2xl mx-auto">
            Technologies and tools I work with to build amazing applications
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.name}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-3 ${category.bgColor} rounded-lg`}>
                    <IconComponent size={24} className="text-gray-700 dark:text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      variants={skillVariants}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        y: -2
                      }}
                      className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-md border border-gray-200 dark:border-gray-700 cursor-pointer group"
                    >
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Background */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${category.color} opacity-10 rounded-bl-full`}></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;