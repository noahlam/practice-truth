const u = require('../utils')
let g = require('../global')
const sendMessage = require('./sendMessage')
const getAutoReply = require('./getAutoReply')

async function checkNewMessage() {
    // 构建 synckey 我也不知道为什么，要做的这么复杂
    let synckey = ''
    let sk = g.synckeyList.List || []
    for (let i = 0; i < sk.length; i++) {
        synckey += `${sk[i].Key}_${sk[i].Val}`
        if (i !== sk.length - 1) synckey += '|'
    }

    let time = new Date().getTime()
    let url = `https://webpush.wx.qq.com/cgi-bin/mmwebwx-bin/synccheck`
    let body = {
        r: time,
        sid: g.senseData.wxsid,
        uin: g.senseData.wxuin,
        skey: g.senseData.skey,
        deviceid: g.DeviceID,
        synckey: synckey,
        _: time
    }

    let res = await u.getJSON(url, body)

    let data = eval(`(${res.data.match(/=(.+)/)[1]})`)

    if (data.selector == 2) {
        let msgList = await getNewMessage()
        msgList.forEach(async m => {
            // 不是群消息，就调用对话接口，自动回复
            if (m.FromUserName.indexOf('@@') !== 0) {
                let reply = await getAutoReply(m.Content)
                await sendMessage(m.FromUserName, reply)
            }
        })
    }
    await checkNewMessage()

}

async function getNewMessage() {
    let url = `https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxsync` +
        `?sid=${g.senseData.wxsid}&skey=${g.senseData.skey}&pass_ticket=${g.senseData.pass_ticket}`

    let body = {
        BaseRequest: {
            Uin: g.senseData.wxuin,
            Sid: g.senseData.wxsid,
            Skey: g.senseData.skey,
            DeviceID: g.DeviceID
        },
        SyncKey: g.synckeyList,
        rr: ~(new Date().valueOf())
    }
    let res = await u.postJSON(url, body)
    if (res.data.BaseResponse.Ret === 0) {
        // 每次获取完新消息以后，synckey 都会跟着变
        g.synckeyList = res.data.SyncCheckKey
        return res.data.AddMsgList || []
    }
}

module.exports = checkNewMessage
