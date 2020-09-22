export const getState2 = function(state=0, action) {
        console.log('log state message..', state, action);
        if (action.type === 'success') {
            console.log('log success message..');
        }
        return state;
/*        switch (action.type) {
            case 'success':
                return state;
            case 'fail':
                return 'fail';
            case 'request':
                return 'request';
            default:
                return 0
        }*/
    };
