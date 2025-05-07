const pool = require('./database');
const fs = require('fs');
const path = require('path');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function initializeDatabase(retries = 3) {
  let client;
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempting to connect to database (attempt ${i + 1}/${retries})...`);
      console.log('Connection details:', {
        host: pool.options.host,
        port: pool.options.port,
        database: pool.options.database,
        user: pool.options.user
      });
      
      client = await pool.connect();
      console.log('Connected to database successfully');

      // Read the schema file
      const schemaPath = path.join(__dirname, 'schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');

      // Execute the schema
      console.log('Executing schema...');
      await client.query(schema);
      console.log('Database schema initialized successfully');
      return;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error.message);
      if (error.code === 'ECONNREFUSED') {
        console.error('Connection refused. Please check if the database is running and accessible.');
      }
      if (i < retries - 1) {
        console.log('Retrying in 5 seconds...');
        await sleep(5000);
      }
    } finally {
      if (client) {
        client.release();
      }
    }
  }
  
  console.error('Failed to initialize database after', retries, 'attempts');
  process.exit(1);
}

// Run if this file is executed directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase; 