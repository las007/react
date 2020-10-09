import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import { getQuestion, getQADetail } from "@/action/articles";

class QADetail extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('log props history..', this.props.match.params);
        const { params } = this.props.match;
        console.log('log qad..', this.props, params.id);
        this.props.questionDetail(params.id);
    }
    componentWillReceiveProps(nextProps, nextContext) {
    }

    render() {
        return (
            <div>
                <h1>question detail</h1>
            </div>
        )
    }
}

const mapStateToPeops = state => ({
    articlesInfo: state.articles
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        question: getQuestion,
        questionDetail: getQADetail
    }, dispatch);
};

export default connect(mapStateToPeops, mapDispatchToProps)(QADetail);
