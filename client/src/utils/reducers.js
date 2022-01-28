// reducers.js code
import { useReducer } from 'react';
// import our actions
import {
    UPDATE_EVENTS,
    UPDATE_CURRENT_EVENT
  } from '../utils/actions';
  export const reducer = (state, action) => {
    switch (action.type) {
      // if action type value is the value of `UPDATE_EVENTS`, return a new state object with an updated products array
      case UPDATE_EVENTS:
        return {
          ...state,
          events: [...action.events],
        };
  
      case UPDATE_CURRENT_EVENT:
        return {
          ...state,
          currentEvent: action.currentEvent
        }
  
      default:
        return state;
    }
  };
  

  
  // create a sample of what our global state will look like

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
  }