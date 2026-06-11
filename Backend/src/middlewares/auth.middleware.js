const jwt = require("jsonwebtoken");
const { debugLog } = require("../utils/debugLog");

function extractToken(req) {
    const cookieToken = req.cookies?.token;
    const authHeader = req.headers.authorization || "";
    const bearerToken = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : null;
    return cookieToken || bearerToken || null;
}


async function authArtist(req, res, next) {

    const token = extractToken(req);
    // #region agent log
    debugLog('auth.middleware.js:authArtist', 'authArtist entry', {
        hasCookieToken: Boolean(req.cookies?.token),
        hasBearerToken: Boolean(req.headers.authorization?.startsWith('Bearer ')),
        cookieKeys: Object.keys(req.cookies || {}),
        origin: req.headers.origin || null,
        userAgent: req.headers['user-agent']?.slice(0, 120) || null,
        path: req.originalUrl,
    }, 'H1');
    // #endregion

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "You don't have access" })
        }

        req.user = decoded;

        next()

    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" })
    }

}

async function authUser(req, res, next) {

    const token = extractToken(req);
    // #region agent log
    debugLog('auth.middleware.js:authUser', 'authUser entry', {
        hasCookieToken: Boolean(req.cookies?.token),
        hasBearerToken: Boolean(req.headers.authorization?.startsWith('Bearer ')),
        cookieKeys: Object.keys(req.cookies || {}),
        origin: req.headers.origin || null,
        userAgent: req.headers['user-agent']?.slice(0, 120) || null,
        path: req.originalUrl,
    }, 'H1');
    // #endregion

    if (!token) {
        // #region agent log
        debugLog('auth.middleware.js:authUser', 'no token — returning 401', {
            path: req.originalUrl,
            origin: req.headers.origin || null,
        }, 'H1');
        // #endregion
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (
            decoded.role !== "user" &&
            decoded.role !== "artist"
        ) {
            return res.status(403).json({
                message: "You don't have access"
            });
        }

        req.user = decoded;

        // #region agent log
        debugLog('auth.middleware.js:authUser', 'auth success', {
            authSource: req.cookies?.token ? 'cookie' : 'bearer',
            role: decoded.role,
            path: req.originalUrl,
        }, 'H1');
        // #endregion

        next();

    } catch (err) {
        console.log(err);

        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}


module.exports = { authArtist, authUser }