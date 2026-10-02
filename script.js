
"use strict";

const WHATSAPP_NUMBER = "923157540218";
const STORE_EMAIL = "uswanazish311@gmail.com";
const CURRENCY = "Rs. ";

const starterProducts = [
  {
    id: 1, name: "Ruby Red Printed Lawn", category: "ladies",
    fabric: "Printed Lawn", color: "Ruby Red", hex: "#8b182c",
    price: 2850, stock: 12, tag: "BESTSELLER",
    description: "A rich red-inspired print for a graceful look.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 2, name: "Ivory Classic Cotton", category: "ladies",
    fabric: "Cotton", color: "Ivory White", hex: "#e8ddc5",
    price: 2450, stock: 10, tag: "TIMELESS",
    description: "A soft neutral shade for everyday elegance.",
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 3, name: "Emerald Green Lawn", category: "ladies",
    fabric: "Printed Lawn", color: "Emerald Green", hex: "#087453",
    price: 3250, stock: 8, tag: "NEW ARRIVAL",
    description: "A jewel-toned colour with a refined feel.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 4, name: "Blush Pink Cotton", category: "ladies",
    fabric: "Cotton", color: "Blush Pink", hex: "#dca3ad",
    price: 2150, stock: 15, tag: "SOFT TONES",
    description: "A delicate pink-inspired colour for your designs.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 5, name: "Midnight Black Wash & Wear", category: "gents",
    fabric: "Wash & Wear", color: "Midnight Black", hex: "#242326",
    price: 2950, stock: 9, tag: "POPULAR",
    description: "A versatile dark shade with a classic look.",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 6, name: "Royal Blue Cotton", category: "gents",
    fabric: "Cotton", color: "Royal Blue", hex: "#234c9b",
    price: 2550, stock: 11, tag: "CLASSIC",
    description: "A deep blue-inspired shade for many occasions.",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 7, name: "Sand Beige Wash & Wear", category: "gents",
    fabric: "Wash & Wear", color: "Sand Beige", hex: "#c6ad87",
    price: 2750, stock: 7, tag: "REFINED",
    description: "A warm neutral colour with understated style.",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 8, name: "Charcoal Grey Cotton", category: "gents",
    fabric: "Cotton", color: "Charcoal Grey", hex: "#55565b",
    price: 2350, stock: 13, tag: "EVERGREEN",
    description: "A modern grey shade for a versatile wardrobe.",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 9, name: "Ocean Blue Printed Lawn", category: "ladies",
    fabric: "Digital Print Lawn", color: "Ocean Blue", hex: "#257b9a",
    price: 3100, stock: 6, tag: "NEW",
    description: "Fresh blue-inspired colour and print styling.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 10, name: "Maroon Cotton", category: "gents",
    fabric: "Cotton", color: "Maroon", hex: "#681d32",
    price: 2650, stock: 8, tag: "SIGNATURE",
    description: "A deep maroon-inspired classic colour.",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 11, name: "Champagne Beige Lawn", category: "ladies",
    fabric: "Printed Lawn", color: "Champagne Beige", hex: "#d6c3a1",
    price: 2850, stock: 9, tag: "ELEGANT",
    description: "A subtle beige-inspired shade for timeless designs.",
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 12, name: "Olive Green Wash & Wear", category: "gents",
    fabric: "Wash & Wear", color: "Olive Green", hex: "#68704a",
    price: 2800, stock: 10, tag: "CLASSIC",
    description: "An earthy green-inspired shade with a refined look.",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=85"
  }
];

const $ = selector => document.querySelector(selector);

function readStore(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

function saveStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    showToast("Browser storage unavailable. Changes may not persist.");
    return false;
  }
}

let products = readStore("ilfs_products", null);
if (!Array.isArray(products) || products.length === 0) {
  products = starterProducts.map(p => ({ ...p }));
}

let cart = readStore("ilfs_cart", []);
let wishlist = readStore("ilfs_wishlist", []);
let orders = readStore("ilfs_orders", []);
let activeFilter = "all";
let toastTimer;

