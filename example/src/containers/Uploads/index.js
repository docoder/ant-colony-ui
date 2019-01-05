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

export default function Uploads () {
    return (
        <UploadsBody>
            <StyledUpload url="url" />
            <ImageUpload url="url" />
            <ImageUpload url="url" uploadTitle="已上传" />
            <ImageUpload
                url="url"
                multiple
                uploadTitle='上传附件标题'
                withCredentials={false}
                imageCount={4}
                onUploadedChange={({ fileList })=>{console.log('Images:>>>', fileList)}}
                onRemove={(file) => {console.log('Images:remove>>>', file)}}
                onFail={(info)=>{console.log('Images:fail>>>', info)}}
            />
        </UploadsBody>
    );
}