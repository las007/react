import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Input, Button } from "antd";
import {onSub, getPublicKey} from "@/action/onSub";
import { Link } from "react-router-dom";
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
        this.props.getPublicKey()
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log nextProps..', nextProps);
        const { submitMsg, userInfo } = nextProps.getSubmit;
        console.log('log next result..', submitMsg, userInfo);

        if (nextProps.logout.data.code === 200) {
            this.props.history.push('/');
        }else if (submitMsg && submitMsg.data.code === 200) {
            this.props.history.push('/home');
            const token = submitMsg.data.data.token;
            console.log('log token...', token);
            localStorage.setItem('token', token);
        }

        Promise.resolve(nextProps.getSubmit).then(result => {
            if (result.data && result.data.code === 200) {
                this.props.history.push('/commentPage');
                return result.data
            }else if (result.data && result.data.code === 501) {
                return null;
            }
        });
    }

    onSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onSub(values.username, values.password);
                // this.props.getPublicKey();
            }
        });
    };
    render() {
        console.log('log getSubmit2..', this.props.getSubmit, this.props.form);

        const { submitMsg, userInfo } = this.props.getSubmit;

        if (submitMsg && submitMsg.data.code === 200) {
            // this.props.history.push('/home');
        }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="contentBox">
                    <div style={{ height: "22%", textAlign: 'center'}}>
                        <h1>账户登录</h1>
                        <hr/>
                    </div>
                    <div className="inputValue">
                        <Form onSubmit={this.onSubmit} className="login-submit">
                            <FormItem className="form-item">
                                <span>账号：</span>
                                {getFieldDecorator("username", {
                                    rules: [{ required: true, message: '用户名不能为空！!'}]
                                })(
                                    <Input type="text" placeholder="请输入账户名称..." className="form-item-input"/>
                                )}
                            </FormItem>
                            <FormItem className="form-item">
                                <span>密码：</span>
                                {getFieldDecorator("password", {
                                    rules: [
                                        { required: true, message: 'pw!!!!'},
                                        { validator: (rule, value, callback) => {
                                                if (!value) {
                                                    callback();
                                                } else if (!/^[a-zA-Z0-9_\-~*()!@#$%^.·`,&]+$/.test(value)) {
                                                    callback(['\'英文字母（区分大小写）、数字，可含半角标点符号·.,-_~ *()!@#$%^&\'']);
                                                } else {
                                                    callback();
                                                }
                                            }
                                        }]
                                })(
                                    <Input type="password" placeholder="请输入账户密码.." className="form-item-input"/>
                                )}
                            </FormItem>
                            <FormItem className="form-button">
                                <Button type="primary" htmlType="submit">
                                    <a>立即登录</a>
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                    <div className="login-footer">
                        <p className="footer-left">没有帐户？
                            <Link to="/register"><span>立即注册</span></Link>
                        </p>
                        <Link to="/forget">
                            <p className="footer-right"><span>忘记密码？</span></p>
                        </Link>
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
    getSubmit: state.getSub,
    logout: state.getMsg.logout
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        onSub,
        getPublicKey
    }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
