/*
* @Author: lijian
* @Email:  lijian46@guazi.com
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Form, Row, Col, Input, Icon, Select
} from 'antd';
import Button from '../Button';

const { TextArea } = Input;
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
const ButtonsCol = styled(Col)`
    text-align: ${props => props.direction === 'right' ? 'right' : 'left'};
`;
const ClearButton = styled(Button)`
    margin-left: 8px;
`;
const CollapseToggle = styled.a`
    margin-left: 8px;
    font-size: 12px;
`;
const FormBody = styled.div`
`;

class MyForm extends React.Component {
    state = {
        expand: false,
    };
    renderOptions = (item) => {
        let data = item.meta ? (item.meta.data || []) : [], items;
        if (typeof data == 'function') {
            let refValue = null;
            if (item.meta.ref) {
                refValue = this.props.form.getFieldValue(item.meta.ref)
            }
            items = refValue ? data(refValue) : []
        }else {
            items = data;
        }
        return items.map((item, index) => (
            <Select.Option value={ item.value.toString() } key={ item.value }>{ item.label }</Select.Option>
        ))
    }
    getInput = (item) => {
        let refLabel = null;
        item.meta = item.meta || {};
        if (item.meta.ref) {
            const refItem = this.props.forms.find(i => i.key === item.meta.ref);
            refLabel = refItem.label;
        }
        switch (item.type) {
            case 'select':
                return (
                    <Select
                        optionFilterProp="children"
                        showSearch={item.meta.showSearch}
                        allowClear={item.meta.showSearch}
                        placeholder={`请选择${item.label}`}
                        notFoundContent={refLabel ? `请先选择 ${refLabel}` : '没有内容'}
                        >
                    {
                        this.renderOptions(item)
                    }
                    </Select>
                );
            case 'textArea':
                let minRows = 2, maxRows = 6;
                if (item.meta) {
                    minRows = item.meta.minRows || minRows;
                    maxRows = item.meta.maxRows || maxRows;
                }
                return (
                    <TextArea placeholder={`请输入${item.label}`} autosize={{ minRows, maxRows }} />
                );
            default:
                return (<Input placeholder={`请输入${item.label}`} />);
        }
    }

    getRows = () => {
        const { forms, collapse, unCollapseCount, columnCount} = this.props;
        const count = (this.state.expand || !collapse) ? forms.length : unCollapseCount;
        const { getFieldDecorator } = this.props.form;
        let children = [];
        let rows = [];
        forms.forEach( (item, index) => {
            children.push(
                <Col span={24/columnCount} key={item.key} style={{display: index < count ? 'block' : 'none'}}>
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
                </Col>
            );
            if (children.length === columnCount || index === forms.length - 1) {
                rows.push(
                    <Row key={item.key} gutter={24}>
                    {[...children]}
                    </Row>
                )
                children.length = 0;
            }
        });
        return rows;
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
        const { forms, submitTitle, clearTitle, collapse, collapseTitle, unCollapseCount, className, actionDirection } = this.props;
        return (
            <FormBody className={className}>
                <StyledForm
                    onSubmit={this.handleSubmit}
                >
                    
                    {this.getRows()}
                    <Row>
                        <ButtonsCol span={24} direction={actionDirection}>
                            <Button type="primary" htmlType="submit" title={submitTitle} />
                            <ClearButton onClick={this.handleReset} title={clearTitle} />
                            {
                                collapse && forms.length > unCollapseCount && <CollapseToggle onClick={this.toggle}>
                                                {collapseTitle} <Icon type={this.state.expand ? 'up' : 'down'} />
                                            </CollapseToggle>
                            }
                            
                        </ButtonsCol>
                    </Row>
                </StyledForm>
            </FormBody>
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
    onSubmit: PropTypes.func.isRequired,
    actionDirection: PropTypes.string,
    columnCount: PropTypes.number
}
WrappedForm.defaultProps = {
    submitTitle: '提交',
    clearTitle: '重置',
    collapseTitle: '折叠',
    collapse: false,
    unCollapseCount: 8,
    actionDirection: 'left',
    columnCount: 4
}
export default WrappedForm;