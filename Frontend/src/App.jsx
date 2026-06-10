import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { PlayerProvider } from './context/PlayerContext'
import { ProtectedRoute, ArtistRoute, UserRoute } from './components/common/ProtectedRoute'

// Pages
import LandingPage      from './pages/LandingPage'
import LoginPage        from './pages/LoginPage'
import RegisterPage     from './pages/RegisterPage'
import DashboardPage    from './pages/DashboardPage'
import LibraryPage      from './pages/LibraryPage'
import AlbumsPage       from './pages/AlbumsPage'
import AlbumDetailPage  from './pages/AlbumDetailPage'
import StudioPage       from './pages/StudioPage'
import UploadPage       from './pages/UploadPage'
import CreateAlbumPage  from './pages/CreateAlbumPage'
import ProfilePage      from './pages/ProfilePage'
import NotFoundPage     from './pages/NotFoundPage'

// Smart redirect: logged-in users skip landing
function HomeRedirect() {
  const { isLoggedIn, isArtist } = useAuth()
  if (isLoggedIn) return <Navigate to={isArtist ? '/studio' : '/dashboard'} replace />
  return <LandingPage />
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"         element={<HomeRedirect />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* User (role=user) routes */}
      <Route path="/dashboard" element={<UserRoute><DashboardPage /></UserRoute>} />
      <Route path="/library"   element={<UserRoute><LibraryPage /></UserRoute>} />
      <Route path="/albums"    element={<UserRoute><AlbumsPage /></UserRoute>} />
      <Route path="/albums/:albumId" element={<UserRoute><AlbumDetailPage /></UserRoute>} />

      {/* Artist (role=artist) routes */}
      <Route path="/studio"         element={<ArtistRoute><StudioPage /></ArtistRoute>} />
      <Route path="/studio/upload"  element={<ArtistRoute><UploadPage /></ArtistRoute>} />
      <Route path="/studio/albums"  element={<ArtistRoute><CreateAlbumPage /></ArtistRoute>} />

      {/* Shared authenticated routes */}
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <AppRoutes />
      </PlayerProvider>
    </AuthProvider>
  )
}
