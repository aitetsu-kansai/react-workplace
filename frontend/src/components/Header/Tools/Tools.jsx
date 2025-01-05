import { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { GoHomeFill } from 'react-icons/go'
import { MdLightMode } from 'react-icons/md'
import { RiSidebarFoldFill, RiStickyNoteAddFill } from 'react-icons/ri'
import Dropdown from '../../UI-Components/Drowdown/Dropdown.jsx'
import Modal from '../../UI-Components/Modal/Modal.jsx'
import style from './Tools.module.scss'
function Tools() {
	const [inputIsShow, setInputIsShow] = useState(false)
	const [burgerMenuIsActive, setBurgerMenuIsActive] = useState(true)
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		const handleResize = () => {
			setWidth(window.innerWidth)
		}
		console.log(width)
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<>
			<div className={style['tools__container']}>
				{width <= 1000 && (
					<GiHamburgerMenu
						onClick={() => {
							setBurgerMenuIsActive(!burgerMenuIsActive)
						}}
					/>
				)}
				{width <= 1000 && burgerMenuIsActive && (
					<div className={style['tools__burger-menu']}>
						<Dropdown>
							<GoHomeFill />
							<RiStickyNoteAddFill onClick={() => setInputIsShow(true)} />
							<RiSidebarFoldFill />
							<MdLightMode />
						</Dropdown>
					</div>
				)}
			</div>
			<Modal active={inputIsShow} setActive={setInputIsShow}>
				{inputIsShow && <input type='text' />}
			</Modal>
		</>
	)
}

export default Tools
