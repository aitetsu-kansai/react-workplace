import { RxCross1 } from 'react-icons/rx'
import style from './Tab.module.scss'
function Tab({ noteName = 'Untitled note' }) {
	return (
		<div className={style['tab-container']}>
			{noteName}
			<RxCross1 />
		</div>
	)
}

export default Tab
