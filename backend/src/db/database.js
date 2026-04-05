const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const DB_PATH = path.join(dataDir, 'todos.db');

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
      due_date    TEXT,
      created_at  TEXT    DEFAULT (datetime('now', 'localtime')),
      updated_at  TEXT    DEFAULT (datetime('now', 'localtime'))
    );
  `);

  try {
    db.exec(`ALTER TABLE todos ADD COLUMN due_date TEXT`);
    console.log('✅ Veritabanı güncellendi: due_date sütunu eklendi.');
  } catch (err) {
    // Sütun zaten varsa SQLite "duplicate column name" hatası fırlatır, yoksayıyoruz.
  }

  console.log('✅ Veritabanı başlatıldı: todos tablosu hazır.');
};

initializeDatabase();

module.exports = db;
