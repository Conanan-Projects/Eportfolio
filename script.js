document.addEventListener("DOMContentLoaded", () => {
  // Add class to body to support .js-enabled CSS fallback
  document.body.classList.add("js-enabled");

  // ======================
  // Mobile Menu Functionality
  // ======================
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-link");

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    burger.classList.toggle("active");
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active");
      burger.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest("nav") && !e.target.classList.contains("burger")) {
      navLinks.classList.remove("active");
      burger.classList.remove("active");
    }
  });

  // ======================
  // Smooth Scroll
  // ======================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Optional accessibility improvement
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  });

  // ======================
  // Intersection Observers
  // ======================
  const sectionObserverOptions = {
    threshold: 0.05,
    rootMargin: "-50px 0px",
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");

        // Animate skill bars only for skills section
        if (entry.target.id === "skills") {
          document.querySelectorAll(".skill").forEach((skill) => {
            const bar = skill.querySelector(".skill-bar");
            const progress = skill.querySelector(".skill-progress");
            const percent = bar.dataset.percent;

            // Trigger animation in next frame
            requestAnimationFrame(() => {
              progress.style.width = percent;
            });
          });
        }
      } else {
        entry.target.classList.remove("in-view");

        // Optional: Reset skill bars on exit (comment out if not desired)
        if (entry.target.id === "skills") {
          document.querySelectorAll(".skill-progress").forEach((progress) => {
            progress.style.width = "0";
          });
        }
      }
    });
  }, sectionObserverOptions);

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("in-view")
        ) {
          entry.target.classList.add("in-view");
          cardObserver.unobserve(entry.target); // Animate once
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  // Observe sections
  document.querySelectorAll("section").forEach((section) => {
    sectionObserver.observe(section);
  });

  // ======================
  // Scroll Handlers (Debounced)
  // ======================
  let ticking = false;

  function updateScrollIndicators() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    let currentSection = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href").substring(1);
      link.classList.toggle("active", href === currentSection);
    });

    // Scroll progress indicator
    const scrollPercent =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    document.documentElement.style.setProperty("--scroll", `${scrollPercent}%`);
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollIndicators();
        ticking = false;
      });
      ticking = true;
    }
  });

  // ======================
  // Initial Setup
  // ======================
  updateScrollIndicators();
});
