const CART_STORAGE_KEY = "medicants-cart";

const readCart = () => {
  try {
    const saved = window.localStorage?.getItem(CART_STORAGE_KEY);
    if (!saved) {
      return [];
    }
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.map((item) => ({
      ...item,
      quantity: Number.parseInt(item.quantity, 10) || 0,
      price: Number.parseFloat(item.price) || 0,
    })).filter((item) => item.quantity > 0);
  } catch {
    return [];
  }
};

const persistCart = (items) => {
  try {
    window.localStorage?.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore persistence issues to avoid blocking UX
  }
};

const parsePriceToNumber = (price) => {
  if (typeof price === "number" && Number.isFinite(price)) {
    return price;
  }
  if (!price) {
    return 0;
  }
  const cleaned = String(price).replace(/[^0-9.,-]/g, "").replace(/,/g, "");
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value || 0);

const getCartCount = (items) => items.reduce((acc, item) => acc + (item.quantity || 0), 0);
const getCartTotal = (items) => items.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0);

const updateCartBadges = () => {
  const items = readCart();
  const count = getCartCount(items);
  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    if (count <= 0) {
      badge.classList.add("hidden");
      badge.textContent = "0";
      return;
    }
    badge.classList.remove("hidden");
    badge.textContent = count > 99 ? "99+" : String(count);
  });
};

const buildWhatsAppLink = (items = readCart(), phone = "5217671029706") => {
  if (!items.length) {
    return `https://wa.me/${phone}?text=${encodeURIComponent("Hola, me interesan estos decants.")}`;
  }

  const total = getCartTotal(items);
  const lines = [
    "Hola, me interesan estos decants:",
    ...items.map(
      (item) =>
        `- ${item.name} (${item.size}) x${item.quantity} - ${formatCurrency(
          item.price * item.quantity,
        )}`,
    ),
    `Total: ${formatCurrency(total)}`,
  ];

  const message = lines.join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

const renderCartPage = () => {
  const container = document.querySelector("[data-cart-page]");
  if (!container) {
    return;
  }

  const items = readCart();
  if (!items.length) {
    container.innerHTML = `
      <div class="flex flex-col gap-4 p-6 text-center">
        <p class="text-base text-text-secondary-light dark:text-text-secondary-dark">Tu carrito está vacío.</p>
        <a href="catalago.html" class="inline-flex h-12 items-center justify-center rounded-lg bg-subtle-light dark:bg-subtle-dark px-6 text-text-light dark:text-text-dark font-bold">
          Ver catálogo
        </a>
      </div>
    `;
    return;
  }

  const total = getCartTotal(items);
  const whatsappLink = buildWhatsAppLink(items);

  container.innerHTML = `
    <div class="flex flex-col gap-4 p-4">
      ${items
        .map(
          (item) => `
            <article class="flex gap-3 rounded-lg border border-subtle-light dark:border-subtle-dark bg-white/70 dark:bg-background-dark/60 p-3" data-product-id="${item.productId}" data-size="${item.size}">
              <div class="w-16 h-16 rounded-md bg-subtle-light dark:bg-subtle-dark overflow-hidden flex items-center justify-center flex-shrink-0">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 space-y-1">
                <h2 class="text-base font-semibold text-text-light dark:text-text-dark leading-tight">${item.name}</h2>
                <p class="text-sm text-subtle-text-light dark:text-subtle-text-dark">${item.size}</p>
                <p class="text-sm text-text-secondary-light dark:text-text-secondary-dark">Precio unitario: ${formatCurrency(item.price)}</p>
                <div class="flex items-center gap-2 pt-2">
                  <button class="w-8 h-8 rounded-full border border-subtle-light dark:border-subtle-dark flex items-center justify-center text-lg" type="button" data-cart-action="decrease">-</button>
                  <input type="number" min="1" value="${item.quantity}" class="w-14 text-center rounded-md border border-subtle-light dark:border-subtle-dark bg-transparent py-1" data-qty-input />
                  <button class="w-8 h-8 rounded-full border border-subtle-light dark:border-subtle-dark flex items-center justify-center text-lg" type="button" data-cart-action="increase">+</button>
                  <button class="ml-2 text-sm text-primary dark:text-accent-dark font-semibold underline" type="button" data-cart-action="remove">Eliminar</button>
                  <span class="ml-auto text-sm font-semibold text-text-light dark:text-text-dark">Subtotal: ${formatCurrency(item.price * item.quantity)}</span>
                </div>
              </div>
            </article>
          `,
        )
        .join("")}
      <div class="rounded-lg border border-subtle-light dark:border-subtle-dark bg-subtle-light/60 dark:bg-subtle-dark/60 p-4 space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-base font-semibold text-text-light dark:text-text-dark">Total</span>
          <span class="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">${formatCurrency(total)}</span>
        </div>
        <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="inline-flex w-full h-12 items-center justify-center rounded-lg bg-primary text-white font-bold text-base gap-2" data-cart-wa-button>
          <span class="material-symbols-outlined">chat</span>
          Hacer mi pedido por WhatsApp
        </a>
      </div>
    </div>
  `;

  // Bind events after rendering
  container.querySelectorAll("[data-cart-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-product-id]");
      if (!card) {
        return;
      }
      const { productId, size } = card.dataset;
      const input = card.querySelector("[data-qty-input]");
      const current = Number.parseInt(input?.value, 10) || 1;

      if (button.dataset.cartAction === "increase") {
        medicantsCart.updateQuantity(productId, size, current + 1);
      } else if (button.dataset.cartAction === "decrease") {
        medicantsCart.updateQuantity(productId, size, Math.max(1, current - 1));
      } else if (button.dataset.cartAction === "remove") {
        medicantsCart.removeItem(productId, size);
      }
    });
  });

  container.querySelectorAll("[data-qty-input]").forEach((input) => {
    input.addEventListener("change", () => {
      const card = input.closest("[data-product-id]");
      if (!card) {
        return;
      }
      const value = Math.max(1, Number.parseInt(input.value, 10) || 1);
      input.value = String(value);
      medicantsCart.updateQuantity(card.dataset.productId, card.dataset.size, value);
    });
  });
};

