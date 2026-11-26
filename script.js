/**
 * GODAWARI INDUSTRIES — MULTIPAGE WEBSITE JAVASCRIPT
 * Interactions: Sticky Header, Mobile Navigation Drawer, Animated Stats Counter,
 * Spec Tabs, FAQ Accordion, Sample Request Form with Live Feedback, Scroll Reveal
 */

document.addEventListener("DOMContentLoaded", function () {
  
  // 1. STICKY HEADER & SCROLL BEHAVIOR
  const siteHeader = document.querySelector(".site-header");
  const floatingCta = document.querySelector(".floating-cta");

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;

    if (siteHeader) {
      if (scrollY > 30) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    }

    if (floatingCta) {
      if (scrollY > 450) {
        floatingCta.classList.add("visible");
      } else {
        floatingCta.classList.remove("visible");
      }
    }
  }, { passive: true });

  // 2. MOBILE NAVIGATION DRAWER
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");

  if (menuToggle && navigation) {
    function closeMenu() {
      navigation.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = navigation.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close when tapping outside the open drawer
    document.addEventListener("click", function (e) {
      if (navigation.classList.contains("open") && !navigation.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // Close mobile drawer on pressing Escape key or window resize beyond tablet
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navigation.classList.contains("open")) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024 && navigation.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  // 3. AUTOMATIC COPYRIGHT YEAR
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 4. ANIMATED STATS COUNTER
  function animateCounters() {
    const counterElements = document.querySelectorAll(".stat-number[data-target]");
    
    counterElements.forEach(function (counter) {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      const isPercentage = counter.textContent.includes("%");
      const isPlus = counter.textContent.includes("+");
      
      let start = 0;
      const duration = 1800;
      const stepTime = 25;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;

      const timer = setInterval(function () {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }

        let formattedNumber = Math.floor(start).toLocaleString();
        if (isPercentage) {
          counter.textContent = formattedNumber + "%";
        } else if (isPlus) {
          counter.textContent = formattedNumber + "+";
        } else {
          counter.textContent = formattedNumber;
        }
      }, stepTime);
    });
  }

  const statsStrip = document.querySelector(".hero-stats-strip");
  let countersAnimated = false;
  if (statsStrip && "IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
        statsObserver.unobserve(statsStrip);
      }
    }, { threshold: 0.2 });
    statsObserver.observe(statsStrip);
  } else if (statsStrip) {
    animateCounters();
  }

  // 5. TECHNICAL SPECIFICATION TABS
  const specTabs = document.querySelectorAll(".spec-tab");
  const specPanels = document.querySelectorAll(".spec-panel");

  specTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const targetId = "tab-" + tab.getAttribute("data-tab");

      specTabs.forEach(function (t) { t.classList.remove("active"); });
      specPanels.forEach(function (p) { p.classList.remove("active"); });

      tab.classList.add("active");
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add("active");
      }
    });
  });

  // 6. FAQ ACCORDION
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const questionButton = item.querySelector(".faq-question");
    if (questionButton) {
      questionButton.addEventListener("click", function () {
        const isOpen = item.classList.contains("open");
        
        faqItems.forEach(function (otherItem) {
          otherItem.classList.remove("open");
        });

        if (!isOpen) {
          item.classList.add("open");
        }
      });
    }
  });

  // 7. SAMPLE & QUOTE REQUEST FORM SUBMISSION
  const sampleForm = document.getElementById("brewerySampleForm");
  const formStatus = document.getElementById("formStatus");

  if (sampleForm) {
    sampleForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const brewery = document.getElementById("breweryName").value;
      const contact = document.getElementById("contactPerson").value;
      const email = document.getElementById("email").value;

      const submitBtn = sampleForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Processing Sample Dispatch...</span>';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        if (formStatus) {
          formStatus.className = "form-status success";
          formStatus.innerHTML = `
            <strong>Thank you, ${contact}!</strong><br>
            Your sample request for <em>${brewery}</em> has been registered. 
            Our brewing adjunct specialist will reach out to <strong>${email}</strong> with tracking details and batch COA within 24 hours.
          `;
          sampleForm.reset();
        }
      }, 800);
    });
  }

  // 8. ADVANCED DIRECTIONAL SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  const revealSelector = ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-pop, .reveal-img";
  const revealElements = document.querySelectorAll(revealSelector);

  // Mark all elements in viewport visible immediately
  revealElements.forEach(function (el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      el.classList.add("visible");
    }
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.02,
        rootMargin: "50px 0px 50px 0px"
      }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }

  // 9. ACTIVE NAV LINK HIGHLIGHT
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // 10. INTERACTIVE "GRAIN-TO-GLASS" JOURNEY CARDS
  const journeyCards = document.querySelectorAll(".journey-card");
  journeyCards.forEach(function (card) {
    card.addEventListener("click", function () {
      journeyCards.forEach(function (c) {
        c.classList.remove("active");
      });
      card.classList.add("active");
    });
  });

  // 11. INTERACTIVE BREWHOUSE EFFICIENCY & ADJUNCT CALCULATOR
  const adjunctSlider = document.getElementById("adjunctSlider");
  const adjunctPercent = document.getElementById("adjunctPercent");
  const metricExtract = document.getElementById("metricExtract");
  const metricLauter = document.getElementById("metricLauter");
  const metricFoam = document.getElementById("metricFoam");
  const metricSavings = document.getElementById("metricSavings");

  if (adjunctSlider && adjunctPercent) {
    const simulationData = {
      10: { extract: "81.8%", lauter: "+12% Faster", foam: "Nibem 252s", savings: "~9% / Brew" },
      15: { extract: "82.1%", lauter: "+15% Faster", foam: "Nibem 256s", savings: "~14% / Brew" },
      20: { extract: "82.4%", lauter: "+18% Faster", foam: "Nibem 260s", savings: "~19% / Brew" },
      25: { extract: "82.8%", lauter: "+22% Faster", foam: "Nibem 265s", savings: "~24% / Brew" },
      30: { extract: "83.2%", lauter: "+26% Faster", foam: "Nibem 270s", savings: "~28% / Brew" },
      35: { extract: "83.5%", lauter: "+30% Faster", foam: "Nibem 272s", savings: "~33% / Brew" },
      40: { extract: "83.8%", lauter: "+34% Faster", foam: "Nibem 275s", savings: "~38% / Brew" }
    };

    function updateSimulation(val) {
      adjunctPercent.textContent = val + "% Maize Grits";
      const data = simulationData[val] || {
        extract: (81.0 + val * 0.07).toFixed(1) + "%",
        lauter: "+" + Math.round(val * 0.85) + "% Faster",
        foam: "Nibem " + (248 + Math.round(val * 0.6)) + "s",
        savings: "~" + Math.round(val * 0.95) + "% / Brew"
      };

      if (metricExtract) metricExtract.textContent = data.extract;
      if (metricLauter) metricLauter.textContent = data.lauter;
      if (metricFoam) metricFoam.textContent = data.foam;
      if (metricSavings) metricSavings.textContent = data.savings;
    }

    adjunctSlider.addEventListener("input", function (e) {
      updateSimulation(e.target.value);
    });

    // Initial state
    updateSimulation(adjunctSlider.value);
  }

  // 10. BREWERY MENUBAR ANIMATION (BUBBLE BURST & CRAFT BEER POUR)
  function initBreweryMenuAnimation() {
    const navLinks = document.querySelectorAll(".nav-link, .nav-cta");

    function spawnBubbles(element, count) {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const numBubbles = count || 5;

      for (let i = 0; i < numBubbles; i++) {
        const bubble = document.createElement("span");
        bubble.className = "brew-bubble";
        const size = Math.floor(Math.random() * 8) + 6; // 6px to 13px
        const x = Math.random() * Math.max(rect.width - 12, 10) + 4;
        const drift = (Math.random() - 0.5) * 36; // -18px to +18px drift
        const duration = (0.6 + Math.random() * 0.35).toFixed(2);

        bubble.style.width = size + "px";
        bubble.style.height = size + "px";
        bubble.style.left = x + "px";
        bubble.style.bottom = "2px";
        bubble.style.setProperty("--bubble-drift", drift + "px");
        bubble.style.animationDuration = duration + "s";

        element.appendChild(bubble);
        setTimeout(function () {
          bubble.remove();
        }, 900);
      }
    }

    navLinks.forEach(function (link) {
      // Gentle effervescent bubbling on hover
      link.addEventListener("mouseenter", function () {
        spawnBubbles(link, 3);
      });

      // Joyful beer clink pulse & bubble burst on click/tap
      link.addEventListener("click", function () {
        link.classList.add("beer-clink");
        spawnBubbles(link, 7);
        setTimeout(function () {
          link.classList.remove("beer-clink");
        }, 480);
      });
    });

    // Ambient micro-carbonation on the active tab every 3.5s
    const activeLink = document.querySelector(".nav-desktop-side .nav-link.active");
    if (activeLink) {
      setInterval(function () {
        if (!document.hidden) {
          spawnBubbles(activeLink, 2);
        }
      }, 3500);
    }
  }

  initBreweryMenuAnimation();

  console.log("Godawari Multipage Experience loaded successfully.");
});
