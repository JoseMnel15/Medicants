const API_BASE_URL = "/api";

const staticProducts = [];

let productsReady = null;
let cachedProducts = null;
let activeCategory = "all";

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
      <a href="${href}" class="block no-underline ${product.detail?.comingSoon ? "opacity-75 pointer-events-none" : ""}">
        <div class="flex flex-col text-center relative">
            ${product.detail?.comingSoon ? '<div class="absolute inset-0 z-10 flex items-center justify-center bg-black/20 rounded-lg"><span class="bg-black/70 text-white text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Próximamente</span></div>' : ''}
          <div class="w-full bg-subtle-light/60 dark:bg-subtle-dark/60 rounded-lg flex items-center justify-center p-2 mb-3">
            <div class="w-full bg-center bg-no-repeat aspect-[4/5] bg-cover bg-transparent rounded-md ${product.detail?.comingSoon ? "grayscale" : ""}" role="img" aria-label="${product.alt}" style="background-image: url('${product.image}');"></div>
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
      <a href="${href}" class="block no-underline ${product.detail?.comingSoon ? "opacity-75 pointer-events-none" : ""}">
        <div class="flex flex-col relative">
            ${product.detail?.comingSoon ? '<div class="absolute top-0 right-0 z-10 m-2"><span class="bg-black/70 text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">Próximamente</span></div>' : ''}
          <div class="w-full bg-subtle-light dark:bg-subtle-dark rounded-lg aspect-square mb-2 overflow-hidden">
            <img src="${product.image}" alt="${product.alt}" class="w-full h-full object-contain rounded-lg ${product.detail?.comingSoon ? "grayscale opacity-60" : ""}" />
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

    if (activeCategory !== "all") {
      list = list.filter((product) => (product.category || "").toLowerCase() === activeCategory.toLowerCase());
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
  setupFilters();
  setupCarousel();
});

const setupCarousel = () => {
  const track = document.getElementById("carousel-track");
  const dots = document.getElementById("carousel-dots")?.querySelectorAll("button");
  if (!track || !dots || !dots.length) return;

  let currentSlide = 0;
  const slideCount = dots.length;
  let intervalId = null;

  const update = (index) => {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.remove("bg-white/50");
        dot.classList.add("bg-white", "opacity-100");
      } else {
        dot.classList.add("bg-white/50");
        dot.classList.remove("bg-white", "opacity-100");
      }
    });
  };

  const next = () => {
    update((currentSlide + 1) % slideCount);
  };

  const start = () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(next, 5000);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      update(i);
      start(); // reset timer
    });
  });

  start();
};

const setupFilters = () => {
  const filters = document.getElementById("category-filters");
  if (!filters) return;

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-category]");
    if (!btn) return;

    activeCategory = btn.dataset.category;

    // Visual updates
    filters.querySelectorAll("button").forEach(b => {
      const isSelected = b.dataset.category === activeCategory;
      if (isSelected) {
        // Active state
        b.classList.remove("bg-subtle-light", "dark:bg-subtle-dark", "text-text-light", "dark:text-text-dark", "hover:bg-subtle-text-light/10", "dark:hover:bg-subtle-dark/80");
        b.classList.add("bg-primary", "text-white", "border-primary");
      } else {
        // Inactive state
        b.classList.add("bg-subtle-light", "dark:bg-subtle-dark", "text-text-light", "dark:text-text-dark", "hover:bg-subtle-text-light/10", "dark:hover:bg-subtle-dark/80");
        b.classList.remove("bg-primary", "text-white", "border-primary");
      }
    });

    renderProductLists();
  });
};

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
        (product) => {
          const isComingSoon = product.detail?.comingSoon;
          const href = isComingSoon ? "javascript:void(0)" : product.url || `detalle.html?id=${product.id}`;
          const opacityClass = isComingSoon ? "opacity-60 pointer-events-none grayscale" : "";

          return `
          <a href="${href}" class="flex items-center gap-3 py-2 border-b border-subtle-light dark:border-subtle-dark no-underline ${opacityClass}">
            <div class="w-12 h-12 rounded-md bg-subtle-light dark:bg-subtle-dark overflow-hidden flex items-center justify-center">
              <img src="${product.image}" alt="${product.alt}" class="w-full h-full object-cover ${isComingSoon ? "grayscale" : ""}" />
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-semibold text-text-light dark:text-text-dark">${product.name}</span>
              <span class="text-xs text-subtle-text-light dark:text-subtle-text-dark">${product.brand}</span>
              ${isComingSoon ? '<span class="text-[10px] font-bold bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded w-fit mt-0.5">PRÓXIMAMENTE</span>' : ''}
            </div>
          </a>
        `;
        })
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
