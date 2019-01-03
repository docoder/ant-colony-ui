/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React, { useState } from 'react';
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
const AlertContainer = styled.div`
    margin-top: 20px;
`;
const StyledAlert = styled(Alert)`
    &.ant-alert {
        margin-left: 30px;
    }
`;

export default function Alerts () {
    const [showSuccess, setSuccess] = useState(false);
    const [showError, setError] = useState(false);
    const [showWarning, setWarning] = useState(false);
    const [showInfo, setInfo] = useState(false);
    return (
            <AlertsBody>
                <StyledButton title="Success" onClick={() => {setSuccess(true)}} />
                <StyledButton title="Error" onClick={()=> {setError(true)}} />
                <StyledButton title="Warning" onClick={()=> {setWarning(true)}} />
                <StyledButton title="Info" onClick={()=> {setInfo(true)}} />
                <AlertContainer>
                    {showSuccess && <StyledAlert type="success" message="成功了" onClose={() => { setSuccess(false) }}/>}
                    {showError && <Alert type="error" message="失败了" description="失败原因正在调查中" onClose={() => { setError(false) }}/>}
                    {showWarning && <Alert type="warning" message="这是个警告" onClose={() => { setWarning(false) }}/>}
                    {showInfo && <Alert type="info" message="这是个提示" description="提示就是提示"  onClose={() => { setInfo(false) }}/>}
                </AlertContainer>
            </AlertsBody>
        );
}