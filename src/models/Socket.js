export default class Socket {
  constructor (io) {
    this.io = io
  }

  socketEvents () {
    this.io.on('connection', (socket) => {
      socket.on('client', (data) => {
        this.io.emit('server', data)
      })
    })
  }

  execute () {
    this.socketEvents()
  }
}
