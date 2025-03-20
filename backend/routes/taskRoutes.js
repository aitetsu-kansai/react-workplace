import express from 'express'
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController.js'

const router = express.Router()

router.post('/', createTask)
router.get('/', getTasks)
router.delete('/:taskId', deleteTask)
router.put('/:taskId', updateTask)

export default router
