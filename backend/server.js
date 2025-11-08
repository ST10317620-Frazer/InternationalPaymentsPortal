require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const customerRoutes = require('./routes/customer');
const employeeRoutes = require('./routes/employee');
const { pool } = require('./src/db');  // Correct path

const app = express();
const PORT = 5000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  frameguard: { action: 'deny' },
}));
app.use(cors({
  origin: ['https://localhost:3000', 'https://localhost:3001', 'https://localhost:3002'],
  credentials: true
}));app.use(express.json());

// Routes
app.use('/api/customer', customerRoutes);
app.use('/api/employee', employeeRoutes);

// Test
app.get('/api/test', (req, res) => res.json({ message: 'API Live!' }));

app.listen(PORT, () => {
  console.log(`API: https://localhost:${PORT}`);
});