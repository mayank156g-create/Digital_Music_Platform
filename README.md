# SoundWave – Digital Music Platform

A full-stack music streaming and management platform where artists can upload songs, create albums, and listeners can browse and play music. The application includes secure authentication, role-based access control, cloud media storage, and responsive deployment.

## Live Demo

Frontend: https://digital-music-platform.vercel.app/

Backend API: https://digital-music-platform.onrender.com

---

## Features

### Authentication & Authorization

* User registration and login
* JWT-based authentication
* Secure session management
* Role-based access control
* Separate permissions for Artists and Listeners

### Listener Features

* Browse music library
* View available albums
* Open album details
* Stream uploaded songs
* Responsive music player interface

### Artist Features

* Upload music files
* Create albums
* Manage uploaded content
* Organize tracks into albums

### Music Management

* Audio file uploads
* Cloud-based media storage using ImageKit
* Album creation and organization
* Artist-specific content ownership

### Responsive UI

* Mobile-friendly interface
* Adaptive navigation
* Audio player controls
* Modern dashboard experience

---

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Context API
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer
* REST APIs

### Database

* MongoDB Atlas
* Mongoose

### Media Storage

* ImageKit

### Deployment

* Vercel
* Render

---

## User Roles

### Listener (User)

Can:

* Browse music
* View albums
* Play songs
* Explore artist content

Cannot:

* Upload music
* Create albums

---

### Artist

Can:

* Upload songs
* Create albums
* Manage music content

Cannot:

* Access listener-only music library endpoints

---

## System Architecture

Artist Uploads Song
↓
Frontend (React)
↓
Backend API (Express)
↓
Multer Memory Storage
↓
ImageKit Cloud Upload
↓
MongoDB Stores Metadata
↓
Listeners Stream Music

---

## Backend APIs

### Authentication

```http id="vxhprw"
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Music

```http id="6fwfzn"
GET  /api/music
GET  /api/music/albums
GET  /api/music/albums/:albumId

POST /api/music/upload
POST /api/music/album
```

---

## Authentication Flow

User Login
↓
Backend Verifies Credentials
↓
JWT Generated
↓
Cookie + Bearer Token Support
↓
Protected Routes Accessible

---

## Key Challenges Solved

### Cross-Origin Authentication Issue

The application was deployed with:

* Frontend on Vercel
* Backend on Render

Desktop browsers successfully handled authentication cookies, but some mobile browsers blocked third-party cookies.

#### Symptoms

* Login appeared successful
* Music library returned "Unauthorized"
* Mobile users could not access protected routes

#### Solution

Implemented hybrid authentication:

* JWT Cookies
* Authorization Bearer Tokens
* Axios token interceptor
* Backend support for cookie and bearer authentication

This ensured authentication worked consistently across desktop and mobile devices.

---

## Future Improvements

* Playlist support
* Like/Favorite songs
* Search and filtering
* Recently played history
* Audio waveform visualization
* Follow artists
* Music recommendations
* User profile customization
* Admin dashboard

---

## Skills Demonstrated

* Full-Stack Web Development
* REST API Development
* JWT Authentication
* Role-Based Access Control
* File Upload Handling
* Cloud Media Storage
* MongoDB Database Design
* React State Management
* Production Deployment
* Cross-Origin Authentication Debugging
* Mobile Compatibility Testing

---

## Author

Mayank Garg

LinkedIn: linkedin.com/in/mayank-garg-69b640374

GitHub: github.com/mayank156g-create
