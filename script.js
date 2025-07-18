document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loading");

  const loader = document.getElementById("loader");
  const loaderText = document.getElementById("loader-text");
  const loaderFill = document.getElementById("loader-fill");
  const siteContent = document.getElementById("site-content");

  let progress = 0;
  const duration = 2000;
  const interval = 30;
  const step = 100 / (duration / interval);

  const loadingInterval = setInterval(() => {
    progress += step;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      loader.style.opacity = 0;
      setTimeout(() => {
        loader.style.display = "none";
        siteContent.style.display = "block";
        document.body.classList.remove("loading");
      }, 500);
    }
    loaderText.textContent = `${Math.floor(progress)}%`;
    loaderFill.style.width = `${progress}%`;
  }, interval);

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
  updateLogo(savedTheme); // Update logo on load

  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    themeIcon.className = newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
    localStorage.setItem("theme", newTheme);
    updateLogo(newTheme); // Update logo on toggle
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

  // EmailJS Init
  emailjs.init("tl_4Sss74Hx0TPDmC");

  // Contact Form
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const recaptchaResponse = grecaptcha.getResponse();

    if (!recaptchaResponse) {
      alert("Please verify the reCAPTCHA.");
      return;
    }

    const templateParams = {
      from_name: name,
      reply_to: email,
      message: message,
      "g-recaptcha-response": recaptchaResponse
    };

    // Send to yourself
    emailjs.send("service_rxi5w1j", "template_cw4fucx", templateParams)
        .then(() => {
          return emailjs.send("service_rxi5w1j", "template_f092fxt", templateParams);
        })
        .then(() => {
          alert("Thank you for your message! I'll get back to you soon.");
          contactForm.reset();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          alert("Oops! Something went wrong while sending your message.");
        });
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

  const animatedElements = document.querySelectorAll("section, .project-card, .skill-category, nav, footer");

  animatedElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom >= 0;
    if (inView) {
      el.classList.add("animate");
    }
    observer.observe(el);
  });

  // Hero Delayed Animations
  document.querySelectorAll(".hero-content > *").forEach((el, i) => {
    el.classList.add(`delay-${i}`);
  });
});
