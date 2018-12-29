/*
* @Author: lijian
* @Email:  lijian46@guazi.com
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Form as AntForm, Row, Col, Input, Icon, Select
} from 'antd';
import Button from '../Button';

const { TextArea } = Input;
const FormItem = AntForm.Item;
const StyledForm = styled(AntForm)`
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
const FormHeader = styled.div`
    padding-left: 10px;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;
const AddButton = styled(Button)`
    width: 25%;
    margin-left: 15px;
    margin-bottom: 20px;
`;
const DeleteButton = styled(Icon)`
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all .3s;
    &:hover {
        color: #777;
    }
`;

class Form extends React.Component {
    state = {
        expand: false,
    };
    constructor(props) {
        super(props)
        this.rowCounts = this.props.rowCounts;
    }
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
             const formItems = this.props.form.getFieldValue('forms');
            const refItem = formItems.find(i => i.key === item.meta.ref);
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

    formAddItem = (index, rowIndex) => {
        const { form, columnCount } = this.props;
        const formItems = form.getFieldValue('forms');
        const item = formItems[index];
        const filtItems = formItems.filter(f => ~item.addKeys.indexOf(f.key))
        const itemsToAdd = JSON.parse(JSON.stringify(filtItems)).map((it, i)=> {
            it.key = `${it.key}_${rowIndex}`
            it.canDelete = true
            if(i=== filtItems.length - 1) {
                it.appendDeleteButton = true
                it.rowIndex = rowIndex
            }
            return it;
        })
        formItems.splice(index, 0, ...itemsToAdd)
        const count = this.rowCounts[rowIndex-1];
        const rowCount = Math.floor(item.addKeys.length / this.rowCounts[rowIndex-1]);
        this.rowCounts.splice(rowIndex, 0, ...(Array(rowCount).fill(count)))

        form.setFieldsValue({
            forms: formItems
        })
    }
    formRemoveItem = (keys, rowIndex) => {
        const { form } = this.props;
        const formItems = form.getFieldValue('forms');
        const filtItems = formItems.filter(f => !~keys.indexOf(f.key))
        const rowCount = Math.floor(keys.length / this.rowCounts[rowIndex-1]);
        this.rowCounts.splice(rowIndex, rowCount)
        form.setFieldsValue({
            forms: filtItems
        })
    }

    getRows = () => {
        const { form, collapse, unCollapseCount, columnCount} = this.props;
        const formItems = form.getFieldValue('forms');
        const count = (this.state.expand || !collapse) ? formItems.length : unCollapseCount;
        const { getFieldDecorator } = form;
        let children = [];
        let rows = [];
        let rowIndex = 0;
        let rowColIndex = 0;
        let rowColMaxCount = columnCount;
        let deleteKeys = [];
        for (let index = 0; index< formItems.length; index++) {
            const item = formItems[index];
            if(item.canDelete) {
                deleteKeys.push(item.key)
            }
            if(item.type === 'header') {
                rows.push(
                    <Row key={item.key} gutter={24}>
                        <FormHeader>{item.label}</FormHeader>
                    </Row>
                )
                continue;
            }
            if(item.type === 'add') {
                rows.push(
                    <Row key={item.key} gutter={24}>
                        <AddButton type="dashed" onClick={this.formAddItem.bind(this, index, rowIndex)}>
                            <Icon type="plus" />
                        </AddButton>
                    </Row>
                )
                continue;
            }
            rowColIndex += 1;
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
            if(this.rowCounts[rowIndex]) {
                rowColMaxCount = this.rowCounts[rowIndex];
            }
            if (this.rowCounts.length > 0 && this.rowCounts[rowIndex] && this.rowCounts[rowIndex] === rowColIndex) {
                rowColMaxCount = this.rowCounts[rowIndex];
                rowColIndex = 0;
            }

            if (children.length === rowColMaxCount || index === formItems.length - 1) {
                rows.push(
                    <Row key={item.key} gutter={24}>
                    {[...children]}
                    {
                        item.appendDeleteButton && <DeleteButton
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={this.formRemoveItem.bind(this, [...deleteKeys], rowIndex)}
                        />
                    }
                    </Row>
                )
                if (item.appendDeleteButton) {
                    deleteKeys.length = 0;
                }
                children.length = 0
                rowIndex += 1;
            }
        }
        return rows;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, onSubmit } = this.props;
        const formItems = form.getFieldValue('forms');
        form.validateFields((err, values) => {
            if(!err) {
                formItems.forEach( item => {
                    if(
                        item.type !== 'header'
                        && 
                        item.type !== 'add'
                        ) {
                        form.setFieldsValue({
                            [item.key]: '',
                        })
                    }
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
        const { form, forms, submitTitle, clearTitle, collapse, collapseTitle, unCollapseCount, className, actionDirection } = this.props;
        form.getFieldDecorator('forms', { initialValue: forms });
        const formItems =form.getFieldValue('forms');
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
                                collapse && formItems.length > unCollapseCount && <CollapseToggle onClick={this.toggle}>
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
const WrappedForm = AntForm.create()(Form);
WrappedForm.propTypes = {
    forms: PropTypes.arrayOf(PropTypes.object).isRequired,
    submitTitle: PropTypes.string,
    clearTitle: PropTypes.string,
    collapseTitle: PropTypes.string,
    collapse: PropTypes.bool,
    unCollapseCount: PropTypes.number,
    onSubmit: PropTypes.func.isRequired,
    actionDirection: PropTypes.string,
    columnCount: PropTypes.number,
    rowCounts: PropTypes.arrayOf(PropTypes.number)
}
WrappedForm.defaultProps = {
    submitTitle: '提交',
    clearTitle: '重置',
    collapseTitle: '折叠',
    collapse: false,
    unCollapseCount: 8,
    actionDirection: 'left',
    columnCount: 4,
    rowCounts: []
}
export default WrappedForm;