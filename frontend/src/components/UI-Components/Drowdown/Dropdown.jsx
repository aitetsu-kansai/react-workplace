import { useEffect, useRef, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import './Dropdown.scss'

function Dropdown({ children }) {
	const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
	const dropdownRef = useRef(null)
	const burgerRef = useRef(null)
	const openDropdown = () => {
		setDropdownIsOpen(true)
	}
	const closeDropdown = e => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
			setDropdownIsOpen(false)
		}
	}

	useEffect(() => {
		dropdownIsOpen
			? document.addEventListener('click', closeDropdown)
			: document.removeEventListener('click', closeDropdown)

		return () => {
			document.removeEventListener('click', closeDropdown)
		}
	}, [dropdownIsOpen])

	return (
		<div className='dropdown__container' ref={dropdownRef}>
			<GiHamburgerMenu
				onClick={openDropdown}
				className='more-info__ico'
				ref={burgerRef}
			/>
			<ul
				className={`dropdown__list ${
					dropdownIsOpen ? 'dropdown__list--open' : ''
				}`}
			>
				{children}
			</ul>
		</div>
	)
}

export default Dropdown
