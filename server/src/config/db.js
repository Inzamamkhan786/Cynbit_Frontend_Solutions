const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { Pool } = require('pg');

let dbInstance = null;
let isPostgres = false;

const initDatabase = async () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl && (databaseUrl.startsWith('postgres://') || databaseUrl.startsWith('postgresql://'))) {
    console.log('Connecting to PostgreSQL database...');
    const pool = new Pool({
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });

    // Test connection
    const client = await pool.connect();
    client.release();
    console.log('Connected to PostgreSQL successfully.');
    isPostgres = true;
    dbInstance = pool;
    await setupPostgresSchema(pool);
  } else {
    // Default zero-config SQLite
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, 'cynbit_discovery.sqlite');
    console.log(`Connecting to SQLite database at ${dbPath}...`);

    dbInstance = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Failed to connect to SQLite database:', err.message);
      } else {
        console.log('Connected to SQLite database successfully.');
      }
    });

    isPostgres = false;
    await setupSqliteSchema(dbInstance);
  }
};

const setupSqliteSchema = (db) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // 1. Admin Users Table
      db.run(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          full_name TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'admin',
          created_at TEXT NOT NULL,
          last_login TEXT
        )
      `);

      // 2. Enquiries Table
      db.run(`
        CREATE TABLE IF NOT EXISTS enquiries (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          reference_id TEXT UNIQUE NOT NULL,
          services TEXT NOT NULL,
          project_name TEXT NOT NULL,
          project_desc TEXT NOT NULL,
          objective TEXT NOT NULL,
          target_audience TEXT NOT NULL,
          features TEXT,
          budget TEXT NOT NULL,
          timeline TEXT NOT NULL,
          full_name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          company TEXT,
          status TEXT NOT NULL DEFAULT 'New',
          admin_notes TEXT DEFAULT '',
          ip_address TEXT,
          user_agent TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        )
      `);

      // 3. Enquiry Status Logs Table
      db.run(`
        CREATE TABLE IF NOT EXISTS enquiry_status_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          enquiry_id INTEGER NOT NULL,
          old_status TEXT NOT NULL,
          new_status TEXT NOT NULL,
          changed_by TEXT NOT NULL,
          note TEXT,
          created_at TEXT NOT NULL,
          FOREIGN KEY (enquiry_id) REFERENCES enquiries(id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
};

const setupPostgresSchema = async (pool) => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'admin',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      last_login TIMESTAMP WITH TIME ZONE
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id SERIAL PRIMARY KEY,
      reference_id VARCHAR(50) UNIQUE NOT NULL,
      services TEXT NOT NULL,
      project_name VARCHAR(255) NOT NULL,
      project_desc TEXT NOT NULL,
      objective VARCHAR(255) NOT NULL,
      target_audience VARCHAR(255) NOT NULL,
      features TEXT,
      budget VARCHAR(100) NOT NULL,
      timeline VARCHAR(100) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      company VARCHAR(255),
      status VARCHAR(50) NOT NULL DEFAULT 'New',
      admin_notes TEXT DEFAULT '',
      ip_address VARCHAR(100),
      user_agent TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS enquiry_status_logs (
      id SERIAL PRIMARY KEY,
      enquiry_id INTEGER REFERENCES enquiries(id) ON DELETE CASCADE,
      old_status VARCHAR(50) NOT NULL,
      new_status VARCHAR(50) NOT NULL,
      changed_by VARCHAR(255) NOT NULL,
      note TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

// Database execution wrappers for agnostic promise-based querying
const get = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    if (isPostgres) {
      // Convert ? to $1, $2, etc. for PostgreSQL
      let paramIndex = 1;
      const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
      dbInstance.query(pgSql, params, (err, res) => {
        if (err) return reject(err);
        resolve(res.rows[0] || null);
      });
    } else {
      dbInstance.get(sql, params, (err, row) => {
        if (err) return reject(err);
        resolve(row || null);
      });
    }
  });
};

const all = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    if (isPostgres) {
      let paramIndex = 1;
      const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
      dbInstance.query(pgSql, params, (err, res) => {
        if (err) return reject(err);
        resolve(res.rows || []);
      });
    } else {
      dbInstance.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows || []);
      });
    }
  });
};

const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    if (isPostgres) {
      let paramIndex = 1;
      let pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
      // If INSERT, append RETURNING id to get lastID equivalent
      if (pgSql.trim().toUpperCase().startsWith('INSERT') && !pgSql.toUpperCase().includes('RETURNING')) {
        pgSql += ' RETURNING id';
      }
      dbInstance.query(pgSql, params, (err, res) => {
        if (err) return reject(err);
        resolve({
          lastID: res.rows && res.rows[0] ? res.rows[0].id : null,
          changes: res.rowCount,
        });
      });
    } else {
      dbInstance.run(sql, params, function (err) {
        if (err) return reject(err);
        resolve({
          lastID: this.lastID,
          changes: this.changes,
        });
      });
    }
  });
};

module.exports = {
  initDatabase,
  get,
  all,
  run,
  getDbInstance: () => dbInstance,
};
