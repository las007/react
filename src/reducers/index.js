import { combineReducers } from "redux";
import toConnect from "./commentList";
import getSub from "./getSub"

export default combineReducers({
    getMsg: toConnect,
    getSub
})
