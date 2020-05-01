import React, { createContext, useState, useContext } from 'react';
import { initialUserState, userReducer } from '../reducers/userReducer';

// This creates a context object to store and access login and user information in state
const UserContext = createContext();

export default function UserProvider({children}){
    const [user, setUser] = useState([]);
    const [stylist, setStylist] = useState([]);
    //const [stylist, dispatch] = useReducer(userReducer, initialUserState);
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

// This intentionally avoids exporting UserContext and provides just one way to provide the context value and one way to consume it
export function useUserContext() {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUserContext must be used within UserProvider');
    }
    return context;
  }