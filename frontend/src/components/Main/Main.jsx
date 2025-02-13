import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { selectSidebebarVisibleState } from '../../redux/slices/uiSlice'
import style from './Main.module.scss'
import Sidebar from './Sidebar/Sidebar'
function Main() {
	const sidebarIsVisible = useSelector(selectSidebebarVisibleState)
	return (
		<div
			className={`${style['main-container']} ${
				!sidebarIsVisible && style['main-container--full']
			}`}
		>
			<Sidebar />
			<Outlet />
		</div>
	)
}

export default Main
