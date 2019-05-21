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
    constructor(props) {
        super(props);
        let fileList = this.props.defaultFileList;
        if (fileList && fileList.length <= 0) fileList = undefined
        this.state = {
             fileList
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (!state.fileList) {
            let fileList = props.defaultFileList;
            if (fileList && fileList.length <= 0) fileList = undefined
            return {
                fileList
            };
        }
        return null;
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
            defaultFileList: this.props.defaultFileList,
            customRequest: this.props.customRequest,
            onChange: (info) => {
                if (info.file.status === 'done' || info.file.status === 'removed') {
                    this.props.onUploadedChange(info);
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
    onUploadedChange: PropTypes.func,
    onFail: PropTypes.func,
    listType: PropTypes.string,
    onPreview: PropTypes.func,
    onRemove: PropTypes.func,
    beforeUpload: PropTypes.func,
    data: PropTypes.PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]),
    defaultFileList: PropTypes.arrayOf(PropTypes.object),
    customRequest: PropTypes.func
}
Upload.defaultProps = {
    title: '点击上传',
    multiple: false,
    showUploadList: false,
    withCredentials: true,
    onUploadedChange: () => {},
    onFail: () => {}
}