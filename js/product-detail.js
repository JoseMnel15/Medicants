const detailContainer = document.querySelector("[data-product-detail]");

const renderMissingProduct = () => {
  if (!detailContainer) {
    return;
  }

  detailContainer.innerHTML = `
    <div class="flex flex-col gap-4 p-6 text-center">
      <p class="text-base text-text-secondary-light dark:text-text-secondary-dark">
        No pudimos encontrar este producto.
      </p>
      <a href="catalago.html" class="inline-flex h-12 items-center justify-center rounded-lg bg-subtle-light dark:bg-subtle-dark px-6 text-text-light dark:text-text-dark font-bold">
        Volver al catálogo
      </a>
    </div>
  `;
};

const buildPriceOptions = (options = []) => {
  if (!options.length) {
    return "";
  }

  return `
    <section class="space-y-3">
      <h3 class="text-lg font-bold text-center">Elige tu presentación</h3>
      <div class="grid grid-cols-3 gap-3" data-price-options>
        ${options
          .map(
            (option, index) => `
              <button class="flex flex-col items-center justify-center gap-1 text-center rounded-lg border border-subtle-light dark:border-subtle-dark bg-white/80 dark:bg-background-dark/50 px-2 py-3 transition focus:outline-none focus:ring-2 focus:ring-primary" type="button" data-option-index="${index}">
                <span class="font-bold text-text-primary-light dark:text-text-primary-dark text-sm sm:text-base">${option.size}</span>
                <span class="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark">${option.price}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
};

const buildCartControls = () => `
  <section class="space-y-3" data-cart-controls>
    <div class="flex items-center justify-between rounded-lg border border-subtle-light dark:border-subtle-dark px-3 py-2 bg-white/70 dark:bg-background-dark/60">
      <span class="text-sm font-semibold text-text-light dark:text-text-dark">Cantidad</span>
      <div class="flex items-center gap-2">
        <button class="w-9 h-9 rounded-full border border-subtle-light dark:border-subtle-dark flex items-center justify-center text-lg" type="button" data-qty-decrease>-</button>
        <input type="number" min="1" value="1" class="w-14 text-center rounded-md border border-subtle-light dark:border-subtle-dark bg-transparent py-1" data-qty-input />
        <button class="w-9 h-9 rounded-full border border-subtle-light dark:border-subtle-dark flex items-center justify-center text-lg" type="button" data-qty-increase>+</button>
      </div>
    </div>
    <button class="w-full h-12 flex items-center justify-center rounded-lg bg-primary text-white font-bold disabled:opacity-60 disabled:cursor-not-allowed gap-2" type="button" data-add-to-cart disabled>
      Selecciona una presentación
    </button>
    <p class="text-xs text-center text-subtle-text-light dark:text-subtle-text-dark" data-cart-hint>Elige el tamaño y cantidad deseada.</p>
  </section>
`;

const buildNotes = (notes) => {
  if (!notes) {
    return "";
  }

  const rows = [
    { label: "Salida", value: notes.top },
    { label: "Corazón", value: notes.heart },
    { label: "Fondo", value: notes.base },
  ].filter((row) => Boolean(row.value));

  if (!rows.length) {
    return "";
  }

  return `
    <div class="border-b border-gray-200 dark:border-gray-700 py-4">
      <details>
        <summary class="flex justify-between items-center cursor-pointer list-none">
          <h3 class="text-lg font-bold">Notas Olfativas</h3>
          <span class="material-symbols-outlined transition-transform duration-300 transform">expand_more</span>
        </summary>
        <div class="mt-2 text-text-secondary-light dark:text-text-secondary-dark space-y-2">
          ${rows
            .map(
              (row) => `
                <p><strong class="text-text-primary-light dark:text-text-primary-dark font-semibold">${row.label}:</strong> ${row.value}</p>
              `
            )
            .join("")}
        </div>
      </details>
    </div>
  `;
};

const buildFacts = (facts = []) => {
  if (!facts.length) {
    return "";
  }

  return `
    <div class="py-4">
      <details>
        <summary class="flex justify-between items-center cursor-pointer list-none">
          <h3 class="text-lg font-bold">Más Información</h3>
          <span class="material-symbols-outlined transition-transform duration-300 transform">expand_more</span>
        </summary>
        <div class="mt-2 text-text-secondary-light dark:text-text-secondary-dark space-y-2">
          ${facts
            .map(
              (fact) => `
                <p><strong class="text-text-primary-light dark:text-text-primary-dark font-semibold">${fact.label}:</strong> ${fact.value}</p>
              `
            )
            .join("")}
        </div>
      </details>
    </div>
  `;
};

