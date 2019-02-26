/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import styled from 'styled-components';
import { Button } from 'ant-colony-ui';

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
                <StyledButton type="primary" title="Primary" />
                <StyledButton title="Default" />
                <StyledButton type="dashed" title="Dashed" />
                <StyledButton type="danger" title="Danger" />
            </ButtonsBody>
        );
    }
}