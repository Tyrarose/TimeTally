import React, { createContext, useReducer } from "react";

const TimeContext = createContext();

const timeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_GROUP":
      return { ...state, groups: [...state.groups, action.payload] };
    case "UPDATE_GROUP":
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.payload.id ? action.payload : group
        ),
      };
    case "REMOVE_GROUP":
      return { ...state, groups: state.groups.filter((g) => g.id !== action.payload) };
    case "TOGGLE_FORMAT":
      return { ...state, format: action.payload };
    default:
      return state;
  }
};

export const TimeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timeReducer, {
    groups: [],
    format: "24", 
  });

  return (
    <TimeContext.Provider value={{ state, dispatch }}>
      {children}
    </TimeContext.Provider>
  );
};

export default TimeContext;