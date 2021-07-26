import { createSlice } from '@reduxjs/toolkit'
import views from '../../enums/view'
import {getLocalStorage, setLocalStorage} from '../../utils/helpers'

export const viewSlice = createSlice({
  name: 'view',
  initialState: getLocalStorage('viewSlice') || {
		activeView: views.CREATE_PROGRESS,
  },
  reducers: {
		setActiveView(state, action){
			state.activeView = action.payload;
			setLocalStorage('viewSlice', state);
		}
  },
})

export const { 
	setActiveView
} = viewSlice.actions

export default viewSlice.reducer