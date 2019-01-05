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

const UploadBody = styled.div`
    display: inline-block;
`;
export default class Upload extends React.Component {
    state = {
        fileList: [],
    }
    render() {
        const uploadProps = {
            accept: this.props.accept,
            action: this.props.url,
            multiple: this.props.multiple,
            showUploadList: this.props.listType || false,
            withCredentials: this.props.withCredentials,
            listType: this.props.listType,
            fileList: this.state.fileList,
            onPreview: this.props.onPreview,
            onRemove: this.props.onRemove,
            beforeUpload: this.props.beforeUpload,
            data: this.props.data,
            onChange: (info) => {
                if (info.file.status === 'done') {
                    this.props.onSuccess(info);
                } else if (info.file.status === 'error') {
                    this.props.onFail(info);
                }
                this.setState({ fileList: info.fileList })
            }
        };
        return (
            <UploadBody className={this.props.className}>
                <AntUpload {...uploadProps}>
                    {
                        this.props.children === 'none' ?
                        null :
                        (
                            this.props.children
                            ||
                            <Button>
                                <Icon type="upload" /> {this.props.title}
                            </Button>
                        )
                    }
                </AntUpload> 
            </UploadBody>
        )
    }
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
    onPreview: PropTypes.func,
    onRemove: PropTypes.func,
    beforeUpload: PropTypes.func,
    data: PropTypes.PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ])
}
Upload.defaultProps = {
    accept: 'image/*, .xlsx, .pdf, .doc',
    title: '点击上传',
    multiple: false,
    showUploadList: false,
    withCredentials: true,
    onSuccess: () => {},
    onFail: () => {}
}