import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TaskItem from './TaskItem'
import '../styles/TaskList.css'

function TaskList({ tasks, onDeleteTask, onToggleTask, onEditTask }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, height: 0 },
  }

  return (
    <div className="task-list-container">
      <motion.ul
        className="task-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              variants={itemVariants}
              exit="exit"
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <TaskItem
                task={task}
                onDelete={onDeleteTask}
                onToggle={onToggleTask}
                onEdit={onEditTask}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}

export default TaskList
