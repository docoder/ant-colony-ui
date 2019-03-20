/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Checkbox as AntCheckbox } from 'antd';

function Checkbox(props) {
    return (
        <span className={props.className}>
            <AntCheckbox
                onChange={props.onChange}
                disabled={props.disabled}
                defaultChecked={props.defaultChecked}
            >
                {props.children}
            </AntCheckbox>
        </span>
    );
}
Checkbox.propTypes = {
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
}
Checkbox.defaultProps = {
    defaultChecked: false,
    disabled: false
}
export {
    Checkbox as default
}
