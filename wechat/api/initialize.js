const u = require('../utils')
let g = require('../global')

async function initialize(data) {
    let url = `https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxinit?r=${~(new Date().valueOf())}`
    let body = {
        BaseRequest: {
            DeviceID: g.DeviceID,
            Sid: data.wxsid,
            Uin: data.wxuin,
            Skey: data.skey
        }
    }
    let res = await u.postJSON(url, body)

    // 初始化成功
    if (res.data.BaseResponse.Ret === 0) {

        g.synckeyList = res.data.SyncKey
        g.username = res.data.User.UserName

        return res.data

    } else {
        console.error('初始化失败', res)
    }
}

module.exports = initialize
