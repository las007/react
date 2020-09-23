export const TO_CONNECT = 'TO_CONNECT';
export const toConnect = () => {
    return ({
        type: TO_CONNECT,
        axiosPayload: {
            options: {
                url: '/api/getHomePage',
                method: 'get',
                data: {}
            }
        }
    });
};
