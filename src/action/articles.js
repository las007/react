export const GET_ARTICLE_IN_HOMEPAGE = "GET_ARTICLE_IN_HOMEPAGE";
export const getArticle = item => {
    return {
       type: GET_ARTICLE_IN_HOMEPAGE,
       payload: {
           params: {}
       },
        axiosPayload: {
           options: {
               // url: '/api/public/getArticle',
               url: '/api/test/answer/getTempCache',
               method: 'get',
               data: {}
           }
        }
    }
};

export const GET_TITLE_IMAGE = "GET_TITLE_IMAGE";
export const getTitleImage = () => {
    return {
        type: GET_TITLE_IMAGE,
        payload: {
            params: {}
        },
        axiosPayload: {
            url: '/api/public/getTitleImage',
            method: 'get',
            data: {}
        }
    }
};

export const GET_QUESTION_MODULE = "GET_QUESTION_MODULE";
export const getQuestion = () => {
    return {
        type: GET_QUESTION_MODULE,
        payload: {
            params: {}
        },
        axiosPayload: {
            options: {
                url: '/api/public/question/getQuestion',
                method: 'get',
                data: {}
            }
        }
    }
};
