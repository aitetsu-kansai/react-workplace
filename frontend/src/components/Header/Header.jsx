import style from './Header.module.scss'
import Tabs from './Tabs/Tabs'
function Header() {
	return (
		<div className={style.header}>
			<Tabs />
		</div>
	)
}

export default Header
