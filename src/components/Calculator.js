import React from 'react';
import Display from './Display';
import Buttons from './Buttons';

//Calculator component that will hold all buttons
class Calculator extends React.Component{
	constructor (props){
		super(props)
		// initial states
		this.state = {
			display: '0', // user input display
			equation: '', // equation display
			isDecimal:false, // if user input display already has decimal
			isSolution: false, // if solution has been given for current equation
		}
		// function is passed to all buttons, allowing them to change main display state
		this.changeDisplay = this.changeDisplay.bind(this);
	}
	// function handles 'AC' button to clear current display and equation input
	// as well as reset booleans for isDecimal and isSolution
	resetDisplay(){
		this.setState({
			display: '0',
			equation: '',
			isDecimal:false,
			isSolution: false			
		});
	}
	// function handles actions from all numeric buttons except 0
	handleNums(key){
		// if display is a single zero, replace the zero with key's number
		if(this.state.display === '0'){
			this.setState({
			  display: key,
			  equation: key
			});
		}
		// if display is currently an operator, make it the current key's number
		else if(this.isOperator(this.state.display)){
			this.setState({
			  display: key,
			  equation: this.state.equation+key
			});
		}
		// if number is pressed after solution
		else if(this.state.isSolution){ // start a new equation
			this.setState({
				display: key,
			  	equation: key,
				isDecimal:false,
				isSolution: false			
			});
		}
		else { // else, add number to display and current equation
			this.setState({
			  display: this.state.display+key,
			  equation: this.state.equation+key
			});
		}
	}
	// function will handle edge cases involving zero
	handleZero(key){
		// if display is a single zero, and zero is pressed, make current
		// equation a single zero
		if(this.state.display === '0'){
			this.setState({
			  equation: key
			});
		} else{ // else, input from key behaves the same as other numbers
			this.handleNums(key)
		}
	}
	// function handles decimal key behavior
	handleDecimal(key){
		// if a decimal has not already been used in current number
		if(this.state.isSolution){
			console.log('working')
			this.setState({
				display: 0+key,
			  	equation: 0+key,
				isDecimal:true,
				isSolution: false			
			});
		}
		else if(!this.state.isDecimal){
			// check if display is a single zero or an operator, then
			// set display to decimal with a leading zero
			if(this.state.display === '0' || this.isOperator(this.state.display)){
				this.setState({
					display: 0+key,
				  	equation: this.state.equation+0+key,
					isDecimal:true
				});
			} 
			else { // else  follow number with decimal and set isDecimal to true
				this.setState({
					display: this.state.display+key,
				  	equation: this.state.equation+key,
					isDecimal:true
				});
			}
		}
	}
	// function will handle operator key behavior
	handleOperatorKeys(key){
		// if operator is minus, handle behavior with seperate function
		if(key === '-'){
			this.handleMinus(key)
		}
		// if an operator key is pressed after a soultion
		else if(this.state.isSolution){
			// reset isSolution and set isDecimal based on current number from previous equation
			// then set display to next operator key
			this.setState({
				display: key,
				equation: this.state.display+key,
				isDecimal: (/[/.]/).test(this.state.display),
				isSolution: false			
			});
		}
		// if display is a single zero
		else if(this.state.display === '0'){ // set equation to zero and operator
			this.setState({
			  display: key,
			  equation: 0+this.state.equation+key,
			  isDecimal:false
			});
		}
		// if display ends with a decimal, but no numbers following, remove
		// unnecessary decimal, and continue writing equation and reset isDecimal
		else if(String(this.state.display).slice(-1) === '.'){
			this.setState({
			  display: key,
			  equation: this.state.equation.slice(0,-1)+key,
			  isDecimal:false
			});
		} 
		// if last 2 keys are operators, they're probably a operator and negative sign
		// so replace both with a new operator
		else if(this.isOperator(this.state.equation.slice(-2, -1)) && this.isOperator(this.state.equation.slice(-1))){
			this.setState({
			  display: key,
			  equation: this.state.equation.slice(0,-2)+key,
			  isDecimal:false
			});
		} 
		// if last key was an operator, but not the current one, change the operator in
		// the equation
		else if (this.state.equation.slice(-1) !== key && this.isOperator(this.state.equation.slice(-1))) {
			this.setState({
			  display: key,
			  equation: this.state.equation.slice(0,-1)+key,
			  isDecimal:false
			});
		}
		// if current operator key hasn't already been pressed, add operator to equation
		else if (this.state.equation.slice(-1) !== key) {
			this.setState({
			  display: key,
			  equation: this.state.equation+key,
			  isDecimal:false
			});
		}
	}
	// handle minus operator to determine if your doing minus, or a negative number
	handleMinus(key){
		console.log('minus');
		// if display is a single zero
		if(this.state.display === '0'){ // set equation to negative sign
			this.setState({
			  display: key,
			  equation: this.state.equation+key,
			  isDecimal:false
			});
		}
		// if an minus key is pressed after a soultion
		else if(this.state.isSolution){
			// reset isSolution and set isDecimal based on current number from previous equation
			// then set display to next operator key
			this.setState({
				display: key,
				equation: this.state.display+key,
				isDecimal: (/[/.]/).test(this.state.display),
				isSolution: false			
			});
		}
		// if display ends with a decimal, but no numbers following, remove
		// unnecessary decimal, and continue writing equation and reset isDecimal
		else if(String(this.state.display).slice(-1) === '.'){
			this.setState({
			  display: key,
			  equation: this.state.equation.slice(0,-1)+key,
			  isDecimal:false
			});
		} 
		// if last key was an operator, but not minus, add a minus
		else if (this.state.equation.slice(-1) !== key && this.isOperator(this.state.equation.slice(-1))) {
			this.setState({
			  display: key,
			  equation: this.state.equation+key,
			  isDecimal:false
			});
		}
		// if last key was a minus, and there isn't a negative, add a negative
		else if (this.state.equation.slice(-2) !== key+key && this.state.equation.slice(-1) === key) {
			this.setState({
			  display: key,
			  equation: this.state.equation+key,
			  isDecimal:false
			});
		}
		// if current operator key hasn't already been pressed, add operator to equation
		else if (this.state.equation.slice(-1) !== key) {
			this.setState({
			  display: key,
			  equation: this.state.equation+key,
			  isDecimal:false
			});
		}
	}
	// function to handle equal key
	handleEquation(key){
		// if a solution hasn't been found for current equation
		if(!this.state.isSolution){
			// format equation by first getting rid of any unfinished operations or decimals with no following numbers
			let formattedEq = (/[x+\-./]/g).test(this.state.equation.slice(-1)) ? this.state.equation.slice(0, -1) : this.state.equation
			// take resulting equation and replace any x's with asterisks and any double minuses with a plus sign
			// so that it can be used to create a function from func constructor
			formattedEq = formattedEq.replace('x','*').replace('--','+')
			let solution = new Function('return '+formattedEq)
			// show solution on screen and set isSolution and isDecimal so that calculator knows
			// new equation can be created
			this.setState({
			  display: solution(),
			  equation: formattedEq+key+solution(),
			  isDecimal: (/[\.]/).test(String(solution())),
			  isSolution: true
			});
		}
	}
	// function checks if input is an operator
	isOperator(key){
		if(key === 'x' || key === '+' || key === '-' || key === '/'){
			return true;
		}
		return false;
	}
	// Switch function to handle key press behavior, based on key type
	changeDisplay(key){
		switch(true){
			case key === 'AC':
				this.resetDisplay();
				break;
			case key === '0':
				this.handleZero(key);
				break;
			case key === '.':
				this.handleDecimal(key)
				break;
			case this.isOperator(key):
				this.handleOperatorKeys(key);
				break;
			case key === '=':
				this.handleEquation(key);
				break;
			default:
				this.handleNums(key)
				break;
		}
		
	}
	render(){
		return(
			<div id="calculator">
				{/*Display component to keep track of all calculations*/}
				<Display display={this.state.display} equation={this.state.equation} />
				{/*Container component with all of the buttons*/}
				<Buttons display={this.state.display} changeDisplay={this.changeDisplay} />
			</div>
		)
	}
}

export default Calculator