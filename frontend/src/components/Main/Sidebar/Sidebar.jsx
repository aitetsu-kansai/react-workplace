import React, { useCallback, useEffect, useRef, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import NotesFolder from './NotesFolder/NotesFolder'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectSidebarTabFilter } from '../../../redux/slices/filterSlice'
import { removeNote } from '../../../redux/slices/notesSlice'
import {
	selectSidebebarVisibleState,
	selectTabs,
	setTabIsActive,
	toggleSidebar,
	toggleTab,
} from '../../../redux/slices/uiSlice'
import Filter from '../Filter/Filter'
import style from './Sidebar.module.scss'

function Sidebar() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const tabs = useSelector(selectTabs)
	const sidebarVisibleState = useSelector(selectSidebebarVisibleState)
	const sidebarTabFilter = useSelector(selectSidebarTabFilter)

	const filteredSidebarNotes = tabs.filter(tab => {
		const matchesName = tab.name.includes(sidebarTabFilter.toLowerCase())
		return matchesName
	})

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

	const handleNavigate = url => {
		navigate(url)
	}

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
		let timeout
		if (sidebarWidth < 200) {
			dispatch(toggleSidebar())
			timeout = setTimeout(() => {
				setSidebarWidth('auto')
			}, 250)
		}
		console.log(filteredSidebarNotes)

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
			<Filter />
			<div
				className={`${style['sidebar-container']} ${
					sidebarVisibleState ? style['show'] : ''
				}`}
				onMouseDown={e => e.preventDefault()}
			>
				<NotesFolder>
					{tabs.length > 0 ? (
						filteredSidebarNotes.map(el => (
							<div
								className={`${style['sidebar-container__element']} ${
									el.isActive ? style['active'] : ''
								}`}
								onMouseUp={e => {
									if (e.button === 0) {
										!el.isOpen &&
											dispatch(toggleTab({ id: el.id, type: 'open' }))
										if (!el.isActive) {
											dispatch(setTabIsActive(el.id))
											handleNavigate(el.id)
										}
									}
									if (e.button === 1 && !el.isOpen) {
										dispatch(toggleTab({ id: el.id, type: 'open' }))
									}
								}}
								key={el.id}
							>
								<p>{el.name}</p>
								<RxCross1
									onMouseUp={e => {
										e.stopPropagation()
										dispatch(removeNote(el.id))
										handleNavigate(`/notes`)
									}}
								/>
							</div>
						))
					) : (
						<h4>{`You don't have any notes`}</h4>
					)}
					{tabs.length > 0 && filteredSidebarNotes.length === 0 && (
						<h4>{'The note was not found on request'}</h4>
					)}
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
