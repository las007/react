import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Input, Button } from "antd";
import { getRuleType } from "@/utils"

import './Forget.less';

const FormItem = Form.Item;

class Forget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log('log forget did..', this.props.form)
    }
    componentWillReceiveProps(nextProps, nextContext) {
    }

    onSubmit = () => {
        console.log('log onSub email..');
        this.props.form.validateFields((error, values) => {
            if (!error) {
                if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(values)) {
                    console.log('log email..', values)
                }
            }
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="forget-container">
                <div className="forget-content">
                    <div className="forget-carT">
                        <span>this is forget page...</span>
                    </div>
                    <div className="forget-carB">
                        <Form onClick={this.onSubmit}>
                            <FormItem>
                                {
                                    getFieldDecorator('Email', {
                                        rules: [
                                            { required: true, message: '邮箱不能为空' },
                                            // getRuleType('email')
                                            { validator: (rule, value, callback) => {
                                                    if (!value) {
                                                        callback();
                                                    } else if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
                                                        callback(['errMsg: \'邮箱格式不正确\'']);
                                                    } else {
                                                        callback();
                                                    }
                                                }
                                            }]
                                    })(
                                        <Input className="forget-input" type="text" placeholder="请填写您的账号关联邮箱"/>
                                    )
                                }
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className="forget-btn" onClick={this.onSubmit}>
                                    下一步
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
    account: state.getState
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({

    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetForm)
