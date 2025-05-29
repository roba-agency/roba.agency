document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.getElementById('mobile-nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    let isOpen = false;

    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        isOpen = !isOpen;
        if (isOpen) {
            mobileNav.classList.add('active');
        } else {
            mobileNav.classList.remove('active');
        }
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (isOpen && !mobileNav.contains(e.target) && e.target !== toggle) {
            mobileNav.classList.remove('active');
            isOpen = false;
        }
    });
});
