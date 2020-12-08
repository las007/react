import React from "react";
import { Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

class CommentPage extends React.Component{
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log test page...');
    }

    clickEvent = () => {
        console.log('log click event..', this.props);
        this.props.history.push("/");
    };
    goBack = () => {
        // this.props.history.push("/getState");
    };
    homePage = () => {
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                {/*<p>this is test page....</p>
                <hr/>
                <button onClick={this.clickEvent}>点击返回首页。。。。</button>*/}
                <h1>
                    there are nothing....
                </h1>
                <button onClick={this.goBack}>goBack</button>
                <button onClick={this.homePage}>homePage</button>
                <Link to="/">返回首页。。</Link>
            </div>
        )
    }
}

export default CommentPage;
