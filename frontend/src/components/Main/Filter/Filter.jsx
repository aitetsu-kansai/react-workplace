import React, { useRef } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectSidebarTabFilter,
	setSidebarTabsFilter,
} from '../../../redux/slices/filterSlice'
import style from './Filter.module.scss'

function Filter() {
	const dispatch = useDispatch()
	const inputRef = useRef(null)
	const sidebarTabFilter = useSelector(selectSidebarTabFilter)
	const handleSetSidebarTabFilter = e => {
		dispatch(setSidebarTabsFilter(e.target.value))
	}

	return (
		<div className={style['filter-container']}>
			<div className={style['filter-input']} ref={inputRef}>
				<CiSearch />
				<input
					type='text'
					placeholder='Filter Request'
					onChange={handleSetSidebarTabFilter}
					value={sidebarTabFilter}
				/>
			</div>
		</div>
	)
}

export default Filter
