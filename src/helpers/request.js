import axios from "axios";
import {Message} from "element-ui"


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'https://blog-server.hunger-valley.com'
axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    const config = {
      url,
      method: type
    }
    if (type.toLowerCase() === 'get') {
      config.params = data
    } else {
      config.data = data
    }
    axios(config).then(response => {
      if (response.data.status === 'ok') {
        resolve(response.data)
      } else {
        Message.error(response.data.msg)
        reject(response.data)
      }
    }).catch(() => {
      Message.error('网络异常')
      reject({msg: '网络异常'})
    })
  })
}
