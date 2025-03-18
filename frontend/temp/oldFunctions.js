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

				try {
					const response = await fetch(`http://localhost:5000/groups`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ oldIndex, newIndex, noteId: id }),
					})
					if (!response.ok) throw new Error('Failed to update task')
				} catch (error) {
					dispatch(
						setInfo({
							infoMessage: `Failed to update group's order`,
							infoCategory: 'error',
						})
					)
				}
			}
		}
	},
	[dispatch, id]
)

//////////////////////////

	const handleDragStart = event => {
		const { active } = event

		if (active.data.current?.type === 'task') {
			setActiveTask({ ...active.data.current.task })
		} else setActiveTask(null)
	}

////////////////////////////////
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
						const taskExist = tasksById.some(task => task.taskId === el.taskId)
						console.log(el)
						if (!taskExist && el.noteId === id) {
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
