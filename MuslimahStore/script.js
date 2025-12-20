/* ================= CART STORAGE ================= */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

/* ================= CART COUNT ================= */
function updateCartCount() {
  const badge = document.getElementById("cart-count");
  if (badge) badge.innerText = getCart().length;
}

/* ================= ADD TO CART ================= */
function addToCart(name, price) {
  const cart = getCart();
  cart.push({ name, price });
  saveCart(cart);
  alert("Produk ditambahkan ke keranjang");
}

/* ================= REMOVE ITEM ================= */
function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

/* ================= RENDER CART ================= */
function renderCart() {
  const list = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("subtotal");
  const ongkirEl = document.getElementById("ongkir");
  const totalEl = document.getElementById("total");
  const shipping = document.getElementById("shipping");
  const empty = document.getElementById("empty-cart");

  if (!list) return;

  const cart = getCart();
  let subtotal = 0;
  list.innerHTML = "";

  if (cart.length === 0) {
    empty?.classList.remove("d-none");
    subtotalEl.innerText = "Rp 0";
    ongkirEl.innerText = "Rp 0";
    totalEl.innerText = "Rp 0";
    return;
  }

  empty?.classList.add("d-none");

  cart.forEach((item, index) => {
    subtotal += item.price;
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>${item.name}</strong><br>
          <small class="text-muted">Rp ${item.price.toLocaleString()}</small>
        </div>
        <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">
          <i class="bi bi-trash"></i>
        </button>
      </li>
    `;
  });

  const ongkir = shipping ? Number(shipping.value) : 0;

  subtotalEl.innerText = "Rp " + subtotal.toLocaleString();
  ongkirEl.innerText = "Rp " + ongkir.toLocaleString();
  totalEl.innerText = "Rp " + (subtotal + ongkir).toLocaleString();
}

/* ================= UPDATE TOTAL CART ================= */
function updateTotal() {
  renderCart();
}

/* ================= CHECKOUT ================= */
function renderCheckout() {
  const list = document.getElementById("checkout-items");
  const subtotalEl = document.getElementById("checkout-subtotal");
  const ongkirEl = document.getElementById("checkout-ongkir");
  const totalEl = document.getElementById("checkout-total");
  const shipping = document.getElementById("checkout-shipping");

  if (!list) return;

  const cart = getCart();
  let subtotal = 0;
  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = `
      <li class="list-group-item text-center text-muted">
        Tidak ada produk di keranjang
      </li>
    `;
    subtotalEl.innerText = "Rp 0";
    ongkirEl.innerText = "Rp 0";
    totalEl.innerText = "Rp 0";
    return;
  }

  cart.forEach(item => {
    subtotal += item.price;
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        ${item.name}
        <span>Rp ${item.price.toLocaleString()}</span>
      </li>
    `;
  });

  subtotalEl.innerText = "Rp " + subtotal.toLocaleString();

  const ongkir = shipping ? Number(shipping.value) : 0;
  ongkirEl.innerText = "Rp " + ongkir.toLocaleString();
  totalEl.innerText = "Rp " + (subtotal + ongkir).toLocaleString();
}

/* ================= UPDATE TOTAL CHECKOUT ================= */
function updateCheckoutTotal() {
  renderCheckout();
}

/* ================= SUBMIT CHECKOUT ================= */
function submitCheckout() {
  alert("Pesanan berhasil dikonfirmasi. Terima kasih sudah berbelanja 😊");
  localStorage.removeItem("cart");
  updateCartCount();
  window.location.href = "index.html";
}
// modal
function showModal(title, message) {
  const modalEl = document.getElementById("globalModal");
  if (!modalEl) return;

  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalBody").innerText = message;

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

/* ================= LOGIN ================= */
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Email dan password wajib diisi");
      return;
    }

    // Simulasi login
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("userEmail", email);

    // Modal login berhasil
    const modalEl = document.getElementById("loginModal");
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }

    // Redirect
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  });
});


