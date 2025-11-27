const API_BASE_URL = "https://medicinas-backend.onrender.com";

const staticProducts = [
  {
    id: "valentino-uomo-born-in-roma-intense",
    name: "Valentino Uomo Born In Roma Intense",
    brand: "Valentino",
    size: "10 ml",
    category: "Hombres",
    image: "img/Valentino-uomo-intense-1802x2048_preview_rev_1.png",
    alt: "Frasco de Valentino Uomo Born In Roma Intense con iluminación cálida sobre fondo oscuro.",
    url: "detalle.html?id=valentino-uomo-born-in-roma-intense",
    featured: true,
    detail: {
      presentation: "Eau de Parfum",
      bottleSize: "100 ml",
      description: `Una fragancia masculina moderna y elegante que combina lo clásico con un toque atrevido. Su salida fresca de vainilla bourbon y lavanda se equilibra con un corazón especiado, para terminar en un fondo profundo y amaderado. Un perfume sofisticado, seductor y con gran proyección, ideal para noches especiales y quienes buscan un aroma intenso y distintivo. <br>✔ Presentación en decant (frasco fraccionado) <br>✔ Opción accesible para conocer antes del frasco original <br>✔ Aroma elegante, cálido y de larga duración`,
      priceOptions: [
        { size: "3 ml", price: "$130" },
        { size: "5 ml", price: "$210" },
        { size: "10 ml", price: "$390" },
      ],
      notes: {
        top: "Vainilla, Jengibre, Bergamota",
        heart: "Lavanda, Salvia",
        base: "Vetiver",
      },
      facts: [
        { label: "Concentración", value: "Eau de Parfum Intense (EDP Intense)" },
        { label: "Familia Olfativa", value: "Ámbar – Vainilla / Fougère Ambarino" },
      ],
    },
  },
  {
    id: "jean-paul-gaultier-le-beau-le-parfum",
    name: "Jean Paul Gaultier Le Beau Le Parfum",
    brand: "Jean Paul Gaultier",
    size: "10 ml",
    category: "Hombres",
    image: "img/Le-Beau-Le-Parfum-125ml-EDP_preview_rev_1.png",
    alt: "Botella de Jean Paul Gaultier Le Beau Le Parfum con detalles dorados sobre fondo oscuro.",
    url: "detalle.html?id=jean-paul-gaultier-le-beau-le-parfum",
    featured: true,
    detail: {
      presentation: "Eau de Parfum",
      bottleSize: "125 ml",
      description: `Una fragancia intensa y elegante que redefine la masculinidad. Con notas de salida de cardamomo, un corazón de lavanda e iris, y un fondo profundo de vainilla y maderas orientales, este perfume es sofisticado, seductor y de larga duración. Ideal para ocasiones especiales o para quienes buscan destacar con un aroma cálido, sensual y envolvente. <br>✔ Presentación en decant (frasco fraccionado) <br>✔ Opción accesible para conocer antes del frasco original <br>✔ Aroma elegante, cálido y de larga duración`,
      priceOptions: [
        { size: "3 ml", price: "$105" },
        { size: "5 ml", price: "$160" },
        { size: "10 ml", price: "$310" },
      ],
      notes: {
        top: "Piña, Iris, Jengibre, Ciprés",
        heart: "Coco, Notas amaderadas",
        base: "Haba Tonka, Sándalo, Ámbar, Ámbar gris",
      },
      facts: [
        { label: "Concentración", value: "Eau de Parfum Intense (EDP Intense)" },
        { label: "Familia Olfativa", value: "Ámbar Fougère" },
      ],
    },
  },
  {
    id: "jean-paul-gaultier-le-male-elixir-absolu",
    name: "Jean Paul Gaultier Le Male Elixir Absolu",
    brand: "Jean Paul Gaultier",
    size: "10 ml",
    category: "Hombres",
    image: "img/LE-MALE-ELIXIR-ABSOLU-1802x2048_preview_rev_1.png",
    alt: "Frasco de Jean Paul Gaultier Le Male Elixir Absolu iluminado con reflejos dorados.",
    url: "detalle.html?id=jean-paul-gaultier-le-male-elixir-absolu",
    featured: true,
    detail: {
      presentation: "Eau de Parfum",
      bottleSize: "125 ml",
      description: `La versión más intensa y adictiva de la icónica fragancia. Una explosión de menta fresca al inicio, seguida por un corazón de lavanda y vainilla que se funde con un fondo profundo de tabaco, miel y maderas orientales. Un aroma poderoso, envolvente y de larga duración, pensado para quienes buscan dejar huella con una esencia cálida, dulce y extremadamente sensual. <br>✔ Presentación en decant (frasco fraccionado) <br>✔ Opción accesible para conocer antes del frasco original <br>✔ Aroma elegante, cálido y de larga duración`,
      priceOptions: [
        { size: "3 ml", price: "$95" },
        { size: "5 ml", price: "$140" },
        { size: "10 ml", price: "$260" },
      ],
      notes: {
        top: "Ciruela, Canela, Cardamomo, Bergamota",
        heart: "Lavanda, Davana, Artemisia",
        base: "Haba Tonka, Bálsamo de Benjuí, Musgo de Ambreta, Patchouli, Lábdano",
      },
      facts: [
        { label: "Concentración", value: "Eau de Parfum Intense (EDP Intense)" },
        { label: "Familia Olfativa", value: "Ámbar Fougère" },
      ],
    },
  },
  {
    id: "jean-paul-gaultier-scandal-pour-homme-le-parfum",
    name: "Jean Paul Gaultier Scandal Pour Homme Le Parfum",
    brand: "Jean Paul Gaultier",
    size: "10 ml",
    category: "Hombres",
    image: "img/Scandal-Le-Parfum-Jean-Paul-Gaultier-100ml-Eau-de-Parfum-EDP_preview_rev_1.png",
    alt: "Botella de Jean Paul Gaultier Scandal Pour Homme Le Parfum con tapa dorada sobre fondo oscuro.",
    url: "detalle.html?id=jean-paul-gaultier-scandal-pour-homme-le-parfum",
    featured: true,
    detail: {
      presentation: "Eau de Parfum",
      bottleSize: "100 ml",
      description: `Una fragancia intensa, atrevida y elegante. Combina notas de salida frescas y energéticas con un corazón de haba tonka y caramelo, culminando en un fondo amaderado y especiado que resalta la sensualidad masculina. Un aroma envolvente, dulce y seductor, ideal para quienes buscan una esencia con carácter y excelente duración en la piel. <br>✔ Presentación en decant (frasco fraccionado) <br>✔ Opción accesible para conocer antes del frasco original <br>✔ Aroma elegante, cálido y de larga duración`,
      priceOptions: [
        { size: "3 ml", price: "$110" },
        { size: "5 ml", price: "$170" },
        { size: "10 ml", price: "$320" },
      ],
      notes: {
        top: "Geranio",
        heart: "Haba tonka",
        base: "Sándalo",
      },
      facts: [
        { label: "Concentración", value: "Eau de Parfum Intense (EDP Intense)" },
        { label: "Familia Olfativa", value: "Ámbar Fougère" },
      ],
    },
  },
  {
    id: "carolina-herrera-bad-boy-extreme",
    name: "Carolina Herrera Bad Boy Extreme",
    brand: "Carolina Herrera",
    size: "10 ml",
    category: "Hombres",
    image: "img/Bad-Boy-Extreme-Carolina-Herrera-100ml-Eau-de-Parfum-EDP_preview_rev_1.png",
    alt: "Botella en forma de rayo de Carolina Herrera Bad Boy Extreme sobre fondo naranja.",
    url: "detalle.html?id=carolina-herrera-bad-boy-extreme",
    detail: {
      presentation: "Eau de Parfum",
      bottleSize: "100 ml",
      description: `Una fragancia intensa y sofisticada que redefine la rebeldía masculina. Combina el frescor del jengibre con un corazón cálido de cacao y vetiver, y un fondo ahumado con maderas y cuero. Un aroma poderoso, audaz y seductor, perfecto para quienes buscan destacar con personalidad y fuerza en cualquier ocasión. <br>✔ Presentación en decant (frasco fraccionado) <br>✔ Opción accesible para conocer antes del frasco original <br>✔ Aroma elegante, cálido y de larga duración`,
      priceOptions: [
        { size: "3 ml", price: "$100" },
        { size: "5 ml", price: "$140" },
        { size: "10 ml", price: "$260" },
      ],
      notes: {
        top: "Jengibre, Bergamota",
        heart: "Cacao, Pachulí",
        base: "Vetiver, Haba Tonka",
      },
      facts: [
        { label: "Concentración", value: "Eau de Parfum (EDP)" },
        { label: "Familia Olfativa", value: "Ámbar Amaderado" },
      ],
    },
  },
  {
    id: "carolina-herrera-212-vip-black",
    name: "Carolina Herrera 212 VIP Black",
    brand: "Carolina Herrera",
    size: "10 ml",
    category: "Hombres",
    image: "img/212-Vip-Black-Men-100ml-EDP-Caballero_preview_rev_1.png",
    alt: "Frasco de Carolina Herrera 212 VIP Black con fondo degradado oscuro.",
    url: "detalle.html?id=carolina-herrera-212-vip-black",
    detail: {
      presentation: "Eau de Parfum",
      bottleSize: "100 ml",
      description: `Una fragancia magnética y moderna que combina la frescura del anís y la absenta con un corazón de lavanda y un fondo dulce de vainilla y almizcle. Un aroma intenso, elegante y seductor, perfecto para la noche y para quienes buscan destacar con estilo y personalidad. <br>✔ Presentación en decant (frasco fraccionado) <br>✔ Opción accesible para conocer antes del frasco original <br>✔ Aroma elegante, cálido y de larga duración`,
      priceOptions: [
        { size: "3 ml", price: "$85" },
        { size: "5 ml", price: "$130" },
        { size: "10 ml", price: "$240" },
      ],
      notes: {
        top: "Maracuyá, Ron",
        heart: "Gardenia, Almizcle",
        base: "Vainilla, Haba Tonka",
      },
      facts: [
        { label: "Concentración", value: "Eau de Parfum (EDP)" },
        { label: "Familia Olfativa", value: "Oriental Vainilla" },
      ],
    },
  },
  {
    id: "azzaro-the-most-wanted",
    name: "Azzaro The Most Wanted",
    brand: "Azzaro",
    size: "10 ml",
    category: "Hombres",
    image: "img/Azzaro-The-Most-Wanted-Eau-de-Parfum-Intense-100ml_preview_rev_1.png",
    alt: "Frasco cilíndrico de Azzaro The Most Wanted con reflejos dorados.",
    url: "detalle.html?id=azzaro-the-most-wanted",
    detail: {
      presentation: "Eau de Parfum",
      bottleSize: "100 ml",
      description: `Una fragancia atrevida y seductora que combina lo especiado y lo dulce de manera irresistible. Su apertura picante de cardamomo da paso a un corazón cálido de toffee, sobre un fondo elegante de maderas ambaradas. Un aroma intenso y magnético, ideal para la noche, fiestas o momentos en los que quieras dejar una huella inolvidable. <br>✔ Presentación en decant (frasco fraccionado) <br>✔ Opción accesible para conocer antes del frasco original <br>✔ Aroma elegante, cálido y de larga duración`,
      priceOptions: [
        { size: "3 ml", price: "$85" },
        { size: "5 ml", price: "$130" },
        { size: "10 ml", price: "$240" },
      ],
      notes: {
        top: "Cardamomo",
        heart: "Toffee",
        base: "Ámbar, Maderas",
      },
      facts: [
        { label: "Concentración", value: "Eau de Parfum (EDP)" },
        { label: "Familia Olfativa", value: "Ámbar Fougère" },
      ],
    },
  },
  {
    id: "bharara-king",
    name: "Bharara King",
    brand: "Bharara King",
    size: "10 ml",
    category: "Hombres",
    image: "img/Bharara-King-Eau-100-Ml-para-Hombres-cosmetic-cl_1024x1024@2x-e1710535205803_preview_rev_1.png",
    alt: "Botella azul de Bharara King sobre fondo celeste.",
    url: "detalle.html?id=bharara-king",
    detail: {
      presentation: "Eau de Parfum",
      bottleSize: "100 ml",
      description: `Un perfume audaz y vibrante que se ha convertido en favorito de muchos por su aroma fresco y elegante. Abre con notas cítricas chispeantes, acompañado de un corazón especiado y un fondo cálido de maderas y almizcle que lo hacen irresistible. Un aroma versátil y moderno, ideal tanto para el día como para la noche, con excelente proyección y duración. <br>✔ Presentación en decant (frasco fraccionado) <br>✔ Opción accesible para conocer antes del frasco original <br>✔ Aroma elegante, cálido y de larga duración`,
      priceOptions: [
        { size: "3 ml", price: "$75" },
        { size: "5 ml", price: "$110" },
        { size: "10 ml", price: "$200" },
      ],
      notes: {
        top: "Pomelo, Mandarina, Menta",
        heart: "Canela, Rosa, Especias",
        base: "Ámbar, Cuero, Notas amaderadas",
      },
      facts: [
        { label: "Concentración", value: "Eau de Parfum (EDP)" },
        { label: "Familia Olfativa", value: "Ámbar Fougère" },
      ],
    },
  },
  {
    id: "montblanc-legend",
    name: "Legend Montblanc",
    brand: "Montblanc",
    size: "10 ml",
    category: "Hombres",
    image: "img/Mont-Blanc-Legend-100ml-EDP-e1729725738752_preview_rev_1.png",
    alt: "Botella negra de Legend Montblanc junto a su estuche plateado.",
    url: "detalle.html?id=montblanc-legend",
    detail: {
      presentation: "Eau de Parfum",
      bottleSize: "100 ml",
      description: `Una fragancia fresca, elegante y masculina que se ha vuelto un clásico moderno. Combina notas de piña, bergamota y lavanda con un corazón floral y un fondo de musgo de roble y maderas. Un aroma versátil y sofisticado, ideal para el día a día o para cualquier ocasión en la que quieras proyectar seguridad y estilo. <br>✔ Presentación en decant (frasco fraccionado) <br>✔ Opción accesible para conocer antes del frasco original <br>✔ Aroma elegante, cálido y de larga duración`,
      priceOptions: [
        { size: "3 ml", price: "$65" },
        { size: "5 ml", price: "$90" },
        { size: "10 ml", price: "$170" },
      ],
      notes: {
        top: "Bergamota, Hojas de violeta",
        heart: "Jazmín, Magnolia, Musgo de roble",
        base: "Haba Tonka, Cuero",
      },
      facts: [
        { label: "Concentración", value: "Eau de Parfum (EDP)" },
        { label: "Familia Olfativa", value: "Aromática Fougère" },
      ],
    },
  },
  { 
    id: "nitro-red",
    name: "Dumont Nitro Red",
    brand: "Dumont",
    size: "10 ml",
    category: "Hombres",
    image: "img/nitroredd.png",
    alt: "Frasco rojo de Dumont Nitro Red sobre fondo oscuro.",
    url: "detalle.html?id=nitro-red",
    detail: {
      presentation: "Eau de Parfum",
      bottleSize: "100 ml",
      description: `Nitro Red Eau de Parfum es una fragancia masculina vibrante y moderna, inspirada en la energía y el carisma del hombre que no pasa desapercibido. Su salida combina la frescura jugosa de la sandía con notas marinas y cítricas que evocan vitalidad. En el corazón, se perciben acordes aromáticos y ligeramente ambarados que aportan fuerza y sensualidad, mientras su fondo amaderado y almizclado le da una proyección intensa y duradera. Un perfume dinámico, juvenil y seductor, considerado una alternativa cercana al icónico Invictus, ideal para quienes buscan un aroma poderoso y adictivo. <br>✔ Presentación en decant (frasco fraccionado) <br>✔ Opción accesible para conocer antes del frasco original <br>✔ Aroma elegante, cálido y de larga duración`,
      priceOptions: [
        { size: "3 ml", price: "$45" },
        { size: "5 ml", price: "$60" },
        { size: "10 ml", price: "$100" },
      ],
      notes: {
        top: "Bergamota, Lavanda, Manzana",
        heart: "Sandía, Madera de cedro, Cálamo",
        base: "Sándalo, Pachuli, Ámbar",
      },
      facts: [
        { label: "Concentración", value: "Eau de Parfum Intense" },
        { label: "Familia Olfativa", value: "Amaderada – Ambarada / Aromática Frutal" },
      ],
    },
  },
  {
    id: "afnan-9pm",
    name: "Afnan 9PM",
    brand: "Afnan",
    size: "10 ml",
    category: "Hombres",
    image: "img/HAFN9__48097_preview_rev_1.png",
    alt: "Botella oscura de Afnan 9PM con degradado ámbar.",
    url: "detalle.html?id=afnan-9pm",
    detail: {
      presentation: "Eau de Parfum",
      bottleSize: "100 ml",
      description: `9pm de Afnan es una fragancia de la familia olfativa Oriental Vainilla para Hombres. 9pm se lanzó en 2020. Las Notas de Salida son manzana, canela, lavanda silvestre y bergamota; las Notas de Corazón son flor de azahar del naranjo y lirio de los valles (muguete); las Notas de Fondo son vainilla, haba tonka, ámbar y pachulí. <br>✔ Presentación en decant (frasco fraccionado) <br>✔ Opción accesible para conocer antes del frasco original <br>✔ Aroma elegante, cálido y de larga duración`,
      priceOptions: [
        { size: "3 ml", price: "$50" },
        { size: "5 ml", price: "$70" },
        { size: "10 ml", price: "$120" },
      ],
      notes: {
        top: "Manzana, Canela, Lavanda silvestre, Bergamota",
        heart: "Flor de azahar del naranjo, Lirio de los valles (Muguete)",
        base: "Vainilla, Haba tonka, Ámbar, Pachuli",
      },
      facts: [
        { label: "Concentración", value: "Eau de Parfum" },
        { label: "Familia Olfativa", value: "Oriental – Vainilla" },
      ],
    },
  },
  {
    id: "afnan-9am-dive",
    name: "Afnan 9AM Dive",
    brand: "Afnan",
    size: "10 ml",
    category: "Hombres y Mujeres",
    image: "img/MAFN9D__16342_preview_rev_1.png",
    alt: "Frasco azul de Afnan 9AM Dive con tapa metálica.",
    url: "detalle.html?id=afnan-9am-dive",
    detail: {
      presentation: "Eau de Parfum",
      bottleSize: "100 ml",
      description: `9am Dive de Afnan es una fragancia de la familia olfativa Aromática Acuática para Hombres y Mujeres. 9am Dive se lanzó en 2022. La Nariz detrás de esta fragrancia es Imran Fazlani. Las Notas de Salida son limón (lima ácida), menta, grosellas negras y pimienta rosa; las Notas de Corazón son manzana, cedro e incienso; las Notas de Fondo son jengibre, sándalo, pachulí y jazmín. <br>✔ Presentación en decant (frasco fraccionado) <br>✔ Opción accesible para conocer antes del frasco original <br>✔ Aroma elegante, cálido y de larga duración`,
      priceOptions: [
        { size: "3 ml", price: "$45" },
        { size: "5 ml", price: "$60" },
        { size: "10 ml", price: "$100" },
      ],
      notes: {
        top: "Limón (lima ácida), Menta, Grosellas negras, Pimienta rosa",
        heart: "Manzana, Cedro, Incienso",
        base: "Jengibre, Sándalo, Pachuli, Jazmín",
      },
      facts: [
        { label: "Concentración", value: "Eau de Parfum" },
        { label: "Familia Olfativa", value: "Aromática – Acuática" },
      ],
    },
  },
  {
    id: "rasasi-hawas-ice",
    name: "Hawas Ice",
    brand: "Rasasi",
    size: "10 ml",
    category: "Hombres",
    image: "img/HawasIce.png",
    alt: "Frasco transparente de Rasasi Hawas Ice rodeado de hielo.",
    url: "detalle.html?id=rasasi-hawas-ice",
    detail: {
      presentation: "Eau de Parfum",
      bottleSize: "100 ml",
      description: `Hawas Ice de Rasasi es una fragancia de la familia olfativa Aromática para Hombres. Hawas Ice se lanzó en 2023. Las Notas de Salida son manzana, limón italiano (lima italiana), bergamota de Sicilia y anís estrellado; las Notas de Corazón son ciruela, flor de azahar del naranjo y cardamomo; las Notas de Fondo son almizcle, ámbar, trozos de madera a la deriva y musgo. <br>✔ Presentación en decant (frasco fraccionado) <br>✔ Opción accesible para conocer antes del frasco original <br>✔ Aroma elegante, cálido y de larga duración`,
      priceOptions: [
        { size: "3 ml", price: "$65" },
        { size: "5 ml", price: "$90" },
        { size: "10 ml", price: "$165" },
      ],
      notes: {
        top: "Bergamota, Manzana Verde, Pomelo, Canela",
        heart: "Cardamomo, Flor de Azahar, Lavanda, Enebro",
        base: "Ámbar, Almizcle, Musgo, Pachuli",
      },
      facts: [
        { label: "Concentración", value: "Eau de Parfum" },
        { label: "Familia Olfativa", value: "Aromática – Amaderada / Ámbar Fresco" },
      ],
    },
  },
    {
    id: "rasasi-hawas-for-him",
    name: "Hawas for Him",
    brand: "Rasasi",
    size: "10 ml",
    category: "Hombres",
    image: "img/HHAW__88739_preview_rev_1.png",
    alt: "Frasco transparente de Rasasi Hawas for Him rodeado de hielo.",
    url: "detalle.html?id=rasasi-hawas-for-him",
    detail: {
      presentation: "Eau de Parfum",
      bottleSize: "100 ml",
      description: `Hawas for Him de Rasasi es una fragancia de la familia olfativa Aromática Acuática para Hombres. Hawas for Him se lanzó en 2015. Las Notas de Salida son manzana, bergamota, limón (lima ácida) y canela; las Notas de Corazón son notas acuosas, ciruela, flor de azahar del naranjo y cardamomo; las Notas de Fondo son ámbar gris, almizcle, pachulí y trozos de madera a la deriva.`,
      priceOptions: [
        { size: "3 ml", price: "$50" },
        { size: "5 ml", price: "$65" },
        { size: "10 ml", price: "$110" },
      ],
      notes: {
        top: "Manzana, Bergamota, Limón, Canela",
        heart: "Notas Acuosas, Ciruela, Flor de Azahar, Cardamomo",
        base: "Ámbar Gris, Almizcle, Pachuli, Madera a la Deriva",
      },
      facts: [
        { label: "Concentración", value: "Eau de Parfum" },
        { label: "Familia Olfativa", value: "Aromática Acuática" },
      ],
    },
  },
];

let productsReady = null;
let cachedProducts = null;

const normalizeProduct = (product) => ({
  ...product,
  url: product.url || `detalle.html?id=${product.id}`,
});

const mergeWithStatic = (apiList = []) => {
  const byId = new Map(apiList.map((p) => [p.id, p]));
  staticProducts
    .map(normalizeProduct)
    .forEach((p) => {
      if (!byId.has(p.id)) {
        byId.set(p.id, p);
      }
    });
  return Array.from(byId.values());
};

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
  const merged = mergeWithStatic(normalized);
  cachedProducts = merged;
  globalThis.products = merged;
  return merged;
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
      (Array.isArray(globalThis.products) && globalThis.products.length && globalThis.products) ||
      staticProducts.map(normalizeProduct);
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
