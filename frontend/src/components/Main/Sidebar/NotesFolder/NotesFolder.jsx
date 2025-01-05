import { useState } from 'react'
import { FaFolderOpen } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import './NotesFolder.scss'
function NotesFolder({ children }) {
	const [folderIsOpen, setFolderIsOpen] = useState(true)

	return (
		<div className='folder-container'>
			<div
				className='folder-container__header'
				onClick={() => setFolderIsOpen(!folderIsOpen)}
			>
				<IoIosArrowForward
					className={`folder-arrow${folderIsOpen ? '--open' : ''}`}
				/>
				<div className='header__title'>
					<FaFolderOpen />
					<h3>All notes</h3>
				</div>
			</div>
			<div
				className={`folder-content ${
					folderIsOpen ? 'folder-content--open' : ''
				}`}
			>
				{children}
			</div>
		</div>
	)
}

export default NotesFolder
