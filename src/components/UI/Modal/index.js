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
            width={props.width}
            mask={props.mask}
            getContainer={props.getContainer}
            destroyOnClose={props.destroyOnClose}
        >
            {props.children}
        </AntModal>
    );
}
Modal.propTypes = {
    getContainer: PropTypes.PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.element,
        PropTypes.func
    ]),
    visible: PropTypes.bool,
    title:PropTypes.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    width: PropTypes.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    mask: PropTypes.bool,
    footer: PropTypes.PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    destroyOnClose: PropTypes.bool
}