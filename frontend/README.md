# Aurum & Co. - Frontend

React frontend for the Aurum & Co. luxury jewelry and watches store.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Features

- Browse products with advanced filtering
- View product details
- Add products to cart
- Personalized engraving options
- Secure checkout process
- User authentication
- Order management

## File Structure

```
src/
├── pages/
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   └── Checkout.jsx
├── components/
│   └── Navbar.jsx
├── styles/
│   └── *.css
├── services/
│   └── api.js
├── App.jsx
└── index.js
```

## Technologies Used

- React 18
- React Router v6
- Axios
- CSS3
