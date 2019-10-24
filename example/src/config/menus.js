/*
* @Author: docoder
* @Email:  docoder@163.com
*/
const menus = [
    {
        label: '仪表盘',
        key: 'Dashboard',
        index: true
    },
    {
        label: '按钮(Button)',
        key: 'Buttons'
    },
    {
        label: '消息提示(Alert)',
        key: 'Alerts'
    },
    {
        label: '加载(Loading)',
        key: 'Loadings'
    },
    {
        label: '输入框(Input)',
        key: 'Inputs'
    },
    {
        label: '表单(Form)',
        subs: [
            {
                label: '基本表单',
                key: 'BaseForm'
            }
        ]
    },
    {
        label: '表格(Table)',
        subs: [
            {
                label: '基本表格',
                key: 'BaseTable'
            }
        ]
    },
    {
        label: '标签页(Tabs)',
        key: 'Tabs'
    },
    {
        label: '折叠面板(Collapse)',
        key: 'Collapses'
    },
    {
        label: '面板(Panel)',
        key: 'Panels'
    },
    {
        label: '选择按钮(Toggle & Checkbox)',
        key: 'SelectButton'
    },
    {
        label: '上传(Upload)',
        key: 'Uploads'
    },
    {
        label: '弹出框(Modal)',
        key: 'Modals'
    }
    
];
export default menus;
