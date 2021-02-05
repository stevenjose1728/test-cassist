import React from 'react';

const Textarea = (props: {
	name: string,
	label: string,
	rows?: number,
}) => (
	<div className="form-group">
		{ props.label && <label htmlFor={ props.name }>{ props.label }</label> }
		<textarea 
			{ ...props }
			rows={ props.rows ? props.rows : 4 }
			className="form-control"
			name={ props.name }>
		</textarea>
	</div>
)

export default Textarea;