const productGrid = $("#productGrid");
const overlay = $("#overlay");
const cartDrawer = $("#cartDrawer");
const wishlistDrawer = $("#wishlistDrawer");
const checkoutModal = $("#checkoutModal");
const trackModal = $("#trackModal");
const adminModal = $("#adminModal");

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function money(value) {
  return CURRENCY + Number(value || 0).toLocaleString("en-PK");
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function persistCommerce() {
  saveStore("ilfs_cart", cart);
  saveStore("ilfs_wishlist", wishlist);
  saveStore("ilfs_orders", orders);
  updateHeaderCounts();
}

function updateHeaderCounts() {
  $("#cartCount").textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  $("#wishlistCount").textContent = wishlist.length;
}

function validProduct(product) {
  return product &&
    Number.isFinite(Number(product.id)) &&
    typeof product.name === "string" &&
    Number.isFinite(Number(product.price)) &&
    Number(product.price) > 0 &&
    typeof product.image === "string";
}

function getProduct(id) {
  return products.find(product => Number(product.id) === Number(id));
}

function populateColorFilter() {
  const select = $("#colorFilter");
  const previous = select.value;
  const colors = [...new Set(products.map(p => p.color).filter(Boolean))].sort();

  select.innerHTML = '<option value="all">All colours</option>' +
    colors.map(color =>
      `<option value="${escapeHTML(color)}">${escapeHTML(color)}</option>`
    ).join("");

  if (colors.includes(previous)) select.value = previous;
}

function renderProducts() {
  const query = $("#searchInput").value.trim().toLowerCase();
  const category = $("#categoryFilter").value;
  const fabric = $("#fabricFilter").value;
  const color = $("#colorFilter").value;
  const sort = $("#sortFilter").value;

  let visible = products.filter(p => {
    const matchesQuery = [
      p.name, p.color, p.fabric, p.category, p.description
    ].join(" ").toLowerCase().includes(query);

    return matchesQuery &&
      (category === "all" || p.category === category) &&
      (fabric === "all" || p.fabric === fabric) &&
      (color === "all" || p.color === color);
  });

  if (sort === "low") visible.sort((a, b) => a.price - b.price);
  if (sort === "high") visible.sort((a, b) => b.price - a.price);
  if (sort === "az") visible.sort((a, b) => a.name.localeCompare(b.name));

  $("#resultCount").textContent =
    `${visible.length} fabric${visible.length === 1 ? "" : "s"} found`;

  if (!visible.length) {
    productGrid.innerHTML =
      '<div class="empty-state">No matching fabrics found. Try clearing your filters.</div>';
    return;
  }

  productGrid.innerHTML = visible.map(p => {
    const isSaved = wishlist.includes(Number(p.id));
    const stock = Math.max(0, Number(p.stock) || 0);

    return `
      <article class="product-card">
        <div class="product-image">
          <img src="${escapeHTML(p.image)}"
               alt="${escapeHTML(p.color)} ${escapeHTML(p.fabric)} fabric"
               loading="lazy">
          <span class="product-tag">${escapeHTML(p.tag || "CURATED")}</span>
          <button class="wish-btn ${isSaved ? "saved" : ""}"
                  data-wish="${Number(p.id)}"
                  aria-label="${isSaved ? "Remove from" : "Add to"} wishlist"
                  aria-pressed="${isSaved}">${isSaved ? "♥" : "♡"}</button>
        </div>
        <div class="product-info">
          <span class="product-category">
            ${p.category === "ladies" ? "Ladies" : "Gents"} · ${escapeHTML(p.fabric)}
          </span>
          <h3>${escapeHTML(p.name)}</h3>
          <p class="product-description">${escapeHTML(p.description || "")}</p>
          <div class="swatch-row">
            <span class="swatch" style="background:${safeHex(p.hex)}"></span>
            <span>${escapeHTML(p.color)}</span>
            <span>· ${stock > 0 ? "Available on request" : "Availability to confirm"}</span>
          </div>
          <div class="product-bottom">
            <span class="product-price">${money(p.price)}<small>Sample listed price</small></span>
            <div class="product-actions">
              <button class="add-btn" data-add="${Number(p.id)}" ${stock < 1 ? "disabled" : ""}>ADD +</button>
              <button class="buy-btn" data-buy="${Number(p.id)}">BUY NOW ↗</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function safeHex(value) {
  return /^#[0-9a-f]{6}$/i.test(String(value || "")) ? value : "#b49a6a";
}

["searchInput", "categoryFilter", "fabricFilter", "colorFilter", "sortFilter"]
  .forEach(id => $("#" + id).addEventListener(
    id === "searchInput" ? "input" : "change", renderProducts
  ));

$("#clearFilters").addEventListener("click", () => {
  $("#searchInput").value = "";
  $("#categoryFilter").value = "all";
  $("#fabricFilter").value = "all";
  $("#colorFilter").value = "all";
  $("#sortFilter").value = "featured";
  renderProducts();
});

productGrid.addEventListener("click", event => {
  const wishButton = event.target.closest("[data-wish]");
  const addButton = event.target.closest("[data-add]");
  const buyButton = event.target.closest("[data-buy]");

  if (wishButton) toggleWishlist(Number(wishButton.dataset.wish));
  if (addButton) addToCart(Number(addButton.dataset.add), 1);
  if (buyButton) {
    const id = Number(buyButton.dataset.buy);
    const product = getProduct(id);
    if (product && Number(product.stock) > 0) {
      addToCart(id, 1, false);
      openCheckout();
    } else {
      showToast("Please contact us to confirm availability.");
    }
  }
});

function toggleWishlist(id) {
  if (!getProduct(id)) return;

  wishlist = wishlist.includes(id)
    ? wishlist.filter(item => item !== id)
    : [...wishlist, id];

  persistCommerce();
  renderProducts();
  renderWishlist();
  showToast(wishlist.includes(id) ? "Added to your wishlist." : "Removed from wishlist.");
}

function addToCart(id, qty = 1, notify = true) {
  const product = getProduct(id);
  if (!product) return;

  if (Number(product.stock) < 1) {
    showToast("Please contact us to confirm availability.");
    return;
  }

  const existing = cart.find(item => item.id === id);
  const nextQty = (existing ? existing.qty : 0) + qty;

  if (nextQty > Number(product.stock)) {
    showToast("Requested quantity exceeds the demo stock.");
    return;
  }

  if (existing) existing.qty = nextQty;
  else cart.push({ id, qty });

  persistCommerce();
  renderCart();

  if (notify) showToast("Added to your shopping bag.");
}

function changeQty(id, delta) {
  const item = cart.find(row => row.id === id);
  const product = getProduct(id);
  if (!item || !product) return;

  const next = item.qty + delta;
  if (next <= 0) {
    cart = cart.filter(row => row.id !== id);
  } else if (next > Number(product.stock)) {
    showToast("Requested quantity exceeds the demo stock.");
    return;
  } else {
    item.qty = next;
  }

  persistCommerce();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  persistCommerce();
  renderCart();
  showToast("Item removed from bag.");
}

function cartTotal() {
  return cart.reduce((total, item) => {
    const p = getProduct(item.id);
    return total + (p ? Number(p.price) * item.qty : 0);
  }, 0);
}

function renderCart() {
  cart = cart.filter(item => getProduct(item.id) && item.qty > 0);

  if (!cart.length) {
    $("#cartItems").innerHTML =
      '<div class="empty-state">Your bag is waiting for something beautiful.</div>';
  } else {
    $("#cartItems").innerHTML = cart.map(item => {
      const p = getProduct(item.id);
      return `
        <div class="cart-item">
          <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}">
          <div>
            <h3>${escapeHTML(p.name)}</h3>
            <p>${money(p.price * item.qty)}</p>
            <span class="muted">${escapeHTML(p.color)} · ${escapeHTML(p.fabric)}</span>
            <div class="item-controls">
              <button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button>
              <span class="qty">${item.qty}</span>
              <button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button>
              <button class="remove-btn" data-remove="${p.id}">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  $("#cartTotal").textContent = money(cartTotal());
  persistCommerce();
}

$("#cartItems").addEventListener("click", event => {
  const qty = event.target.closest("[data-qty]");
  const remove = event.target.closest("[data-remove]");
  if (qty) changeQty(Number(qty.dataset.qty), Number(qty.dataset.delta));
  if (remove) removeFromCart(Number(remove.dataset.remove));
});

function renderWishlist() {
  const saved = wishlist.map(getProduct).filter(Boolean);

  $("#wishlistItems").innerHTML = saved.length ? saved.map(p => `
    <div class="wish-row">
      <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}">
      <div>
        <h3>${escapeHTML(p.name)}</h3>
        <p>${money(p.price)}</p>
        <button data-wish-add="${p.id}">Add to bag</button>
        <button data-wish-remove="${p.id}">Remove</button>
      </div>
    </div>
  `).join("") : '<div class="empty-state">Your wishlist is empty.</div>';
}

$("#wishlistItems").addEventListener("click", event => {
  const add = event.target.closest("[data-wish-add]");
  const remove = event.target.closest("[data-wish-remove]");

  if (add) addToCart(Number(add.dataset.wishAdd));
  if (remove) {
    wishlist = wishlist.filter(id => id !== Number(remove.dataset.wishRemove));
    persistCommerce();
    renderWishlist();
    renderProducts();
  }
});

function updateOverlay() {
  const anyOpen = document.querySelector(".drawer.open, .modal.open");
  overlay.classList.toggle("open", Boolean(anyOpen));
  document.body.classList.toggle("locked", Boolean(anyOpen));
}

function openDrawer(drawer) {
  closePanels(false);
  drawer.classList.add("open");
  updateOverlay();
}

function openModal(modal) {
  closePanels(false);
  modal.classList.add("open");
  updateOverlay();
}

function closePanels(refresh = true) {
  document.querySelectorAll(".drawer.open, .modal.open").forEach(panel => {
    panel.classList.remove("open");
  });
  overlay.classList.remove("open");
  document.body.classList.remove("locked");
  if (refresh) updateOverlay();
}

$("#cartOpen").addEventListener("click", () => {
  renderCart();
  openDrawer(cartDrawer);
});

$("#wishlistOpen").addEventListener("click", () => {
  renderWishlist();
  openDrawer(wishlistDrawer);
});

$("#checkoutOpen").addEventListener("click", openCheckout);
$("#trackOpen").addEventListener("click", () => openModal(trackModal));
$("#adminOpen").addEventListener("click", () => {
  renderAdminOrders();
  openModal(adminModal);
});

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => closePanels());
});
overlay.addEventListener("click", () => closePanels());

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closePanels();
});

