/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import {
    Layout,
    LocaleProvider
} from 'antd';
import styled from 'styled-components';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import SideMenus from './sideMenus';
import Button from '../Button';

const {
    Header, Content, Footer
} = Layout;

const FrameHeader = styled(Header)`
    &.ant-layout-header {
        background-color: #002040;
        padding-left: 25px;
    }
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    min-width: 1200px;
    z-index: 100;
    color: white;
    font-size: 20px;
    font-weight: 900;
    z-index: 200;
`;

const FrameMain = styled(Layout)`
    padding-top: ${props => props.headerhide === 'true' ? '0px' : '60px' };
    margin-left: ${props => props.sidehide === 'true' ? '0px' : (props.collapsed === 'true' ? '80px' : '200px') };
`;

const FrameBody = styled(Content)`
    margin: '24px 16px 0';
    overflow: initial;
`;
const HeaderActions = styled.span`
    margin-left: 30px;
`;
const LogoutButton = styled(Button)`
    float: right;
    margin-top: 16px;
`;

export default class Frame extends React.Component {
    constructor(props) {
        super(props)
        const pathSnippets = window.location.pathname.split('/').filter(i => i);
        const defaultSelectedKey = `/${pathSnippets.length === 0 ? '' : pathSnippets[0]}`;
        this.state = {
            collapsed: false,
            menuSelectedKey: defaultSelectedKey
        };
        this.frameRef = React.createRef()
    }
    componentDidMount() {
        this.props.didMount(this.frameRef.current)
    }
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    render() {
        const { menus, title, onMenuSelect, collapsedTitle, logout, renderHeaderActions, headerHide, sideMenusHide, renderRoutes } = this.props;
        return (
            <div>
                <LocaleProvider locale={zhCN}>
                <Layout style={{ minHeight: '100vh' }}>
                    {
                        !headerHide && <FrameHeader>
                            {this.state.collapsed === false ? title : collapsedTitle}
                            <HeaderActions>
                                {renderHeaderActions()}
                                {logout && <LogoutButton type='primary' onClick={logout} title="退出" />}
                            </HeaderActions>
                        </FrameHeader>
                    }
                    {
                        !sideMenusHide && <SideMenus 
                            onMenuSelect={({ key }) => {
                                onMenuSelect(key)
                                this.setState({menuSelectedKey: key})
                            }}
                            selectedKey={this.state.menuSelectedKey}
                            menus={menus}
                            collapsed={this.state.collapsed}
                            onCollapse={this.onCollapse}
                        />
                    }
                    <FrameMain 
                        collapsed={this.state.collapsed ? 'true' : 'false'}
                        sidehide={sideMenusHide ? 'true' : 'false'}
                        headerhide={headerHide ? 'true' : 'false'}
                    >
                        <FrameBody >
                            <div ref={this.frameRef}></div>
                            {renderRoutes()}
                        </FrameBody>
                        <Footer style={{ textAlign: 'center' }}>
                            ©2018
                        </Footer>
                    </FrameMain>
                </Layout>
                </LocaleProvider>
            </div>
        );
    }
}
Frame.propTypes = {
    menus: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
    collapsedTitle: PropTypes.string,
    logout: PropTypes.func,
    renderHeaderActions: PropTypes.func,
    headerHide: PropTypes.bool,
    sideMenusHide: PropTypes.bool,
    didMount: PropTypes.func,
    onMenuSelect: PropTypes.func,
    renderRoutes: PropTypes.func
}
Frame.defaultProps = {
    collapsedTitle: '',
    headerHide: false,
    sideMenusHide: false,
    renderHeaderActions: () => null,
    didMount: () => {},
    onMenuSelect: () => {},
    renderRoutes: () => {}
}
