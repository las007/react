import { Route, Switch, HashRouter } from "react-router-dom";
import React from "react";

import TestPage from "./components/TestPage"
import HomePage from "./pages/home/HomePage"
import CommentPage from "./components/CommentPage";
import Login from "./pages/login/Login"

export default class ConstRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log routes next props...', nextProps)
    }

    render() {
        // const history = syncHistoryWithStore(useHistory, this.props.store);
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={ Login }/>
                    <Route path="/home" component={ HomePage }/>
                    <Route path="/getState" component={ TestPage }/>
                    <Route path="/commentPage" component={ CommentPage }/>
                </Switch>
            </HashRouter>
        )
    }
}
