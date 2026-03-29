const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoStats,
} = require('../controllers/todoController');

/**
 * @route   GET /api/todos/stats
 * @desc    Görev istatistiklerini getir (toplam, tamamlanan, bekleyen)
 * @access  Public
 */
router.get('/stats', getTodoStats);

/**
 * @route   GET /api/todos
 * @desc    Tüm görevleri listele. Query params: ?completed=true&priority=high
 * @access  Public
 */
router.get('/', getAllTodos);

/**
 * @route   GET /api/todos/:id
 * @desc    ID ile tek görev getir
 * @access  Public
 */
router.get('/:id', getTodoById);

/**
 * @route   POST /api/todos
 * @desc    Yeni görev oluştur
 * @body    { title: string, description?: string, priority?: 'low'|'medium'|'high' }
 * @access  Public
 */
router.post('/', createTodo);

/**
 * @route   PUT /api/todos/:id
 * @desc    Görevi güncelle
 * @body    { title?: string, description?: string, completed?: boolean, priority?: string }
 * @access  Public
 */
router.put('/:id', updateTodo);

/**
 * @route   DELETE /api/todos/:id
 * @desc    Görevi sil
 * @access  Public
 */
router.delete('/:id', deleteTodo);

module.exports = router;
