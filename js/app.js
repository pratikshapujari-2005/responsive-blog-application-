const STORAGE_KEYS = {
  users: "blogAppUsers",
  blogs: "blogAppBlogs",
  session: "blogAppSession"
};

function getFromStorage(key, fallback = []) {
  return JSON.parse(localStorage.getItem(key)) || fallback;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCurrentUser() {
  const email = localStorage.getItem(STORAGE_KEYS.session);
  if (!email) return null;

  const users = getFromStorage(STORAGE_KEYS.users);
  return users.find(user => user.email === email) || null;
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.session);
  window.location.href = "login.html";
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function showMessage(element, message, type = "success") {
  element.textContent = message;
  element.className = `form-message ${type}`;
}

function requireLogin() {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = "login.html";
    return null;
  }

  return user;
}

function toggleMobileMenu() {
  const menu = document.getElementById("navLinks");
  menu.classList.toggle("open");
}

function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();

  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }
});