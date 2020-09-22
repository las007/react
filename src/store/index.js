import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers/index";
import logger  from "redux-logger";
import thunk from "redux-thunk";
import axiosMiddleware from "../middleware/axiosMiddleware"

const middleware = [thunk, axiosMiddleware];
const store = createStore(reducer, applyMiddleware(...middleware, logger));
// const store = createStore(reducer, applyMiddleware(logger, thunk));
//
export default store;
