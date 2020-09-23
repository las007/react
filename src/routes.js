import { Route, Switch, HashRouter, Router } from "react-router-dom";
import React from "react";

import TestPage from "./components/TestPage"
import HomePage from "./pages/home/HomePage"
import CommentPage from "./components/CommentPage";
import Login from "./pages/login/Login"
import Forget from "@/pages/login/Forget";
import Register from "@/pages/login/Register";

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
                    <Route path="/forget" component={ Forget } />
                    <Route path="/register" component={ Register }/>
                    <Route path="/commentPage" component={ CommentPage }/>
                </Switch>
            </HashRouter>
        )
    }
}
