import React from 'react';

class Button extends React.Component{
	constructor (props){
		super(props)
	}
	render(){
		return(
			<div id={this.props.id} className={'button '+this.props.type}>{this.props.label}</div>
		)
	}
}

export default Button