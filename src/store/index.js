import { configureStore } from '@reduxjs/toolkit'
import phaseReducer from './slices/phaseSlice'
import viewReducer from './slices/viewSlice'
import alertReducer from './slices/alertSlice'


export default configureStore({
  reducer: {
		phase: phaseReducer,
		view: viewReducer,
		alert: alertReducer
	}
})