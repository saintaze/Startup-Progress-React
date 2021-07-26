import { createSlice } from '@reduxjs/toolkit'
import uuid from 'react-uuid'
import { getLocalStorage, setLocalStorage } from '../../utils/helpers'


export const phaseSlice = createSlice({
  name: 'phase',
  initialState: getLocalStorage('phaseSlice') || {
    allPhases: [],
		selectedPhaseId: null,
		currentPhase: 0
  },
  reducers: {
		createNewPhase(state, action){
			const newPhase = {
				id: uuid(),
				name: action.payload,
				isCompleted: false,
				tasks: []
			};
			state.allPhases.push(newPhase);
			state.selectedPhaseId = newPhase.id;
			setLocalStorage('phaseSlice', state);
		},
		createNewTask(state, action){
			const newTask = {
				id: uuid(),
				isCompleted: false,
				text: action.payload
			}
			const phase = state.allPhases.find(phase => phase.id === state.selectedPhaseId);
			phase.tasks.push(newTask);
			setLocalStorage('phaseSlice', state);
		},
		selectPhaseId(state, action){
			state.selectedPhaseId = action.payload;
			setLocalStorage('phaseSlice', state);
		},
		toggleTaskCompleted(state, action){
			const phaseIdx = state.allPhases.findIndex(phase => phase.id === action.payload.phaseId);
			const phase = state.allPhases[phaseIdx];
			const task = phase.tasks.find(task => task.id === action.payload.taskId);
			task.isCompleted = action.payload.isCompleted;			
			if(!task.isCompleted){
				state.currentPhase = phaseIdx; 
			}
			phase.isCompleted = phase.tasks.every(task => task.isCompleted);
			if(phase.isCompleted){
				state.currentPhase++;
			}
			setLocalStorage('phaseSlice', state);
		},
		deletePhases(state){
			if(window.confirm('Are you sure you want to delete all progress and start over?')){
				state.allPhases = [];
				setLocalStorage('phaseSlice', state);
			}
		}	
  },
})

export const { 
	createNewPhase, 
	selectPhaseId, 
	createNewTask,
	toggleTaskCompleted,
	deletePhases
} = phaseSlice.actions

export default phaseSlice.reducer