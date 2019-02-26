/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import React, { Component } from "react";
import {Helmet} from 'react-helmet';

export default function asyncComponent(importComponent, title) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            };
        }

        componentDidMount() {
            importComponent().then((mod) => {
                this.setState({
                    // 同时兼容ES6和CommonJS的模块
                    component: mod.default ? mod.default : mod
                });
            });
        }
        render() {
                const C = this.state.component;
                return C 
                    ? 
                    ( 
                        title 
                        ? (
                            <div>
                                <Helmet>
                                    <title>{title}</title>
                                </Helmet>
                                <C {...this.props} />
                            </div>
                        ) 
                        : 
                        <C {...this.props} />
                    ) : null;
        }
    }

  return AsyncComponent;
}
