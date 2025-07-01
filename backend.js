// const express = require('express');
// const http = require('http');
// const path = require('path');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Serve static files (HTML, CSS, JS)
// app.use(express.static(__dirname));

// // Main route
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'real_time_chat.html'));
// });

// // WebSocket handling
// io.on('connection', (socket) => {
//   console.log(`🔌 New user connected: ${socket.id}`);

//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });

//   socket.on('disconnect', () => {
//     console.log(`❌ User disconnected: ${socket.id}`);
//   });
// });

// // IMPORTANT for Render!
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });
