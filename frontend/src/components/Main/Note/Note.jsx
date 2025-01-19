import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectNotes } from '../../../redux/slices/notesSlice'
import style from './Note.module.scss'
function Note() {
	const { id } = useParams()
	const notes = useSelector(selectNotes)
	const [curNote, setCurNote] = useState()

	useEffect(() => {
		console.log('RERENDER')
		const note = notes.notes.find(note => note.id === id)
		if (note) {
			setCurNote(note)
		}
	}, [id, notes.notes])

	return (
		<div className={style['note-container']}>
			<h2>{curNote?.name}</h2>
		</div>
	)
}

export default Note
