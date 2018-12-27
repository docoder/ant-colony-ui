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
        </UploadsBody>
    );
}