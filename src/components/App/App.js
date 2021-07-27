import  React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import views from '../../enums/view'
import { setShowAlert} from '../../store/slices/alertSlice'
import {fetchRandomFact} from '../../utils/helpers'
import ProgressViews from '../ProgressViews/ProgressViews'
import CreateProgress from '../CreateProgress/CreateProgress'
import ManageProgress from '../ManageProgress/ManageProgress'
import Alert from '../Alert/Alert'
import classes from './App.module.scss'

function App() {
	const activeView = useSelector(state => state.view.activeView);
	const allPhases = useSelector(state => state.phase.allPhases);
	const dispatch = useDispatch();

	const renderActiveView = () => {
		switch(activeView){
			case views.CREATE_PROGRESS:
				return <CreateProgress />
			case views.MANAGE_PROGRESS:
				return <ManageProgress />
			default:
				return <CreateProgress />
		}
	}
	
	useEffect(() => {
		const allPhasesCompleted = activeView === views.MANAGE_PROGRESS && allPhases.length && allPhases.every(phase => phase.isCompleted);
		if(allPhasesCompleted) {
			(async () => {
				const fact = await fetchRandomFact();
				const alertPayload = {show: true, header: 'Achievement Unlocked', body: fact};
				dispatch(setShowAlert(alertPayload));
			})()
		}
	}, [allPhases, activeView, dispatch])

  return (
    <div className={classes.App}>
			<Alert />
      <h1 className={classes['App-header']}>Startup Progress</h1>
			<ProgressViews />
			<div className={classes['App-activeView']}>
				{renderActiveView()}
			</div>
    </div>
  );
}

export default App;
