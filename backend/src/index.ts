import dotenv from 'dotenv'
import app from "./app.js"
import { Server as SocketServer } from 'socket.io'
import { createServer } from 'http'

const server = createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:3000",
    }
})

dotenv.config()

app.listen(process.env.PORT, () => {
    console.log(`server is runing on port ${process.env.PORT}`)
})

io.on('connection', (socket) => {

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log('user joined room: ' + room)
    });

    socket.on('getData', (data) => {
        io.to(data.room).emit('notification', data);
    });

    socket.on('disconnect', () => {

    });
});


server.listen(4000, () => {
    console.log('listening on *:4000');
}
);