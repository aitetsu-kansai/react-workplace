import React from 'react'
import style from './Group.module.scss'

function Group({ children, groupName }) {
	return (
		<div className={style['group-container']}>
			<h4 className={style['group-header']}>
				{groupName} <button>click</button>
			</h4>
			<div className={style['group-tasks']}>{children}</div>
		</div>
	)
}

export default Group
