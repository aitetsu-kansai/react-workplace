import styles from './InputLabel.module.scss'

function InputLabel({
	title,
	id,
	type,
	onChange,
	onKeyDown,
	value,
	maxLength,
	required = false,
	placeholder,
}) {
	return (
		<div className={styles['input-container']}>
			<div className={styles['input__label-container']}>
				<label htmlFor={id}>{title && `${title}:`}</label>
			</div>
			<div className={styles['input__field']}>
				<input
					className={styles.input}
					type={type}
					id={id}
					value={value}
					required={required}
					onChange={onChange}
					onKeyDown={onKeyDown}
					maxLength={maxLength || null}
					placeholder={placeholder}
				/>
			</div>
		</div>
	)
}
export default InputLabel
