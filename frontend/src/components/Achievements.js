import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, Building, X, ExternalLink } from 'lucide-react';
import { achievements } from '../data/mock';

const Achievements = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

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
    hidden: { scale: 0.8, opacity: 0 },
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
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Achievements
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-6 text-lg max-w-2xl mx-auto">
            Certifications and achievements that showcase my learning journey
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 group cursor-pointer"
              onClick={() => setSelectedCertificate(achievement)}
            >
              {/* Certificate Image */}
              <div className="relative overflow-hidden">
                <img
                  src={achievement.certificate}
                  alt={achievement.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Overlay Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg"
                  >
                    <ExternalLink size={20} className="text-gray-700 dark:text-gray-300" />
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Award size={20} className="text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {achievement.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {achievement.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <Building size={14} />
                    <span>{achievement.organization}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                    <Calendar size={14} />
                    <span>{achievement.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certificate Modal */}
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl max-h-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedCertificate.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedCertificate.organization} • {selectedCertificate.date}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X size={24} className="text-gray-500 dark:text-gray-400" />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <img
                  src={selectedCertificate.certificate}
                  alt={selectedCertificate.title}
                  className="w-full max-h-96 object-contain rounded-lg"
                />
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  {selectedCertificate.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Achievements;