import { useEffect, useState } from 'react'
import { GoHomeFill } from 'react-icons/go'
import { MdLightMode } from 'react-icons/md'
import { RiSidebarFoldFill, RiStickyNoteAddFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { setInfo } from '../../../redux/slices/infoSlice.js'
import { addNote, selectNotes } from '../../../redux/slices/notesSlice.js'
import { addTab, toggleSidebar } from '../../../redux/slices/uiSlice.js'
import Dropdown from '../../UI-Components/Drowdown/Dropdown.jsx'
import InputLabel from '../../UI-Components/Label/InputLabel.jsx'
import Modal from '../../UI-Components/Modal/Modal.jsx'
import style from './Tools.module.scss'
function Tools() {
	const dispatch = useDispatch()
	const notes = useSelector(selectNotes)

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
		dispatch(
			addTab({ id: noteId, name: noteName, isOpen: false, isActive: false })
		)
		setNoteName('')
		setInputIsShow(false)
	}

	// const selectSidebarVisibleState = useSelector(selectSidebebarVisibleState)
	const handleToggleSidebar = () => dispatch(toggleSidebar())

	const [inputIsShow, setInputIsShow] = useState(false)
	const [width, setWidth] = useState(window.innerWidth)
	const [noteName, setNoteName] = useState('')

	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth)
		}
		console.log(width)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<>
			<div className={style['tools__container']}>
				{width <= 1000 ? (
					<div className={style['tools__burger-menu']}>
						<Dropdown>
							<GoHomeFill />
							<RiStickyNoteAddFill onClick={() => setInputIsShow(true)} />
							<RiSidebarFoldFill onClick={handleToggleSidebar} />
							<MdLightMode />
						</Dropdown>
					</div>
				) : (
					<>
						<GoHomeFill />
						<RiStickyNoteAddFill onClick={() => setInputIsShow(true)} />
						<RiSidebarFoldFill onClick={handleToggleSidebar} />
						<MdLightMode />
					</>
				)}
			</div>
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
