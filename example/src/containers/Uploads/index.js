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
const ImageUploadContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export default function Uploads () {
    return (
        <UploadsBody>
            <StyledUpload url="url" />
            <ImageUpload url="url" />
            <ImageUploadContainer>
                <ImageUpload url="url" uploadTitle="已上传" />
                <ImageUpload url="url" uploadTitle="上传附件标题" imageCount={4} />
            </ImageUploadContainer>
        </UploadsBody>
    );
}