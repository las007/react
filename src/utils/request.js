import axios from "axios";

const start = axios.create({
    // baseURL: 'localhost:8081',

    // 坑！如果设置了timeout 的属性值，会导致请求超时，从而导致接口数据请求失败
    // 在postman可以正常调取数据的情况下，timeout 属性默认不设置
    // 导致时而可以正常获取数据，时而获取失败
    // 一开始还以为是后台接口的问题，最后发现是 timeout 请求时间限制导致。

    // timeout: 1000,
    // elementJSON: true
});

const capture = (data) => {
    console.log('log capture..', data);
    if (data.axiosPayload.options.method === 'post') {
        console.log('log post', data.axiosPayload.options);
        return data.axiosPayload.options;
    }else if(data.axiosPayload.options.method === 'get') {
        data.axiosPayload.options.data = data.payload.params.data;
        console.log('log get2', data.axiosPayload.options);
        return data.axiosPayload.options;
    }
};

start.interceptors.request.use(config => {
    console.log('log config....', config);

    /*capture(config).then(result => {
        console.log('log result..', result);
    });*/
    // console.log('log result..', capture(config));


    //设置请求头..
    const token = window.localStorage.getItem('token');
    // if (token) {
        config.headers['token'] = token;
        config.headers['api-version'] = 'tp6';
        config.headers['webtype'] = 'API';
        config.headers['Content-Type'] ='application/json;charset=UTF-8';

    console.log('log request config..', config);
        return config;
    // }else {
    //     return 'fail'
    // }

}, error => {
    return Promise.reject(error)
});

start.interceptors.response.use(response => {
    return Promise.resolve(response)
}, err => {
    return Promise.reject(err);
});

export default start;
