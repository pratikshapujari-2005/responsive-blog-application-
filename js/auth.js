document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});

function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("formMessage");

  if (password.length < 6) {
    showMessage(message, "Password must be at least 6 characters.", "error");
    return;
  }

  if (password !== confirmPassword) {
    showMessage(message, "Passwords do not match.", "error");
    return;
  }

  const users = getFromStorage(STORAGE_KEYS.users);

  if (users.some(user => user.email === email)) {
    showMessage(message, "An account with this email already exists.", "error");
    return;
  }

  users.push({ name, email, password, createdAt: new Date().toISOString() });
  saveToStorage(STORAGE_KEYS.users, users);

  showMessage(message, "Account created successfully! Redirecting...", "success");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1200);
}

function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const message = document.getElementById("formMessage");

  const users = getFromStorage(STORAGE_KEYS.users);
  const user = users.find(
    account => account.email === email && account.password === password
  );

  if (!user) {
    showMessage(message, "Invalid email or password.", "error");
    return;
  }

  localStorage.setItem(STORAGE_KEYS.session, user.email);
  showMessage(message, "Login successful! Redirecting...", "success");

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1000);
}