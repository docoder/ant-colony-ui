/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Modal as AntModal } from 'antd';

export default function Modal(props) {
    return (
        <AntModal
            visible={props.visible}
            title={props.title}
            onOk={props.onOk}
            onCancel={props.onCancel}
            footer={props.footer}
        >
            {props.children}
        </AntModal>
    );
}
Modal.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    footer: PropTypes.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ])
}