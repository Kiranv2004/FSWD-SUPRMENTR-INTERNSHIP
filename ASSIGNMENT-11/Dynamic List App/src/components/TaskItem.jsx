import React, { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/TaskItem.css'

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const [isHovered, setIsHovered] = useState(false)

  const handleDelete = () => {
    onDelete(task.id)
  }

  const handleToggle = () => {
    onToggle(task.id)
  }

  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(task.id, editText)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(task.text)
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <motion.div
      className={`task-item ${task.completed ? 'completed' : ''} ${isHovered ? 'hovered' : ''}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Checkbox */}
      <motion.button
        className="checkbox"
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {task.completed ? '✓' : '○'}
      </motion.button>

      {/* Task Content */}
      <div className="task-content">
        {isEditing ? (
          <motion.input
            type="text"
            className="edit-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        ) : (
          <motion.span className="task-text">
            {task.text}
          </motion.span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="task-actions">
        {isEditing ? (
          <>
            <motion.button
              className="action-btn save-btn"
              onClick={handleSave}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Save"
            >
              ✓
            </motion.button>
            <motion.button
              className="action-btn cancel-btn"
              onClick={handleCancel}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Cancel"
            >
              ✕
            </motion.button>
          </>
        ) : (
          <>
            {isHovered && (
              <motion.button
                className="action-btn edit-btn"
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                title="Edit"
              >
                ✎
              </motion.button>
            )}
            <motion.button
              className="action-btn delete-btn"
              onClick={handleDelete}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: isHovered ? 1 : 0.6 }}
              animate={{ opacity: 1 }}
              title="Delete"
            >
              🗑️
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default TaskItem
