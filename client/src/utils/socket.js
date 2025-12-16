// src/utils/socket.js
import { io } from 'socket.io-client';

// The URL should point to your backend server running Node/Express
const SOCKET_URL = 'http://localhost:5000';

// Initialize the socket connection
const socket = io(SOCKET_URL, {
  // Optional: Add JWT token to the connection headers for authentication
  auth: {
    token: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).token
      : '',
  },
  // Auto-reconnect configuration
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

socket.on('connect', () => {
  console.log('Socket.io connected successfully:', socket.id);
  // Emit user role upon connection to join specific rooms (e.g., 'admin-room', 'solver-id-123')
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  if (user) {
    socket.emit('join-role-room', user.role, user.id);
  }
});

socket.on('disconnect', (reason) => {
  console.log('Socket.io disconnected:', reason);
});

socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error.message);
});

export default socket;
