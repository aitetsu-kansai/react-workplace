// import { useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import React, { useRef, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { MdDragIndicator } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import style from './Group.module.scss'

import { addTask } from '../../../../redux/slices/notesSlice'
import { generateId } from '../../../../utils/generateRandomId'
import Input from '../../../UI-Components/Input/Input'
function Group({ children, groupName, noteId, groupId, id }) {
	const {
		isOver,
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
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

	const [taskName, setTaskName] = useState('')
	const [taskIsOpen, setTaskIsOpen] = useState(true)
	const dispatch = useDispatch()
	const handleOnChange = e => {
		setTaskName(e.target.value)
	}

	const handleHideTask = () => {
		setTaskIsOpen(!taskIsOpen)
	}

	const handleOnSubmit = e => {
		e.preventDefault()
		const taskId = generateId()
		if (taskName) {
			dispatch(addTask({ noteId, groupId, taskId, taskName }))
			setTaskName('')
			console.log({ noteId, groupId, taskName })
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
					<MdDragIndicator {...attributes} {...listeners} />
					<IoIosArrowForward
						onClick={handleHideTask}
						className={`${style['task-arrow']} ${
							taskIsOpen ? style['task-arrow--open'] : ''
						}`}
					/>
					<h4>{groupName}</h4>
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
