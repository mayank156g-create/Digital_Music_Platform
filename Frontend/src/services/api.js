import axios from 'axios'

const TOKEN_KEY = 'sw_token'

function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

// Base axios instance — all requests go through here
const api = axios.create({
  baseURL: 'https://digital-music-platform.onrender.com/api',
  withCredentials: true, // still send cookie when the browser allows it (desktop)
  headers: { 'Content-Type': 'application/json' },
})

// #region agent log
api.interceptors.request.use((config) => {
  const token = getStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  fetch('http://127.0.0.1:7408/ingest/f2ef2744-3593-408f-935a-da8a5ba1cf50', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '4180ab' },
    body: JSON.stringify({
      sessionId: '4180ab',
      location: 'api.js:request',
      message: 'outgoing API request',
      data: {
        url: config.url,
        method: config.method,
        withCredentials: config.withCredentials,
        hasAuthHeader: Boolean(config.headers?.Authorization),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 120) : null,
      },
      hypothesisId: 'H1',
      timestamp: Date.now(),
    }),
  }).catch(() => {})
  return config
})
// #endregion

// ─── Response interceptor ─────────────────────────────────────────────────────
// Unwrap .data so callers get { message, user / music / album } directly
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message =
      err.response?.data?.message || err.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

// ─── Auth API ─────────────────────────────────────────────────────────────────
export const authAPI = {
  /**
   * POST /api/auth/register
   * Body: { username, email, password, role? }
   * Returns: { message, user: { id, username, email, role } }
   */
  register: (data) => api.post('/auth/register', data),

  /**
   * POST /api/auth/login
   * Body: { username?, email?, password }
   * Returns: { message, user: { id, username, email, role } }
   */
  login: (data) => api.post('/auth/login', data),

  /**
   * POST /api/auth/logout
   * Returns: { message }
   */
  logout: () => api.post('/auth/logout'),
}

// ─── Music API ────────────────────────────────────────────────────────────────
export const musicAPI = {
  /**
   * GET /api/music/
   * Auth: role === "user"
   * Returns: { message, musics: [{ _id, uri, title, artist: { username, email } }] }
   */
  getAllMusics: () => api.get('/music'),

  /**
   * POST /api/music/upload
   * Auth: role === "artist"  |  multipart/form-data: { music (file), title }
   * Returns: { message, music: { id, uri, title, artist } }
   */
  uploadMusic: (formData) =>
    api.post('/music/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  /**
   * GET /api/music/albums
   * Auth: role === "user"
   * Returns: { message, albums: [{ _id, title, artist: { username, email } }] }
   */
  getAllAlbums: () => api.get('/music/albums'),

  /**
   * GET /api/music/albums/:albumId
   * Auth: role === "user"
   * Returns: { message, album: { _id, title, artist, musics: [...] } }
   */
  getAlbumById: (albumId) => api.get(`/music/albums/${albumId}`),

  /**
   * POST /api/music/album
   * Auth: role === "artist"
   * Body: { title, musics: [musicId, ...] }
   * Returns: { message, album: { id, title, artist, musics } }
   */
  createAlbum: (data) => api.post('/music/album', data),
}

export default api
export { TOKEN_KEY, getStoredToken }
