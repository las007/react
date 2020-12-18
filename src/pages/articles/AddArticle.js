import React from 'react'
import Header from "@/components/Header";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import BraftEditor from "@/components/Editor"
import {Button, Input, Row, Col, Form, DatePicker, notification, Icon, Upload, message} from "antd";
import moment from 'moment';
import * as action from "@/action/onSub";
import * as userMeans from "@/action/user";
import './AddArticle.less'
import InformationPop from "@/components/InformationPop";

const dateFormat = 'YYYY-MM-DD hh:mm:ss'
const TextArea = Input.TextArea, FormItem = Form.Item
const FormItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 13
    }
}

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

class AddArticle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorInfo: '',
            avatar_url: '',
            loading: false,
            imageUrl: '',
            isPublish: false
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log next.', nextProps);
        const { isAddArticle, getMsg } = nextProps;
        console.log('log get msg.', getMsg);
        if (isAddArticle && isAddArticle.data.code === 200 && this.state.isPublish) {
            notification['success']({
                message: isAddArticle.data.message,
                description: '请查看~',
                duration: 3.5,
                icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                closeIcon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                className: 'wrap-dots',
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
                    // textAlign: "center",
                    color: 'lightgoldenrodyellow'
                },
            })
            this.props.history.push('/')
        } else if (isAddArticle && isAddArticle.data.code === 201 && this.state.isPublish) {
           /* notification['success']({
                message: isAddArticle.data.message,
                description: '未登录状态~',
                duration: 3.5,
                icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                closeIcon: <Icon type="smile" style={{ color: '#108ee9' }} />,
                className: 'wrap-dots',
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
                    // textAlign: "center",
                    color: 'lightgoldenrodyellow'
                },
            })*/

        }
    }

    onChange(data, dataString) {
        console.log('log pick date.', data, dataString)
    }
    //时间戳转换方法    date:时间戳数字
    formatDate(date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;
    }
    onClickSave = (d) => {
        console.log('log ddd.', d, this.state.editorInfo);
        this.props.form.validateFields((error, value) => {
            if (Object.keys(this.state.avatar_url).length === 0) {
                InformationPop('提示！', '请设置头图~', true);
            } else if (!error) {
                console.log('log val.', value, this.state);
                if (d === 0) {
                    console.log('log draft.')
                } else {
                    value.content = this.state.editorInfo;
                    value.date = this.formatDate(value.date);
                    value.imageUrl = this.state.avatar_url;
                    console.log('log content.', value);
                    this.props.subArticleSave(value)
                    this.setState({ isPublish: true })
                }
            }
        })
    };

    clickHandle = item => {
        console.log('log click handle.', item);
        this.props.touchTest(item);
        this.props.history.push('/home');
    };

    eventStatus = (item) => {
        console.log('log some.', item)
        this.setState({ editorInfo: item })
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
        const { form } = this.props
        console.log('log today.', new Date(), moment(new Date().toString(), dateFormat))
        const { imageUrl } = this.state
        const showElem = {
            // border: '1px dashed',
            color: '#000',
            width: '50%',
            height: '91px',
            display: 'inline-block',
            cursor: 'pointer',
            borderRadius: '8px',
            marginBottom: '11px'
        };
        const imgStyle = {
            // width: '69%',
            height: '135px',
            borderRadius: '8px',
            cursor: 'pointer'
        };
        const uploadButton = (
            <div style={showElem}>
                <p style={{ marginTop: '25px', marginBottom: '3px', fontSize: '22px', fontWeight: 'bold' }}>+</p>
                <span>Upload</span>
                {/*<img src={str} style={imgStyle} alt="error.."/>*/}
            </div>
        );

        return (
            <div className="add-article">
                { <Header history={this.props.history} />}
                <h1>显示文本信息 info</h1>
                <div className="content-box">
                    <header className="title-header">设置攻略头图</header>
                    <div style={{ height: '380px', border: 'black 1px solid', backgroundColor: 'aqua' }}>
                        <img src="#" alt="title_img"/>
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
                    </div>
                    <header className="title-header">请输入攻略标题</header>
                    <div style={{ textAlign: 'center' }}>
                        <FormItem>
                            {form.getFieldDecorator('articleTitle', {
                                rules: [{
                                    required: true,
                                    message: '文章标题不能为空！'
                                }]
                            })(
                                <Input placeholder="请输入文章标题..." style={{ width: '80%' }}/>
                            )}
                        </FormItem>
                    </div>
                    <header className="title-header">请描述攻略简介</header>
                    <div className="brief-introduction">
                        <FormItem>
                            {form.getFieldDecorator('introduction', {
                                rules: [{
                                    required: true,
                                    message: '请输入攻略简介'
                                }]
                            })(
                                <TextArea placeholder="请描述攻略简介..."/>
                            )}
                        </FormItem>
                    </div>
                    <header className="title-header">费用信息</header>
                    <div className="outlay">
                        <Row style={{ paddingTop: '15px' }}>
                            <Col span={7}>
                                <FormItem label="出发时间" {...FormItemLayout}>
                                    {form.getFieldDecorator('date', {
                                        rules: [],
                                        initialValue: moment(new Date(), dateFormat)
                                    })(
                                        <DatePicker onChange={this.onChange} style={{ display: 'inline-block', width: '100%' }}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem label="出行天数" {...FormItemLayout}>
                                    <div className="afterText">
                                        <span className="span f-fr" style={{width:50}}>天</span>
                                        {form.getFieldDecorator('days', {
                                            rules: [
                                                {required: true, message: "出行天数不能为空"}
                                            ],
                                            initialValue: '123'
                                        })(
                                            <Input />
                                        )}
                                    </div>
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem label="参与人数" {...FormItemLayout}>
                                    <div className="afterText">
                                        <span className="span f-fr" style={{width:50}}>人</span>
                                        {form.getFieldDecorator('members', {
                                            rules: [
                                                {required: true, message: "请填写出行人数"}
                                            ],
                                            initialValue: '123'
                                        })(
                                            <Input />
                                        )}
                                    </div>
                                </FormItem>
                            </Col>
                            <Col span={7}>
                                <FormItem label="人均费用" {...FormItemLayout}>
                                    <div className="afterText">
                                        <span className="span f-fr" style={{width:50}}>元</span>
                                        {form.getFieldDecorator('outlay', {
                                            rules: [
                                                {required: true, message: "请填写人均费用"}
                                            ],
                                            initialValue: '123'
                                        })(
                                            <Input />
                                        )}
                                    </div>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="edit-container">
                    <header className="title-header">撰写旅游攻略</header>
                    <BraftEditor getStatus={ this.eventStatus } isEdit={true}/>
                </div>
                <div className="footer-btn" style={{ marginTop: '20px', marginRight: '45px' }}>
                    <Button className="common-btn" style={{ margin: '1px 15px' }} onClick={() => this.onClickSave(0)}>保存草稿</Button>
                    <Button type="primary" className="common-btn" onClick={() => this.onClickSave(1)}>发布攻略</Button>
                    {/*<Button className="common-btn" onClick={() => this.clickHandle({ text: 'test some' })}>test some</Button>*/}
                </div>
            </div>
        )
    }
}

const AddArticleForm = Form.create()(AddArticle);

const mapStateToProps = state => {
    return {
        isAddArticle: state.getSub.isAddArticle,
        getMsg: state.getSub.testMsg
    }
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        subArticleSave: action.addArticle,
        touchTest: action.testSome
    }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(AddArticleForm)
