const fs = require('fs');
const path = require('path');

const LOG_PATH = path.join(__dirname, '../../../debug-4180ab.log');
const SESSION_ID = '4180ab';

function debugLog(location, message, data = {}, hypothesisId = '') {
    const entry = {
        sessionId: SESSION_ID,
        location,
        message,
        data,
        hypothesisId,
        timestamp: Date.now(),
    };

    const line = JSON.stringify(entry);
    console.log('[DEBUG-4180ab]', line);

    try {
        fs.appendFileSync(LOG_PATH, `${line}\n`);
    } catch {
        // Ignore when running on Render or read-only filesystem
    }
}

module.exports = { debugLog };
