/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React, { Component } from 'react';
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
export default class SideMenu extends Component {
    renderMenuItem = (item) => {
        return (
            <Menu.Item key={`/${item.key}`}>
                <Icon type="right-circle" />
                <span>{item.label}</span>
            </Menu.Item>
        )
    }
    renderMenus = (menus) => {
        return menus.map( m => {
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
                        {m.subs.map(s => this.renderMenuItem(s))}
                    </SubMenu>
                )
            }else {
                return this.renderMenuItem(m)
            }
        })
    }
    render() {
        const { menus, selectedKey, onMenuSelect, collapsed, onCollapse, renderSiderTopSection } = this.props;
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
                    onClick={onMenuSelect}
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
    selectedKey: PropTypes.string,
    onMenuSelect: PropTypes.func,
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func,
    renderSiderTopSection: PropTypes.func,
}
SideMenu.defaultProps = {
    onMenuSelect: () =>{},
    collapsed: false,
    onCollapse: () => {},
    renderSiderTopSection: () => {}
}