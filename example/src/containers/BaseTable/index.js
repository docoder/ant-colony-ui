/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import { Table } from 'ant-colony-ui';
import styled from 'styled-components';

const DATASOURCE = [
    {
        key: '0',
        name: '',
        age: '32',
        gender: 'male',
        address: 'London, Park Lane no. 0',
    }, {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        gender: '2',
        edit: true,
        address: 'London, Park Lane no. 1'
    }, {
        key: '2',
        name: 'Edward King 1',
        age: '32',
        edit: false,
        address: 'London, Park Lane no. 1',
    }, {
        key: '3',
        name: 'Edward King 1',
        age: '32',
        edit: true,
        address: 'London, Park Lane no. 1',
    }, {
        key: '4',
        name: 'Edward King 1',
        age: '32',
        multiple: ['a10','c12'],
        edit: true,
        address: 'London, Park Lane no. 1',
    },
    {
        key: '5',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
    }, {
        key: '6',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
    }, {
        key: '7',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
    }, {
        key: '8',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
    }, {
        key: '9',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
    }
];
const children = [];
for (let i = 10; i < 36; i++) {
    children.push({label: i.toString(36).toUpperCase() + i, value: i.toString(36) + i});
}
const TABLE_COLUMNS = [
    {
        title: 'name',
        dataIndex: 'name',
        editable: true,
        fixed: 'left',
        width: 200,
    }, {
        title: 'age',
        dataIndex: 'age',
        editable: true,
        required: true, 
        reg: { pattern: /^[1-9]\d*$/, message: '请输入正整数'}
    }, {
        title: 'gender',
        dataIndex: 'gender',
        editable: (record, rowIndex) => {
            return record.edit
        },
        type: 'select',
        meta: {
            data: [
                {label: 'male', value: '1'},
                {label: 'female', value: '2'}
            ]
        }
    },{
        title: 'multiple',
        dataIndex: 'multiple',
        editable: true,
        type: 'multiple',
        meta: {
            data: children       
        }
    },{
        title: 'address',
        dataIndex: 'address',
    }, {
        title: 'operation',
        dataIndex: 'operation',
        actions: [
            {
                label: '查看',
                callback: (text, record, index) => {
                    console.log('callback编辑>>>>', text, record, index)
                },
                show: (text, record, index) => {
                    return true
                }
            },
            {
                label: '编辑',
                show: (text, record, index) => {
                    return true
                }
            },
            {
                label: '删除',
                callback: (text, record, index) => {
                    console.log('callback删除>>>>', text, record, index)
                },
                confirm: true,
                confirmLabel: '确定删除？',
                show: (text, record, index) => {
                    return true
                }
            }
        ],
        fixed: 'right',
        width: 200
    }
];
const TableBody = styled.div`
    background: white;
    min-height: 360px;
    padding: 24px;
`;
const StyledTable = styled(Table)`
    margin-top: 20px;
`;

export default class BaseTable extends React.Component {
    state = {
        pagination: {
            current: 1,
            total: DATASOURCE.length,
            pageSize: 6,
            position: 'both'
        },
        data: {
            test: 'test'
        }
    }
    render() {
        return (
            <TableBody>
                <StyledTable
                    columns={TABLE_COLUMNS}
                    dataSource={DATASOURCE}
                    pagination={this.state.pagination}
                    onChange={(pagination, filters, sorter) => {
                        console.log('---onChange--->', this.state.data, pagination, filters, sorter)
                        this.setState({pagination})
                    }}
                    scrollWidth={1000}
                    floatingScrollDomQuery=".ant-table-scroll .ant-table-body"
                    rowSelection = {{
                        onChange: (selectedRowKeys, selectedRows) => {
                            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        }
                    }}
                    onCellSave={(row) => {
                        console.log('---onCellChange--->', row)
                        let newList = DATASOURCE
                        let newItem = newList.find(s => s.key === row.key);
                        Object.keys(newItem).forEach(k => {
                            newItem[k] = row[k]
                        })
                        this.forceUpdate()
                    }}
                    columnsConfigGlobalTableKey="antColonyUIBaseTable"
                />
            </TableBody>
        );
    }
}
