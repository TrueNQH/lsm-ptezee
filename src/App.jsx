import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Home from './pages/Home'
import PlacementTest from './pages/PlacementTest'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserManagement from './pages/admin/UserManagement'
import StudentClass from './pages/admin/StudentClass'
import CourseManagement from './pages/admin/CourseManagement'
import Reports from './pages/admin/Reports'
import Login from './pages/Login'
import StudentLogin from './pages/student/StudentLogin'
import StudentLayout from './components/StudentLayout'
import Overview from './pages/student/Overview'
import Center from './pages/student/Center'
import Materials from './pages/student/Materials'
import CourseDetail from './pages/student/CourseDetail'
import BookDetail from './pages/student/BookDetail'
import VideoPlayer from './pages/student/VideoPlayer'
import Services from './pages/student/Services'
import Support from './pages/student/Support'
// Practices page was moved into Materials → Practice Tests tab

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Routes>
              {/* Public routes with header */}
              <Route path="/" element={
                <>
              
                  <Home />
                </>
              } />
              <Route path="/placement-test" element={
                <>
                    <Header/>
                  <PlacementTest />
                </>
              } />
              
              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/student/login" element={<StudentLogin />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="students" element={<StudentClass />} />
                <Route path="courses" element={<CourseManagement />} />
                <Route path="reports" element={<Reports />} />
              </Route>
              
              {/* Student routes */}
              <Route path="/student" element={<StudentLayout />}>
                <Route path="overview" element={<Overview />} />
                <Route path="center" element={<Center />} />
                <Route path="materials" element={<Materials />} />
                <Route path="services" element={<Services />} />
                <Route path="support" element={<Support />} />
              </Route>
              
              {/* Course and Book Detail routes */}
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/student/materials/books/:id" element={<BookDetail />} />
              <Route path="/video/:videoId" element={<VideoPlayer />} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </ThemeProvider>
      </LanguageProvider>
    )
  }

export default App
