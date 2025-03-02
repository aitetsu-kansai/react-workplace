import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { MdDragIndicator } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { addTask } from '../../../../redux/slices/notesSlice'
import { generateId } from '../../../../utils/generateRandomId'
import Input from '../../../UI-Components/Input/Input'
import style from './Group.module.scss'
function Group({ children, groupName, noteId, groupId }) {
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
		<div className={style['group-container']}>
			<div className={style['group-header']}>
				<div className={style['group-header__title']}>
					<MdDragIndicator />
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
			>
				{children}
			</div>
		</div>
	)
}

export default Group
