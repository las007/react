export const FORGET_PASSWORD = "FORGET_PASSWORD";
export const forgetPW = (email) => {
    return {
        type: FORGET_PASSWORD,
        payload: {
            params: {}
        },
        axiosPayload: {
            options: {
                url: '/api/public/forget',
                method: 'post',
                data: {
                    email
                }
            }
        }
    }
};

export const CHECK_VERIFICATION_CODE = "CHECK_VERIFICATION_CODE";
export const checkCode = (item) => {
    return {
        type: CHECK_VERIFICATION_CODE,
        payload: {},
        axiosPayload: {
            options: {
                url: '/api/public/verification',
                method: 'post',
                data: {
                    validateCode: item.validateCode,
                    email: item.email
                }
            }
        }
    }
};

export const RESERT_PASSWORD = "RESET_PASSWORD";
export const resetPW = (item) => {
    console.log('log reset item..', item);
    return {
        type: RESERT_PASSWORD,
        payload: {},
        axiosPayload: {
            options: {
                url: "/api/public/resetPW",
                method: 'post',
                data: {
                    password: item.password,
                    confirmPassword: item.confirmPW,
                    email: item.email,
                    validateCode: item.validated
                }
            }
        }
    }
};
