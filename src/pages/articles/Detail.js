import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import { getEventDetail } from "@/action/onSub";
import * as articles from "@/action/articles";
import Header from "@/components/Header";
import formateDate from "@/utils/formateDate";
import { Link } from "react-router-dom";
import BraftEditor from "@/components/Editor";
import InformationPop from "@/components/InformationPop";
import {Button, Icon, notification} from 'antd'

import "./Detail.less"

class ArtDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventId: '',
            eventDetail: '',
            comment: '',
            userInfo: {},
            isClicked: false,
        }
    }

    componentDidMount() {
        const { match } = this.props;
        console.log('log match..', match, match.params.activeId);

        this.props.getEventDetail(match.params.activeId);
        console.log('log detail props..', this.props);

    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log detail next.', nextProps, this.props);

        const { eventDetail, account } = nextProps.getSubmit;
        const { isPubComment, isCommentLike } = nextProps;

        if (eventDetail) {
            this.setState({ eventDetail: eventDetail })
        }
        if (isPubComment && isPubComment.data.code === 200 && this.state.isClicked) {
            this.props.getEventDetail(this.props.match.params.activeId);
            this.setState({ isClicked: false })
        }
        if (isCommentLike && isCommentLike.data.code === 200 && this.state.isClicked) {
            this.props.getEventDetail(this.props.match.params.activeId);
            this.setState({ isClicked: false })
        }
    }
    subUserInfo = info => {
        this.setState({ userInfo: info })
    };
    eventStatus = (item) => {
        console.log('log some.', item, this.state.eventDetail);
        this.setState({ comment: item })
    };
    onRef = (ref) => {
        this.child = ref
    };
    pubComment = () => {
        if (localStorage.getItem("token") !== null && this.state.comment !== '') {
            this.setState({ isClicked: true });
            this.props.pubCommentInfos({
                articleId: this.state.eventDetail.data.data.id,
                userId: this.state.userInfo.id,
                comment: this.state.comment
            });
            this.child.handleClick();
            InformationPop('发布成功！');
        } else if (this.state.comment === '') {
            InformationPop('评论不能为空！');
        } else {
            InformationPop('未登录！');
        }
    };
    handleLike = (id, alreadyLiked) => {
        console.log('log already.', id, alreadyLiked, this.state.userInfo);
        this.setState({ isClicked: true });
        if (localStorage.getItem('token') === null) {
            InformationPop('未登录！');
        } else if (alreadyLiked) {
            this.props.isLikeComment({ userId: this.state.userInfo.id, isLiked: false, id });
            this.setState({ isLike: false });
            InformationPop('点赞已取消');
        }else {
            this.props.isLikeComment({ userId: this.state.userInfo.id, isLiked: true, id });
            this.setState({ isLike: true });
            InformationPop('点赞成功！')
        }
    };

    render() {
        const eventInfo = (this.state.eventDetail && this.state.eventDetail.data && this.state.eventDetail.data.data) || {};

        return (
            <div className="eventDetail">
                <Header history={this.props.history} userInfo={this.subUserInfo} isGetInfo={true}/>
                <div className="event-title">
                    <div className="title-img">
                        { eventInfo && eventInfo.imageUrl ? (
                            <img src={ eventInfo.imageUrl ?  /\/(upload\w*)/.exec(eventInfo.imageUrl) === null ? eventInfo.imageUrl : `/api/test/didRoute${eventInfo.imageUrl}` : null } alt="titleImg.."/>
                        ) : (
                            <img src="#"  alt="titleImg.."/>
                        )}
                    </div>
                    <div className="content-title">
                        <h2>{ eventInfo && eventInfo.title }</h2>
                    </div>
                </div>
                <div className="event-content">
                    { eventInfo ? (
                        <div className="content-writer">
                            <Link to={`/user/info/${eventInfo.userId}`}>
                                <img src={ eventInfo.avatar_url ?  /\/(upload\w*)/.exec(eventInfo.avatar_url) === null ? eventInfo.avatar_url : `/api/test/didRoute${eventInfo.avatar_url}` : null } alt="writerImg" style={{ width: '120px', height: '120px', borderRadius: '50%' }}/>
                            </Link>
                            <div className="writer-info">
                                { eventInfo.writer }
                                <span className="updatedAt">{ formateDate(eventInfo.updatedAt || eventInfo.time) }</span>
                            </div>
                        </div>
                    ) : null}

                    <p>文本内容</p>
                    <div className="content-items">
                        { eventInfo ? (
                            <p dangerouslySetInnerHTML={{__html: eventInfo.comment}}></p>
                            ) : (
                            <p>暂无内容！</p>
                        )
                        }
                    </div>
                </div>
                <hr style={{ width: '95%', border: '1px dashed' }}/>
                <div className="event-comment">
                    <p style={{ fontSize: '18px', color: '#3d9494' }}>评论区</p>
                        {
                            eventInfo && eventInfo.commentList && eventInfo.commentList.length !== 0 ?
                                eventInfo.commentList.map(d =>
                                    <div className="comment-content"  key={d.id}>
                                        <div className="comment-content-box">
                                            <p dangerouslySetInnerHTML={{ __html: d.comment }} />
                                            <img src={ d.avatar_url ?  /\/(upload\w*)/.exec(d.avatar_url) === null ? d.avatar_url : `/api/test/didRoute${d.avatar_url}` : null } alt="error"/>
                                            <span dangerouslySetInnerHTML={{ __html: d.nickName }} style={{ display: 'inline-block', width: '55px' }}/>
                                            {
                                                d.isAlreadyLiked ?
                                                    <Icon type="smile" className="icon-dot" style={{ color: '#108ee9' }} onClick={() => this.handleLike(d.id, d.alreadyLiked)}/> :
                                                    <Icon type="smile" className="icon-dot" style={{ color: '#000' }} onClick={() => this.handleLike(d.id, d.alreadyLiked)}/>
                                            }
                                            <span style={{ marginLeft: '5px' }} dangerouslySetInnerHTML={{ __html: d.liked || 0 }} />
                                        </div>
                                    </div>
                                ) :
                                <div className="comment-content">
                                    <div className="comment-content-box">
                                        <p style={{ textAlign: 'center', color: 'gray', fontSize: '18px' }}>暂无内容！</p>
                                        <p style={{ textAlign: 'center', color: 'gray', fontSize: '18px' }}>快快来留下你的评论吧~</p>
                                    </div>
                                </div>
                        }
                </div>
                <div style={{ width: '75%' }}>
                    <BraftEditor getStatus={ this.eventStatus } onRef={this.onRef}/>
                </div>
                <Button style={{ marginTop: '20px', marginRight: '120px', float: 'right', border: '1px solid #2d8cf0' }} onClick={() => this.props.history.goBack()}>返回</Button>
                <Button type="primary" style={{ marginTop: '20px', marginRight: '50px', float: 'right', width: '120px' }} onClick={this.pubComment}>发表评论</Button>
                <div className="detail-footer" />
            </div>
        )
    }
}

const mapStateToPeops = state => ({
    getSubmit: state.getSub,
    isPubComment: state.articles.isPubComment,
    isCommentLike: state.articles.isCommentLike,
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getEventDetail,
        pubCommentInfos: articles.pubCommentInfos,
        isLikeComment: articles.isLikeComment,
    }, dispatch);
};

export default connect(mapStateToPeops, mapDispatchToProps)(ArtDetail);
