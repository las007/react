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
        return {
            ...state,
            submitMsg: action.payload
        }
    },

    [actions.GET_PUBLIC_KEY]: (state, action) => {
        console.log('log userInfo..', state, action);
        return {
            ...state,
            userInfo: action.payload
        }
    },

    [actions.PO_GET_CAPTCHA]: (state, action) => {
        console.log('log get captcha again..', state, action);
        return {
            ...state,
            captchaInfo: action.payload
        }
    },
    [actions.GET_USER_INFO]: (state, action) => {
        return {
            ...state,
            account: action.payload
        }
    },
    [actions.GET_WRITER_INFO]: (state, action) => {
        return {
            ...state,
            writerDetail: action.payload
        }
    },
    [actions.GET_EVENT_DETAIL]: (state, action) => {
        return {
            ...state,
            eventDetail: action.payload
        }
    },
    [actions.PO_HANDLE_LIKE]: (state, action) => {
        return {
            ...state,
            isLike: action.payload
        }
    },
    [actions.ADD_ARTICLE]: (state, action) => {
        return {
            ...state,
            isAddArticle: action.payload
        }
    },
    [actions.TEST_SOME]: (state, action) => {
        console.log('log test msg.', state, action);
        return {
            ...state,
            testMsg: action.testMsg
        }
    }
})
