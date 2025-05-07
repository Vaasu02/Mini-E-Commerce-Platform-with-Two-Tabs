const pool = require('../config/database');

class Product {
  static async create({ name, price, description, image_url }) {
    const result = await pool.query(
      `INSERT INTO products (name, price, description, image_url)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, price, description, image_url]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async update(id, { name, price, description, image_url }) {
    const result = await pool.query(
      `UPDATE products 
       SET name = COALESCE($1, name),
           price = COALESCE($2, price),
           description = COALESCE($3, description),
           image_url = COALESCE($4, image_url),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [name, price, description, image_url, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  // Simple search - exact keyword matching
  static async simpleSearch(keyword) {
    const result = await pool.query(
      `SELECT * FROM products 
       WHERE name ILIKE $1 
       OR description ILIKE $1 
       ORDER BY created_at DESC`,
      [`%${keyword}%`]
    );
    return result.rows;
  }

  // Contextual search - keyword matching with intent understanding
  static async contextualSearch(query) {
    // Convert query to lowercase for better matching
    const searchQuery = query.toLowerCase();
    
    // Define common keywords and their related terms
    const keywordMap = {
      'sit': ['sofa', 'chair', 'couch', 'bench', 'stool'],
      'sleep': ['bed', 'mattress', 'pillow'],
      'eat': ['table', 'dining', 'chair', 'plate'],
      'work': ['desk', 'chair', 'computer', 'laptop'],
      'family': ['sofa', 'table', 'chair', 'bed'],
      'comfort': ['sofa', 'chair', 'bed', 'cushion'],
      'storage': ['cabinet', 'shelf', 'wardrobe', 'closet'],
      'light': ['lamp', 'light', 'chandelier'],
      'decor': ['painting', 'vase', 'curtain', 'rug']
    };

    // Extract keywords from the query
    const keywords = Object.keys(keywordMap).filter(key => searchQuery.includes(key));
    
    // Get related terms for the found keywords
    const relatedTerms = keywords.flatMap(key => keywordMap[key]);
    
    // Create search conditions
    const searchConditions = [
      ...keywords.map(k => `name ILIKE '%${k}%'`),
      ...keywords.map(k => `description ILIKE '%${k}%'`),
      ...relatedTerms.map(term => `name ILIKE '%${term}%'`),
      ...relatedTerms.map(term => `description ILIKE '%${term}%'`)
    ];

    // If no keywords found, fall back to simple search
    if (searchConditions.length === 0) {
      return this.simpleSearch(query);
    }

    // Build and execute the query
    const queryString = `
      SELECT * FROM products 
      WHERE ${searchConditions.join(' OR ')}
      ORDER BY created_at DESC
    `;

    const result = await pool.query(queryString);
    return result.rows;
  }
}

module.exports = Product; 