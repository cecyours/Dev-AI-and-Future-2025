"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function PortfolioPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(pageRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      // Animate project cards
      const cards = pageRef.current?.querySelectorAll('.project-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)", delay: 0.3 }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: 1,
      title: "AI-Powered E-commerce Platform",
      category: "ai",
      description: "Advanced e-commerce solution with AI-driven product recommendations and chatbot support.",
      image: "🛒",
      technologies: ["React", "Node.js", "TensorFlow", "MongoDB"],
      link: "#",
      featured: true
    },
    {
      id: 2,
      title: "Smart Healthcare Dashboard",
      category: "ai",
      description: "Real-time healthcare monitoring system with predictive analytics and patient insights.",
      image: "🏥",
      technologies: ["Vue.js", "Python", "Scikit-learn", "PostgreSQL"],
      link: "#",
      featured: true
    },
    {
      id: 3,
      title: "FinTech Mobile App",
      category: "mobile",
      description: "Cross-platform mobile application for digital banking and financial management.",
      image: "💰",
      technologies: ["React Native", "Firebase", "Stripe API", "Redux"],
      link: "#",
      featured: false
    },
    {
      id: 4,
      title: "Cloud-Based CRM System",
      category: "web",
      description: "Comprehensive customer relationship management platform with advanced analytics.",
      image: "📊",
      technologies: ["Next.js", "AWS", "GraphQL", "Redis"],
      link: "#",
      featured: false
    },
    {
      id: 5,
      title: "AI Content Generator",
      category: "ai",
      description: "Intelligent content creation tool powered by natural language processing.",
      image: "✍️",
      technologies: ["React", "OpenAI API", "Express.js", "MySQL"],
      link: "#",
      featured: false
    },
    {
      id: 6,
      title: "Real Estate Platform",
      category: "web",
      description: "Modern real estate marketplace with virtual tours and property management.",
      image: "🏠",
      technologies: ["Angular", "Node.js", "MongoDB", "Socket.io"],
      link: "#",
      featured: false
    }
  ];

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI & ML" },
    { id: "web", label: "Web Apps" },
    { id: "mobile", label: "Mobile Apps" }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our latest projects showcasing innovative solutions in AI, web development, 
            and mobile applications.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`btn ${
                activeFilter === filter.id 
                  ? 'btn-primary' 
                  : 'btn-outline text-white border-white/30 hover:bg-white/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Featured Projects */}
        {activeFilter === "all" && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {projects.filter(p => p.featured).map((project) => (
                <div key={project.id} className="project-card card bg-base-100/10 backdrop-blur-sm border border-base-300 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                  <div className="card-body">
                    <div className="text-6xl mb-4 text-center">{project.image}</div>
                    <h3 className="card-title text-white text-center">{project.title}</h3>
                    <p className="text-gray-300 text-center mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {project.technologies.map((tech, idx) => (
                        <div key={idx} className="badge badge-outline badge-sm">{tech}</div>
                      ))}
                    </div>

                    <div className="card-actions justify-center">
                      <button className="btn btn-primary">View Project</button>
                      <button className="btn btn-ghost text-white">Case Study</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card card bg-base-100/10 backdrop-blur-sm border border-base-300 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="card-body">
                <div className="text-4xl mb-4 text-center">{project.image}</div>
                <h3 className="card-title text-white text-center text-lg">{project.title}</h3>
                <p className="text-gray-300 text-center mb-4 text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <div key={idx} className="badge badge-outline badge-xs">{tech}</div>
                  ))}
                  {project.technologies.length > 3 && (
                    <div className="badge badge-outline badge-xs">+{project.technologies.length - 3} more</div>
                  )}
                </div>

                <div className="card-actions justify-center">
                  <button className="btn btn-primary btn-sm">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16">
          <div className="card bg-base-100/10 backdrop-blur-sm border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-white text-center mb-8">Project Statistics</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { number: "50+", label: "Projects Completed" },
                  { number: "95%", label: "Client Satisfaction" },
                  { number: "30+", label: "Technologies Used" },
                  { number: "24/7", label: "Support Available" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="card bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30">
            <div className="card-body">
              <h2 className="card-title text-white text-center mb-4">Have a Project in Mind?</h2>
              <p className="text-gray-300 mb-6">
                Let's collaborate to bring your ideas to life with cutting-edge technology.
              </p>
              <button className="btn btn-primary btn-lg">
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 