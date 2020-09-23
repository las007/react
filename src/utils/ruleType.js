/*
表单验证规则
*/

//自定义数据类型
const contentType = {
    //password
    password: {
        reg: /^[a-zA-Z0-9_\-~*()!@#$%^.·`,&]+$/,
        errMsg: '英文字母（区分大小写）、数字，可含半角标点符号·.,-_~ *()!@#$%^&',
    },
    // email
    email: {
        reg: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        errMsg: '邮箱格式不正确',
    },
};

export default function RuleType(type, error) {
    console.log('log type..', type);
    const validate = contentType[type];
    console.log('log validate..', validate);
}
