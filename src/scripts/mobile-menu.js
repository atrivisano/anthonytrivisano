// src/scripts/mobile-menu.js

// Function to initialize the mobile menu
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (!mobileMenuToggle || !mobileMenu) {
        console.error('Mobile menu elements not found');
        return;
    }

    // Function to open the mobile menu
    const openMenu = () => {
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        if (menuIcon && closeIcon) {
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }
    };

    // Function to close the mobile menu
    const closeMenu = () => {
        document.body.style.overflow = ''; // Re-enable scrolling
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        if (menuIcon && closeIcon) {
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    };

    // Toggle menu when hamburger icon is clicked
    mobileMenuToggle.addEventListener('click', openMenu);

    // Close menu when X icon is clicked
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
    }

    // Close menu when clicking a navigation link
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when ESC key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
            closeMenu();
        }
    });
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Astro View Transitions support - reinitialize when page changes
document.addEventListener('astro:page-load', initMobileMenu);