/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import styled from 'styled-components';
import { Button } from 'xinche-ui';

const ButtonsBody = styled.div`
    background: white;
    min-height: 360px;
    padding: 24px;
`;
const StyledButton = styled(Button)`
    margin-left: 10px;
`;

export default class Buttons extends React.Component {
    render() {
        return (
            <ButtonsBody>
                <StyledButton type="primary" title="Primary" onClick={()=>{}} />
                <StyledButton title="Default" onClick={()=>{}} />
                <StyledButton type="dashed" title="Dashed" onClick={()=>{}} />
                <StyledButton type="danger" title="Danger" onClick={()=>{}} />
            </ButtonsBody>
        );
    }
}