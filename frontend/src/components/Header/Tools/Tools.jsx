import { BsLayoutSidebar, BsWindowPlus } from 'react-icons/bs'
import { GoHome } from 'react-icons/go'
import { RiSunLine } from 'react-icons/ri'

import style from './Tools.module.scss'
function Tools() {
	return (
		<div className={style['tools-container']}>
			<GoHome />
			<BsWindowPlus />
			<BsLayoutSidebar />
			<RiSunLine />
		</div>
	)
}

export default Tools
