// Socket.IO Server Configuration
const config = {
  development: {
    socketUrl: 'http://localhost:3001',
    corsOrigins: [
      "http://localhost:3039",
      "http://localhost:3000",
      "http://localhost:5173"
    ]
  },
  production: {
    socketUrl: process.env.SOCKET_URL || 'https://your-railway-app.up.railway.app',
    corsOrigins: [
      "https://your-app-name.vercel.app", // Replace with your actual Vercel URL
      /\.vercel\.app$/ // Allow all Vercel preview deployments
    ]
  }
};

const environment = process.env.NODE_ENV || 'development';
const currentConfig = config[environment];

module.exports = {
  ...currentConfig,
  environment
};
