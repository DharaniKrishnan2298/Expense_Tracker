import React, { createContext, useReducer } from 'react';

const ExpenseContext = createContext();

const initialState = {
  entries: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ENTRY':
      return { ...state, entries: [...state.entries, action.payload] };
    case 'EDIT_ENTRY':
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry.id === action.payload.id ? action.payload : entry
        ),
      };
    case 'DELETE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter((entry) => entry.id !== action.payload),
      };
    default:
      return state;
  }
};

const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const ExpenseReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ENTRY':
        return { ...state, entries: [...state.entries, action.payload] };
      case 'DELETE_ENTRY':
        return { ...state, entries: state.entries.filter((entry) => entry.id !== action.payload) };
      case 'EDIT_ENTRY':
        return {
          ...state,
          entries: state.entries.map((entry) =>
            entry.id === action.payload.id ? action.payload : entry
          ),
        };
      default:
        return state;
    }
  };  

export { ExpenseContext, ExpenseProvider };
