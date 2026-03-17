import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import './styles/App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all') // all, completed, pending
  const [darkMode, setDarkMode] = useState(false)

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    const savedDarkMode = localStorage.getItem('darkMode')
    
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (error) {
        console.error('Error loading tasks:', error)
      }
    }
    
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const addTask = (taskText) => {
    if (taskText.trim() === '') {
      alert('Please enter a task!')
      return
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date()
    }

    setTasks([newTask, ...tasks])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const editTask = (id, newText) => {
    if (newText.trim() === '') {
      alert('Task cannot be empty!')
      return
    }
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ))
  }

  const getFilteredTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed)
      case 'pending':
        return tasks.filter(task => !task.completed)
      default:
        return tasks
    }
  }

  const filteredTasks = getFilteredTasks()
  const completedCount = tasks.filter(task => task.completed).length

  return (
    <motion.div
      className={`app ${darkMode ? 'dark' : 'light'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container">
        {/* Header */}
        <motion.header
          className="header"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="header-top">
            <h1>📝 Task Master</h1>
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <p className="subtitle">Stay organized, stay productive</p>
        </motion.header>

        {/* Input Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <TaskInput onAddTask={addTask} />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="stat-item">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-value">{tasks.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{completedCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{tasks.length - completedCount}</span>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="filter-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Tasks
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </motion.div>

        {/* Task List Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredTasks.length > 0 ? (
            <TaskList
              tasks={filteredTasks}
              onDeleteTask={deleteTask}
              onToggleTask={toggleTask}
              onEditTask={editTask}
            />
          ) : (
            <motion.div
              className="empty-state"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="empty-icon">🎯</div>
              <h2>No tasks yet!</h2>
              <p>
                {filter === 'all'
                  ? 'Create your first task to get started'
                  : `No ${filter} tasks at the moment`}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p>✨ Built with React, Hooks, and Framer Motion</p>
        </motion.footer>
      </div>
    </motion.div>
  )
}

export default App
