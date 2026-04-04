const TodoModel = require('../models/todoModel');

/**
 * Standart başarı yanıtı
 */
const successResponse = (res, data, message = 'İşlem başarılı', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Standart hata yanıtı
 */
const errorResponse = (res, message = 'Bir hata oluştu', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};

// ─── GET /api/todos ────────────────────────────────────────────────────────────
const getAllTodos = (req, res) => {
  try {
    const { completed, priority } = req.query;
    const todos = TodoModel.findAll({ completed, priority });

    return successResponse(res, todos, `${todos.length} görev listelendi`);
  } catch (error) {
    console.error('getAllTodos hatası:', error);
    return errorResponse(res, 'Görevler getirilirken hata oluştu');
  }
};

// ─── GET /api/todos/:id ────────────────────────────────────────────────────────
const getTodoById = (req, res) => {
  try {
    const { id } = req.params;
    const todo = TodoModel.findById(Number(id));

    if (!todo) {
      return errorResponse(res, `ID ${id} ile görev bulunamadı`, 404);
    }

    return successResponse(res, todo);
  } catch (error) {
    console.error('getTodoById hatası:', error);
    return errorResponse(res, 'Görev getirilirken hata oluştu');
  }
};

// ─── POST /api/todos ───────────────────────────────────────────────────────────
const createTodo = (req, res) => {
  try {
    const { title, description, priority, due_date } = req.body;

    if (!title || title.trim() === '') {
      return errorResponse(res, 'Görev başlığı (title) zorunludur', 400);
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
      return errorResponse(
        res,
        `Geçersiz öncelik. Geçerli değerler: ${validPriorities.join(', ')}`,
        400
      );
    }

    const newTodo = TodoModel.create({
      title: title.trim(),
      description: description?.trim() || '',
      priority: priority || 'medium',
      due_date: due_date || null
    });

    return successResponse(res, newTodo, 'Görev başarıyla oluşturuldu', 201);
  } catch (error) {
    console.error('createTodo hatası:', error);
    return errorResponse(res, 'Görev oluşturulurken hata oluştu');
  }
};

// ─── PUT /api/todos/:id ────────────────────────────────────────────────────────
const updateTodo = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, priority, due_date } = req.body;

    if (title !== undefined && title.trim() === '') {
      return errorResponse(res, 'Görev başlığı boş olamaz', 400);
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
      return errorResponse(
        res,
        `Geçersiz öncelik. Geçerli değerler: ${validPriorities.join(', ')}`,
        400
      );
    }

    const updatedTodo = TodoModel.update(Number(id), {
      title: title?.trim(),
      description: description?.trim(),
      completed,
      priority,
      due_date,
    });

    if (!updatedTodo) {
      return errorResponse(res, `ID ${id} ile görev bulunamadı`, 404);
    }

    return successResponse(res, updatedTodo, 'Görev başarıyla güncellendi');
  } catch (error) {
    console.error('updateTodo hatası:', error);
    return errorResponse(res, 'Görev güncellenirken hata oluştu');
  }
};

// ─── DELETE /api/todos/:id ─────────────────────────────────────────────────────
const deleteTodo = (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = TodoModel.delete(Number(id));

    if (!deletedTodo) {
      return errorResponse(res, `ID ${id} ile görev bulunamadı`, 404);
    }

    return successResponse(res, deletedTodo, 'Görev başarıyla silindi');
  } catch (error) {
    console.error('deleteTodo hatası:', error);
    return errorResponse(res, 'Görev silinirken hata oluştu');
  }
};

// ─── GET /api/todos/stats ──────────────────────────────────────────────────────
const getTodoStats = (req, res) => {
  try {
    const stats = TodoModel.getStats();
    return successResponse(res, stats, 'İstatistikler getirildi');
  } catch (error) {
    console.error('getTodoStats hatası:', error);
    return errorResponse(res, 'İstatistikler getirilirken hata oluştu');
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoStats,
};
