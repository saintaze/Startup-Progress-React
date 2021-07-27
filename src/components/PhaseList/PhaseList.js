import React, { useEffect, useState } from  'react'
import { useSelector } from 'react-redux'
import views from '../../enums/view'
import Phase from '../Phase/Phase'

const PhaseList = props => {

	const allPhases = useSelector(state => state.phase.allPhases);
	const activeView = useSelector(state => state.view.activeView);
	const currentPhase = useSelector(state => state.phase.currentPhase);
	const [phasesToShow, setPhasesToShow] = useState(allPhases)


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
			<Phase key={phase.id} phase={phase} phaseNumber={idx + 1} />
		)
	}

	return (
		<div>
			{renderProgress()}
		</div>
	)
}


export default PhaseList
