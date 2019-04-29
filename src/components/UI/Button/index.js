/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Button as AntButton } from 'antd';
import styled from 'styled-components';
const StyledButton = styled(AntButton)`
    &.ant-btn-danger {
        color: white;
        border-color: #f5222d; 
        background-color: #f5222d;
    }
    &.ant-btn-danger:focus {
        color: white;
        border-color: #f5222d; 
        background-color: #f5222d;
    }
    &.ant-btn-default {
        color: #1890ff;
        border-color: #1890ff;
    }
`;

export default function Button(props) {
    return (
        <StyledButton 
            className={props.className}
            type={props.type}
            title={props.title}
            onClick={props.onClick}
            disabled={props.disabled}
            loading={props.loading}
            htmlType={props.htmlType}
        >
            {props.title || props.children}
        </StyledButton>
    );
}
Button.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    htmlType: PropTypes.string
}
Button.defaultProps = {
    type: 'default',
    disabled: false,
    loading: false,
    onClick: () => {}
}