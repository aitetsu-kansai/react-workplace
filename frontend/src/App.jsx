import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Main from './components/Main/Main'
import Note from './components/Main/Note/Note'
import Info from './components/UI-Components/Info/Info'
import { toggleTheme } from './redux/slices/uiSlice'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme') || 'dark'
		dispatch(toggleTheme(savedTheme))
	}, [dispatch])

	return (
		<BrowserRouter>
			<Header />
			<Info />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='notes' element={<Main />}>
					<Route path=':id' element={<Note />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
