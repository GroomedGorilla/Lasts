import React from 'react'
import ReactDOM from 'react-dom'
import routes from 'config/routes'
import { createStore, applyMiddleware, combineReducers} from 'redux'
import { Provider } from 'react-redux'
import lasts from 'redux/modules/lasts'
import lastInput from 'redux/modules/lastInput'
import thunk from 'redux-thunk'

const store = createStore(combineReducers({lasts, lastInput}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))
console.log(store.getState())

ReactDOM.render(
	<Provider store={store}>
		{routes} 	
	</Provider>,
		
	document.getElementById('app')
)
