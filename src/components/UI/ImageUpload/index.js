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

    render() {
        const { previewVisible, previewImage } = this.state;
        const { imageCount, className, uploadLabel, uploadTitle, fileList, uploadButtonForceHide } = this.props;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <UploadLabel>{uploadLabel}</UploadLabel>
            </div>
        );
        return (
            <div className={`clearfix ${className}`}>
                {uploadTitle && <UploadTitle>{imageCount > 1 ? `${uploadTitle} (${this.props.fileList.length}/${imageCount})` : uploadTitle }</UploadTitle>}
                <Upload
                    accept={this.props.accept}
                    action={this.props.url}
                    multiple={this.props.multiple}
                    listType="picture-card"
                    showUploadList
                    fileList={this.props.fileList}
                    onPreview={this.handlePreview}
                    withCredentials={this.props.withCredentials}
                    onRemove={this.props.onRemove}
                    beforeUpload={this.props.beforeUpload}
                    data={this.props.data}
                    onChange={this.props.onChange}
                    defaultFileList={this.props.defaultFileList}
                >
                    {(this.props.fileList.length >= imageCount || uploadButtonForceHide) ? null : uploadButton}
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
    withCredentials: PropTypes.bool,
    onRemove: PropTypes.func,           //返回false不移除，支持返回 Promise (resolve(false) 或 reject 时不移除)
    defaultFileList: PropTypes.arrayOf(PropTypes.object),
    fileList: PropTypes.arrayOf(PropTypes.object),
    uploadButtonForceHide: PropTypes.bool
}
ImageUpload.defaultProps = {
    uploadLabel: '点击上传',
    imageCount: 1,
    accept: 'image/*',
    withCredentials: true,
    fileList: [],
    uploadButtonForceHide: false
}
