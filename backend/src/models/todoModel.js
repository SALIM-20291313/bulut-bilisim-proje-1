const db = require('../db/database');

/**
 * Todo Model — Veritabanı işlemlerini soyutlar
 */
const TodoModel = {
  /**
   * Tüm görevleri getir
   * @param {Object} filters - Filtreleme seçenekleri
   */
  findAll({ completed, priority } = {}) {
    let query = 'SELECT * FROM todos';
    const params = [];
    const conditions = [];

    if (completed !== undefined) {
      conditions.push('completed = ?');
      params.push(completed === 'true' || completed === true ? 1 : 0);
    }

    if (priority) {
      conditions.push('priority = ?');
      params.push(priority);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';

    return db.prepare(query).all(...params);
  },

  /**
   * ID ile tek görev getir
   */
  findById(id) {
    return db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
  },

  /**
   * Yeni görev oluştur
   */
  create({ title, description = '', priority = 'medium' }) {
    const stmt = db.prepare(`
      INSERT INTO todos (title, description, priority)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(title, description, priority);
    return this.findById(result.lastInsertRowid);
  },

  /**
   * Mevcut görevi güncelle
   */
  update(id, { title, description, completed, priority }) {
    const todo = this.findById(id);
    if (!todo) return null;

    const updatedTitle       = title !== undefined       ? title       : todo.title;
    const updatedDescription = description !== undefined ? description : todo.description;
    const updatedCompleted   = completed !== undefined   ? (completed ? 1 : 0) : todo.completed;
    const updatedPriority    = priority !== undefined    ? priority    : todo.priority;

    db.prepare(`
      UPDATE todos
      SET title = ?, description = ?, completed = ?, priority = ?,
          updated_at = datetime('now', 'localtime')
      WHERE id = ?
    `).run(updatedTitle, updatedDescription, updatedCompleted, updatedPriority, id);

    return this.findById(id);
  },

  /**
   * Görevi sil
   */
  delete(id) {
    const todo = this.findById(id);
    if (!todo) return null;
    db.prepare('DELETE FROM todos WHERE id = ?').run(id);
    return todo;
  },

  /**
   * İstatistikler
   */
  getStats() {
    const total     = db.prepare('SELECT COUNT(*) as count FROM todos').get().count;
    const completed = db.prepare('SELECT COUNT(*) as count FROM todos WHERE completed = 1').get().count;
    const pending   = total - completed;
    return { total, completed, pending };
  },
};

module.exports = TodoModel;
