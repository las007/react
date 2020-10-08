import React from 'react';
import './HomePage.less';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {toConnect, toLogout} from "@/action/toConnect";
import { getArticle, getTitleImage, getQuestion } from "@/action/articles";
import { Carousel } from "antd";
import {onSub} from "@/action/onSub";
import request from "@/utils/request"
// import Login from "@/Login"

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //设置页面内初始数据
            value: 'resourceData..',
            message: '123',
            comment: 'comm'
        }
    }
    componentDidMount() {
        //第一次进入页面
        console.log('log this props..', this.props);
        this.props.actionConnect();
        this.props.article();
        this.props.question();
        this.props.titleImage()
    }
    componentWillMount() {
        //页面加载完成
        const token = localStorage.getItem('token');
        console.log('log 22222222', token, token === null, token.length, token === '');
        if (token.length === 0) {
            this.props.history.push('/');
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        //每次页面数据更新，此生命周期变动
        console.log('log nextPros..', nextProps);
    }

    handleClick = () => {
        console.log('log handleClick..', this.props)
        this.props.history.push("/getState");
    };
    toRequest = () => {
        console.log('submit request..')
        request({
            url: '/api/getHomePage',
            headers: {
                kitToken: 'abcdefghijklmn...'
            },
            data: {}
        }).then(result123 => {
            console.log('log result123..', result123)
        });
    };
    toLogin = () => {
        this.props.history.push('/login');
    };
    logout = () => {
        console.log('log to logout..');
        localStorage.removeItem('token');
        this.props.actionLogout();
        let item = {isLogout: true};
        // this.props.onSub(null, null, true);
        this.props.onSub(item);
        let that = this;
        setTimeout(function () {
            that.props.history.push('/');
        }, 500);
    };

    render() {
        const contentStyle = {
            height: '160px',
            color: '#000',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',
            width: '100%'
        };
        return (
            <div className="container">
                <p className="content">this is a new home page...</p>
                <hr/>
                <button onClick={this.handleClick}>点击跳转页面</button>
                <input type="button" value="提交"/>

                <Link to="/getState">
                    <p>页面跳转</p>
                </Link>

                <button onClick={this.toRequest}>发起 request 请求</button>

                {/*{ <Login {...this.props}/> }*/}
                <hr/>
                <button onClick={this.toLogin}>toLogin</button>
                <button onClick={this.logout}>logout</button>
            </div>
        )
    }
}

const mapStateToPeops = state => ({
    connectMsg: state.getMsg.connection,
    logout: state.getMsg.logout,
    articlesInfo: state.articles
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        actionConnect: toConnect,
        actionLogout: toLogout,
        onSub,
        article: getArticle,
        question: getQuestion,
        titleImage: getTitleImage
    }, dispatch);
}
export default connect(mapStateToPeops, mapDispatchToProps)(HomePage)
