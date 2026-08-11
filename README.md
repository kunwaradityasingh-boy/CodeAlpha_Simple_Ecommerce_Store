# 🛒 CodeAlpha Simple E-Commerce Store

A full-stack e-commerce web application built as part of the CodeAlpha internship.

The project provides a simple shopping experience with product management, user authentication, order management, and a React-based frontend connected to a Node.js/Express backend and MongoDB database.

## 🚀 Features

- 🛍️ Product listing
- 🔐 User registration and login
- 👤 User authentication
- 🛡️ Admin authentication and middleware
- 📦 Product management
- 🧾 Order management
- 🛒 Add to Cart
- 💾 MongoDB database integration
- 🔗 REST API architecture
- ⚛️ React frontend
- 🚀 Node.js and Express backend
- 🌐 CORS enabled

## 🏗️ Project Structure

```text
CodeAlpha_Simple_Ecommerce_store/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.cs
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── README.md
```
## 📸 Screenshots

### 🏠 Home & Products

The application provides a clean e-commerce interface with product listing, pricing, stock information, and Add to Cart functionality.

### 🔐 Authentication

User authentication and protected API routes are implemented using authentication middleware.

### 🛠️ Backend API

The backend provides REST APIs for products, users, and orders using Node.js, Express, and MongoDB.
