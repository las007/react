import * as answer from '@/action/answer';
import createReducers from './createReducers'

const clearState = {
    isGetAnswerListData: null,          //获取回答列表
    isPubAnswerContentData: null,       //发布回答
    isSubLikeAnswerData: null           //点赞回答
};

const initState = {
    ...clearState,
    viewStatus: {
        isGetAnswerListFetched: false,           //已获取到回到列表数据
        isPubAnswerContentFetched: false,        //已发布回答
        isSubLikeAnswerFetched: false,           //已点赞回答
    }
};

export default createReducers(initState, clearState, {
    //获取回答列表
/*    [answer.GET_ANSWER_LIST + '_REQUEST']: (state) => {
        return {
            ...state,
            viewStatus: {
                ...state.viewStatus,
                isGetAnswerListFetched: false
            }
        }
    },*/
    [answer.GET_ANSWER_LIST]: (state, action) => {
        return {
            ...state,
            viewStatus:  {
                ...state.viewStatus,
                isGetAnswerListFetched: true
            },
            isGetAnswerListData: action.payload
        }
    },
/*    [answer.GET_ANSWER_LIST + '_FAIL']: (state) => {
        return {
            ...state,
            viewStatus: {
                ...state.viewStatus,
                isGetAnswerListFetched: false
            }
        }
    }*/
    [answer.PUB_ANSWER_CONTENT]: (state, action) => {
        return {
            ...state,
            viewStatus:  {
                ...state.viewStatus,
                isPubAnswerContentFetched: true
            },
            isPubAnswerContentData: action.payload
        }
    },
    [answer.SUB_LIKE_ANSWER]: (state, action) => {
        return {
            ...state,
            viewStatus: {
                ...state.viewStatus,
                isSubLikeAnswerFetched: true
            },
            isSubLikeAnswerData: action.payload
        }
    },
})
