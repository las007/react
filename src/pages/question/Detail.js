import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import * as questions from "@/action/articles";
import Header from "@/components/Header";

import './Detail.less';
import formatDate from "@/components/formatDate";

class QADetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionInfo: {},
        };
    }

    componentDidMount() {
        console.log('log props history..', this.props.match.params);
        const { params } = this.props.match;
        console.log('log qad..', this.props, params.id);
        this.props.questionDetail(params.id);
        this.props.getQuestionInfo(params.id);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log qa next.', nextProps);
        const { getQuestionInfoData } = nextProps;
        if (getQuestionInfoData && getQuestionInfoData.data) {
            this.setState({ questionInfo: getQuestionInfoData.data.data })
        }
    }

    render() {
        console.log('log info data.', this.state.questionInfo);
        return (
            <div className="question-detail">
                <Header history={this.props.history} />

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
                        <div className="answer-list-items">
                            <div className="answer-item">
                                <div className="answer-essay">
                                    <p>这里写回答内容，正文</p>
                                </div>
                                <div className="answer-msg">
                                    <img src="#" alt="err."/>
                                    <span className="writer-nick-name">las007</span>
                                    <span className="answer-like">is like</span>
                                    <span className="answer-time">answer created time</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToPeops = state => ({
    articlesInfo: state.articles,
    getQuestionInfoData: state.articles.getQuestionInfoData
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        question: questions.getQuestion,
        questionDetail: questions.getQADetail,
        getQuestionInfo: questions.getQuestionInfo,
    }, dispatch);
};

export default connect(mapStateToPeops, mapDispatchToProps)(QADetail);
