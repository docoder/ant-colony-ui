/*
* @Author: lijian
* @Email:  lijian46@guazi.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import {
    Layout,
    LocaleProvider
} from 'antd';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
`;

const FrameMain = styled(Layout)`
    padding-top: 60px;
    margin-left: ${props => props.collapsed === 'true' ? '80px' : '200px' };
`;

const FrameBody = styled(Content)`
    margin: '24px 16px 0';
    overflow: initial;
`;
const LogoutButton = styled(Button)`
    float: right;
    margin-top: 16px;
`;

export default class NavFrame extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    
    renderRoutes = (pls) => {
        return pls.map(p => {
            let exact = false;
            if (p.link === '/') exact = true;
            return (<Route key={p.link} exact={exact} path={p.link} component={p.page} />)
        })
    }

    render() {
        const { menus, pageLinks, title, collapsedTitle, logout } = this.props;
        return (
            <Router>
                <LocaleProvider locale={zhCN}>
                <Layout style={{ minHeight: '100vh' }}>
                    <FrameHeader>
                        {this.state.collapsed === false ? title : collapsedTitle}
                        <LogoutButton type='primary' onClick={logout} title="退出" />
                    </FrameHeader>
                    <SideMenus menus={menus} collapsed={this.state.collapsed} onCollapse={this.onCollapse} />
                    <FrameMain collapsed={this.state.collapsed ? 'true' : 'false'}>
                        <FrameBody >
                            <Switch>
                            {this.renderRoutes(pageLinks)}
                            </Switch>
                        </FrameBody>
                        <Footer style={{ textAlign: 'center' }}>
                            ©2018
                        </Footer>
                    </FrameMain>
                </Layout>
                </LocaleProvider>
            </Router>
        );
    }
}
NavFrame.propTypes = {
    menus: PropTypes.arrayOf(PropTypes.object).isRequired,
    pageLinks: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
    collapsedTitle: PropTypes.string,
    logout: PropTypes.func
}
NavFrame.defaultProps = {
    collapsedTitle: '',
    logout: () => {}
}