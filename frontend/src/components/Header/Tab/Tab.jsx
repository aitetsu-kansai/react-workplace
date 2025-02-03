import { RxCross1 } from 'react-icons/rx'
import style from "./Tab.module.scss"
function Tab({
	noteName = 'Untitled note',
	activeClassName,
	onCrossClick,
	onTabClick,
}) {
	return (
		<div
			className={`${style['tab-container']} ${
				activeClassName ? style[activeClassName] : ''
			}`}
			onClick={onTabClick}
		>
			<p>{noteName}</p>
			<RxCross1 onClick={onCrossClick} />
		</div>
	)
}

export default Tab
