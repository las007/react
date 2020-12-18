import React from "react";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import {toLogout} from "@/action/toConnect";
import { onSub, getUserInfo } from "@/action/onSub";
import request from "@/utils/request";
import {Icon, notification} from 'antd'
import './Header.less'
import InformationPop from "@/components/InformationPop";


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
            this.setState({ imgUrl: account.data.data.avatar_url, userId: account.data.data.id });
            if (this.props.isGetInfo) {
                this.props.userInfo(account.data.data)
            }
        } else if (account && account.data.code === 301) {
            InformationPop(account.data.data, '请重新登录');
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
            if (localStorage.getItem('token') !== null) {
                this.props.history.push(`/user/info/${this.state.userId}`)
            } else {
                this.props.history.push(`/`);
            }
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
        if (localStorage.getItem('token') !== null) {
            this.setState({ showModal: 'block' })
        }
    };
    handleMouseLeave = e => {
        this.setState({ showModal: 'none' })
    };

    render() {
        const { account } = this.props.getSubmit;

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
                    <span className="header-bar" onClick={() => this.handleClick('home')}>首页</span>
                    <span className="header-bar">目的地</span>
                    <span className="header-bar">旅游攻略</span>
                    <span className="header-bar" onClick={() => this.props.history.push("/question/index")}>问答</span>
                </span>

                { account && account.data.data.avatar ? (<span>123</span>) : (
                        <div style={{ display: 'inline-block', float: 'right', marginRight: '171px' }} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                            <img src={str2} alt="error" className="header-img" onClick={() => this.jumpRoute(0)}/>
                            <span style={{ fontSize: '18px', marginLeft: '15px' }}>
                                Hi~！·{ account && account.data.data.nickName ? account.data.data.nickName : <span className="header-bar">请<Link to="/">登录</Link></span> }
                            </span>
                            <div>
                                <ul style={{ display: this.state.showModal, position: 'absolute' }}>
                                    {
                                        localStorage.getItem('token') === null ? null :
                                            <span>
                                                <li className="m-top" onClick={() => this.jumpRoute(0)}>个人中心</li>
                                                <li className="m-top" onClick={() => this.jumpRoute(1)}>去写攻略</li>
                                                <li className="m-top" onClick={() => this.jumpRoute(2)}>我的草稿箱</li>
                                                {localStorage.getItem('token') === null ? null : <li className="m-top" onClick={this.logout}>退出</li>}
                                            </span>
                                    }
                                </ul>
                            </div>
                        </div>
                )}
                {/*<hr/>*/}
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
