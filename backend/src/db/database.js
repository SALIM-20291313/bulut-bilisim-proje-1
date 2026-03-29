const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../data/todos.db');

// Veritabanı bağlantısını oluştur
const db = new Database(DB_PATH);

// Performans için WAL modunu etkinleştir
db.pragma('journal_mode = WAL');

// Todos tablosunu oluştur (yoksa)
const initializeDatabase = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      title       TEXT    NOT NULL,
      description TEXT    DEFAULT '',
      completed   INTEGER DEFAULT 0,
      priority    TEXT    DEFAULT 'medium',
      created_at  TEXT    DEFAULT (datetime('now', 'localtime')),
      updated_at  TEXT    DEFAULT (datetime('now', 'localtime'))
    );
  `);

  console.log('✅ Veritabanı başlatıldı: todos tablosu hazır.');
};

initializeDatabase();

module.exports = db;
