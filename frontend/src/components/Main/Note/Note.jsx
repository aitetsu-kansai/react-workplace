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
import { useCallback, useState } from 'react'
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
			dispatch(
				addGroup({ order: groupsById.length, noteId: id, groupName, groupId })
			)
			setGroupName('')
			setInputIsShow(!inputIsShow)
		}
	}

	const [activeTask, setActiveTask] = useState(null)
	// const handleDragEnd = useCallback(
	// 	event => {
	// 		const { active, over } = event
	// 		if (!over) return
	// 		console.log(active)
	// 		const taskId = active.id
	// 		const newGroupId = over.id
	// 		if (active.data.current?.groupId !== newGroupId) {
	// 			setActiveTask(null)
	// 			dispatch(
	// 				updateTaskGroup({
	// 					newGroupId,
	// 					taskId,
	// 				})
	// 			)
	// 		}
	// 	},
	// 	[dispatch]
	// )

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)

	const handleDragStart = event => {
		const { active, over } = event

		if (active.data.current?.type === 'task') {
			setActiveTask({ ...active.data.current.task })
		} else setActiveTask(null)
	}

	const handleDragEnd = useCallback(
		event => {
			const { active, over } = event
			if (!over) return
			if (active.data.current.type === 'task') {
				const taskId = active.id
				const newGroupId = over.id
				console.log(newGroupId)

				if (active.data.current?.task.groupId !== newGroupId) {
					setActiveTask(null)
					dispatch(
						updateTaskGroup({
							newGroupId,
							taskId,
						})
					)
				}
			}

			if (active.data.current.type === 'group') {
				const oldIndex = active.data.current?.sortable.index
				const newIndex = over.data.current?.sortable.index
				console.log(newIndex)
				if (active.id !== over.id) {
					dispatch(
						updateGroupOrder({
							oldIndex,
							newIndex,
						})
					)
				}
			}
		},
		[dispatch]
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
						{groupsById.map((group, index) => {
							return (
								<Group
									groupName={group.groupName}
									key={group.groupId}
									groupId={group.groupId}
									noteId={group.noteId}
									id={group.order}
								>
									{tasks
										.filter(task => task.groupId === group.groupId)
										.map((task, index) => {
											return (
												<Task key={task.taskId} task={task} index={index} />
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
