import React, { useCallback, useEffect, useRef, useState } from 'react'
import NotesFolder from './NotesFolder/NotesFolder'

import { useDispatch, useSelector } from 'react-redux'
import { selectNotes } from '../../../redux/slices/notesSlice'
import {
	selectSidebebarVisibleState,
	setTabIsActive,
	toggleSidebar,
	toggleTab,
} from '../../../redux/slices/uiSlice'
import './NotesFolder/NotesFolder.scss'
import style from './Sidebar.module.scss'

function Sidebar() {
	const dispatch = useDispatch()
	const notes = useSelector(selectNotes)
	const sidebarVisibleState = useSelector(selectSidebebarVisibleState)

	// const [sibebarIsVisible, setSidebarIsVisible] = useState(true)
	const sidebarRef = useRef(null)
	const resizerRef = useRef(null)
	const [isResizing, setIsResizing] = useState(false)
	const [sidebarWidth, setSidebarWidth] = useState('auto')

	const startResizing = useCallback(() => {
		setIsResizing(true)
	}, [])

	const stopResizing = useCallback(() => {
		setIsResizing(false)
	}, [])

	const resize = useCallback(
		mouseMoveEvent => {
			if (isResizing && sidebarVisibleState) {
				const newWidth =
					mouseMoveEvent.clientX -
					sidebarRef.current.getBoundingClientRect().left

				setSidebarWidth(newWidth)
				if (newWidth < 200) {
					sidebarRef.current.classList.add(style['alert'])
				} else {
					sidebarRef.current.classList.remove(style['alert'])
				}
			}
		},
		[isResizing]
	)

	useEffect(() => {
		console.log('use effect')
		console.log(notes)
		let timeout
		if (sidebarWidth < 200) {
			dispatch(toggleSidebar())
			timeout = setTimeout(() => {
				setSidebarWidth('auto')
			}, 250)
		}
		document.addEventListener('mousemove', resize)
		document.addEventListener('mouseup', stopResizing)
		return () => {
			document.removeEventListener('mousemove', resize)
			document.removeEventListener('mouseup', stopResizing)
			if (timeout) {
				clearTimeout(timeout)
			}
		}
	}, [stopResizing, resize])

	return (
		<div
			className={`${style['wrapper']} ${
				sidebarVisibleState ? style['show'] : ''
			}`}
			style={{ width: sidebarWidth }}
			ref={sidebarRef}
		>
			<div
				className={`${style['sidebar-container']} ${
					sidebarVisibleState ? style['show'] : ''
				}`}
				onMouseDown={e => e.preventDefault()}
			>
				<NotesFolder>
					{notes.notes.length > 0 ? (
						notes.notes.map(el => (
							<p
								key={el.id}
								onMouseUp={e => {
									if (e.button === 0) {
										dispatch(toggleTab({ id: el.id, type: 'open' }))
										dispatch(setTabIsActive(el.id))
									}
									if (e.button === 1) {
										console.log(1)

										dispatch(toggleTab({ id: el.id, type: 'open' }))
									}
								}}
							>
								{el.name}
							</p>
						))
					) : (
						<h4>{`You don't have any notes`}</h4>
					)}
					{/* <p className='active'>Note 1</p>
					<p>Note 2</p>
					<p>Note 3</p> */}
				</NotesFolder>
				<div
					className={style['resizer']}
					onMouseDown={startResizing}
					ref={resizerRef}
				/>
			</div>
		</div>
	)
}

export default Sidebar
