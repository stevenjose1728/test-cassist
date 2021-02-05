import React from 'react';
import { Form } from 'react-bootstrap';

type Options = {
    key: number | string,
    label: string,
}

interface SelectProps {
    name: string,
    value: string|number,
    label?:string,
    labelClass?:string,
    isRequired?:boolean,
    placeholder?:string,
    className?:string,
    hasError?:boolean,
    msgError?:string,
    isDirty?:boolean,
    onChange?: any,
    required?:boolean,
    options:Options[],
}

export default class Select extends React.Component<SelectProps, {value:string|number|{}}> {
    
    constructor(props:SelectProps) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {value} = e.target;
        console.log(value)
        this.setState({
            value: value
        });
        this.props.onChange(value);
    }

    render() {
        return (

            <Form.Group className="form-group">
                {
                    this.props?.label
                    ?
                    <Form.Label className={this.props.labelClass}>
                        {this.props.label} 
                        {
                            this.props.isRequired 
                            ?
                            <strong className="txt-danger ml-2">(*)</strong>
                            :
                            ''
                        }
                    </Form.Label>
                    :
                    ''
                }
                <select  
                    name={this.props.name}
                    className={ `form-control ${ this.props.className }` }
                    onChange={this.handleChange}
                >
					<option value="" disabled>Seleccione</option>
					{ this.props.options.map((i,index) => {
						return (
							<option 
								key={ index } 
								value={ i.key }>
								{ i.label }
							</option>
						)				
					}) }
				</select>
                <div className="invalid-feedback">
                    {this.props.msgError}
                </div>
            </Form.Group>
        )
    }
};