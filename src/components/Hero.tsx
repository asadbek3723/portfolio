import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Download, Mail, ArrowRight } from "lucide-react";

export default function Hero() {
  const { t } = useTranslation();

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      itemScope
      itemType="https://schema.org/Person"
      className="relative min-h-screen flex items-center justify-center pt-[150px] overflow-hidden"
    >
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-purple-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 -z-20" />

      {/* Floating Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] animate-pulse -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000 -z-10" />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-100 dark:bg-blue-900/30 rounded-full shadow-sm"
            >
              🚀 {t("Web Developer") || "Professional Full Stack Developer"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              itemProp="name"
              className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 leading-tight tracking-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">
                {t("hero.name")}
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              itemProp="jobTitle"
              className="text-2xl md:text-4xl font-bold text-gray-700 dark:text-gray-300 mb-8"
            >
              {t("hero.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              itemProp="description"
              className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-xl leading-relaxed mx-auto lg:mx-0 font-medium"
            >
              {t("hero.bio")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-700 transition-all duration-300"
              >
                <Mail className="h-5 w-5 mr-2" />
                {t("hero.contactMe")}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProjects}
                className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-bold rounded-2xl hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300"
              >
                {t("hero.viewProjects")}
                <ArrowRight className="h-5 w-5 ml-2" />
              </motion.button>
            </motion.div>

            {/* CV Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-10"
            >
              <motion.a
                whileHover={{ x: 5 }}
                href="/cv.pdf"
                download
                className="inline-flex items-center px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 text-sm font-bold tracking-wide"
              >
                <Download className="h-5 w-5 mr-2" />
                {t("hero.downloadCV")}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image with 3D floating effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 1,
              delay: 0.4,
              type: "spring",
              stiffness: 100
            }}
            className="flex justify-center lg:justify-end relative"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 2, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative overflow-hidden lg:overflow-visible p-4"
            >
              {/* Outer Decorative Rings */}
              <div className="absolute -inset-8 border border-blue-500/30 dark:border-blue-400/20 rounded-full animate-spin-slow -z-10" />
              <div className="absolute -inset-16 border border-purple-500/20 dark:border-purple-400/10 rounded-full animate-reverse-spin-slow -z-10" />

              <div className="w-[320px] h-[320px] lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-3xl flex items-center justify-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden relative group">
                {/* Overlay for depth */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                <img
                  loading="lazy"
                  itemProp="image"
                  src="/photos/asadbek-jumanazarov-portfolio-photos.png"
                  alt="Asadbek Jumanazarov Azamat o'g'li"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 font-bold">✓</div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Specialist</p>
                    <p className="text-sm font-black text-gray-900 dark:text-white underline decoration-green-500 decoration-2">Full Stack</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
