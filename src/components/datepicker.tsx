import React from 'react';
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import Icon from './Icon';

registerLocale('es', es)
setDefaultLocale('es')
type DatePickerProps = {
	maxDate?: Date | null,
	minDate?: Date | null,
	value?: Date | null,
	label?: string,
	onChange: (date: Date | [Date, Date] /* for selectsRange */ | null, event: React.SyntheticEvent<any> | undefined) => void,
	color?: string,
	onClick: () => void,
}
const CustomInput = ({ color, onClick, value }: DatePickerProps) => (
	<div className={ `container-datepicker ${ color ? color : '' }` } 
		onClick={ onClick }>
		<p>{ value }</p>
		<Icon name="calendar" />
	</div>
)

const _DatePicker = (props: DatePickerProps) => (
	<div className="form-group">
		{ props.label && <label className="label-datepicker">{ props.label }</label> }
		<DatePicker
			maxDate={ props.maxDate }
			minDate={ props.minDate }
		    selected={ props.value }
		    onChange={ props.onChange }
		    dateFormat="dd/MM/yyyy"
		    customInput={ <CustomInput { ...props } /> }
		/>
	</div>
)

export default _DatePicker;