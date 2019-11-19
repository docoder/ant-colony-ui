/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import PropTypes from 'prop-types';
import {
    Layout,
    ConfigProvider
} from 'antd';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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

export default class NavFrame extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    
    renderLayoutRoutes = (pls, props) => {
        return pls.map((p:any) => {
            let redirect = false;
            if (p.link !== '/' && p.index) redirect = true
            let basePath = ''
            if (props && props.match && props.match.url && props.match.url !== '/') {
                basePath = props.match.url
            }
            const path = `${basePath}${p.link}`
            if (redirect) {
                return (<React.Fragment key={p.link}>
                    <Route exact path={basePath || '/'} component={() => <Redirect to={path} />} />
                    <Route exact={p.exact} path={path} component={p.page} />
                </React.Fragment>)
            }else {
                return <Route key={p.link} exact={p.exact} path={path} component={p.page} />
            }
        })
    }
    renderLayout = (props) => {
        const { menus, pageLinks, title, collapsedTitle, logout, renderHeaderActions, headerHide, sideMenusHide, renderSiderTopSection } = this.props;
        let headerActions = null
        if (renderHeaderActions) {
            const actions = renderHeaderActions()
            if (actions && typeof actions !== 'string') {
                headerActions = actions
            }
        }
        return (
            <Layout style={{ minHeight: '100vh' }}>
                {
                    !headerHide && <FrameHeader>
                        {this.state.collapsed === false ? title : collapsedTitle}
                        <HeaderActions>
                            {headerActions}
                            {logout && <LogoutButton type='primary' onClick={logout} title="退出" />}
                        </HeaderActions>
                    </FrameHeader>
                }
                {
                    !sideMenusHide && <SideMenus menus={menus} collapsed={this.state.collapsed} onCollapse={this.onCollapse} renderSiderTopSection={renderSiderTopSection||(()=>{})} />
                }
                <FrameMain
                >
                    <FrameBody >
                    {this.renderLayoutRoutes(pageLinks, props)}
                    </FrameBody>
                    <Footer style={{ textAlign: 'center' }}>
                        ©2018
                    </Footer>
                </FrameMain>
            </Layout>
        )
    }
    render() {
        const {renderRoutes } = this.props;
        let Page = this.renderLayout()
        if (renderRoutes) {
            const newRoutes = renderRoutes({Route, Switch, Redirect},this.renderLayout)
            if (newRoutes && typeof newRoutes !== 'string') {
                Page = newRoutes
            }
        }
        return (
            <Router>
                <ConfigProvider locale={zhCN}>
                {Page}
                </ConfigProvider>
            </Router>
        );
    }
}
NavFrame.propTypes = {
    menus: PropTypes.arrayOf(PropTypes.object).isRequired,
    pageLinks: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
    collapsedTitle: PropTypes.string,
    logout: PropTypes.func,
    renderHeaderActions: PropTypes.func,
    headerHide: PropTypes.bool,
    sideMenusHide: PropTypes.bool,
    renderRoutes: PropTypes.func,
    renderSiderTopSection: PropTypes.func
}
NavFrame.defaultProps = {
    collapsedTitle: '',
    headerHide: false,
    sideMenusHide: false,
    renderHeaderActions: () => null,
    renderSiderTopSection: () => null
}
