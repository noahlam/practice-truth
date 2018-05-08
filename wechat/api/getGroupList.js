const u = require('../utils')
let g = require('../global')

async function getGroupList() {
  let url = `https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxbatchgetcontact?type=ex&r=${new Date().valueOf()}&lang=zh_CN&pass_ticket=${g.senseData.pass_ticket}`

  let body = {
    BaseRequest: {
      Uin: g.senseData.wxuin,
      Sid: g.senseData.wxsid,
      Skey: g.senseData.skey,
      DeviceID: g.DeviceID
    },
    Count: g.ContactList.length,
    List: g.ContactList
  }
  let res = await u.getJSON(url, body)

  let data = res.data
}

module.exports = getGroupList
