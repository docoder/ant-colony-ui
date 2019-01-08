/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import { Form } from 'ant-colony-ui';
import styled from 'styled-components';
import { ImageUpload } from 'ant-colony-ui';

const FORMS = [
    {
        key: 'header1',
        type: 'header',
        label: '标题1'
    },
    {
        key: 'field1',
        label: '字段1',
        onChange: (e) => {console.log('input onChange>>>', e.target.value)},
        required: true,
        placeholder: '这是标题'
    },
    {
        key: 'field2',
        label: '字段2',
        required: true,
        type: 'select',
        onChange: (value) => {console.log('select onChange>>>', value)},
        meta: {
            data: [
                { value: 'a', label: 'A' },
                { value: 'b', label: 'B' },
                { value: 'c', label: 'C' },
                { value: 'd', label: 'D' }
            ],
            showSearch: true
        }
    },
    {
        key: 'field3',
        label: '字段3',
        required: true,
        type: 'select',
        meta: {
            ref: 'field2',
            data: (refValue) => {
                const dic = {
                    a: [{ value: 'a0', label: 'A0' }, { value: 'a1', label: 'A1' }, { value: 'a2', label: 'A2' }],
                    b: [{ value: 'b0', label: 'B0' }, { value: 'b1', label: 'B1' }, { value: 'b2', label: 'B2' }],
                    c: [{ value: 'c0', label: 'C0' }, { value: 'c1', label: 'C1' }, { value: 'c2', label: 'C2' }],
                    d: [{ value: 'd0', label: 'D0' }, { value: 'd1', label: 'D1' }, { value: 'd2', label: 'D2' }]
                }
                return dic[refValue]
            },
            showSearch: true
        }
    },
    {
        key: 'field4',
        label: '字段4',
        type: 'textArea',
         onChange: (e) => {console.log('textarea onChange>>>', e.target.value)},
    },
    {
        key: 'field5',
        label: '字段5'
    },
    {
        key: 'field6',
        label: '字段6',
        required: true,
        reg: { pattern: /^([1-9]+(\.\d+)?|0\.\d+)$/, message: '请输正的数字允许小数'}
    },
    {
        key: 'header2',
        type: 'header',
        label: '标题2'
    },
    {
        key: 'field7',
        label: '字段7'
    },
    {
        key: 'field8',
        label: '字段8'
    },
    {
        key: 'add2',
        type: 'add',
        addKeys: ['field7', 'field8']
    },
    {
        key: 'header3',
        type: 'header',
        label: '标题3'
    },
    {
        key: 'field9',
        label: '字段9'
    },
    {
        key: 'field10',
        label: '字段10',
        value: 'text10'
    },
    {
        key: 'field11',
        label: '字段11'
    },
    {
        key: 'field12',
        label: '字段12'
    },
    {
        key: 'field13',
        label: '字段13'
    },
    {
        key: 'field14',
        label: '字段14'
    },
    {
        key: 'field15',
        label: '字段15'
    },
    {
        key: 'field16',
        label: '字段16',
        disabled: true
    }
];

const FormBody = styled.div`
    background: white;
    min-height: 360px;
    padding: 24px;
`;
const StyledForm = styled(Form)`
    margin-top: 20px;
`;

export default class BaseForm extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }
    renderAccessoryComponent = () => {
        return (<ImageUpload url="url" />)
    }
    render() {
        return (
            <FormBody>
                <StyledForm
                    ref={this.formRef}
                    forms={FORMS}
                    collapse={false}
                    onSubmit={(values, clear) => {
                        console.log("====>", values, this.formRef, this.formRef.current.clearFields)
                        clear();
                    }}
                    actionDirection="center"
                    unCollapseCount={13}
                    rowColCounts={[2,4,2,1,3,4]}
                    labelPostion="top"
                    addLabel="新增"
                    accessoryComponent= {this.renderAccessoryComponent}
                    allDisabled={false}
                />
            </FormBody>
        );
    }
}