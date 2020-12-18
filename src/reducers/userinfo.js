import * as userInfo from '@/action/user';
import createReducers from './createReducers';

const clearState = {
    isDeleteMyArticle: null     //删除我的文章
};

const initState = {
    ...clearState,
    isDeleteMyArticleFetched: false     //已经删除我的文章
};

export default createReducers(initState, clearState, {
    [userInfo.SUB_EDIT_USER_MEANS]: (state, action) => {
        console.log();
        return {
            ...state,
            isSubEditMeans: action.payload
        }
    },

    //删除我的文章
    [userInfo.DELETE_MY_ARTICLE + '_REQUEST']: (state) => {
        return {
            ...state,
            viewStatus: {
                ...state.viewStatus,
                isDeleteMyArticleFetched: false
            }
        }
    },
    [userInfo.DELETE_MY_ARTICLE + '_SUCCESS']: (state, action) => {
        const {data} = action.payload;
        return {
            ...state,
            viewStatus: {
                ...state.viewStatus,
                isDeleteMyArticleFetched: true
            },
            isDeleteMyArticle: data
        }
    },
    [userInfo.DELETE_MY_ARTICLE + "_FAIL"]: (state) => {
        return {
            ...state,
            viewStatus: {
                ...state.viewStatus,
                isDeleteMyArticleFetched: false
            }
        }
    },
})
