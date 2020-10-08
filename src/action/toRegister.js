export const TO_REGISTER = "TO_REGISTER";
export const onRegister = (item) => {
    console.log('log register item...', item);
    return {
        type: TO_REGISTER,
        payload: {
            params: {}
        },
        axiosPayload: {
            options: {
                url: '/api/user/register',
                method: 'post',
                data: item
            }
        }
    }
};
