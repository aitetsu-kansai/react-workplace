import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../redux/slices/filterSlice'
import infoReducer from '../redux/slices/infoSlice'
import notesReducer from '../redux/slices/notesSlice'
import uiReducer from '../redux/slices/uiSlice'

const store = configureStore({
	reducer: {
		notes: notesReducer,
		ui: uiReducer,
		info: infoReducer,
		filter: filterReducer,
	},
})

export default store
