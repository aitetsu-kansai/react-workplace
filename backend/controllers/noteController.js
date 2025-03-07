import Note from '../models/Note.js'

// Создание новой заметки
export const createNote = async (req, res) => {
	try {
		const { name, id } = req.body
		if (!name) {
			return res.status(400).json({ message: 'Note name is required' })
		}

		const newNote = new Note({ name, id })
		await newNote.save()
		res.status(201).json(newNote)
	} catch (error) {
		res.status(500).json({ message: 'Server error', error })
	}
}

export const getNotes = async (req, res) => {
	try {
		const notes = await Note.find()
		res.json(notes)
	} catch (error) {
		res.status(500).json({ message: 'Server error', error })
	}
}

export const deleteNote = async (req, res) => {
	try {
		const { id } = req.params
		console.log(id)
		const deletedNote = await Note.findOneAndDelete(id)

		if (!deletedNote) {
			return res.status(404).json({ error: 'The note is not found' })
		}

		res.json({ message: 'The note deleted', deletedNote })
	} catch (err) {
		res.status(500).json({ error: 'Ошибка при удалении заметки' })
	}
}
