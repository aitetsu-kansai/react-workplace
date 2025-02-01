import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme, toggleTheme } from '../../../../redux/slices/uiSlice'

function ThemeSwitcher() {
	const dispatch = useDispatch()
	const currentTheme = useSelector(selectTheme)

	const changeTheme = () => {
		dispatch(toggleTheme())
	}

	return (
		<>
			{currentTheme === 'dark' ? (
				<MdLightMode
					title='Toggle theme'
					id='theme-toggle'
					onClick={changeTheme}
				/>
			) : (
				<MdDarkMode
					title='Toggle theme'
					id='theme-toggle'
					onClick={changeTheme}
				/>
			)}
		</>
	)
}

export default ThemeSwitcher
