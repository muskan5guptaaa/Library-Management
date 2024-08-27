const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bookRoutes = require('./routes/authorRoutes');
const authorRoutes = require('./routes/bookRoutes');

mongoose.connect('mongodb://localhost/library', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

// Use the routes
app.use('/api', bookRoutes);
app.use('/api', authorRoutes);

app.listen(4000, () => console.log('Server started on port 4000'));