function openCheckout() {
  if (!cart.length) {
    showToast("Add a fabric to your bag first.");
    return;
  }
  renderCheckoutSummary();
  openModal(checkoutModal);
}

function renderCheckoutSummary() {
  $("#checkoutSummary").innerHTML = `
    ${cart.map(item => {
      const p = getProduct(item.id);
      return `<div><span>${escapeHTML(p.name)} × ${item.qty}</span><strong>${money(p.price * item.qty)}</strong></div>`;
    }).join("")}
    <div><span>Estimated total</span><strong>${money(cartTotal())}</strong></div>
  `;
}

function makeOrderReference() {
  return "ILFS-" + Date.now().toString(36).toUpperCase();
}

function buildOrderMessage(order) {
  const items = order.items.map(item =>
    `• ${item.name} | ${item.color} | ${item.fabric} | Qty: ${item.qty} | ${money(item.price * item.qty)}`
  ).join("\n");

  return [
    "Assalam-o-Alaikum! I would like to submit an order request.",
    "",
    "Store: Immersive Luxury Fashion Store",
    `Order reference: ${order.reference}`,
    `Name: ${order.customer.name}`,
    `Phone: ${order.customer.phone}`,
    `Delivery address: ${order.customer.address}`,
    `Payment preference: ${order.payment}`,
    `Notes: ${order.notes || "None"}`,
    "",
    "Items:",
    items,
    "",
    `Estimated total: ${money(order.total)}`,
    "",
    "Please confirm availability, delivery charges and final order details."
  ].join("\n");
}

