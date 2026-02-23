import React from 'react';
import Display from './Display';
import Buttons from './Buttons';

//Calculator component that will hold all buttons
class Calculator extends React.Component{
	constructor (props){
		super(props)
	}
	render(){
		return(
			<div id="calculator">
				{/*Display component to keep track of all calculations*/}
				<Display />
				{/*Container component with all of the buttons*/}
				<Buttons />
			</div>
		)
	}
}

export default Calculator