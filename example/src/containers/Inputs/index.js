/*
* @Author: huangzishuo
* @Email:  huangzishuo@163.com
*/
import React from 'react';
import styled from 'styled-components';
import { Input } from 'ant-colony-ui';

const InputBody = styled.div`
    background: white;
    min-height: 360px;
    padding: 24px;
`;
const StyledInput = styled(Input)`
    margin-left: 10px;
`;

export default class Buttons extends React.Component {
    render() {
        return (
            <InputBody>
                <StyledInput addonAfter={"%"} />
                <StyledInput addonBefore={"http"} />
            </InputBody>
        );
    }
}