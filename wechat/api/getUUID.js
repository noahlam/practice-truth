const u = require('../utils')
let g = require('../global')

async function getUUID() {
  let url = 'https://wx.qq.com/jslogin'
  let body = {
    appid: g.appId,
    fun: 'new',
    lang: 'zh_CN',
    _: new Date().valueOf()
  }
  let res = await u.post(url, body)
  let data = u.dataToJson(res.data)
  let uuid = data['window.QRLogin.uuid'];
  g.uuid = uuid
  return uuid
}

module.exports = getUUID