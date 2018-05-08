const xml2js = require('xml2js')
const u = require('../utils')
let g = require('../global')

async function getSenseInfo(query) {

  let body = {
    ticket: query.ticket,
    uuid: g.uuid,
    lang: 'zh_CN',
    scan: query.scan,
    fun: 'new'
  }

  let res = await u.get(query.apiURL, body)

  g.cookie = res.headers['set-cookie']
  g.senseData = await parseXML(res.data)
  return g.senseData
}

function parseXML(xml) {

  return new Promise(resolve => {

    let parser = new xml2js.Parser({explicitArray: false})

    parser.parseString(xml, (err, result) => {
      resolve(result.error)
    });
  })
}

module.exports = getSenseInfo
