import { useEffect, useRef, useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import './Dropdown.scss'

function Dropdown({ children }) {
	const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
	const [dropDownChanging, setDropdownChanging] = useState(false)
	const dropdownRef = useRef(null)

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
			<HiOutlineDotsVertical
				onClick={openDropdown}
				className='more-info__ico'
			/>
			<ul
				className={`dropdown__list ${
					dropdownIsOpen && 'dropdown__list--open'
				} `}
			>
				{children}
			</ul>
		</div>
	)
}

export default Dropdown
