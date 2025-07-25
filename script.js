document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");
  const html = document.documentElement;

  const updateLogo = (theme) => {
    const logoImg = document.getElementById("logo-img");
    if (logoImg) {
      logoImg.src = theme === "dark" ? "img/w-eport-logo.png" : "img/b-eport-logo.png";
    }
  };

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
  html.setAttribute("data-theme", savedTheme);
  themeIcon.className = savedTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
  updateLogo(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    themeIcon.className = newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
    localStorage.setItem("theme", newTheme);
    updateLogo(newTheme);
  });

  // Mobile Menu
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    burger.classList.toggle("active");
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });

      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        burger.classList.remove("active");
      }
    });
  });

  // Back to Top
  const backToTop = document.querySelector(".back-to-top");
  window.addEventListener("scroll", () => {
    backToTop.style.opacity = window.scrollY > 500 ? "1" : "0";
    backToTop.style.visibility = window.scrollY > 500 ? "visible" : "hidden";
  });

  // Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll("section:not(#home), .project-card, .skill-category, .section-header");

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Manually animate hero elements on load
  document.querySelectorAll(".hero-content > *").forEach((el, i) => {
    el.classList.add("animate", `delay-${i}`);
  });
});