import React from 'react';
import { Form } from 'react-bootstrap';

interface InputProps {
    name: string,
    type: string,
    value: string|number,
    label?:string,
    labelClass?:string,
    isRequired?:boolean,
    placeholder?:string,
    className?:string,
    hasError?:boolean,
    msgError?:string,
    isDirty?:boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required?:boolean,
    disabled?: boolean
}

const Input = (props: InputProps) => {
    return (
        <Form.Group className="form-group">
            {
                props?.label && (
                    <Form.Label
                        className={props.labelClass}
                    >
                        {props.label} 
                        {
                            props.isRequired && (
                                <strong className="txt-danger ml-2">(*)</strong>
                            )
                        }
                    </Form.Label>
                )
            }
            <input
                disabled={props.disabled}
                name={props.name}
                type={props.type}
                className={ `form-control ${props.className || ''} ${props.hasError ? 'is-invalid' : ''} ${props?.isDirty && !props.hasError ? 'is-valid' : ''}` }
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
                required={props.required || false}
            />
            {
                props.msgError && (
                    <div className="invalid-feedback">
                        {props.msgError}
                    </div>
                )
            }
        </Form.Group>
    )
}
export default Input;
