document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.getElementById('mobile-nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    mobileNav.style.display = 'none';

    toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        if (mobileNav.style.display === 'none') {
            mobileNav.style.display = 'block';
        } else {
            mobileNav.style.display = 'none';
        }
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileNav.style.display === 'block' && !mobileNav.contains(e.target) && e.target !== toggle) {
            mobileNav.style.display = 'none';
        }
    });
});
