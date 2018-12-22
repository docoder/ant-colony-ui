/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import styled from 'styled-components';
import { Button, Alert } from 'xinche-ui';

const AlertsBody = styled.div`
    background: white;
    min-height: 360px;
    padding: 24px;
`;
const StyledButton = styled(Button)`
    margin-left: 10px;
`;

export default function Alerts () {
    return (
            <AlertsBody>
                <StyledButton title="Success" onClick={()=>{Alert('success', '操作成功');}} />
                <StyledButton title="Error" onClick={()=>{Alert('error', '操作失败');}} />
                <StyledButton title="Warning" onClick={()=>{Alert('warning', '警告！！！');}} />
                <StyledButton title="Info" onClick={()=>{Alert('info', '这个个提示');}} />
            </AlertsBody>
        );
}