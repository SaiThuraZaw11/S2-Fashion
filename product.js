/* ==========================================================================
   S2 FASHION — Product Detail Page Script
   Reads ?id= from the URL, loads matching product from PRODUCTS,
   renders it into the page, and wires up gallery / options / cart actions.
   ========================================================================== */

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function starString(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

let selectedSize = null;
let selectedColor = null;

function renderProductDetail() {
  const wrap = document.querySelector("#product-detail-root");
  if (!wrap) return;

  const id = parseInt(getQueryParam("id"), 10);
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    wrap.innerHTML = `<div class="no-results"><h3>Product not found</h3><p class="mt-4"><a class="btn btn-primary" href="shop.html">Back to Shop</a></p></div>`;
    return;
  }

  document.title = `${product.name} | S2 Fashion`;
  selectedSize = product.sizes[0];
  selectedColor = product.colors[0];

  const oldPriceHtml = product.oldPrice
    ? `<span class="price-old">$${product.oldPrice.toFixed(2)}</span><span class="badge" style="position:static;">-${product.discount}%</span>`
    : "";

  wrap.innerHTML = `
    <nav class="breadcrumb container">
      <a href="index.html">Home</a> / <a href="shop.html">Shop</a> / <a href="shop.html?category=${encodeURIComponent(product.category)}">${product.category}</a> / <span>${product.name}</span>
    </nav>
    <div class="container pd-grid">
      <div class="pd-gallery">
        <div class="pd-gallery-main">
          <img id="pd-main-img" src="${product.image}" alt="${product.name}">
        </div>
        <div class="pd-thumbs">
          <img src="${product.image}" alt="${product.name} view 1" class="active" data-src="${product.image}">
          <img src="${product.imageAlt}" alt="${product.name} view 2" data-src="${product.imageAlt}">
        </div>
      </div>
      <div class="pd-info">
        <span class="cat">${product.category}</span>
        <h1>${product.name}</h1>
        <div class="pd-rating"><span class="stars">${starString(product.rating)}</span><span>${product.rating} rating</span></div>
        <div class="pd-price">
          <span class="price">$${product.price.toFixed(2)}</span>
          ${oldPriceHtml}
        </div>
        <p class="pd-desc">${product.description}</p>

        <div class="option-block">
          <h4>Size</h4>
          <div class="size-options" id="size-options">
            ${product.sizes.map((s, i) => `<button type="button" class="size-btn ${i === 0 ? "selected" : ""}" data-size="${s}">${s}</button>`).join("")}
          </div>
        </div>

        <div class="option-block">
          <h4>Color</h4>
          <div class="color-options" id="color-options">
            ${product.colors.map((c, i) => `<button type="button" class="color-btn ${i === 0 ? "selected" : ""}" style="background:${c};" data-color="${c}" aria-label="Color ${c}"></button>`).join("")}
          </div>
        </div>

        <div class="option-block">
          <h4>Quantity</h4>
          <div class="qty-selector">
            <button type="button" id="qty-minus" aria-label="Decrease quantity">−</button>
            <input type="number" id="qty-input" value="1" min="1" max="10" aria-label="Quantity">
            <button type="button" id="qty-plus" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <div class="pd-actions">
          <button class="btn btn-outline" id="add-to-cart-detail">Add to Cart</button>
          <button class="btn btn-primary" id="buy-now-detail">Buy Now</button>
        </div>

        <div class="pd-accordion">
          <div class="acc-item open">
            <button class="acc-head">Product Information <span class="acc-icon">+</span></button>
            <div class="acc-body"><div class="acc-body-inner">Made from premium materials, sourced responsibly. Each S2 Fashion piece is quality-checked before it ships. Model shown wears size M / EU 38.</div></div>
          </div>
          <div class="acc-item">
            <button class="acc-head">Shipping Information <span class="acc-icon">+</span></button>
            <div class="acc-body"><div class="acc-body-inner">Standard delivery in 3–7 business days. Free shipping on orders over $100. Orders are processed within 24 hours on business days.</div></div>
          </div>
          <div class="acc-item">
            <button class="acc-head">Returns &amp; Exchanges <span class="acc-icon">+</span></button>
            <div class="acc-body"><div class="acc-body-inner">Free returns within 30 days of delivery. Items must be unworn with original tags attached. Refunds are issued to the original payment method.</div></div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <h3 class="related-heading">You May Also Like</h3>
      <div class="product-grid" id="related-products-grid"></div>
    </div>
  `;

  wireProductDetailEvents(product);
  renderRelatedProducts(product);
  initScrollReveal();
}

function wireProductDetailEvents(product) {
  // Gallery thumbnails
  document.querySelectorAll(".pd-thumbs img").forEach(thumb => {
    thumb.addEventListener("click", () => {
      document.querySelectorAll(".pd-thumbs img").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      document.getElementById("pd-main-img").src = thumb.dataset.src;
    });
  });

  // Size selection
  document.querySelectorAll(".size-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedSize = btn.dataset.size;
    });
  });

  // Color selection
  document.querySelectorAll(".color-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedColor = btn.dataset.color;
    });
  });

  // Quantity stepper
  const qtyInput = document.getElementById("qty-input");
  document.getElementById("qty-minus").addEventListener("click", () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value, 10) - 1);
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    qtyInput.value = Math.min(10, parseInt(qtyInput.value, 10) + 1);
  });

  // Accordion
  document.querySelectorAll(".acc-head").forEach(head => {
    head.addEventListener("click", () => {
      head.closest(".acc-item").classList.toggle("open");
    });
  });

  // Add to cart
  document.getElementById("add-to-cart-detail").addEventListener("click", () => {
    const qty = parseInt(qtyInput.value, 10) || 1;
    Cart.addItem(product, { size: selectedSize, color: selectedColor, qty });
    showToast(`${product.name} added to cart`);
  });

  // Buy now -> add then go straight to checkout
  document.getElementById("buy-now-detail").addEventListener("click", () => {
    const qty = parseInt(qtyInput.value, 10) || 1;
    Cart.addItem(product, { size: selectedSize, color: selectedColor, qty });
    window.location.href = "checkout.html";
  });
}

function renderRelatedProducts(product) {
  const grid = document.getElementById("related-products-grid");
  if (!grid) return;
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const fallback = related.length ? related : PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
  grid.innerHTML = fallback.map(buildProductCard).join("");
  initAddToCartDelegation(grid);
}

document.addEventListener("DOMContentLoaded", renderProductDetail);
