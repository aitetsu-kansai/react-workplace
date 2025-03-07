import { useEffect, useState } from 'react'
import { BiSolidBookBookmark } from 'react-icons/bi'
import { GoHomeFill } from 'react-icons/go'
import { IoIosBookmarks } from 'react-icons/io'
import { RiSidebarFoldFill, RiStickyNoteAddFill } from 'react-icons/ri'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { setInfo } from '../../../redux/slices/infoSlice.js'
import { addNote, selectNotes } from '../../../redux/slices/notesSlice.js'
import {
	selectActiveTab,
	selectSidebebarVisibleState,
	setAllTabsInactive,
	setSidebarShow,
} from '../../../redux/slices/uiSlice.js'
import Dropdown from '../../UI-Components/Drowdown/Dropdown'
import InputLabel from '../../UI-Components/Label/InputLabel.jsx'
import Modal from '../../UI-Components/Modal/Modal.jsx'

import { generateId } from '../../../utils/generateRandomId.js'
import style from './HeaderTools.module.scss'
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher.jsx'

function Tools() {
	const location = useLocation()
	const dispatch = useDispatch()
	const notes = useSelector(selectNotes, shallowEqual)
	const activeTab = useSelector(selectActiveTab)
	const sidebarVisibleState = useSelector(selectSidebebarVisibleState)
	const sidebarPath = location.pathname.includes('/notes/')
		? location.pathname
		: '/notes'

	const handleOnSubmit = async e => {
		e.preventDefault()
		const trimmedName = noteName.trim()
		if (!trimmedName) {
			dispatch(
				setInfo({
					infoCategory: 'error',
					infoMessage: 'Note name cannot be empty',
				})
			)
			return
		}

		try {
			const response = await fetch('http://localhost:5000/notes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name: trimmedName, id: generateId() }),
			})

			if (!response.ok) {
				throw new Error('Failed to create note')
			}

			const newNote = await response.json()
			console.log(newNote)
			dispatch(addNote(newNote))
		} catch (error) {
			console.error(error)
			dispatch(
				setInfo({ infoCategory: 'error', infoMessage: 'Failed to create note' })
			)
		}

		setNoteName('')
		setInputIsShow(false)
	}

	// const handleOnSubmit = e => {
	// 	e.preventDefault()

	// 	const trimmedName = noteName.trim()

	// 	if (!trimmedName) {
	// 		dispatch(
	// 			setInfo({
	// 				infoCategory: 'error',
	// 				infoMessage: 'Note name cannot be empty',
	// 			})
	// 		)
	// 		return
	// 	}

	// 	const isDublicate = notes.some(
	// 		note => trimmedName === note.name.trim().toLowerCase()
	// 	)

	// 	if (isDublicate) {
	// 		dispatch(
	// 			setInfo({ infoMessage: 'The note with this name is already created' })
	// 		)
	// 		return
	// 	}

	// 	dispatch(addNote({ id: generateId(), name: trimmedName }))

	// 	setNoteName('')
	// 	setInputIsShow(false)
	// }

	const handleToggleSidebar = () => {
		const isNotesPage = location.pathname.startsWith('/notes')
		const isShow = isNotesPage ? !sidebarVisibleState : true

		dispatch(setSidebarShow(isShow))
	}

	const [inputIsShow, setInputIsShow] = useState(false)
	const [width, setWidth] = useState(window.innerWidth)
	const [noteName, setNoteName] = useState('')

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const toolsContent = (
		<>
			<Link
				to='/'
				title='Home page'
				aria-label='Home Page'
				onClick={() => dispatch(setAllTabsInactive())}
			>
				<GoHomeFill className={location.pathname === '/' && style['active']} />
			</Link>
			<Link to={`/notes${activeTab ? '/' + activeTab?.id : ''}`} title='Notes'>
				{location.pathname.includes('/notes') ? (
					<IoIosBookmarks className={style['active']} />
				) : (
					<BiSolidBookBookmark />
				)}
			</Link>
			<RiStickyNoteAddFill
				onClick={() => setInputIsShow(true)}
				title='Create a new note'
			/>
			<Link to={sidebarPath} onClick={handleToggleSidebar}>
				<RiSidebarFoldFill title='Hide/Show a sidebar' />
			</Link>
			<ThemeSwitcher />
		</>
	)

	return (
		<>
			<nav className={style['tools__container']}>
				{width <= 1000 ? (
					<div className={style['tools__burger-menu']}>
						<Dropdown>{toolsContent}</Dropdown>
					</div>
				) : (
					toolsContent
				)}
			</nav>
			<Modal active={inputIsShow} setActive={setInputIsShow}>
				{inputIsShow && (
					<form onSubmit={handleOnSubmit}>
						<InputLabel
							title={'Name of new Note'}
							id='noteName'
							value={noteName}
							onChange={e => {
								setNoteName(e.target.value)
							}}
							maxLength={40}
						/>
					</form>
				)}
			</Modal>
		</>
	)
}

export default Tools
