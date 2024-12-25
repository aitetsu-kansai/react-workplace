import React from 'react'
import Tab from '../Tab/Tab'
import style from './Tabs.module.scss'
function Tabs() {
	return (
		<div className={style['tabs-container']}>
			<Tab noteName={'Note 1'} />
			<Tab noteName={'Note 2'} />
			<Tab noteName={'Note 3'} />
		</div>
	)
}

export default Tabs
