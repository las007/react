import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import Header from "@/components/Header";
import {Input, Form} from "antd";
import moment from 'moment';
import formatDate from '@/components/formatDate';

import './Index.less';
import * as articles from "@/action/articles";

const FormItem = Form.Item;
const FormItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 18
    }
};
const dateFormat = "YYYY-MM-DD hh:mm:ss";

class QAIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          questionDetail: {}
        };
    }

    componentDidMount() {
        this.props.question();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log qa next.', nextProps);
        const { questionInfo } = nextProps.articlesInfo;
        if (questionInfo && questionInfo.data) {
            console.log('log set data.', questionInfo.data);
            this.setState({ questionDetail: questionInfo.data })
        }
    }
    jumpToDetail = (select_code, id) => {
        switch (select_code) {
            case 1:
                this.props.history.push(`/question/detail/${id}`);
                break;
            case 2:
                this.props.history.push(`/user/info/${id}`);
                break;
            default:
                return null
        }
    };

    render() {
        const { form } = this.props;
        console.log('log qa detail.', this.state.questionDetail);

        return (
            <div className="question-page">
                <Header history={this.props.history} />

                <div className="qa-content-box">
                    <h1>question | index</h1>
                    <FormItem {...FormItemLayout}>
                        <div className="afterText">
                            <span className="span f-fr" style={{width:150}}>Search</span>
                            {form.getFieldDecorator('searchQA')(
                                <Input placeholder="提问前请先搜索，看看你的问题是否有小伙伴解决了" />
                            )}
                        </div>
                        <div className="qa-content-left">
                            { this.state.questionDetail.data ? this.state.questionDetail.data.map(item => (
                                <div className="qa-list-items" key={item.id}>
                                    <div className="qa-item-content" onClick={() => this.jumpToDetail(1, item.id)}>
                                        <p className="qa-title">{ item.title }</p>
                                        <div className="qa-describe" dangerouslySetInnerHTML={{ __html: item.comment }}/>
                                    </div>
                                    <div className="qa-item-footer">
                                        <img src={ item.avatar_url ?  /\/(upload\w*)/.exec(item.avatar_url) === null ? item.avatar_url : `/api/test/didRoute${item.avatar_url}` : null }
                                             alt="qa-belong-img"
                                             onClick={() => this.jumpToDetail(2, item.userId)}/>
                                        <span className="qa-nick-name">[题主]{ item.nickName }</span>
                                        <span className="qa-like">{ item.like }</span>
                                        <span className="qa-create-time">{ formatDate(item.createdAt) }</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="qa-list-items">
                                    <div className="qa-item-content">
                                        <p className="qa-title">qa title</p>
                                        <div className="qa-describe">qa describe</div>
                                    </div>
                                    <div className="qa-item-footer">
                                        <img src="#" alt="qa-belong-img"/>
                                        <span className="qa-like">like num</span>
                                        <span className="qa-create-time">qa-create-time</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="qa-content-right" />
                    </FormItem>
                </div>
            </div>
        )
    }
}

const QAIndexForm = Form.create()(QAIndex);

const mapStateToPeops = state => ({
    articlesInfo: state.articles,
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        question: articles.getQuestion,
    }, dispatch);
};

export default connect(mapStateToPeops, mapDispatchToProps)(QAIndexForm);
