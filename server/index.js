// Libraries
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

// Variables
const app = express();
const port = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use('/api', routes);

app.listen(port, (error) => console.log(`App running on port ${port}.`));