const products = [
  {
    id: "valentino-uomo-born-in-roma-intense",
    name: "Valentino Uomo Born In Roma Intense",
    brand: "Valentino",
    size: "10 ml",
    category: "Hombres",
    image: "img/Valentino-uomo-intense-1802x2048_preview_rev_1.png",
    alt: "Frasco de Valentino Uomo Born In Roma Intense con iluminación cálida sobre fondo oscuro.",
    url: "DetallleValentino.html",
    featured: true,
  },
  {
    id: "jean-paul-gaultier-le-beau-le-parfum",
    name: "Jean Paul Gaultier Le Beau Le Parfum",
    brand: "Jean Paul Gaultier",
    size: "10 ml",
    category: "Hombres",
    image: "img/Le-Beau-Le-Parfum-125ml-EDP_preview_rev_1.png",
    alt: "Botella de Jean Paul Gaultier Le Beau Le Parfum con detalles dorados sobre fondo oscuro.",
    url: "DetallleJPGlebleparfum.html",
    featured: true,
  },
  {
    id: "jean-paul-gaultier-le-male-elixir-absolu",
    name: "Jean Paul Gaultier Le Male Elixir Absolu",
    brand: "Jean Paul Gaultier",
    size: "10 ml",
    category: "Hombres",
    image: "img/LE-MALE-ELIXIR-ABSOLU-1802x2048_preview_rev_1.png",
    alt: "Frasco de Jean Paul Gaultier Le Male Elixir Absolu iluminado con reflejos dorados.",
    url: "DetallleJPGlemaleabsolu.html",
    featured: true,
  },
  {
    id: "jean-paul-gaultier-scandal-pour-homme-le-parfum",
    name: "Jean Paul Gaultier Scandal Pour Homme Le Parfum",
    brand: "Jean Paul Gaultier",
    size: "10 ml",
    category: "Hombres",
    image: "img/Scandal-Le-Parfum-Jean-Paul-Gaultier-100ml-Eau-de-Parfum-EDP_preview_rev_1.png",
    alt: "Botella de Jean Paul Gaultier Scandal Pour Homme Le Parfum con tapa dorada sobre fondo oscuro.",
    url: "DetallleScandalEDP.html",
    featured: true,
  },
  {
    id: "carolina-herrera-bad-boy-extreme",
    name: "Carolina Herrera Bad Boy Extreme",
    brand: "Carolina Herrera",
    size: "10 ml",
    category: "Hombres",
    image: "img/Bad-Boy-Extreme-Carolina-Herrera-100ml-Eau-de-Parfum-EDP_preview_rev_1.png",
    alt: "Botella en forma de rayo de Carolina Herrera Bad Boy Extreme sobre fondo naranja.",
    url: "DetalleBadboyExtreme.html",
  },
  {
    id: "carolina-herrera-212-vip-black",
    name: "Carolina Herrera 212 VIP Black",
    brand: "Carolina Herrera",
    size: "10 ml",
    category: "Hombres",
    image: "img/212-Vip-Black-Men-100ml-EDP-Caballero_preview_rev_1.png",
    alt: "Frasco de Carolina Herrera 212 VIP Black con fondo degradado oscuro.",
    url: "Detalle212vipedp.html",
  },
  {
    id: "azzaro-the-most-wanted",
    name: "Azzaro The Most Wanted",
    brand: "Azzaro",
    size: "10 ml",
    category: "Hombres",
    image: "img/Azzaro-The-Most-Wanted-Eau-de-Parfum-Intense-100ml_preview_rev_1.png",
    alt: "Frasco cilíndrico de Azzaro The Most Wanted con reflejos dorados.",
    url: "Detalleazzarothemostwanted.html",
  },
  {
    id: "bharara-king",
    name: "Bharara King",
    brand: "Bharara King",
    size: "10 ml",
    category: "Hombres",
    image: "img/Bharara-King-Eau-100-Ml-para-Hombres-cosmetic-cl_1024x1024@2x-e1710535205803_preview_rev_1.png",
    alt: "Botella azul de Bharara King sobre fondo celeste.",
    url: "DetalleBhararaKing.html",
  },
  {
    id: "montblanc-legend",
    name: "Legend Montblanc",
    brand: "Montblanc",
    size: "10 ml",
    category: "Hombres",
    image: "img/Mont-Blanc-Legend-100ml-EDP-e1729725738752_preview_rev_1.png",
    alt: "Botella negra de Legend Montblanc junto a su estuche plateado.",
    url: "DetalleLegendMontblanc.html",
  },
  {
    id: "nitro-red",
    name: "Dumont Nitro Red",
    brand: "Dumont",
    size: "10 ml",
    category: "Hombres",
    image: "img/nitroredd.png",
    alt: "Frasco rojo de Dumont Nitro Red sobre fondo oscuro.",
    url: "DetalleNitroRed.html",
  },
  {
    id: "afnan-9pm",
    name: "Afnan 9PM",
    brand: "Afnan",
    size: "10 ml",
    category: "Hombres",
    image: "img/HAFN9__48097_preview_rev_1.png",
    alt: "Botella oscura de Afnan 9PM con degradado ámbar.",
    url: "Detalle9PM.html",
  },
  {
    id: "afnan-9am-dive",
    name: "Afnan 9AM Dive",
    brand: "Afnan",
    size: "10 ml",
    category: "Hombres y Mujeres",
    image: "img/MAFN9D__16342_preview_rev_1.png",
    alt: "Frasco azul de Afnan 9AM Dive con tapa metálica.",
    url: "Detalles9AM.html",
  },
  {
    id: "rasasi-hawas-ice",
    name: "Hawas Ice",
    brand: "Rasasi",
    size: "10 ml",
    category: "Hombres",
    image: "img/HawasIce.png",
    alt: "Frasco transparente de Rasasi Hawas Ice rodeado de hielo.",
    url: "DetalleHawasIce.html",
  },
];

const variantRenderers = {
  featured: (product) => {
    return `
      <a href="${product.url}" class="block no-underline">
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
    return `
      <a href="${product.url}" class="block no-underline">
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

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-product-list]").forEach((container) => {
    const variant = container.dataset.cardVariant || "catalog";
    const renderer = variantRenderers[variant];

    if (!renderer) {
      return;
    }

    let list = [...products];

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
});
