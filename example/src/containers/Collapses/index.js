/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import styled from 'styled-components';
import { Collapse, Input } from 'ant-colony-ui';

const CollapseBody = styled.div`
    background: white;
    min-height: 360px;
    padding: 24px;
`;
const StyledInput = styled(Input)`
    width: 100px;
    margin-left: 20px;
`;
const Panel = Collapse.Panel;

export default function Collapses () {
    const text = `
        A dog is a type of domesticated animal.
        Known for its loyalty and faithfulness,
        it can be found as a welcome guest in many households across the world.
    `;
    let input = null;
    return (
            <CollapseBody>
                <Collapse 
                    defaultActiveKey={['1']} 
                    onChange={(key) => {
                        console.log('====Collapses key====>', key);
                    }}
                >
                    <Panel header={
                        <span>This is panel header 1 
                            <StyledInput
                                didMount={(target) => {
                                    input = target.input; 
                                    console.log('====Collapses input didMount====>', target.input.value)
                                }}
                                type="text" 
                                withInputDoneListen
                                done={(target) => {
                                    console.log('====Collapses input 1 done====>', input.value, target.input.value)
                                }} 
                            />
                        </span>
                    } key="1">
                      <p>{text}</p>
                    </Panel>
                    <Panel header={
                        <span>This is panel header 2 
                            <StyledInput 
                                type="text"
                                done={(cmp) => {console.log('====Collapses input 2 done====>', cmp.input.value)}} 
                            />
                        </span>
                    } key="2">
                      <p>{text}</p>
                    </Panel>
                    <Panel header="This is panel header 3" key="3" disabled>
                      <p>{text}</p>
                    </Panel>
                </Collapse>
            </CollapseBody>
        );
}