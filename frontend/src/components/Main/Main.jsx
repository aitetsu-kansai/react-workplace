import { Outlet } from 'react-router-dom'
import style from './Main.module.scss'
import Sidebar from './Sidebar/Sidebar'
function Main() {
	return (
		<div className={style['main-container']}>
			<Sidebar />
			<Outlet />
		</div>
	)
}

export default Main
