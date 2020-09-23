import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

Vue.filter('relativeTime', val => {
  return dayjs(val).from(dayjs())
})
Vue.filter('dateTime', (val, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(val).format(format)
})

export const formatDate = (val, format = 'YYYY-MM-DD') => {
  return dayjs(val).format(format)
}
