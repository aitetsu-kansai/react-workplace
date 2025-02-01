import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
	notes: [],
	groups: [],
	tasks: [],
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
			state.groups = state.groups.filter(
				group => group.noteId !== noteToRemoveId
			)
			state.tasks = state.tasks.filter(tasks => tasks.noteId !== noteToRemoveId)
		},
		//Groups
		addGroup: (state, action) => {
			const { noteId, groupName, groupId } = action.payload
			const currentNote = state.notes.find(note => note.id === noteId)
			if (currentNote) {
				state.groups.push({ noteId: currentNote.id, groupName, groupId })
			}
		},

		//Tasks
		addTask: (state, action) => {
			const {
				groupId,
				noteId,
				taskId,
				taskName,
				status = false,
			} = action.payload
			const currentGroup = state.groups?.find(group => group.noteId === noteId)
			if (currentGroup) {
				state.tasks.push({ groupId, noteId, taskId, taskName, status })
			} else return
		},
		toggleTask: (state, action) => {
			const taskId = action.payload

			const currentTask = state.tasks?.find(task => task.taskId === taskId)
			if (currentTask) {
				currentTask.status = !currentTask.status
			} else return
		},

		deleteTask: (state, action) => {
			const taskId = action.payload
			if (taskId) {
				state.tasks = state.tasks.filter(task => task.taskId !== taskId)
			} else return
		},
	},
})

export const {
	addGroup,
	addNote,
	addTask,
	removeNote,
	toggleTask,
	deleteTask,
} = notesSlice.actions
export const selectNotes = state => state.notes.notes
export const selectGroups = state => state.notes.groups
export const selectNoteById = (state, id) =>
	state.notes.notes.find(note => note.id === id)
export const selectGroupsById = createSelector(
	[state => state.notes.groups, (state, id) => id],
	(groups, noteId) => groups.filter(group => group.noteId === noteId)
)

export const selectTasksById = createSelector(
	[state => state.notes.tasks, (state, id) => id],
	(tasks, noteId) => tasks.filter(task => task.noteId === noteId)
)

export default notesSlice.reducer
