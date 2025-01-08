import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectTabs,
	setTabIsActive,
	toggleTab,
} from '../../../redux/slices/uiSlice'
import Tab from '../Tab/Tab'
import style from './Tabs.module.scss'
function Tabs() {
	const dispatch = useDispatch()
	const tabs = useSelector(selectTabs)
	const handleOnClick = id => {
		toggleSidebar(id)
	}
	return (
		<div className={style['tabs-container']}>
			{tabs.map(
				el =>
					el.isOpen && (
						<Tab
							activeClassName={el.isActive && 'active'}
							noteName={el.name}
							onCrossClick={e => {
								e.stopPropagation()
								dispatch(toggleTab({id: el.id, type:'close'}))
							}}
							onTabClick={e => {
								dispatch(setTabIsActive(el.id))
							}}
						/>
					)
			)}
			{/* <Tab noteName={'Note 1'} />
			<Tab noteName={'Note 2'} />
			<Tab noteName={'Note 3'} /> */}
		</div>
	)
}

export default Tabs
