import { combineReducers } from "redux";
import toConnect from "./commentList";
import getSub from "./getSub"
import getRegister from "./getRegister"
import articles from "./articles"

export default combineReducers({
    getMsg: toConnect,
    getSub,
    getRegister,
    articles
})
