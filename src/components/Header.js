import React from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import {toLogout} from "@/action/toConnect";
import { onSub, getUserInfo } from "@/action/onSub";
import request from "@/utils/request";
import {Icon, notification} from 'antd'
import './Header.less'


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: '',
            isLogout: false,
            userId: '',
            showModal: 'none'
        };
    }

    componentDidMount() {
        console.log('log header..', this.props);
        this.props.getUserInfo();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log header next props..', nextProps, this.props);
        const { submitMsg, account } = nextProps.getSubmit;

        console.log('log header msg2..', account);
        if (nextProps.getSubmit !== this.props.getSubmit) {

        }
        console.log('log account.', account)

        if (account && account.data.data.id) {
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.')
            this.setState({ imgUrl: account.data.data.avatar_url, userId: account.data.data.id });
            if (this.props.isGetInfo) {
                this.props.userInfo(account.data.data)
            }
        } else if (account && account.data.code === 301) {
            console.log('log account.', account)
            notification['warning']({
                message: account.data.data,
                description: '请重新登录',
                duration: 3.5,
                icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                closeIcon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                className: 'wrap-dots',
                style: {
                    // width: 600,
                    // marginLeft: 335,
                    // zIndex: 999,
                    width: 180,
                    backgroundColor: "#282c34",
                    position: "absolute",
                    top: 10,
                    left: '50%',
                    transform: 'translate(-50%, 20%)',
                    borderRadius: 8,
                    padding: 10,
                    // textAlign: "center",
                    color: 'lightgoldenrodyellow'
                },
            })
            localStorage.removeItem('token')
        }
    }


    handleClick = (item) => {
        console.log('log handleClick..', this.props);
        this.props.history.push(`/${item}`);
    };
    toLogin = () => {
        this.props.history.push('/login');
    };

    jumpRoute = d => {
        if (d === 0) {
            this.props.history.push(`/user/info/${this.state.userId}`)
        } else if (d === 1) {
            this.props.history.push(`/articles/create`)
        } else if (d === 2) {
            this.props.history.push(`/user/draft`)
        }
    };

    logout = () => {
        console.log('log to logout..');
        localStorage.removeItem('token');
        // this.props.actionLogout();
        let item = {isLogout: true};
        // this.props.onSub(null, null, true);
        // this.props.onSub(item);
        let that = this;
        setTimeout(function () {
            console.log('log that props..', that.props);
            that.props.history.push('/');
        }, 500);
    };
    handleMouseOver = e => {
        console.log('log eeeeeeeeeeeeeeeeee.', e)
        this.setState({ showModal: 'block' })
    };
    handleMouseLeave = e => {
        this.setState({ showModal: 'none' })
    };

    render() {
        const { account } = this.props.getSubmit;

        console.log('log header state..', this.state, this.state.imgUrl === '');
        const str = `/api/test/didRoute${'/avatar/upload_02f86c3035d74065d1e09be996b7e27d,upload.jpg'}`;
        let str2;
        if (this.state.imgUrl !== '') {
            // str2 = `/api/test/didRoute${this.state.imgUrl}`;
            str2 = /\/(upload\w*)/.exec(this.state.imgUrl) === null ? this.state.imgUrl : `/api/test/didRoute${this.state.imgUrl}`
        }else {
            str2 = `/api/test/didRoute${'/avatar/upload_02f86c3035d74065d1e09be996b7e27d,upload.jpg'}`;
        }

        return (
            <div className="header-page">
                <span style={{ marginLeft: '35px', cursor: 'pointer' }}>
                    <span style={{ margin: 'auto 8px', fontSize: '18px' }} onClick={() => this.handleClick('home')}>首页</span>
                    <span style={{ margin: 'auto 8px', fontSize: '18px' }}>目的地</span>
                    <span style={{ margin: 'auto 8px', fontSize: '18px' }}>旅游攻略</span>
                    <span style={{ margin: 'auto 8px', fontSize: '18px' }}>问答</span>
                    { localStorage.getItem('token') === null ?
                        <span style={{ margin: 'auto 8px', fontSize: '18px' }} onClick={() => this.props.history.push('/')}>login</span> :
                        <span style={{ margin: 'auto 8px', fontSize: '18px' }} onClick={this.logout}>logout</span>}
                </span>

                { account && account.data.data.avatar ? (<span>123</span>) : (
                        <div style={{ display: 'inline-block', float: 'right', marginRight: '171px' }} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                            <img src={str2} alt="error" style={{ width: '45px', height: '45px', borderRadius: '50%' }} onClick={() => this.jumpRoute(0)}/>
                            <span style={{ fontSize: '18px', marginLeft: '15px' }}>{ account && account.data.data.nickName }</span>
                            <div>
                                <ul style={{ display: this.state.showModal, position: 'absolute' }}>
                                    {
                                        localStorage.getItem('token') === null ?
                                            <span>
                                                <li className="m-top" onClick={() => this.jumpRoute(0)}>未登录！</li>
                                                <li className="m-top" onClick={() => this.jumpRoute(1)}>请登录~</li>
                                                <li className="m-top" onClick={() => this.jumpRoute(2)}>我的草稿箱</li>
                                            </span> :
                                            <span>
                                                <li className="m-top" onClick={() => this.jumpRoute(0)}>个人中心</li>
                                                <li className="m-top" onClick={() => this.jumpRoute(1)}>去写攻略</li>
                                                <li className="m-top" onClick={() => this.jumpRoute(2)}>我的草稿箱</li>
                                            </span>
                                    }
                                </ul>
                            </div>
                        </div>
                )}
                <hr/>
            </div>
        )
    }
}

const mapStateToPeops = state => ({
    getSubmit: state.getSub,
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        onSub,
        getUserInfo,
        actionLogout: toLogout
    }, dispatch);
};

export default connect(mapStateToPeops, mapDispatchToProps)(Header);
