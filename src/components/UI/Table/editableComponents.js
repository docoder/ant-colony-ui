/*
* @Author: lijian
* @Email:  lijian46@guazi.com
*/
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
    Input,
    Form,
    Select
} from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();
const StyledSelect = styled(Select)`
    width: 100%;
`;
const StyledTagSelect = styled(Select)`
    width: 100%;
`;
const StyledInput = styled(Input)`
    &.ant-input-affix-wrapper .ant-input-suffix {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.25);
    }
`;
const Tag = styled.div`
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 24px;
    margin-top: 2px;
    line-height: 22px;
    margin-right: 4px;
    padding: 0 10px 0 10px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fafafa;
    border: 1px solid #e8e8e8;
    border-radius: 2px;
`;
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

export const EditableFormRow = Form.create()(EditableRow);

export class EditableCell extends React.Component {
    state = {
        editing: false,
    }

    componentDidMount() {
        if (this.props.editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    componentDidUpdate() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }
    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    handleClickOutside = (e) => {
        const { editing } = this.state;
        const { type } = this.props;
        if (editing && type!== 'select' && type!=='tags' && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    }

    save = () => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }
    getInput = () => {
        const {
            type,
            title,
            disabled,
        } = this.props;
        switch (type) {
            case 'select':
                return (
                    <StyledSelect
                        ref={node => (this.input = node)}
                        onChange={()=>{setTimeout(this.save)}}
                        optionFilterProp="children"
                        showSearch={true}
                        allowClear={true}
                        placeholder={`请选择${title}`}
                        notFoundContent="没有内容"
                        disabled={disabled}
                    >
                    {
                        this.renderOptions()
                    }
                    </StyledSelect>
                );
            case 'tags':
                return (
                    <StyledTagSelect
                        mode="tags"
                        ref={node => (this.input = node)}
                        onBlur={this.save}
                        optionFilterProp="children"
                        showSearch={true}
                        allowClear={true}
                        placeholder={`请选择${title}`}
                        notFoundContent="没有内容"
                        disabled={disabled}

                    >
                    {
                        this.renderOptions()
                    }
                    </StyledTagSelect>
                )
            default:
                return (
                    <StyledInput
                        allowClear={true}
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                        disabled={disabled}
                    />
                );
        }
    }
    renderOptions = () => {
        const {
            meta,
        } = this.props;
        let data = meta ? (meta.data || []) : []
        return data.map((item, index) => (
            <Select.Option value={ item.value.toString() } key={ item.value }>{ item.label }</Select.Option>
        ))
    }
    render() {
        const { editing } = this.state;
        const {
            type,
            meta,
            reg,
            required,
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        let children = restProps.children.slice();
        if (type === 'select' && children && (children[2] || children[2] === 0)) {
            const selectedData = meta.data.filter(d => d.value === children[2])[0]
            if (selectedData) children[2] = selectedData.label
        }
        if (type === 'tags' && children && (children[2])) {
            children[2] = children[2].map(c => {
                const option = meta.data.filter(d => d.value === c)[0]
                if (option) return <Tag key={c}>{option.label}</Tag>
                return c
            })
        }

        return (
            <td ref={node => (this.cell = node)} {...restProps}>
            {editable ? (
                <EditableContext.Consumer>
                    {(form) => {
                        this.form = form;
                        return (
                            editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {form.getFieldDecorator(dataIndex, {
                                        initialValue: record[dataIndex],
                                        rules: reg ? [
                                            { required: required, message: `${title}为必填项`},
                                            reg
                                        ] : [
                                            { required: required, message: `${title}为必填项`}
                                        ]
                                    })(
                                        this.getInput()
                                    )}
                              </FormItem>
                            ) : (
                            <div
                                className={type === 'tags' ? 'editable-tags' : 'editable-cell-value-wrap'}
                                onClick={this.toggleEdit}
                            >
                                {children}
                            </div>
                            )
                        );
                    }}
                </EditableContext.Consumer>
            ) : children}
            </td>
        );
    }
}
