import { createContext } from 'react';

export const PaymentContext = createContext(null);
export const PaymentDispatchContext = createContext(null);


function paymentReducer(tasks, action) {
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