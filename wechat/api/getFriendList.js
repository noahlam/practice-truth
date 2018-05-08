const u = require('../utils')
let g = require('../global')

async function getFriendList() {
  let url = 'https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxgetcontact'
  let body = {
    r: new Date().valueOf(),
    seq: 0,
    skey: g.senseData.skey
  }
  let res = await u.getJSON(url, body)

  let data = res.data

  // console.log('好友列表', data.MemberList)
}

module.exports = getFriendList
