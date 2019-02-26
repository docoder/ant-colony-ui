/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import styled from 'styled-components';
import { Panel } from 'ant-colony-ui';

const PanelsBody = styled.div`
    background: white;
    min-height: 360px;
    padding: 24px;
`;
const StyledPanel = styled(Panel)`
    margin-bottom: 10px;
`;
const StyledInnerPanel = styled(Panel)`
    margin-top: 10px;
`;
const StyledGrid = styled(Panel.Grid)`
    text-align: center;
`;
const StyledGridPanel = styled(Panel)`
    margin-bottom: 10px;
    width: 50%;
`;
const GridTitle = styled.span`
    color: #999;
`;
const GridExtraValue = styled.span`
    font-size: 16px;
    font-weight: 500;
`;

export default class Panels extends React.Component {
    render() {
        return (
            <PanelsBody>
                <StyledPanel title="面板1">面板1内容</StyledPanel>
                <StyledPanel title="面板2">
                    <StyledInnerPanel title="面板2内层面板1" type="inner">
                        面板2内层面板1内容
                    </StyledInnerPanel>
                    <StyledInnerPanel title="面板2内层面板2" type="inner">
                        面板2内层面板2内容
                    </StyledInnerPanel>

                    <StyledInnerPanel type="inner">
                        面板2内层面板3内容
                    </StyledInnerPanel>
                </StyledPanel>
                <StyledGridPanel title="面板3" extra={<div><GridTitle>状态: </GridTitle><GridExtraValue>状态1</GridExtraValue></div>}>
                    <Panel.Grid width="50%"><GridTitle>标题1: </GridTitle>内容2</Panel.Grid>
                    <Panel.Grid width="50%"><GridTitle>标题2: </GridTitle>内容2</Panel.Grid>
                    <Panel.Grid width="50%"><GridTitle>标题2: </GridTitle>内容2</Panel.Grid>
                    <Panel.Grid width="50%"><GridTitle>标题2: </GridTitle>内容2</Panel.Grid>
                    <Panel.Grid width="50%"><GridTitle>标题2: </GridTitle>内容2</Panel.Grid>
                    <StyledGrid width="50%"><GridTitle>标题3: </GridTitle>内容1</StyledGrid>
                </StyledGridPanel>
                <Panel title="面板4" extra={<div><GridTitle>状态: </GridTitle><GridExtraValue>状态2</GridExtraValue></div>}>
                    <Panel.Grid width="33.33%"><GridTitle>标题1: </GridTitle>内容2</Panel.Grid>
                    <Panel.Grid width="33.33%"><GridTitle>标题2: </GridTitle>内容2</Panel.Grid>
                    <Panel.Grid width="33.33%"><GridTitle>标题2: </GridTitle>内容2</Panel.Grid>
                    <Panel.Grid width="100%">
                        <Panel type="inner" title="附件信息">
                            文档.docx
                        </Panel>
                    </Panel.Grid>
                </Panel>
            </PanelsBody>
        );
    }
}