$("#checkoutForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!cart.length) {
    showToast("Your shopping bag is empty.");
    closePanels();
    return;
  }

  const form = new FormData(event.currentTarget);
  const snapshot = cart.map(item => {
    const p = getProduct(item.id);
    return p ? {
      id: p.id, name: p.name, color: p.color,
      fabric: p.fabric, price: Number(p.price), qty: item.qty
    } : null;
  }).filter(Boolean);

  if (!snapshot.length) {
    showToast("Your bag has no valid products.");
    return;
  }

  const order = {
    reference: makeOrderReference(),
    createdAt: new Date().toISOString(),
    status: "Request prepared — awaiting store confirmation",
    customer: {
      name: String(form.get("customerName") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      address: String(form.get("address") || "").trim()
    },
    payment: String(form.get("payment") || "Cash on Delivery"),
    notes: String(form.get("notes") || "").trim(),
    items: snapshot,
    total: snapshot.reduce((sum, item) => sum + item.price * item.qty, 0)
  };

  if (!order.customer.name || !order.customer.phone || !order.customer.address) {
    showToast("Please complete the required details.");
    return;
  }

  orders.unshift(order);
  saveStore("ilfs_orders", orders);
  renderAdminOrders();

  const message = buildOrderMessage(order);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const emailURL = `mailto:${STORE_EMAIL}?subject=${encodeURIComponent("Fabric order " + order.reference)}&body=${encodeURIComponent(message)}`;

  // Offer a choice after saving the demo request in this browser.
  $("#checkoutSummary").innerHTML = `
    <p>Your order reference:</p>
    <h3 style="color:var(--gold);margin:8px 0">${escapeHTML(order.reference)}</h3>
    <p class="muted">Choose how to send your order request.
