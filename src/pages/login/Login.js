import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Input, Button, notification, Icon } from "antd";
import {onSub, getPublicKey, getCaptcha} from "@/action/onSub";
import { Link } from "react-router-dom";
import "./Login.less";
import PropTypes from "prop-types"

const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            captchaMsg: '',
            codeStatus: 0
        };
    }
    componentDidMount() {
        console.log('log login did..', this.props);
        // this.props.onSub();
        this.props.getPublicKey();
        this.props.getCaptcha();
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log nextProps..', nextProps, nextContext);
        console.log('log this props2..', this.props);
        console.log('log this code status..', this.state.codeStatus);
        const { logout } = nextProps;
        const { submitMsg, userInfo, captchaInfo } = nextProps.getSubmit;
        console.log('log next result..', submitMsg, userInfo, logout);

        const submitMsg2 = this.props.getSubmit.submitMsg;
        console.log('log submitMsg2..', submitMsg2);

        const getToken = localStorage.getItem('token');
        console.log('log get token..', getToken);

        if (captchaInfo && captchaInfo.data) {
            // console.log('log captcha..', captchaInfo.data);

            this.setState({ captchaMsg: captchaInfo.data })
        }

        if (submitMsg && submitMsg.data.code === 200) {
            console.log('status login success');
            //login logout
            //todo...
            this.props.history.push('/home');
            localStorage.setItem('token', submitMsg.data.data.token);
        }else if (getToken) {
            this.props.history.push('/home');
        }else if (submitMsg && submitMsg.data.code === 503/* && submitMsg2 && submitMsg2.data.code === submitMsg.data.code*/) {
            console.log('status captcha error..');
            if (nextProps.getSubmit !== this.props.getSubmit) {
                notification['warning']({
                    message: '验证码错误',
                    description: '请重新输入',
                    duration: 3.5,
                    icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                    style: {
                        // width: 600,
                        // marginLeft: 335,
                        // zIndex: 999,
                        width: 180,
                        backgroundColor: "#282c34",
                        position: "absolute",
                        top: 10,
                        left: '50%',
                        transform: 'translate(-50%, 20%)',
                        borderRadius: 8,
                        padding: 10,
                        textAlign: "center",
                        color: 'wheat'
                    },
                })
            }
        }else if (submitMsg && submitMsg.data.code === 501) {
            if (nextProps.getSubmit !== this.props.getSubmit) {
                alert(`${submitMsg.data.data}`)
            }
        }

        Promise.resolve(nextProps.getSubmit).then(result => {
            if (result.data && result.data.code === 200) {
                this.props.history.push('/commentPage');
                return result.data
            }else if (result.data && result.data.code === 501) {
                return null;
            }
        }).then(msg => {

        });
    }

    onSubmit = () => {
        const { userInfo } = this.props.getSubmit;
        console.log('put publicKey..', userInfo);

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('log submit values..', values);
                let item = {
                  username: values.username,
                  password: values.password,
                  publicKey: userInfo.data.data,
                  captcha: values.captcha
                };
                this.setState({ codeStatus: 1 });
                this.props.onSub(item);
                // this.props.getPublicKey();
            }
        });

        console.log('log submit props..', this.props);
    };
    getCaptcha = () => {
        console.log('log getCaptcha...');
        this.props.getCaptcha()
    };

    render() {
        console.log('log getSubmit2..', this.props.getSubmit, this.props.form);

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
                                <span>账&nbsp;&nbsp;&nbsp;号：</span>
                                {getFieldDecorator("username", {
                                    rules: [{ required: true, message: '用户名不能为空！!'}]
                                })(
                                    <Input type="text" placeholder="请输入账户名称..." className="form-item-input"/>
                                )}
                            </FormItem>
                            <FormItem className="form-item">
                                <span>密&nbsp;&nbsp;&nbsp;码：</span>
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
                            <FormItem className="form-item">
                                <span>验证码：</span>
                                {getFieldDecorator("captcha", {
                                    rules: [
                                        { required: true, message: '验证码不能为空！'},
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
                                    <Input type="text" className="form-item-captcha"/>
                                )}
                                {/*<img src="/api/public/captcha" alt="error.." className="form-item-img" onClick={this.getCaptcha}/>*/}
                                {/*{`${this.state.captchaMsg}`}*/}
                                <span dangerouslySetInnerHTML={{ __html: this.state.captchaMsg}} className="form-item-img" onClick={this.getCaptcha}></span>
                                {/*<img src={this.state.captchaMsg} alt="error.." className="form-item-img" onClick={this.getCaptcha}/>*/}
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
        getPublicKey,
        getCaptcha
    }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
