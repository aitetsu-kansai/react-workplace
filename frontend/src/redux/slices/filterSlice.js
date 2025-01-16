import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	sidebarTabFilter: '',
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setSidebarTabsFilter: (state, action) => {
			state.sidebarTabFilter = action.payload
		},
		resetSidebarTabsFilter: () => {
			state.sidebarTabFilter = initialState.sidebarTabs
		},
	},
})

export const { setSidebarTabsFilter, resetSidebarTabsFilter } =
	filterSlice.actions

export const selectSidebarTabFilter = state => state.filter.sidebarTabFilter

export default filterSlice.reducer
