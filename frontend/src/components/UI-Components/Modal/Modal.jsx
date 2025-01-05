import React from 'react'
import './Modal.scss'

const Modal = React.memo(({ active, setActive, children, isImage = false }) => {
	return (
		<div
			className={`modal ${active ? 'active' : ''}`}
			onClick={() => {
				setActive(false)
			}}
		>
			<div
				className={`modal__content ${active ? 'active' : ''}`}
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
