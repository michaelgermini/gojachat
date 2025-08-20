const cors = require('cors');

// Middleware CORS pour permettre les requêtes cross-origin
const corsMiddleware = cors({
  origin: ['http://localhost:3000', 'http://localhost:19006', 'exp://localhost:19000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});

// Middleware pour logger les requêtes
const loggerMiddleware = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};

// Middleware pour simuler la latence réseau
const delayMiddleware = (req, res, next) => {
  setTimeout(next, Math.random() * 200 + 50); // 50-250ms delay
};

// Middleware pour gérer les erreurs
const errorMiddleware = (err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
};

module.exports = (req, res, next) => {
  // Appliquer CORS
  corsMiddleware(req, res, (err) => {
    if (err) return next(err);
    
    // Logger
    loggerMiddleware(req, res, (err) => {
      if (err) return next(err);
      
      // Delay simulation
      delayMiddleware(req, res, next);
    });
  });
};
