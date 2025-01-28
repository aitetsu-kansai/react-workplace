import { useState } from 'react'

import { PiColumnsPlusLeftFill } from 'react-icons/pi'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setInfo } from '../../../redux/slices/infoSlice'

import {
	addGroup,
	selectGroupsById,
	selectNoteById,
	selectTasksById,
} from '../../../redux/slices/notesSlice'
import { generateId } from '../../../utils/generateRandomId'
import InputLabel from '../../UI-Components/Label/InputLabel'
import Modal from '../../UI-Components/Modal/Modal'
import Group from './Group/Group'
import style from './Note.module.scss'

function Note() {
	const dispatch = useDispatch()
	const { id } = useParams()
	const curNote = useSelector(state => selectNoteById(state, id))
	const groupsById = useSelector(state => selectGroupsById(state, id))
	const tasks = useSelector(state => selectTasksById(state, id))
	const [groupName, setGroupName] = useState('')
	const [inputIsShow, setInputIsShow] = useState(false)

	const handleOnSubmit = e => {
		e.preventDefault()
		const groupId = generateId()
		const isDublicate = groupsById.some(group => group.groupName === groupName)
		if (isDublicate) {
			dispatch(
				setInfo({ infoMessage: 'The group with this name is already created' })
			)
			return
		}
		if (groupName) {
			dispatch(addGroup({ noteId: id, groupName, groupId }))
			setGroupName('')
			setInputIsShow(!inputIsShow)
		}
	}

	return (
		<div className={style['note-container']}>
			<div className={style['note__header']}>
				<h2>{curNote?.name}</h2>
				<div className={style['note__header-tools']}>
					{curNote && (
						<PiColumnsPlusLeftFill
							onClick={() => {
								setInputIsShow(!inputIsShow)
							}}
						/>
					)}
				</div>
			</div>
			<div className={style['note__groups']}>
				{groupsById.map(group => {
					return (
						<Group
							groupName={group.groupName}
							key={generateId()}
							groupId={group.groupId}
							noteId={group.noteId}
						>
							{tasks
								.filter(task => task.groupId === group.groupId)
								.map(task => {
									return (
										<div className={style['group-task']}>
											<input type='checkbox' />
											<p key={generateId()}> {task.taskName}</p>
											<RxCross1 />
										</div>
									)
								})}
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
