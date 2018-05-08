const axios = require('axios')
let g = require('./global')

function _require(url, data = {}, method = 'POST', contentType = 'json') {

  let _contentType = contentType === 'json' ? 'application/json' : 'application/x-www-form-urlencoded'

  let option = {
    method: method,
    url: url,
    headers: {
      'Content-type': _contentType,
      'Cookie': g.cookie.join(';'),
    },
    withCredentials: true,
    params: data,
    data: data,
  }

  return axios(option)
}

function post(url, data = {}) {
  return _require(url, data, 'POST', 'url')
}

function postJSON(url, data = {}) {
  return _require(url, data, 'POST', 'json')
}

function get(url, data = {}) {
  return _require(url, data, 'GET', 'url')
}

function getJSON(url, data = {}) {
  return _require(url, data, 'GET', 'json')
}

function dataToJson(data, separator = ';') {
  let res = {}
  let arr = data.split(separator)
  arr.forEach(item => {
    if (!item) return
    item = item.trim()
    let index = item.indexOf('=')
    let k = item.substr(0, index).trim()
    let v = item.substr(index + 1).trim()
    if (v.indexOf('"') === 0 && v.lastIndexOf('"') === v.length - 1) {
      v = v.substring(1, v.lastIndexOf('"'))
    }
    res[k] = v
  })
  return res
}

module.exports = {
  post,
  postJSON,
  get,
  getJSON,
  dataToJson
}