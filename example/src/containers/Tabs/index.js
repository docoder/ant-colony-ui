/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import styled from 'styled-components';
import { Tabs } from 'ant-colony-ui';

const TabsBody = styled.div`
    background: white;
    min-height: 360px;
    padding: 24px;
`;
const Panel = Tabs.Panel;

export default function TabsExample () {
    return (
            <TabsBody>
                <Tabs defaultActiveKey="1" onChange={(key) => console.log(key)}>
                    <Panel tab="Tab 1" key="1">Content of Tab Pane 1</Panel>
                    <Panel tab="Tab 2" key="2">Content of Tab Pane 2</Panel>
                    <Panel tab="Tab 3" key="3">Content of Tab Pane 3</Panel>
                </Tabs>
            </TabsBody>
        );
}