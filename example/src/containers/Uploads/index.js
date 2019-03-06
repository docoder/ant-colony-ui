/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import styled from 'styled-components';
import { Upload, ImageUpload } from 'ant-colony-ui';

const UploadsBody = styled.div`
    background: white;
    min-height: 360px;
    padding: 24px;
`;
const StyledUpload = styled(Upload)`
    margin-bottom: 10px;
`;

export default class Uploads extends React.Component {
    state = {
        fileList: [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }]
    }
    render() {
        return (
            <UploadsBody>
                <StyledUpload 
                    url="url" 
                    defaultFileList={[
                        {
                            name: "bx-upload.svg",
                            status: "done",
                            uid: "rc-upload-1551879926587-2",
                            url: "https://image.guazistatic.com/gz01190306/21/46/4dde721a1d40622f91d1bdd46c699a1a.svg"
                        }
                    ]}
                    listType="text"
                    onUploadedChange={(info) => {
                        console.log('=====>', info)
                    }}
                />
                <ImageUpload url="url" />
                <ImageUpload url="url" uploadTitle="已上传" />
                <ImageUpload
                    url="url"
                    multiple
                    uploadTitle='上传附件标题'
                    withCredentials={false}
                    imageCount={4}
                    fileList={this.state.fileList}
                    onChange={(info) => {
                        if (info.file.status === 'done' || info.file.status === 'removed') {
                            console.log('Images:done>>>', info.file)
                        } else if (info.file.status === 'error') {
                            console.log('Images:error>>>', info.file)
                        }
                        this.setState({ fileList: info.fileList })
                    }}
                    onRemove={(file) => {console.log('Images:remove>>>', file)}}
                    beforePreview={(file) => {
                        return true
                    }}
                />
            </UploadsBody>
        );
    }
}