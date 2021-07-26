import React from 'react'
import PhaseList from '../PhaseList/PhaseList'
import classes from './ManageProgress.module.scss'

const ManageProgress = props => {
	return (
		<div className={classes.ManageProgress}>
			<h2 className={classes['ManageProgress-header']}>Manage Progress</h2>
			<PhaseList />
		</div>
	)
}

export default ManageProgress
