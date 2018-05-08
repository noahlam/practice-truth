// https://github.com/maiff/Itchat/blob/master/doc/%E6%95%99%E7%A8%8B.md
// https://github.com/Urinx/WeixinBot
// https://blog.csdn.net/wonxxx/article/details/51787041

const u = require('./utils')
let g = require('./global')

const getUUID = require('./api/getUUID')
const getScanResult = require('./api/getScanResult')
const getSenseInfo = require('./api/getSenseInfo')
const initialize = require('./api/initialize')
const getFriendList = require('./api/getFriendList')
const getGroupList = require('./api/getGroupList')
const checkNewMessage = require('./api/checkNewMessage')
const sendMessage = require('./api/sendMessage')


function statusNotify() {
  // let url = `https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxstatusnotify?lang=zh_CN&pass_ticket=xxx`
  // let body = {
  //     BaseRequest: { Uin: xxx, Sid: xxx, Skey: xxx, DeviceID: xxx },
  //     Code: 3,
  //     FromUserName: 自己ID,
  //     ToUserName: 自己ID,
  //     ClientMsgId: 时间戳
  // }

  // 非必要 暂缓实现
}


async function start() {
  let uuid = await getUUID()
  let qrcodeURL = 'https://wx.qq.com/qrcode/' + uuid
  console.log('请打开地址扫码登录 ', qrcodeURL)
  let query = await getScanResult()
  let sense = await getSenseInfo(query)

  await initialize(sense)
  // getFriendList()
  // getGroupList()
  checkNewMessage()
}

start()
