export const ON_SUBMIT_LOGIN = 'ON_SUBMIT_LOGIN';
export const onSub = (username, password) => {
    console.log('log onSub..', username, password);
    return {
        type: "ON_SUBMIT_LOGIN",
        payload: {
            params: {
                data: {}
            }
        },
        axiosPayload: {
            options: {
                url: '/api/postGoToLogin',
                method: 'post',
                data: {
                    username,
                    password
                }
            }
        }
    }
};
