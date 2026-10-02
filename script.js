
const WHATSAPP_NUMBER = "923157540218";
const STORE_EMAIL = "uswanazish311@gmail.com";

const products = [
  {
    id: 1,
    name: "Ruby Red Printed Lawn",
    category: "ladies",
    fabric: "Printed Lawn",
    color: "Ruby Red",
    price: 2850,
    tag: "BESTSELLER",
    description: "Elegant red tones for a statement look.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 2,
    name: "Ivory Classic Cotton",
    category: "ladies",
    fabric: "Premium Cotton",
    color: "Ivory White",
    price: 2450,
    tag: "TIMELESS",
    description: "A graceful neutral shade for everyday wear.",
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 3,
    name: "Emerald Green Lawn",
    category: "ladies",
    fabric: "Printed Lawn",
    color: "Emerald Green",
    price: 3250,
    tag: "NEW ARRIVAL",
    description: "Rich green-inspired elegance and charm.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 4,
    name: "Blush Pink Cotton",
    category: "ladies",
    fabric: "Soft Cotton",
    color: "Blush Pink",
    price: 2150,
    tag: "SOFT TONES",
    description: "A delicate colour for a refined style.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 5,
    name: "Midnight Black Wash & Wear",
    category: "gents",
    fabric: "Wash & Wear",
    color: "Midnight Black",
    price: 2950,
    tag: "POPULAR",
    description: "A classic dark shade with a polished feel.",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 6,
    name: "Royal Blue Cotton",
    category: "gents",
    fabric: "Premium Cotton",
    color: "Royal Blue",
    price: 2550,
    tag: "CLASSIC",
    description: "Deep blue-inspired style for any occasion.",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 7,
    name: "Sand Beige Wash & Wear",
    category: "gents",
    fabric: "Wash & Wear",
    color: "Sand Beige",
    price: 2750,
    tag: "REFINED",
    description: "An understated neutral colour choice.",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 8,
    name: "Charcoal Grey Cotton",
    category: "gents",
    fabric: "Premium Cotton",
    color: "Charcoal Grey",
    price: 2350,
    tag: "EVERGREEN",
    description: "A versatile grey shade with modern appeal.",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=85"
  }
];

const productGrid = document.getElementById("productGrid");
const sortSelect = document.getElementById("sortProducts");
const filterButtons = document.querySelectorAll(".filter");

let currentFilter = "all";

function formatPrice(price) {
  return "Rs. " + price.toLocaleString("en-PK");
}

function renderProducts() {
  let visibleProducts = products.filter(product => {
    return currentFilter === "all" ||
      product.category === currentFilter;
  });

  if (sortSelect.value === "low") {
    visibleProducts.sort((a, b) => a.price - b.price);
  } else if (sortSelect.value === "high") {
    visibleProducts.sort((a, b) => b.price - a.price);
  }

  if (visibleProducts.length === 0) {
    productGrid.innerHTML =
      '<p class="empty-message">No products found.</p>';
    return;
  }

  productGrid.innerHTML = visibleProducts.map(product => `
    <article class="product-card">
      <div class="product-image">
        <img
          src="${product.image}"
          alt="${product.color} ${product.fabric} unstitched fabric"
          loading="lazy"
        >
        <span class="product-tag">${product.tag}</span>
      </div>

      <div class="product-info">
        <span class="product-category">
          ${product.category === "ladies" ? "Ladies Collection" : "Gents Collection"}
          · ${product.color}
        </span>

        <h3>${product.name}</h3>

        <p class="product-description">
          ${product.description}
        </p>

        <div class="product-bottom">
          <span class="product-price">${formatPrice(product.price)}</span>

          <button class="buy-btn" data-buy="${product.id}">
            BUY NOW ↗
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(item => {
      item.classList.toggle("active", item === button);
    });

    renderProducts();
  });
});

sortSelect.addEventListener("change", renderProducts);

productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-buy]");

  if (!button) return;

  const product = products.find(
    item => item.id === Number(button.dataset.buy)
  );

  if (!product) return;

  const message =
    `Assalam-o-Alaikum! I want to order this fabric from Immersive Luxury Fashion Store.\n\n` +
    `Product: ${product.name}\n` +
    `Category: ${product.category}\n` +
    `Fabric: ${product.fabric}\n` +
    `Colour: ${product.color}\n` +
    `Price: ${formatPrice(product.price)}\n\n` +
    `Please confirm availability, fabric details and delivery charges.`;

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener");
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Render the collection
renderProducts();
            
