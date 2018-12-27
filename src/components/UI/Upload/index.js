/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    Upload as AntUpload, Icon
} from 'antd';
import Button from '../Button';
import Alert from '../Alert';

const UploadBody = styled.div`
    display: inline-block;
`;

export default function Upload (props) {
    const uploadProps = {
        accept: props.accept,
        action: props.url,
        multiple: props.multiple,
        showUploadList: props.listType || false,
        withCredentials: true,
        listType: props.listType,
        fileList: props.fileList,
        onPreview: props.onPreview,
        onChange(info) {
            if (info.file.status === 'done') {
                props.onSuccess ? props.onSuccess(info) : Alert(`${info.file.name} 上传成功`, 'success');
            } else if (info.file.status === 'error') {
                props.onFail ? props.onFail(info) : Alert(info.file.response ? (info.file.response.message || '上传失败') : '上传失败', 'error');
            }
        },
    };
    return (
        <UploadBody className={props.className}>
            <AntUpload {...uploadProps}>
                {
                    props.children === 'none' ?
                    null :
                    (
                        props.children
                        ||
                        <Button>
                            <Icon type="upload" /> {props.title}
                        </Button>
                    )
                }
            </AntUpload> 
        </UploadBody>
    )
}
Upload.propTypes = {
    accept: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    multiple: PropTypes.bool,
    showUploadList: PropTypes.bool,
    withCredentials: PropTypes.bool,
    onSuccess: PropTypes.func,
    onFail: PropTypes.func,
    listType: PropTypes.string,
    fileList: PropTypes.arrayOf(PropTypes.object),
    onPreview: PropTypes.func
}
Upload.defaultProps = {
    accept: 'image/*, .xlsx, .pdf, .doc',
    title: '点击上传',
    multiple: false,
    showUploadList: false,
    withCredentials: true
}