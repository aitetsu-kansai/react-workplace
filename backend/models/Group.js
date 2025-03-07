import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
	noteId: { type: String, required: true },
	groupName: { type: String, required: true },
	groupId: { type: String, required: true, unique: true },
	order: { type: Number, default: 0 },
})

const Group = mongoose.model('Group', groupSchema)
export default Group
