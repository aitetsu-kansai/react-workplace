import { createSlice } from '@reduxjs/toolkit'
import { addNote, removeNote } from './notesSlice'

const initialState = {
	isSidebarVisible: true,
	tabs: [], // {id: 1, name:"Note", isOpen: true, isActive: true}
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleSidebar: state => {
			state.isSidebarVisible = !state.isSidebarVisible
		},

		toggleTab: (state, action) => {
			const { id, type = 'toggle' } = action.payload
			const curTab = state.tabs.find(tab => tab.id === id)
			if (curTab) {
				switch (type) {
					case 'open':
						curTab.isOpen = true
						break
					case 'close':
						curTab.isOpen = false
						curTab.isActive = false
						break
					default:
						curTab.isOpen = !curTab.isOpen
						break
				}
			}
		},

		setTabIsActive: (state, action) => {
			const curTab = state.tabs.find(tab => tab.id === action.payload)
			state.tabs.forEach(tab => (tab.isActive = false))
			curTab.isActive = true
		},
	},
	extraReducers: builder => {
		builder.addCase(removeNote, (state, action) => {
			return {
				...state,
				tabs: state.tabs.filter(tab => tab.id !== action.payload),
			}
		})
		builder.addCase(addNote, (state, action) => {
			const newTab = { ...action.payload, isOpen: false, isActive: false }
			state.tabs.push(newTab)
		})
	},
})

export const { toggleSidebar, toggleTab, setTabIsActive } = uiSlice.actions

export const selectSidebebarVisibleState = state => state.ui.isSidebarVisible
export const selectTabs = state => state.ui.tabs
export const selectActiveTab = state =>
	state.ui.tabs.find(tab => tab.isActive === true)

export default uiSlice.reducer
