/*
* @Author: docoder
* @Email:  docoder@163.com
*/
import * as React from 'react';
import Editor from 'react-simple-code-editor';
import styled from 'styled-components';
import initials from '../../css-initials';
const Container = styled.div`
    & pre {
        ${initials}
        all: initials;
    }
`;
export default class CodeEditor extends React.Component {
  render() {
    return (
        <Container style={{
            overflow: 'auto',
            border: '1px solid #d9d9d9',
            borderRadius: 4,
            minHeight: 46,
            maxHeight: 150,
            lineHeight: 'normal'
        }}>
            <Editor
                {...this.props}
                onValueChange={this.props.onChange}
                highlight={code => Prism.highlight(code, Prism.languages.js)}
                padding={10}
                tabSize={4}
                style={{
                    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                    fontSize: 12,
                    lineHeight: 'normal',
                    width: '-webkit-max-content',
                    width: '-moz-max-content',
                    width: 'max-content',
                    width: 'intrinsic',
                    height: '-webkit-max-content',
                    height: '-moz-max-content',
                    height: 'max-content',
                    height: 'intrinsic',
                    display: 'inline-block'
                }}
            />
        </Container>
    )
  }
}