import Button from './Button'
import buttonMap from '../buttonMap.json'

function Buttons() {
	// iterate over button map to create calculator buttons
	const buttons = buttonMap.buttons.map(button =>	
		<Button id={button.id} label={button.label} type={button.type} />
	);
	// create rows for grid styling of buttons
	const rows = buttonMap.rows.map((row, idx) => {
		if(idx < 3){
			return (
				<div className={'row '+row.name}>{buttons.slice(row.start, row.end)}</div>
			);	
		} else{
			// creates the last row with 2 columns
			let buttonGroup;
			const columns = row.columns.map(column => {
				if(column.hasOwnProperty('end')){
					buttonGroup = buttons.slice(column.start, column.end)	
				} else{
					buttonGroup = buttons.slice(column.start)	
				}
				return (
					<div className={'inner-column '+column.name}>{buttonGroup}</div>
				);
			});
			return (
				<div className={'row '+row.name}>{columns}</div>
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