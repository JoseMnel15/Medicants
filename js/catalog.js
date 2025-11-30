const API_BASE_URL = "/api";

const staticProducts = [];

let productsReady = null;
let cachedProducts = null;

const normalizeProduct = (product) => ({
  ...product,
  url: product.url || `detalle.html?id=${product.id}`,
});

const loadProductsFromApi = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("No se pudo cargar desde API");
  }
  const data = await response.json();
  if (!Array.isArray(data) || !data.length) {
    throw new Error("Respuesta de API vacía");
  }
  const normalized = data.map(normalizeProduct);
  cachedProducts = normalized;
  globalThis.products = normalized;
  return normalized;
};

const ensureProducts = async () => {
  if (cachedProducts && cachedProducts.length) {
    return cachedProducts;
  }
  try {
    const data = await loadProductsFromApi();
    return data;
  } catch (err) {
    console.warn("Usando fallback estático de productos:", err.message);
    const fallback =
      (Array.isArray(globalThis.products) && globalThis.products.length && globalThis.products) || [];
    cachedProducts = fallback;
    globalThis.products = fallback;
    return fallback;
  }
};

const variantRenderers = {
  featured: (product) => {
    const href = product.url || `detalle.html?id=${product.id}`;
    return `
      <a href="${href}" class="block no-underline">
        <div class="flex flex-col text-center">
          <div class="w-full bg-subtle-light/60 dark:bg-subtle-dark/60 rounded-lg flex items-center justify-center p-2 mb-3">
            <div class="w-full bg-center bg-no-repeat aspect-[4/5] bg-cover bg-transparent rounded-md" role="img" aria-label="${product.alt}" style="background-image: url('${product.image}');"></div>
          </div>
          <h3 class="text-text-light dark:text-text-dark text-sm font-bold leading-tight">${product.name}</h3>
          <p class="text-subtle-text-light dark:text-subtle-text-dark text-xs font-normal leading-normal">por ${product.brand}</p>
          <p class="text-text-light dark:text-text-dark text-xs font-normal leading-normal mt-1">${product.size}</p>
          <div class="mt-1.5 inline-flex h-6 items-center justify-center rounded-md bg-subtle-light dark:bg-subtle-dark px-2 py-1 text-xs font-medium text-subtle-text-light dark:text-subtle-text-dark mx-auto">${product.category}</div>
        </div>
      </a>
    `;
  },
  catalog: (product) => {
    const href = product.url || `detalle.html?id=${product.id}`;
    return `
      <a href="${href}" class="block no-underline">
        <div class="flex flex-col">
          <div class="w-full bg-subtle-light dark:bg-subtle-dark rounded-lg aspect-square mb-2 overflow-hidden">
            <img src="${product.image}" alt="${product.alt}" class="w-full h-full object-contain rounded-lg" />
          </div>
          <h3 class="text-text-light dark:text-text-dark text-sm font-semibold leading-tight">${product.name}</h3>
          <p class="text-subtle-text-light dark:text-subtle-text-dark text-xs">por ${product.brand}</p>
          <p class="text-text-light dark:text-text-dark text-xs mt-1">${product.size} • ${product.category}</p>
        </div>
      </a>
    `;
  },
};

const syncWhatsAppBubbleAnimation = () => {
  const bubble = document.querySelector(".floating-whatsapp-bubble");
  if (!bubble) {
    return;
  }

  const storageKey = "medicants-whatsapp-cycle-start";
  const cycleDurationMs = 20_000;

  const getStartTimestamp = () => {
    const now = Date.now();
    try {
      const stored = Number(window.localStorage?.getItem(storageKey));
      if (Number.isFinite(stored)) {
        return stored;
      }
      window.localStorage?.setItem(storageKey, String(now));
      return now;
    } catch {
      return now;
    }
  };

  const applyDelay = () => {
    const start = getStartTimestamp();
    const now = Date.now();
    const elapsed = (now - start) % cycleDurationMs;
    bubble.style.animationDelay = `${-elapsed}ms`;
  };

  applyDelay();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      applyDelay();
    }
  });
};

const renderProductLists = async () => {
  const listData = await ensureProducts();

  document.querySelectorAll("[data-product-list]").forEach((container) => {
    const variant = container.dataset.cardVariant || "catalog";
    const renderer = variantRenderers[variant];

    if (!renderer) {
      return;
    }

    let list = [...listData];

    if (container.dataset.productFilter === "featured") {
      list = list.filter((product) => product.featured);
    }

    if (container.dataset.productIds) {
      const ids = container.dataset.productIds.split(",").map((id) => id.trim());
      list = list.filter((product) => ids.includes(product.id));
    }

    const limit = Number.parseInt(container.dataset.limit ?? "", 10);
    if (!Number.isNaN(limit) && limit > 0) {
      list = list.slice(0, limit);
    }

    container.innerHTML = list.map((product) => renderer(product)).join("");
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  productsReady = ensureProducts();
  globalThis.productsReady = productsReady;
  globalThis.fetchProducts = ensureProducts;
  await renderProductLists();
  syncWhatsAppBubbleAnimation();
  setupSearch();
});

const setupSearch = () => {
  const toggleButtons = document.querySelectorAll("[data-search-toggle]");
  const overlay = document.querySelector("[data-search-overlay]");
  const panel = document.querySelector("[data-search-panel]");
  const input = document.querySelector("[data-search-input]");
  const closeBtn = document.querySelector("[data-search-close]");
  const resultsContainer = document.querySelector("[data-search-results]");

  if (!toggleButtons.length || !overlay || !panel || !input || !resultsContainer) {
    return;
  }

  const open = () => {
    panel.classList.remove("hidden");
    overlay?.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    input.focus();
    renderResults("");
  };

  const close = () => {
    panel.classList.add("hidden");
    overlay?.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    input.value = "";
    renderResults("");
  };

  const renderResults = (query) => {
    const normalized = query.trim().toLowerCase();
    let list = globalThis.products || [];

    if (normalized) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(normalized) ||
          p.brand.toLowerCase().includes(normalized),
      );
    }

    if (!list.length) {
      resultsContainer.innerHTML = `
        <div class="text-center text-sm text-subtle-text-light dark:text-subtle-text-dark py-4">
          No encontramos coincidencias.
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = list
      .map(
        (product) => `
          <a href="${product.url}" class="flex items-center gap-3 py-2 border-b border-subtle-light dark:border-subtle-dark no-underline">
            <div class="w-12 h-12 rounded-md bg-subtle-light dark:bg-subtle-dark overflow-hidden flex items-center justify-center">
              <img src="${product.image}" alt="${product.alt}" class="w-full h-full object-cover" />
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-semibold text-text-light dark:text-text-dark">${product.name}</span>
              <span class="text-xs text-subtle-text-light dark:text-subtle-text-dark">${product.brand}</span>
            </div>
          </a>
        `,
      )
      .join("");
  };

  toggleButtons.forEach((btn) => btn.addEventListener("click", open));
  overlay?.addEventListener("click", close);
  closeBtn?.addEventListener("click", close);
  input.addEventListener("input", (e) => {
    renderResults(e.target.value);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      close();
    }
  });
};
