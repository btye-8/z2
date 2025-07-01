const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS)
app.use(express.static(__dirname));

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'real_time_chat.html'));
});

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});