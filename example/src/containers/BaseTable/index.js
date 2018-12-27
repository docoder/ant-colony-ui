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
    }
];
const TABLE_COLUMNS = [
    {
        title: 'name',
        dataIndex: 'name',
        width: '30%',
        editable: true
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
                label: '删除',
                callback: () => {
                    console.log('cccc>>>>bbbb')
                },
                confirm: true,
                confirmLabel: '确定删除？',
                show: true
            },
            {
                label: '编辑',
                callback: () => {
                    console.log('cccc>>>>bbbb')
                },
                show: true
            }
        ]
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
    render() {
        return (
            <TableBody>
                <StyledTable columns={TABLE_COLUMNS} dataSource={DATASOURCE} onCellChange={(row) => { console.log('---->', row) }} />
            </TableBody>
        );
    }
}