import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { selectPhaseId } from '../../store/slices/phaseSlice'
import views from '../../enums/view';
import TaskList from '../TaskList/TaskList'
import classes from './Phase.module.scss'

const Phase = ({phase, phaseNumber}) => {

	const selectedPhaseId = useSelector(state => state.phase.selectedPhaseId);
	const activeView = useSelector(state => state.view.activeView);
	const dispatch = useDispatch();

	const renderPhaseAppend = () => {
		if(activeView === views.MANAGE_PROGRESS && phase.isCompleted) {
			return <i className={`fas fa-check ${classes['Phase-check']}`} />
		} 
		if(activeView === views.CREATE_PROGRESS && selectedPhaseId === phase.id) {
			return <i className={`fas fa-star-of-life ${classes['Phase-selected']}`} />
		}
	}

	return (
		<div className={classes.Phase} onClick={e => dispatch(selectPhaseId(phase.id))}>
			<div className={classes['Phase-header']}>
				<div className={classes['Phase-header--left']} >
					<span className={classes['Phase-number']}>{phaseNumber}</span>
					<span className={classes['Phase-name']}>{phase.name}</span>
				</div>
				{renderPhaseAppend()}
			</div>
			<TaskList tasks={phase.tasks} phaseId={phase.id}/>
		</div> 
	)
}

Phase.propTypes = {
	phase: PropTypes.object,
	phaseNumber: PropTypes.number
}

export default Phase
