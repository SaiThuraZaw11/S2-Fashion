/* ==========================================================================
   S2 FASHION — Checkout Script
   Renders the order summary from the cart, validates the customer-info
   form, and on submit creates a DEMO order stored in localStorage
   (no real backend/payment exists yet — see comment at bottom).
   ========================================================================== */

const ORDERS_KEY = "s2fashion_orders";

function renderCheckoutSummary() {
  const list = document.getElementById("order-summary-list");
  if (!list) return;

  const items = Cart.getItems();
  if (!items.length) {
    window.location.href = "cart.html";
    return;
  }

  list.innerHTML = items.map(item => `
    <div class="os-item">
      <img src="${item.image}" alt="${item.name}">
      <div style="flex:1;">
        <div class="name" style="font-size:0.9rem;">${item.name}</div>
        <div class="qty-badge">${item.size || ""} ${item.color ? "· color" : ""} · Qty ${item.qty}</div>
      </div>
      <div>$${(item.price * item.qty).toFixed(2)}</div>
    </div>
  `).join("");

  document.getElementById("co-subtotal").textContent = `$${Cart.subtotal().toFixed(2)}`;
  document.getElementById("co-shipping").textContent = Cart.shippingFee() === 0 ? "Free" : `$${Cart.shippingFee().toFixed(2)}`;
  document.getElementById("co-total").textContent = `$${Cart.total().toFixed(2)}`;
}

function wirePaymentOptions() {
  document.querySelectorAll(".payment-option").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".payment-option").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      opt.querySelector("input[type='radio']").checked = true;
    });
  });
}

function validateField(input) {
  const group = input.closest(".form-group");
  const value = input.value.trim();
  let valid = true;

  if (input.hasAttribute("required") && !value) valid = false;
  if (input.type === "tel" && value && !/^[0-9+\-\s()]{6,}$/.test(value)) valid = false;

  group.classList.toggle("error", !valid);
  return valid;
}

function generateOrderId() {
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `S2-${Date.now().toString().slice(-6)}-${rand}`;
}

function placeOrder(e) {
  e.preventDefault();
  const form = e.target;
  const requiredFields = form.querySelectorAll("[required]");
  let allValid = true;
  requiredFields.forEach(field => {
    if (!validateField(field)) allValid = false;
  });

  if (!allValid) {
    showToast("Please fill in all required fields");
    return;
  }

  const paymentMethod = form.querySelector("input[name='payment']:checked")?.value || "Cash on Delivery";

  const order = {
    orderId: generateOrderId(),
    date: new Date().toISOString(),
    customer: {
      fullName: form.fullName.value.trim(),
      phone: form.phone.value.trim(),
      address: form.address.value.trim(),
      city: form.city.value.trim(),
      country: form.country.value
    },
    paymentMethod,
    items: Cart.getItems(),
    subtotal: Cart.subtotal(),
    shipping: Cart.shippingFee(),
    total: Cart.total()
  };

  // Save demo order to localStorage order history.
  try {
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    localStorage.setItem("s2fashion_last_order", JSON.stringify(order));
  } catch (err) {
    console.error("Order save error:", err);
  }

  Cart.clear();
  window.location.href = "order-confirmation.html";
}

function initCheckoutPage() {
  const form = document.getElementById("checkout-form");
  if (!form) return;

  renderCheckoutSummary();
  wirePaymentOptions();

  form.querySelectorAll("input[required], select[required]").forEach(field => {
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", placeOrder);
}

document.addEventListener("DOMContentLoaded", initCheckoutPage);

/* --------------------------------------------------------------------------
   FUTURE BACKEND / PAYMENT INTEGRATION
   This is a static-site demo: "Place Order" writes the order object to
   localStorage only. To connect a real backend:
     1. Replace the localStorage write above with:
          await fetch("https://api.yourdomain.com/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
          });
     2. Replace the Cash on Delivery / Bank Transfer radio inputs with a
        real payment gateway element (e.g. Stripe Elements) inside the
        `.payment-options` block in checkout.html — that block is the
        clearly-marked placeholder for it.
     3. Move order-id generation server-side so IDs are guaranteed unique.
   -------------------------------------------------------------------------- */
