const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { CORS_ORIGIN } = require('./config');

const app = express();

const PORT = 8080;
const ID = uuidv4();

app.use(express.json());

// ✅ CORS (allow frontend from ALB)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all (simplest)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

// ✅ ROOT API (important)
app.get('/api', (req, res) => {
    res.json({
        message: 'API root working',
        instance: ID
    });
});

// ✅ TEST ROUTE (useful for debugging)
app.get('/api/test', (req, res) => {
    res.json({
        message: 'API test working',
        instance: ID
    });
});

// ✅ CATCH ALL (prevents JSON.parse errors)
app.get('/api/*', (req, res) => {
    res.json({
        message: 'API wildcard route',
        path: req.originalUrl,
        instance: ID
    });
});

// ✅ START SERVER
app.listen(PORT, () => {
    console.log(`Backend started on port ${PORT}`);
});