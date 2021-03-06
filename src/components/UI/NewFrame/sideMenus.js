/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const FrameSider = styled(Sider)`
    &.ant-layout-sider {
        position: fixed;
        padding-top: 60px;
        overflow: auto;
        height: 100vh;
        left: 0;
    }
    z-index: 100;
`;

const FrameLink = styled(Link)`
    color: inherit;
    &:hover {
        color: inherit;
    };
    &:focus {
        text-decoration: none;
    };
`;

class SideMenu extends Component {
    renderMenuItem = (item) => {
        return (
            <Menu.Item key={`/${item.key}`}>
                <Icon type="right-circle" />
                <span>{item.label}</span>
            </Menu.Item>
        )
    }
    renderMenu = (m) => {
        if (m.subs && m.subs.length > 0) {
            return (
                <SubMenu
                    key={m.label}
                    title={
                        <span>
                            <Icon type="right-circle" />
                            <span>{m.label}</span>
                        </span>
                    }
                >
                    {m.subs.map(s => this.renderMenu(s))}
                </SubMenu>
            )
        }else {
            return this.renderMenuItem(m)
        }
    }
    renderMenus = (menus) => {
        return menus.map( m => {
            return this.renderMenu(m)
        })
    }
    selectMenu = ({ item, key, keyPath }) => {
        let basePath = this.props.match.url
        if ( basePath === '/') {
            basePath = ''
        }
        this.props.history.push(`${basePath}${key}`)
    }

    render() {
        const { menus, match, location, collapsed, onCollapse, renderSiderTopSection } = this.props;
        const reg = new RegExp(match.url)
        const path = location.pathname.replace(reg,'')
        const pathSnippets = path.split('/').filter((i:any) => i);
        const selectedKey = `/${pathSnippets.length === 0 ? '' : pathSnippets[0]}`;
        return (
            <FrameSider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
            >
                {renderSiderTopSection()}
                <Menu 
                    theme="dark" 
                    defaultSelectedKeys={[
                        '/'
                    ]}
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={this.selectMenu}
                >
                    {
                        this.renderMenus(menus)
                    }
                </Menu>
            </FrameSider>
        )
    }
}
SideMenu.propTypes = {
    menus: PropTypes.arrayOf(PropTypes.object).isRequired,
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func,
    location: PropTypes.object.isRequired,
    renderSiderTopSection: PropTypes.func
}
SideMenu.defaultProps = {
     collapsed: false,
    onCollapse: () => {},
    renderSiderTopSection: () => null
}
export default withRouter(SideMenu);