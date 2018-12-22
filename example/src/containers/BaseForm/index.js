/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import { Form } from 'xinche-ui';
import styled from 'styled-components';

const FORMS = [
    {
        key: 'field1',
        label: '字段1',
        required: true
    },
    {
        key: 'field2',
        label: '字段2',
        required: true
    },
    {
        key: 'field3',
        label: '字段3',
        required: true,
        type: 'select',
        meta: {
            data: [
                { value: 'a', label: 'A'},
                { value: 'b', label: 'B'},
                { value: 'c', label: 'C'},
                { value: 'd', label: 'D'}
            ],
            showSearch: true
        }
    },
    {
        key: 'field4',
        label: '字段4',
        required: true,
        reg: { pattern: /^([1-9]+(\.\d+)?|0\.\d+)$/, message: '请输正的数字允许小数'}
    },
    {
        key: 'field5',
        label: '字段5'
    },
    {
        key: 'field6',
        label: '字段6'
    },
    {
        key: 'field7',
        label: '字段7'
    }
];

const FormBody = styled.div`
    background: white;
    min-height: 360px;
    padding: 24px;
`;

export default class BaseForm extends React.Component {
    render() {
        return (
            <FormBody>
                <Form forms={FORMS} onSubmit={(values) => { console.log("====>", values)}} />
            </FormBody>
        );
    }
}