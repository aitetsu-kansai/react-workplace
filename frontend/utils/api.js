// services/api.js
const BASE_URL = 'http://localhost:5000'

export const fetchGroups = async () => {
	const response = await fetch(`${BASE_URL}/groups`)
	if (!response.ok) throw new Error('Failed to fetch groups')
	return response.json()
}

export const fetchTasks = async () => {
	const response = await fetch(`${BASE_URL}/tasks`)
	if (!response.ok) throw new Error('Failed to fetch tasks')
	return response.json()
}

export const createGroup = async groupData => {
	const response = await fetch(`${BASE_URL}/groups`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(groupData),
	})
	if (!response.ok) throw new Error('Failed to create group')
	return response.json()
}

export const createTask = async taskData => {
	const response = await fetch(`${BASE_URL}/tasks`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(taskData),
	})
	if (!response.ok) throw new Error('Failed to create group')
	return response.json()
}

export const putTaskGroup = async (taskId, newGroupId) => {
	const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ groupId: newGroupId }),
	})
	if (!response.ok) throw new Error('Failed to update task group')
}

export const putGroupOrder = async (oldIndex, newIndex, noteId) => {
	const response = await fetch(`${BASE_URL}/groups`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ oldIndex, newIndex, noteId }),
	})
	if (!response.ok) throw new Error('Failed to update group order')
}
