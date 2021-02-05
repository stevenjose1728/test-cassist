import React, { Fragment, useRef, useState } from 'react';
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import { Icon } from 'components';

interface PropsButton {
	variant:string,
	onClick?:() => void,
	id?:string|number,
	key?:string|number,
	tooltip?:boolean,
	labelTooltip?:string,
	label?:string,
	icon?:string,
	className?:string,
	size?:'sm'|'lg',
	type?:string,
	disabled?: boolean
}


const _Button:React.FC<PropsButton>  = (props: PropsButton) => {
	const target = useRef(null);
	const [show, setShow] = useState(false);

	return (
		<Fragment>
			<Button
				disabled={props.disabled}
				className={`ml-1 mr-1 ${props.className}`}
				size={props.size || 'sm'}
				variant={props.variant}
				onClick={props.onClick}
				onMouseOver={() => props.tooltip ? setShow(!show) : null}
				onMouseOut={() => props.tooltip ? setShow(!show) : null}
				type={props.type || 'button'}
				ref={target}
			>
				{
					props.icon && (
						<Icon name={props.icon} />
					)
				}
				{
					props.label
				}
			</Button>
			<Overlay
				target={target}
				show={show}
				placement="top"
			>
				<Tooltip
					id={`tooltip-button-${props.id || Math.random()} `}
				>
					{ props.labelTooltip }
				</Tooltip>
			</Overlay>
		</Fragment>
	)

}

export default _Button;
