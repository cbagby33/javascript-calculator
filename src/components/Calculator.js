import React from 'react';
import Display from './Display';

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
			</div>
		)
	}
}

export default Calculator