import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'
import { createNewPhase, createNewTask } from '../../store/slices/phaseSlice'
import Transition from '../Transition/Transition'
import classes from './ProgressControls.module.scss'


const ProgressControls = props => {
	const [phase, setPhase] = useState('');
	const [task, setTask] = useState('');
	const allPhases = useSelector(state => state.phase.allPhases);
	const dispatch = useDispatch();
	
	const handleInput = e => {
		if(e.key === 'Enter') {
			if (phase.trim() && !task.trim()) {
				dispatch(createNewPhase(phase));
			}

			if (task.trim() && !phase.trim()) {
				dispatch(createNewTask(task));
			}

			if (phase.trim() && task.trim()){
				dispatch(createNewPhase(phase));
				dispatch(createNewTask(task));
			}
			setPhase('');
			setTask('');
		}
	}

	const renderTaskInput = () => {
		let taskInput = null;
		if(allPhases.length){
			taskInput = (
				<input
					key={0}
					className={classes['ProgressControls-control']} 
					type="text" placeholder="Enter Task" value={task} onChange={e => setTask(e.target.value)} onKeyDown={handleInput} />
			)
		}else {
			taskInput = <></> 
		}
		return <Transition key={taskInput.key}>{taskInput}</Transition>
	}


	return (
		<div className={classes.ProgressControls}>
			<input
				className={classes['ProgressControls-control']} 
				type="text" placeholder="Enter Phase" value={phase} onChange={e => setPhase(e.target.value)} onKeyDown={handleInput} />
			<TransitionGroup>
				{renderTaskInput()}
			</TransitionGroup>
		</div>
	)
}


export default ProgressControls
 