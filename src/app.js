const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
const educationRoutes = require('./routes/educationRoutes');
app.use('/api/education', educationRoutes);
const skillRoutes = require('./routes/skillRoutes');
app.use('/api/skills', skillRoutes);
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);
const experienceRoutes = require('./routes/experienceRoutes');
app.use('/api/experience', experienceRoutes);




// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
