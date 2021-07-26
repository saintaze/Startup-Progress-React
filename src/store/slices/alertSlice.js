import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
		showAlert: false,
		alertHeader: null,
		alertBody: null
  },
  reducers: {
		setShowAlert(state, action){
			if(!action.payload.show){
				state.alertBody = null;
				state.alertHeader = null;
			}
			if(action.payload.show){
				state.alertBody = action.payload.body;
				state.alertHeader = action.payload.header; 
			}
			state.showAlert = action.payload.show;
		}
  },
})

export const { 
	setShowAlert
} = alertSlice.actions

export default alertSlice.reducer