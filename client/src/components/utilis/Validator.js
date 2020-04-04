import Validator from 'Validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
    let errors =[];
    if (Validator.isNull(data.username)){
        errors.username = 'Required field.'
    }

    if (Validator.isNull(data.password)){
        errors.password = 'Required field.'
    }

    return {
        errors, 
        isValid: isEmpty(errors)
    }
}