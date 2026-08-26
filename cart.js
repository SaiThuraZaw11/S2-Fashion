/* ==========================================================================
   S2 FASHION — Cart Module
   Handles all localStorage cart read/write logic. Loaded on every page so
   the header cart-count badge always reflects the current cart.
   Cart item shape:
   { id, name, price, image, category, size, color, qty }
   ========================================================================== */

const CART_KEY = "s2fashion_cart";
const SHIPPING_FLAT_FEE = 4.99;
const FREE_SHIPPING_THRESHOLD = 100;

const Cart = {
  /** Read the cart array from localStorage (never throws). */
  getItems() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Cart read error:", e);
      return [];
    }
  },

  /** Persist the cart array to localStorage. */
  saveItems(items) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Cart save error:", e);
    }
  },

  /** Build a stable line-key so the same product+size+color stacks quantity. */
  _lineKey(item) {
    return [item.id, item.size || "", item.color || ""].join("|");
  },

  /** Add a product (or increase quantity of an existing matching line). */
  addItem(product, options = {}) {
    const items = this.getItems();
    const size = options.size || (product.sizes ? product.sizes[0] : "One Size");
    const color = options.color || (product.colors ? product.colors[0] : "");
    const qty = options.qty || 1;

    const newLine = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size,
      color,
      qty
    };

    const existing = items.find(i => this._lineKey(i) === this._lineKey(newLine));
    if (existing) {
      existing.qty += qty;
    } else {
      items.push(newLine);
    }
    this.saveItems(items);
    this.updateCartBadge();
    return items;
  },

  /** Remove a single line item by its line key. */
  removeItem(lineKey) {
    let items = this.getItems();
    items = items.filter(i => this._lineKey(i) !== lineKey);
    this.saveItems(items);
    this.updateCartBadge();
    return items;
  },

  /** Set exact quantity for a line item (removes it if qty <= 0). */
  setQty(lineKey, qty) {
    let items = this.getItems();
    const line = items.find(i => this._lineKey(i) === lineKey);
    if (line) {
      line.qty = qty;
      if (line.qty <= 0) {
        items = items.filter(i => this._lineKey(i) !== lineKey);
      }
    }
    this.saveItems(items);
    this.updateCartBadge();
    return items;
  },

  /** Total number of individual units in the cart (for the header badge). */
  totalCount() {
    return this.getItems().reduce((sum, i) => sum + i.qty, 0);
  },

  /** Cart subtotal in dollars. */
  subtotal() {
    return this.getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  /** Shipping fee: flat fee, free above the threshold, free for an empty cart. */
  shippingFee() {
    const items = this.getItems();
    if (items.length === 0) return 0;
    return this.subtotal() >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_FEE;
  },

  /** Grand total including shipping. */
  total() {
    return this.subtotal() + this.shippingFee();
  },

  /** Empty the cart completely (used after a successful order). */
  clear() {
    this.saveItems([]);
    this.updateCartBadge();
  },

  /** Update every cart-count badge present on the current page. */
  updateCartBadge() {
    const count = this.totalCount();
    document.querySelectorAll(".cart-count").forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? "flex" : "none";
    });
  }
};

// Keep the badge accurate as soon as the DOM is ready on every page.
document.addEventListener("DOMContentLoaded", () => Cart.updateCartBadge());

/* --------------------------------------------------------------------------
   FUTURE BACKEND INTEGRATION
   To move cart persistence server-side, replace the getItems/saveItems
   bodies with fetch() calls to a cart API (e.g. GET/PUT /api/cart) keyed by
   a session or customer id, keeping the same method names so app.js,
   product.js and checkout.html require no changes.
   -------------------------------------------------------------------------- */
