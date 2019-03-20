/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import styled from 'styled-components';
import { Toggle, Checkbox } from 'ant-colony-ui';

const SelectButtonBody = styled.div`
    margin-top: 60px;
    padding: 30px;
`;

const StyledToggle = styled(Toggle)`
    margin-left: 20px;
`;
const StyledCheckbox = styled(Checkbox)`
    margin-left: 20px;
`;

export default function SelectButtons (props) {
    return (
        <SelectButtonBody>
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
        <StyledCheckbox
            onChange={(value) => console.log('--checkbox1--->', value)}
        >
            多选框1
        </StyledCheckbox>
        <StyledCheckbox
            onChange={(value) => console.log('--checkbox2--->', value)}
        >
            多选框2
        </StyledCheckbox>       
        </SelectButtonBody>
    )
}