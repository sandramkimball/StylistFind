import React, { createContext, useState } from 'react';

// This creates a context object to store and access login and user information in state
export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user, setUser] = useState(null);
    return(
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}
