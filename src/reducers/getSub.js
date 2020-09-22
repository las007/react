import request from '../utils/request'
import createReducers from './createReducers'

import * as actions from "../action/onSub"/*
export const getSub = function (state = 0, action) {
    console.log('log getSub123...', state, action);

    if (action.type === 'ON_SUBMIT_LOGIN') {
        console.log('log one..');
        const dataList = action.axiosPayload.options.data;
        return request({
            url: '/api/postGoToLogin',
            method: 'post',
            data: {
                username: dataList.username,
                password: dataList.password
            }
        })
    }/!*else {
        console.log('log zero..');
        return state
    }*!/
    return state
};*/
console.log('log onSub type..', actions);
export default createReducers({}, {}, {
    [actions.ON_SUBMIT_LOGIN]: (state, action) => {
        console.log('log state123..', state, action)
        return state
    }
})
