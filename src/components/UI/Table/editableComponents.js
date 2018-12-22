/*
* @Author: lijian
* @Email:  lijian46@guazi.com
*/
import React from 'react';
// import PropTypes from 'prop-types';
import {
    Input,
    Form,
} from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();

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
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
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

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
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
                                        rules: [{
                                            required: true,
                                            message: `${title} is required.`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(
                                        <Input
                                            ref={node => (this.input = node)}
                                            onPressEnter={this.save}
                                        />
                                    )}
                              </FormItem>
                            ) : (
                            <div
                                className="editable-cell-value-wrap"
                                style={{ paddingRight: 24 }}
                                onClick={this.toggleEdit}
                            >
                                {restProps.children}
                            </div>
                            )
                        );
                    }}
                </EditableContext.Consumer>
            ) : restProps.children}
            </td>
        );
    }
}
