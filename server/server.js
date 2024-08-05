const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Required for resolving file paths

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, '../client')));

// Handle incoming WebSocket connections
io.on('connection', (socket) => {
    console.log('New player connected with Socket ID:', socket.id);

    // Optionally, you can listen for other events from the client
    socket.on('disconnect', () => {
        console.log('Player disconnected with Socket ID:', socket.id);
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
