# 🔧 E-Commerce Backend API

Backend service for the e-commerce application built with Node.js, Express, and MySQL.

**Frontend Repository**: [https://github.com/MananBagadi100/ecommerce-frontend](https://github.com/MananBagadi100/ecommerce-frontend)

---

## 🚀 Quick Setup

### Prerequisites

- Node.js (v14+)
- MySQL (v8+)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

### Start Server

```bash
npm start
```

Server runs on `http://localhost:5000`

---

## 🗄️ Database Schema

### Table: users

| Column | Type | Description |
|--------|------|-------------|
| user_id | INT | Primary key, auto increment |
| username | VARCHAR(35) | Unique username |
| email | VARCHAR(35) | User email |
| password | VARCHAR(255) | Hashed password (bcrypt) |
| contactNo | VARCHAR(15) | Contact number |

### Table: userQueries

| Column | Type | Description |
|--------|------|-------------|
| query_id | INT | Primary key, auto increment (starts at 1000) |
| user_id | INT | Foreign key → users.user_id |
| issueType | VARCHAR(35) | Type of issue |
| issueMessage | VARCHAR(1000) | Message content |
| created_at | DATETIME | Auto timestamp |

### Table: orders

| Column | Type | Description |
|--------|------|-------------|
| order_id | INT | Primary key, auto increment |
| user_id | INT | Foreign key → users.user_id |
| address | VARCHAR(255) | Delivery address |
| payment_method | VARCHAR(50) | Payment method used |
| total_amount | DECIMAL(10,2) | Total price |
| placed_at | TIMESTAMP | Auto timestamp |
| status | ENUM | 'Pending', 'Shipped', 'Delivered', 'Cancelled' |

### Table: order_items

| Column | Type | Description |
|--------|------|-------------|
| item_id | INT | Primary key, auto increment |
| order_id | INT | Foreign key → orders.order_id |
| product_id | INT | Product reference ID |
| title | VARCHAR(255) | Product title |
| price | DECIMAL(10,2) | Product price at purchase |
| quantity | INT | Quantity ordered |
| image | TEXT | Product image URL |

---

## 🛣️ API Routes

### Public Routes (`/api/public`)

#### Authentication

- **POST** `/register` — Register a new user
- **POST** `/login` — Login user (returns JWT token)

#### Products

- **GET** `/products` — Fetch all products
- **GET** `/products/:id` — Fetch single product

---

### Protected Routes (`/api/protected`)

*All routes require valid JWT token in Authorization header*

#### Cart & Checkout

- **POST** `/cart` — Add item to cart
- **DELETE** `/cart/:id` — Remove item from cart
- **GET** `/cart` — Get user's cart

#### Orders

- **POST** `/orders` — Create new order
- **GET** `/orders` — Get user's orders
- **GET** `/orders/:id` — Get order details

#### Contact Us

- **POST** `/contact` — Submit a support query (user_id required)
- **GET** `/contact` — Get user's queries

#### User Profile

- **GET** `/profile` — Get user profile
- **PUT** `/profile` — Update user profile

---

## 🏗️ Folder Structure

```
backend/
 ├── controllers/
 │   ├── EcomController.js        # Public endpoint logic
 │   └── ProtectedController.js   # Protected endpoint logic
 ├── models/
 │   ├── PublicModels.js          # Public database queries
 │   └── ProtectedModels.js       # Protected database queries
 ├── routes/
 │   ├── publicRoutes.js          # Public API routes
 │   └── protectedRoutes.js       # Protected API routes
 ├── middleware/
 │   └── verifyToken.js           # JWT verification middleware
 ├── server.js                    # Express app entry point
 ├── .env                         # Environment variables
 └── package.json
```

---

## 🔐 Authentication

The backend uses **JWT (JSON Web Tokens)** for authentication:

1. User registers/logs in
2. Server returns JWT token
3. Client stores token in cookie/localStorage
4. Client includes token in `Authorization: Bearer <token>` header for protected routes
5. `verifyToken` middleware validates token on protected routes

### Protected Route Example

```javascript
router.get('/profile', verifyToken, (req, res) => {
  // req.userId available after token verification
  // ...
});
```

---

## 🚀 Deployment (Render)

1. Push code to GitHub
2. Go to [Render](https://render.com) → New Web Service
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add all environment variables from `.env`
7. Deploy

Your backend URL: `https://ecommerce-backend.onrender.com (replace with your actual backend deployment URL if different)`

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| express | Web framework |
| mysql2 | MySQL database client |
| jwt | Token generation & verification |
| bcrypt | Password hashing |
| cors | Cross-origin request handling |
| dotenv | Environment variables |

---

## 🧩 Author

**👨‍💻 Manan Bagadi**

Full Stack Developer | Machine Learning Enthusiast

📧 mananbagadi100@gmail.com

🌐 [https://www.linkedin.com/in/manan-bagadi-8599b0225/](https://www.linkedin.com/in/manan-bagadi-8599b0225/)

---

## ✅ Status

All core features complete. Project ready for deployment and demonstration for internship or job applications.