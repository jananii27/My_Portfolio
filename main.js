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

  // Typing animation
  const typingElement = document.querySelector('.info-home h3');
  if (typingElement) {
    const words = ["Frontend Developer", "UI/UX Designer", "Web Enthusiast", "React Developer"];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];
      let displayedText = currentWord.substring(0, charIndex);
      typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, Math.random() * 150 + 50);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, Math.random() * 75 + 50);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 1000);
      }
    }
    type();
  }

  // Loading screen
  const loadingScreen = document.getElementById("loading-screen");
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");

  function showElement(element, delay=0){
    if (!element) return;
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);
  showElement(mainIcon, 800);
  subIcons.forEach((icon, idx) => showElement(icon, 1600 + idx*400));
  showElement(designerText, 2800);

  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      setTimeout(() => loadingScreen.style.display='none', 500);
    }
    if (mainPage) mainPage.classList.add("visible");
  }, 4000);

});
