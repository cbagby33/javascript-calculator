import React from 'react';
import Display from './Display';
import Buttons from './Buttons';

//Calculator component that will hold all buttons
class Calculator extends React.Component{
	constructor (props){
		super(props)
		this.state = {
			display: 0,
			equation: '',
			isDecimal:false,
			isSolution: false,
		}
		this.changeDisplay = this.changeDisplay.bind(this);
	}
	clearDisplay(){
		this.setState({
			display: 0,
			equation: '',
			isDecimal:false,
			isSolution: false			
		});
	}
	isOperation(key){
		if(key === 'x' || key === '+' || key === '-' || key === '/'){
			return true;
		}
		return false;
	}
	changeDisplay(key){
		switch(true){
			case this.state.isSolution:
				if(this.isOperation(key)){
					this.setState({
						display: key,
						equation: this.state.display+key,
						isDecimal: (/[/.]/).test(this.state.display),
						isSolution: false			
					});
				} else if(key === 'AC'){
					this.clearDisplay();
				} else if(key === '.'){
					this.setState({
						display: 0+key,
					  	equation: 0+key,
						isDecimal:true,
						isSolution: false			
					});
				} else{
					this.setState({
						display: key,
					  	equation: key,
						isDecimal:false,
						isSolution: false			
					});
				}

				break;
			case key === '.':
				if(!this.state.isDecimal){
					if(this.state.display === 0 || this.isOperation(this.state.display)){
						this.setState({
							display: 0+key,
						  	equation: this.state.equation+0+key,
							isDecimal:true
						});
					} else {
						this.setState({
							display: this.state.display+key,
						  	equation: this.state.equation+key,
							isDecimal:true
						});
					}
				}
				break;
			case this.isOperation(key) && String(this.state.display).slice(-1) === '.':
				this.setState({
				  display: key,					
				  equation: this.state.equation.slice(0,-1)+key,
				  isDecimal:false
				})
				break;
			case key === 'AC':
				this.clearDisplay();
				break;
			case this.state.display === 0:
				this.setState({
				  display: key,
				  equation: key
				});
				break;
			case key === '=':
				if(!this.state.isSolution){
					let formattedEq = (/[x+\-./]/g).test(this.state.equation.slice(-1)) ? this.state.equation.slice(0, -1) : this.state.equation
					let solution = new Function('return '+formattedEq.replace('x','*'))
					this.setState({
					  display: solution(),
					  equation: formattedEq+key+solution(),
					  isDecimal: (/[\.]/).test(String(solution())),
					  isSolution: true
					});
				}
				break;
			case this.isOperation(this.state.display) || this.isOperation(key):
				this.setState({
				  display: key,
				  equation: this.state.equation+key,
				  isDecimal:false
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