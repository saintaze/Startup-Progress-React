import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SwitchTransition } from 'react-transition-group';
import { resetPhaseState } from '../../store/slices/phaseSlice'
import Transition from '../Transition/Transition';
import PhaseList from '../PhaseList/PhaseList'
import ProgressControls from '../ProgressControls/ProgressControls'
import classes from './CreateProgress.module.scss'

const CreateProgress = props => {
	
	const allPhases = useSelector(state => state.phase.allPhases);
	const dispatch = useDispatch();

	const renderDeletePhasesIcon = () => {
		let deletePhasesIcon = null;
		if(allPhases.length){
			deletePhasesIcon = (
				<i key={0} className={`fas fa-trash ${classes['CreateProgress-deletePhases']}`} onClick={e => dispatch(resetPhaseState())}/>
			)
		}else{
			deletePhasesIcon = <></>
		}
		return <Transition key={deletePhasesIcon.key}>{deletePhasesIcon}</Transition>
	}

	return (
		<div className={classes.CreateProgress}>
			<h2 className={classes['CreateProgress-header']}>Create Progress</h2>
			<SwitchTransition >
				{renderDeletePhasesIcon()}
			</SwitchTransition>
			<ProgressControls />
			<PhaseList />
		</div>
	)
}

export default CreateProgress
