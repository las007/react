import config from '@/config/api'


// 获取问题下答案列表
export const GET_ANSWER_LIST = "GET_ANSWER_LIST";
export const getAnswerList = (questionId) => {
    console.log('log get an list.', questionId);
    return {
        type: GET_ANSWER_LIST,
        payload: {
            params: {}
        },
        axiosPayload: {
            options: {
                url: config.answer.answerDataList + `?questionId=${questionId}`,
                method: 'get',
                data: {}
            }
        }
    }
};

//发布回答
export const PUB_ANSWER_CONTENT = "PUB_ANSWER_CONTENT";
export const pubAnswerContent = (info) => {
    console.log('log publish an.', info);
    return {
        type: PUB_ANSWER_CONTENT,
        axiosPayload: {
            options: {
                url: config.answer.pubAnswerContent,
                method: 'post',
                data: info
            }
        }
    }
};

//点赞 or 取消点赞
export const SUB_LIKE_ANSWER = "SUB_LIKE_ANSWER";
export const subLikeAnswer = (info) => {
    return {
        type: SUB_LIKE_ANSWER,
        axiosPayload: {
            options: {
                url: config.answer.subLikeAnswer,
                method: 'post',
                data: info
            }
        }
    }
};
