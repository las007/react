import React from 'react';
import './HomePage.less';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {toConnect, toLogout} from "@/action/toConnect";
import { getArticle, getTitleImage, getQuestion } from "@/action/articles";
import { Carousel } from "antd";
import {onSub, getUserInfo} from "@/action/onSub";
import request from "@/utils/request"
// import Login from "@/Login"
import Header from "@/components/Header";

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //设置页面内初始数据
            value: 'resourceData..',
            message: '123',
            comment: 'comm',
            avatar_img: ''
        }
    }
    componentDidMount() {
        //第一次进入页面
        this.props.actionConnect();
        this.props.article();
        this.props.question();
        this.props.titleImage();
        // this.props.getUserInfo();
        console.log('log this props..', this.props);

        const { submitMsg } = this.props.getSubmit;
        if (submitMsg && submitMsg.data.data) {
            this.setState({ avatar_img: submitMsg.data.data.avatar })
        }
        console.log('log header msg..', submitMsg, this.state.avatar_img);
    }
    componentWillMount() {
        //页面加载完成
        const token = localStorage.getItem('token');
        if (token && token.length === 0) {
            console.log('log 22222222', token, token === null, token.length, token === '');
            this.props.history.push('/');
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        //每次页面数据更新，此生命周期变动
        console.log('log nextPros..', nextProps);
        console.log('log this props2..', this.props);

        const { account } = this.props.getSubmit;
        console.log('log account2..', account && account.data.data);
    }

    formateDate(datetime) {
        function addDateZero(num) {
            return (num < 10 ? "0" + num : num);
        }
        let d = new Date(datetime);
        const formatDatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
        return formatDatetime;
    };
    toQuestion() {
        this.props.history.push('');
    }
    goToDetail = d => {
        // console.log('log didiid..', d);
      this.props.history.push(`/articles/detail/${d}`);
    };

    renderList(dataList) {
        if (dataList) {
            return (
                dataList.map(d => {
                    return (
                        <div key={d.id}>
                            <div className="aside-item">
                                <div className="aside-top">
                                    <Link to={`/user/info/${d.userId}`}>
                                        {/*<img src={[require("../../static/back.jpg")]} alt="error.."/>*/}
                                        <img src={ d.avatar_url } alt="error.."/>
                                    </Link>
                                    <Link to={`/question/detail/${d.id}`}><p>{ d.title }</p></Link>
                                </div>
                                <div className="aside-bottom">
                                    <span className="aside-time">{ this.formateDate(d.updatedAt) }</span>
                                    <span className="aside-praise">{ d.like }赞</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        }
    };
    articlesList(list) {
        console.log('log dataList..', list);
        if (list) {
            return (
                list.map(d => {
                    console.log('log ddd..', d);
                    return (
                        <div key={d.id}>
                            <div className="section-item">
                                <div className="section-left">
                                    <Link to={`/articles/detail/${d.id}`}>
                                        {/*<img src={[require(`${d.imageURL}`)]} alt="error.."/>*/}
                                        {/*<img src={[require(`../../static/back.jpg`)]} alt="error.."/>*/}
                                        <img src={ d.imageUrl } alt="error"/>
                                    </Link>
                                </div>
                                <div className="section-right">
                                    {/*<Link to={`/articles/detail/${d.id}`}>*/}
                                        <div className="item-top" onClick={() => this.goToDetail(d.id)}>
                                            <a>{ d.title }</a>
                                            <p>{ d.comment }</p>
                                        </div>
                                    {/*</Link>*/}
                                    <div className="item-bottom">
                                        <span className="item-tips">
                                            <Link to={`/user/info/${d.userId}`}>
                                                {/*<img src={[require("../../static/back.jpg")]} alt="error.."/>*/}
                                                <img src={ d.avatar_url } alt="error.."/>
                                            </Link>
                                        </span>
                                        <span>eyes{ d.watch }</span>
                                        <span>praise</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        }
    };

    render() {
        console.log('log page props..', this.props);

        const { questionInfo, articles, submitMsg } = this.props.articlesInfo;
        console.log('log articles', questionInfo, articles);
        console.log('log img ava..', this.state.avatar_img);

        console.log('log info..', this.state.info);

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
                <Header history={this.props.history} submitMsg={this.state.avatar_img}/>
                <div className="slide-box">
                    <img src={[require("../../static/back.jpg")]} alt="error.." className="slide-img"/>
                </div>
                <div className="section">
                    <div className="content-box">
                        <div className="content-box-left">
                            {questionInfo && questionInfo.data.data ? (
                                <div>
                                    { this.renderList(questionInfo && questionInfo.data.data) }
                                </div>
                            ) : (
                                <div>
                                    <div className="aside-item">
                                        <div className="aside-top">
                                            <img src="#" alt="error.."/>
                                            <p>暂无内容</p>
                                        </div>
                                        <div className="aside-bottom">
                                            <span className="aside-time">2020-10-09 11:10</span>
                                            <span className="aside-praise">赞</span>
                                        </div>
                                    </div>
                                </div>
                            )
                            }
                        </div>
                        <div className="content-box-right">
                            { articles && articles.data.data ? (
                                this.articlesList(articles && articles.data.data)
                            ) : (
                                <div className="section-item">
                                    {/*<div className="section-left">
                                        <img src={[require("../../static/back.jpg")]} alt="error.."/>
                                    </div>
                                    <div className="section-right">
                                        <div className="item-top">
                                            <a>我的足迹我的足迹我的足迹我的足迹我的足迹我的足迹我的足迹我的足迹我的足迹我的足迹我的足迹我的足迹我的足迹我的足迹我的足迹我的足迹</a>
                                            <p>记录生活的每一步记录生活的每一步记录生活的每一步记录生活的每一步记录生活的每一步记录生活的每一步记录生活的每一步记录生活的每一步记录生活的每一步记录生活的每一步记录生活的每一步记录生活的每一步记录生活的每一步记录生活的每一步记录生活的每一步记录生活的每一步</p>
                                        </div>
                                        <div className="item-bottom">
                                        <span className="item-tips">
                                            <img src={[require("../../static/back.jpg")]} alt="error.."/>
                                        </span>
                                            <span>eyes`~</span>
                                            <span>praise</span>
                                        </div>
                                    </div>*/}
                                    <h3>暂无内容</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="footer"></div>

                {/*{ <Login {...this.props}/> }*/}
            </div>
        )
    }
}

const mapStateToPeops = state => ({
    connectMsg: state.getMsg.connection,
    logout: state.getMsg.logout,
    getSubmit: state.getSub,
    articlesInfo: state.articles
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        actionConnect: toConnect,
        actionLogout: toLogout,
        onSub,
        getUserInfo,
        article: getArticle,
        question: getQuestion,
        titleImage: getTitleImage
    }, dispatch);
};
export default connect(mapStateToPeops, mapDispatchToProps)(HomePage)
