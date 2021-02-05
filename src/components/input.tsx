import React from 'react';
import { Form } from 'react-bootstrap';
import { SketchPicker } from 'react-color'

interface InputProps {
    name: string,
    type?: string,
    color?: string,
    label?:string,
    labelClass?:string,
    isRequired?:boolean,
    placeholder?:string,
    className?:string,
    hasError?:boolean,
    msgError?:string,
    isDirty?:boolean,
    onChange: (val: string | number) => void,
    required?:boolean,
    value?: string | number
}

const InputColor = (props: InputProps) => {
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
            <SketchPicker 
                color={props.color}
                onChangeComplete={ (color, event) => props.onChange(color.hex) }
            />
            {/*<input
                name={props.name}
                type={props.type}
                className={ `form-control ${props.className || ''} ${props.hasError ? 'is-invalid' : ''} ${props?.isDirty && !props.hasError ? 'is-valid' : ''}` }
                placeholder={props.placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange?.(e.target.value)}
                value={props.value}
                required={props.required || false}
            />*/}
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
export default InputColor;
