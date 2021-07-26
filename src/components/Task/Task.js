import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import views from '../../enums/view'
import { toggleTaskCompleted } from '../../store/slices/phaseSlice'
import classes from './Task.module.scss'

const Task = ({task, phaseId}) => {
	const activeView = useSelector(state => state.view.activeView);
	const dispatch = useDispatch();

	const handleToggleComplete = e => {
		const payload = {phaseId, taskId: task.id, isCompleted: e.target.checked};
		dispatch(toggleTaskCompleted(payload));
	}

	const renderTaskPrepend = () => {
		if(activeView === views.CREATE_PROGRESS){
      return <i className={`fas fa-minus ${classes['Task-prepend--hyphen']}`} />
    }
		if(activeView === views.MANAGE_PROGRESS){
			return <input type="checkbox" checked={task.isCompleted} onChange={handleToggleComplete}/>
		}
	}

	return (
		<div className={classes.Task}>
			<span className={classes['Task-prepend']}>
				{renderTaskPrepend()}
			</span>
			{task.text}
		</div>
	)
}

Task.propTypes = {
	task: PropTypes.object,
	phaseId: PropTypes.string
}

export default Task