/* ================= DATA PRODUK ================= */
const products = [
  // ===== GAMIS =====
  { name: "Gamis Zahra", price: 299000, image: "https://via.placeholder.com/300x380?text=Gamis+Zahra" },
  { name: "Gamis Aisyah", price: 329000, image: "https://via.placeholder.com/300x380?text=Gamis+Aisyah" },
  { name: "Gamis Khadijah", price: 359000, image: "https://via.placeholder.com/300x380?text=Gamis+Khadijah" },
  { name: "Gamis Safiya", price: 279000, image: "https://via.placeholder.com/300x380?text=Gamis+Safiya" },
  { name: "Gamis Salma", price: 289000, image: "https://via.placeholder.com/300x380?text=Gamis+Salma" },
  { name: "Gamis Hanna", price: 309000, image: "https://via.placeholder.com/300x380?text=Gamis+Hanna" },
  { name: "Gamis Naila", price: 319000, image: "https://via.placeholder.com/300x380?text=Gamis+Naila" },
  { name: "Gamis Alya", price: 269000, image: "https://via.placeholder.com/300x380?text=Gamis+Alya" },
  { name: "Gamis Rania", price: 339000, image: "https://via.placeholder.com/300x380?text=Gamis+Rania" },
  { name: "Gamis Farah", price: 349000, image: "https://via.placeholder.com/300x380?text=Gamis+Farah" },

  // ===== KOKO =====
  { name: "Koko Al-Fatih", price: 249000, image: "https://via.placeholder.com/300x380?text=Koko+Al-Fatih" },
  { name: "Koko Hasan", price: 269000, image: "https://via.placeholder.com/300x380?text=Koko+Hasan" },
  { name: "Koko Umar", price: 229000, image: "https://via.placeholder.com/300x380?text=Koko+Umar" },
  { name: "Koko Salman", price: 239000, image: "https://via.placeholder.com/300x380?text=Koko+Salman" },
  { name: "Koko Bilal", price: 259000, image: "https://via.placeholder.com/300x380?text=Koko+Bilal" },
  { name: "Koko Zaid", price: 279000, image: "https://via.placeholder.com/300x380?text=Koko+Zaid" },
  { name: "Koko Hamzah", price: 289000, image: "https://via.placeholder.com/300x380?text=Koko+Hamzah" },
  { name: "Koko Ali", price: 219000, image: "https://via.placeholder.com/300x380?text=Koko+Ali" },
  { name: "Koko Yusuf", price: 299000, image: "https://via.placeholder.com/300x380?text=Koko+Yusuf" },
  { name: "Koko Ibrahim", price: 309000, image: "https://via.placeholder.com/300x380?text=Koko+Ibrahim" }
];


/* ================= RENDER PRODUK ================= */
function renderProducts() {
  const container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div class="col-md-6 col-lg-3">
        <div class="card h-100 shadow-sm border-0">
          <img src="${p.image}" class="card-img-top" alt="${p.name}">
          <div class="card-body text-center">
            <h6 class="fw-semibold">${p.name}</h6>
            <p class="fw-bold text-success">
              Rp ${p.price.toLocaleString()}
            </p>
            <button class="btn btn-success btn-sm w-100"
              onclick="addToCart('${p.name}', ${p.price})">
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

/* ================= CART ================= */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(name, price) {
  const cart = getCart();
  cart.push({ name, price });
  saveCart(cart);
  showToast();
}

function updateCartCount() {
  const badge = document.getElementById("cart-count");
  if (badge) badge.innerText = getCart().length;
}

/* ================= TOAST ================= */
function showToast() {
  const toastEl = document.getElementById("cartToast");
  if (!toastEl) return;
  new bootstrap.Toast(toastEl, { delay: 2000 }).show();
}

/* ======================================================
   DARK MODE TOGGLE (GLOBAL)
====================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkToggle");

  // apply saved mode
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    toggle?.classList.add("active");
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDark);

      toggle.classList.toggle("active", isDark);
    });
  }
});


/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();      // ← INI KUNCI UTAMA
  updateCartCount();
});

/* ================= GLOBAL INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
  renderCheckout();
});
