/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input as AntInput } from 'antd';

const InputBody = styled.div`
    display: inline-block;
`;
export default class Input extends React.Component {
    componentDidMount() {
        if (this.props.withInputDoneListen) {
            document.addEventListener('click', this.inputDone, true);
        }
        this.props.didMount(this.input)
    }

    componentWillUnmount() {
        if (this.props.withInputDoneListen) {
            document.removeEventListener('click', this.inputDone, true);
        }
    }
    inputDone = () => {
        if(this.props.withInputDoneListen) {
            this.props.done(this.input)
        }
    }
    render() {
        return (
            <InputBody className={this.props.className}>
                <AntInput
                    ref={node => (this.input = node)}
                    onPressEnter={this.inputDone}
                />
            </InputBody>
        );
    }
}
Input.propTypes = {
    withInputDoneListen: PropTypes.bool,
    done: PropTypes.func,
    didMount: PropTypes.func
}
Input.defaultProps = {
    done: () =>{},
    withInputDoneListen: false,
    didMount: () => {}
}