export function navbarDropdown() {
    const socialsBtn = document.querySelector('.navbar-desktop-socials');
    const dropdown = document.querySelector('.navbar-desktop-socials-dropdown');

    if (!socialsBtn || !dropdown) return;

    socialsBtn.addEventListener('mouseover', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    dropdown.addEventListener('mouseleave', function() {
        dropdown.classList.remove('show');
    });
}