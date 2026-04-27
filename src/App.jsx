import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Explore from './pages/Explore'
import TeacherProfile from './pages/TeacherProfile'
import Sessions from './pages/Sessions'
import Database from './pages/Database'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/dashboard" replace /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/explore', element: <Explore /> },
  { path: '/profile/:id', element: <TeacherProfile /> },
  { path: '/sessions', element: <Sessions /> },
  { path: '/database', element: <Database /> },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
