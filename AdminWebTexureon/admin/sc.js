// =================== LOGIN HANDLER ===================
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const dashboard = document.querySelector('.dashboard');
const loginContainer = document.querySelector('.login-container');
const logoutBtn = document.getElementById('logoutBtn');

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '12345';

// ===== Cek login state =====
window.addEventListener('load', () => {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    showDashboard();
  }
});

loginBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem('isLoggedIn', 'true');
    showDashboard();
    showToast('Login berhasil');
  } else {
    showToast('❌ Username atau Password salah!', 'error');
  }
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('isLoggedIn');
  dashboard.classList.remove('active');
  setTimeout(() => {
    dashboard.style.display = 'none';
    loginContainer.style.display = 'flex';
  }, 400);
  usernameInput.value = '';
  passwordInput.value = '';
  showToast('Berhasil logout');
});

function showDashboard() {
  loginContainer.style.display = 'none';
  dashboard.style.display = 'block';
  setTimeout(() => dashboard.classList.add('active'), 100);
}

// =================== DASHBOARD INPUT ===================
const imageInput = document.getElementById('image');
const judulInput = document.getElementById('judul');
const deskripsiInput = document.getElementById('deskripsi');
const urlDownloadInput = document.getElementById('urlDownload');

const processBtn = document.getElementById('process');
const copyBtn = document.getElementById('copy');
const result = document.getElementById('result');
// ===== Preview Gambar =====
imageInput.addEventListener('input', () => {
  const img = document.getElementById('imagePreview');
  if (imageInput.value.trim() !== '') {
    img.src = imageInput.value.trim();
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }
});

// ===== Encrypt Base64 =====
function encryptBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

// ===== Process Parsing =====
processBtn.addEventListener('click', () => {
  let downloadURL = urlDownloadInput.value.trim();
  if (!downloadURL || !imageInput.value.trim() || !judulInput.value.trim()) {
    showToast('Lengkapi semua input terlebih dahulu', 'error');
    return;
  }
  
  const encrypted = encryptBase64(downloadURL);
  const finalDownloadURL = `https://texureon-download.vercel.app/url?url=${encrypted}`;
  
  const data = {
    image: imageInput.value.trim(),
    judul: judulInput.value.trim(),
    deskripsi: deskripsiInput.value.trim(),
    download: finalDownloadURL
  };
  
  result.textContent = JSON.stringify(data, null, 2);
  showToast('Data berhasil di-parsing');
});

// ===== Copy JSON =====
copyBtn.addEventListener('click', () => {
  if (!result.textContent.trim() || result.textContent === '{}') {
    showToast('❌ Belum ada data untuk dicopy', 'error');
    return;
  }
  
  navigator.clipboard.writeText(result.textContent)
    .then(() => {
      result.classList.add('copied');
      showToast('JSON berhasil dicopy');
      setTimeout(() => result.classList.remove('copied'), 800);
    })
    .catch(() => showToast('Gagal menyalin JSON', 'error'));
});

// =================== TOAST NOTIFICATION ===================
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}