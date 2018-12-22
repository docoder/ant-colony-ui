/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';
import { NavFrame } from 'xinche-ui';

import menus from '../../config/menus';
import connectRoute from '../../utils/ConnectRoute';
import asyncComponent from '../../utils/AsyncComponent';

let pageLinks = [];
const getPageRoute = (item) => {
    return connectRoute(asyncComponent(() => import(`../${item.key}`), item.label || '无标题'));
}
menus.forEach( m => {
    if (m.key) {
        pageLinks.push({ page: getPageRoute(m), label: m.label, link: m.index ? '/' : `/${m.key}`});
    }else if (m.subs && m.subs.length > 0) {
        m.subs.forEach( s => {
            if (s.key) {
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
export default class App extends React.Component {
    render() {
        return (
            <AppBody>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Xinche UI</title>
                </Helmet>
                <NavFrame title='Xinche UI' collapsedTitle='DAUI' menus={menus} pageLinks={pageLinks} />
            </AppBody>
        );
    }
}
