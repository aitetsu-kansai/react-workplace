import { GoHomeFill } from 'react-icons/go'
import { MdLightMode } from 'react-icons/md'
import { RiSidebarFoldFill, RiStickyNoteAddFill } from 'react-icons/ri'

import style from './Tools.module.scss'
function Tools() {
	return (
		<div className={style['tools-container']}>
			<GoHomeFill />
			<RiStickyNoteAddFill />
			<RiSidebarFoldFill />
			<MdLightMode />
		</div>
	)
}

export default Tools
