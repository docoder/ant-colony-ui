/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import { NavFrame, Button } from 'ant-colony-ui';

import menus from '../../config/menus';
import connectRoute from '../../utils/ConnectRoute';
import asyncComponent from '../../utils/AsyncComponent';

let pageLinks = [];
const getPageRoute = (item) => {
     const suffix = 'Ant Colony UI';
    return connectRoute(asyncComponent(() => import(`../${item.key}`), `${item.label} | ${suffix}` || '无标题'));
}
// const getPageRoute2 = (item) => {
//      const suffix = 'Ant Colony UI';
//      const A = connectRoute(asyncComponent(() => import(`../${item.key}`), `${item.label} | ${suffix}` || '无标题'));
//     return (props) => <A {...props} />;
// }
menus.forEach( m => {
    if (m.key) {
        pageLinks.push({exact: true, page: getPageRoute(m), label: m.label, link: m.index ? '/' : `/${m.key}`});
    }else if (m.subs && m.subs.length > 0) {
        m.subs.forEach( s => {
            if (s.subs) {
                s.subs.forEach(ss => {
                    if (ss.key) {
                        pageLinks.push({ page: getPageRoute(ss), label: ss.label, link: ss.index ? '/' : `/${ss.key}`});
                    }else {
                        throw new Error('Menus Json 不合法，缺少字段 key');
                    }
                })
            }else if (s.key) {
                pageLinks.push({ page: getPageRoute(s), label: s.label, link: s.index ? '/' : `/${s.key}`});
            }else {
                throw new Error('Menus Json 不合法，缺少字段 key');
            }
        }) 
    }else {
        throw new Error('Menus Json 不合法，缺少字段 key 或 subs');
    }
})
console.log('==PageLinks==>', pageLinks.map(pl => ({label: pl.label, link: pl.link})));

const AppBody = styled.div`
`;
const SiderTopSection = styled.div`
    padding: 20px;
    color: white;
    font-size: 14px;
`
export default class App extends React.Component {
    render() {
        return (
            <AppBody>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Ant Colony UI</title>
                </Helmet>
                <NavFrame
                    title='Ant Colony UI'
                    collapsedTitle='ACUI'
                    menus={menus}
                    pageLinks={pageLinks}
                    logout={() => {}}
                    renderHeaderActions={() => (<Button type="primary" title="Action" />)}
                    renderSiderTopSection={() => {
                        return (<SiderTopSection>Sider Top Info</SiderTopSection>)
                    }}
                />
            </AppBody>
        );
    }
}
