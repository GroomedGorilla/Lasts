import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { LastItem, InputLast } from 'components'
import { addLast, loadLasts, deleteLast, resetLast, toggleEditing, lastEditTextChange, lastEditDateChange, lastEditMaxChange, saveEdits, updateLast } from 'redux/modules/lasts'
import { changeText, changeDate, changeMax } from 'redux/modules/lastInput'
import { bindActionCreators } from 'redux'
import * as styles from './styles.css'
import FontAwesome from 'react-fontawesome'

const MainContainer = React.createClass({
	componentWillMount() {
		this.props.loadLasts();	
	},
	propTypes: {
		addLast: PropTypes.func.isRequired,
		changeDate: PropTypes.func.isRequired,
		changeText: PropTypes.func.isRequired,
		changeMax: PropTypes.func.isRequired,
		deleteLast: PropTypes.func.isRequired,
		resetLast: PropTypes.func.isRequired,
	},
	render () {
		return (
			<div className={styles.main}>
				<h1 className={styles.largeHeader}>{'L'}<FontAwesome name='hourglass-half' style={{transform:'rotate(30deg)'}}/>{'sts'}
				</h1>
				<h2>{'Keep track of the last time you did anything. Overdue? Remedy it!'}</h2>
				<InputLast 
					inputText={this.props.inputText} 
					inputDate={this.props.inputDate} 
					inputMax={this.props.inputMax} 
					onSubmit={this.props.addLast} 
					handleTextChange={this.props.changeText} 
					handleDateChange={this.props.changeDate} 
					handleMaxChange={this.props.changeMax}/>
				{this.props.lasts.map((l, index) => l ? 
					<LastItem 
						key={index} 
						last={l} 
						deleteLast={this.props.deleteLast} 
						resetLast={this.props.resetLast} 
						toggleEditing={this.props.toggleEditing} 
						handleTextChange={this.props.lastEditTextChange} 
						handleDateChange={this.props.lastEditDateChange}
						handleMaxChange={this.props.lastEditMaxChange}
						saveEdits={this.props.saveEdits}
						onLoad={this.props.updateLast}/> 
					: null)}
			</div>    
			)
	},
})

function mapStateToProps (state)
{
	return {
		lasts: state.lasts.lasts,
		inputText: state.lastInput.inputText,
		inputDate: state.lastInput.inputDate,
		inputMax: state.lastInput.inputMax,
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({ 
			addLast,
			loadLasts,
			changeDate,
			changeText,
			changeMax,
			deleteLast,
			resetLast,
			toggleEditing,
			lastEditTextChange,
			lastEditDateChange,
			lastEditMaxChange,
			saveEdits,
			updateLast,
		}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
