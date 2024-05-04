import dotenv from 'dotenv'
import app from "./app"
import { Server as SocketServer } from 'socket.io'
import { createServer } from 'http'

const server = createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
    }
})

dotenv.config()

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on http://localhost:${process.env.PORT}`)
// }
// );

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


server.listen(process.env.PORT, () => {
    console.log('listening on *:4000');
}
);

export { server as app }