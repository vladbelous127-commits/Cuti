/* Cuti — site interactions
   Header condense, mobile menu, scroll reveals, stat counters, form feedback. */

(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var nav = document.getElementById("site-nav");
  var toggle = document.getElementById("nav-toggle");

  /* ---- Sticky header condenses after scrolling past the hero top ---- */
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---- Scroll-triggered reveals with per-row stagger ---- */
  var faders = document.querySelectorAll(".fade-up");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    faders.forEach(function (el, i) {
      var siblings = el.parentElement ? el.parentElement.querySelectorAll(":scope > .fade-up") : [];
      var index = Array.prototype.indexOf.call(siblings, el);
      el.style.setProperty("--stagger", (Math.max(index, 0) * 0.08) + "s");
      io.observe(el);
    });
  } else {
    faders.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Animated stat counters ---- */
  var stats = document.querySelectorAll(".stat-value[data-count]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (reduceMotion || !("requestAnimationFrame" in window)) {
      el.textContent = String(target);
      return;
    }
    var duration = 1400;
    var start = null;
    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window) {
    var statIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        statIo.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    stats.forEach(function (el) { statIo.observe(el); });
  } else {
    stats.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
  }

  /* ---- Contact form (front-end only; wire to a backend or form service later) ---- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    status.textContent = "Thanks! This demo form isn't connected yet — email us at hello@cuti.example.";
    form.reset();
  });

  /* ---- Footer year ---- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
