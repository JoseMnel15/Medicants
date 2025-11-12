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
    <section>
      <div class="flex justify-center gap-3">
        ${options
          .map(
            (option) => `
              <button class="flex-1 text-center py-3 px-2 rounded-lg border border-gray-300 dark:border-gray-600" type="button">
                <span class="font-bold text-text-primary-light dark:text-text-primary-dark text-sm sm:text-base">${option.size}</span><br/>
                <span class="text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark">${option.price}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
};

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
