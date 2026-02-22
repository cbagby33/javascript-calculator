import React from 'react';
import Display from './Display';
import Button from './Button';

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
				<Button label="AC" type="wide" />
				<Button label="/" type="regular" />
				<Button label="x" type="regular" />
				<Button label="7" type="regular" />
				<Button label="8" type="regular" />
				<Button label="9" type="regular" />
				<Button label="-" type="regular" />
				<Button label="4" type="regular" />
				<Button label="5" type="regular" />
				<Button label="6" type="regular" />
				<Button label="+" type="regular" />
				<Button label="1" type="regular" />
				<Button label="2" type="regular" />
				<Button label="3" type="regular" />
				<Button label="=" type="tall" />
				<Button label="0" type="wide" />
				<Button label="." type="regular" />
			</div>
		)
	}
}

export default Calculator