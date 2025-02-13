import { createSlice } from '@reduxjs/toolkit'
import { addNote, removeNote } from './notesSlice'

const initialState = {
	isSidebarVisible: true,
	tabs: [], // {id: 1, name:"Note", isOpen: true, isActive: true}
	theme: 'dark',
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggleSidebar: state => {
			state.isSidebarVisible = !state.isSidebarVisible
		},

		setSidebarShow: (state, action) => {
			state.isSidebarVisible = action.payload
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

		setAllTabsInactive: state => {
			state.tabs.forEach(tab => (tab.isActive = false))
		},

		toggleTheme: (state, action) => {
			const theme = action?.payload
			if (!theme) {
				state.theme = state.theme === 'dark' ? 'light' : 'dark'
			} else {
				state.theme = theme
			}
			document.documentElement.setAttribute('data-theme', state.theme)
			localStorage.setItem('theme', state.theme)
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

export const {
	toggleSidebar,
	toggleTab,
	setTabIsActive,
	toggleTheme,
	setSidebarShow,
	setAllTabsInactive,
} = uiSlice.actions

export const selectSidebebarVisibleState = state => state.ui.isSidebarVisible
export const selectTabs = state => state.ui.tabs
export const selectActiveTab = state =>
	state.ui.tabs.find(tab => tab.isActive === true)

export const selectTheme = state => state.ui.theme

export default uiSlice.reducer
