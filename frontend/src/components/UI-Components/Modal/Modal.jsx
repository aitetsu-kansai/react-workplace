import React from 'react'
import style from './Modal.module.scss'

const Modal = React.memo(({ active, setActive, children, isImage = false }) => {
	return (
		<div
			className={`${style.modal} ${active ? style.active : ''}`}
			onClick={() => {
				setActive(false)
			}}
		>
			<div
				className={`${style['modal__content']} ${active ? style.active : ''}`}
				onClick={e => {
					e.stopPropagation()
				}}
			>
				{children}
			</div>
		</div>
	)
})

export default Modal
