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

/* ================= LOGIN STATE ================= */
function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

/* ================= DASHBOARD INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  const user = getUser();
  const userName = document.getElementById("userName");

  if (!user) {
    // Jika belum login, paksa ke login
    if (window.location.pathname.includes("dashboard.html")) {
      window.location.href = "login.html";
    }
    return;
  }

  if (userName) {
    userName.innerText = "Halo, " + user.name;
  }
});

/* ================= LOGOUT ================= */
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

/* ================= PROFILE ================= */
function showProfile() {
  const user = getUser();
  alert(
    `Nama: ${user.name}\nEmail: ${user.email}`
  );
}

/* ================= PROTECT DASHBOARD ================= */
document.addEventListener("DOMContentLoaded", () => {
  const welcome = document.getElementById("welcomeText");
  if (!welcome) return;

  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  welcome.innerText = `Selamat datang, ${user.name}`;
});

/* ================= LOGOUT ================= */
function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

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
