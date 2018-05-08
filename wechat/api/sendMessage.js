const u = require('../utils')
let g = require('../global')

async function sendMessage(ToUserName, Content) {
  let url = `https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxsendmsg?pass_ticket=${g.senseData.pass_ticket}`
  let body = {
    BaseRequest: {
      Uin: g.senseData.wxuin,
      Sid: g.senseData.wxsid,
      Skey: g.senseData.skey,
      DeviceID: g.DeviceID
    },
    Msg: {
      Type: 1,
      Content: Content,
      FromUserName: g.username,
      ToUserName: ToUserName,
      LocalID: this.ClientMsgId,
      ClientMsgId: new Date().getTime() + '' + (9000 * Math.random() + 1000)
    }
  }

  let res = await u.postJSON(url, body)
  // console.log('发送消息：', res.data);
}

module.exports = sendMessage
