import React, { createContext, useState } from 'react';

// This creates a context object to store and access child nutrition data records from the backend in state
export const DataContext = createContext();

// This uses the useReducer hook to allow access to state and provide functions to dispatch actions to update state
export default function DataProvider({ children }) {
  const [data, setData] = useState(null);
  return (
    <DataContext.Provider value={ [data, setData] }>
      {children}
    </DataContext.Provider>
  );
}
