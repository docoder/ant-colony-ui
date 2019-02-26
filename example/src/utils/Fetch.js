
export default function fetch2(url, options) {
    let opt = options || {}
    opt.credentials = opt.credentials || 'include'
    return fetch(url, opt)
        .then(response => response.json())
        .then((json) => {
            return json
        })
}