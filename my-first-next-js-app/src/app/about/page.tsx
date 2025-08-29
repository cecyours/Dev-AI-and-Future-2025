"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(pageRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      // Animate cards
      const cards = pageRef.current?.querySelectorAll('.animate-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out", delay: 0.3 }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Dev & AI</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We&apos;re passionate about the intersection of development and artificial intelligence, 
            creating innovative solutions that shape the future of technology.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="animate-card card bg-base-100/10 backdrop-blur-sm border border-base-300">
            <div className="card-body">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="card-title text-white">Our Mission</h3>
              <p className="text-gray-300">
                To democratize AI technology and empower developers with cutting-edge tools 
                that accelerate innovation and drive digital transformation.
              </p>
            </div>
          </div>

          <div className="animate-card card bg-base-100/10 backdrop-blur-sm border border-base-300">
            <div className="card-body">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="card-title text-white">Our Vision</h3>
              <p className="text-gray-300">
                A world where AI and human creativity work seamlessly together to solve 
                complex problems and create meaningful experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "AI Research Lead",
                avatar: "👨‍💻",
                description: "Expert in machine learning and neural networks"
              },
              {
                name: "Sarah Kim",
                role: "Full-Stack Developer",
                avatar: "👩‍💻",
                description: "Specialist in React, Node.js, and cloud architecture"
              },
              {
                name: "Marcus Rodriguez",
                role: "UX/UI Designer",
                avatar: "🎨",
                description: "Creating beautiful, intuitive user experiences"
              }
            ].map((member, index) => (
              <div key={index} className="animate-card card bg-base-100/10 backdrop-blur-sm border border-base-300 hover:border-purple-500/50 transition-all duration-300">
                <div className="card-body text-center">
                  <div className="avatar placeholder mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-20 h-20 text-2xl">
                      <span>{member.avatar}</span>
                    </div>
                  </div>
                  <h3 className="card-title text-white justify-center">{member.name}</h3>
                  <p className="text-purple-400 font-semibold">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { number: "5+", label: "Years Experience" },
            { number: "100+", label: "Projects Completed" },
            { number: "50+", label: "Happy Clients" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <div key={index} className="animate-card text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="card bg-base-100/10 backdrop-blur-sm border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-white text-center mb-8">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "💡", title: "Innovation", desc: "Pushing boundaries with cutting-edge technology" },
                { icon: "🤝", title: "Collaboration", desc: "Working together to achieve extraordinary results" },
                { icon: "🎯", title: "Excellence", desc: "Delivering the highest quality in everything we do" }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-3">{value.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-300 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 