"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Youtube,
  ExternalLink,
  Code,
  Smartphone,
  Monitor,
  Database,
} from "lucide-react";
import StackedLogo from "@/components/StackedLogo";

export default function Portfolio() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const skills = [
    "TypeScript",
    "JavaScript",
    "Node.js",
    "React",
    "React Native",
    "Rust",
    "Elixir",
    "Python",
    "Elm",
    "Functional Programming",
  ];

  const platforms = [
    {
      icon: Monitor,
      title: "Web Applications",
      description: "Modern web apps with React, TypeScript, and Node.js",
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description: "iOS and Android apps with React Native",
    },
    {
      icon: Code,
      title: "Desktop Applications",
      description: "Cross-platform desktop solutions",
    },
    {
      icon: Database,
      title: "ETL Pipelines",
      description: "Data processing and transformation systems",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-rose-900/20"
        />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <StackedLogo animated={true} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Tom McGurl
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-rose-300 mb-4"
            >
              Director of Engineering at electric.ai
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto"
            >
              15 years of crafting exceptional software experiences across web,
              mobile, desktop, and data platforms
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                size="lg"
                className="bg-rose-500 hover:bg-rose-600 text-white"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Get In Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900"
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-rose-400/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Me
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Passionate about functional programming and building scalable
              solutions that make a difference. I lead engineering teams and
              architect systems that power the future of technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-700/50 border-slate-600 hover:border-rose-400/50 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <platform.icon className="w-12 h-12 text-rose-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {platform.title}
                    </h3>
                    <p className="text-slate-300">{platform.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Technical Expertise
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              A diverse toolkit honed over 15 years of software development,
              with a special love for functional programming paradigms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Badge
                  variant="outline"
                  className="text-lg py-2 px-4 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900 transition-all duration-300"
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured Work
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Explore my software development journey through educational
              content and open-source contributions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-700/50 border-slate-600 hover:border-rose-400/50 transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <Youtube className="w-12 h-12 text-rose-400 mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Software Development Videos
                  </h3>
                  <p className="text-slate-300 mb-6">
                    Educational content covering modern development practices,
                    functional programming concepts, and industry insights.
                  </p>
                  <Button
                    variant="outline"
                    className="border-rose-400 text-rose-400 hover:bg-rose-400 hover:text-white"
                    onClick={() =>
                      window.open("https://www.youtube.com/tommcgurl", "_blank")
                    }
                  >
                    Watch Videos <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-700/50 border-slate-600 hover:border-teal-400/50 transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <Github className="w-12 h-12 text-teal-400 mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Open Source Projects
                  </h3>
                  <p className="text-slate-300 mb-6">
                    Explore my contributions to the developer community through
                    open-source projects and code repositories.
                  </p>
                  <Button
                    variant="outline"
                    className="border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-slate-900"
                    onClick={() =>
                      window.open("https://github.com/tommcgurl", "_blank")
                    }
                  >
                    View Code <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Connect
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Interested in collaborating or discussing software engineering?
              I'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-8"
          >
            <motion.a
              href="https://www.linkedin.com/in/thomas-mcgurl-ba767b6b/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-6 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-blue-400/50 transition-all duration-300"
            >
              <Linkedin className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-white font-medium">LinkedIn</span>
            </motion.a>

            <motion.a
              href="https://github.com/tommcgurl"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-6 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-teal-400/50 transition-all duration-300"
            >
              <Github className="w-8 h-8 text-teal-400 mb-2" />
              <span className="text-white font-medium">GitHub</span>
            </motion.a>

            <motion.a
              href="https://www.youtube.com/tommcgurl"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center p-6 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-rose-400/50 transition-all duration-300"
            >
              <Youtube className="w-8 h-8 text-rose-400 mb-2" />
              <span className="text-white font-medium">YouTube</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-slate-700">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400">
            © 2025 Tom McGurl. Crafted with passion for functional programming
            and clean code.
          </p>
        </div>
      </footer>
    </div>
  );
}
