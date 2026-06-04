# MERN Blogging Platform

A full-stack blogging platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

* User Registration
* User Login with JWT Authentication
* Protected Routes
* Create Blog Posts
* View All Blogs
* View Single Blog Details
* Add Comments to Blogs
* Search Blogs
* Pagination
* MongoDB Atlas Integration

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

## Project Structure

blogging-platform/
├── client/
├── server/
└── README.md

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/mern-blogging-platform.git
cd mern-blogging-platform
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

## API Endpoints

### Authentication

* POST /api/auth/register
* POST /api/auth/login

### Blogs

* GET /api/blogs
* GET /api/blogs/:id
* POST /api/blogs
* PUT /api/blogs/:id
* DELETE /api/blogs/:id

### Comments

* GET /api/comments/:blogId
* POST /api/comments/:blogId

## Author

Saurabh Yadav
