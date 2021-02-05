import { RulesValidations } from 'models';

const requiredError = (fieldValue:string):boolean => {
    if (!fieldValue?.trim()) {
      return true
    }
    return false;
};


const emailValidation = (fieldValue:string):boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(fieldValue)) {
        return false;
    }
    return true;
}

const minLengthValidation = (fieldvalue: string, amountMin:number):boolean => {
    if (fieldvalue.trim().length < amountMin) {
        return true
    }
    return false;
}

const maxLengthValidation = (fieldvalue: string, amountMax:number):boolean => {
    if (fieldvalue.trim().length > amountMax) {
        return true
    }
    return false;
}

const validateInput = (fieldName:string, fieldValue:string, rules:RulesValidations):{hasError:boolean, msgError:string} => {
    const keys:String[] = Object.keys(rules);

    let validate = {
        hasError: false,
        msgError: 'Error'
    }

    const isRequired:String | undefined = keys.find((element) => element === 'required');
    const isEmail:String | undefined = keys.find((element) => element === 'email');
    const isMinLength:String | undefined = keys.find((element) => element === 'minLength');
    const isMaxLength:String | undefined = keys.find((element) => element === 'maxLength');

    if(isRequired){
        if(requiredError(String(fieldValue))){
            validate = {
                hasError: true,
                msgError: `El campo ${fieldName} es requerido`
            }
            return validate;
        }
    }

    if(isEmail){
        if(emailValidation(fieldValue)){
            validate = {
                hasError: true,
                msgError: `El campo ${fieldName} es inválido`
            }
            return validate;
        }
    }

    if(isMinLength && rules.minLength){
        if(minLengthValidation(fieldValue, rules.minLength)){
            validate = {
                hasError: true,
                msgError: `El campo ${fieldName} debe tener un mínimo de ${rules.minLength} carácteres`
            }
            return validate;
        }
    }

    if(isMaxLength && rules.maxLength){
        if(maxLengthValidation(fieldValue, rules.maxLength)){
            validate = {
                hasError: true,
                msgError: `El campo ${fieldName} debe tener un máximo de ${rules.maxLength} carácteres`
            }
            return validate;
        }
    }
    return validate;    
}

export {
    requiredError,
    validateInput,
};