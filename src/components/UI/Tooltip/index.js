/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as AntTooltip } from 'antd';

export default function Tooltip(props) {
    return (
        <AntTooltip
            title={props.title}
            placement={props.placement}
        >
            {props.children}
        </AntTooltip>
    );
}
Tooltip.propTypes = {
    title: PropTypes.string,
    placement: PropTypes.oneOf(['top','left','right','bottom','topLeft','topRight','bottomLeft','bottomRight','leftTop','leftBottom','rightTop','rightBottom'])
}