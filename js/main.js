/* ==========================================================================
   Mayki Hashimoto — Interações
   ========================================================================== */
(function () {
  "use strict";

  // Altere aqui os contatos do site inteiro.
  var CONFIG = {
    whatsapp: "5565996920735",
    instagram: "https://www.instagram.com/" // troque pelo @ do Mayki
  };

  var doc = document.documentElement;
  var body = document.body;
  doc.classList.add("js");

  /* ---------- Links do Instagram ---------- */
  document.querySelectorAll("[data-instagram]").forEach(function (a) {
    a.href = CONFIG.instagram;
  });

  /* ---------- Header ao rolar ---------- */
  var header = document.querySelector("[data-header]");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-menu]");
  var closeMenu = function () {
    body.classList.remove("menu-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.querySelector(".sr-only").textContent = "Abrir menu";
    }
  };
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (open) return closeMenu();
      body.classList.add("menu-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.querySelector(".sr-only").textContent = "Fechar menu";
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", closeMenu);
  }

  /* ---------- Submenu de serviços (desktop) ---------- */
  var desktop = window.matchMedia("(min-width: 1024px)");
  document.querySelectorAll("[data-sub-toggle]").forEach(function (btn) {
    var sub = btn.nextElementSibling;
    var item = btn.parentElement;
    var timer;
    var setOpen = function (state) {
      btn.setAttribute("aria-expanded", String(state));
      sub.classList.toggle("is-open", state);
    };
    btn.addEventListener("click", function (e) {
      if (!desktop.matches) return;
      // Com mouse o hover já abriu o submenu: o clique só garante que ele fique aberto.
      // Pelo teclado (detail === 0) o clique alterna abrir/fechar.
      if (e.detail === 0) setOpen(btn.getAttribute("aria-expanded") !== "true");
      else setOpen(true);
    });
    document.addEventListener("click", function (e) {
      if (desktop.matches && !item.contains(e.target)) setOpen(false);
    });
    item.addEventListener("mouseenter", function () {
      if (!desktop.matches) return;
      clearTimeout(timer); setOpen(true);
    });
    item.addEventListener("mouseleave", function () {
      if (!desktop.matches) return;
      timer = setTimeout(function () { setOpen(false); }, 160);
    });
    item.addEventListener("focusout", function (e) {
      if (desktop.matches && !item.contains(e.relatedTarget)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { setOpen(false); btn.focus(); }
    });
  });

  /* ---------- Nome do hero ocupa a largura exata ---------- */
  var fitTargets = document.querySelectorAll("[data-fit]");
  var textWidth = function (node) {
    var r = document.createRange(); r.selectNodeContents(node);
    return r.getBoundingClientRect().width;
  };
  var textRect = function (node) {
    var r = document.createRange(); r.selectNodeContents(node);
    return r.getBoundingClientRect();
  };
  var fit = function () {
    fitTargets.forEach(function (el) {
      var lines = el.querySelectorAll(".line");
      var photo = document.querySelector(".hero-photo");
      el.style.fontSize = "";
      lines.forEach(function (l) { l.style.fontSize = ""; });
      var width = el.getBoundingClientRect().width;
      if (desktop.matches) {
        var size = parseFloat(getComputedStyle(el).fontSize);
        var first = textRect(lines[0]), last = textRect(lines[lines.length - 1]);
        var next = Math.min(size * (width / (last.right - first.left)), 200) + "px";
        el.style.fontSize = next;
        if (photo) photo.style.fontSize = next;
      } else {
        // As duas linhas usam o tamanho da palavra mais longa
        var best = Infinity;
        lines.forEach(function (l) {
          var base = parseFloat(getComputedStyle(l).fontSize);
          best = Math.min(best, base * (width / textWidth(l)));
        });
        lines.forEach(function (l) { l.style.fontSize = best + "px"; });
        if (photo) photo.style.fontSize = "";
      }
    });
  };
  var runFit = function () { if (fitTargets.length) fit(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(runFit);
  window.addEventListener("load", runFit);
  var resizeTimer;
  window.addEventListener("resize", function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(runFit, 120); });

  /* ---------- Entrada do hero ---------- */
  var reveal = function () { body.classList.add("is-ready"); };
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 900); })]).then(function () {
      runFit(); requestAnimationFrame(reveal);
    });
  } else { reveal(); }

  /* ---------- Foto com reserva ---------- */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    var swap = function () {
      if (img.dataset.swapped) return;
      img.dataset.swapped = "1";
      img.src = img.dataset.fallback;
    };
    img.addEventListener("error", swap);
    if (img.complete && img.naturalWidth === 0) swap();
  });

  /* ---------- Portfólio ao vivo: encaixa o site (1440px) na largura da tela ---------- */
  var liveScreens = document.querySelectorAll(".pf-screen--live");
  var scaleLive = function () {
    liveScreens.forEach(function (el) { el.style.setProperty("--pf-scale", el.clientWidth / 1440); });
  };
  if (liveScreens.length) {
    scaleLive();
    window.addEventListener("resize", scaleLive);
  }

  /* ---------- Só um FAQ aberto por vez ---------- */
  document.querySelectorAll(".faq").forEach(function (group) {
    group.querySelectorAll("details").forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (!d.open) return;
        group.querySelectorAll("details[open]").forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  });

  /* ---------- Formulário → WhatsApp ---------- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var error = field.querySelector(".field-error");
        var ok = input.value.trim().length > 1;
        field.classList.toggle("is-invalid", !ok);
        if (error) error.textContent = ok ? "" : input.dataset.error;
        if (!ok && valid) { input.focus(); valid = false; }
      });
      if (!valid) return;

      var data = new FormData(form);
      var text =
        "Olá, Mayki! Meu nome é " + data.get("nome").trim() + "." +
        (data.get("servico") ? "\nTenho interesse em: " + data.get("servico") + "." : "") +
        "\n\n" + data.get("mensagem").trim();
      window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      var note = form.querySelector(".form-note");
      if (note) note.textContent = "Abrimos o WhatsApp em outra aba com sua mensagem pronta. É só tocar em enviar.";
    });
  }

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
