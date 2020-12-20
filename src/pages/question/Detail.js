import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import * as questions from "@/action/articles";
import * as answer from "@/action/answer";
import Header from "@/components/Header";

import './Detail.less';
import formatDate from "@/components/formatDate";
import BraftEditor from "@/components/Editor";
import {Button, Icon} from "antd";
import InformationPop from "@/components/InformationPop";

class QADetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionInfo: {},
            comment: '',
            isClicked: false,
            answerList: {},
            isGetDataSome: false,
            userInfo: {},
            isLike: false,
        };
    }

    componentDidMount() {
        console.log('log props history..', this.props.match.params);
        const { params } = this.props.match;
        console.log('log qad..', this.props, params.id);
        // this.props.questionDetail(params.id);
        this.props.getQuestionInfo(params.id);
        // this.props.getAnswerList();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log qa next.', nextProps, this.props);
        const { getQuestionInfoData, isGetAnswerListData, isGetAnswerListFetched, isPubAnswerContentData, isSubLikeAnswerData } = nextProps;
        if (getQuestionInfoData && getQuestionInfoData.data && !this.state.isGetDataSome) {
            this.setState({ questionInfo: getQuestionInfoData.data.data, isGetDataSome: true });
            this.props.getAnswerList(this.props.match.params.id);
        }
        if (isGetAnswerListData && isGetAnswerListData.data) {
            this.setState({ answerList: isGetAnswerListData.data, isGetDataSome: true })
        }
        if (isPubAnswerContentData && isPubAnswerContentData.data && this.state.isClicked) {
            InformationPop('发布成功！');
            // this.props.getQuestionInfo(this.props.match.params.id);
            this.props.getAnswerList(this.props.match.params.id);
            this.setState({ isClicked: false });
        }
        if (isSubLikeAnswerData && isSubLikeAnswerData.data && this.state.isClicked) {
            this.props.getAnswerList(this.props.match.params.id);
            this.setState({ isClicked: false })
        }
    }
    questionStatus = (item) => {
        console.log('log some.', item, this.state.eventDetail);
        this.setState({ comment: item })
    };
    onRef = (ref) => {
        this.child = ref
    };
    subUserInfo = info => {
        this.setState({ userInfo: info })
    };
    handleLike = (id, alreadyLiked) => {
        console.log('log already.', id, alreadyLiked, this.state.userInfo);
        this.setState({ isClicked: true });
        if (localStorage.getItem('token') === null) {
            InformationPop('未登录！');
        } else if (alreadyLiked) {
            // this.props.isLikeComment({ userId: this.state.userInfo.id, isLiked: false, id });
            this.props.subAnswerLike({ userId: this.state.userInfo.id, isLiked: false, id});
            this.setState({ isLike: false });
            InformationPop('点赞已取消');
        }else {
            // this.props.isLikeComment({ userId: this.state.userInfo.id, isLiked: true, id });
            this.props.subAnswerLike({ userId: this.state.userInfo.id, isLiked: true, id});
            this.setState({ isLike: true });
            InformationPop('点赞成功！')
        }
    };
    pubAnswer = () => {
        if (localStorage.getItem("token") !== null && this.state.comment !== '') {
            this.setState({ isClicked: true });
            this.props.pubAnswer({
                questionId: this.props.match.params.id,
                userId: this.state.userInfo.id,
                content: this.state.comment
            });
            this.child.handleClick();
        } else if (this.state.comment === '') {
            InformationPop('回答不能为空！');
        } else {
            InformationPop('未登录！');
        }
    };

    render() {
        console.log('log info data.', this.state.questionInfo, this.state.answerList);
        return (
            <div className="question-detail">
                <Header history={this.props.history} userInfo={this.subUserInfo} isGetInfo={true}/>

                <div className="qa-detail-content">
                    <div className="content-up">
                        <h1>{ this.state.questionInfo.title }</h1>
                        <div className="qa-belong-user">
                            <img src={ this.state.questionInfo.avatar_url ?  /\/(upload\w*)/.exec(this.state.questionInfo.avatar_url) === null ? this.state.questionInfo.avatar_url : `/api/test/didRoute${this.state.questionInfo.avatar_url}` : null }
                                 alt="qa-belong-img"
                            />
                            <span className="qa-creator-name">{ this.state.questionInfo.nickName }</span>
                            <span className="qa-create-time">{ formatDate(this.state.questionInfo.createdAt) }</span>
                        </div>
                        <div className="detail-content-box" dangerouslySetInnerHTML={{ __html: this.state.questionInfo.comment }}/>
                    </div>
                    <div className="content-bottom">
                        <h1>回答</h1>
                        { this.state.answerList && this.state.answerList.data ? (
                            this.state.answerList.data.map(item => (
                                <div className="answer-list-items" key={item.id}>
                                    <div className="answer-item">
                                        <div className="answer-essay">
                                            <p dangerouslySetInnerHTML={{ __html: item.content }}/>
                                        </div>
                                        <div className="answer-msg">
                                            <img src={ item.avatar_url ?  /\/(upload\w*)/.exec(item.avatar_url) === null ? item.avatar_url : `/api/test/didRoute${item.avatar_url}` : null }
                                                 alt="qa-belong-img"
                                                 onClick={() => this.props.history.push(`/user/info/${item.userId}`)}/>
                                            <span className="writer-nick-name">{ item.nickName || 'las007' }</span>
                                            <span className="answer-like">
                                                {item.isAlreadyLiked ?
                                                        <Icon type="smile" className="icon-dot" style={{ color: '#108ee9' }} onClick={() => this.handleLike(item.id, item.isAlreadyLiked)}/> :
                                                        <Icon type="smile" className="icon-dot" style={{ color: '#000' }} onClick={() => this.handleLike(item.id, item.isAlreadyLiked)}/>}
                                            </span>
                                            <span style={{ marginLeft: '5px' }}>{ item.liked }</span>
                                            <span className="answer-time">{ formatDate(item.createdAt) }</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : <div className="answer-list-items">
                            <div className="answer-item">
                                <div className="answer-essay">
                                    <p>NAN</p>
                                </div>
                                <div className="answer-msg">
                                    <img src="#" alt="err."/>
                                    <span className="writer-nick-name">NAN</span>
                                    <span className="answer-like">NAN</span>
                                    <span className="answer-time">NANNAN</span>
                                </div>
                            </div>
                        </div> }
                    </div>

                    <div style={{ width: '770px', marginLeft: '-35px', marginTop: '20px' }}>
                        <BraftEditor getStatus={this.questionStatus} onRef={this.onRef}/>
                    </div>
                    <Button style={{ marginTop: '20px', marginRight: '120px', float: 'right', border: '1px solid #2d8cf0' }} onClick={() => this.props.history.goBack()}>返回</Button>
                    <Button type="primary" style={{ marginTop: '20px', marginRight: '50px', float: 'right', width: '120px' }} onClick={this.pubAnswer}>发布回答</Button>
                    <div className="detail-footer" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    articlesInfo: state.articles,
    getQuestionInfoData: state.articles.getQuestionInfoData,
    isGetAnswerListData: state.answer.isGetAnswerListData,

    isGetAnswerListFetched: state.answer.viewStatus.isGetAnswerListFetched,
    isPubAnswerContentData: state.answer.isPubAnswerContentData,
    isSubLikeAnswerData: state.answer.isSubLikeAnswerData
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        question: questions.getQuestion,
        questionDetail: questions.getQADetail,
        getQuestionInfo: questions.getQuestionInfo,
        getAnswerList: answer.getAnswerList,
        pubAnswer: answer.pubAnswerContent,
        subAnswerLike: answer.subLikeAnswer,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(QADetail);
