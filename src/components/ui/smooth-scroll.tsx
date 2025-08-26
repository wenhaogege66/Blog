"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    // Enable smooth scrolling behavior
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    // Enhanced smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.href.includes('#')) {
        const url = new URL(target.href);
        const hash = url.hash;
        
        if (hash && hash !== '#') {
          e.preventDefault();
          const targetElement = document.querySelector(hash);
          
          if (targetElement) {
            const headerHeight = 80; // Account for fixed header
            const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetTop = elementTop - headerHeight;
            
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
            
            // Update URL without triggering scroll
            history.pushState(null, '', hash);
          }
        }
      }
    };

    // Add event listener for all anchor links
    document.addEventListener('click', handleAnchorClick);
    
    // Scroll to hash on page load
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          const headerHeight = 80;
          const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetTop = elementTop - headerHeight;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 100);
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return null; // This component doesn't render anything
}