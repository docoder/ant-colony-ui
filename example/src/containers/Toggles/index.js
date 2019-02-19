/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import styled from 'styled-components';
import { Toggle } from 'ant-colony-ui';

const TogglesBody = styled.div`
    margin-top: 60px;
    padding: 30px;
`;

const StyledToggle = styled(Toggle)`
    margin-left: 20px;
`;

export default function Toggles (props) {
    return (
        <TogglesBody>
        <Toggle
            defaultValue="a" 
            onChange={(e) => console.log(`Toggle 1 changed:${e.target.value}`)}
        >
            <Toggle.Button value="a">Hangzhou</Toggle.Button>
            <Toggle.Button value="b">Shanghai</Toggle.Button>
            <Toggle.Button value="c">Beijing</Toggle.Button>
            <Toggle.Button value="d">Chengdu</Toggle.Button>
        </Toggle>
        <StyledToggle
            defaultValue="a" 
            buttonStyle="solid" 
            onChange={(e) => console.log(`Toggle 2 changed:${e.target.value}`)}
        >
            <Toggle.Button value="a">Hangzhou</Toggle.Button>
            <Toggle.Button value="b">Shanghai</Toggle.Button>
            <Toggle.Button value="c">Beijing</Toggle.Button>
            <Toggle.Button value="d">Chengdu</Toggle.Button>
        </StyledToggle>
        </TogglesBody>
    )
}