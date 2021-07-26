import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveView } from '../../store/slices/viewSlice'
import views from '../../enums/view';
import classes from './ProgressViews.module.scss';


const ProgressViews = props => {

	const activeView = useSelector(state => state.view.activeView);
	const dispatch = useDispatch();

	const isActiveView = view => {
		return view === activeView;
	}

	const renderViewBtns = () => {
		return Object.keys(views).map(view => 
			<button
				key={view}
				className={`${classes['ProgressViews-btn']} ${isActiveView(view) && classes['ProgressViews-btn--active']}`} 
				onClick={e => dispatch(setActiveView(view))}
			>
				{view.replace('_', ' ').toLowerCase()}
			</button>	
		)
	}

	return (
		<div className={classes.ProgressViews}>
			{renderViewBtns()}
		</div>
	)
}


export default ProgressViews
