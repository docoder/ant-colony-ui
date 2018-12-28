/*
* @Author: lijian
* @Email:  lijian46@guazi.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    Popconfirm
} from 'antd';
import styled from 'styled-components';
import { EditableFormRow, EditableCell } from './editableComponents'
import Button from '../Button';

const ActionButton = styled(Button)`
    margin-right: 10px;
    margin-bottom: 5px;
`;
const StyledTable = styled(Table)`
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
`;
const TableBody = styled.div`
    display: inline-block;
`;
export default class MyTable extends React.Component {
    render() {
        const { columns, dataSource, className, loading } = this.props;
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
                        return show ? (
                            a.confirm ? (
                                <Popconfirm 
                                    key={a.label} 
                                    title={a.confirmLabel || '确定此操作？'} 
                                    onConfirm={a.callback}
                                    okText={a.okText || '确定'}
                                    cancelText={a.cancelText || '取消'}
                                >
                                    <ActionButton onClick={()=>{}} title={a.label} />
                                </Popconfirm>
                            )
                            :
                            (
                                <ActionButton key={a.label} onClick={()=>{}} title={a.label} />
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
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={talbeColumns}
                className={className}
            />
        );
    }
}
MyTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCellChange: PropTypes.func,
    loading: PropTypes.bool
}
MyTable.defaultProps = {
    onCellChange: (row) => {},
    loading: false
}