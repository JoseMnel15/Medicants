const defaultBaseUrl = "https://medicinas-backend.onrender.com";
const storageKeys = {
  baseUrl: "medicants-admin-base-url",
  apiKey: "medicants-admin-api-key",
};

const state = {
  products: [],
  selectedId: null,
  baseUrl: defaultBaseUrl,
  apiKey: "",
  connectionOk: false,
};

const els = {};

const $ = (selector) => document.querySelector(selector);
const field = (name) => els.form?.elements?.namedItem(name);

const slugify = (text) =>
  text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const loadConfig = () => {
  try {
    const savedUrl = window.localStorage.getItem(storageKeys.baseUrl);
    const savedKey = window.localStorage.getItem(storageKeys.apiKey);
    if (savedUrl) {
      state.baseUrl = savedUrl;
    }
    if (savedKey) {
      state.apiKey = savedKey;
    }
  } catch {
    // ignore
  }
};

const saveConfig = () => {
  try {
    window.localStorage.setItem(storageKeys.baseUrl, state.baseUrl);
    window.localStorage.setItem(storageKeys.apiKey, state.apiKey);
  } catch {
    // ignore
  }
};

const setStatus = (message, type = "info") => {
  if (!els.status) return;
  const colors = {
    info: "text-subtle-text-light dark:text-subtle-text-dark",
    success: "text-green-600",
    error: "text-red-600",
  };
  els.status.className = `text-sm ${colors[type] || colors.info}`;
  els.status.textContent = message;
};

const setConnectionStatus = (message, type = "info") => {
  if (!els.connectionStatus) return;
  const colors = {
    info: "text-subtle-text-light dark:text-subtle-text-dark",
    success: "text-green-600",
    error: "text-red-600",
  };
  els.connectionStatus.className = `text-xs ${colors[type] || colors.info}`;
  els.connectionStatus.textContent = message;
};

const withAuthHeaders = (extra = {}) => ({
  "Content-Type": "application/json",
  "x-api-key": state.apiKey || "",
  ...extra,
});

const fetchJson = async (url, options = {}) => {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = data?.error || "Error desconocido";
    throw new Error(error);
  }
  return data;
};

const validateConnection = async () => {
  try {
    // PUT a un id inexistente para verificar el token sin crear nada (debe responder 404 si el token es válido)
    const res = await fetch(`${state.baseUrl}/products/__ping__`, {
      method: "PUT",
      headers: withAuthHeaders(),
      body: JSON.stringify({ name: "ping", brand: "ping" }),
    });
    if (res.status === 401) {
      state.connectionOk = false;
      setConnectionStatus("API Key inválida", "error");
      return false;
    }
    if (res.ok || res.status === 404) {
      state.connectionOk = true;
      setConnectionStatus(`Conectado a ${state.baseUrl}`, "success");
      return true;
    }
    state.connectionOk = false;
    setConnectionStatus("No se pudo validar", "error");
    return false;
  } catch (err) {
    state.connectionOk = false;
    setConnectionStatus(`Error de conexión: ${err.message}`, "error");
    return false;
  }
};

