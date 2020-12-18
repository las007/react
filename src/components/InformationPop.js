import {Icon, notification} from "antd";
import React from "react";

export default function (message, desc, isLineHeight) {
    let scrollTop = document.body.scrollTop+document.documentElement.scrollTop;

    return (
/*        notification['success']({
            message: message,
            // description: '请登录~',
            duration: 0.8,
            icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
            top: '100px',
            placement: "topRight",
            className: 'wrap-dots',
            style: {
                width: 180,
                backgroundColor: "#282c34",
                position: "absolute",
                // top: scrollTop + 90,
                // top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: 8,
                padding: 10,
                textAlign: "center",
                color: '#ffffff',
                lineHeight: '50px'
            },
        })*/
        notification['warning']({
            message: message,
            description: desc,
            duration: 3.5,
            icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
            className: 'wrap-dots',
            style: {
                // width: 180,
                backgroundColor: "#282c34",
                position: "absolute",
                top: 10,
                left: '50%',
                transform: 'translate(-50%, 20%)',
                borderRadius: 8,
                padding: 10,
                textAlign: "center",
                color: 'lightgoldenrodyellow',
                lineHeight: isLineHeight ? null : '50px'
            },
        })
    )
}
