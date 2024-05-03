import dotenv from 'dotenv'
import app from "./app.js"
import { Server as SocketServer } from 'socket.io'
import { createServer } from 'http'

const server = createServer(app)
export const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:3000",
    }
})

dotenv.config()

app.listen(process.env.PORT, () => {
    console.log(`server is runing on port ${process.env.PORT}`)
})

// io.on('connection', (socket) => {
//     console.log('a user connected');


//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });


// });


server.listen(4000, () => {
    console.log('listening on *:4000');
}
);