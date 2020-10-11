import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Input, Button } from "antd";
import { getRuleType } from "@/utils"

import './Forget.less';
import {forgetPW, checkCode, resetPW} from "@/action/findPW";

const FormItem = Form.Item;

class Forget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: '',
            validated: '',
            showElement: false,
            password: ''
        };
    }

    componentDidMount() {
        console.log('log forget did..', this.props.form)
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log forget nextProps..', nextProps);
        const { resetStatus } = nextProps.findPW;
        console.log('log reset status..', resetStatus);
        if (resetStatus && resetStatus.data.code === 200) {
            console.log('log reset status2..');
            this.props.history.push('/');
        }
    }

    onSubmit = () => {
        this.props.form.validateFields((error, values) => {
            if (!error) {
                if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(values)) {
                    if (values.email) {
                        this.props.getEmailCaptcha(values.email);
                        this.setState({ inputVal: values.email })
                    }else if (values.validateCode) {
                        values.email = this.state.inputVal;
                        this.setState({ validated: values.validateCode });
                        this.props.checkCode(values);
                    }else {
                        this.setState({ password: values.password });
                        values.email = this.state.inputVal;
                        values.validated = this.state.validated;
                        console.log('log reset...', values, this.state);
                        this.props.onResetPassword(values);
                    }
                }
            }
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        console.log('log find pw..', this.props);
        const { emailCaptcha, checked } = this.props.findPW;
        /*if (checked && checked.data.code === 200) {
            this.setState({
                showElement: true
            })
        }*/
        const showElem = {
            display: "block"
        };

        return (
            <div className="forget-container">
                <div className="forget-content">
                    <div className="forget-carT">
                        <span>this is forget page...</span>
                    </div>
                    <div className="forget-carB">
                        <Form onSubmit={this.onSubmit}>

                            { emailCaptcha && emailCaptcha.data.code === 200 ? (
                                checked && checked.data.code === 200 ? (
                                <div>
                                    <p className="email-text">邮箱：{ this.state.inputVal }</p>
                                    <FormItem>
                                        {getFieldDecorator("password", {
                                            rules: [
                                                { required: true, message: 'pw!!!!', trigger: 'blur' },
                                                { validator: (rule, value, callback) => {
                                                        if (!value) {
                                                            callback();
                                                        } else if (!/^[a-zA-Z0-9_\-~*()!@#$%^.·`,&]+$/.test(value)) {
                                                            callback(['\'英文字母（区分大小写）、数字，可含半角标点符号·.,-_~ *()!@#$%^&\'']);
                                                        } else if (value.length < 6 || value.length > 15) {
                                                            callback('密码长度为6-15');
                                                        } else callback();
                                                    }}]
                                        })(
                                            <Input type="password" placeholder="请输入重置密码" className="forget-input"/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator("confirmPW", {
                                            rules: [
                                                { required: true, message: '密码不能为空'},
                                                { validator: (rule, value, callback) => {
                                                        if (!value) {
                                                            callback();
                                                        } else if (!/^[a-zA-Z0-9_\-~*()!@#$%^.·`,&]+$/.test(value)) {
                                                            callback(['\'英文字母（区分大小写）、数字，可含半角标点符号·.,-_~ *()!@#$%^&\'']);
                                                        } else if (value.length < 6 || value.length > 15) {
                                                            callback('密码长度为6-15');
                                                        } /*else if (value !== this.state.password) {
                                                            console.log('log this value..', value, this.state.password);
                                                            callback('两次输入密码不同');
                                                        }*/ else callback();
                                                    }}]
                                        })(
                                            <Input type="password" placeholder="确认重置密码" className="forget-input"/>
                                        )}
                                    </FormItem>
                                </div>
                                ) : (
                                    <FormItem style={{ display: this.state.showElement ? "none" : "block" }}>
                                        {getFieldDecorator('validateCode', {
                                            rules: [
                                                { require: true, message: '验证码不能为空' },
                                                { validator: (rule, value, callback) => {
                                                        if (!value) {
                                                            callback();
                                                        } else if (!/^\d+$/.test(value)) {
                                                            callback(['请填写数字']);
                                                        } else callback();
                                                    }
                                                }]
                                        })(
                                            <Input className="forget-input" type="text" placeholder="请填写接收到的验证码"/>
                                        )}
                                    </FormItem>
                                )
                            ) : (
                                <FormItem>
                                    {getFieldDecorator('email', {
                                        rules: [
                                            { required: true, message: '邮箱不能为空' },
                                            // getRuleType('email')
                                            { validator: (rule, value, callback) => {
                                                    if (!value) {
                                                        callback();
                                                    } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
                                                        callback(['errMsg: \'邮箱格式不正确\'']);
                                                    } else callback();
                                                }
                                            }]
                                    })(
                                        <Input className="forget-input" type="text" placeholder="请填写您的账号关联邮箱"/>
                                    )
                                    }
                                </FormItem>
                            )}
                            <FormItem>
                                <Button type="primary" htmlType="submit" className="forget-btn">
                                    { checked && checked.data.code === 200 ? (<span>重置密码</span>) : (<span>下一步</span>) }
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

const ForgetForm = Form.create()(Forget);

const mapStateToProps = state => ({
    account: state.getState,
    findPW: state.findPW
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getEmailCaptcha: forgetPW,
        checkCode,
        onResetPassword: resetPW
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetForm)
