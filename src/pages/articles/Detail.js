import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import { getEventDetail } from "@/action/onSub";
import Header from "@/components/Header";
import formateDate from "@/utils/formateDate";
import { Link } from "react-router-dom";
import BraftEditor from "@/components/Editor"


import "./Detail.less"

class ArtDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventId: '',
            eventDetail: ''
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

        const { eventDetail } = nextProps.getSubmit;
        if (eventDetail) {
            this.setState({ eventDetail: eventDetail })
        }
    }

    showElem(dataList) {
        if (dataList) {
            return (
                <div>

                </div>
            )
        }
    };

    render() {
        const eventInfo = this.state.eventDetail.data && this.state.eventDetail.data.data[0];
        console.log('log d props.', eventInfo, this.state.eventDetail);

        return (
            <div className="eventDetail">
                <Header history={this.props.history}/>
                <div className="event-title">
                    <div className="title-img">
                        { eventInfo && eventInfo.imageUrl ? (
                            <img src={ eventInfo.imageUrl }  alt="titleImg.."/>
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
                                <img src={ eventInfo.avatar_url } alt="writerImg" style={{ width: '120px', height: '120px', borderRadius: '50%' }}/>
                            </Link>
                            <div className="writer-info">
                                { eventInfo.writer }
                                <span className="updatedAt">{ formateDate(eventInfo.updatedAt) }</span>
                            </div>
                        </div>
                    ) : null}

                    <p>文本内容</p>
                    <div className="content-items">
                        { eventInfo ? (
                            <p>{ eventInfo.comment }</p>
                        ) : (
                            <p>暂无内容！</p>
                        )
                        }
                    </div>
                </div>
                <hr style={{ width: '95%', border: '1px dashed' }}/>
                <div className="event-comment">
                    <p>评论区</p>
                </div>
                <BraftEditor></BraftEditor>
            </div>
        )
    }
}

const mapStateToPeops = state => ({
    getSubmit: state.getSub,
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getEventDetail
    }, dispatch);
};

export default connect(mapStateToPeops, mapDispatchToProps)(ArtDetail);
