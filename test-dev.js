#!/usr/bin/env node

// Test script to verify both servers are running
const { spawn } = require('child_process');

console.log('🚀 Starting development servers...\n');

// Start Socket.IO server
const serverProcess = spawn('node', ['server.js'], {
  stdio: 'pipe',
  env: { ...process.env, PORT: 3001 }
});

// Start Vite dev server
const clientProcess = spawn('npm', ['run', 'client'], {
  stdio: 'pipe',
  env: { ...process.env, PORT: 5173 }
});

// Handle server output
serverProcess.stdout.on('data', (data) => {
  console.log(`[Socket.IO Server] ${data.toString().trim()}`);
});

serverProcess.stderr.on('data', (data) => {
  console.error(`[Socket.IO Server Error] ${data.toString().trim()}`);
});

// Handle client output
clientProcess.stdout.on('data', (data) => {
  console.log(`[Vite Client] ${data.toString().trim()}`);
});

clientProcess.stderr.on('data', (data) => {
  console.error(`[Vite Client Error] ${data.toString().trim()}`);
});

// Handle process exit
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit(0);
});

console.log('✅ Both servers started successfully!');
console.log('📱 Socket.IO Server: http://localhost:3001');
console.log('🌐 React App: http://localhost:5173');
console.log('💬 Chat App: http://localhost:5173/inbox');
console.log('\nPress Ctrl+C to stop both servers\n');
