import Button from './Button'
import buttonMap from '../buttonMap.json'

function Buttons({
	changeDisplay
}) {
	// iterate over button map to create calculator buttons
	const buttons = buttonMap.buttons.map((button, idx) =>	
		<Button id={button.id} label={button.label} type={button.type} changeDisplay={changeDisplay} key={'button '+idx}/>
	);
	// create rows for grid styling of buttons
	const rows = buttonMap.rows.map((row, idx) => {
		if(idx < 3){
			return (
				<div className={'row '+row.name} key={'row '+idx}>{buttons.slice(row.start, row.end)}</div>
			);	
		} else{
			// creates the last row with 2 columns
			let buttonGroup;
			const columns = row.columns.map((column, idx) => {
				if(column.hasOwnProperty('end')){
					buttonGroup = buttons.slice(column.start, column.end)	
				} else{
					buttonGroup = buttons.slice(column.start)	
				}
				return (
					<div className={'inner-column '+column.name} key={'column '+idx}>{buttonGroup}</div>
				);
			});
			return (
				<div className={'row '+row.name} key={'row '+idx}>{columns}</div>
			);
		}
	});
	return(
		// push rows to buttons element
		<div id="buttons">
			{rows}
		</div>
	)
}

export default Buttons