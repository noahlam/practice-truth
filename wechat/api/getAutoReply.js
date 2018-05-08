const u = require('../utils')
const g = require('../global')

async function getAutoReply(msg) {
    let url = `http://openapi.tuling123.com/openapi/api/v2`
    let body = {
        perception: {
            inputText: {
                text: msg
            }
        },
        userInfo: {
            apiKey: g.toolingApiKey,
            userId: g.toolingUserId
        }
    }

    let res = await u.postJSON(url, body)

    return res.data.results[0].values.text
}

module.exports = getAutoReply
