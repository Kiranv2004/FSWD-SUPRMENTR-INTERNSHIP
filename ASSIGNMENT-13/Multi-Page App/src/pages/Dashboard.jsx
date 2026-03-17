import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

function Dashboard() {
  const [taskInput, setTaskInput] = useState('')
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review sprint goals', done: false },
    { id: 2, title: 'Prepare team standup notes', done: true },
  ])

  const completedCount = useMemo(() => tasks.filter((task) => task.done).length, [tasks])

  const addTask = (event) => {
    event.preventDefault()
    const cleanTask = taskInput.trim()

    if (!cleanTask) {
      return
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now(), title: cleanTask, done: false },
    ])
    setTaskInput('')
  }

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  return (
    <motion.main
      className="container page"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35 }}
    >
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="badge">Dashboard</p>
            <h2>Task Flow Manager</h2>
          </div>
          <p className="stat">
            {completedCount} / {tasks.length} completed
          </p>
        </div>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add a new task"
            value={taskInput}
            onChange={(event) => setTaskInput(event.target.value)}
          />
          <button type="submit" className="primary-btn">
            Add Task
          </button>
        </form>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <button
                type="button"
                className={`check-btn ${task.done ? 'done' : ''}`}
                onClick={() => toggleTask(task.id)}
              >
                {task.done ? '✓' : '○'}
              </button>
              <span className={task.done ? 'completed' : ''}>{task.title}</span>
              <button
                type="button"
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </motion.main>
  )
}

export default Dashboard