const refreshCartUI = () => {
  updateCartBadges();
  renderCartPage();
};

const medicantsCart = {
  addItem: ({ productId, name, size, price, quantity = 1, image }) => {
    const priceNumber = parsePriceToNumber(price);
    const items = readCart();
    const existingIndex = items.findIndex((item) => item.productId === productId && item.size === size);

    if (existingIndex >= 0) {
      items[existingIndex].quantity += quantity;
      items[existingIndex].price = priceNumber || items[existingIndex].price;
      items[existingIndex].image = image || items[existingIndex].image;
      items[existingIndex].name = name || items[existingIndex].name;
    } else {
      items.push({
        productId,
        name,
        size,
        price: priceNumber,
        quantity,
        image,
      });
    }

    persistCart(items);
    refreshCartUI();
  },
  updateQuantity: (productId, size, quantity) => {
    const items = readCart().map((item) => {
      if (item.productId === productId && item.size === size) {
        return { ...item, quantity };
      }
      return item;
    }).filter((item) => item.quantity > 0);

    persistCart(items);
    refreshCartUI();
  },
  removeItem: (productId, size) => {
    const items = readCart().filter((item) => !(item.productId === productId && item.size === size));
    persistCart(items);
    refreshCartUI();
  },
  clear: () => {
    persistCart([]);
    refreshCartUI();
  },
  getItems: () => readCart(),
  getTotal: () => getCartTotal(readCart()),
  formatCurrency,
  buildWhatsAppLink,
};

document.addEventListener("DOMContentLoaded", () => {
  refreshCartUI();
});

window.addEventListener("storage", refreshCartUI);

globalThis.medicantsCart = medicantsCart;
