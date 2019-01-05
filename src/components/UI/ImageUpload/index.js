/*
 * @Author: docoder
 * @Email:  docoder@163.com
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal, Upload } from 'antd';
import styled from 'styled-components';

const UploadTitle = styled.div`
    font-weight: bold;
    padding: 5px;
`;
const UploadLabel = styled.div`
    margin-top: 8px;
    color: #666;
`;

export default class ImageUpload extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    onChange = (info) => {
        if (info.file.status === 'done' || info.file.status === 'removed') {
            this.props.onUploadedChange(info);
        } else if (info.file.status === 'error') {
            this.props.onFail(info);
        }
        this.setState({ fileList: info.fileList })
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const { imageCount, className, uploadLabel, uploadTitle } = this.props;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <UploadLabel>{uploadLabel}</UploadLabel>
            </div>
        );
        return (
            <div className={`clearfix ${className}`}>
                {uploadTitle && <UploadTitle>{imageCount > 1 ? `${uploadTitle} (${fileList.length}/${imageCount})` : uploadTitle }</UploadTitle>}
                <Upload
                    accept={this.props.accept}
                    action={this.props.url}
                    multiple={this.props.multiple}
                    listType="picture-card"
                    showUploadList
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    withCredentials={this.props.withCredentials}
                    onRemove={this.props.onRemove}
                    beforeUpload={this.props.beforeUpload}
                    data={this.props.data}
                    onChange={this.onChange}
                >
                    {fileList.length >= imageCount ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

ImageUpload.propTypes = {
    uploadLabel: PropTypes.string,
    uploadTitle: PropTypes.string,
    imageCount: PropTypes.number,
    url: PropTypes.string.isRequired,
    accept: PropTypes.string,
    onUploadedChange: PropTypes.func,
    onFail: PropTypes.func,
    withCredentials: PropTypes.bool,
    onRemove: PropTypes.func //返回false不移除，支持返回 Promise (resolve(false) 或 reject 时不移除)
}
ImageUpload.defaultProps = {
    uploadLabel: '点击上传',
    imageCount: 1,
    accept: 'image/*',
    withCredentials: true,
    onUploadedChange: () => {},
    onFail: () => {}
}
