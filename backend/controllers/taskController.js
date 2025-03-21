import Task from '../models/Task.js'

export const createTask = async (req, res) => {
	try {
		const { groupId, noteId, taskId, taskName, status, order } = req.body

		if (!taskName || !taskId) {
			return res
				.status(400)
				.json({ message: 'Task name and task id is required' })
		}

		const newTask = new Task({
			groupId,
			noteId,
			taskId,
			taskName,
			status,
			order,
		})
		await newTask.save()
		res.status(201).json(newTask)
	} catch (error) {
		res.status(500).json({ message: 'Server error', err })
	}
}

export const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find()
		res.json(tasks)
	} catch (err) {
		res.status(500).json({ message: 'Server error', err })
	}
}

export const deleteTask = async (req, res) => {
	try {
		const { taskId } = req.params

		const deletedTask = await Task.findOneAndDelete({ taskId })

		if (!deletedTask) {
			return res.status(404).json({ error: 'The task is not found' })
		}

		res.json({ message: 'The task id deleted', deletedTask })
	} catch (err) {
		res.status(500).json({ error: 'Task deletion error' })
	}
}

export const updateTask = async (req, res) => {
	try {
		const { taskId } = req.params
		const { groupId, status } = req.body
		console.log(groupId)
		const updateFields = {}
		if (groupId !== undefined) updateFields.groupId = groupId
		if (status !== undefined) updateFields.status = status

		if (Object.keys(updateFields).length === 0) {
			return res.status(400).json({ error: 'No fields to update' })
		}
		const updatedTask = await Task.findOneAndUpdate({ taskId }, updateFields, {
			new: true,
		})

		if (!updatedTask) {
			return res.status(404).json({ error: 'The task is not found' })
		}

		res.json({ message: 'The task is updated', updatedTask })
	} catch (err) {
		res.status(500).json({ error: 'Task update error', details: err.message })
	}
}
