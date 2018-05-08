import axios from 'axios'
async function post(url, body) {
  let reqData = {
    method: 'POST',
    url: url,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
      // 'Content-type': 'multipart/form-data'
    },
    withCredentials :true,
    crossDomain:true,
    params: body,
    // data: body
  }
  let res = await axios(reqData);
  return res
}
export default {post}