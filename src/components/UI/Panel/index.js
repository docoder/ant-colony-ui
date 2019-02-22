/*
* @Author: docoder
* @Email:  docoder@163.com
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import styled from 'styled-components';

const CardContainer = styled.div`
    & > .ant-card > .ant-card-body {
        padding: ${props => props.padding ? '24px 32px' : '0'};
    }
`;

function Panel(props) {
    let padding = true
    if (props.children 
        && props.children.length > 0 
        && props.children[0] 
        && props.children[0].props 
        && ~props.children[0].type 
        && ~props.children[0].type.displayName 
        && ~props.children[0].type.displayName.indexOf('Grid')) {
        padding = false
    }
    return (
        <CardContainer className={props.className} padding={padding}>
            <Card
                title={props.title}
                type={props.type}
                extra={props.extra}
            >
                {props.children}
            </Card>
        </CardContainer>
    );
}
Panel.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    type: PropTypes.string,
    extra: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

function Grid(props) {
    return (
        <Card.Grid
            className={props.className}
            style={{width: props.width}}
        >
            {props.children}
        </Card.Grid>
    )
}
Grid.propTypes = {
    width: PropTypes.string
}

Panel.Grid = styled(Grid)``;

export default Panel;