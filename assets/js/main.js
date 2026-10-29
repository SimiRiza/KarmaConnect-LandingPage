const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu(returnFocus = false) {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  if (returnFocus) menu.focus();
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu(true); });
document.addEventListener('click', event => { if (!event.target.closest('header')) closeMenu(); });
window.matchMedia('(min-width: 861px)').addEventListener('change', () => closeMenu());
const slider = document.querySelector('#comparison-slider');
function updateComparison() {
  slider.parentElement.style.setProperty('--split', `${slider.value}%`);
  slider.setAttribute('aria-valuetext', `${slider.value}% after cleanup`);
}
slider.addEventListener('input', updateComparison);
updateComparison();
const messages = {
  volunteer: 'For volunteers and students: the planned pilot is an opportunity to contribute time, skills or resources to local causes and help test impact tracking. Participation details will be announced when available.',
  ngo: 'For grassroots NGOs: the planned pilot will explore adopting local needs, coordinating volunteers and sharing project evidence. NGO participation details will be announced when available.',
  csr: 'For CSR companies: the planned pilot will explore local project funding, transparent progress tracking and structured impact reports. Partnership details will be announced when available. Payments are currently simulated.'
};
document.querySelectorAll('[data-role]').forEach(link => {
  link.addEventListener('click', () => {
    const message = document.querySelector('#role-message');
    message.textContent = messages[link.dataset.role];
    message.focus({preventScroll: true});
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('pending');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08});
  document.querySelectorAll('.reveal').forEach(element => {
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add('pending');
      observer.observe(element);
    }
  });
}
