import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchGroups, fetchNotes, fetchTasks } from '../../../utils/api'
import { setInfo } from '../../redux/slices/infoSlice'
import style from './Home.module.scss'

function Home() {
	const [data, setData] = useState({})
	const dispatch = useDispatch()

	useEffect(() => {
		const loadData = async () => {
			try {
				const notes = await fetchNotes()
				const groups = await fetchGroups()
				const tasks = await fetchTasks()
				setData({ notes, groups, tasks })
				console.log(data)
			} catch (err) {
				dispatch(setInfo({ infoMessage: 'Failed to load data' }))
			}
		}
		loadData()
	}, [])

	const completeTasks = useMemo(
		() => data?.tasks?.filter(el => el.status).length || 0,
		[data?.tasks]
	)
	const incompleteTasks = useMemo(
		() => (data?.tasks?.length || 0) - completeTasks,
		[data?.tasks, completeTasks]
	)
	return (
		<div className={style['home-page']}>
			<h1>Home</h1>
			<div className={style['home-page__columns']}>
				<div className={style['home-page__column']}>
					<h2>Notes:</h2>
					<p>Notes quantity: {data?.notes?.length} </p>
				</div>
				<div className={style['home-page__column']}>
					<h2>Groups:</h2>
					<p>Groups quantity: {data?.groups?.length} </p>
				</div>
				<div className={style['home-page__column']}>
					<h2>Tasks:</h2>
					<p>Tasks quantity: {data?.tasks?.length} </p>
					<p>Complete tasks: {completeTasks}</p>
					<p>Incomplete tasks: {incompleteTasks}</p>
				</div>
			</div>
		</div>
	)
}

export default Home
