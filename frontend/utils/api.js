// services/api.js
const BASE_URL = 'http://localhost:5000'

//Notes
export const fetchNotes = async () => {
	const response = await fetch(`${BASE_URL}/notes`)
	if (!response.ok) throw new Error('Failed to fetch notes')
	return response.json()
}

export const createNote = async noteData => {
	const response = await fetch(`${BASE_URL}/notes`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(noteData),
	})
	if (!response.ok) throw new Error('Failed to create note')
	return response.json()
}

export const removeNote = async id => {
	const response = await fetch(`${BASE_URL}/notes/${id}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	})
	if (!response.ok) {
		throw new Error('Failed to delete note')
	}
}

//Groups
export const createGroup = async groupData => {
	const response = await fetch(`${BASE_URL}/groups`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(groupData),
	})
	if (!response.ok) throw new Error('Failed to create group')
	return response.json()
}

export const fetchGroups = async () => {
	const response = await fetch(`${BASE_URL}/groups`)
	if (!response.ok) throw new Error('Failed to fetch groups')
	return response.json()
}

export const removeGroup = async groupId => {
	const response = await fetch(`${BASE_URL}/groups/${groupId}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	})
	if (!response.ok) {
		throw new Error('Failed to delete note')
	}
}

export const putGroupOrder = async (oldIndex, newIndex, noteId) => {
	const response = await fetch(`${BASE_URL}/groups`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ oldIndex, newIndex, noteId }),
	})
	if (!response.ok) throw new Error('Failed to update group order')
}

export const fetchTasks = async () => {
	const response = await fetch(`${BASE_URL}/tasks`)
	if (!response.ok) throw new Error('Failed to fetch tasks')
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

export const removeTask = async taskId => {
	const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	})
	if (!response.ok) {
		throw new Error('Failed to delete note')
	}
}

export const putTask = async (taskId, newGroupId, newStatus) => {
	if (newGroupId === undefined && newStatus === undefined) {
		throw new Error('No fields to update')
	}

	const body = {}
	if (newGroupId !== undefined) body.groupId = newGroupId
	if (newStatus !== undefined) body.status = newStatus

	const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	})
	if (!response.ok) throw new Error('Failed to update task group')
}
