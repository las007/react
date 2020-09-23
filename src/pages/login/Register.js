import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./Register.less";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }
    componentWillReceiveProps(nextProps, nextContext) {
    }

    render() {
        return (
            <div className="register-page">
                <h1>this is register page...</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({

    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)
