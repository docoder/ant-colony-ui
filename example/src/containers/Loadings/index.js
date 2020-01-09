/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Loading } from 'ant-colony-ui';

const LoadingsBody = styled.div`
    background: white;
    min-height: 360px;
    padding: 24px;
`;
const StyledButton = styled(Button)`
    margin-left: 10px;
`;

export default function Loadings () {
    const [isOverallLoading, setOverallLoading] = useState(false);
    const [isAlertLoading, setAlertLoading] = useState(false);
    return (
            <LoadingsBody>
                <StyledButton title="Toggle Alert Loading" onClick={()=>{setAlertLoading(!isAlertLoading)}} />
                <StyledButton title="Toggle Overall Loading" onClick={()=>{setOverallLoading(!isOverallLoading)}} />
                <Loading show={isOverallLoading} type="overall" timeout={() => {setOverallLoading(false)}} />
                <Loading show={isAlertLoading} type="alert" timeout={() => {setAlertLoading(false)}} />
            </LoadingsBody>
        );
}