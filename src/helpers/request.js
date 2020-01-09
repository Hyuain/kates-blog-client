import Vue from 'vue'
import '../plugins/axios.js'
import {Message} from "element-ui"

const axios = Vue.asxios

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = 'http://blog-server.hunger-valley.com'
axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let options = {
      url,
      method: type
    }
    if (type.toLowerCase() === 'GET') {
      options.params = data
    } else {
      options.data = data
    }
    axios(options).then(response => {
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
