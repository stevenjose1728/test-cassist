import React from 'react';

interface IconProps {
	name?:string,
	className?:string
}

const StyleIcon = {
	fontSize: '14px'
}

const Icon = (props:IconProps) => (
	<i className={ `fa fa-${ props.name } ${props.className}` } style={StyleIcon}></i>
)

export default Icon;