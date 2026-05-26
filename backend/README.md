# Aurum & Co. - Backend API

Express.js backend for the Aurum & Co. luxury jewelry and watches store.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/aurum-store
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
PORT=5000
NODE_ENV=development
```

3. Start development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get single product
- `POST /api/products/:id/reviews` - Add product review (requires auth)
- `POST /api/products` - Create product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

### Cart
- `GET /api/cart` - Get user cart (requires auth)
- `POST /api/cart/add` - Add item to cart (requires auth)
- `POST /api/cart/remove` - Remove item from cart (requires auth)
- `POST /api/cart/update` - Update item quantity (requires auth)
- `POST /api/cart/clear` - Clear cart (requires auth)

### Orders
- `GET /api/orders` - Get user orders (requires auth)
- `GET /api/orders/:id` - Get order details (requires auth)
- `POST /api/orders` - Create order (requires auth)
- `POST /api/orders/:id/cancel` - Cancel order (requires auth)

### Engraving
- `GET /api/engraving/options` - Get engraving options
- `POST /api/engraving/validate` - Validate engraving text (requires auth)
- `POST /api/engraving/preview` - Get engraving preview (requires auth)

## Database Models

- **User**: User account information
- **Product**: Product catalog with details and reviews
- **Cart**: Shopping cart items
- **Order**: Order history and status

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```
