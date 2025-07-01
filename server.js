const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Main route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'real_time_chat.html'));
});

// WebSocket handling
io.on('connection', (socket) => {
  console.log(`🔌 New user connected: ${socket.id}`);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

// IMPORTANT for Render!
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}





// User credentials
        const users = {
            'Gauri': '18072007',
            'Btye': '18042004'
        };

        // Global variables
        let currentUser = '';
        let friendUser = '';
        let messages = [];
        let socket = null;
        let isConnected = false;
        let reconnectAttempts = 0;
        let maxReconnectAttempts = 5;
        let typingTimeout = null;
        let isTyping = false;

        // Simulated WebSocket for demo (replace with real WebSocket in production)
        class MockWebSocket {
            constructor() {
                this.isOpen = false;
                this.messageQueue = [];
                this.listeners = {};
                
                // Simulate connection
                setTimeout(() => {
                    this.isOpen = true;
                    this.triggerEvent('open');
                    this.startMessageSimulation();
                }, 1000);
            }
            
            addEventListener(event, callback) {
                if (!this.listeners[event]) {
                    this.listeners[event] = [];
                }
                this.listeners[event].push(callback);
            }
            
            removeEventListener(event, callback) {
                if (this.listeners[event]) {
                    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
                }
            }
            
            send(data) {
                if (this.isOpen) {
                    // In a real implementation, this would send to server
                    console.log('Sending:', data);
                } else {
                    this.messageQueue.push(data);
                }
            }
            
            close() {
                this.isOpen = false;
                this.triggerEvent('close');
            }
            
            triggerEvent(eventType, data) {
                if (this.listeners[eventType]) {
                    this.listeners[eventType].forEach(callback => {
                        callback(data ? { data } : {});
                    });
                }
            }
            
            startMessageSimulation() {
                // This simulates receiving messages from other users
                // In production, this would be handled by the server
                setInterval(() => {
                    if (Math.random() > 0.95 && currentUser) {
                        const otherUser = currentUser === 'Gauri' ? 'Btye' : 'Gauri';
                        
                        
                      
                        
                        this.triggerEvent('message', JSON.stringify({
                            type: 'message',
                            message: randomMessage,
                            sender: otherUser,
                            timestamp: new Date().toISOString()
                        }));
                    }
                }, 10000);
            }
        }

        // Initialize WebSocket connection
        function initializeSocket() {
            // In production, replace this with actual WebSocket URL
            // socket = new WebSocket('wss://your-websocket-server.com');
            socket = new MockWebSocket();
            
            socket.addEventListener('open', onSocketOpen);
            socket.addEventListener('message', onSocketMessage);
            socket.addEventListener('close', onSocketClose);
            socket.addEventListener('error', onSocketError);
        }

        function onSocketOpen() {
            isConnected = true;
            reconnectAttempts = 0;
            updateConnectionStatus('connected');
            
            // Send join message
            if (currentUser) {
                socket.send(JSON.stringify({
                    type: 'join',
                    username: currentUser
                }));
            }
        }

        function onSocketMessage(event) {
            try {
                const data = JSON.parse(event.data);
                
                switch (data.type) {
                    case 'message':
                        if (data.sender !== currentUser) {
                            receiveMessage(data);
                        }
                        break;
                    case 'typing':
                        if (data.sender !== currentUser) {
                            handleTypingIndicator(data.sender, data.isTyping);
                        }
                        break;
                    case 'userStatus':
                        updateUserStatus(data.username, data.status, data.lastSeen);
                        break;
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        }

        function onSocketClose() {
            isConnected = false;
            updateConnectionStatus('disconnected');
            
            // Attempt to reconnect
            if (reconnectAttempts < maxReconnectAttempts) {
                reconnectAttempts++;
                updateConnectionStatus('reconnecting');
                setTimeout(() => {
                    initializeSocket();
                }, 3000 * reconnectAttempts);
            }
        }

        function onSocketError(error) {
            console.error('WebSocket error:', error);
            updateConnectionStatus('disconnected');
        }

        // Update connection status indicator
        function updateConnectionStatus(status) {
            const statusElement = document.getElementById('connectionStatus');
            statusElement.className = `connection-status ${status}`;
            
            switch (status) {
                case 'connected':
                    statusElement.textContent = '🟢 Connected';
                    break;
                case 'disconnected':
                    statusElement.textContent = '🔴 Disconnected';
                    break;
                case 'reconnecting':
                    statusElement.textContent = '🟡 Reconnecting...';
                    break;
            }
        }

        // Login functionality
        function login() {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorElement = document.getElementById('errorMessage');

            if (users[username] && users[username] === password) {
                currentUser = username;
                friendUser = username === 'Gauri' ? 'Btye' : 'Gauri';
                
                // Hide error message
                errorElement.style.display = 'none';
                
                // Switch to chat interface
                document.getElementById('loginScreen').style.display = 'none';
                document.getElementById('chatContainer').style.display = 'flex';
                
                // Initialize chat
                initializeChat();
                initializeSocket();
                
                // Request notification permission
                if ('Notification' in window) {
                    Notification.requestPermission();
                }
            } else {
                errorElement.style.display = 'block';
                document.getElementById('password').value = '';
            }
        }

        // Logout functionality
        function logout() {
            if (confirm('Are you sure you want to logout?')) {
                if (socket) {
                    socket.close();
                }
                
                currentUser = '';
                friendUser = '';
                messages = [];
                
                document.getElementById('loginScreen').style.display = 'flex';
                document.getElementById('chatContainer').style.display = 'none';
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                document.getElementById('errorMessage').style.display = 'none';
                
                // Clear messages
                document.getElementById('messagesContainer').innerHTML = 
                    '<div class="typing-indicator" id="typingIndicator"><span id="typingUser">Friend</span> is typing...</div>';
                
                hideNotification();
                updateConnectionStatus('disconnected');
            }
        }

        // Initialize chat interface
        function initializeChat() {
            document.getElementById('friendName').textContent = friendUser;
            document.getElementById('friendAvatar').textContent = friendUser[0];
            document.getElementById('typingUser').textContent = friendUser;
            document.getElementById('lastSeen').textContent = 'Connecting...';
            
            // Focus on message input
            document.getElementById('messageInput').focus();
        }

        // Handle key press in message input
        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            } else {
                // Send typing indicator
                sendTypingIndicator(true);
            }
        }

        // Send typing indicator
        function sendTypingIndicator(typing) {
            if (socket && isConnected) {
                socket.send(JSON.stringify({
                    type: 'typing',
                    sender: currentUser,
                    isTyping: typing
                }));
            }
            
            // Clear typing after 3 seconds
            if (typing) {
                clearTimeout(typingTimeout);
                typingTimeout = setTimeout(() => {
                    sendTypingIndicator(false);
                }, 3000);
            }
        }

        // Handle typing indicator from other users
        function handleTypingIndicator(sender, typing) {
            const typingElement = document.getElementById('typingIndicator');
            if (typing && sender === friendUser) {
                typingElement.style.display = 'block';
                scrollToBottom();
            } else {
                typingElement.style.display = 'none';
            }
        }

        // Send message
        function sendMessage() {
            const input = document.getElementById('messageInput');
            const messageText = input.value.trim();
            
            if (messageText && socket && isConnected) {
                const message = {
                    type: 'message',
                    message: messageText,
                    sender: currentUser,
                    timestamp: new Date().toISOString()
                };
                
                // Send to server
                socket.send(JSON.stringify(message));
                
                // Display in chat
                displayMessage({
                    text: messageText,
                    sender: currentUser,
                    timestamp: new Date(),
                    type: 'sent'
                });
                
                input.value = '';
                sendTypingIndicator(false);
            }
        }

        // Receive message from server
        function receiveMessage(data) {
            const message = {
                text: data.message,
                sender: data.sender,
                timestamp: new Date(data.timestamp),
                type: 'received'
            };
            
            displayMessage(message);
            
            // Show notification if page is not visible
            if (document.hidden) {
                showNotification(data.message, data.sender);
            }
        }

        // Display message in chat
        function displayMessage(message) {
            const container = document.getElementById('messagesContainer');
            const messageElement = document.createElement('div');
            messageElement.className = `message ${message.type}`;
            
            const statusIcon = message.type === 'sent' ? '✓' : '';
            
            messageElement.innerHTML = `
                <div class="message-bubble">
                    ${message.text}
                    <div class="message-time">
                        ${formatTime(message.timestamp)}
                        <div class="message-status">${statusIcon}</div>
                    </div>
                </div>
            `;
            
            container.appendChild(messageElement);
            scrollToBottom();
        }

        // Scroll to bottom of messages
        function scrollToBottom() {
            const container = document.getElementById('messagesContainer');
            container.scrollTop = container.scrollHeight;
        }

        // Update user status
        function updateUserStatus(username, status, lastSeen) {
            if (username === friendUser) {
                const lastSeenElement = document.getElementById('lastSeen');
                
                if (status === 'online') {
                    lastSeenElement.innerHTML = '<span class="online-status">● Online</span>';
                } else {
                    const lastSeenDate = new Date(lastSeen);
                    const timeDiff = new Date() - lastSeenDate;
                    const minutes = Math.floor(timeDiff / 60000);
                    
                    if (minutes < 1) {
                        lastSeenElement.innerHTML = '<span class="offline-status">● Last seen just now</span>';
                    } else if (minutes < 60) {
                        lastSeenElement.innerHTML = `<span class="offline-status">● Last seen ${minutes} minute${minutes > 1 ? 's' : ''} ago</span>`;
                    } else {
                        const hours = Math.floor(minutes / 60);
                        lastSeenElement.innerHTML = `<span class="offline-status">● Last seen ${hours} hour${hours > 1 ? 's' : ''} ago</span>`;
                    }
                }
            }
        }

        // Clear all messages
        function clearMessages() {
            if (confirm('Are you sure you want to clear all messages? This action cannot be undone.')) {
                messages = [];
                const container = document.getElementById('messagesContainer');
                container.innerHTML = '<div class="typing-indicator" id="typingIndicator"><span id="typingUser">' + friendUser + '</span> is typing...</div>';
            }
        }

        // Format time for messages
        function formatTime(date) {
            return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }

        // Show notification
        function showNotification(message, sender) {
            if ('Notification' in window && Notification.permission === 'granted') {
                const notification = new Notification(`New message from ${sender}`, {
                    body: message,
                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💬</text></svg>',
                    requireInteraction: true
                });
                
                notification.onclick = function() {
                    window.focus();
                    notification.close();
                };
            }
            
            // Show custom notification
            const notificationElement = document.getElementById('notification');
            document.getElementById('notificationText').textContent = `${sender}: ${message}`;
            notificationElement.style.display = 'block';
            
            setTimeout(() => {
                hideNotification();
            }, 6000); }

