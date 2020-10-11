import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";

class ArtDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('log detail props..', this.props);
    }
    componentWillReceiveProps(nextProps, nextContext) {
    }

    render() {
        return (
            <div>
                <h1>article detail</h1>
            </div>
        )
    }
}

const mapStateToPeops = state => ({

});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({

    }, dispatch);
};

export default connect(mapStateToPeops, mapDispatchToProps)(ArtDetail);
