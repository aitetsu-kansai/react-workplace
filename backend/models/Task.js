import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
	groupId: { type: String, required: true },
	noteId: { type: String, required: true },
	taskId: { type: String, required: true, unique: true },
	taskName: { type: String, required: true },
	status: { type: Boolean, default: false },
	order: { type: Number, default: 0 },
})

const Task = mongoose.model('Task', taskSchema)
export default Task
