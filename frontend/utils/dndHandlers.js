import { setInfo } from '../src/redux/slices/infoSlice'
import {
	updateGroupOrder,
	updateTaskGroup,
} from '../src/redux/slices/notesSlice'
import { putGroupOrder, putTask } from './api'

export const handleDragEnd = async (event, dispatch, noteId, setActiveTask) => {
	const { active, over } = event
	if (!over) return

	try {
		if (active.data.current.type === 'task') {
			const taskId = active.id
			const newGroupId = over.id

			if (active.data.current?.task.groupId !== newGroupId) {
				await putTask(taskId, newGroupId, undefined)
				dispatch(
					updateTaskGroup({
						newGroupId,
						taskId,
					})
				)
				setActiveTask(null)
			}
		}

		if (active.data.current.type === 'group') {
			const oldIndex = active.data.current?.sortable.index
			const newIndex = over.data.current?.sortable.index
			if (active.id !== over.id) {
				dispatch(
					updateGroupOrder({
						oldIndex,
						newIndex,
						noteId,
					})
				)

				await putGroupOrder(oldIndex, newIndex, noteId)
			}
		}
	} catch (err) {
		dispatch(
			setInfo({
				infoMessage: `Failed to update ${active.data.current.type}`,
				infoCategory: 'error',
			})
		)
	}
}

export const handleDragStart = async (event, setActiveTask) => {
	const { active } = event

	if (active.data.current?.type === 'task') {
		setActiveTask({ ...active.data.current.task })
	} else setActiveTask(null)
}
