/*
* @Author: docoder
* @Email:  docoder@163.com
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Form as AntForm, Row, Col, Input, Icon, Select, DatePicker, Radio, Checkbox
} from 'antd';
import Button from '../Button';
import cloneDeep from 'lodash/cloneDeep';

import CodeEditor from "./CodeEditor";
import Prism from 'prismjs';
import moment from 'moment'

const { TextArea } = Input;
const FormItem = AntForm.Item;
const { RangePicker, MonthPicker } = DatePicker;
const StyledForm = styled(AntForm)`
    background: #fbfbfb;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    &.ant-form {
        padding: 16px;
    }
    .ant-form-item {
        display: ${props => props.position === 'left' ? 'flex' : 'inherit' };
    }
    .ant-form-item-control-wrapper {
        flex: 1;
    }
`;
const ActionRow = styled(Row)`
    padding-top: 12px;
`;
const ButtonsCol = styled(Col)`
    text-align: ${props => props.direction === 'right' ? 'right' : (props.direction === 'left' ? 'left': 'center')};
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
const FormHeader = styled(Col)`
    padding-left: 10px;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 15px;
`;
const AddButton = styled(Button)`
    width: 25%;
    margin-bottom: 10px;
`;
const StyledRow = styled(Row)`
    &.ant-row {
        display: flex; 
        flex-direction: row;
        align-items: center;
        padding-right: 60px;
    }
`;
const StyledInput = styled(Input)`
    &.ant-input-affix-wrapper .ant-input-suffix {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.25);
    }
`;
const DeleteButton = styled(Icon)`
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 18px;
    color: #999;
    transition: all .3s;
    margin-bottom: 33px;
    margin-left: -4px;
    &:hover {
        color: #777;
    }
`;
const InfoLabel = styled(Col)`
    font-size: 12px;
    color: rgba(0, 0, 0, 0.85);
    cursor: default;
    display: inline;
   
    line-height: 39.9999px;
    white-space: nowrap;
    .ant-col & {
        padding-right: 10px;
    }
`;
const InfoValue = styled(Col)`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    cursor: default;
    text-align: left;
    line-height: 39.9999px;
    white-space: nowrap;
    display: inline;
`;
const InfoContainer = styled(Row)`
    padding-left: 2px;
    padding-right: 2px;
`;
const Spacer = styled.div`
    height: 2px;
`;
const StyledCheckbox = styled(Checkbox)`
`;
const StyledRadio = styled(Radio)`
`;
const StyledCol = styled(Col)`
    line-height: 2;
`;

class Form extends React.Component {
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
            items = refValue ? data(refValue, item.key) : []
        }else {
            items = data;
        }
        return items.map((item, index) => (
            <Select.Option value={ item.value.toString() } disabled={item.disabled} key={ item.value }>{ item.label }</Select.Option>
        ))
    }
    itemOnChange = (item, ...args) => {
        if(item.onChange) {
            item.onChange(...args, this.props.form, item.key)
        }
    }
    getInput = (item) => {
        const { allDisabled, autoComplete } = this.props;
        let refLabel = null;
        item.meta = item.meta || {};
        if (item.meta.ref) {
            const formItems = this.props.form.getFieldValue('forms');
            const refItem = formItems.find(i => i.key === item.meta.ref);
            refLabel = refItem.label;
        }
        const itemDisabled = item.alwaysEnable ? false : (!!item.disabled || allDisabled || false)
        const itemPlaceholder = itemDisabled? '' : (item.placeholder || `请输入${item.label}`)
        switch (item.type) {
            case 'checkbox':
            return (
                <Checkbox.Group style={{width: '100%', marginBottom: -8}}>
                <Row>
                    {
                        (item.data || []).map( d => <StyledCol key={d.value} span={d.span || (item.data.length < 3 ? (24/item.data.length) : 8)}><StyledCheckbox onChange={(...args)=>{this.itemOnChange(item,...args)}} disabled={d.disabled} value={d.value}>{d.label}</StyledCheckbox></StyledCol>)
                    }
                </Row>
                </Checkbox.Group>
            )
            case 'radio':
            return (
                <Radio.Group style={{width: '100%', marginBottom: -8}} onChange={(...args)=>{this.itemOnChange(item,...args)}}>
                <Row>
                    {
                        (item.data || []).map( d => <StyledCol key={d.value} span={d.span || (item.data.length < 3 ? (24/item.data.length) : 8)}><StyledRadio key={d.value} disabled={d.disabled} value={d.value}>{d.label}</StyledRadio></StyledCol>)
                    }
                </Row>
                </Radio.Group>
            )
            case 'select':
                return (
                    <Select
                        mode={item.meta.mode}
                        onChange={item.onChange ? (value) => {
                            const formItems = this.props.form.getFieldValue('forms');
                            const byRefItems = formItems.filter(i => i.meta && i.meta.ref && i.meta.ref === item.key);
                            byRefItems.forEach(b => {
                                this.props.form.setFieldsValue({
                                    [b.key]: undefined
                                })
                            })
                            item.onChange(value, this.props.form, item.key)
                        } : null}
                        onSearch={item.onSearch}
                        disabled={itemDisabled}
                        optionFilterProp="children"
                        showSearch={item.meta.showSearch}
                        allowClear={item.meta.showSearch}
                        placeholder={itemPlaceholder}
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
                    <TextArea onChange={(...args)=>{this.itemOnChange(item,...args)}} disabled={itemDisabled} placeholder={itemPlaceholder} autosize={{ minRows, maxRows }} />
                );
            case 'codeEditor':
                return (
                    <CodeEditor
                        onChange={(...args)=>{this.itemOnChange(item,...args)}}
                        disabled={itemDisabled} 
                        placeholder={itemPlaceholder}
                    />
                )
            case 'date':
                return (
                    <DatePicker
                        onChange={(...args)=>{this.itemOnChange(item,...args)}}
                        showTime={item.showTime}
                        disabled={itemDisabled} 
                        format={item.format || (item.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')}
                    />
                );
            case 'rangeDate':
                return (
                    <RangePicker
                        onChange={(...args)=>{this.itemOnChange(item,...args)}}
                        showTime={item.showTime}
                        disabled={itemDisabled} 
                        format={item.format || (item.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')}
                        allowClear={(typeof item.allowClear) === 'undefined' ? true : item.allowClear}
                        renderExtraFooter={item.renderExtraFooter}
                    />
                );
            case 'month':
                return (
                    <MonthPicker
                        onChange={(...args)=>{this.itemOnChange(item,...args)}}
                        disabled={itemDisabled} 
                        format={item.format || 'YYYY-MM'}
                    />
                );
            default:
                return (
                    <StyledInput
                        autoComplete={autoComplete}
                        allowClear={item.allowClear}
                        onChange={(...args)=>{this.itemOnChange(item,...args)}}
                        onBlur={(...args) => {if(item.onBlur) item.onBlur(...args, item.key)}}
                        disabled={itemDisabled} 
                        placeholder={itemPlaceholder} 
                    />
                );
        }
    }

    formAddItem = (index, rowIndex) => {
        const { form, columnCount, rowColCounts } = this.props;
        const formItems = form.getFieldValue('forms');
        const item = formItems[index];
        const filtItems = formItems.filter(f => ~item.addKeys.indexOf(f.key))
        const itemsToAdd = cloneDeep(filtItems).map((it, i)=> {
            it.key = `${it.key}_${rowIndex}`
            it.canDelete = true
            if(i=== filtItems.length - 1) {
                it.appendDeleteButton = true
                it.rowIndex = rowIndex
            }
            it.value = undefined
            if (it.meta && it.meta.ref) {
                it.meta.ref = `${it.meta.ref}_${rowIndex}`
            }
            return it;
        })
        formItems.splice(index, 0, ...itemsToAdd)
        if ((rowIndex-1) < rowColCounts.length) {
            const count = rowColCounts[rowIndex-1];
            const rowCount = Math.floor(item.addKeys.length / rowColCounts[rowIndex-1]);
            rowColCounts.splice(rowIndex, 0, ...(Array(rowCount).fill(count)))
        }
        form.setFieldsValue({
            forms: formItems
        })
    }
    formRemoveItem = (keys, rowIndex) => {
        const { form, rowColCounts } = this.props;
        const formItems = form.getFieldValue('forms');
        const filtItems = formItems.filter(f => !~keys.indexOf(f.key))
        const rowCount = Math.floor(keys.length / rowColCounts[rowIndex-1]);
        rowColCounts.splice(rowIndex, rowCount)
        form.setFieldsValue({
            forms: filtItems
        })
    }

    getRows = () => {
        const { form, collapse, unCollapseCount, columnCount, addLabel, allDisabled, rowColCounts, labelPostion} = this.props;
        const formItems = form.getFieldValue('forms');
        const count = (this.state.expand || !collapse) ? formItems.length : unCollapseCount;
        const { getFieldDecorator } = form;
        let children = [];
        let rows = [];
        let rowIndex = 0;
        let rowColIndex = 0;
        let rowColMaxCount = columnCount;
        let deleteKeys = [];
        const colLayout =
          labelPostion === 'horizontal'
            ? { offset: columnCount > 1 ? 0 : 4 }
            : null;
        const infoLabelLayout =
          labelPostion === 'horizontal'
            ? { span: 4, style: {textAlign: 'right', display: 'block'} }
            : (labelPostion === 'vertical' || labelPostion === 'top') ? {style: {display: 'block'}} : null;
        const infoValueLayout =
          labelPostion === 'horizontal'
            ? { span: 14 ,  style: {display: 'block'}}
            : (labelPostion === 'vertical' || labelPostion === 'top') ? {style: {display: 'block'}} : null;
        for (let index = 0; index< formItems.length; index++) {
            const item = formItems[index];
            if(item.canDelete) {
                deleteKeys.push(item.key)
            }
            if(item.type === 'header') {

                rows.push(
                    <Row key={item.key} gutter={24}>
                        <FormHeader {...colLayout}>{item.label}</FormHeader>
                    </Row>
                )
                continue;
            }
            if(item.type === 'add') {
                if (!allDisabled) {
                    rows.push(
                        <Row key={item.key} gutter={24}>
                            <Col {...colLayout}>
                                <AddButton type="dashed" onClick={this.formAddItem.bind(this, index, rowIndex)}>
                                    <Icon type="plus" /> {item.addLabel || addLabel}
                                </AddButton>
                            </Col>
                        </Row>
                    )
                }
                continue;
            }
            rowColIndex += 1;
            children.push(
                <Col span={24/columnCount} key={item.key} style={{display: index < count ? 'block' : 'none'}}>
                    {
                        item.type === 'info' ? <InfoContainer><InfoLabel {...infoLabelLayout}>{item.label}:</InfoLabel><InfoValue {...infoValueLayout}>{item.value}</InfoValue></InfoContainer>
                        : (
                            this.getFormItem(item)
                        )
                    }
                </Col>
            );
            if(rowColCounts[rowIndex]) {
                rowColMaxCount = rowColCounts[rowIndex];
            }
            if (rowColCounts.length > 0 && rowColCounts[rowIndex] && rowColCounts[rowIndex] === rowColIndex) {
                rowColMaxCount = rowColCounts[rowIndex];
                rowColIndex = 0;
            }

            if (children.length === rowColMaxCount || index === formItems.length - 1) {
                rows.push(
                    <StyledRow key={item.key} gutter={24}>
                    {[...children]}
                    {
                        item.appendDeleteButton && <DeleteButton
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            onClick={this.formRemoveItem.bind(this, [...deleteKeys], rowIndex)}
                        />
                    }
                    </StyledRow>
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
    getInitialValue = (item) => {
        if (item.value || item.value === 0) {
            switch(item.type) {
                case 'date':
                case 'month':
                if (typeof item.value === 'string') {
                   return moment(item.value )
                }
                return item.value
                case 'rangeDate':
                if (Array.isArray(item.value)) {
                    return item.value.map(i => {
                        if (typeof i === 'string') return moment(i)
                    })
                }
                return item.value
                case 'checkbox':
                case 'radio':
                return item.value
                default:
                if (!isNaN(parseFloat(item.value)) && isFinite(item.value))
                    return item.value.toString()
                else 
                    return item.value
            }
        }else {
            return item.value;
        }
    }
    // getFormItem = (item) => {
    //     const { getFieldDecorator, getFieldsValue } = this.props.form;
    //     const { allDisabled } = this.props;
    //     let required = item.required;
    //     if(item.required && typeof item.required === 'function') {
    //         required = item.required(getFieldsValue());
    //     }else {
    //         required = undefined
    //     }
    //     const staticRequired = !(item.alwaysEnable ? false : (item.disabled || allDisabled || false))
    //     const isRequired = required && staticRequired;
    //     const requiredChangeToFalse = (isRequired !== undefined && !isRequired && staticRequired);
    //     return (
    //         <FormItem label={item.label} validateStatus={ requiredChangeToFalse ? "success" : undefined } help={requiredChangeToFalse ? "" : undefined}>
    //             {getFieldDecorator(`${item.key}`, {
    //                 initialValue: this.getInitialValue(item),
    //                 rules: item.reg ? [
    //                     { required: isRequired, message: `${item.label}为必填项`},
    //                     item.reg
    //                 ] : [
    //                     { required: isRequired, message: `${item.label}为必填项`}
    //                 ],
    //             })(
    //                 this.getInput(item)
    //             )}
    //         </FormItem>
    //     )
    // }
    getFormItem = (item) => {
        const { getFieldDecorator, getFieldsValue, } = this.props.form;
        const { allDisabled, labelPostion } = this.props;
        let required = item.required;
        if(item.required && typeof item.required === 'function') {
            required = item.required(getFieldsValue());
        }
        const isRequired = required && !(item.alwaysEnable ? false : (item.disabled || allDisabled || false));
        const formItemLayout =
          item.type === 'codeEditor' && labelPostion === 'left'
            ? {
                style: {
                    display: 'block'
                }
              }
            : null;
        return (
            <FormItem label={item.label} {...formItemLayout}>
                {getFieldDecorator(`${item.key}`, {
                    initialValue: this.getInitialValue(item),
                    rules: item.reg ? [
                        { required: isRequired, message: `${item.label}为必填项`},
                        item.reg
                    ] : [
                        { required: isRequired, message: `${item.label}为必填项`}
                    ],
                })(
                    this.getInput(item)
                )}
            </FormItem>
        )
    }
    renderAccessoryView = () => {
        if(this.props.accessoryComponent) {
            return (<Row>{this.props.accessoryComponent(this.getFormItem)}</Row>)
        }
        return null;
    }

    clearFields = () => {
        this.props.form.resetFields()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, onSubmit } = this.props;
        form.validateFields((err, values) => {
            if(!err) {
                onSubmit(values, this.clearFields);
            }
        });
    }

    handleReset = () => {
        this.props.onReset();
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    render() {
        const { 
            form,
            forms,
            submitTitle,
            clearTitle,
            collapse,
            collapseTitle,
            unCollapseCount,
            className,
            actionDirection,
            labelPostion,
            clearButtonShow,
            actionsShow,
            allDisabled,
            disableEnterSubmit,
            columnCount,
            autoComplete
        } = this.props;
        form.getFieldDecorator('forms', { initialValue: forms });
        const formItems =form.getFieldValue('forms');
        let formLayout = labelPostion;
        const formItemLayout =
          formLayout === 'horizontal'
            ? {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
              }
            : null;
        const buttonItemLayout =
          formLayout === 'horizontal'
            ? { span: 14, offset: columnCount > 1 ? 0 : 4 }
            : null;
        return (
            <FormBody className={className}>
                <StyledForm
                    autoComplete={autoComplete}
                    onSubmit={disableEnterSubmit ? undefined : this.handleSubmit}
                    position={labelPostion}
                    layout={(formLayout === 'left' || formLayout === 'top') ? null : formLayout }
                    {...formItemLayout}
                >
                    
                    {this.getRows()}
                    {this.renderAccessoryView()}
                    {
                        (actionsShow) && <ActionRow>
                            <ButtonsCol span={24} direction={actionDirection} {...buttonItemLayout}>
                                <Button type="primary" htmlType={disableEnterSubmit ? null : 'submit'} onClick={this.handleSubmit} title={submitTitle} />
                                {clearButtonShow && <ClearButton onClick={this.handleReset} title={clearTitle} />}
                                {
                                    collapse && formItems.length > unCollapseCount && <CollapseToggle onClick={this.toggle}>
                                                    {collapseTitle} <Icon type={this.state.expand ? 'up' : 'down'} />
                                                </CollapseToggle>
                                }
                                
                            </ButtonsCol>
                        </ActionRow>
                    }
                    
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
    onReset: PropTypes.func,
    actionDirection: PropTypes.oneOf(['left', 'right', 'center']),
    columnCount: PropTypes.number,
    rowColCounts: PropTypes.arrayOf(PropTypes.number),
    labelPostion:PropTypes.oneOf(['left', 'top', 'horizontal', 'vertical', 'inline']),
    addLabel: PropTypes.string,
    clearButtonShow: PropTypes.bool,
    actionsShow: PropTypes.bool,
    allDisabled: PropTypes.bool,
    disableEnterSubmit: PropTypes.bool,
    autoComplete: PropTypes.string
}
WrappedForm.defaultProps = {
    submitTitle: '提交',
    clearTitle: '重置',
    collapseTitle: '折叠',
    collapse: false,
    unCollapseCount: 8,
    actionDirection: 'left',
    columnCount: 4,
    rowColCounts: [],
    labelPostion: 'left',
    addLabel: '新增表单项',
    clearButtonShow: true,
    actionsShow: true,
    allDisabled: false,
    disableEnterSubmit: false,
    onReset: () => {},
    autoComplete: 'on'
}
export default WrappedForm;
