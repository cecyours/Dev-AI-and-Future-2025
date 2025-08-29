"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
            if (document.body.contains(trail)) {
              document.body.removeChild(trail);
            }
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
          if (cursorRef.current) {
            cursorRef.current.classList.remove('cursor-click');
          }
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

    const handleMagneticHover = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add('cursor-magnetic');
      }
    };

    const handleMagneticLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove('cursor-magnetic');
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', handleCursorMove);
    
    // Function to add event listeners to elements
    const addEventListeners = () => {
      // Hover effects for interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select, [role="button"]');
      interactiveElements.forEach(el => {
        if (!el.hasAttribute('data-cursor-initialized')) {
          el.addEventListener('mouseenter', handleCursorHover);
          el.addEventListener('mouseleave', handleCursorLeave);
          el.setAttribute('data-cursor-initialized', 'true');
        }
      });

      // Text hover effects
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
      textElements.forEach(el => {
        if (!el.hasAttribute('data-cursor-text-initialized')) {
          el.addEventListener('mouseenter', handleTextHover);
          el.addEventListener('mouseleave', handleTextLeave);
          el.setAttribute('data-cursor-text-initialized', 'true');
        }
      });

      // Magnetic hover effects for cards and special elements
      const magneticElements = document.querySelectorAll('.card, .animate-card, .contact-card');
      magneticElements.forEach(el => {
        if (!el.hasAttribute('data-cursor-magnetic-initialized')) {
          el.addEventListener('mouseenter', handleMagneticHover);
          el.addEventListener('mouseleave', handleMagneticLeave);
          el.setAttribute('data-cursor-magnetic-initialized', 'true');
        }
      });
    };

    // Initial setup
    addEventListeners();

    // Set up a mutation observer to handle dynamically added elements
    const observer = new MutationObserver(addEventListeners);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Click effect
    document.addEventListener('click', handleCursorClick);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleCursorMove);
      document.removeEventListener('click', handleCursorClick);
      observer.disconnect();
      
      // Remove event listeners from all elements
      const allElements = document.querySelectorAll('[data-cursor-initialized], [data-cursor-text-initialized], [data-cursor-magnetic-initialized]');
      allElements.forEach(el => {
        el.removeEventListener('mouseenter', handleCursorHover);
        el.removeEventListener('mouseleave', handleCursorLeave);
        el.removeEventListener('mouseenter', handleTextHover);
        el.removeEventListener('mouseleave', handleTextLeave);
        el.removeEventListener('mouseenter', handleMagneticHover);
        el.removeEventListener('mouseleave', handleMagneticLeave);
        el.removeAttribute('data-cursor-initialized');
        el.removeAttribute('data-cursor-text-initialized');
        el.removeAttribute('data-cursor-magnetic-initialized');
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorDotRef} className="cursor-dot" />
    </>
  );
} 