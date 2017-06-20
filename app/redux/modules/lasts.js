import Last from 'models/Last'

const ENTRY_ADDED = 'ENTRY_ADDED'
const ENTRY_DELETED = 'ENTRY_DELETED'
const ENTRY_MODIFIED = 'ENTRY_MODIFIED'
const ENTRY_RESET = 'ENTRY_RESET'
const CLEAR_INPUT = 'CLEAR_INPUT'
const STORE_LASTS = 'STORE_LASTS' 
const LOAD_LASTS = 'LOAD_LASTS'
const UPDATED_LASTS = 'UPDATED_LASTS'

export function createLast(last) {
	return {
		type: ENTRY_ADDED,
		last: last,
	}
}

export function lastDeleted(last) {
	return {
		type: ENTRY_DELETED,
		last: last,
	}
}

export function lastUpdated(last) {
	return {
		type: UPDATED_LASTS,
		last: last,
	}
}

function lastEdited(last) {
	return {
		type: ENTRY_MODIFIED,
		last: last,
	}
}

export function lastReset(last) {
	return {
		type: ENTRY_RESET,
		last: last,
	}
}

function saveLasts(){
	return {
		type: STORE_LASTS,
	}
}

export function loadLasts(lasts){
	return{
		type: LOAD_LASTS,
		lasts: lasts,
	}
}

const initialState = {
	lasts: [],
}

export function addLast(id, text, date, max){
	return function(dispatch){
		var sampleLast = new Last(1, text, date, max)
		
		dispatch({type: CLEAR_INPUT,});
		dispatch(createLast(sampleLast));
		dispatch(saveLasts());
	}
}

export function deleteLast(last){
	return function(dispatch){	
		dispatch(lastDeleted(last))
		dispatch(saveLasts())
	}
}

export function resetLast(last){
	return function(dispatch){
		last.date = (new Date()).toISOString().slice(0,10)
		dispatch(lastReset(last))
		dispatch(saveLasts())
	}
}

export function toggleEditing(last){
	return function(dispatch){
		last.isEditing = !last.isEditing
		last.editText = last.text
		last.editDate = last.date
		last.editMax = last.max
		dispatch(lastEdited(last))
		dispatch(saveLasts())
	}
}

export function lastEditTextChange(last, text){
	return function(dispatch){
		last.editText = text
		dispatch(lastEdited(last))
	}
}

export function lastEditDateChange(last, date){
	return function(dispatch){
		last.editDate = date
		dispatch(lastEdited(last))
	}
}

export function lastEditMaxChange(last, max){
	return function(dispatch){
		last.editMax = max
		dispatch(lastEdited(last))
	}
}

export function saveEdits(last){
	return function(dispatch){
		last.date = last.editDate
		last.text = last.editText
		last.max = last.editMax
		last.isEditing = !last.isEditing
		dispatch(lastEdited(last))
		dispatch(saveLasts())
	}
}

export function updateLast(last){
	return function(dispatch){
		const timeSince = Math.round((new Date().setHours(0,0,0,0) - new Date(last.date).setHours(0,0,0,0))/86400000)
		last.timeSince = timeSince
		last.isEditing = false
		console.log(last)
		dispatch(lastEdited(last))
		dispatch(saveLasts())
	}
}

export default function lasts(state = initialState, action)
{
	switch (action.type) {
		case ENTRY_ADDED :
			return {
				...state,
				lasts: [...state.lasts, action.last]
			}
		break;
		case ENTRY_MODIFIED :
			var updatedLasts = state.lasts.slice()
			updatedLasts.splice(updatedLasts.findIndex((i) => i.text == action.last.text),1, action.last)
			return {
				...state,
				lasts: updatedLasts
			}
		break;
		case ENTRY_DELETED :
			var updatedLasts = state.lasts.slice()
			updatedLasts.splice(updatedLasts.findIndex((i) => i.text == action.last.text),1)
			return {
				...state,
				lasts: updatedLasts
			}
		break;
		case UPDATED_LASTS :
			return state
			// return {
			// 	...state,
			// 	lasts : action.lasts
			// }
		break;
		case ENTRY_RESET :
			var updatedLasts = state.lasts.slice()
			updatedLasts.splice(updatedLasts.findIndex((i) => i.text == action.last.text),1, action.last)
			return {
				...state,
				lasts: updatedLasts
			}
		break;
		case STORE_LASTS :
			localStorage.setItem("lastsStore", JSON.stringify(state.lasts))
			return state
		break;
		case LOAD_LASTS :
			const lasts = JSON.parse(localStorage.getItem("lastsStore"));
			var timeSince = 0
			if (lasts) {
				lasts.map((l) => 
				{
					timeSince = Math.round((new Date().setHours(0,0,0,0) - new Date(l.date).setHours(0,0,0,0))/86400000),
					l.timeSince = timeSince,
					l.isEditing = false,
					console.log(l)
				})
				return {
				...state,
				lasts: lasts,
				}
			}
			else
				return state
		break;
		default:
			return state
	}
}