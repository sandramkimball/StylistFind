
// This object initializes login data
// export const initialUserState = {
//     username: '',
//     password: '',
//     usertype: 'stylist' || 'customer',
//     city: '',
//     isStylist: false,
//     isCustomer: false,
//     isLoading: false,
//     registeredUsers: []
// }

export const stylist = [
    {
      id: 1,
      username: 'Stella',
      password: 'Stella',
      name: 'Stella',
      salon: 'Stella\'s Salon',
      email: 'stella@gmail.com',
      city: 'Dallas',
      isStylist: true,
      bio: 'Hi, I am Stella. I am a hairstylist.',
      profile_img: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      images: [
        {
          imageUrl: 'https://images.unsplash.com/photo-1549236177-f9b0031756eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1554519515-242161756769?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
        },
        { imageUrl: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'
        }
      ]
    }]

// This reducer handles dispatches to update global user state
export const userReducer = (state = stylist, action) => {
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
                ...stylist,
            };

        default: return state;
    }
}