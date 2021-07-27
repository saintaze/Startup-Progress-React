import React, { useEffect, useState } from  'react'
import { useSelector } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'
import views from '../../enums/view'
import Phase from '../Phase/Phase'
import Transition from '../Transition/Transition'

const PhaseList = props => {

	const allPhases = useSelector(state => state.phase.allPhases);
	const activeView = useSelector(state => state.view.activeView);
	const currentPhase = useSelector(state => state.phase.currentPhase);
	const [phasesToShow, setPhasesToShow] = useState([]);

	useEffect(() => {
		if(activeView === views.CREATE_PROGRESS){
			setPhasesToShow(allPhases);
		}
		if(activeView === views.MANAGE_PROGRESS){
			setPhasesToShow(allPhases.slice(0, currentPhase + 1));
		} 
	}, [allPhases, activeView, currentPhase])


	const renderProgress = () => {
		return phasesToShow.map((phase, idx) => 
		 	<Transition key={phase.id}>
				<Phase  phase={phase} phaseNumber={idx + 1} />
			</Transition>
		)
	}

	return (
		<div>
			<TransitionGroup>
				{renderProgress()}
			</TransitionGroup>
		</div>
	)
}


export default PhaseList
