"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mouse interaction for bubbles
    const handleMouseMove = (e: MouseEvent) => {
      const bubbles = document.querySelectorAll('.bubble, .bubble-small');
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      bubbles.forEach((bubble) => {
        const rect = bubble.getBoundingClientRect();
        const bubbleX = rect.left + rect.width / 2;
        const bubbleY = rect.top + rect.height / 2;
        
        const deltaX = mouseX - bubbleX;
        const deltaY = mouseY - bubbleY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          gsap.to(bubble, {
            x: deltaX * force * 0.1,
            y: deltaY * force * 0.1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Custom cursor animation
    const handleCursorMove = (e: MouseEvent) => {
      if (cursorRef.current && cursorDotRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 10,
          y: e.clientY - 10,
          duration: 0.1,
          ease: "power2.out"
        });
        
        gsap.to(cursorDotRef.current, {
          x: e.clientX - 2,
          y: e.clientY - 2,
          duration: 0.15,
          ease: "power2.out"
        });

        // Create cursor trail effect
        if (Math.random() > 0.7) { // 30% chance to create trail
          const trail = document.createElement('div');
          trail.className = 'cursor-trail';
          trail.style.left = e.clientX - 3 + 'px';
          trail.style.top = e.clientY - 3 + 'px';
          document.body.appendChild(trail);
          
          setTimeout(() => {
            document.body.removeChild(trail);
          }, 600);
        }
      }
    };

    const handleCursorHover = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('cursor-hover');
      }
    };

    const handleCursorLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('cursor-hover');
      }
    };

    const handleCursorClick = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('cursor-click');
        setTimeout(() => {
          cursorRef.current?.classList.remove('cursor-click');
        }, 150);
      }
    };

    const handleTextHover = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('cursor-text');
      }
    };

    const handleTextLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('cursor-text');
      }
    };

    window.addEventListener('mousemove', handleCursorMove);
    window.addEventListener('click', handleCursorClick);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .feature-card, .timeline-item');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleCursorHover);
      element.addEventListener('mouseleave', handleCursorLeave);
    });

    // Add text hover effects
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    textElements.forEach(element => {
      element.addEventListener('mouseenter', handleTextHover);
      element.addEventListener('mouseleave', handleTextLeave);
    });

    const ctx = gsap.context(() => {
      // Hero section entrance animation
      const heroTl = gsap.timeline();
      heroTl
        .fromTo(titleRef.current, 
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        )
        .fromTo(subtitleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(ctaRef.current,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.3"
        );

      // Text typing animation for title
      gsap.to(titleRef.current, {
        duration: 2,
        text: "Dev & AI: Shaping the Future",
        ease: "none",
        delay: 0.5
      });

      // Scroll-triggered animations for features
      if (featureCardsRef.current?.children) {
        gsap.fromTo(featureCardsRef.current.children,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Stats counter animation
      const stats = statsRef.current?.querySelectorAll('.stat-number');
      stats?.forEach((stat, index) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        gsap.fromTo(stat,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            onUpdate: function() {
              if (stat.textContent) {
                stat.textContent = Math.ceil(Number(stat.textContent)).toString();
              }
            }
          }
        );
      });

      // Timeline animation
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
      if (timelineItems) {
        gsap.fromTo(timelineItems,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Parallax effect for hero background
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    });

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleCursorMove);
      window.removeEventListener('click', handleCursorClick);
      
      // Remove event listeners from elements
      const interactiveElements = document.querySelectorAll('button, a, .feature-card, .timeline-item');
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleCursorHover);
        element.removeEventListener('mouseleave', handleCursorLeave);
      });
      
      const textElements = document.querySelectorAll('h1, h2, h3, p');
      textElements.forEach(element => {
        element.removeEventListener('mouseenter', handleTextHover);
        element.removeEventListener('mouseleave', handleTextLeave);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={cursorDotRef} className="cursor-dot"></div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background with bubbles */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="bubble absolute rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-sm border border-white/10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${20 + Math.random() * 60}px`,
                  height: `${20 + Math.random() * 60}px`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${15 + Math.random() * 20}s`
                }}
              />
            ))}
            {[...Array(15)].map((_, i) => (
              <div
                key={`small-${i}`}
                className="bubble-small absolute rounded-full bg-white/10 backdrop-blur-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${8 + Math.random() * 12}px`,
                  height: `${8 + Math.random() * 12}px`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${10 + Math.random() * 15}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Dev & AI: Shaping the Future
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            Exploring the intersection of development, artificial intelligence, and the future of technology. 
            Discover insights, tutorials, and discussions on modern web development, AI tools, and emerging tech trends.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="cursor-pointer px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Explore AI Tools
            </button>
            <button className="cursor-pointer px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4 bg-slate-800/50 relative overflow-hidden">
        {/* Background bubbles for features */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={`feature-bubble-${i}`}
              className="bubble-small absolute rounded-full bg-purple-400/10 backdrop-blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${15 + Math.random() * 25}px`,
                height: `${15 + Math.random() * 25}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${12 + Math.random() * 8}s`
              }}
            />
          ))}
        </div>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Why Dev & AI Matters
          </h2>
          
          <div ref={featureCardsRef} className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Accelerated Development",
                description: "AI-powered tools streamline coding workflows, reducing development time and increasing productivity."
              },
              {
                icon: "🧠",
                title: "Intelligent Solutions",
                description: "Machine learning algorithms provide smarter, more efficient solutions to complex problems."
              },
              {
                icon: "🔮",
                title: "Future-Ready Skills",
                description: "Stay ahead of the curve by mastering the technologies that will define the next decade."
              }
                         ].map((feature, index) => (
               <div 
                 key={index}
                 className="feature-card bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-8 rounded-xl border border-slate-600/30 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105"
               >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 relative overflow-hidden">
        {/* Background bubbles for stats */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={`stats-bubble-${i}`}
              className="bubble absolute rounded-full bg-blue-400/15 backdrop-blur-sm border border-blue-300/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${25 + Math.random() * 35}px`,
                height: `${25 + Math.random() * 35}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${18 + Math.random() * 12}s`
              }}
            />
          ))}
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-16">Impact in Numbers</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: 95, label: "Faster Development" },
              { number: 300, label: "AI Tools Available" },
              { number: 50, label: "Success Stories" },
              { number: 1000, label: "Developers Empowered" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <span className="stat-number" data-target={stat.number}>0</span>%
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">The Evolution of Dev & AI</h2>
          
          <div className="space-y-12">
            {[
              {
                year: "2020",
                title: "AI Code Completion",
                description: "GitHub Copilot and similar tools revolutionize code writing with intelligent suggestions."
              },
              {
                year: "2022",
                title: "No-Code AI Platforms",
                description: "Democratization of AI development with visual programming interfaces."
              },
              {
                year: "2024",
                title: "AI-First Development",
                description: "Complete development workflows powered by artificial intelligence."
              },
              {
                year: "2025+",
                title: "The Future",
                description: "Seamless integration of human creativity and AI capabilities."
              }
            ].map((item, index) => (
              <div key={index} className="timeline-item flex items-center space-x-8">
                <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {item.year}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Shape the Future?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who are already leveraging AI to build the next generation of applications.
          </p>
          <button className="cursor-pointer px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started Today
          </button>
        </div>
      </section>

    </div>
  );
}
