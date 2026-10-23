document.addEventListener("DOMContentLoaded", () => {
  const createBlogForm = document.getElementById("createBlogForm");
  const blogTableBody = document.getElementById("blogTableBody");

  if (createBlogForm) {
    const user = requireLogin();
    if (user) {
      document.getElementById("authorName").textContent = user.name;
      createBlogForm.addEventListener("submit", handleCreateBlog);
    }
  }

  if (blogTableBody) {
    const user = requireLogin();
    if (user) {
      document.getElementById("dashboardName").textContent = user.name;
      renderDashboard(user.email);
    }
  }

  const homeBlogGrid = document.getElementById("homeBlogGrid");
  if (homeBlogGrid) {
    renderHomeBlogs();
  }
});

function handleCreateBlog(event) {
  event.preventDefault();

  const user = getCurrentUser();
  const message = document.getElementById("formMessage");

  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value;
  const status = document.getElementById("status").value;
  const excerpt = document.getElementById("excerpt").value.trim();
  const content = document.getElementById("content").value.trim();

  if (title.length < 5) {
    showMessage(message, "Title must be at least 5 characters.", "error");
    return;
  }

  if (excerpt.length < 20) {
    showMessage(message, "Excerpt must be at least 20 characters.", "error");
    return;
  }

  if (content.length < 50) {
    showMessage(message, "Blog content must be at least 50 characters.", "error");
    return;
  }

  const blogs = getFromStorage(STORAGE_KEYS.blogs);

  blogs.unshift({
    id: Date.now(),
    title,
    category,
    status,
    excerpt,
    content,
    author: user.name,
    authorEmail: user.email,
    createdAt: new Date().toISOString()
  });

  saveToStorage(STORAGE_KEYS.blogs, blogs);

  showMessage(message, "Blog saved successfully!", "success");
  event.target.reset();

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1000);
}

function renderHomeBlogs() {
  const grid = document.getElementById("homeBlogGrid");
  const blogs = getFromStorage(STORAGE_KEYS.blogs).filter(
    blog => blog.status === "Published"
  );

  if (blogs.length === 0) {
    grid.innerHTML = `<p class="empty-text">No published blogs yet. Create the first one!</p>`;
    return;
  }

  grid.innerHTML = blogs.map(blog => `
    <article class="blog-card">
      <div class="blog-cover">📝</div>
      <div class="blog-body">
        <span class="blog-tag">${blog.category}</span>
        <h3>${escapeHTML(blog.title)}</h3>
        <p>${escapeHTML(blog.excerpt)}</p>
        <div class="blog-meta">
          <span>By ${escapeHTML(blog.author)}</span>
          <span>${formatDate(blog.createdAt)}</span>
        </div>
      </div>
    </article>
  `).join("");
}

function renderDashboard(email) {
  const blogs = getFromStorage(STORAGE_KEYS.blogs).filter(
    blog => blog.authorEmail === email
  );

  document.getElementById("totalBlogs").textContent = blogs.length;
  document.getElementById("publishedBlogs").textContent =
    blogs.filter(blog => blog.status === "Published").length;
  document.getElementById("draftBlogs").textContent =
    blogs.filter(blog => blog.status === "Draft").length;

  const tableBody = document.getElementById("blogTableBody");

  if (blogs.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4">You have not created any blogs yet.</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = blogs.map(blog => `
    <tr>
      <td>
        <strong>${escapeHTML(blog.title)}</strong><br>
        <small>${escapeHTML(blog.excerpt)}</small>
      </td>
      <td>${blog.category}</td>
      <td>
        <span class="status ${blog.status.toLowerCase()}">${blog.status}</span>
      </td>
      <td>
        <button class="btn btn-danger" onclick="deleteBlog(${blog.id})">
          Delete
        </button>
      </td>
    </tr>
  `).join("");
}

function deleteBlog(id) {
  const blogs = getFromStorage(STORAGE_KEYS.blogs);
  const updatedBlogs = blogs.filter(blog => blog.id !== id);

  saveToStorage(STORAGE_KEYS.blogs, updatedBlogs);

  const user = getCurrentUser();
  renderDashboard(user.email);
}

function escapeHTML(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}