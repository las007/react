import createReducers from "./createReducers";
import * as find from "../action/findPW"
import {Form, Input} from "antd";
import React from "react";

export default createReducers({}, {}, {
    [find.FORGET_PASSWORD]: (state, action) => {
        return {
            ...state,
            emailCaptcha: action.payload
        }
    },
    [find.CHECK_VERIFICATION_CODE]: (state, action) => {
        return {
            ...state,
            checked: action.payload
        }
    },
    [find.RESERT_PASSWORD]: (state, action) => {
        return {
            ...state,
            resetStatus: action.payload
        }
    }
})

{/*<div>
                                        <FormItem>
                                            {getFieldDecorator("password", {
                                                rules: [
                                                    { required: true, message: 'pw!!!!'},
                                                    { validator: (rule, value, callback) => {
                                                            if (!value) {
                                                                callback();
                                                            } else if (!/^[a-zA-Z0-9_\-~*()!@#$%^.·`,&]+$/.test(value)) {
                                                                callback(['\'英文字母（区分大小写）、数字，可含半角标点符号·.,-_~ *()!@#$%^&\'']);
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
                                                            } else callback();
                                                        }}]
                                            })(
                                                <Input type="password" placeholder="请输入重置密码" className="forget-input"/>
                                            )}
                                        </FormItem>
                                    </div>*/}

{/*<FormItem style={{ display: this.state.showElement ? "none" : "block" }}>
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
                                    </FormItem>*/}


