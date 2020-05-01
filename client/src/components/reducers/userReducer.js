
// This object initializes login data
export const initialUserState = {
    email: '',
    password: '',
    usertype: 'stylist' || 'customer',
    isLoading: false,
    registeredUsers: []
}



// This reducer handles dispatches to update global user/stylist state
export const userReducer = (state = initialUserState, action) => {
    switch(action.type){

        case 'FIELD':
            return {
                ...state,
                [action.fieldName]: action.payload
            };

        case 'LOGIN_START':
            return {
                ...state,
                error: '',
                isLoading: true,
            };
            
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isLoggedIn: true,
                isLoading: true,
                usertype: action.usertype,
                email: action.email,
            };

        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: 'Incorrect email or password.',
                isLoggedIn: false,
                isLoading: false,
                usertype: '',
                email: '',
                password: ''
            };
            
        case 'LOGIN_TRUE':
            return {...state, isLoggedIn: true};
        case 'LOGIN_STYLIST':
            return {...state, usertype: 'stylist'};
        case 'LOGIN_USER':
            return {...state, usertype: 'user'};

        case 'REGISTRATION_SUCCESS':
            return{
                ...state, 
                isLoggedIn: true,
                isLoading: false,
                usertype: action.usertype,
                first_name: action.first_name,
                last_name: action.last_name,
                email: action.email,
                password: action.password
            };

        case 'REGISTRATION_FAILURE':
            return{
                ...state, 
                error: 'Username already taken.',
                isLoggedIn: false,
                isLoading: false,
                email: '',
                password: '',
                usertype: ''
            };
        
        case 'LOGOUT':
            return {
                ...initialUserState,
            };

        default: return state;
    }
}