import config from '@/config/api'

// 提交登录
export const ON_SUBMIT_LOGIN = 'ON_SUBMIT_LOGIN';
export const onSub = (item) => {
    console.log('log onSub..', item);
    return {
        type: "ON_SUBMIT_LOGIN",
        payload: {
            params: {
                data: {}
            }
        },
        axiosPayload: {
            options: {
                url: '/api/user/subLogin',
                method: 'post',
                data: {
                    username: item.username,
                    password: item.password,
                    publicKey: item.publicKey,
                    isLogout: item.isLogout,
                    captcha: item.captcha
                }
            }
        }
    }
};

// 获取公共 key
export const GET_PUBLIC_KEY = 'GET_PUBLIC_KEY';
export const getPublicKey = () => {
    return {
        type: GET_PUBLIC_KEY,
        payload: {},
        axiosPayload: {
            options: {
                url: '/api/public/getPublicKey',
                method: 'get',
                data: {}
            }
        }
    }
};

// 刷新验证码
export const PO_GET_CAPTCHA = 'PO_GET_CAPTCHA';
export const getCaptcha = () => {
    return {
        type: PO_GET_CAPTCHA,
        payload: {},
        axiosPayload: {
            options: {
                url: '/api/public/captcha',
                method: 'get',
                data: {}
            }
        }
    }
};

// 获取用户信息
export const GET_USER_INFO = "GET_USER_INFO";
export const getUserInfo = () => {
    return {
        type: GET_USER_INFO,
        payload: {},
        axiosPayload: {
            options: {
                url: '/api/user/info',
                method: 'get',
                data: {}
            }
        }
    }
};

// 获取作者信息
export const GET_WRITER_INFO = "GET_WRITER_INFO";
export const getWriterInfo = (ID) => {
    console.log('log id.', ID)
  return {
      type: GET_WRITER_INFO,
      payload: {},
      axiosPayload: {
          options: {
              url: '/api/user/writerInfo',
              method: 'post',
              data: {
                  id: ID
              }
          }
      }
  }
};

// 获取文章详情
export const GET_EVENT_DETAIL = "GET_EVENT_DETAIL";
export const getEventDetail = (id) => {
    console.log('log e id..', id);
    return {
        type: GET_EVENT_DETAIL,
        payload: {
            params: {
                data: {
                    eventId: id
                }
            }
        },
        axiosPayload: {
            options: {
                url: `/api/answer/getEventDetail/${id}`,
                method: 'get',
                params: {
                    // id
                },
                data: {
                    eventId: id
                }
            }
        }
    }
};

// 取消/点赞
export const PO_HANDLE_LIKE = "PO_HANDLE_LIKE";
export const isLike = (uid, isLike, id) => {
    console.log('log is like..', isLike, id);
    return {
        type: PO_HANDLE_LIKE,
        axiosPayload: {
            options: {
                url: `/api/answer/like`,
                method: 'post',
                params: {
                    // id
                },
                data: {
                    userId: uid,
                    isLike: isLike,
                    articleId: id
                }
            }
        }
    }
};

// 创建文章
export const ADD_ARTICLE = "ADD_ARTICLE";
export const addArticle = (item) => {
    console.log('log add item.', item);
    return {
        type: ADD_ARTICLE,
        axiosPayload: {
            options: {
                url: config.user.addArticle,
                method: 'post',
                params: {},
                data: item
            }
        }
    }
};

// test 监听 redux 数据传递
export const TEST_SOME = "TEST_SOME";
export  const testSome = value => {
    console.log('log test some.', value);
    return {
        type: TEST_SOME,
        testMsg: value
    }
};
