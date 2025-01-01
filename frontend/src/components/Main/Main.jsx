import style from './Main.module.scss'
import Note from './Note/Note'
import Sidebar from './Sidebar/Sidebar'
function Main() {
	return (
		<div className={style['main-container']}>
			<Sidebar />
			<Note />
		</div>
	)
}

export default Main
