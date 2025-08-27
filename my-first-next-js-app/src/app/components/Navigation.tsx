"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/about", label: "About", icon: "ℹ️" },
    { href: "/services", label: "Services", icon: "🛠️" },
    { href: "/portfolio", label: "Portfolio", icon: "📁" },
    { href: "/contact", label: "Contact", icon: "📧" }
  ];

  return (
    <div className={`navbar fixed top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-base-100/90 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-2 ${
                    pathname === item.href ? 'active' : ''
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-2">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
          </div>
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dev & AI
          </Link>
        </div>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`btn btn-ghost btn-sm ${
                  pathname === item.href 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'hover:bg-base-200'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="navbar-end">
        <Link href="/contact" className="btn btn-primary btn-sm">
          Get Started
        </Link>
      </div>
    </div>
  );
} 