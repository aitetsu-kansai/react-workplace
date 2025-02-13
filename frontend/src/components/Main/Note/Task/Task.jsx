import { useDraggable } from '@dnd-kit/core'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch } from 'react-redux'
import { deleteTask, toggleTask } from '../../../../redux/slices/notesSlice'
import style from './Task.module.scss'

function Task({ status, taskId, taskName }) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: taskId,
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

	const newStyle = transform
		? { transform: `translate(${transform.x}px, ${transform.y}px)` }
		: undefined

	return (
		<div
			className={`${style['group-task']} ${
				status && style['group-task--done']
			}`}
			key={taskId}
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			style={newStyle}
		>
			<label
				className='custom-checkbox'
				onMouseUp={e => handleToggleTask(e, taskId)}
			>
				<input type='checkbox' checked={status} readOnly />
			</label>
			<p> {taskName}</p>
			<RxCross1 onMouseUp={e => handleDeleteTask(e, taskId)} />
		</div>
	)
}

export default Task
