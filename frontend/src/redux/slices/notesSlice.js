import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
	notes: [],
	groups: [],
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
			state.notes = state.notes.filter(note => note.id !== noteToRemoveId)
		},
		//Groups
		addGroup: (state, action) => {
			const { noteId, groupName } = action.payload
			const currentNote = state.notes.find(note => note.id === noteId)
			if (currentNote) {
				state.groups.push({ noteId: currentNote.id, groupName })
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
export const selectNoteById = (state, id) =>
	state.notes.notes.find(note => note.id === id)
export const selectGroupsById = createSelector(
	[state => state.notes.groups, (state, id) => id],
	(groups, noteId) => groups.filter(group => group.noteId === noteId)
)

export default notesSlice.reducer
