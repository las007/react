import * as connection from "../action/toRegister"
import createReducer from "./createReducers"

console.log('log get register type..', connection);

export default createReducer({}, {}, {
    [connection.TO_REGISTER]: (state, action) => {
        console.log('log register123...', state, action);
        return {
            ...state,
            registeredValues: action.payload
        }
    }
})
