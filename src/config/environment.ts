// Frontend Configuration for Socket.IO Connection
const config = {
  development: {
    socketUrl: 'http://localhost:3001',
    apiUrl: 'http://localhost:3001'
  },
  production: {
    socketUrl: import.meta.env.VITE_SOCKET_URL || 'https://server-production-f979.up.railway.app',
    apiUrl: import.meta.env.VITE_API_URL || 'https://server-production-f979.up.railway.app'
  }
} as const;

const environment = import.meta.env.MODE || 'development';
const currentConfig = config[environment as keyof typeof config];

export const SOCKET_URL = currentConfig.socketUrl;
export const API_URL = currentConfig.apiUrl;
export const ENVIRONMENT = environment;

console.log(`🔌 Socket.IO connecting to: ${SOCKET_URL}`);
console.log(`🌐 API connecting to: ${API_URL}`);
console.log(`🏗️ Environment: ${ENVIRONMENT}`);
