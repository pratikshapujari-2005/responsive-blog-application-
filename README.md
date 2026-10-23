# InkFlow — Responsive Blog Application

InkFlow is a professional, fully responsive blog application built using **HTML, CSS, and JavaScript**. It allows users to register, log in, create blog posts, manage drafts and published posts, and view published articles on the home page.

## Features

- Responsive design for mobile, tablet, and desktop
- Home page with published blog cards
- User registration and login
- Client-side form validation
- Personal dashboard
- Blog statistics: total, published, and draft posts
- Create blog with title, category, excerpt, content, and status
- Publish or save blogs as drafts
- Delete blogs from the dashboard
- Browser-based data storage using localStorage
- Clean, modern UI with smooth hover effects
- Mobile navigation menu

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Displays published blogs and introduces the platform |
| Login | `login.html` | Allows registered users to log in |
| Register | `register.html` | Creates a new user account |
| Dashboard | `dashboard.html` | Displays blog statistics and user blogs |
| Create Blog | `create-blog.html` | Allows users to write and publish blogs |

## Project Structure

```text
blog-app/
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── create-blog.html
├── css/
│   └── style.css
└── js/
    ├── app.js
    ├── auth.js
    └── blogs.js
```

## Technologies Used

- HTML5
- CSS3
- JavaScript
- localStorage
- Responsive Web Design
- Git and GitHub

## How to Run Locally

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Install the **Live Server** extension.
4. Right-click `index.html`.
5. Select **Open with Live Server**.
6. The website will open in your browser.

Alternatively, open `index.html` directly in any modern web browser.

## How to Use

1. Open the Register page.
2. Create an account with your name, email, and password.
3. Log in using the same credentials.
4. Go to **Create Blog**.
5. Add a blog title, category, excerpt, and content.
6. Select either **Draft** or **Published**.
7. Save the blog.
8. View published posts on the Home page.
9. Manage your blogs from the Dashboard.

## Demo Credentials

This project uses browser localStorage, so you need to create your own account first.

Example test account:

```text
Name: Demo User
Email: demo@example.com
Password: demo123
```

## Important Note

This is a front-end demonstration project. User data and blog posts are stored in the browser using localStorage, not in a real database. For production use, connect the application to a secure backend and database.

## Future Improvements

- Backend authentication with hashed passwords
- Database integration
- Blog editing feature
- Comments and likes
- Image uploads
- Search and filters
- Admin dashboard
- Deployment using GitHub Pages, Netlify, or Vercel

## Author

Created as a responsive front-end blog application project.