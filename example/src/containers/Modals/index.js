/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'ant-colony-ui';

const ModalsBody = styled.div`
    background: white;
    min-height: 360px;
    padding: 24px;
`;
const StyledButton = styled(Button)`
    margin-left: 10px;
`;

export default function Modals () {
    const [isVisible, setVisible] = useState(false);
    return (
            <ModalsBody>
                <StyledButton title="Modal" onClick={()=>{setVisible(true)}} />
                <Modal
                    visible={isVisible}
                    title="Modal"
                    onOk={() => {setVisible(false)}}
                    onCancel={() => {setVisible(false)}}
                    width={1000}
                    getContainer={false}
                >
                    This is a Modal !
                </Modal>
            </ModalsBody>
        );
}