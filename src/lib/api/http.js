// import appConfig, { dataType } from './http.cofig'
// import { getItem, removeItem, setItem } from './localCache'
import Axios from 'axios'

// GET 请求拼装参数
const appendParamsForGet = (url, params) => {
  let keysArr = params ? Object.keys(params) : []
  for (let i = 0; i < keysArr.length; i++) {
    let key = keysArr[i]
    if (!i) url += '?' + key + '=' + params[key]
    else url += '&' + key + '=' + params[key]
  }
  return url
}

/**
 * 组装 header：不同的登录方式，请求的 header 不同
 * @param {string} url 请求地址
 * @return {}
 */
function getHeaderWithUrl(url) {
  // 默认 headers
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  }

  return headers
}


// 处理服务器返回的数据（根据实际的 error 参数的值来 resolve 和 reject）
export const dealNextExtractData = promise => {
  return promise.then(value => {
    if (value && (value.error === 0 || value.Error === 0)) {
      return Promise.resolve(value)
    } else {
      return Promise.reject(value)
    }
  })
}

// 处理 http 请求返回的数据
const extractData = value => {
  if (value.status === 200) {
    value = value.data
    return value
  } else {
    // token 失效
    if (value.status === 401) {
      value = value.data
      if (value.Message === '已拒绝为此请求授权。') {
    
      }
    }
    return value
  }
}

/**
 * http
 * @param {string} url 请求地址
 * @param {string} method 请求方法
 * @param {object} body 参数
 * @param {string} type 请求类型
 * @return {promise} 处理后的后台数据
 */
export default function http(url,method) {
  // 组装 headers
  const headers = getHeaderWithUrl(url)
  // 根据 type 给 data 添加额外的参数

  let options = {
    method: method,
    headers: headers,
  }

  if (method === 'GET') {
    url = appendParamsForGet(url)
  } else if (method === 'POST') {
    // options.data = JSON.stringify(params)
  } else {
    Promise.reject('请使用 GET 和 POST 方式请求数据')   
  }
  options.url = url
  return Axios(options).then(value => extractData(value))
}