const setupCartActions = (product) => {
  const options = product.detail?.priceOptions ?? [];
  const optionsContainer = detailContainer.querySelector("[data-price-options]");
  const addButton = detailContainer.querySelector("[data-add-to-cart]");
  const qtyInput = detailContainer.querySelector("[data-qty-input]");
  const decreaseBtn = detailContainer.querySelector("[data-qty-decrease]");
  const increaseBtn = detailContainer.querySelector("[data-qty-increase]");
  const hint = detailContainer.querySelector("[data-cart-hint]");

  if (!addButton) {
    return;
  }

  if (!options.length) {
    addButton.disabled = true;
    addButton.textContent = "Sin presentaciones disponibles";
    if (hint) {
      hint.textContent = "Vuelve pronto para más opciones.";
    }
    return;
  }

  let selectedOption = null;

  const readQuantity = () => Math.max(1, Number.parseInt(qtyInput?.value, 10) || 1);
  const setQuantity = (value) => {
    const safe = Math.max(1, value);
    if (qtyInput) {
      qtyInput.value = String(safe);
    }
    return safe;
  };
  const updateAddButtonLabel = () => {
    addButton.textContent = selectedOption
      ? `Agregar al carrito - ${selectedOption.price}`
      : "Selecciona una presentación";
  };
  const markSelected = (target) => {
    optionsContainer?.querySelectorAll("[data-option-index]").forEach((btn) => {
      btn.classList.remove(
        "border-primary",
        "ring-2",
        "ring-primary/60",
        "bg-subtle-light",
        "dark:bg-subtle-dark",
      );
    });
    target.classList.add(
      "border-primary",
      "ring-2",
      "ring-primary/60",
      "bg-subtle-light",
      "dark:bg-subtle-dark",
    );
  };

  optionsContainer?.querySelectorAll("[data-option-index]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number.parseInt(btn.dataset.optionIndex, 10);
      if (Number.isNaN(index) || !options[index]) {
        return;
      }
      selectedOption = options[index];
      addButton.disabled = false;
      markSelected(btn);
      updateAddButtonLabel();
      if (hint) {
        hint.textContent = "Cantidad y presentación seleccionadas.";
      }
    });
  });

  decreaseBtn?.addEventListener("click", () => {
    setQuantity(readQuantity() - 1);
  });

  increaseBtn?.addEventListener("click", () => {
    setQuantity(readQuantity() + 1);
  });

  qtyInput?.addEventListener("input", () => {
    setQuantity(readQuantity());
  });

  addButton.addEventListener("click", () => {
    if (!selectedOption) {
      if (hint) {
        hint.textContent = "Selecciona una presentación para continuar.";
      }
      return;
    }

    const quantity = setQuantity(readQuantity());

    if (!globalThis.medicantsCart) {
      if (hint) {
        hint.textContent = "No pudimos guardar el carrito. Intenta de nuevo.";
      }
      return;
    }

    globalThis.medicantsCart.addItem({
      productId: product.id,
      name: product.name,
      size: selectedOption.size,
      price: selectedOption.price,
      quantity,
      image: product.image,
    });

    addButton.textContent = "Agregado al carrito";
    if (hint) {
      hint.textContent = "Producto agregado al carrito.";
    }
    setTimeout(updateAddButtonLabel, 1400);
  });
};

const renderProductDetail = (product) => {
  if (!detailContainer) {
    return;
  }

  const detail = product.detail || {};
  const description = detail.description
    ? `
        <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
          <details open>
            <summary class="flex justify-between items-center cursor-pointer list-none">
              <h3 class="text-lg font-bold">Descripción</h3>
              <span class="material-symbols-outlined transition-transform duration-300 transform">expand_less</span>
            </summary>
            <p class="mt-2 text-text-secondary-light dark:text-text-secondary-dark">${detail.description}</p>
          </details>
        </div>
      `
    : "";

  detailContainer.innerHTML = `
    <div class="flex flex-col gap-6 p-4">
      <section class="text-center">
        <h1 class="font-serif-display tracking-tight text-3xl font-bold leading-tight">${product.name}</h1>
        <div class="flex items-center justify-center gap-2 mt-1">
          <p class="text-base font-normal text-text-secondary-light dark:text-text-secondary-dark">por ${product.brand}</p>
          <a class="text-sm font-semibold text-primary dark:text-accent-dark underline" href="catalago.html">(ver todo)</a>
        </div>
      </section>
      <section class="relative">
        <div class="flex justify-center items-center">
          <img alt="${product.alt}" class="max-w-full h-auto" src="${product.image}" />
        </div>
        <button class="absolute bottom-2 right-2 flex items-center justify-center w-10 h-10 bg-white/80 dark:bg-black/50 rounded-full shadow-md backdrop-blur-sm" type="button" aria-label="Ampliar imagen del producto">
          <span class="material-symbols-outlined text-text-primary-light dark:text-text-primary-dark">search</span>
        </button>
      </section>
      <section class="text-center">
        <p class="text-lg text-text-secondary-light dark:text-text-secondary-dark">${detail.presentation ?? ""}</p>
        <p class="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">${detail.bottleSize ?? ""}</p>
      </section>
      ${buildPriceOptions(detail.priceOptions)}
      ${buildCartControls()}
      <section class="space-y-2 pt-4">
        ${description}
        ${buildNotes(detail.notes)}
        ${buildFacts(detail.facts)}
      </section>
      <div class="px-4 pt-2 pb-8">
        <a href="catalago.html" class="w-full h-12 flex items-center justify-center rounded-lg bg-subtle-light dark:bg-subtle-dark text-text-light dark:text-text-dark font-bold">
          Volver al catálogo
        </a>
      </div>
    </div>
  `;

  setupCartActions(product);
};

const initializeProductDetail = () => {
  if (!detailContainer) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const list = Array.isArray(globalThis.products) ? globalThis.products : [];
  const product = list.find((item) => item.id === productId && item.detail);

  if (!product) {
    renderMissingProduct();
    return;
  }

  document.title = `${product.name} | Medicants`;
  renderProductDetail(product);
};

document.addEventListener("DOMContentLoaded", initializeProductDetail);
