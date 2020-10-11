export const ON_SUBMIT_LOGIN = 'ON_SUBMIT_LOGIN';
export const onSub = (item) => {
    console.log('log onSub..', item);
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
                    username: item.username,
                    password: item.password,
                    publicKey: item.publicKey,
                    isLogout: item.isLogout,
                    captcha: item.captcha
                }
            }
        }
    }
};

export const GET_PUBLIC_KEY = 'GET_PUBLIC_KEY';
export const getPublicKey = () => {
    return {
        type: GET_PUBLIC_KEY,
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

export const PO_GET_CAPTCHA = 'PO_GET_CAPTCHA';
export const getCaptcha = () => {
    return {
        type: PO_GET_CAPTCHA,
        payload: {},
        axiosPayload: {
            options: {
                url: '/api/public/captcha',
                method: 'get',
                data: {}
            }
        }
    }
};

export const GET_USER_INFO = "GET_USER_INFO";
export const getUserInfo = () => {
    return {
        type: GET_USER_INFO,
        payload: {},
        axiosPayload: {
            options: {
                url: '/api/user/info',
                method: 'get',
                data: {}
            }
        }
    }
};
