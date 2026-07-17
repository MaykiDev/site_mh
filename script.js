/* =========================================================
   Mayki Hashimoto — comportamentos da página
   ========================================================= */
(function () {
  "use strict";

  const body = document.body;
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const themeToggle = document.getElementById("themeToggle");
  const navLinks = document.querySelectorAll(".nav-link");

  /* ---------- Menu hambúrguer ---------- */
  function closeMenu() {
    nav.classList.remove("open");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    hamburger.classList.toggle("active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  // Fecha o menu ao clicar em um link
  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Fecha ao clicar fora ou apertar ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- Alternador de tema (Dark/Light) ---------- */
  const THEME_KEY = "mayki-theme";

  function applyTheme(theme) {
    body.classList.remove("theme-dark", "theme-light");
    body.classList.add(theme === "light" ? "theme-light" : "theme-dark");
  }

  // Carrega preferência salva (padrão: dark)
  let savedTheme = "dark";
  try {
    savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  } catch (err) {
    savedTheme = "dark";
  }
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", function () {
    const next = body.classList.contains("theme-dark") ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (err) {
      /* localStorage indisponível — segue sem salvar */
    }
  });

  /* ---------- Rolagem suave ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ---------- Reveal ao rolar ---------- */
  const revealTargets = document.querySelectorAll(
    ".section-head, .about-body, .main-service-grid, .service-card, .portfolio-item, .contact-form, .hero-content, .hero-media"
  );
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- Formulário de contato (demo) ---------- */
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const mensagem = form.mensagem.value.trim();

      if (!nome || !email || !mensagem) {
        feedback.textContent = "Preencha todos os campos para enviar.";
        feedback.style.color = "#ef5a6f";
        return;
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        feedback.textContent = "Informe um e-mail válido.";
        feedback.style.color = "#ef5a6f";
        return;
      }

      feedback.textContent = "Mensagem pronta! Vou responder em breve, " + nome + ".";
      feedback.style.color = "";
      form.reset();
    });
  }

  /* ---------- Ano no rodapé ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
