import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch } from 'react-redux'
import { deleteTask, toggleTask } from '../../../../redux/slices/notesSlice'
import style from './Task.module.scss'

function Task({ task, index, isOverlay = false }) {
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: task.taskId,
			data: { task },
		})

	const dispatch = useDispatch()

	const handleToggleTask = (e, taskId) => {
		e.stopPropagation()
		requestAnimationFrame(() => {
			dispatch(toggleTask(taskId))
		})
	}

	const handleDeleteTask = (e, taskId) => {
		e.stopPropagation()
		dispatch(deleteTask(taskId))
	}

	const newStyle = transform && {
		margin: 0,
		transform: CSS.Translate.toString(transform),
		opacity: isOverlay ? 1 : 0,
		width: `100%`,
	}
	return (
		<div
			className={`${style['group-task']} ${
				task.status && style['group-task--done']
			}`}
			key={task.taskId}
			style={newStyle}
			ref={setNodeRef}
		>
			<label
				className='custom-checkbox'
				onMouseDown={e => e.stopPropagation()}
				onClick={e => handleToggleTask(e, task.taskId)}
				data-no-drag='true'
			>
				<input type='checkbox' checked={task.status} readOnly />
			</label>
			<p {...listeners} {...attributes}>
				{' '}
				{task.taskName}
			</p>
			<RxCross1
				onMouseDown={e => e.stopPropagation()}
				onClick={e => handleDeleteTask(e, task.taskId)}
				data-no-drag='true'
			/>
		</div>
	)
}

export default Task
