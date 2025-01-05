import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		//Notes
		addNote: (state, action) => {
			state.notes.push(action.payload)
		},

		//Groups
		addGroup: (state, action) => {
			const { noteId, groupName } = action.payload
			const currentNote = state.notes.find(note => note.id === noteId)
			if (currentNote) {
				currentNote.groups.push(groupName)
			}
		},

		//Tasks
		addTask: (state, action) => {
			const { noteId, groupId, task } = action.payload
			const currentNote = state.notes.find(note => note.id === noteId)
			const currentGroup = currentNote?.find(group => group.id === groupId)
			if (currentGroup) {
				currentGroup.tasks.push(task)
			}
		},
	},
})

export const { addGroup, addNote, addTask } = notesSlice.actions

export default notesSlice.reducer
