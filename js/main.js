// Jan Sabha Sansad - Interactive Enhancements

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const header = document.querySelector("header .nav-container");
  
  // Highlighting Active Nav Link based on URL
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navOverlay = document.getElementById("navOverlay");

  if (!hamburger || !navMenu || !navOverlay) return;

  function toggleMenu(isOpen) {
    const activeState = isOpen !== undefined ? isOpen : !navMenu.classList.contains("active");

    hamburger.classList.toggle("active", activeState);
    navMenu.classList.toggle("active", activeState);
    navOverlay.classList.toggle("active", activeState);

    hamburger.setAttribute("aria-expanded", activeState ? "true" : "false");
    document.body.style.overflow = activeState ? "hidden" : "";
  }

  // Click event on hamburger button
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Click event on overlay
  navOverlay.addEventListener("click", () => toggleMenu(false));

  // Close drawer on link selection
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      toggleMenu(false);
    }
  });
}

// Support both deferred script tags and direct inline execution
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMobileMenu);
} else {
  initMobileMenu();
}