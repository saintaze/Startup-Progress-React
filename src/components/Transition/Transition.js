import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './Transition.scss'

const Transition = props =>  (
	<CSSTransition
		{...props}
		classNames="fade"
		timeout={{ enter: 200, exit: 200 }}
		appear={false}
	/>
)

export default Transition
