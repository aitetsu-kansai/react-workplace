import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	selectTabs,
	setTabIsActive,
	toggleTab,
} from '../../../redux/slices/uiSlice'
import Tab from '../Tab/Tab'
import style from './Tabs.module.scss'
function Tabs() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const tabs = useSelector(selectTabs)
	const handleNavigate = url => {
		navigate(url)
	}

	const handleTabClick = (tabId, noteName) => {
		dispatch(setTabIsActive(tabId))
		navigate(`/notes/${tabId}`)
	}

	const handleCrossClick = (e, tabId) => {
		e.stopPropagation()
		dispatch(toggleTab({ id: tabId, type: 'close' }))
		handleNavigate(`notes`)
	}

	return (
		<div className={style['tabs-container']}>
			{tabs.map(
				el =>
					el.isOpen && (
						<Tab
							activeClassName={el.isActive && 'active'}
							noteName={el.name}
							onCrossClick={e => handleCrossClick(e, el.id)}
							onTabClick={() => handleTabClick(el.id, el.name)}
						/>
					)
			)}
		</div>
	)
}

export default Tabs
