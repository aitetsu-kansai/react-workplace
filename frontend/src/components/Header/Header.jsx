import style from './Header.module.scss'
import Tabs from './Tabs/Tabs'
import Tools from './Tools/Tools'
function Header() {
	return (
		<div className={style.header}>
			<Tools />
			<Tabs />
		</div>
	)
}

export default Header
