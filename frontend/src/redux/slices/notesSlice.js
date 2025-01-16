import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	notes: [],
}

const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		//Notes
		addNote: (state, action) => {
			state.notes.push(action.payload)
		},
		removeNote: (state, action) => {
			const noteToRemoveId = action.payload
			console.log(noteToRemoveId)
			return {
				...state,
				notes: state.notes.filter(note => note.id !== noteToRemoveId),
			}
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

export const { addGroup, addNote, addTask, removeNote } = notesSlice.actions
export const selectNotes = state => state.notes

export default notesSlice.reducer
