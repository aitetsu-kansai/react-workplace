// import { useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import React, { useRef, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { MdDragIndicator } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import style from './Group.module.scss'

import { RxCross1 } from 'react-icons/rx'
import { setInfo } from '../../../../redux/slices/infoSlice'
import {
	addTask,
	deleteGroup,
	selectTasksByGroupId,
} from '../../../../redux/slices/notesSlice'
import { generateId } from '../../../../utils/generateRandomId'
import Input from '../../../UI-Components/Input/Input'
function Group({ children, groupName, noteId, groupId }) {
	const tasksById = useSelector(state => selectTasksByGroupId(state, groupId))

	const { isOver, attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: groupId,
			data: {
				type: 'group',
			},
		})

	const newStyle = {
		transition,
		transform: transform && `translate(${transform.x}px, ${transform.y}px)`,
	}

	const tasksRef = useRef(null)

	const handleDeleteGroup = async groupId => {
		try {
			const response = await fetch(`http://localhost:5000/groups/${groupId}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
			})
			if (!response.ok) {
				throw new Error('Failed to delete group')
			}
			console.log(groupId)
			dispatch(deleteGroup(groupId))
		} catch (error) {
			dispatch(
				setInfo({
					infoCategory: 'error',
					infoMessage: 'Error' + error,
				})
			)
		}
	}

	const [taskName, setTaskName] = useState('')
	const [taskIsOpen, setTaskIsOpen] = useState(true)
	const dispatch = useDispatch()
	const handleOnChange = e => {
		setTaskName(e.target.value)
	}

	const handleHideTask = () => {
		setTaskIsOpen(!taskIsOpen)
	}

	const handleOnSubmit = async e => {
		e.preventDefault()

		try {
			const response = await fetch('http://localhost:5000/tasks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					noteId,
					groupId,
					taskId: generateId(),
					taskName,
					order: tasksById.length,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to create task')
			}

			const newTask = await response.json()
			console.log(newTask)
			dispatch(addTask(newTask))
			setTaskName('')
		} catch (error) {
			dispatch(
				setInfo({ infoCategory: 'error', infoMessage: 'Failed to create task' })
			)
		}
	}

	return (
		<div
			className={`${style['group-container']}`}
			ref={setNodeRef}
			style={newStyle}
		>
			<div
				className={`${style['group-header']} ${
					isOver ? style['group-header--dragging'] : ''
				}`}
			>
				<div className={style['group-header__title']}>
					<MdDragIndicator
						{...attributes}
						{...listeners}
						title='Drag the group'
					/>
					<IoIosArrowForward
						title='Hide/Show the group tasks'
						onClick={handleHideTask}
						className={`${style['task-arrow']} ${
							taskIsOpen ? style['task-arrow--open'] : ''
						}`}
					/>
					<h4>{groupName}</h4>
					<RxCross1
						className={style['task-cross']}
						title='Delete the group'
						onClick={() => handleDeleteGroup(groupId)}
					/>
				</div>
				<Input
					placeholder={'Task name'}
					onSubmit={handleOnSubmit}
					value={taskName}
					onChange={handleOnChange}
					maxLength={40}
				/>
			</div>
			<div
				className={`${style['group-tasks']} ${
					taskIsOpen ? style['group-tasks--open'] : ''
				}`}
				style={{
					transition: '0.2s all ease',
				}}
				ref={tasksRef}
			>
				<div>{children}</div>
			</div>
		</div>
	)
}

export default Group
