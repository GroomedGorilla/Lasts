import Last from 'models/Last'

const TEXT_CHANGED = 'TEXT_CHANGED'
const DATE_CHANGED = 'DATE_CHANGED'
const MAX_CHANGED = 'MAX_CHANGED'
const CLEAR_INPUT = 'CLEAR_INPUT'

export function changeText(text) {
	return { 
		type: TEXT_CHANGED,
		inputText: text, 		
	}
}

export function changeDate(date) {
	return { 
		type: DATE_CHANGED,
		inputDate: date, 		
	}
}

export function changeMax(max) {
	return { 
		type: MAX_CHANGED,
		inputMax: max, 		
	}
}

export function clearInput() {
	return { 
		type: CLEAR_INPUT,		
	}
}


const initialState = {
	inputText : '',
	inputDate : (new Date()).toISOString().slice(0,10),
	inputMax : 3,
}

export default function lastInput(state = initialState, action)
{
	switch (action.type) {
		case TEXT_CHANGED :
			return {
				...state,
				inputText : action.inputText,
			}
		break;
		case DATE_CHANGED :
			return {
				...state,
				inputDate : action.inputDate,
			}
		break;
		case MAX_CHANGED :
			return {
				...state,
				inputMax : action.inputMax,
			}
		break;
		case CLEAR_INPUT :
			return {
				...state,
				inputDate : initialState.inputDate,
				inputMax : initialState.inputMax,
				inputText : initialState.inputText,
			}
		break;
		default:
			return state
	}
}

