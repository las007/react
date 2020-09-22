/*
import request from "../utils/request"

const axiosMiddleware = ({ dispatch, getState }) => next => action => {
    console.log('log actions...', action);
    if (!action) {
        next(action);
    }
    let options = action.axiosPayload && action.axiosPayload.options;
    // let fail = action.axiosPayload.fail;
    console.log('options..', options);
    if (options) {
        request(options).then(result => {
            console.log('log actions result...', result);
            if (result.data.code === 20000) {
                // !!fail && fail(dispatch, getState, result);
                dispatch({
                    type: action.type + 'SUCCESS',
                    payload: result.data
                });
            }else {
                dispatch({
                    type: 'FAIL',
                    payload: result.data.msg
                });
            }
        });
    }
};

export default axiosMiddleware;
*/


import request from '@/utils/request'

const loadingOptions = {
    show: false,
    tip: ''
};
const defaultSuffix = ['_REQUEST', '_SUCCESS', '_FAIL'];
const middleware = ({dispatch, getState}) => next => action => {
    if (!action || !action.axiosPayload || !action.axiosPayload.options || !action.axiosPayload.options.url) {
        return next(action);
    }
    let type = action.type;
    let payload = action.axiosPayload;
    let conditionFun = payload.condition; //条件
    let success = payload.success; // TODO 添加成功的回调，这样是否合适？
    let fail = payload.fail;
    let loading = {...loadingOptions, ...payload.loadingOptions};  //是否需要LOADING
    let options = payload.options;
    let paulPayload = action.payload;
    loading.show && dispatch({type: "SHOW_LOADING", payload: loading.tip, meta: '显示loading'});
    dispatch({type: type + defaultSuffix[0]});
    request(options).then(response => {
        if (response.data.code === 20000 || conditionFun) {
            if (conditionFun && conditionFun(response) || !conditionFun) {
                dispatch({type: type + defaultSuffix[1], payload: {...response, ...paulPayload}, meta: '异步请求成功'});
                // !!success && success(dispatch, getState, response);
            } else {
                // !!fail && fail(dispatch, getState, response)
                dispatch({
                    type: type + defaultSuffix[2],
                    payload: {...response},
                    meta: '异步请求成功，但判断条件（condition）失败'
                });
            }
        } else {
            dispatch({type: type + defaultSuffix[2], payload: {...response}, meta: 'code 不等于 0'});
        }
        loading.show && dispatch({type: "HIDE_LOADING", meta: '隐藏loading'});
    }).catch(error => {
        loading.show && dispatch({type: "HIDE_LOADING", meta: '隐藏loading'});
        dispatch({type: type + defaultSuffix[2], payload: error, meta: '异步请求失败'});
    })
};
export default middleware
