const { Pool } = require('pg');

const pool = new Pool({
  host: 'dpg-d0domsuuk2gs73dbuhh0-a.oregon-postgres.render.com',
  port: 5432,
  database: 'mypostgredb_of6w',
  user: 'mypostgredb_of6w_user',
  password: 'wqAdGFrFFsAYkyvgVwF6900v9kFlqwhD',
  ssl: {
    rejectUnauthorized: false
  },
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 10000, // Increased timeout
  keepAlive: true, // Enable keep-alive
  keepAliveInitialDelayMillis: 10000 // Keep-alive interval
});

// Function to test connection with retries
async function testConnection(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      console.log('Successfully connected to database');
      client.release();
      return true;
    } catch (err) {
      console.error(`Connection attempt ${i + 1} failed:`, err.message);
      if (i < retries - 1) {
        console.log('Retrying in 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
  return false;
}

// Test connection on startup
testConnection().then(success => {
  if (!success) {
    console.error('Failed to connect to database after multiple attempts');
  }
});

// Handle pool errors
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // Don't exit the process, just log the error
});

module.exports = pool; 