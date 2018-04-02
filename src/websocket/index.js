import SockJS from 'sockjs-client'

let websocket
export const loadWebsocket = function (wspath, callback) {
  websocket = new SockJS('http://' + wspath)
  websocket.onopen = () => {
    console.log('websocket连接开始')
    console.log(new Data())
  }
  websocket.onmessage = event => {
    console.log('数据已接收' + event.data)
    callback(event.data)
  }
  websocket.onclose = event => {
    console.log(event)
    websocket = loadWebsocket(wspath, callback)
  }
  websocket.onerror = event => {
    console.log('连接出错')
  }
  return websocket
}

export const sendMessage = function () {
  if (websocket !== null) {
    websocket.send(JSON.stringify('发送的内容'))
  }
}
