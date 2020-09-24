// export const getState2 = function(state=0, action) {
//         console.log('log state message..', state, action);
//         if (action.type === 'success') {
//             console.log('log success message..');
//         }
//         return state;
// /*        switch (action.type) {
//             case 'success':
//                 return state;
//             case 'fail':
//                 return 'fail';
//             case 'request':
//                 return 'request';
//             default:
//                 return 0
//         }*/
//     };
import createReducers from './createReducers';
import * as toConnect from '../action/toConnect';

export default createReducers({}, {}, {
    [toConnect.TO_CONNECT]: (state, action) => {
        console.log('to connect..', state, action);
        return {
            ...state,
            connection: action.payload
        }
    },

    [toConnect.TO_LOG_OUT]: (state, action) => {
        console.log('log to logout..', state, action);
        return {
            ...state,
            logout: action.payload
        }
    }
})
