import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import {toLogout} from "@/action/toConnect";
import { onSub } from "@/action/onSub";
import request from "@/utils/request";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('log header..', this.props);
    }
    componentWillReceiveProps(nextProps, nextContext) {
    }


    handleClick = () => {
        console.log('log handleClick..', this.props);
        this.props.history.push("/getState");
    };
    toRequest = () => {
        console.log('submit request..')
        request({
            url: '/api/getHomePage',
            headers: {
                kitToken: 'abcdefghijklmn...'
            },
            data: {}
        }).then(result123 => {
            console.log('log result123..', result123)
        });
    };
    toLogin = () => {
        this.props.history.push('/login');
    };

    logout = () => {
        console.log('log to logout..');
        localStorage.removeItem('token');
        this.props.actionLogout();
        let item = {isLogout: true};
        // this.props.onSub(null, null, true);
        this.props.onSub(item);
        let that = this;
        setTimeout(function () {
            console.log('log that props..', that.props);
            that.props.history.push('/');
        }, 500);
    };

    render() {
        const letStyle = {
            fontSize: '16px',
            fontWeight: 'bold'
        }
        return (
            <div style={letStyle}>
                <p className="content">this is a new home page...</p>
                <button onClick={this.handleClick}>点击跳转页面</button>
                <input type="button" value="提交"/>

                <button onClick={this.toRequest}>发起 request 请求</button>

                <button onClick={this.toLogin}>toLogin</button>

                <button onClick={this.logout}>logout</button>

                {/*<Link to="/getState">*/}
                {/*    <p>页面跳转</p>*/}
                {/*</Link>*/}
                <hr/>
            </div>
        )
    }
}

const mapStateToPeops = state => ({

});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        onSub,
        actionLogout: toLogout
    }, dispatch);
};

export default connect(mapStateToPeops, mapDispatchToProps)(Header);
