import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import {getWriterInfo} from "@/action/onSub";
import Header from "@/components/Header";
import { Input, Form, Button, Upload } from "antd";

import './info.less';
import * as articles from "@/action/articles";
import * as userMeans from "@/action/user";

const TextArea = Input.TextArea, FormItem = Form.Item;
const FormItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 15
    }
};

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditInfos: false,
            getMineInfo: {}
        };
    }

    componentDidMount() {
        console.log('log query.', this.props.match.params);
        const { userId } = this.props.match.params;
        // this.props.getUserInfo()
        this.props.getWriterInfo(userId)
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('log user info.', nextProps);
        const { writerDetail } = nextProps.writerDetail;
        console.log('log acc.', writerDetail);
        if (writerDetail && writerDetail.id) {
            // this.props.getArticleList();
        }
    }
    jumpToArticleDetail = id => {
        this.props.history.push(`/articles/detail/${id}`)
    };
    subEditMeans = () => {
        console.log('log sub edit means.');
        this.props.form.validateFields((err, value) => {
            if (!err) {
                console.log('log val.', value);
            }
        });
    };
    setMineInfo = msg => {
        console.log('log mine info.', msg);
        this.setState({ getMineInfo: msg })
    };

    render() {
        const { writerDetail } = this.props.writerDetail;
        const acc = (writerDetail && writerDetail.data.data[0]) || {};
        const { form } = this.props;
        console.log('log props.', acc);
        return (
            <div className="user-info">
                <Header history={this.props.history} userInfo={this.setMineInfo} isGetInfo={true} />

                <div className="title-image">
                    <img style={{ width: '100%' }}
                         src={ acc ?  /\/(upload\w*)/.exec(acc && acc.avatar_url) === null ? acc.avatar_url : `/api/test/didRoute${acc.avatar_url}` : null }
                         alt="eror.." />
                </div>
                <div className="content-box">
                    <div className="center-content-menu">
                        <ul>
                            <li>我的攻略</li>
                            <li>我的草稿箱</li>
                            <li>我的提问</li>
                            <li onClick={() => this.setState({ isEditInfos: !this.state.isEditInfos })}>修改资料</li>
                            <li>退出</li>
                        </ul>
                    </div>
                    <div className="left-side-info">
                        <img src={ acc && acc.avatar_url ?  /\/(upload\w*)/.exec(acc.avatar_url) === null ? acc.avatar_url : `/api/test/didRoute${acc.avatar_url}` : null } alt="user-img" />

                        <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 600 }}>nickname</p>
                        <p>age: { acc.age }</p>
                        <p>phone-number: { acc.phoneNumber }</p>
                        <p>email: { acc.email }</p>
                        <TextArea placeholder="handsome_boy"/>
                    </div>
                    <div className="center-content">
                        <div className="content-top">
                            <ul>
                                <li>写攻略</li>
                                <li>去提问</li>
                                <li>看攻略</li>
                                <li>看问答</li>
                            </ul>
                        </div>
                        <div className="content-bottom">
                            {
                                this.state.isEditInfos ? (
                                    <div className="content-infos">
                                        {/*<img src="#" style={{ cursor: 'pointer' }} />*/}
                                        <Form onSubmit={this.subEditMeans}>
                                            <FormItem label="昵称" {...FormItemLayout}>
                                                {form.getFieldDecorator('nickName', {
                                                    rules: [{required: true, message: "昵称不能为空！"}],
                                                    initialValue: acc.nickName
                                                })(
                                                    <Input placeholder="请输入您要修改的昵称..."/>
                                                )}
                                            </FormItem>
                                            <FormItem label="年龄" labelCol={{ span: 6 }} wrapperCol={{ span: 5 }}>
                                                {form.getFieldDecorator('age', {
                                                    rules: [{required: true, message: "年龄不能为空！"}],
                                                    initialValue: acc.age
                                                })(
                                                    <Input placeholder="请输入年龄..."/>
                                                )}
                                            </FormItem>
                                            <FormItem label="电话号码" {...FormItemLayout}>
                                                {form.getFieldDecorator('phoneNumber', {
                                                    rules: [{required: true, message: "电话号不能为空！"}],
                                                    initialValue: acc.phoneNumber
                                                })(
                                                    <Input placeholder="请输入您要修改的联系方式..."/>
                                                )}
                                            </FormItem>
                                            <FormItem label="邮箱" {...FormItemLayout}>
                                                {form.getFieldDecorator('email', {
                                                    rules: [{required: true, message: "邮箱不能为空！"}],
                                                    initialValue: acc.email
                                                })(
                                                    <Input placeholder="请输入您要修改的邮箱..."/>
                                                )}
                                            </FormItem>
                                            <FormItem label="原密码" {...FormItemLayout}>
                                                {form.getFieldDecorator('originPw', {
                                                    rules: [{required: true, message: "原密码不能为空！"}]
                                                })(
                                                    <Input type="password" pplaceholder="请输入您的原密码..."/>
                                                )}
                                            </FormItem>
                                            <FormItem label="新密码" {...FormItemLayout}>
                                                {form.getFieldDecorator('newPw', {
                                                    rules: [{required: true, message: "密码不能为空！"}]
                                                })(
                                                    <Input type="password" placeholder="请输入您要修改的密码..."/>
                                                )}
                                            </FormItem>
                                            <FormItem label="确认密码" {...FormItemLayout}>
                                                {form.getFieldDecorator('confirmPw', {
                                                    rules: [{required: true, message: "确认密码不能为空！"}]
                                                })(
                                                    <Input type="password" placeholder="请确认密码..."/>
                                                )}
                                            </FormItem>
                                            <FormItem style={{ margin: '0 auto', width: '75%' }}>
                                                <Button type="primary" block htmlType="submit" style={{ backgroundColor: '#4b769d' }}>提交修改</Button>
                                            </FormItem>
                                        </Form>
                                    </div>
                                ) : (
                                    acc.articleList ?
                                        (acc.articleList.map(d => (
                                                <div className="content-infos" key={d.id}>
                                                    <img src={ d.imageUrl ?
                                                        /\/(upload\w*)/.exec(d.imageUrl) === null ?
                                                            d.imageUrl : `/api/test/didRoute${d.imageUrl}` : null } alt="article_img"
                                                         onClick={() => this.jumpToArticleDetail(d.id)} style={{ cursor: 'pointer' }} />
                                                    <div className="content-msg">
                                                        <div onClick={() => this.jumpToArticleDetail(d.id)} style={{ cursor: 'pointer', height: '91px' }}>
                                                            <span className="infos-title">{ d.title }</span>
                                                            <div>
                                                                <p>这是文章简介内容。。。。</p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <span className="infos-watch">watch·132</span>
                                                            <span className="infos-delete">
                                                                { this.state.getMineInfo.id === acc.id ? <span>删除</span> : null }
                                                            </span>
                                                            <span className="infos-like">isLike·57</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : <span>暂无内容！</span>
                                )}
                        </div>
                    </div>
                </div>
                <div className="footer" />
            </div>
        )
    }
}

const UserInfoForm = Form.create()(UserInfo);

const mapStateToProps = state => ({
    writerDetail: state.getSub,
    isSubEditMeans: state.userMeans.isSubEditMeans,             //修改资料
    isDeleteMyArticle: state.userMeans.isDeleteMyArticle        //删除我的文章
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getWriterInfo,
        getArticleList: articles.getArticle,
        subEditMeans: userMeans.subEditUserMeans,           //修改用户资料
        deleteMyArticle: userMeans.deleteMyArticle          //删除我的文章
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoForm);
