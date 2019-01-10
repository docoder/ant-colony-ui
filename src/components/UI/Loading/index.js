/*
* @Author: lijian
* @Email:  lijian46@guazi.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    Spin,
    message,
    Icon
} from 'antd';

const SpinContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255,255,255,0.01);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
`;
const SpinBox = styled.div`
    width: 100px;
    height: 100px;
    background-color: rgba(0,32,64,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

const spinIcon = <Icon type="loading-3-quarters" style={{ fontSize: 32, color: 'white' }} spin />;
export default class Loading extends React.Component {
    componentDidMount() {
        this.timer = setTimeout(()=>{
            this.props.timeout()
        }, 30000)
    }
    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }
    render() {
        switch(this.props.type) {
            case 'alert':
            this.props.show 
            ? 
            message.loading(this.props.message, 30, this.props.timeout)
            :
            message.destroy()
            return null;
            case 'overall':
            return(
                this.props.show ? <SpinContainer><SpinBox><Spin size="large" indicator={spinIcon} /></SpinBox></SpinContainer> : null
            )
        }
        
    }
}
Loading.propTypes = {
    timeout: PropTypes.func,
    type: PropTypes.string,
    message: PropTypes.string,
    show: PropTypes.bool
}
Loading.defaultProps = {
    timeout: () => {},
    type: 'alert',
    message: '正在努力加载中',
    show: false
}