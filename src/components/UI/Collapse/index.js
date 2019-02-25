/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Collapse as AntCollapse, Icon } from 'antd';

function Collapse(props) {
    return (
        <AntCollapse
            {...props}
            defaultActiveKey={props.defaultActiveKey}
            onChange={props.onChange}
            accordion={props.accordion}
            expandIcon={({ isActive }) => isActive ? <Icon type="minus-square" /> : <Icon type="plus-square" />}
        />
    );
}
Collapse.propTypes = {
    defaultActiveKey: PropTypes.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    onChange: PropTypes.func,
    accordion: PropTypes.bool
}
Collapse.defaultProps = {
    accordion: false
}

function Panel(props) {
    return (
        <AntCollapse.Panel
            {...props}
            header={props.header}
            showArrow={props.showArrow}
        />
    )
}
Panel.propTypes = {
    header: PropTypes.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    showArrow: PropTypes.bool
}
Panel.defaultProps = {
    showArrow: true
}

Collapse.Panel = Panel

export {
    Collapse as default
}
