import React, { useCallback, useEffect, useRef, useState } from 'react'
import NotesFolder from './NotesFolder/NotesFolder'

import './NotesFolder/NotesFolder.scss'
import style from './Sidebar.module.scss'

function Sidebar() {
	const [sibebarIsVisible, setSidebarIsVisible] = useState(true)
	const sidebarRef = useRef(null)
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
			if (isResizing) {
				setSidebarWidth(
					mouseMoveEvent.clientX -
						sidebarRef.current.getBoundingClientRect().left
				)
			}
		},
		[isResizing]
	)

	useEffect(() => {
		console.log('MOUNT')
		document.addEventListener('mousemove', resize)
		document.addEventListener('mouseup', stopResizing)
		return () => {
			console.log('Component did unmount')

			document.removeEventListener('mousemove', resize)
			document.removeEventListener('mouseup', stopResizing)
		}
	}, [stopResizing, resize])

	return (
		<div className={style['wrapper']} style={{ width: sidebarWidth }}>
			<div
				className={`${style['sidebar-container']} ${
					sibebarIsVisible ? style['show'] : ''
				}`}
				ref={sidebarRef}
				onMouseDown={e => e.preventDefault()}
			>
				<NotesFolder>
					<p className='active'>Note 1</p>
					<p>Note 2</p>
					<p>Note 3</p>
				</NotesFolder>
				<div className={style['resizer']} onMouseDown={startResizing} />
			</div>
		</div>
	)
}

export default Sidebar
