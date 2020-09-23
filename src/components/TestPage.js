import React from "react";
import { Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

class TestPage extends React.Component{
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log('log test..', this.props);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log test page...');
    }

    clickEvent = () => {
      console.log('log click event..', this.props);
      this.props.history.push("/commentPage");
    };
    render() {
        return (
            <div>
                <p>this is test page....</p>
                <hr/>
                <button onClick={this.clickEvent}>点击返回首页。。。。</button>
                <hr/>

                <Link to="/commentPage">
                    to comment Page
                </Link>
            </div>
        )
    }
}

export default TestPage;
