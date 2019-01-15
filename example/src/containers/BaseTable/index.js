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
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
    }, {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
    }, {
        key: '2',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
    }, {
        key: '3',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
    }, {
        key: '4',
        name: 'Edward King 1',
        age: '32',
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
const TABLE_COLUMNS = [
    {
        title: 'name',
        dataIndex: 'name',
        editable: true,
        fixed: 'left',
        width: 200
    }, {
        title: 'age',
        dataIndex: 'age',
    }, {
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
        }
    }
    render() {
        return (
            <TableBody>
                <StyledTable
                    columns={TABLE_COLUMNS}
                    dataSource={DATASOURCE}
                    onCellChange={(row) => { console.log('---onCellChange--->', row) }}
                    pagination={this.state.pagination}
                    onChange={(pagination, filters, sorter) => {
                        console.log('---onChange--->', pagination, filters, sorter)
                        this.setState({pagination})
                    }}
                    scrollWidth={1000}
                    floatingScrollDomQuery=".ant-table-scroll .ant-table-body"
                />
            </TableBody>
        );
    }
}