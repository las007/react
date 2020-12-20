import { combineReducers } from "redux";
import toConnect from "./commentList";
import getSub from "./getSub"
import getRegister from "./getRegister"
import articles from "./articles"
import findPW from "./findPW"
import userMeans from "./userinfo"
import answer from "./answer"

export default combineReducers({
    getMsg: toConnect,
    getSub,
    getRegister,
    articles,
    findPW,
    userMeans,
    answer,
})
