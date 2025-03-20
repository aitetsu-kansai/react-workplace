import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
	id: { type: String, required: true, unique: true },
	name: { type: String, required: true },
})

const Note = mongoose.model('Note', noteSchema)
export default Note
