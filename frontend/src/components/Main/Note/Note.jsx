import { DndContext } from '@dnd-kit/core'
import { useState } from 'react'

import { PiColumnsPlusLeftFill } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setInfo } from '../../../redux/slices/infoSlice'
import style from './Note.module.scss'

import {
	addGroup,
	selectGroupsById,
	selectNoteById,
	selectTasksById,
	updateTaskGroup,
} from '../../../redux/slices/notesSlice'
import { generateId } from '../../../utils/generateRandomId'
import InputLabel from '../../UI-Components/Label/InputLabel'
import Modal from '../../UI-Components/Modal/Modal'
import Group from './Group/Group'
import Task from './Task/Task'

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
	const handleDragEnd = event => {
		const { active, over } = event
		if (!over) return
		const taskId = active.id
		const newGroupId = over.id
		console.log(taskId)
		console.log(newGroupId)
		dispatch(updateTaskGroup({ newGroupId, taskId }))
	}

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className={style['note-container']}>
				<div className={style['note__header']}>
					<h2>{curNote?.name}</h2>
					<div className={style['note__header-tools']}>
						{curNote && (
							<PiColumnsPlusLeftFill
								onClick={() => {
									setInputIsShow(!inputIsShow)
								}}
								title='Create a new group'
							/>
						)}
					</div>
				</div>
				<div className={style['note__groups']}>
					{groupsById.map(group => {
						return (
							<Group
								groupName={group.groupName}
								key={group.groupId}
								groupId={group.groupId}
								noteId={group.noteId}
							>
								{tasks
									.filter(task => task.groupId === group.groupId)
									.map(task => {
										return (
											<Task
												status={task.status}
												taskId={task.taskId}
												taskName={task.taskName}
											/>
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
		</DndContext>
	)
}

export default Note
