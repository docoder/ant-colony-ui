/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import styled from 'styled-components';
import { Button, Alert } from 'ant-colony-ui';

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
                <StyledButton title="Success" onClick={()=>{Alert('操作成功', 'success');}} />
                <StyledButton title="Error" onClick={()=>{Alert('操作失败', 'error', '失败啦！');}} />
                <StyledButton title="Warning" onClick={()=>{Alert('警告！！！', 'warning');}} />
                <StyledButton title="Info" onClick={()=>{Alert('这个个提示');}} />
            </AlertsBody>
        );
}