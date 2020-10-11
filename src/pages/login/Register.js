import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Form, Input, Button, Upload, Icon, message, notification} from "antd";
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import deliverAction from "../../action"

import "./Register.less";

const FormItem = Form.Item;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    console.log('log file..', file);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

function afterUpload(file) {
    console.log('log after..', file);
}

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            avatar_url: ''
        };
    }

    componentDidMount() {
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log register nextPros...', nextProps);

        const { registeredValues } = nextProps.registered;
        if (this.props.registered !== nextProps.registered) {
            if (registeredValues && registeredValues.data.code === 200) {
                this.props.history.push('/');
                console.log('log register success..')
                notification['warning']({
                    message: registeredValues.data.msg,
                    // description: '请重新输入',
                    duration: 3.5,
                    icon: <Icon type="smile" style={{color: '#108ee9'}}/>,
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
            } else if (registeredValues && registeredValues.data.code === 201) {
                notification['warning']({
                    message: registeredValues.data.data.text,
                    description: '请重新输入',
                    duration: 3.5,
                    icon: <Icon type="smile" style={{color: '#108ee9'}}/>,
                    btn: 'none',
                    closeIcon: 'none',
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
            } else if (registeredValues && registeredValues.data.code === 501) {
                alert(`${registeredValues.data.msg}`);
            }
        }
    }

    onRegister = () => {
        console.log('log onRegister..', this.props.form);
        this.props.form.validateFields((error, value) => {
            if (!error) {
                console.log('click confirm..', value, this.props, this.state);
                value.avatar_url = this.state.avatar_url;
                value.createdAt = '2020-09-23 15:05:21';
                value.updatedAt = '2020-09-23 15:05:22';
                this.props.toRegister(value)
            }
        })
    };

    handleChange = info => {
        console.log('log info..', info);
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>{
                // console.log('log img url..', imageUrl);
                this.setState({
                    imageUrl,
                    loading: false,
                    avatar_url: info.file.response.data[0]
                })
                }
            );
        }
    };

    render() {
        // console.log('log register props...', this.props);
        const { getFieldDecorator } = this.props.form;

        const { loading, imageUrl } = this.state;
        const showElem = {
            border: '1px dashed',
            color: '#000',
            width: '50%',
            height: '91px',
            display: 'inline-block',
            cursor: 'pointer',
            borderRadius: '8px',
            marginBottom: '11px'
        };
        const imgStyle = {
            width: '69%',
            height: '135px',
            borderRadius: '8px',
            cursor: 'pointer'
        };
        const str = "/api/test/didRoute/upload_b906305c59640f75b0335bcb1cce7bd2,upload.jpg";
        const uploadButton = (
            <div style={showElem}>
                <p style={{ marginTop: '25px', marginBottom: '3px', fontSize: '22px', fontWeight: 'bold' }}>+</p>
                <span>Upload</span>
                {/*<img src={str} style={imgStyle} alt="error.."/>*/}
            </div>
        );

        return (
            <div className="register-page">
                {/*<h1>this is register page...</h1>*/}

                <div className="register-content">
                    <h3 className="register-title">账户注册</h3>
                    <hr/>
                    <div className="register-item">
                        {/*<input type="text"/>
                        <input type="text"/>*/}

                        <Form onSubmit={this.onRegister} className="register-form">
                            <FormItem>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="/api/section/uploadImage"
                                    beforeUpload={beforeUpload}
                                    afterUpload={afterUpload}
                                    onChange={this.handleChange}>
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={imgStyle} /> : uploadButton}
                                    {/*<img src={[require("../../static/back.jpg")]} alt="error.." style={{ width: '50%' }}/>*/}
                                </Upload>
                            </FormItem>
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
                                {getFieldDecorator("phoneNumber", {
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
    getRegister: state,
    registered: state.getRegister
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        toRegister: deliverAction.onRegister
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
