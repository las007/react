import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import {getWriterInfo} from "@/action/onSub";

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('log query.', this.props.match.params)
        const { userId } = this.props.match.params;
        // this.props.getUserInfo()
        this.props.getWriterInfo(userId)
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log user info.', nextProps)
        const { writerDetail } = nextProps.writerDetail
        console.log('log acc.', writerDetail)
    }

    render() {
        const { writerDetail } = this.props.writerDetail
        const acc = writerDetail && writerDetail.data.data[0]
        console.log('log props.', acc)
        return (
            <div className="user-info">
                <h1>userInfo index</h1>
                <div className="title-image">
                    <p>name: { acc && acc.name }</p>
                    <p>nickName: { acc && acc.nickName }</p>
                    <img style={{ width: '100%'}} src={ acc ?  /\/(upload\w*)/.exec(acc && acc.avatar_url) === null ? acc.avatar_url : `/api/test/didRoute${acc.avatar_url}` : null } alt="eror.."/>
                </div>
                <div className="content-box">

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    writerDetail: state.getSub
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getWriterInfo
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
