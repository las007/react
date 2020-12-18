import * as conductors from "../action/articles";
import createReducer from "./createReducers";
import {IS_LIKE_COMMENT} from "../action/articles";

const clearState = {
    getQuestionInfoData: null,      //获取问答详情数据
};

const initState = {
    clearState,
    viewStatus: {
        isGetQuestionInfoFetched: false,        //以获取到问答详情数据
    }
};

export default createReducer({}, {}, {
    [conductors.GET_ARTICLE_IN_HOMEPAGE]: (state, action) => {
        return {
            ...state,
            articles: action.payload
        }
    },
    [conductors.GET_TITLE_IMAGE]: (state, action) => {
        return {
            ...state,
            titleImage: action.payload
        }
    },
    [conductors.GET_QUESTION_MODULE]: (state, action) => {
        return {
            ...state,
            questionInfo: action.payload
        }
    },
    [conductors.GET_QUESTION_DETAIL]: (state, action) => {
        return {
            ...state,
            QADetail: action.payload
        }
    },

    // 获取问答详情数据
    [conductors.GET_QUESTION_INFO]: (state, action) => {
        return {
            ...state,
            getQuestionInfoData: action.payload
        }
    },
    [conductors.TEST_DELIVER]: (state, action) => {
        console.log('log item4.', state, action);
        return {
            ...state,
            testD: action.payload
        }
    },
    // 发布评论
    [conductors.PUB_COMMENT_INFOS]: (state, action) => {
        console.log('log comment reducer..', state, action);
        return {
            ...state,
            isPubComment: action.payload
        }
    },
    // 点赞评论
    [conductors.IS_LIKE_COMMENT]: (state, action) => {
        console.log('log comment like reducer..', state, action);
        return {
            ...state,
            isCommentLike: action.payload
        }
    }
})
