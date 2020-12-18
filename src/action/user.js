// 修改用户资料
export const SUB_EDIT_USER_MEANS = "SUB_EDIT_USER_MEANS";
export const subEditUserMeans = (info) => {
    console.log('log user edit.', info);
    return {
        type: SUB_EDIT_USER_MEANS,
        axiosPayload: {
            options: {
                url: '/api/user/edit',
                method: 'post',
                data: {}
            }
        }
    }
};

// 删除个人文章
export const DELETE_MY_ARTICLE = "DELETE_MY_ARTICLE";
export const deleteMyArticle = (userId, articleId) => {
    return {
        type: DELETE_MY_ARTICLE,
        axiosPayload: {
            options: {
                url: '/api/user/delete/my/article',
                method: 'post',
                data: { userId, articleId }
            }
        }
    }
};
