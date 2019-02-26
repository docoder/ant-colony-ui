/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tabs as AntTabs } from 'antd';

function Tabs(props) {
    return (
        <span className={props.className}>
            <AntTabs
                defaultActiveKey={props.defaultActiveKey}
                onChange={props.onChange}
                animated={false}
            >
                {props.children}
            </AntTabs>
        </span>
    );
}
Tabs.propTypes = {
    defaultActiveKey: PropTypes.string,
    onChange: PropTypes.func
}
function Panel(props) {
    return (
        <AntTabs.TabPane
            {...props}
            tab={props.tab}
        />
    )
}
Panel.propTypes = {
    title: PropTypes.string
}

Tabs.Panel = Panel

export default Tabs;