-- Drop table if exists
DROP TABLE IF EXISTS products;

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create simple index for faster searches
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_description ON products(description); 