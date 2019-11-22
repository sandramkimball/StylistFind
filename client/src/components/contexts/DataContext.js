import React, { createContext, useReducer, useContext } from 'react';
import { initialState, dataReducer } from '../reducers/dataReducer';

// This creates a context object to store and access child nutrition data records from the backend in state
const DataContext = createContext();

// This uses the useReducer hook to allow access to state and provide functions to dispatch actions to update state
export default function DataProvider({ children }) {
  const [data, dispatchData] = useReducer(dataReducer, initialState);
  return (
    <DataContext.Provider value={{ data, dispatchData }}>
      {children}
    </DataContext.Provider>
  );
}

// This intentionally avoids exporting DataContext and provides just one way to provide the context value and one way to consume it
export function useDataContext() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within DataProvider');
  }
  return context;
}