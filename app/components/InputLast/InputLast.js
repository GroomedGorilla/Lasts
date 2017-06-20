import React from 'react'
import { inputLine, inputSection } from 'sharedStyles/styles.css'

export default function InputLast (props) {
	return (
		<div className={inputSection}>
			<form>
				{'Last time '}
				<input className={inputLine} type='text'  size="30" 
					value={props.inputText} 
					onChange={evt => props.handleTextChange(evt.target.value)}/>
				{' was '}
				<input type='date' 
					value={props.inputDate} 
					onChange={evt => props.handleDateChange(evt.target.value)}/>
				<br/>
					{'Max Gap: '}
				<input className={inputLine} type='text' size="4"
					value={props.inputMax} 
					onChange={evt => props.handleMaxChange(evt.target.value)} />
					{'days'}
				<input type='submit' 
					value='Add' 
					onClick={() => {props.inputText === '' ? 
					alert('Text cannot be blank'):
					props.onSubmit(1, props.inputText, props.inputDate, props.inputMax)}}/>
			</form>
			<div>
			</div>
		</div>	
	)	
}
