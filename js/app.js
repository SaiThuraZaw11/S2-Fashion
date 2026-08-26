/* ==========================================================================
   S2 FASHION — Core App Script
   Shared behaviour for every page: mobile nav, search panel, toast helper,
   scroll reveal, newsletter form, and homepage-only rendering
   (featured products). Requires products.js and cart.js loaded first.
   ========================================================================== */

/* ---------------- Mobile Nav ---------------- */
function initMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const closeBtn = document.querySelector(".mobile-nav-close");
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener("click", () => mobileNav.classList.add("open"));
  closeBtn?.addEventListener("click", () => mobileNav.classList.remove("open"));
  mobileNav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => mobileNav.classList.remove("open"))
  );
}

/* ---------------- Search Panel ---------------- */
function initSearchPanel() {
  const searchToggle = document.querySelector(".search-toggle");
  const searchPanel = document.querySelector(".search-panel");
  const searchForm = document.querySelector(".search-panel form");
  const searchInput = document.querySelector(".search-panel input");
  if (!searchToggle || !searchPanel) return;

  searchToggle.addEventListener("click", () => {
    searchPanel.classList.toggle("open");
    if (searchPanel.classList.contains("open")) searchInput.focus();
  });

  searchForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
    }
  });
}

/* ---------------- Toast ---------------- */
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="ti fa-solid fa-circle-check"></i><span class="toast-msg"></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector(".toast-msg").textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------------- Scroll Reveal ---------------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
}

/* ---------------- Newsletter ---------------- */
function initNewsletter() {
  const form = document.querySelector(".newsletter-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input[type='email']");
    const msg = document.querySelector(".form-msg");
    const email = input.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValid) {
      msg.textContent = "Please enter a valid email address.";
      msg.className = "form-msg error";
      return;
    }
    msg.textContent = "Thanks for subscribing — welcome to S2 Fashion.";
    msg.className = "form-msg success";
    form.reset();
  });
}

/* ---------------- Product Card Builder (shared by app.js + shop.js logic) ---------------- */
function buildProductCard(product) {
  const discountBadge = product.discount > 0
    ? `<span class="badge">-${product.discount}%</span>`
    : (product.isNew ? `<span class="badge">New</span>` : "");

  const oldPriceHtml = product.oldPrice
    ? `<span class="price-old">$${product.oldPrice.toFixed(2)}</span>`
    : "";

  return `
    <article class="product-card reveal">
      <div class="product-thumb">
        ${discountBadge}
        <a href="product.html?id=${product.id}">
          <img class="img-main" src="${product.image}" alt="${product.name}" loading="lazy">
          <img class="img-alt" src="${product.imageAlt}" alt="${product.name} alternate view" loading="lazy">
        </a>
        <div class="product-quick-actions">
          <button class="btn btn-light add-to-cart-btn" data-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
          <a href="product.html?id=${product.id}" class="btn btn-primary" aria-label="View ${product.name}">View</a>
        </div>
      </div>
      <div class="product-info">
        <span class="cat">${product.category}</span>
        <h3 class="name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <div class="price-row">
          <span class="price">$${product.price.toFixed(2)}</span>
          ${oldPriceHtml}
        </div>
      </div>
    </article>
  `;
}

/* Attach a single delegated click handler for any ".add-to-cart-btn" on the page. */
function initAddToCartDelegation(container = document) {
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart-btn");
    if (!btn) return;
    const id = parseInt(btn.dataset.id, 10);
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    Cart.addItem(product, { qty: 1 });
    showToast(`${product.name} added to cart`);
  });
}

/* ---------------- Homepage: Featured Products ---------------- */
function renderFeaturedProducts() {
  const grid = document.querySelector("#featured-products-grid");
  if (!grid) return;

  const featured = PRODUCTS.filter(product => product.isNew).slice(0, 8);

  grid.innerHTML = featured.map(buildProductCard).join("");

  initScrollReveal();
}

/* ---------------- Homepage: Category Card Images (kept in one place) ---------------- */
const CATEGORY_IMAGES = {
  "Women": "https://picsum.photos/seed/s2-cat-women/500/650",
  "Men": "https://picsum.photos/seed/s2-cat-men/500/650",
  "Dresses": "https://picsum.photos/seed/s2-cat-dresses/500/650",
  "Tops": "https://picsum.photos/seed/s2-cat-tops/500/650",
  "Girls' Nightwear": "https://picsum.photos/seed/s2-cat-girls/500/650"
};

/* ---------------- Header scroll shadow (subtle) ---------------- */
function initHeaderScrollState() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  window.addEventListener("scroll", () => {
    header.style.boxShadow = window.scrollY > 8 ? "0 1px 0 rgba(0,0,0,0.06)" : "none";
  }, { passive: true });
}

/* ---------------- Set active nav link based on current page ---------------- */
function setActiveNavLink() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a, .mobile-nav a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}

/* ---------------- Init on every page ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initSearchPanel();
  initHeaderScrollState();
  initScrollReveal();
  initNewsletter();
  setActiveNavLink();
  initAddToCartDelegation(document);
  renderFeaturedProducts();
});
