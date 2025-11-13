// ===== Splash Screen =====
window.addEventListener('load', () => {
  const splash = document.querySelector('.splash-screen');
  const dashboard = document.querySelector('.dashboard');
  
  setTimeout(() => {
    splash.style.opacity = '0';
    setTimeout(() => {
      splash.style.display = 'none';
      dashboard.style.display = 'flex';
    }, 600);
  }, 2500);
});

// ===== Element Selector =====
const imageInput = document.getElementById('image');
const imagePreview = document.getElementById('imagePreview');
const judulInput = document.getElementById('judul');
const deskripsiInput = document.getElementById('deskripsi');
const urlBlogInput = document.getElementById('urlBlog');
const processBtn = document.getElementById('process');
const copyBtn = document.getElementById('copy');
const result = document.getElementById('result');

// ===== Preview Gambar Otomatis =====
imageInput.addEventListener('input', () => {
  const val = imageInput.value.trim();
  if (val) {
    imagePreview.src = val;
    imagePreview.style.display = 'block';
  } else {
    imagePreview.style.display = 'none';
  }
});

// ===== Fungsi Get DateTime =====
function getDateTime() {
  const now = new Date();
  const pad = n => (n < 10 ? '0' + n : n);
  const date = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return `${date} ${time}`;
}

// ===== Fungsi Generate ID Blog =====
function generateBlogID() {
  const now = new Date();
  const pad = n => (n < 10 ? '0' + n : n);
  const y = now.getFullYear();
  const m = pad(now.getMonth() + 1);
  const d = pad(now.getDate());
  const h = pad(now.getHours());
  const min = pad(now.getMinutes());
  const s = pad(now.getSeconds());
  const random = Math.floor(1000 + Math.random() * 9000);
  return `BLOG-${y}${m}${d}-${h}${min}${s}-${random}`;
}

// ===== Proses Generate JSON =====
processBtn.addEventListener('click', () => {
  if (!imageInput.value.trim() || !judulInput.value.trim() || !urlBlogInput.value.trim()) {
    showToast('Lengkapi semua input terlebih dahulu', 'error');
    return;
  }
  
  const blogData = {
    id: generateBlogID(),
    image: imageInput.value.trim(),
    judul: judulInput.value.trim(),
    deskripsi: deskripsiInput.value.trim(),
    url: urlBlogInput.value.trim(),
    date_time: getDateTime()
  };
  
  result.textContent = JSON.stringify(blogData, null, 2);
  showToast('✅ Data blog berhasil di-generate');
});

// ===== Copy JSON ke Clipboard =====
copyBtn.addEventListener('click', () => {
  if (result.textContent.trim() === '{}' || result.textContent.trim() === '') {
    showToast('Belum ada data untuk disalin', 'error');
    return;
  }
  
  navigator.clipboard.writeText(result.textContent)
    .then(() => {
      result.classList.add('copied');
      showToast('JSON berhasil disalin');
      setTimeout(() => result.classList.remove('copied'), 800);
    });
});

// ===== Toast Notification =====
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