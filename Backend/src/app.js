const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');

const app = express();
const { debugLog } = require('./utils/debugLog');

const allowedOrigins = [
    'http://localhost:5173',
    'https://digital-music-platform.vercel.app'
];

app.use(cors({
    origin(origin, callback) {
        // #region agent log
        debugLog('app.js:cors', 'CORS origin check', {
            origin: origin || null,
            allowed: !origin || allowedOrigins.includes(origin),
        }, 'H3');
        // #endregion
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    credentials: true
}));

app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);

module.exports = app;