/*
* @Author: lijian
* @Email:  lijian46@guazi.com
*/
/*
* @Author: lijian
* @Email:  lijian46@guazi.com
*/
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const FrameSider = styled(Sider)`
    padding-top: 60px;
`;
const FrameLink = styled(Link)`
    .ant-menu-item & {
        display: inline ;
    }
`;

class SideMenu extends Component {
    renderMenuItem = (item) => {
        return (
            <Menu.Item key={item.index ? '/' : `/${item.key}`}>
                <Icon type="right-circle" />
                <FrameLink to={ item.index ? '/' : `/${item.key}` }>{item.label}</FrameLink>
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
        const { menus, location, collapsed, onCollapse } = this.props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const selectedKey = `/${pathSnippets.length === 0 ? '' : pathSnippets[0]}`;
        return (
            <FrameSider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
            >
                <Menu 
                    theme="dark" 
                    defaultSelectedKeys={[
                        '/'
                    ]}
                    mode="inline"
                    selectedKeys={[selectedKey]}
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
    location: PropTypes.object.isRequired
}
export default withRouter(SideMenu);