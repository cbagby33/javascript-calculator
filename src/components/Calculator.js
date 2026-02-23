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
				<div id="buttons">
					<div className="row one">
						<Button id="AC" label="AC" type="wide" />
						<Button id="divide" label="/" type="regular" />
						<Button id="multiply" label="x" type="regular" />
					</div>
					<div className="row two">
						<Button id="seven" label="7" type="regular" />
						<Button id="eight" label="8" type="regular" />
						<Button id="nine" label="9" type="regular" />
						<Button id="subtract" label="-" type="regular" />
					</div>
					<div className="row three">
						<Button id="four" label="4" type="regular" />
						<Button id="five" label="5" type="regular" />
						<Button id="six" label="6" type="regular" />
						<Button id="add" label="+" type="regular" />
					</div>
					<div className="row four">
						<div className="inner-column first">
							<Button id="one" label="1" type="regular" />
							<Button id="two" label="2" type="regular" />
							<Button id="three" label="3" type="regular" />
							<Button id="zero" label="0" type="wide" />
							<Button id="decimal" label="." type="regular" />
						</div>
						<div className="inner-column second">
							<Button id="equals" label="=" type="tall" />
						</div>
							
					</div>
				</div>
			</div>
		)
	}
}

export default Calculator