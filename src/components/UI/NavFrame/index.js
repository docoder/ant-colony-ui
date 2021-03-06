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
import RoutesContainer from './RoutesContainer'

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
    
    renderRoutes = (pls) => {
        if (this.props.renderRoutes) return this.props.renderRoutes()
        return (
            <Switch>
                {
                    pls.map(p => {
                    let exact = false;
                    let redirect = false;
                    if (p.link === '/' || p.exact) exact = true;
                    if (p.link !== '/' && p.index) redirect = true
                    // if (typeof p.page === 'function' && p.page.name !== 'ConnectRoute') {
                    //     if (redirect) {
                    //         return (<React.Fragment key={p.link}>
                    //             <Route exact path="/" render={() => <Redirect to={p.link} />} />
                    //             <Route exact={exact} path={p.link} render={p.page} />
                    //         </React.Fragment>)
                    //     }else {
                    //         return <Route key={p.link} exact={exact} path={p.link} render={p.page} />
                    //     }
                    // } else {
                        if (redirect) {
                            return (<React.Fragment key={p.link}>
                                <Route exact path="/" component={() => <Redirect to={p.link} />} />
                                <Route exact={exact} path={p.link} component={p.page} />
                            </React.Fragment>)
                        }else {
                            return <Route key={p.link} exact={exact} path={p.link} component={p.page} />
                        }
                    // }
                    })
                }
            </Switch>
        )
    }
    render() {
        const { menus, pageLinks, title, collapsedTitle, logout, renderHeaderActions, headerHide, sideMenusHide, renderSiderTopSection } = this.props;
        return (
            <Router>
            <RoutesContainer onRouteChange={this.props.onRouteChange}>
                <ConfigProvider locale={zhCN}>
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
                        !sideMenusHide && <SideMenus menus={menus} collapsed={this.state.collapsed} onCollapse={this.onCollapse} renderSiderTopSection={renderSiderTopSection} />
                    }
                    <FrameMain 
                        collapsed={this.state.collapsed ? 'true' : 'false'}
                        sidehide={sideMenusHide ? 'true' : 'false'}
                        headerhide={headerHide ? 'true' : 'false'}
                    >
                        <FrameBody >
                        {this.renderRoutes(pageLinks)}
                        </FrameBody>
                        <Footer style={{ textAlign: 'center' }}>
                            ©2018
                        </Footer>
                    </FrameMain>
                </Layout>
                </ConfigProvider>
            </RoutesContainer>
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
    renderSiderTopSection: PropTypes.func,
    onRouteChange: PropTypes.func
}
NavFrame.defaultProps = {
    collapsedTitle: '',
    headerHide: false,
    sideMenusHide: false,
    renderHeaderActions: () => null,
    renderSiderTopSection: () => null
}
