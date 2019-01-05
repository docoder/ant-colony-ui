/**
 * 金山云上传，包括获取签名，上传后文件处理
 * antd upload组件与金山云配合上传，需要先获取签名，可以参照如下地址：https://github.com/ant-design/ant-design/issues/2022
 * 步骤就是在beforeUpload里面使用promise的方式获取签名，将签名信息附在file对象上，并resolve(file),然后在data函数中返回file对象里面的签名信息
 * 2017-06-08
 */
import fetch2 from './Fetch'

export function requestKssSign(file, _private = false) {
    if (!file) return false;
    let formData = new FormData();
    formData.append('file_list', file.name)
    if (_private) {
        formData.append('_set_acl', 'private')
    }

    return fetch2('//storage.guazi.com/sign.php', {
        method: 'POST',
        credentials: 'same-origin',
        body: formData,
    }).then((json) => {
        if (json.code !== 0) {
            return false;
        }
        let domain = json.data.download_domain

        let signs = json.data.signs
        let policy = signs.Policy
        let kss = signs.KSSAccessKeyId
        let key = signs.key
        let acl = signs.acl
        let signature = signs.Signature
        // let name = signs.file_name
        file.signs = {
            'KSSAccessKeyId': kss,
            'acl': acl,
            'key': key,
            'Policy': policy,
            'Signature': signature,
        }
        file.domain = {
            'domain': domain,
        }
        return file;
    }).catch(err => false)
}
export function getFileList(fileList = []) {
    let list = [], link, ofile, key, signs, newfile, domain;
    fileList.forEach(function (file) {
        if (file.status === 'done') {
            if (file.url) {
                list.push(file)
            } else {
                ofile = file.originFileObj;
                signs = ofile.signs;
                newfile = {};
                newfile.name = ofile.name
                newfile.status = file.status
                newfile.uid = file.uid
                domain = file.originFileObj.domain.domain
                if (signs) {
                    key = signs.key;
                    link = domain + key;
                    newfile.url = link;
                } else {
                    newfile.url = file.thumbUrl;
                }
                list.push(newfile)
            }
        } else {
            list.push(file)
        }
    })
    return list;
}
export function getKssSign(file = {}) {
    return file.signs || {}
}
