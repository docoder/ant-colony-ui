# ant-colony-ui

> Ant Colony UI Toolkit based on Ant Design and React

[![NPM](https://img.shields.io/npm/v/ant-colony-ui.svg)](https://www.npmjs.com/package/ant-colony-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### 初衷

- 在 antd 上封装一层，项目中不引用antd，方便以后将antd替换
- 业务大组件封装，方便快速开发，风格统一

### 设计

- JSON In,  JSON Out
  - 组件参数接收 配置 JSON
  - 组件回调输出 结果 JSON
- 默认值覆盖大多数情况
- 尽量可自定义满足少数情况

### 组件

- NavFrame
  - layout
  - menus
  - pageLinks
  - title
  - actions
- Form
  - forms `必填` , 为Object的数组, Object字段如下
    - key `必填`
    - label `必填`
    - type
      - input  `default`
      - add  `动态添加`
      - header
      - info
      - select
      - textArea
      - date
      - **checkbox**
      - **radio**
      - **rangeDate**
      - **month**
    - placeholder
    - required
      - bool
      - **function**
    - reg
      - pattern
      - message
    - value
    - disabled
    - **alwaysEnable**
    - meta  `type为select时有效`
      - ref 
        - 表单联动时需要参考的字段的 key
      - **mode**
        - undefined  `default`
        - tags
        - multiple
      - data `function / array`
        - 若有ref配置，function的参数 refValue 为参考字段的值
      - showSearch
    - addLabel `type为add时有效`
    - addKeys `type为add时有效`
      - 需要动态添加的字段的key值的数组
    - showTime `type为date时有效`
    - onChange
    - data `type为select时有效`
  - accessoryComponent
    - 函数
    - 可返回不受表单控制的附加 UI，
    - 参数为函数 getFormItem，可返回受表单控制的自定义UI
    - getFormItem 接收参数为Object, Object 字段如下
      - label`必填`
      - key`必填`
      - value
      - required
      - reg
  - onSubmit，参数如下
    - values
      - JSON Out
    - clear
      - 函数，调用可清空表单
  - onReset
    - 重置表单回调
  - layout
    - columnCount
      - 默认列数
    - rowColCounts
      - 每行列数的数组
      - 若数组列数之和小于所有表单字段数，数组最后一项的列数为之后剩余字段的布局列数
    - actionDirection
      -  页末操作按钮的位置
        - left
        - center
        - right
    - labelPostion 
      - 字段Label的位置
        - left
        - top
    - . . . . . . 
  - **disableEnterSubmit**
  - … …
- Table
  - columns `必填`,  为Object的数组, Object字段如下
    - title `必填`
    - dataIndex`必填`
    - editable
      - bool
      - **function**
    - **type**  `editable 为 true时有效`
      - input  `default` 
      - select
      - tags
      - multiple
    - **meta** `type 为 select tags multiple 时有效`
      - ref 
        - 可以参考 Table 同 Row 的其他列字段，与之联动
      - data `function / array`
        - 若有ref配置，function的参数 refValue 为参考字段的值
    - required
    - **disabled**
    - fixed
    - width
    - reg
      - pattern
      - message
    - actions
      - label `必填`
      - callback
        - 接收参数 text, record, index
      - show `bool / function`
        - 函数时接收参数 text, record, index
        - 函数时需返回bool
      - confirm
      - confirmLabel
  - dataSource `必填`
  - onCellSave `editable为true时回调`
  - scrollWidth
    - 建议指定为大于表格宽度的固定值或百分比, 如 1000
    - 配合 fixed column 或 floatingScrollDomQuery 使用
  - floatingScrollDomQuery
    - 一般为 ".ant-table-scroll .ant-table-body"，使滚动条 floating
  - pagination
    - 参考 antd 的 pagination
  - onChange
    - 参数 pagination, filters, sorter
    - 主要用 pagination 进行分页
  - **columnsConfigGlobalTableKey**
    - 列配置的开启并指定全局唯一key（建议：项目唯一性简称+功能Model名+页面名+Table名等），用于缓存
  - . . . . . . 
- . . . . . .

## Install

```bash
npm install --save ant-colony-ui
```

## Usage

```jsx
import React, { Component } from 'react'

import { Button } from 'ant-colony-ui'

class Example extends Component {
  render () {
    return (
      <Button title="Default"/>
    )
  }
}
```

## License

MIT © [docoder](https://github.com/docoder)
