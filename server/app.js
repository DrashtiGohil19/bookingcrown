const express = require('express');
const db = require('./utils/db');
const http = require('http');
const UserRouter = require('./routes/UserRouter');
const BookingRouter = require('./routes/BookingRouter');
const PlanRouter = require('./routes/PlanRouter');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
db()

const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_BASEURL,
        methods: ['GET', 'POST']
    }
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api', UserRouter);
app.use('/api', BookingRouter);
app.use('/api', PlanRouter);

io.on('connection', (socket) => {
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('userSignedUp', () => {
        io.to('adminRoom').emit('newUser');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});