import { LOCATION_CHANGE } from 'react-router-redux'
export default function(initialState, clearState, handlers) {
  console.log('handlers..', handlers);
  return function reducer(state, action) {
    if (typeof state === 'undefined') {
      console.log('log state undefined..');
      return initialState;
    }
    if (handlers.hasOwnProperty(action.type)) {
      console.log('log action3..', state, action);
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
}
