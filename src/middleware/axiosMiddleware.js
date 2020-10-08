import request from '@/utils/request'

const defaultSuffix = ['_REQUEST', '_SUCCESS', '_FAIL'];
const middleware = ({dispatch}) => next => action => {
    console.log('action3..', action);
    if (!action || !action.axiosPayload || !action.axiosPayload.options || !action.axiosPayload.options.url) {
        return next(action);
    }
    let type = action.type;
    let payload = action.axiosPayload;
    let options = payload.options;
    dispatch({type: type + defaultSuffix[0]});
    request(options).then(result => {
        console.log('log result2..', result);
        if (result.data.code === 200) {
            if (result) {
                dispatch({type: type, payload: {...result, ...action.payload}, meta: '异步请求成功'});
            } else {
                dispatch({
                    type: type + defaultSuffix[2],
                    payload: {...result},
                    meta: '异步请求成功，但判断条件（condition）失败'
                });
            }
        } else {
            dispatch({type: type, payload: {...result}, meta: 'code 不等于 20000'});
        }
    }).catch(error => {
        dispatch({type: type + defaultSuffix[2], payload: error, meta: '异步请求失败'});
    })
};
export default middleware
