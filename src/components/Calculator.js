import React from 'react';
import Display from './Display';
import Buttons from './Buttons';

//Calculator component that will hold all buttons
class Calculator extends React.Component{
	constructor (props){
		super(props)
		this.state = {
			display: 0
		}
		this.changeDisplay = this.changeDisplay.bind(this);
	}
	changeDisplay(newDisplay){
		this.setState({
		  display: newDisplay
		});
	}
	render(){
		return(
			<div id="calculator">
				{/*Display component to keep track of all calculations*/}
				<Display display={this.state.display} />
				{/*Container component with all of the buttons*/}
				<Buttons display={this.state.display} changeDisplay={this.changeDisplay} />
			</div>
		)
	}
}

export default Calculator