import { createContext } from 'react';

export const BasketContext = createContext(null);
export const BasketDispatchContext = createContext(null);


function basketReducer(tasks, action) {
    switch (action.type) {
      case 'something': {
        return [...tasks, {
          id: action.id,
          text: action.text,
          done: false
        }];
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }