const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");


const authRoutes = require("./routes/authRoutes");
const linkRoutes = require("./routes/linkRoutes");
const uptimeRoutes = require("./routes/uptimeRoutes");
const { startMonitoring } = require("./services/uptimeMonitor");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(linkRoutes);
app.use(uptimeRoutes);

// Attach socket.io to global object so monitor file can access it
global._io = io;

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected");
    startMonitoring(); // Still works
});

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    socket.join(userId);
    console.log("User connected:", userId);

    socket.on("disconnect", () => {
        console.log("User disconnected:", userId);
    });
});

server.listen(5000, () => console.log(`Server running on port 5000`));
