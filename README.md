# ProShop

ProShop is a full-featured e-commerce application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This project allows users to browse products, manage their cart, place orders, and process payments efficiently. It is designed with scalability, responsiveness, and maintainability in mind.

## Features

- User Authentication and Authorization (JWT-based)
- Admin Dashboard for managing products, users, and orders
- Product browsing, search, and filtering
- Shopping cart functionality
- Order placement and payment integration
- Responsive design for mobile and desktop
- RESTful APIs for backend operations

## Tech Stack

### Frontend
- React.js: Component-based user interface
- Redux Toolkit: State management
- React Router: Client-side routing
- Axios: HTTP client for API requests
- Bootstrap: Styling framework for responsive design

### Backend
- Node.js: Backend runtime environment
- Express.js: Web framework for building APIs
- MongoDB: NoSQL database for storing application data
- Mongoose: Object Data Modeling (ODM) library for MongoDB
- JSON Web Tokens (JWT): Authentication system
- Bcrypt.js: Password hashing

## Installation and Setup

To run this project locally, follow these steps:

### Prerequisites
Ensure you have the following installed:
- Node.js: https://nodejs.org/
- MongoDB: https://www.mongodb.com/try/download/community

### Clone the Repository
```
git clone https://github.com/Yedidia-Bakuradze/ProShop.git cd ProShop
```

### Install Dependencies

#### Backend Dependencies
```
cd backend npm install
```

#### Frontend Dependencies
```
cd frontend npm install
```

### Environment Variables
Create a `.env` file in the `backend` directory and configure the following variables:
```
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```


### Run the Application

#### Start the Backend
```
cd frontend npm start
```


Both the backend and frontend will run concurrently. The backend will be available at `http://localhost:5000`, and the frontend at `http://localhost:3000`.

## Project Structure
```
ProShop/
├── backend/
│   ├── config/          # Configuration files (DB, auth, etc.)
│   ├── controllers/     # Route controllers for API endpoints
│   ├── data/            # Seed data and data utilities
│   ├── middleware/      # Custom middleware (auth, error handling, etc.)
│   ├── models/          # MongoDB models/schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions and utilities
│   └── server.js        # Express server setup and configuration
├── frontend/
│   ├── public/          # Static files and assets
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── constants/   # Application constants and action types
│   │   ├── reducers/    # Redux reducers
│   │   ├── screens/     # Page components for different routes
│   │   ├── store/       # Redux store configuration
│   │   └── App.js       # Main React component
└── README.md            # Project documentation
```

## API Endpoints

### User Endpoints
- `POST /api/users/login` - Authenticate user and retrieve token
- `POST /api/users` - Register a new user
- `GET /api/users/profile` - Get user profile (protected route)

### Product Endpoints
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch product details

### Order Endpoints
- `POST /api/orders` - Create a new order
- `GET /api/orders/:id` - Get order details (protected route)
- `PUT /api/orders/:id/pay` - Update order to paid (protected route)

## Deployment

ProShop can be deployed to platforms like Heroku (https://www.heroku.com/) or Vercel (https://vercel.com/) for production.

### Build for Production
To build the frontend for production, run:
```
cd frontend npm run build
```

The built project will be located in the `frontend/build` directory.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request


## Acknowledgements

This is a project made by following a Udemy course (Brad Traversy) and was my hands-on learning of MERN and full-stack development.
