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
`;
const TableBody = styled.div`
    display: inline-block;
`;
export default class Table extends React.Component {
    componentDidMount() {
        if(this.props.floatingScrollDomQuery) {
            floatingScroll(document.querySelectorAll(this.props.floatingScrollDomQuery))
        }
    }
    render() {
        const { columns, dataSource, className, loading, pagination, onChange, scrollWidth } = this.props;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const talbeColumns = columns.map((col) => {
            if (!col.editable && (!col.actions || col.actions.length <= 0)) {
                return col;
            }
            let newCol = { ...col };
            if (col.editable) {
                newCol.onCell = record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    fixed: col.fixed,
                    width: col.width,
                    handleSave: this.props.onCellChange,
                });
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
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={talbeColumns}
                className={className}
                onChange={onChange}
                scroll={scrollWidth ? {x: scrollWidth} : undefined}
            />
        );
    }
}
Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCellChange: PropTypes.func,
    loading: PropTypes.bool,
    pagination: PropTypes.PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    onChange: PropTypes.func,
    scrollWidth: PropTypes.number,
    floatingScroll: PropTypes.bool,
    floatingScrollDomQuery: PropTypes.string
}
Table.defaultProps = {
    onCellChange: (row) => {},
    loading: false,
    floatingScroll: false
}