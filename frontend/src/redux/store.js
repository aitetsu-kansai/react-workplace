import { configureStore } from '@reduxjs/toolkit'
import notesReducer from '../redux/slices/notesSlice'

const store = configureStore({
	reducer: {
		notes: notesReducer,
	},
})

export default store
