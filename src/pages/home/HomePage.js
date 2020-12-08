import React from 'react';
import './HomePage.less';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {toConnect, toLogout} from "@/action/toConnect";
import { getArticle, getTitleImage, getQuestion } from "@/action/articles";
import { Carousel, Icon, notification, Spin, Button } from "antd";
import {onSub, getUserInfo, isLike} from "@/action/onSub";
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
            avatar_img: '',
            isLike: false,
            isLoading: true,
            mineInfo: {},
            eventDetail: {},
            alreadyLiked: false
        }
    }
    componentDidMount() {
        //第一次进入页面
        // this.props.actionConnect();
        // this.props.article();
        this.props.question();
        // this.props.getComment()

        // this.props.titleImage();
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
        this.props.question();

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
        const { getSubmit, articlesInfo } = nextProps
        console.log('log account2..', account && account.data.data);
        if (account && account.data.data) {
            console.log('log get sub.', getSubmit)
            this.setState({ mineInfo: account.data.data, eventDetail: getSubmit })
            // this.props.question();
        }
        if (articlesInfo && articlesInfo.questionInfo && this.state.isLoading) {
            console.log('log 00000000000000000000000')
            this.props.getComment()
            this.setState({ isLoading: false })
        }
        if (getSubmit && getSubmit.isLike) {
            // setTimeout(window.location.reload, 3000)
            window.location.reload();
            // this.props.getComment()

        }

        /*if (articlesInfo && articlesInfo.articles) {
            this.props.question()
        }*/
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
    handleLike = (id, alreadyLiked) => {
        console.log('log none.', id, this.state.mineInfo)
        const parentNode = document.querySelector('.content-box-right');
        console.log('log ele..', parentNode);
        /*const newChildNode = document.createElement('div');
        newChildNode.className = 'noise';
        newChildNode.width = '300px';
        newChildNode.height = '200px';
        newChildNode.backgroundColor = '#ff4c60';
        parentNode.appendChild(newChildNode);*/


        let scrollTop = document.body.scrollTop+document.documentElement.scrollTop;
        // let scrollTop= document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        console.log('scrollTop', scrollTop);

        if (alreadyLiked) {
            console.log('log two.', this.state.eventDetail)
            this.props.isLike(this.state.mineInfo.id, false, id);
            this.setState({ isLike: false });
            notification['warning']({
                message: '取消点赞',
                // description: '请重新输入',
                duration: 0.8,
                // icon: /*<Icon type="smile" style={{ color: '#108ee9' }} />*/ <span>123</span>,
                icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                closeIcon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                // top: '100px' + scrollTop,
                placement: "topRight",
                // getContainer: () => this.$refs.contentRight,
                className: 'wrap-dots',
                style: {
                    width: 180,
                    backgroundColor: "#282c34",
                    position: "absolute",
                    top: scrollTop + 90,
                    // top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: 8,
                    padding: 10,
                    textAlign: "center",
                    color: 'white',
                    lineHeight: '50px'
                },
            });
        }else {
            console.log('log one.', this.state.mineInfo, this.state.eventDetail)
            /*if (this.state.eventDetail.isLike.data.isLike) {

            }*/
            this.props.isLike(this.state.mineInfo.id, true, id);
            this.setState({ isLike: true });
            notification['warning']({
                message: '点赞成功',
                // description: '请重新输入',
                duration: 0.8,
                icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                closeIcon: <span>123</span>,
                top: '100px',
                placement: "topRight",
                className: 'wrap-dots',
                style: {
                    width: 180,
                    backgroundColor: "#282c34",
                    position: "absolute",
                    top: scrollTop + 90,
                    // top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: 8,
                    padding: 10,
                    textAlign: "center",
                    color: '#ffffff',
                    lineHeight: '50px'
                },
            });
        }
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
                                    <span className="aside-praise">{ d.isLike }赞</span>
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
                                        {/*<Icon type="smile" style={{ color: '#108ee9' }} />*/}
                                        <span style={{ color: '#4c4c4c'}}>watch·{ d.watch }</span>
                                        { this.state.isLike ? (
                                            <span style={{ color: '#4c4c4c'}} key={d.id}>·{ d.isLike + 0 || 0 }</span>
                                        ) : (
                                            <span style={{ color: '#4c4c4c'}}>·{ d.isLike || 0 }</span>
                                        )}
                                        {
                                            d.alreadyLiked ?
                                                <Icon type="smile" className="icon-dot" style={{ color: '#108ee9' }} onClick={() => this.handleLike(d.id, d.alreadyLiked)}/> :
                                                <Icon type="smile" className="icon-dot" style={{ color: '#000' }} onClick={() => this.handleLike(d.id, d.alreadyLiked)}/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        }
    };
    clickHandle = () => {
        console.log('log clickc.');
        request({
            url: '/api/answer/getTempCache',
            method: 'get',
            data: {}
        }).then(result => {
            console.log('log arti.', result);
        })
    }

    render() {
        console.log('log page props..', this.props);

        const { questionInfo, articles, submitMsg } = this.props.articlesInfo;
        console.log('log articles', questionInfo, articles);
        console.log('log img ava..', this.state.avatar_img);

        return (
            <div className="container">

                <Spin spinning={this.state.isLoading}>
                    <span>显示文本信息 info</span>

                <Header history={this.props.history} submitMsg={this.state.avatar_img}/>
                <div className="slide-box">
                    <Carousel autoplay autoplaySpeed={3500}  effect="fade">
                        <div>
                            <div className="contentStyle">
                                <h1 className="carousel-title">显示文本信息 info</h1>
                                <p className="carousel-rich-title">副标题简要描述...</p>
                                <img src={[require("../../static/back.jpg")]} alt="error.." className="slide-img"/>
                            </div>
                        </div>
                        <div>
                            <div className="contentStyle">
                                <h1 className="carousel-title">显示文本信息 info</h1>
                                <p className="carousel-rich-title">副标题简要描述...</p>
                                <img src={[require("../../static/forget_bg.jpg")]} alt="error.." className="slide-img"/>
                            </div>
                        </div>
                        <div>
                            <div className="contentStyle">
                                <h1 className="carousel-title">显示文本信息 info</h1>
                                <p className="carousel-rich-title">副标题简要描述...</p>
                                <img src={[require("../../static/forget_bg2.png")]} alt="error.." className="slide-img"/>
                            </div>
                        </div>
                        <div>
                            <div className="contentStyle">
                                <h1 className="carousel-title">显示文本信息 info</h1>
                                <p className="carousel-rich-title">副标题简要描述...</p>
                                <img src={[require("../../static/register_bg.jpg")]} alt="error.." className="slide-img"/>
                            </div>
                        </div>
                    </Carousel>
                </div>
                <div className="section">
                    <div className="content-box">
                        <div className="content-box-left">
                            {questionInfo && questionInfo.data.data ? (
                                <div>
                                    { this.renderList(questionInfo.data.data) }
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
                        <div className="content-box-right" ref="contentRight">
                            { articles && articles.data.data ? (
                                this.articlesList(articles.data.data)
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
                                    {/*<Button type="primary" onClick={this.clickHandle}>get tempCache</Button>*/}

                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="footer"></div>

                {/*{ <Login {...this.props}/> }*/}

                </Spin>

            </div>
        )
    }
}

const mapStateToPeops = state => ({
    connectMsg: state.getMsg.connection,
    logout: state.getMsg.logout,
    getSubmit: state.getSub,
    articlesInfo: state.articles,
    getMsg: state.getSub.testMsg
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        actionConnect: toConnect,
        actionLogout: toLogout,
        onSub,
        getUserInfo,
        isLike,
        getComment: getArticle,
        question: getQuestion,
        titleImage: getTitleImage
    }, dispatch);
};
export default connect(mapStateToPeops, mapDispatchToProps)(HomePage)
