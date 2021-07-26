import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TransitionGroup } from 'react-transition-group';
import { setShowAlert } from '../../store/slices/alertSlice'
import Transition from '../Transition/Transition';
import classes from './Alert.module.scss'

const Alert = props => {

	const closeAlert = () => {
		dispatch(setShowAlert(false));
	}

	const dispatch = useDispatch();
	const showAlert = useSelector(state => state.alert.showAlert)
	const alertHeader = useSelector(state => state.alert.alertHeader);
	const alertBody = useSelector(state => state.alert.alertBody);

	const renderAlert = () => {
		let alert = null;
		if(showAlert){
			alert = (
				<div className={classes.Backdrop} key="0" onClick={closeAlert}>
					<div className={classes.Alert}>
						<div className={classes['Alert-header']}>
							<div className={classes['Alert-title']}>{alertHeader}</div>
							<i className={`fas fa-times ${classes['Alert-close']}`} onClick={closeAlert} />
						</div>
						<h3>Random Fact</h3>
						<div className={classes['Alert-body']}>{alertBody}</div>
					</div>
				</div>
			)
		}else {
			alert = <></>
		}
		return <Transition key={alert.key}>{alert}</Transition>;
	}

	return (
		<TransitionGroup>
			{renderAlert()}
		</TransitionGroup>
	)
}

export default Alert
