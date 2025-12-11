document.addEventListener("DOMContentLoaded", () => {
  // Header nav links
  const navLinks = document.querySelectorAll('.ul-list li a');
  const sections = document.querySelectorAll('section');
  const backToTop = document.createElement('div');
  backToTop.id = "back-to-top";
  backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  document.body.appendChild(backToTop);

  const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .techniques-container, .contact-content');

  // Active nav link
  function removeActive() {
    navLinks.forEach(link => link.parentElement.classList.remove('active'));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      const header = document.querySelector('header');
      const offset = header ? header.offsetHeight : 0;

      window.scrollTo({
        top: targetSection.offsetTop - offset,
        behavior: 'smooth'
      });

      removeActive();
      link.parentElement.classList.add('active');
    });
  });

  // Scroll actions
  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 100;

    // Nav active on scroll
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        removeActive();
        const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
        if (activeLink) activeLink.parentElement.classList.add('active');
      }
    });

    // Back to top button
    backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';

    // Reveal elements
    revealElements.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 150;
      if (elementTop < windowHeight - revealPoint) el.classList.add('active-reveal');
    });
  });

  // Reveal initial setup
  revealElements.forEach(el => el.classList.add('reveal'));

  // Back to top styles
  Object.assign(backToTop.style, {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    background: '#474af0',
    color: '#fff',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: '1000',
    transition: 'transform 0.3s ease',
  });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
  backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

});

