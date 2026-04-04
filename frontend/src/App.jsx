import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'

const API_URL = 'http://localhost:5000/api/todos'

const formatDate = (dateString) => {
  if (!dateString) return '';
  const safeDateString = dateString.includes(' ') ? dateString.replace(' ', 'T') : dateString;
  const date = new Date(safeDateString);
  if (isNaN(date.getTime())) return '';
  
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [newPriority, setNewPriority] = useState('medium')
  const [newDueDate, setNewDueDate] = useState('')

  // Sayfa yüklendiğinde görevleri çek
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API_URL)
      // Backend api/todos formatında { success: true, count: X, data: [{...}] } döner
      if (response.data.success) {
        setTodos(response.data.data)
      } else {
        setError("Veriler alınırken format hatası oluştu.")
      }
    } catch (err) {
      console.error(err)
      setError("Sunucuya bağlanılamadı. Lütfen backend'in çalıştığından emin olun.")
    } finally {
      setLoading(false)
    }
  }

  const handleAddTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      const response = await axios.post(API_URL, {
        title: newTodo.trim(),
        priority: newPriority,
        due_date: newDueDate || null
      })
      if (response.data.success) {
        setTodos([...todos, response.data.data])
        setNewTodo('')
        setNewDueDate('')
        setNewPriority('medium')
        setError(null)
      }
    } catch (err) {
      console.error(err)
      setError("Görev eklenemedi.")
    }
  }

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 1 ? 0 : 1 // SQLite'da 0/1 tutuluyor ise
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: newStatus
      })
      
      if (response.data.success) {
        setTodos(todos.map(todo => 
          todo.id === id ? { ...todo, completed: newStatus } : todo
        ))
      }
    } catch (err) {
      console.error(err)
      setError("Görev güncellenemedi.")
    }
  }

  const handleEditStart = (todo) => {
    setEditingId(todo.id)
    setEditTitle(todo.title)
  }

  const handleEditSave = async (id) => {
    if (!editTitle.trim()) {
      setEditingId(null)
      return
    }
    
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        title: editTitle.trim()
      })
      
      if (response.data.success) {
        setTodos(todos.map(todo => 
          todo.id === id ? { ...todo, title: editTitle.trim() } : todo
        ))
      }
    } catch (err) {
      console.error(err)
      setError("Görev güncellenemedi.")
    } finally {
      setEditingId(null)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`)
      if (response.data.success) {
        setTodos(todos.filter(todo => todo.id !== id))
      }
    } catch (err) {
      console.error(err)
      setError("Görev silinemedi.")
    }
  }

  const completedCount = todos.filter(t => t.completed === 1 || t.completed === true).length;
  const totalCount = todos.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  let processedTodos = todos.filter(todo => {
    const isCompleted = todo.completed === 1 || todo.completed === true;
    if (filterType === 'pending' && isCompleted) return false;
    if (filterType === 'completed' && !isCompleted) return false;
    
    if (searchQuery.trim() !== '') {
      if (!todo.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
    }
    return true;
  });

  processedTodos.sort((a, b) => {
    if (sortBy === 'deadline') {
      if (!a.due_date && b.due_date) return 1;
      if (a.due_date && !b.due_date) return -1;
      if (a.due_date && b.due_date) {
        return new Date(a.due_date) - new Date(b.due_date);
      }
      return 0;
    } else if (sortBy === 'priority') {
      const pMap = { high: 3, medium: 2, low: 1 };
      const pA = pMap[a.priority] || 2;
      const pB = pMap[b.priority] || 2;
      return pB - pA;
    } else {
      return b.id - a.id;
    }
  });

  const checkOverdue = (dueDateStr, completed) => {
    if (!dueDateStr || completed) return false;
    const due = new Date(dueDateStr);
    const now = new Date();
    due.setHours(0,0,0,0);
    now.setHours(0,0,0,0);
    return due < now;
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Bulut To-Do</h1>
        <p>İki Katmanlı (Two-Tier) Web Uygulaması</p>
      </div>

      <div className="glass-panel top-controls">
        <input 
          type="text" 
          placeholder="Görevlerde ara..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="newest">En Yeni</option>
          <option value="deadline">Son Tarihe Göre</option>
          <option value="priority">Önem Sırasına Göre</option>
        </select>
      </div>

      <div className="glass-panel">
        <form onSubmit={handleAddTodo} className="form-container">
          <div className="input-group">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Ne yapmak istersin?"
              autoComplete="off"
              maxLength={100}
              className="main-todo-input"
            />
          </div>
          <div className="input-group secondary-group">
            <input 
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="date-input"
            />
            <select 
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">Düşük</option>
              <option value="medium">Orta</option>
              <option value="high">Yüksek Öncelik</option>
            </select>
            <button 
              type="submit" 
              className="btn-add"
              disabled={!newTodo.trim()}
            >
              Ekle
            </button>
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="filters">
          <button 
            className={`btn-filter ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            Tümü
          </button>
          <button 
            className={`btn-filter ${filterType === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterType('pending')}
          >
            Bekleyenler
          </button>
          <button 
            className={`btn-filter ${filterType === 'completed' ? 'active' : ''}`}
            onClick={() => setFilterType('completed')}
          >
            Tamamlananlar
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.25rem 1.5rem' }}>
        <div className="progress-section" style={{ marginTop: 0 }}>
          <div className="progress-labels">
            <span>İlerleme Oranı</span>
            <span>%{progressPercent} Tamamlandı ({completedCount}/{totalCount})</span>
          </div>
          <div className="progress-container" style={{ margin: '0.5rem 0 0 0' }}>
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      <div className="todo-container">
        {loading ? (
          <div className="glass-panel loading">Veriler yükleniyor...</div>
        ) : todos.length === 0 ? (
          <div className="glass-panel empty-state">
            Henüz hiç görev yok. Hadi bir şeyler ekleyelim!
          </div>
        ) : processedTodos.length === 0 ? (
          <div className="glass-panel empty-state">
            Bu kriterlere uygun görev bulunamadı.
          </div>
        ) : (
          <ul className="todo-list">
            {processedTodos.map(todo => {
              const takesCompletedState = todo.completed === 1 || todo.completed === true;
              const isOverdue = checkOverdue(todo.due_date, takesCompletedState);
              return (
                <li 
                  key={todo.id} 
                  className={`glass-panel todo-item priority-${todo.priority || 'medium'} ${takesCompletedState ? 'completed' : ''}`}
                >
                  <div className="priority-bar"></div>
                  <label className="todo-content">
                    <input 
                      type="checkbox" 
                      style={{ display: 'none' }} 
                      checked={takesCompletedState}
                      onChange={() => handleToggleComplete(todo.id, todo.completed)}
                    />
                    <div className="checkbox">
                      <span className="checkbox-inner">✓</span>
                    </div>
                    <div className="todo-text-group">
                      {editingId === todo.id ? (
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onBlur={() => handleEditSave(todo.id)}
                          onKeyDown={(e) => e.key === 'Enter' && handleEditSave(todo.id)}
                          autoFocus
                          className="edit-input"
                        />
                      ) : (
                        <span className="todo-title" onDoubleClick={() => handleEditStart(todo)}>{todo.title}</span>
                      )}
                      {todo.created_at && (
                        <span className="todo-date">Eklenme: {formatDate(todo.created_at)}</span>
                      )}
                      {todo.due_date && (
                        <span className={`todo-date ${isOverdue ? 'overdue-date' : ''}`}>
                          Son Tarih: {formatDate(todo.due_date)} {isOverdue ? ' (Gecikmiş)' : ''}
                        </span>
                      )}
                    </div>
                  </label>
                  <div className="todo-actions">
                    {editingId !== todo.id && (
                      <button 
                        onClick={() => handleEditStart(todo)}
                        className="btn-edit"
                        title="Görevi Düzenle"
                      >
                        ✎
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(todo.id)}
                      className="btn-delete"
                      title="Görevi Sil"
                    >
                      ×
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
