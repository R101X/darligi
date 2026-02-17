# DARLIGI - Mini Marketplace for Digital Products

DARLIGI is a modern full-stack marketplace for selling digital products like templates, presets, e-books, and more.

## Features

- User authentication (JWT)
- Product upload with image and file
- Admin panel for approving products
- Order management
- Modern UI with TailwindCSS
- Responsive design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)

### Frontend
- React + Vite
- TailwindCSS
- Axios
- React Router DOM
- Context API

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB Atlas account

### Installation

1. Clone the repository:
```
bash
git clone <repository-url>
cd Darligi
```

2. Install root dependencies:
```
bash
npm install
```

3. Install backend dependencies:
```
bash
cd backend
npm install
```

4. Install frontend dependencies:
```
bash
cd ../frontend
npm install
```

### Configuration

1. Create backend `.env` file in `backend/` directory:
```
env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

2. Update frontend API URL in `frontend/src/context/AuthContext.jsx`:
```
javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
```

You can also create a `.env` file in the frontend:
```
env
VITE_API_URL=http://localhost:5000/api
```

### Running Locally

1. Start the backend:
```
bash
cd backend
npm start
```

2. Start the frontend (in a new terminal):
```
bash
cd frontend
npm run dev
```

3. Open http://localhost:5173 in your browser

### Building for Production

```
bash
npm run build
npm start
```

This will:
- Build the React frontend
- Serve it from Express backend
- Run on http://localhost:5000

## Creating MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user
5. Network Access: Add IP address `0.0.0.0/0` for development
6. Get connection string:
   - Click "Connect" > "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Creating Admin User

To create an admin user, you can:

1. Register a new user through the website
2. Access your MongoDB database
3. Find the user and update their role to "admin":

```
javascript
// In MongoDB shell
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

Or using MongoDB Compass, change the role field from "user" to "admin".

## Deploying to Render

1. Push your code to GitHub
2. Go to [Render](https://render.com) and create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - Build Command: `npm run build`
   - Start Command: `npm start`
5. Add environment variables in Render dashboard:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `NODE_ENV`: `production`
6. Deploy!

## API Endpoints

### Auth
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (auth required)
- PUT `/api/products/approve/:id` - Approve product (admin)
- DELETE `/api/products/:id` - Delete product

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders/my` - Get my orders
- PUT `/api/orders/pay/:id` - Mark order as paid

### Users
- GET `/api/users` - Get all users (admin)
- PUT `/api/users/profile` - Update profile
- DELETE `/api/users/:id` - Delete user (admin)

## License

MIT
