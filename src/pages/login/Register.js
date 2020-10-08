import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Input, Button } from "antd";
import deliverAction from "../../action"

import "./Register.less";

const FormItem = Form.Item;

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log register nextPros...', nextProps);

        const { registeredValues } = nextProps.registered;
        if (registeredValues && registeredValues.data.code === 200) {
            this.props.history.push('/');
        }else if (registeredValues && registeredValues.data.code === 501) {
            alert(`${registeredValues.data.msg}`);
        }
    }

    onRegister = () => {
        console.log('log onRegister..', this.props.form);
        this.props.form.validateFields((error, value) => {
            if (!error) {
                console.log('click confirm..', value);
                this.props.toRegister(value)
            }
        })
    };

    render() {
        // console.log('log register props...', this.props);
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="register-page">
                {/*<h1>this is register page...</h1>*/}

                <div className="register-content">
                    <h1 className="register-title">账户注册</h1>
                    <hr/>
                    <div className="register-item">
                        {/*<input type="text"/>
                        <input type="text"/>*/}

                        <Form onSubmit={this.onRegister} className="register-form">
                            <FormItem>
                                {getFieldDecorator("username", {
                                    rules: [{ required: true, message: '用户名不能为空！'}]
                                })(
                                    <Input type="text" placeholder="请输入用户名..." className="register-item-input"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("nickName", {
                                    rules: [{ required: true, message: '昵称不能为空！'}]
                                })(
                                    <Input type="text" placeholder="请输入用户昵称" className="register-item-input"/>
                                )}
                            </FormItem>
                            <FormItem className="register-age">
                                <span className="age-item">年龄：</span>
                                {getFieldDecorator("age", {
                                    rules: [{ required: true, message: '年龄不能为空！'}]
                                })(
                                    <Input type="text" placeholder="请输入年龄" className="register-item-age"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("email", {
                                    rules: [{ required: true, message: '邮箱不能为空！'}]
                                })(
                                    <Input type="text" placeholder="请输入您的邮箱..." className="register-item-input"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("phone", {
                                    rules: [{ required: true, message: '手机号不能为空！'}]
                                })(
                                    <Input type="text" placeholder="请输入您的手机号" className="register-item-input"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("password", {
                                    rules: [{ required: true, message: '密码不能为空！'}]
                                })(
                                    <Input type="password" placeholder="请输入您的密码" className="register-item-input"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("confirmPW", {
                                    rules: [{ required: true, message: '密码不能为空！'}]
                                })(
                                    <Input type="password" placeholder="请输入您的密码" className="register-item-input"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("sex", {
                                    rules: [{ required: true, message: '密码不能为空！'}]
                                })(
                                    <Input type="password" placeholder="请输入您的性别" className="register-item-input"/>
                                )}
                            </FormItem>
                            <FormItem className="register-form-button">
                                <Button type="primary" htmlType="submit">
                                    <a>注册</a>
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>

            </div>
        )
    }
}

const RegisterForm = Form.create()(Register);

const mapStateToProps = state => ({
    toRegister: state,
    registered: state.getRegister
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        toRegister: deliverAction.onRegister
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
