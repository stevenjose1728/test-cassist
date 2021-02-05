import React from 'react';

interface Props {
	text:string,
}

const CardTitle = (props:Props) => (
	<h5 className="card-title">{ props.text }</h5>
)

export default CardTitle;