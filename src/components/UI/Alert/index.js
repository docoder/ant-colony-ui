/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import { Alert as AntAlert } from 'antd';

export default function Alert(props) {
    return (
        <AntAlert
            className={props.className}
            message={props.message}
            description={props.description}
            type={props.type}
            closable
            showIcon
            onClose={props.onClose}
        />
    );
}

Alert.propTypes = {
    type: PropTypes.string,
    message: PropTypes.string,
    description: PropTypes.string,
    onClose: PropTypes.func
}