const u = require('../utils')
let g = require('../global')

async function _queryScanStatus(tip) {
  let url = 'https://wx.qq.com/cgi-bin/mmwebwx-bin/login'
  let body = {
    tip: tip,
    uuid: g.uuid,
    _: new Date().valueOf(),
    loginicon: true
  }
  let res = await u.get(url, body)
  return u.dataToJson(res.data)
}

async function getScanResult() {
  let scanRes = await _queryScanStatus(1)
  if (scanRes['window.code'] == 201) {
    let confirmRes = await _queryScanStatus(0)
    if (confirmRes['window.code'] == 200) {
      let data = queryToJson(confirmRes['window.redirect_uri'])
      return data
    }
  }
}

function queryToJson(url) {
  let index = url.indexOf('?')
  let apiURL = url.substr(0, index)
  let query = url.substr(index + 1)
  let data = u.dataToJson(query, '&')
  data.apiURL = apiURL
  return data
}

module.exports = getScanResult
