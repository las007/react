import * as conductors from "../action/articles";
import createReducer from "./createReducers";

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
    }
})
