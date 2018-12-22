/*
* @Author: lijian
* @Email:  lijian46@guazi.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';

export default function Alert(type, msg, tle) {
    let title = tle;
    if (!title) {
        switch (type) {
            case 'info':
                title = '提示'
            break;
            case 'success':
                title = '操作成功'
            break;
            case 'error':
                title = '发生错误'
            break;
            case 'warning':
                title = '警告！'
            break;
            default:
                title = '无标题'
        }
    }
    notification[type]({
        message: title,
        description: msg,
    });
}