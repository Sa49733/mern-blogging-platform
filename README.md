# 📝 Blogosphere - MERN Blogging Platform

A full-stack blogging platform built using the **MERN Stack** where users can create, edit, delete, like, comment, bookmark, and share blogs with secure JWT authentication.
# 🌐 Live Demo

### Frontend (Vercel)
🔗 https://mern-blogging-platform-npmx.vercel.app

### Backend API (Render)
🔗 https://mern-blogging-platform-1-c4b9.onrender.com

### API Base URL
```
https://mern-blogging-platform-1-c4b9.onrender.com/api
```



- 🏠 Home Page
- ✍️ Create Blog
- 📖 Blog Details
- 👤 Profile Dashboard
- 🔖 Saved Blogs
- 🌙 Dark Mode

---

## 🚀 Features

### 👤 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing using bcrypt

### 📝 Blog Management
- Create Blog
- Edit Blog
- Delete Blog
- Upload Cover Image
- Cloudinary Image Storage

### ❤️ Social Features
- Like / Unlike Blogs
- Comment on Blogs
- Like / Unlike Comments
- Bookmark / Save Blogs
- Social Sharing
  - WhatsApp
  - LinkedIn
  - X (Twitter)
  - Copy Link

### 📊 Dashboard Analytics
- Total Blogs
- Total Views
- Total Likes
- Total Comments

### 🔍 Additional Features
- Search Blogs
- Pagination
- Blog Views Counter
- Reading Time Estimation
- Responsive Mobile Navbar
- Dark / Light Mode
- Image Preview Before Upload

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcryptjs
- Multer

## Database

- MongoDB Atlas
- Mongoose

## Image Storage

- Cloudinary

## Deployment

- Frontend → Vercel
- Backend → Render

---

# 📂 Folder Structure

```
mern-blogging-platform
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Sa49733/mern-blogging-platform.git
```

```bash
cd mern-blogging-platform
```

---

## Backend Setup

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME

CLOUDINARY_API_KEY=YOUR_API_KEY

CLOUDINARY_API_SECRET=YOUR_API_SECRET
```

Run backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend

```bash
npm run dev
```

---

# 🌐 Production URLs

## Frontend

https://mern-blogging-platform-npmx.vercel.app

## Backend

https://mern-blogging-platform-1-c4b9.onrender.com

---

# 📡 REST API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/profile |

---

## Blogs

| Method | Endpoint |
|----------|----------------|
| POST | /api/blogs |
| GET | /api/blogs |
| GET | /api/blogs/:id |
| PUT | /api/blogs/:id |
| DELETE | /api/blogs/:id |
| PUT | /api/blogs/:id/like |

---

## Comments

| Method | Endpoint |
|----------|----------------|
| POST | /api/comments/:blogId |
| GET | /api/comments/:blogId |
| POST | /api/comments/like/:commentId |

---

## Bookmarks

| Method | Endpoint |
|----------|----------------|
| POST | /api/auth/bookmark/:blogId |
| GET | /api/auth/bookmarks |

---

# 🔐 Authentication Flow

```
User Login
      │
      ▼
JWT Generated
      │
      ▼
Stored in Local Storage
      │
      ▼
Authorization Header
      │
      ▼
Backend Middleware
      │
      ▼
Protected Routes
```

---

# ☁️ Image Upload Flow

```
Choose Image
      │
      ▼
React FormData
      │
      ▼
Axios
      │
      ▼
Express
      │
      ▼
Multer
      │
      ▼
Cloudinary
      │
      ▼
MongoDB stores Image URL
```

---

# 📱 Responsive Design

✔ Desktop

✔ Tablet

✔ Mobile

✔ Responsive Navbar

✔ Dark Mode

---

# 🔮 Future Improvements

- Email Verification
- Forgot Password
- Reset Password
- Categories
- Tags
- Rich Text Editor
- Admin Dashboard
- User Follow System
- Notifications
- Infinite Scroll
- AI Blog Suggestions

---

# 👨‍💻 Author

**Saurabh Yadav**

GitHub

https://github.com/Sa49733



