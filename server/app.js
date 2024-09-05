const express = require('express');
const db = require('./utils/db');
const http = require('http');
const path = require('path');
const UserRouter = require('./routes/UserRouter');
const BookingRouter = require('./routes/BookingRouter');
const PlanRouter = require('./routes/PlanRouter');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

db();

const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_BASEURL,
        methods: ['GET', 'POST'],
        credentials: true
    }
});

app.use('/api', UserRouter);
app.use('/api', BookingRouter);
app.use('/api', PlanRouter);

io.on('connection', (socket) => {
    console.log('A user connected');

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

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
} else {
    app.get('/api', (req, res) => {
        res.send("API running succesfully !")
    })
}

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
