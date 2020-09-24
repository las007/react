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
                url: '/api/user/subLogin',
                method: 'post',
                data: {
                    username,
                    password
                }
            }
        }
    }
};

export const GET_USER_INFO = 'GET_USER_INFO';
export const getPublicKey = () => {
    return {
        type: GET_USER_INFO,
        payload: {},
        axiosPayload: {
            options: {
                url: '/api/public/getPublicKey',
                method: 'get',
                data: {}
            }
        }
    }
};
