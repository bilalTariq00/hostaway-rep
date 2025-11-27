// Frontend Configuration for Socket.IO Connection
const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';
const isProduction = import.meta.env.PROD || import.meta.env.MODE === 'production';

// If VITE_API_URL is explicitly set, use it regardless of environment
// This allows forcing production API even in development mode
const hasExplicitApiUrl = !!import.meta.env.VITE_API_URL;

// Determine environment - prioritize explicit env vars, then mode
const environment = hasExplicitApiUrl ? 'production' : (isProduction ? 'production' : 'development');

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

const currentConfig = config[environment as keyof typeof config];

export const SOCKET_URL = currentConfig.socketUrl;
export const API_URL = currentConfig.apiUrl;
export const ENVIRONMENT = environment;

console.log(`🔌 Socket.IO connecting to: ${SOCKET_URL}`);
console.log(`🌐 API connecting to: ${API_URL}`);
console.log(`🏗️ Environment: ${ENVIRONMENT}`);
console.log(`🔍 DEV: ${import.meta.env.DEV}, PROD: ${import.meta.env.PROD}, MODE: ${import.meta.env.MODE}`);
console.log(`🔍 VITE_API_URL: ${import.meta.env.VITE_API_URL || 'not set'}`);
console.log(`🔍 VITE_SOCKET_URL: ${import.meta.env.VITE_SOCKET_URL || 'not set'}`);
console.log(`🔍 Using explicit API URL: ${hasExplicitApiUrl}`);
