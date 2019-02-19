/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Radio } from 'antd';

function Toggle(props) {
    return (
        <span className={props.className}>
            <Radio.Group
                defaultValue={props.defaultValue} 
                buttonStyle={props.buttonStyle}
                onChange={props.onChange}
            >
            {props.children}
            </Radio.Group>
        </span>
    );
}
Toggle.propTypes = {
    defaultValue: PropTypes.PropTypes.any,
    buttonStyle: PropTypes.oneOf(['outline', 'solid']),
    onChange: PropTypes.func
}
Toggle.defaultProps = {
    buttonStyle: 'outline'
}
function Button(props) {
    return (
        <Radio.Button 
            className={props.className}
            value={props.value}
            disable={props.disable}
        >
        {props.children}
        </Radio.Button>
    )
}
Button.propTypes = {
    value: PropTypes.PropTypes.any,
    disable: PropTypes.bool
}
Button.defaultProps = {
    disable: false
}

Toggle.Button = Button

export {
    Toggle as default
}