import React from 'react'
import style from './Input.module.scss'

const Input = ({ onSubmit, placeholder, value, onChange, maxLength }) => {
	return (
		<div className={style['input-container']}>
			<form onSubmit={onSubmit} className={style['input-form']}>
				<input
					type='text'
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					maxLength={maxLength}
				/>
				<button type='submit'>add</button>
			</form>
		</div>
	)
}

export default Input
