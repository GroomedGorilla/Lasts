import React from 'react'
import * as styles from './styles.css'
import FontAwesome from 'react-fontawesome'

export default function LastEdit (props) {
	return (
		<div className={styles.editMenu}>
			<ul>
				{props.last.isEditing ? null : 
					(<li className={styles.menuItem} onClick={e => props.resetLast(props.last)}>
						<FontAwesome name='refresh' size='lg'/>
					</li>)
				}
				<li className={styles.menuItem} onClick={e => props.deleteLast(props.last)}>
					<FontAwesome name='trash' size='lg'/>
				</li>
				{props.last.isEditing ? 
					<li className={styles.menuItem} onClick={e => props.saveEdits(props.last)}>
						<FontAwesome name='floppy-o' size='lg'/>
					</li>
					: <li className={styles.menuItem} onClick={e => props.toggleEditing(props.last)}>
						<FontAwesome name='pencil' size='lg'/>
					</li>
				}
			</ul>
		</div>
	)
}