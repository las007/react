import axios from "axios";

const start = axios.create({
    // baseURL: 'localhost:8081',
    timeout: 1000,
    // elementJSON: true
});

start.interceptors.request.use(config => {
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
