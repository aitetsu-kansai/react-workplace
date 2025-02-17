import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch } from 'react-redux'
import { deleteTask, toggleTask } from '../../../../redux/slices/notesSlice'
import style from './Task.module.scss'

function Task({ task, index }) {
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: task.taskId,
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
		position: 'absolute',
		width: transform && `95%`,
		margin: '5px 0',
		zIndex: 1000,
		transform: CSS.Translate.toString(transform),
		backroundColor: isDragging && 'red',
		transition: 'opacity 0.2s',
	}

	return (
		<div
			className={`${style['group-task']} ${
				task.status && style['group-task--done']
			}`}
			key={task.taskId}
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			style={newStyle}
		>
			<label
				className='custom-checkbox'
				onMouseDown={e => e.stopPropagation()}
				onClick={e => handleToggleTask(e, task.taskId)}
				data-no-drag='true'
			>
				<input type='checkbox' checked={task.status} readOnly />
			</label>
			<p> {task.taskName}</p>
			<RxCross1
				onMouseDown={e => e.stopPropagation()}
				onClick={e => handleDeleteTask(e, task.taskId)}
				data-no-drag='true'
			/>
		</div>
	)
}

export default Task
