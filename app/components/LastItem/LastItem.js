import React from 'react'
import { LastDetails, LastEdit } from 'components'
import * as styles from './styles.css'

export default function LastItem (props) {
	return (
		<div className={styles.item}>
			<LastDetails 
				last={props.last} 
				handleTextChange={props.handleTextChange} 
				handleDateChange={props.handleDateChange}
				handleMaxChange={props.handleMaxChange}/>
			<LastEdit 
				last={props.last} 
				deleteLast={props.deleteLast} 
				resetLast={props.resetLast} 
				toggleEditing={props.toggleEditing}
				saveEdits={props.saveEdits}/>
		</div>
	)
}