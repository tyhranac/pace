// hamrburger menu
const navPages = document.querySelector('#nav-pages');
const hamburgerMenu = document.querySelector('.hamburger-menu');

hamburgerMenu.addEventListener('click', () => {
    if (navPages.getAttribute('data-visible') == 'false') {
        navPages.setAttribute('data-visible', 'true');
        hamburgerMenu.setAttribute('aria-expanded', 'true');
    } else {
        navPages.setAttribute('data-visible', 'false');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
    }
});
