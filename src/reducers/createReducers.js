export default function(initialState, clearState, handlers) {
  return function reducer(state, action) {
    if (typeof state === 'undefined') {
      console.log('log state undefined..');
      return initialState;
    }
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
}
