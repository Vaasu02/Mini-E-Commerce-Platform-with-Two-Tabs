# Mini E-Commerce Platform

A full-stack mini e-commerce platform built with React (Vite) & Tailwind CSS (frontend), Node.js & Express (backend), and PostgreSQL (database).

---

## 🚀 Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Axios, React Hot Toast
- **Backend:** Node.js, Express, PostgreSQL, pg
- **Other:** CORS, dotenv, ESLint

---

## 📁 Project Structure
```
root/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── ...
├── README.md
└── ...
```

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Vaasu02/Mini-E-Commerce-Platform-with-Two-Tabs.git
cd Mini-E-Commerce-Platform-with-Two-Tabs
```

### 2. Backend Setup
```bash
cd backend
npm install
# Configure your PostgreSQL connection in backend/src/config/database.js or via .env
npm run init-db   # Initializes the database and creates tables
npm run dev       # Starts the backend server on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev       # Starts the frontend on http://localhost:5173
```

### 4. Environment Variables
- Backend: Configure your PostgreSQL connection string in `backend/src/config/database.js` or use a `.env` file.
- Frontend: No special environment variables needed for local dev.

---

## ✅ What's Working (Features)
- **Product Submission:** Add new products with name, price, description, and image URL.
- **Product Listing:** View all products in a responsive grid.
- **Edit Product:** Update product details with loading state and validation.
- **Delete Product:** Delete products with a custom confirmation dialog and loading state.
- **Search Products:**
  - Simple Search: Search by product name or keywords.
  - Contextual Search: Search with intent/related terms.
- **Loading & Error States:** All forms and actions have clear feedback.
- **Responsive UI:** Mobile-friendly, professional design with Tailwind CSS.
- **API Integration:** All frontend actions use backend API.
- **Backend Validation:** Input validation and error handling for all endpoints.
- **Health Check Endpoint:** For server/database status.

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/products
```

### 1. Create Product
- **Endpoint:** `POST /api/products`
- **Request Body:**
```json
{
  "name": "Product Name",
  "price": 99.99,
  "description": "Product description...",
  "image_url": "https://example.com/image.jpg"
}
```
- **Success Response:**
```json
{
  "success": true,
  "data": { ...productObject }
}
```
- **Error Response:**
```json
{
  "success": false,
  "error": "Validation error message"
}
```

### 2. Get All Products
- **Endpoint:** `GET /api/products`
- **Success Response:**
```json
{
  "success": true,
  "data": [ ...arrayOfProducts ]
}
```

### 3. Get Single Product
- **Endpoint:** `GET /api/products/:id`
- **Success Response:**
```json
{
  "success": true,
  "data": { ...productObject }
}
```
- **Error Response:**
```json
{
  "success": false,
  "error": "Product not found"
}
```

### 4. Update Product
- **Endpoint:** `PUT /api/products/:id`
- **Request Body:** (any fields to update)
```json
{
  "name": "Updated Name",
  "price": 79.99,
  "description": "Updated description...",
  "image_url": "https://example.com/new.jpg"
}
```
- **Success Response:**
```json
{
  "success": true,
  "data": { ...updatedProductObject }
}
```
- **Error Response:**
```json
{
  "success": false,
  "error": "Validation error or Product not found"
}
```

### 5. Delete Product
- **Endpoint:** `DELETE /api/products/:id`
- **Success Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```
- **Error Response:**
```json
{
  "success": false,
  "error": "Product not found"
}
```

### 6. Search Products
- **Endpoint:** `GET /api/products/search?q=keyword&type=simple|contextual`
- **Query Params:**
  - `q`: Search query string
  - `type`: `simple` (default) or `contextual`
- **Example Queries:**
  - Simple Search: `/api/products/search?q=gaming&type=simple`
    - Matches exact keywords in product name and description
    - Example: Will find products with "gaming laptop" in name/description
  - Contextual Search: `/api/products/search?q=Need something to sit with my family&type=contextual` 
- **Success Response:**

### 7. Health Check
- **Endpoint:** `GET /health`
- **Success Response:**
```json
{
  "success": true,
  "message": "Server and database are healthy"
}
```

---

## 📝 Notes
- All API responses are JSON.
- All endpoints handle errors gracefully and return a `success: false` with an error message.
- The frontend and backend must be running for full functionality.
- CORS is enabled for local development.
- For production, update environment variables and security settings as needed.

---

## 🙌 Author & Credits
- Developed by Vasu
- Inspired by modern e-commerce UI/UX best practices

---

Feel free to reach out for any questions or improvements!
