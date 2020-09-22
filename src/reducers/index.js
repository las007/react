import { combineReducers } from "redux";
import { getState2 } from "./commentList";
import getSub from "./getSub"

export default combineReducers({
    getMsg: getState2,
    getSub
})
