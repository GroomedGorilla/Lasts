import React from 'react'
import * as styles from './styles.css'
import { inputLine } from 'sharedStyles/styles.css'

export default function LastItem (props) {
	const timeSince = Math.round((new Date().setHours(0,0,0,0) - new Date(props.last.date).setHours(0,0,0,0))/86400000)
	
	return (
		<div className={styles.lastDetails} style={timeSince >= props.last.max ? {backgroundColor:'#ee6e73'} : null}>
			<div className={styles.lastLeft} >
					{'Last time... '} <br/>
					<div className={styles.lastText}>
						{props.last.isEditing ? 
							<input className={inputLine} type='text' size="30" value={props.last.editText} onChange={e => props.handleTextChange(props.last, e.target.value)}/> : props.last.text}
					</div>
					{props.last.isEditing ? 
						(<div style={{display:'block'}}>
							<br/> {'was '}
							<input type='date' 
								defaultValue={props.last.date} 
								onChange={e => props.handleDateChange(props.last, e.target.value)}/>
							<br/> {'Max Gap:      '}	
							<input type='text' 
								defaultValue={props.last.max} 
								onChange={evt => props.handleMaxChange(props.last, evt.target.value)} />
						</div>) 
						: null}
					<br/>
			</div>
			<div>
				<ul>
					<li>{'was '}</li>
					<li className={styles.dayCount}>{timeSince}</li>
					<li style={{fontSize:15}}>{' days ago.'}</li>
				</ul>
			</div>
		</div>
	)
}