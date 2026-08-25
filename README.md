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
- 📱 Responsive design

## 🛠️ Technologies Used

### Frontend

- React.js
- React Router
- JavaScript
- HTML5
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- CORS

### Database

- MongoDB
- Mongoose
- MongoDB Atlas

## 🏗️ Project Structure

```text
CodeAlpha_Simple_Ecommerce_Store/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyOrders.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── App.css
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

## 🛍️ Application Workflow

### Home & Products

The home page provides a simple e-commerce interface where users can:

- View available products
- View product prices
- Check stock information
- Open product details
- Add products to the cart

### 🔐 Authentication

Users can:

- Register a new account
- Login to their account
- Access protected features
- View their orders

Authentication is implemented using protected API routes and authentication middleware.

### 🛒 Cart

Users can add products to their cart and review the selected products before checkout.

### 💳 Checkout & Orders

Users can:

- Enter delivery information
- Select the available payment method
- Place an order
- View their previous orders

### 🛠️ Admin Dashboard

The admin dashboard provides order management functionality.

Admin can:

- View total orders
- View pending orders
- View shipped orders
- View delivered orders
- Update order status
- Delete orders

## 🔌 API Modules

### Products

```text
GET     /api/products
GET     /api/products/:id
POST    /api/products
PUT     /api/products/:id
DELETE  /api/products/:id
```

Product creation, updating and deletion are protected by authentication and admin middleware.

### Orders

```text
GET     /api/orders
PATCH   /api/orders/:id/status
DELETE  /api/orders/:id
```

Order management uses protected routes for authorized users and administrators.

### Users

The application provides user registration, login and authentication functionality through the user API.

## 💾 Database

The application uses MongoDB with Mongoose.

Main collections include:

- `users`
- `products`
- `orders`
- `admin`

Product information includes:

- Product name
- Price
- Description
- Image
- Category
- Stock
- Created date
- Updated date

## 🧪 Testing

The application was tested during development for the following functionality:

- User registration
- User login
- Product listing
- Product details
- Add to Cart
- Checkout
- Order creation
- My Orders
- Admin Dashboard
- Order status update
- Order deletion
- MongoDB database integration
- Responsive/mobile layout

The application was also checked using a responsive mobile viewport in Microsoft Edge.

## ▶️ How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/kunwaradityasingh-boy/CodeAlpha_Simple_Ecommerce_Store.git
```

### 2. Start the Backend

Open the server folder:

```bash
cd server
npm install
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Start the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend runs on the Vite development server.

## 🌐 Database Configuration

The backend is connected to MongoDB.

Make sure the MongoDB connection configuration is properly set before starting the server.

## 📸 Screenshots

### 🏠 Home & Products

The application provides a clean interface for browsing products, viewing prices and stock, and adding products to the cart.

### 🔐 Authentication

Users can register and login to access protected features.

### 🛒 Cart & Checkout

Users can add products to the cart and complete the checkout process.

### 🛠️ Admin Dashboard

Administrators can manage orders and update order statuses.

## 🎯 Internship Project

This project was developed as part of the **CodeAlpha Internship – August 2026 Batch**.

## 👨‍💻 Developer

**Kunwar Aditya Singh**

GitHub:

https://github.com/kunwaradityasingh-boy

---

⭐ If you find this project useful, consider giving the repository a star!
