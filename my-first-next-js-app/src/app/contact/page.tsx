"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(pageRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      // Animate contact cards
      const cards = pageRef.current?.querySelectorAll('.contact-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)", delay: 0.3 }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Address",
      content: "123 Tech Street, Innovation District, CA 90210",
      link: "#"
    },
    {
      icon: "📧",
      title: "Email",
      content: "hello@devandai.com",
      link: "mailto:hello@devandai.com"
    },
    {
      icon: "📞",
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: "💬",
      title: "Live Chat",
      content: "Available 24/7",
      link: "#"
    }
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Get in <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to start your next project? Let's discuss how we can help bring your ideas to life 
            with cutting-edge technology and innovative solutions.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="contact-card card bg-base-100/10 backdrop-blur-sm border border-base-300 hover:border-purple-500/50 transition-all duration-300">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="card-title text-white justify-center">{info.title}</h3>
                <p className="text-gray-300">{info.content}</p>
                <div className="card-actions justify-center">
                  <a href={info.link} className="btn btn-primary btn-sm">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form and Map */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-card card bg-base-100/10 backdrop-blur-sm border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input input-bordered bg-base-200/50 border-base-300 text-white"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input input-bordered bg-base-200/50 border-base-300 text-white"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Subject</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="select select-bordered bg-base-200/50 border-base-300 text-white"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="project-inquiry">Project Inquiry</option>
                    <option value="consultation">Consultation</option>
                    <option value="partnership">Partnership</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">Message</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="textarea textarea-bordered bg-base-200/50 border-base-300 text-white h-32"
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>

                <div className="form-control">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Map/Additional Info */}
          <div className="contact-card card bg-base-100/10 backdrop-blur-sm border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-white mb-6">Visit Our Office</h2>
              
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg h-64 mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-white">Interactive Map</p>
                  <p className="text-gray-300 text-sm">123 Tech Street, Innovation District</p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4">Office Hours</h3>
                <div className="space-y-2">
                  {[
                    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
                    { day: "Sunday", hours: "Closed" }
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between text-gray-300">
                      <span>{schedule.day}</span>
                      <span>{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: "🐦", label: "Twitter", link: "#" },
                    { icon: "💼", label: "LinkedIn", link: "#" },
                    { icon: "📘", label: "Facebook", link: "#" },
                    { icon: "📷", label: "Instagram", link: "#" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className="btn btn-circle btn-outline btn-sm text-white border-white/30 hover:bg-white/10"
                      title={social.label}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="card bg-base-100/10 backdrop-blur-sm border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-white text-center mb-8">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    question: "What technologies do you specialize in?",
                    answer: "We specialize in React, Node.js, Python, AI/ML, cloud solutions, and mobile development."
                  },
                  {
                    question: "How long does a typical project take?",
                    answer: "Project timelines vary from 2-12 weeks depending on complexity and requirements."
                  },
                  {
                    question: "Do you provide ongoing support?",
                    answer: "Yes, we offer 24/7 support and maintenance packages for all our projects."
                  },
                  {
                    question: "What is your pricing structure?",
                    answer: "We offer flexible pricing including fixed-price projects and hourly consulting rates."
                  }
                ].map((faq, index) => (
                  <div key={index} className="collapse collapse-arrow bg-base-200/50 border border-base-300">
                    <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
                    <div className="collapse-title text-white font-medium">
                      {faq.question}
                    </div>
                    <div className="collapse-content text-gray-300">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 