const renderProducts = () => {
  if (!els.list) return;
  if (!state.products.length) {
    els.list.innerHTML = `<p class="text-sm text-subtle-text-light dark:text-subtle-text-dark">No hay productos todavía.</p>`;
    return;
  }

  els.list.innerHTML = state.products
    .map(
      (p) => `
        <article class="flex items-center justify-between rounded-lg border border-subtle-light dark:border-subtle-dark bg-white/70 dark:bg-background-dark/60 p-3">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-md bg-subtle-light dark:bg-subtle-dark overflow-hidden flex items-center justify-center">
              ${p.image ? `<img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover" />` : `<span class="text-xs text-subtle-text-light dark:text-subtle-text-dark">Sin imagen</span>`}
            </div>
            <div>
              <h3 class="text-sm font-bold text-text-light dark:text-text-dark">${p.name}</h3>
              <p class="text-xs text-subtle-text-light dark:text-subtle-text-dark">${p.brand} • ${p.category || "Sin categoría"}</p>
            </div>
          </div>
          <button type="button" data-id="${p.id}" class="text-sm font-semibold text-primary dark:text-accent-dark underline">Editar</button>
        </article>
      `,
    )
    .join("");

  els.list.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = state.products.find((p) => p.id === btn.dataset.id);
      if (product) {
        fillForm(product);
      }
    });
  });
};

const addPriceRow = (size = "", price = "") => {
  const row = document.createElement("div");
  row.className = "grid grid-cols-2 gap-2 price-row";
  row.innerHTML = `
    <input type="text" class="rounded-md border border-subtle-light dark:border-subtle-dark bg-transparent px-3 py-2" placeholder="Tamaño (ej. 3 ml)" data-price-size value="${size || ""}" />
    <input type="text" class="rounded-md border border-subtle-light dark:border-subtle-dark bg-transparent px-3 py-2" placeholder="Precio (ej. $150)" data-price-value value="${price || ""}" />
  `;
  els.priceOptions?.appendChild(row);
};

const clearPriceRows = () => {
  if (!els.priceOptions) return;
  els.priceOptions.innerHTML = "";
  addPriceRow();
};

const fillForm = (product) => {
  state.selectedId = product.id;
  field("id").value = product.id || "";
  field("name").value = product.name || "";
  field("brand").value = product.brand || "";
  field("category").value = product.category || "";
  field("size").value = product.size || "";
  field("image").value = product.image || "";
  field("alt").value = product.alt || "";
  field("featured").checked = Boolean(product.featured);

  const detail = product.detail || {};
  field("presentation").value = detail.presentation || "";
  field("bottleSize").value = detail.bottleSize || "";
  field("description").value = detail.description || "";
  field("notesTop").value = detail.notes?.top || "";
  field("notesHeart").value = detail.notes?.heart || "";
  field("notesBase").value = detail.notes?.base || "";

  clearPriceRows();
  const priceOptions = Array.isArray(detail.priceOptions) ? detail.priceOptions : [];
  if (priceOptions.length) {
    priceOptions.forEach((opt) => addPriceRow(opt.size, opt.price));
  }

  setStatus(`Editando ${product.name}`, "info");
};

const resetForm = () => {
  state.selectedId = null;
  els.form.reset();
  clearPriceRows();
  setStatus("Formulario listo para crear", "info");
};

const getFormData = () => {
  const detail = {};
  if (field("presentation").value) detail.presentation = field("presentation").value;
  if (field("bottleSize").value) detail.bottleSize = field("bottleSize").value;
  if (field("description").value) detail.description = field("description").value;

  const priceOptions = [...els.priceOptions.querySelectorAll(".price-row")]
    .map((row) => {
      const size = row.querySelector("[data-price-size]")?.value.trim();
      const price = row.querySelector("[data-price-value]")?.value.trim();
      if (!size || !price) return null;
      return { size, price };
    })
    .filter(Boolean);
  if (priceOptions.length) {
    detail.priceOptions = priceOptions;
  }

  const notes = {
    top: field("notesTop").value.trim(),
    heart: field("notesHeart").value.trim(),
    base: field("notesBase").value.trim(),
  };
  if (notes.top || notes.heart || notes.base) {
    detail.notes = notes;
  }

  const idValue = field("id").value.trim() || slugify(field("name").value);

  return {
    id: idValue,
    name: field("name").value.trim(),
    brand: field("brand").value.trim(),
    category: field("category").value.trim(),
    size: field("size").value.trim(),
    image: field("image").value.trim(),
    alt: field("alt").value.trim(),
    featured: field("featured").checked,
    detail,
  };
};

const loadProducts = async () => {
  setConnectionStatus("Validando conexión...", "info");
  const ok = await validateConnection();
  if (!ok) {
    setStatus("Revisa la URL o API Key", "error");
    return;
  }
  setConnectionStatus("Cargando productos...", "info");
  try {
    const data = await fetchJson(`${state.baseUrl}/products`);
    state.products = Array.isArray(data) ? data : [];
    renderProducts();
    setConnectionStatus(`Conectado a ${state.baseUrl}`, "success");
    setStatus("Productos cargados", "success");
  } catch (err) {
    setStatus(`No se pudieron cargar productos: ${err.message}`, "error");
    setConnectionStatus("Error al cargar", "error");
  }
};

const saveProduct = async (event) => {
  event.preventDefault();
  const payload = getFormData();
  if (!payload.name || !payload.brand) {
    setStatus("Nombre y marca son obligatorios", "error");
    return;
  }

  const isUpdate = Boolean(state.selectedId);
  const url = isUpdate
    ? `${state.baseUrl}/products/${state.selectedId}`
    : `${state.baseUrl}/products`;
  const method = isUpdate ? "PUT" : "POST";

  try {
    const saved = await fetchJson(url, {
      method,
      headers: withAuthHeaders(),
      body: JSON.stringify(payload),
    });
    if (isUpdate) {
      state.products = state.products.map((p) => (p.id === saved.id ? saved : p));
    } else {
      state.products = [...state.products, saved];
      state.selectedId = saved.id;
    }
    renderProducts();
    fillForm(saved);
    setStatus("Producto guardado", "success");
  } catch (err) {
    setStatus(`Error guardando: ${err.message}`, "error");
  }
};

const deleteProduct = async () => {
  if (!state.selectedId) {
    setStatus("Selecciona un producto para eliminar", "error");
    return;
  }
  const confirmDelete = window.confirm("¿Eliminar este producto?");
  if (!confirmDelete) return;
  try {
    await fetchJson(`${state.baseUrl}/products/${state.selectedId}`, {
      method: "DELETE",
      headers: withAuthHeaders(),
    });
    state.products = state.products.filter((p) => p.id !== state.selectedId);
    resetForm();
    renderProducts();
    setStatus("Producto eliminado", "success");
  } catch (err) {
    setStatus(`No se pudo eliminar: ${err.message}`, "error");
  }
};

const bindEvents = () => {
  els.urlInput = $("#backend-url");
  els.apiKeyInput = $("#api-key");
  els.connectionStatus = $("#connection-status");
  els.list = $("#product-list");
  els.form = $("#product-form");
  els.priceOptions = $("#price-options");
  els.addPriceBtn = $("#add-price-option");
  els.status = $("#form-status");

  if (els.urlInput) {
    els.urlInput.value = state.baseUrl;
    els.urlInput.addEventListener("change", () => {
      state.baseUrl = els.urlInput.value.trim() || defaultBaseUrl;
    });
  }
  if (els.apiKeyInput) {
    els.apiKeyInput.value = state.apiKey;
    els.apiKeyInput.addEventListener("change", () => {
      state.apiKey = els.apiKeyInput.value.trim();
    });
  }

  const saveConn = $("#save-connection");
  saveConn?.addEventListener("click", () => {
    saveConfig();
    setConnectionStatus("Probando conexión...", "info");
    loadProducts();
  });

  $("#new-product")?.addEventListener("click", resetForm);
  $("#delete-product")?.addEventListener("click", deleteProduct);
  els.form?.addEventListener("submit", saveProduct);
  els.addPriceBtn?.addEventListener("click", () => addPriceRow());
};

document.addEventListener("DOMContentLoaded", () => {
  loadConfig();
  bindEvents();
  resetForm();
  loadProducts();
  setStatus("Configura la URL y API Key para guardar cambios", "info");
});
