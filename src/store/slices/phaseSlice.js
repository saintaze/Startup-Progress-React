import { createSlice } from '@reduxjs/toolkit'
import uuid from 'react-uuid'
import { getLocalStorage, setLocalStorage } from '../../utils/helpers'


const phaseInitialState = {
	allPhases: [],
	selectedPhaseId: null,
	currentPhase: 0
}

export const phaseSlice = createSlice({
  name: 'phase',
  initialState: getLocalStorage('phaseSlice') || phaseInitialState,
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
			for(let i = 0; i < state.allPhases.length; i++){
				const phase = state.allPhases[i];
				if(!phase.isCompleted){
					state.currentPhase = i;
					break;
				}
			}
			setLocalStorage('phaseSlice', state);
		},
		createNewTask(state, action){
			const newTask = {
				id: uuid(),
				isCompleted: false,
				text: action.payload
			}
			const phaseIdx = state.allPhases.findIndex(phase => phase.id === state.selectedPhaseId);
			const phase = state.allPhases[phaseIdx];
			phase.tasks.push(newTask);
			phase.isCompleted = false;
			for(let i = 0; i < state.allPhases.length; i++){
				const phase = state.allPhases[i];
				if(!phase.isCompleted){
					state.currentPhase = i;
					break;
				}
			}
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
				phase.isCompleted = false;
			}else{
				phase.isCompleted = phase.tasks.every(task => task.isCompleted);
				if(phase.isCompleted){
					for(let i = phaseIdx + 1; i < state.allPhases.length; i++){
						const phase = state.allPhases[i];
						if(phase.isCompleted){
							state.currentPhase++;
						}else{
							state.currentPhase = i;
							break;
						}
					}					
				}
			}
			setLocalStorage('phaseSlice', state);
		},
		resetPhaseState(state){
			if(window.confirm('Are you sure you want to delete all progress and start over?')){
				Object.assign(state, phaseInitialState);
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
	resetPhaseState
} = phaseSlice.actions

export default phaseSlice.reducer