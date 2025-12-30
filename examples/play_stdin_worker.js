const { parentPort } = require('node:worker_threads')
const { WebSocketServer } = require('ws')

try {
  const wss = new WebSocketServer({ port: 8980 })
  wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
      parentPort.postMessage({ message: data })
    })
    parentPort.on('message', (data) => {
      ws.send(data)
    })
  })
}
catch (_) {}
