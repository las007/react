import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Input, Button, Row, Col, Table} from "antd";
import {onSub} from "@/action/onSub";
import "./Login.less";
import PropTypes from "prop-types"

const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: ''
        };
    }
    componentDidMount() {
        console.log('log login did..', this.props);
        // this.props.onSub();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log login nextProps...', nextProps, this.props.getSubmit);
        console.log('log this context..', this.context);

        Promise.resolve(nextProps.getSubmit).then(result => {
            console.log('log two..', result);
            if (result.data && result.data.code === 20000) {
                console.log('log getSub mess..', result);
                this.props.history.push('/commentPage');
                return result.data
            }else if (result.data && result.data.code === 50001) {
                console.log('log 500');
                return null;
            }
        });
    }

    onSubmit = () => {
        console.log('log logign message..', this.state);
        console.log('log getSubmit..', this.props.getSubmit);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('log values..', values);
                let that = this;
                if(this.state.account === '123') {
                    console.log('log suees..', that.props);
                    this.props.history.push("/getState");
                }
                // this.props.onSub(this.state.account, this.state.password);
                this.props.onSub(values.username, values.password);
            }
        });
    };
    inputChange = (e) => {
        this.setState({
            account: e.target.value,
        })
    };
    inputChange2 = e => {
      this.setState({
          password: e.target.value
      })
    };
    render() {
        console.log('log getSubmit2..', this.props.getSubmit, this.props.form);
        const { getFieldDecorator } = this.props.form;
/*        Promise.resolve(this.props.getSubmit).then(result => {
            console.log('log two..', result);
            if (result.data && result.data.code === 20000) {
                console.log('log getSub mess..', result);
                return result.data
            }else if (result.data && result.data.code === 50001) {
                console.log('log 500');
                return null;
            }
        });*/
        return (
            <div className="login">
                <div className="contentBox">
                    <div style={{ height: "22%", textAlign: 'center'}}>
                        <h1>this is login page..</h1>
                        <hr/>
                    </div>
                    <div className="inputValue">
                        {/*<div className="input-text">
                            <span>账号：</span><input type="text" value={this.state.account} onChange={e => this.inputChange(e)} placeholder="请输入账号..."/>
                            <br/>
                            <span>密码：</span><input type="password" value={this.state.password} onChange={this.inputChange2} placeholder={"请输入密码"}/>
                        </div>
                        <br/>
                        <div className="input-button">
                            <input type="submit" value="登录" onClick={this.onSubmit}/>
                        </div>*/}

                        <Form onSubmit={this.onSubmit} className="login-submit">
                            <FormItem className="form-item">
                                <span>账号：</span>
                                {getFieldDecorator("username", {
                                    rules: [{ required: true, message: 'usernameusernamusernmeer!'}]
                                })(
                                    <Input type="text" placeholder="请输入账户名称..." className="form-item-input"/>
                                )}
                            </FormItem>
                            <FormItem className="form-item">
                                <span>密码：</span>
                                {getFieldDecorator("password", {
                                    rules: [
                                        { required: true, message: 'pw!!!!'},
                                        { password: {
                                            reg: /^[a-zA-Z0-9_\-~*()!@#$%^.·`,&]+$/,
                                            errMsg: '英文字母（区分大小写）、数字，可含半角标点符号·.,-_~ *()!@#$%^&',
                                        }}]
                                })(
                                    <Input type="password" placeholder="请输入账户密码.." className="form-item-input"/>
                                )}
                            </FormItem>
                            <FormItem className="form-button">
                                <Button type="primary" htmlType="submit">
                                    立即登录
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                    <div className="login-footer">
                        <p className="footer-left">没有帐户？<a href="#">立即注册</a></p>
                        <p className="footer-right"><a href="#">忘记密码？</a></p>
                    </div>

                </div>
            </div>
        )
    }
}

Login.contextTypes = {
    // router: PropTypes.object.isRequired,
};

const LoginForm = Form.create()(Login);

const mapStateToProps = state => ({
    getSubmit: state.getSub
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        onSub
    }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
