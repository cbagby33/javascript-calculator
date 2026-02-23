import React from 'react';

class Button extends React.Component{
	constructor (props){
		super(props)
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		if (this.props.label === 'AC') {
			this.props.changeDisplay(0)
		} else{
			if(this.props.display === 0){
				this.props.changeDisplay(this.props.label)
			} else{
				this.props.changeDisplay(this.props.display+this.props.label)
			}
		}
	}
	render(){
		return(
			<button id={this.props.id} className={'button '+this.props.type} onClick={this.handleClick}>{this.props.label}</button>
		)
	}
}

export default Button