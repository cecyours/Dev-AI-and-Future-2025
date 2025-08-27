"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(pageRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      // Animate service cards
      const cards = pageRef.current?.querySelectorAll('.service-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)", delay: 0.3 }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: "🤖",
      title: "AI Development",
      description: "Custom AI solutions including machine learning models, chatbots, and intelligent automation systems.",
      features: ["Machine Learning", "Natural Language Processing", "Computer Vision", "Predictive Analytics"],
      price: "From $5,000"
    },
    {
      icon: "🌐",
      title: "Web Development",
      description: "Modern, responsive web applications built with cutting-edge technologies and best practices.",
      features: ["React/Next.js", "Node.js Backend", "Database Design", "API Integration"],
      price: "From $3,000"
    },
    {
      icon: "📱",
      title: "Mobile Development",
      description: "Cross-platform mobile applications that deliver exceptional user experiences.",
      features: ["React Native", "Flutter", "Native iOS/Android", "App Store Deployment"],
      price: "From $4,000"
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and DevOps solutions for modern applications.",
      features: ["AWS/Azure/GCP", "Docker & Kubernetes", "CI/CD Pipelines", "Monitoring & Security"],
      price: "From $2,500"
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Beautiful, intuitive user interfaces designed with user experience in mind.",
      features: ["Wireframing", "Prototyping", "User Research", "Design Systems"],
      price: "From $2,000"
    },
    {
      icon: "🔧",
      title: "Consulting",
      description: "Expert guidance on technology strategy, architecture, and digital transformation.",
      features: ["Technical Architecture", "Technology Selection", "Team Training", "Code Reviews"],
      price: "From $150/hr"
    }
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive development and AI solutions tailored to your business needs. 
            From concept to deployment, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="service-card card bg-base-100/10 backdrop-blur-sm border border-base-300 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="card-body">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="card-title text-white">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-purple-400 font-semibold mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-300 text-sm flex items-center">
                        <span className="text-green-400 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-actions justify-between items-center">
                  <div className="badge badge-primary badge-lg">{service.price}</div>
                  <button className="btn btn-primary btn-sm">Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="card bg-base-100/10 backdrop-blur-sm border border-base-300 mb-16">
          <div className="card-body">
            <h2 className="card-title text-white text-center mb-8">Our Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Discovery", desc: "Understanding your needs and requirements" },
                { step: "02", title: "Planning", desc: "Creating detailed project roadmap and architecture" },
                { step: "03", title: "Development", desc: "Building your solution with best practices" },
                { step: "04", title: "Deployment", desc: "Launching and maintaining your application" }
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{process.title}</h3>
                  <p className="text-gray-300 text-sm">{process.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="card bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30">
            <div className="card-body">
              <h2 className="card-title text-white text-center mb-4">Ready to Get Started?</h2>
              <p className="text-gray-300 mb-6">
                Let's discuss your project and create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary btn-lg">
                  Start Your Project
                </button>
                <button className="btn btn-outline btn-lg text-white border-white/30 hover:bg-white/10">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 