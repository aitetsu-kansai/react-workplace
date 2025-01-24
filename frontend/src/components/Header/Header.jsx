import style from './Header.module.scss'
import Tabs from './Tabs/Tabs'
import HeaderTools from './Tools/HeaderTools'
function Header() {
	return (
		<div className={style.header}>
			<HeaderTools />
			<Tabs />
		</div>
	)
}

export default Header
