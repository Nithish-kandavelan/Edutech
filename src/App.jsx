import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import Signup from './pages/auth/Signup.jsx'
import UserLayout from './layouts/UserLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'
import ClientLayout from './layouts/ClientLayout.jsx'
import Landing from './pages/user/Landing.jsx'
import UserDashboard from './pages/user/Dashboard.jsx'
import Course from './pages/user/Course.jsx'
import Planner from './pages/user/Planner.jsx'
import Materials from './pages/user/Materials.jsx'
import Quiz from './pages/user/Quiz.jsx'
import Progress from './pages/user/Progress.jsx'
import Profile from './pages/user/Profile.jsx'
import AdminDashboard from './pages/admin/Dashboard.jsx'
import Users from './pages/admin/Users.jsx'
import Courses from './pages/admin/Courses.jsx'
import Analytics from './pages/admin/Analytics.jsx'
import Settings from './pages/admin/Settings.jsx'
import ClientDashboard from './pages/client/Dashboard.jsx'
import Oversight from './pages/client/Oversight.jsx'
import Reports from './pages/client/Reports.jsx'
import ClientProfile from './pages/client/Profile.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute allowed={['user']} />}>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Landing />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="course/:courseId" element={<Course />} />
          <Route path="planner" element={<Planner />} />
          <Route path="materials" element={<Materials />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="progress" element={<Progress />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowed={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="courses" element={<Courses />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowed={['client']} />}>
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
          <Route path="oversight" element={<Oversight />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<ClientProfile />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
