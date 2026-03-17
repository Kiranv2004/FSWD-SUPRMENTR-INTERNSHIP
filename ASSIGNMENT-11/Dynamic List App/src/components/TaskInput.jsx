import React, { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/TaskInput.css'

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim() !== '') {
      onAddTask(inputValue)
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
  }

  return (
    <motion.div className="task-input-container">
      <form onSubmit={handleSubmit} className="task-input-form">
        <div className="input-wrapper">
          <motion.input
            type="text"
            className={`task-input ${isFocused ? 'focused' : ''}`}
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
          <motion.button
            className="add-button"
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          >
            <motion.span
              animate={{ rotate: inputValue.length > 0 ? 0 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ➕
            </motion.span>
            Add Task
          </motion.button>
        </div>
        {inputValue.length > 0 && (
          <motion.div
            className="char-count"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {inputValue.length} characters
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}

export default TaskInput
