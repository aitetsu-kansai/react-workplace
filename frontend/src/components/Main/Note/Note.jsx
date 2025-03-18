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

import { createGroup, fetchGroups, fetchTasks } from '../../../../utils/api'
import { handleDragEnd, handleDragStart } from '../../../../utils/dndHandlers'
import { generateId } from '../../../../utils/generateRandomId'
import {
	addGroup,
	addTask,
	selectGroupsById,
	selectNoteById,
	selectTasksById,
} from '../../../redux/slices/notesSlice'
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
		const loadData = async () => {
			try {
				const groups = await fetchGroups()
				groups.forEach(el => {
					const groupExists = groupsById.some(
						group => group.groupId === el.groupId
					)

					if (!groupExists && el.noteId === id) {
						dispatch(addGroup(el))
					}
				})

				const tasks = await fetchTasks()
				tasks.forEach(el => {
					const taskExist = tasksById.some(task => task.taskId === el.taskId)
					console.log(el)
					if (!taskExist && el.noteId === id) {
						dispatch(addTask(el))
					}
				})
			} catch (error) {
				dispatch(
					setInfo({
						infoCategory: 'error',
						infoMessage: 'Failed to fetch data',
					})
				)
			}
		}

		loadData()
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
			const newGroup = await createGroup({
				order: groupsById.length,
				noteId: id,
				groupName,
				groupId,
			})

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

	return (
		<DndContext
			onDragEnd={useCallback(
				event => {
					handleDragEnd(event, dispatch, id, setActiveTask)
				},
				[dispatch, id]
			)}
			autoScroll={false}
			collisionDetection={closestCenter}
			onDragStart={event => handleDragStart(event, setActiveTask)}
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
								/>
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
