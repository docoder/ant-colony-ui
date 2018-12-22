/*
* @Author: lijian
* @Email:  lijian46@guazi.com
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Form, Row, Col, Input, Button, Icon, Select
} from 'antd';

const FormItem = Form.Item;
const StyledForm = styled(Form)`
    background: #fbfbfb;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    &.ant-form {
        padding: 24px;
    }
    .ant-form-item {
        display: flex;
    }
    .ant-form-item-control-wrapper {
        flex: 1;
    }
`;
const FormCol = styled(Col)`
    &.ant-col-8 {
        display: ${props => props.show === 'true' ? 'block' : 'none'};
    }
`;
const ButtonsCol = styled(Col)`
    text-align: right;
`;
const ClearButton = styled(Button)`
    margin-left: 8px;
`;
const CollapseToggle = styled.a`
    margin-left: 8px;
    font-size: 12px;
`;

class MyForm extends React.Component {
    state = {
        expand: false,
    };

    getInput = (item) => {
        switch (item.type) {
            case 'select':
            return (
                <Select
                    optionFilterProp={item.meta.filterProp}
                    showSearch={item.meta.showSearch}
                    allowClear={item.meta.showSearch}
                    placeholder={`请选择${item.label}`}
                    >
                {
                    item.meta.data.length > 0 ?
                    item.meta.data.map((item, index) => (
                            <Select.Option value={ item.value.toString() } key={ item.value }>{ item.label }</Select.Option>
                        ))
                    : null
                }
                </Select>
            );
            default:
                return (<Input placeholder={`请输入${item.label}`} />);
        }
    }

    getFields = () => {
        const { forms, collapse, unCollapseCount } = this.props;
        const count = (this.state.expand || !collapse) ? forms.length : unCollapseCount;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        forms.forEach( (item, index) => {
            children.push(
                <FormCol span={8} key={item.key} show={index < count ? 'true' : 'false'}>
                    <FormItem label={item.label}>
                        {getFieldDecorator(`${item.key}`, {
                            rules: item.reg ? [
                                { required: item.required, message: `${item.label}为必填项`},
                                item.reg
                            ] : [
                                { required: item.required, message: `${item.label}为必填项`}
                            ],
                        })(
                            this.getInput(item)
                        )}  
                    </FormItem>
                </FormCol>
            );
        });
        return children;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { forms, form, onSubmit } = this.props;
        form.validateFields((err, values) => {
            if(!err) {
                forms.forEach( item => {
                    form.setFieldsValue({
                        [item.key]: '',
                    })
                })
                onSubmit(values);
            }
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    render() {
        const { forms, submitTitle, clearTitle, collapse, collapseTitle, unCollapseCount } = this.props;
        return (
            <StyledForm
                onSubmit={this.handleSubmit}
            >
                <Row gutter={24}>{this.getFields()}</Row>
                <Row>
                    <ButtonsCol span={24}>
                        <Button type="primary" htmlType="submit">{submitTitle}</Button>
                        <ClearButton onClick={this.handleReset}>
                            {clearTitle}
                        </ClearButton>
                        {
                            collapse && forms.length > unCollapseCount && <CollapseToggle onClick={this.toggle}>
                                            {collapseTitle} <Icon type={this.state.expand ? 'up' : 'down'} />
                                        </CollapseToggle>
                        }
                        
                    </ButtonsCol>
                </Row>
            </StyledForm>
        );
    }
}
const WrappedForm = Form.create()(MyForm);
WrappedForm.propTypes = {
    forms: PropTypes.arrayOf(PropTypes.object).isRequired,
    submitTitle: PropTypes.string,
    clearTitle: PropTypes.string,
    collapseTitle: PropTypes.string,
    collapse: PropTypes.bool,
    unCollapseCount: PropTypes.number,
    onSubmit: PropTypes.func.isRequired
}
WrappedForm.defaultProps = {
    submitTitle: '提交',
    clearTitle: '重置',
    collapseTitle: '折叠',
    collapse: true,
    unCollapseCount: 6
}
export default WrappedForm;