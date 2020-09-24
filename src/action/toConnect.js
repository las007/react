export const TO_CONNECT = 'TO_CONNECT';
export const toConnect = () => {
    return ({
        type: TO_CONNECT,
        axiosPayload: {
            options: {
                url: '/api/public/getHomePage',
                method: 'get',
                data: {}
            }
        }
    });
};

export const TO_LOG_OUT = 'TO_LOG_OUT';
export const toLogout = () => {
    return ({
        type: TO_LOG_OUT,
        axiosPayload: {
            options: {
                url: '/api/user/logout',
                method: 'get',
                data: {}
            }
        }
    })
};
