// export const nextUtility = {
//   stickyNav() {
//     const header = document.getElementById("header-sticky");

//     // Add an event listener to the window's scroll event
//     window.addEventListener("scroll", function () {
//       // Check the scroll position
//       if (window.scrollY > 250) {
//         // If the scroll position is greater than 250, add the "sticky" class
//         header.classList.add("sticky");
//       } else {
//         // Otherwise, remove the "sticky" class
//         header.classList.remove("sticky");
//       }
//     });
//   },
//   scrollAnimation() {
//     if (typeof window !== "undefined") {
//       window.WOW = require("wowjs");
//     }
//     new WOW.WOW().init();
//   },
// };

export const nextUtility = {
  stickyNav() {
    if (typeof window === 'undefined') return; // Skip during SSR
    
    const header = document.getElementById('header-sticky');
    if (!header) return;

    window.addEventListener('scroll', () => {
      header.classList.toggle('sticky', window.scrollY > 250);
    });
  },

  async scrollAnimation() {
    if (typeof window === 'undefined') return; // Skip during SSR
  
    try {
      const { default: WOW } = await import('wowjs');
      new WOW().init();
    } catch (error) {
      console.error('Failed to load WOW.js:', error);
    }
  },

  preloader() {
    if (typeof window === 'undefined') return;

    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    // Hide preloader when page loads
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Remove from DOM after animation completes
        setTimeout(() => {
          preloader.remove();
        }, 500);
      }, 500);
    });
  }  
};