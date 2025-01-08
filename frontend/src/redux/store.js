import { configureStore } from '@reduxjs/toolkit'
import notesReducer from '../redux/slices/notesSlice'
import uiReducer from '../redux/slices/uiSlice'

const store = configureStore({
	reducer: {
		notes: notesReducer,
		ui: uiReducer,
	},
})

export default store
