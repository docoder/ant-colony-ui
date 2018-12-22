/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import styled from 'styled-components';

const DashboardBody = styled.div`
    background: white;
    min-height: 360px;
    padding: 24px;
`;

export default class Dashboard extends React.Component {
    render() {
        return (
            <DashboardBody>
            Dashboard
            </DashboardBody>
        );
    }
}
