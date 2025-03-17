import {
	closestCenter,
	DndContext,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import {
	horizontalListSortingStrategy,
	SortableContext,
	sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { useCallback, useEffect, useState } from 'react'
import { PiColumnsPlusLeftFill } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setInfo } from '../../../redux/slices/infoSlice'
import style from './Note.module.scss'

import {
	addGroup,
	addTask,
	selectGroupsById,
	selectNoteById,
	selectTasksById,
	updateGroupOrder,
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
	const tasksById = useSelector(state => selectTasksById(state, id))
	const [groupName, setGroupName] = useState('')
	const [inputIsShow, setInputIsShow] = useState(false)

	useEffect(() => {
		const fetchGroups = async () => {

			try {
				const response = await fetch(`http://localhost:5000/groups`)
				if (response.ok) {
					const result = await response.json()
					result.forEach(el => {
						const groupExists = groupsById.some(
							group => group.groupId === el.groupId
						)

						if (!groupExists && el.noteId === id) {
							dispatch(addGroup(el))
						}
					})
				}
			} catch (error) {
				dispatch(
					setInfo({
						infoCategory: 'error',
						infoMessage: 'Failed to fetch groups',
					})
				)
			}
		}

		const fetchTasks = async () => {
			try {
				const response = await fetch('http://localhost:5000/tasks')
				if (response.ok) {
					const result = await response.json()

					result.forEach(el => {
						const taskExist = tasksById.some(task => {
							// console.log(task.taskId === el.taskId)

							return task.taskId === el.taskId
						})
						// console.log(taskExist)
						if (!taskExist) {
							dispatch(
								addTask({
									noteId: el.noteId,
									groupId: el.groupId,
									taskId: el.taskId,
									taskName: el.taskName,
									order: el.order,
								})
							)
						}
					})
				}
			} catch (error) {
				dispatch(
					setInfo({
						infoCategory: 'error',
						infoMessage: 'Failed to fetch tasks',
					})
				)
			}
		}

		fetchGroups()
		fetchTasks()
	}, [id])

	const handleOnSubmit = async e => {
		e.preventDefault()
		const groupId = generateId()
		const isDublicate = groupsById.some(group => group.groupName === groupName)
		if (isDublicate) {
			dispatch(
				setInfo({ infoMessage: 'The group with this name is already created' })
			)
			return
		}
		if (!groupName) {
			dispatch(
				setInfo({
					infoCategory: 'error',
					infoMessage: 'Group name cannot be empty',
				})
			)
		}

		try {
			const response = await fetch('http://localhost:5000/groups', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					order: groupsById.length,
					noteId: id,
					groupName,
					groupId,
				}),
			})

			if (!response.ok) {
				throw new Error('Failed to create group')
			}

			const newGroup = await response.json()
			console.log(newGroup)

			dispatch(addGroup(newGroup))
			setGroupName('')
			setInputIsShow(!inputIsShow)
		} catch (err) {
			console.log('Error' + err)
		}
	}

	const [activeTask, setActiveTask] = useState(null)

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)

	const handleDragStart = event => {
		const { active } = event

		if (active.data.current?.type === 'task') {
			setActiveTask({ ...active.data.current.task })
		} else setActiveTask(null)
	}

	const handleDragEnd = useCallback(
		async event => {
			const { active, over } = event
			if (!over) return
			if (active.data.current.type === 'task') {
				const taskId = active.id
				const newGroupId = over.id

				if (active.data.current?.task.groupId !== newGroupId) {
					try {
						const response = await fetch(
							`http://localhost:5000/tasks/${taskId}`,
							{
								method: 'PUT',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({ groupId: newGroupId }),
							}
						)
						if (!response.ok) throw new Error('Failed to update task')
						dispatch(
							updateTaskGroup({
								newGroupId,
								taskId,
							})
						)
						setActiveTask(null)
					} catch (error) {
						dispatch(
							setInfo({
								infoMessage: `Failed to update task's group`,
								infoCategory: 'error',
							})
						)
					}
				}
			}

			if (active.data.current.type === 'group') {
				const oldIndex = active.data.current?.sortable.index
				const newIndex = over.data.current?.sortable.index
				if (active.id !== over.id) {
					console.log(id)
					dispatch(
						updateGroupOrder({
							oldIndex,
							newIndex,
							noteId: id,
						})
					)

					// try {
					// 	const response = await fetch(`http://localhost:5000/groups`, {
					// 		method: 'PUT',
					// 		headers: {
					// 			'Content-Type': 'application/json',
					// 		},
					// 		body: JSON.stringify({ oldIndex, newIndex, noteId: id }),
					// 	})
					// 	if (!response.ok) throw new Error('Failed to update task')
					// } catch (error) {
					// 	dispatch(
					// 		setInfo({
					// 			infoMessage: `Failed to update group's order`,
					// 			infoCategory: 'error',
					// 		})
					// 	)
					// }
				}
			}
		},
		[dispatch, id]
	)

	return (
		<DndContext
			onDragEnd={handleDragEnd}
			autoScroll={false}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
			sensors={sensors}
		>
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
					<SortableContext
						items={groupsById.map(group => group.groupId)}
						strategy={horizontalListSortingStrategy}
					>
						{groupsById.map(group => {
							return (
								<Group
									groupName={group.groupName}
									key={group.groupId}
									groupId={group.groupId}
									noteId={group.noteId}
									id={group.order}
								>
									{tasksById
										.filter(task => task.groupId === group.groupId)
										.map(task => {
											return (
												<Task key={task.taskId} task={task} id={task.order} />
											)
										})}
								</Group>
							)
						})}
					</SortableContext>
				</div>
				{activeTask && (
					<DragOverlay>
						{' '}
						{<Task task={activeTask} isOverlay={true} />}
					</DragOverlay>
				)}
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
