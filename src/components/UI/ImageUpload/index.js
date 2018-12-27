/*
 * @Author: docoder
 * @Email:  docoder@163.com
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Modal } from 'antd';
import Upload from '../Upload';

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

    onSuccess = (info) => {
        this.setState({ fileList: info.fileList })
        this.props.onSuccess(info)
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const { imageCount, className } = this.props;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">点击上传</div>
            </div>
        );
        return (
            <div className={`clearfix ${className}`}>
                <Upload
                    accept={this.props.accept}
                    url={this.props.url}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onSuccess={this.onSuccess}
                    onFail={this.onFail}
                    onRemove={this.onRemove}
                >
                    {fileList.length >= imageCount ? 'none' : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

ImageUpload.propTypes = {
    imageCount: PropTypes.number,
    url: PropTypes.string.isRequired,
    accept: PropTypes.string,
    onSuccess: PropTypes.func,
    onFail: PropTypes.func,
    onRemove: PropTypes.func //返回false不移除，支持返回 Promise (resolve(false) 或 reject 时不移除)
}
ImageUpload.defaultProps = {
    imageCount: 1,
    accept: 'image/*'
}
