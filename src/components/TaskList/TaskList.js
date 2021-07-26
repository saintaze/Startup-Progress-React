import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
import Transition from '../Transition/Transition'
import Task from '../Task/Task'
import classes from './TaskList.module.scss'

const TaskList = ({tasks, phaseId}) => {

	const renderTaskList = () => {
		return tasks.map(task => 
			<Transition key={task.id} >
				<Task task={task} phaseId={phaseId} />
			</Transition>
		)
	}

	return (
		<div className={classes.TaskList}>
			<TransitionGroup>
				{renderTaskList()}
			</TransitionGroup>
		</div>
	)
}

TaskList.propTypes = {
	tasks: PropTypes.array,
	phaseId: PropTypes.string
}

export default TaskList
