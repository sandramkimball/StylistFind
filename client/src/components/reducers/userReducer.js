
// This object initializes login data
export const initialUserState = {
    username: '',
    password: '',
    usertype: 'stylist' || 'customer',
    isLoading: false,
    registeredUsers: []
}



// This reducer handles dispatches to update global user state
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
                username: action.username,
            };

        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: 'Incorrect username or password.',
                isLoggedIn: false,
                isLoading: false,
                usertype: '',
                username: '',
                password: '',
                city: '',
            };
            
        case 'LOGIN_TRUE':
            return {...state, isLoggedIn: true};
        case 'LOGIN_STYLIST':
            return {...state, isStylist: true};
        case 'LOGIN_CUSTOMER':
            return {...state, isCustomer: true};

        case 'REGISTRATION_SUCCESS':
            return{
                ...state, 
                isLoggedIn: true,
                isLoading: false,
                usertype: action.usertype,
                username: action.username,
                password: action.password,
                city: action.city,
            };

        case 'REGISTRATION_FAILURE':
            return{
                ...state, 
                error: 'Username already taken.',
                isLoggedIn: false,
                isLoading: false,
                username: '',
                password: '',
                usertype: '',
                city: '',
            };
        
        case 'LOGOUT':
            return {
                ...initialUserState,
            };

        default: return state;
    }
}