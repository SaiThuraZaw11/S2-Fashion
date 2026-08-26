/* ==========================================================================
   S2 FASHION — Cart Page Script
   Renders the cart table + order summary on cart.html using Cart (cart.js).
   ========================================================================== */

function lineKey(item) {
  return [item.id, item.size || "", item.color || ""].join("|");
}

function renderCartPage() {
  const root = document.getElementById("cart-page-root");
  if (!root) return;

  const items = Cart.getItems();

  if (!items.length) {
    root.innerHTML = `
      <div class="empty-cart reveal in">
        <div class="icon"><i class="fa-solid fa-bag-shopping"></i></div>
        <h3>Your cart is empty</h3>
        <p class="mt-4">Looks like you haven't added anything yet.</p>
        <p class="mt-4"><a class="btn btn-primary" href="shop.html">Continue Shopping</a></p>
      </div>
    `;
    return;
  }

  const rows = items.map(item => `
    <tr class="cart-item" data-key="${lineKey(item)}">
      <td>
        <div class="cart-item-info">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <div class="name">${item.name}</div>
            <div class="meta">Size: ${item.size || "—"} ${item.color ? `· Color: <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${item.color};vertical-align:middle;"></span>` : ""}</div>
          </div>
        </div>
      </td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <div class="cart-qty">
          <button type="button" class="qty-minus" aria-label="Decrease quantity">−</button>
          <input type="number" class="qty-input" value="${item.qty}" min="1" max="10" aria-label="Quantity">
          <button type="button" class="qty-plus" aria-label="Increase quantity">+</button>
        </div>
      </td>
      <td>$${(item.price * item.qty).toFixed(2)}</td>
      <td><button type="button" class="remove-btn" aria-label="Remove ${item.name}"><i class="fa-solid fa-xmark"></i></button></td>
    </tr>
  `).join("");

  root.innerHTML = `
    <div class="cart-layout">
      <div>
        <table class="cart-table">
          <thead>
            <tr><th>Product</th><th>Price</th><th>Quantity</th><th>Total</th><th></th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <p class="mt-4"><a href="shop.html" class="btn btn-outline">← Continue Shopping</a></p>
      </div>
      <aside class="summary-box">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span id="cart-subtotal">$${Cart.subtotal().toFixed(2)}</span></div>
        <div class="summary-row"><span>Shipping</span><span id="cart-shipping">${Cart.shippingFee() === 0 ? "Free" : "$" + Cart.shippingFee().toFixed(2)}</span></div>
        <div class="summary-row total"><span>Total</span><span id="cart-total">$${Cart.total().toFixed(2)}</span></div>
        <a href="checkout.html" class="btn btn-primary btn-block mt-4">Proceed to Checkout</a>
      </aside>
    </div>
  `;

  wireCartRowEvents();
}

function wireCartRowEvents() {
  document.querySelectorAll(".cart-item").forEach(row => {
    const key = row.dataset.key;
    const input = row.querySelector(".qty-input");

    row.querySelector(".qty-minus").addEventListener("click", () => {
      const newQty = Math.max(1, parseInt(input.value, 10) - 1);
      Cart.setQty(key, newQty);
      renderCartPage();
    });
    row.querySelector(".qty-plus").addEventListener("click", () => {
      const newQty = Math.min(10, parseInt(input.value, 10) + 1);
      Cart.setQty(key, newQty);
      renderCartPage();
    });
    input.addEventListener("change", () => {
      const newQty = Math.max(1, Math.min(10, parseInt(input.value, 10) || 1));
      Cart.setQty(key, newQty);
      renderCartPage();
    });
    row.querySelector(".remove-btn").addEventListener("click", () => {
      Cart.removeItem(key);
      showToast("Item removed from cart");
      renderCartPage();
    });
  });
}

document.addEventListener("DOMContentLoaded", renderCartPage);
