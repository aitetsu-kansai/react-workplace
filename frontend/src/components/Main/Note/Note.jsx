import { useState } from 'react'
import { PiColumnsPlusLeftFill } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
	addGroup,
	selectGroupsById,
	selectNoteById,
	selectNotes,
} from '../../../redux/slices/notesSlice'
import InputLabel from '../../UI-Components/Label/InputLabel'
import Modal from '../../UI-Components/Modal/Modal'
import Group from './Group/Group'
import style from './Note.module.scss'

function Note() {
	const dispatch = useDispatch()
	const { id } = useParams()
	const notes = useSelector(selectNotes)
	const curNote = useSelector(state => selectNoteById(state, id))
	const groups = useSelector(state => selectGroupsById(state, id))
	const [groupName, setGroupName] = useState('')
	const [inputIsShow, setInputIsShow] = useState(false)

	const handleOnSubmit = e => {
		e.preventDefault()
		dispatch(addGroup({ noteId: id, groupName }))
		setGroupName('')
		setInputIsShow(!inputIsShow)
	}

	return (
		<div className={style['note-container']}>
			<div className={style['note__header']}>
				<h2>{curNote?.name}</h2>
				{curNote && (
					<PiColumnsPlusLeftFill
						onClick={() => {
							setInputIsShow(!inputIsShow)
						}}
					/>
				)}
			</div>
			<div className={style['note__groups']}>
				{groups.map(el => {
					return (
						<Group groupName={el.groupName} key={el.noteId}>
							<p>Task one</p>
							<p>Task Two</p>
							<p>Task Three</p>
						</Group>
					)
				})}
			</div>
			<div>
				<Modal active={inputIsShow} setActive={setInputIsShow}>
					{inputIsShow && (
						<form onSubmit={handleOnSubmit}>
							<InputLabel
								title={'Name of new Group'}
								id='groupName'
								value={groupName}
								onChange={e => {
									setGroupName(e.target.value)
								}}
								maxLength={40}
							/>
						</form>
					)}
				</Modal>
			</div>
		</div>
	)
}

export default Note
