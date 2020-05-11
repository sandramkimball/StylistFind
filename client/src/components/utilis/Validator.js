import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

function validateInput(data){
    let errors =[];
    if (validator.isNull(data.email)){
        errors.email = 'Required field.'
    }

    if (validator.isEmail(data.email)===false){
        errors.email = 'Please enter a real email.'
    }

    if (validator.isNull(data.password)){
        errors.password = 'Required field.'
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    }
}

export default validateInput;