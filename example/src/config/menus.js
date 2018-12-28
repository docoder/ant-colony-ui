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
        label: '上传(Upload)',
        key: 'Uploads'
    },
    {
        label: '弹出框(Modal)',
        key: 'Modals'
    }
    
];
export default menus;
