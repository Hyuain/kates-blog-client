function friendlyDate(dateStr) {
  let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
  let someTime = dateObj.getTime()
  let now = Date.now()
  let gap = now - someTime
  let displayDate = ''

  switch (true) {
    case gap < 60000:
      displayDate = '刚刚'
      break
    case gap <1000*3600:
      displayDate = Math.floor(gap/60000) + '分钟前'
      break
    case gap <1000*3600*24:
      displayDate = Math.floor(gap/(1000*3600)) + '小时前'
      break
    default:
      displayDate = Math.floor(gap/(1000*3600*24)) + '天前'
  }

  return displayDate
}

export default {
  install(Vue) {
    Vue.prototype.$friendlyDate = friendlyDate
  }
}