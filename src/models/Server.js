import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import { join } from 'path'
import Socket from './Socket'
import dotenv from 'dotenv'
import cors from 'cors'

export default class Server {
  constructor () {
    dotenv.config()
    this.app = express()
    this.server = http.createServer(this.app)
    this.io = socketio(this.server)
    this.port = process.env.PORT
  }

  middleware () {
    this.app.use(express.static(join(__dirname, '../../public')))
    this.app.use(cors())
  }

  socket () {
    const socket = new Socket(this.io)
    socket.execute()
  }

  execute () {
    this.middleware()
    this.socket()
    this.server.listen(this.port, () => {
      console.log(`Server port ${this.port}`)
    })
  }
}
