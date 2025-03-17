import Group from '../models/Group.js'
import Task from '../models/Task.js'

export const createGroup = async (req, res) => {
	try {
		const { groupId, groupName, noteId, order } = req.body
		if (!groupName) {
			return res.status(400).json({ message: 'Group name is required' })
		}

		const newGroup = new Group({ groupId, groupName, noteId, order })
		await newGroup.save()
		res.status(201).json(newGroup)
	} catch (error) {
		res.status(500).json({ message: 'Server error', error })
	}
}

export const getGroups = async (req, res) => {
	try {
		const groups = await Group.find().sort({ order: 1 })
		res.json(groups)
	} catch (error) {
		res.status(500).json({ message: 'Server error', error })
	}
}

export const deleteGroup = async (req, res) => {
	try {
		const { groupId } = req.params
		await Task.deleteMany({ groupId })
		const deletedGroup = await Group.findOneAndDelete({ groupId })
		if (!deletedGroup) {
			return res.status(404).json({ error: 'The group is not found' })
		}

		res.json({ message: 'The group deleted', deletedGroup })
	} catch (error) {
		res.status(500).json({ error: 'Group deletion error' })
	}
}

export const updateGroup = async (req, res) => {
	try {
		const { oldIndex, newIndex, noteId } = req.body
		console.log(noteId)
		console.log(oldIndex, newIndex)

		const groups = await Group.find({ noteId }).sort({ order: 1 })
		console.log(groups)
		const [movedGroup] = groups.splice(oldIndex, 1)
		groups.splice(newIndex, 0, movedGroup)

		const updatedGroups = groups.map((group, index) => ({
			...group.toObject(),
			order: index,
		}))

		await Promise.all(
			updatedGroups.map(group =>
				Group.findByIdAndUpdate(
					group._id,
					{ order: group.order },
					{ new: true }
				)
			)
		)

		res.json({ message: 'Group order updated', groups: updatedGroups })
	} catch (err) {
		res.status(500).json({ error: 'Group update error', details: err.message })
	}
}
