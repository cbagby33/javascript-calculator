import React from 'react';
import Display from './Display';
import Buttons from './Buttons';

//Calculator component that will hold all buttons
class Calculator extends React.Component{
	constructor (props){
		super(props)
		this.state = {
			display: 0,
			equation: ''
		}
		this.changeDisplay = this.changeDisplay.bind(this);
	}
	changeDisplay(key){
		switch(true){
			case key === 'AC':
				this.setState({
				  display: 0,
				  equation: ''
				});
				break;
			case this.state.display === 0:
				this.setState({
				  display: key,
				  equation: key
				});
				break;
			case key === 'x' || key === '+' || key === '-' || key === '/':
				this.setState({
				  display: key,
				  equation: this.state.equation+key
				});
				break;
			case this.state.display === 'x' || this.state.display === '+' || this.state.display === '-' || this.state.display === '/':
				this.setState({
				  display: key,
				  equation: this.state.equation+key
				});
				break;
			case key === '=' :
				let formattedEquation = this.state.equation.replace('x','*')
				let solution = new Function('return '+formattedEquation)
				console.log(solution())
				this.setState({
				  display: solution(),
				  equation: this.state.equation+key+solution()
				});
				break;
			default:
				this.setState({
				  display: this.state.display+key,
				  equation: this.state.equation+key
				});
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