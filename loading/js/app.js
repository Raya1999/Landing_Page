// Helper function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Build the navigation menu dynamically
  function buildNavigationMenu() {
    const sections = document.querySelectorAll('section');
  
    const navbarList = document.getElementById('navbar__list');
    sections.forEach((section) => {
      const sectionId = section.id;
      const sectionName = section.getAttribute('data-nav');
      const listItem = document.createElement('li');
      listItem.innerHTML = `<a href="#${sectionId}" class="menu__link">${sectionName}</a>`;
      navbarList.appendChild(listItem);
    });
  }
  
  // Add active state to the navigation item and corresponding section when in viewport
  function setActiveState() {
    const sections = document.querySelectorAll('section');
  
    window.addEventListener('scroll', () => {
      sections.forEach((section) => {
        const navLink = document.querySelector(`.menu__link[href="#${section.id}"]`);
  
        if (isInViewport(section)) {
          section.classList.add('your-active-class');
          navLink.classList.add('active');
        } else {
          section.classList.remove('your-active-class');
          navLink.classList.remove('active');
        }
      });
    });
  }
  
  // Smooth scroll to a section when a navigation item is clicked
  function scrollToSection() {
    const navLinks = document.querySelectorAll('.menu__link');
  
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
  
        const targetSectionId = link.getAttribute('href');
        const targetSection = document.querySelector(targetSectionId);
  
        targetSection.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }
  
  // Hide the fixed navigation bar while not scrolling
  function hideNavbarOnIdle() {
    let timer;
    const navbar = document.querySelector('header');
  
    window.addEventListener('scroll', () => {
      clearTimeout(timer);
  
      navbar.style.display = 'block';
  
      timer = setTimeout(() => {
        navbar.style.display = 'none';
      }, 2000);
    });
  }
  
  // Show/hide scroll to top button
  function toggleScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight) {
        scrollToTopBtn.style.display = 'block';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    });
  
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Initialize the landing page functionality
  function initLandingPage() {
    buildNavigationMenu();
    setActiveState();
    scrollToSection();
    hideNavbarOnIdle();
    toggleScrollToTopButton();
  }
  
  // Call the initialization function when the DOM is ready
  document.addEventListener('DOMContentLoaded', initLandingPage);