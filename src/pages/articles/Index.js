import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";

class ArtIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }
    componentWillReceiveProps(nextProps, nextContext) {
    }

    render() {
        return (
            <div>
                <h1>articles index</h1>
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

export default connect(mapStateToPeops, mapDispatchToProps)(ArtIndex);
