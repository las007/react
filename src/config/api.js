export default {
    admin: {
        account: '/api/admin/getAccount',
        login: '/api/admin/login',
        register: '/api/admin/register'
    },
    public: {
        home: '/api/public/homePage',
        index: '/api/public/index'
    },
    test: {
        message: '/api/test/getMessage',
        asset: '/api/test/asset'
    },
    user: {
        addArticle: '/api/user/createArticle',
        userInfo: '/api/user/info',
        register: '/api/user/register',
        findPW: '/api/user/findPw',
        login: '/api/user/login',
        mine: '/api/user/mine'
    },
    comment: {
        commentInfo: '/api/article/comment'
    },
    //回答
    answer: {
        answerDataList: '/api/answer/getAnswerList',
        pubAnswerContent: '/api/answer/pubAnswerContent',
        subLikeAnswer: '/api/answer/answerLike',
    }
}
