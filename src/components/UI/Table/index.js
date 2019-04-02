/*
* @Author: lijian
* @Email:  lijian46@guazi.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import {
    Table as AntTable,
    Popconfirm
} from 'antd';
import styled from 'styled-components';
import { EditableFormRow, EditableCell } from './editableComponents';
import Button from '../Button';
import floatingScroll from './floatingScroll';
const ActionButton = styled(Button)`
    margin-right: 10px;
    margin-bottom: 5px;
`;
const StyledTable = styled(AntTable)`
    .editable-cell {
      position: relative;
    }

    .editable-cell-value-wrap {
      padding: 5px 12px;
      cursor: pointer;
    }

    .editable-row:hover .editable-cell-value-wrap {
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      padding: 4px 11px;
      min-height: 32px;
    }
    .fl-scrolls {
        bottom: 0;
        height: 35px;
        overflow: auto;
        position: fixed;
    }
    .fl-scrolls,
    .fl-scrolls div {
        font-size: 1px;
        line-height: 0;
        margin: 0;
        padding: 0;
    }

    .fl-scrolls div {
        height: 1px;
        overflow: hidden;
        pointer-events: none;
    }

    .fl-scrolls div:before {
        content: '\A0';
    }

    .fl-scrolls-hidden {
        bottom: 9999px;
    }

    .fl-scrolls-viewport {
        position: relative;
    }

    .fl-scrolls-body {
        overflow: auto;
    }

    .fl-scrolls-viewport .fl-scrolls {
        left: 0;
        position: absolute;
    }

    .fl-scrolls-hoverable .fl-scrolls {
        opacity: 1;
        transition: opacity 0.5s ease 0.3s;
    }

    .fl-scrolls-hoverable:hover .fl-scrolls {
        opacity: 1;
    }
    .columnconfig {
        padding: 0;
    }
`;
const TableBody = styled.div`
    display: inline-block;
`;

const storage = window.localStorage;
export default class Table extends React.Component {
    constructor(props) {
        super(props)
        let columns = this.props.columns;
        if (this.props.columnsConfigGlobalTableKey && this.props.columnsConfigGlobalTableKey.length > 0) {
            const columnsStr = storage.getItem(this.props.columnsConfigGlobalTableKey);
            if (columnsStr && columnsStr.length > 0) {
                let filterColumns = JSON.parse(columnsStr)
                if (filterColumns.length > 0) {
                    columns = this.props.columns.filter( c => ~filterColumns.indexOf(c.dataIndex))
                }
            }
        }
        this.setColumns(columns)
    }
    setColumns = (columns) => {
        if (this.props.columnsConfigGlobalTableKey && this.props.columnsConfigGlobalTableKey.length > 0) {
            console.log('--->', columns.length, this.props.columns.length)
            this.newColumns = [{
                title: '',
                width: 28,
                fixed: 'left',
                dataIndex: 'columnConfig',
                className: 'columnconfig',
                filteredValue: columns.map(c => c.dataIndex),
                filters: this.props.columns.map(c => ({text: c.title, value: c.dataIndex})),
            }, ...columns]
        }else {
            this.newColumns = [...columns]
        }
    }
    componentDidMount() {
        if(this.props.floatingScrollDomQuery) {
            floatingScroll(document.querySelectorAll(this.props.floatingScrollDomQuery))
        }
    }
    handleChange = (pagination, filters, sorter) => {
        if (this.props.columnsConfigGlobalTableKey && this.props.columnsConfigGlobalTableKey.length > 0) {
            let filterColumns = filters.columnConfig
            if (filterColumns.length > 0) {
                this.setColumns(this.props.columns.filter( c => ~filterColumns.indexOf(c.dataIndex)))
            }else {
                filterColumns = this.props.columns.map(c => c.dataIndex)
                this.setColumns(this.props.columns)
            }
            storage.setItem(this.props.columnsConfigGlobalTableKey, JSON.stringify(filterColumns))
        }
        this.props.onChange(pagination, filters, sorter);
    }
    render() {
        const { columns, dataSource, className, loading, pagination, scrollWidth, rowSelection } = this.props;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        let newDataSource = dataSource.map(d => ({columnConfig: '', ...d}))

        const tableColumns = this.newColumns.map((col) => {
            if (!col.editable && (!col.actions || col.actions.length <= 0)) {
                return col;
            }
            let newCol = { ...col };
            if (col.editable) {
                newCol.onCell = (record, rowIndex) => {
                    let editable = col.editable;
                    if(col.editable && typeof col.editable === 'function') {
                        editable = col.editable(record, rowIndex);
                    }
                    return {
                        record,
                        editable: editable,
                        dataIndex: col.dataIndex,
                        title: col.title,
                        fixed: col.fixed,
                        width: col.width,
                        reg: col.reg,
                        required: col.required,
                        type: col.type,
                        meta: col.meta,
                        handleSave: this.props.onCellSave,
                    }
                };
            }
            if (col.actions && col.actions.length > 0) {
                newCol.render = (text, record, index) => {
                    return col.actions.map( a => {
                        let show = a.show;
                        if(a.show && typeof a.show === 'function') {
                            show = a.show(text, record, index);
                        }
                        let callback = a.callback || (() => {})
                        return show ? (
                            a.confirm ? (
                                <Popconfirm 
                                    key={a.label} 
                                    title={a.confirmLabel || '确定此操作？'} 
                                    onConfirm={() => {callback(text, record, index)}}
                                    okText={a.okText || '确定'}
                                    cancelText={a.cancelText || '取消'}
                                >
                                    <ActionButton title={a.label} />
                                </Popconfirm>
                            )
                            :
                            (
                                <ActionButton key={a.label} onClick={() => {callback(text, record, index)}} title={a.label} />
                            )
                        ) : null
                    })
                }
            }
            return newCol;
        });
        return (
            <StyledTable
                loading={loading}
                pagination={pagination}
                rowSelection={rowSelection}
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={newDataSource}
                columns={tableColumns}
                className={className}
                onChange={this.handleChange}
                scroll={scrollWidth ? {x: scrollWidth} : undefined}
            />
        );
    }
}
Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCellSave: PropTypes.func,
    loading: PropTypes.bool,
    pagination: PropTypes.PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    onChange: PropTypes.func,
    scrollWidth: PropTypes.number,
    floatingScroll: PropTypes.bool,
    floatingScrollDomQuery: PropTypes.string,
    rowSelection: PropTypes.object,
    columnsConfigGlobalTableKey: PropTypes.string
}
Table.defaultProps = {
    onCellSave: (row) => {},
    loading: false,
    floatingScroll: false
}