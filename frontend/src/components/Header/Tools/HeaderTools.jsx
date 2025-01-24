import { useEffect, useState } from 'react'
import { GoHomeFill } from 'react-icons/go'
import { IoIosBookmarks } from 'react-icons/io'
import { MdLightMode } from 'react-icons/md'
import { RiSidebarFoldFill, RiStickyNoteAddFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { BiSolidBookBookmark } from 'react-icons/bi'
import { v4 as uuidv4 } from 'uuid'
import { setInfo } from '../../../redux/slices/infoSlice.js'
import { addNote, selectNotes } from '../../../redux/slices/notesSlice.js'
import {
	selectActiveTab,
	toggleSidebar,
} from '../../../redux/slices/uiSlice.js'
import Dropdown from '../../UI-Components/Drowdown/Dropdown.jsx'
import InputLabel from '../../UI-Components/Label/InputLabel.jsx'
import Modal from '../../UI-Components/Modal/Modal.jsx'

import style from './HeaderTools.module.scss'
function Tools() {
	const location = useLocation()
	const dispatch = useDispatch()
	const notes = useSelector(selectNotes)
	const activeTab = useSelector(selectActiveTab)
	const handleOnSubmit = e => {
		const noteId = uuidv4()
		e.preventDefault()

		const isDublicate = notes.notes.some(note => noteName === note.name)
		if (isDublicate) {
			dispatch(
				setInfo({ infoMessage: 'The note with this name is already created' })
			)
			return
		}

		dispatch(addNote({ id: noteId, name: noteName }))

		setNoteName('')
		setInputIsShow(false)
	}

	console.log(activeTab)

	const handleToggleSidebar = () => dispatch(toggleSidebar())

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
			<Link to='/'>
				<GoHomeFill className={location.pathname === '/' && style['active']} />
			</Link>
			<Link to={`/notes/${activeTab.id}`}>
				{location.pathname.includes('/notes') ? (
					<IoIosBookmarks className={style['active']} />
				) : (
					<BiSolidBookBookmark />
				)}
			</Link>
			<RiStickyNoteAddFill onClick={() => setInputIsShow(true)} />
			<RiSidebarFoldFill onClick={handleToggleSidebar} />
			<MdLightMode />
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
