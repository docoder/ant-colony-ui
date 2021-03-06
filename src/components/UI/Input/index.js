/*
 * @Author: docoder
 * @Email:  docoder@163.com
 */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Input as AntInput } from 'antd'

const InputBody = styled.div`
  display: inline-block;
`
export default class Input extends React.Component {
  componentDidMount() {
    if (this.props.withInputDoneListen) {
      document.addEventListener('click', this.handleClickOutside, true)
    }
    this.props.didMount(this.input)
  }

  componentWillUnmount() {
    if (this.props.withInputDoneListen) {
      document.removeEventListener('click', this.handleClickOutside, true)
    }
  }
  handleClickOutside = e => {
    if (this.inputBody !== e.target && !this.inputBody.contains(e.target)) {
      this.inputDone()
    }
  };
  inputDone = () => {
    if (this.props.withInputDoneListen) {
      this.props.done(this.input)
    }
  };
  render() {
    return (
      <InputBody
        ref={node => (this.inputBody = node)}
        className={this.props.className}
      >
        <AntInput
          ref={node => (this.input = node)}
          onPressEnter={this.inputDone}
          defaultValue={this.props.defaultValue}
          addonBefore={this.props.addonBefore}
          addonAfter={this.props.addonAfter}
          prefix={this.props.prefix}
          suffix={this.props.suffix}
          allowClear={this.props.allowClear}
          size={this.props.size}
          placeholder={this.props.placeholder}
        />
      </InputBody>
    )
  }
}
Input.propTypes = {
  withInputDoneListen: PropTypes.bool,
  done: PropTypes.func,
  didMount: PropTypes.func,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  addonBefore: PropTypes.node,
  addonAfter: PropTypes.node,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  allowClear: PropTypes.bool
}
Input.defaultProps = {
  done: () => {},
  withInputDoneListen: false,
  didMount: () => {}
}
