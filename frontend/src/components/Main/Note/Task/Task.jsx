import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch } from 'react-redux'
import { putTask, removeTask } from '../../../../../utils/api'
import { setInfo } from '../../../../redux/slices/infoSlice'
import { deleteTask, toggleTask } from '../../../../redux/slices/notesSlice'
import style from './Task.module.scss'

function Task({ task, isOverlay = false }) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task.taskId,
		data: { task, type: 'task' },
	})

	const dispatch = useDispatch()

	const handleToggleTask = async (e, taskId) => {
		e.stopPropagation()

		try {
			await putTask(taskId, undefined, !task.status)

			requestAnimationFrame(() => {
				dispatch(toggleTask(taskId))
			})
		} catch (err) {
			dispatch(setInfo({ infoMessage: 'Failed to update task' }))
		}
	}

	const handleDeleteTask = async (e, taskId) => {
		e.stopPropagation()

		try {
			await removeTask(taskId)
			dispatch(deleteTask(taskId))
		} catch (error) {
			console.error(error)
			dispatch(
				setInfo({
					infoCategory: 'error',
					infoMessage: 'Failed to delete task',
				})
			)
		}
	}

	const newStyle = transform && {
		margin: 0,
		transform: CSS.Translate.toString(transform),
		opacity: isOverlay ? 1 : 0,
		position: 'relative',
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
