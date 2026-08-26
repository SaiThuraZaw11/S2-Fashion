/* ==========================================================================
   S2 FASHION — Shop Page Script
   Handles the product grid: text search, category filter, price filter,
   and sorting. All done client-side against the PRODUCTS array.
   ========================================================================== */

let activeFilters = {
  search: "",
  categories: [],
  minPrice: null,
  maxPrice: null,
  sort: "newest"
};

function uniqueCategories() {
  return [...new Set(PRODUCTS.map(p => p.category))];
}

function renderCategoryFilters() {
  const list = document.getElementById("category-filter-list");
  if (!list) return;
  list.innerHTML = uniqueCategories().map(cat => `
    <label class="filter-option">
      <input type="checkbox" value="${cat}" class="category-checkbox">
      <span>${cat}</span>
    </label>
  `).join("");

  list.querySelectorAll(".category-checkbox").forEach(cb => {
    cb.addEventListener("change", () => {
      activeFilters.categories = [...list.querySelectorAll(".category-checkbox:checked")].map(c => c.value);
      applyFilters();
    });
  });
}

function applyFilters() {
  let results = PRODUCTS.slice();

  if (activeFilters.search) {
    const q = activeFilters.search.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  if (activeFilters.categories.length) {
    results = results.filter(p => activeFilters.categories.includes(p.category));
  }

  if (activeFilters.minPrice !== null && !isNaN(activeFilters.minPrice)) {
    results = results.filter(p => p.price >= activeFilters.minPrice);
  }
  if (activeFilters.maxPrice !== null && !isNaN(activeFilters.maxPrice)) {
    results = results.filter(p => p.price <= activeFilters.maxPrice);
  }

  switch (activeFilters.sort) {
    case "price-low":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      results.sort((a, b) => b.price - a.price);
      break;
    case "popular":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
    default:
      results.sort((a, b) => (b.isNew === true) - (a.isNew === true) || b.id - a.id);
      break;
  }

  renderShopGrid(results);
}

function renderShopGrid(results) {
  const grid = document.getElementById("shop-product-grid");
  const countEl = document.getElementById("shop-result-count");
  if (!grid) return;

  countEl.textContent = `${results.length} product${results.length !== 1 ? "s" : ""}`;

  if (!results.length) {
    grid.innerHTML = `<div class="no-results"><h3>No products found</h3><p class="mt-4">Try adjusting your search or filters.</p></div>`;
    return;
  }
  grid.innerHTML = results.map(buildProductCard).join("");
  initAddToCartDelegation(grid);
  initScrollReveal();
}

function initShopPage() {
  const grid = document.getElementById("shop-product-grid");
  if (!grid) return;

  renderCategoryFilters();

  // Pre-fill from URL query params (?search=... or ?category=...)
  const urlSearch = getShopQueryParam("search");
  const urlCategory = getShopQueryParam("category");
  if (urlSearch) {
    activeFilters.search = urlSearch;
    document.getElementById("shop-search-input").value = urlSearch;
  }
  if (urlCategory) {
    activeFilters.categories = [urlCategory];
    setTimeout(() => {
      const cb = document.querySelector(`.category-checkbox[value="${CSS.escape(urlCategory)}"]`);
      if (cb) cb.checked = true;
    }, 0);
  }

  document.getElementById("shop-search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    activeFilters.search = document.getElementById("shop-search-input").value.trim();
    applyFilters();
  });
  document.getElementById("shop-search-input").addEventListener("input", (e) => {
    activeFilters.search = e.target.value.trim();
    applyFilters();
  });

  document.getElementById("sort-select").addEventListener("change", (e) => {
    activeFilters.sort = e.target.value;
    applyFilters();
  });

  document.getElementById("min-price").addEventListener("input", (e) => {
    activeFilters.minPrice = e.target.value === "" ? null : parseFloat(e.target.value);
    applyFilters();
  });
  document.getElementById("max-price").addEventListener("input", (e) => {
    activeFilters.maxPrice = e.target.value === "" ? null : parseFloat(e.target.value);
    applyFilters();
  });

  document.getElementById("clear-filters").addEventListener("click", () => {
    activeFilters = { search: "", categories: [], minPrice: null, maxPrice: null, sort: "newest" };
    document.getElementById("shop-search-input").value = "";
    document.getElementById("min-price").value = "";
    document.getElementById("max-price").value = "";
    document.getElementById("sort-select").value = "newest";
    document.querySelectorAll(".category-checkbox").forEach(cb => cb.checked = false);
    applyFilters();
  });

  applyFilters();
}

function getShopQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

document.addEventListener("DOMContentLoaded", initShopPage);
