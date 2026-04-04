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
        priority: 'medium'
      })
      if (response.data.success) {
        setTodos([...todos, response.data.data])
        setNewTodo('')
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

  const filteredTodos = todos.filter(todo => {
    const isCompleted = todo.completed === 1 || todo.completed === true;
    if (filterType === 'pending') return !isCompleted;
    if (filterType === 'completed') return isCompleted;
    return true;
  });

  return (
    <div className="app-container">
      <div className="header">
        <h1>Bulut To-Do</h1>
        <p>İki Katmanlı (Two-Tier) Web Uygulaması</p>
      </div>

      <div className="glass-panel">
        <form onSubmit={handleAddTodo} className="input-group">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Ne yapmak istersin?"
            autoComplete="off"
            maxLength={100}
          />
          <button 
            type="submit" 
            className="btn-add"
            disabled={!newTodo.trim()}
          >
            Ekle
          </button>
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

        <div className="stats">
          <span>{totalCount} Görev</span>
          <span>{completedCount} Tamamlandı</span>
        </div>
      </div>

      <div className="todo-container">
        {loading ? (
          <div className="glass-panel loading">Veriler yükleniyor...</div>
        ) : todos.length === 0 ? (
          <div className="glass-panel empty-state">
            Henüz hiç görev yok. Hadi bir şeyler ekleyelim!
          </div>
        ) : filteredTodos.length === 0 ? (
          <div className="glass-panel empty-state">
            Bu kategoride görev bulunamadı.
          </div>
        ) : (
          <ul className="todo-list">
            {filteredTodos.map(todo => {
              const takesCompletedState = todo.completed === 1 || todo.completed === true;
              return (
                <li 
                  key={todo.id} 
                  className={`glass-panel todo-item ${takesCompletedState ? 'completed' : ''}`}
                >
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
                        <span className="todo-date">{formatDate(todo.created_at)}</span>
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
