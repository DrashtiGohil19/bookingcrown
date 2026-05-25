const express = require('express');
const db = require('./utils/db');
const http = require('http');
const path = require('path');
const UserRouter = require('./routes/UserRouter');
const BookingRouter = require('./routes/BookingRouter');
const PlanRouter = require('./routes/PlanRouter');
const ExpenseRouter = require('./routes/ExpenseRouter');
const ContactRouter = require('./routes/ContactRouter');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map(s => s.trim())
    : [process.env.CLIENT_BASEURL || 'http://localhost:3000'];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

db();

const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

const io = new Server(server, {
    cors: corsOptions
});

app.use('/api', UserRouter);
app.use('/api', BookingRouter);
app.use('/api', PlanRouter);
app.use('/api', ExpenseRouter);
app.use('/api', ContactRouter);

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
