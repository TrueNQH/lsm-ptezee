import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Clock, 
  Download, 
  Play, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Circle,
  Star,
  Award,
  Headphones,
  Percent,
  User,
  ArrowRight,
  BarChart3,
  Video,
  FileText,
  StickyNote
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { toast } from 'react-hot-toast'
import {
  activitySummary,
  bookLibrary,
  enrolledCourses,
  studyProgress,
  practices,
  scoresTrendData,
  weeklyTasks,
  privileges
} from '../../mock/center'

export default function Center() {
  const [activeTab, setActiveTab] = useState('general') // 'general' or 'ptezee'
  const [tasks, setTasks] = useState(weeklyTasks)

  const updateTaskNotes = (taskId, notes) => {
    setTasks(prevTasks => 
      prevTasks.map(day => ({
        ...day,
        tasks: day.tasks.map(task => 
          task.id === taskId ? { ...task, notes } : task
        )
      }))
    )
  }

  const toggleTaskStatus = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(day => ({
        ...day,
        tasks: day.tasks.map(task => 
          task.id === taskId 
            ? { ...task, status: task.status === 'completed' ? 'not_started' : 'completed' }
            : task
        )
      }))
    )
    toast.success('Task status updated!')
  }

  const getTaskIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />
      case 'quiz': return <BarChart3 className="w-4 h-4" />
      case 'reading': return <FileText className="w-4 h-4" />
      default: return <Circle className="w-4 h-4" />
    }
  }

  const getPrivilegeIcon = (iconName) => {
    switch (iconName) {
      case 'headphones': return <Headphones className="w-6 h-6" />
      case 'percent': return <Percent className="w-6 h-6" />
      case 'star': return <Star className="w-6 h-6" />
      case 'user': return <User className="w-6 h-6" />
      case 'trending-up': return <TrendingUp className="w-6 h-6" />
      case 'award': return <Award className="w-6 h-6" />
      default: return <Star className="w-6 h-6" />
    }
  }

  const showReminderToast = () => {
    toast('📚 Don\'t forget to complete your daily tasks!', {
      duration: 4000,
      icon: '⏰'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Student Center
          </h1>
          
          {/* Role Toggle */}
          <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'general'
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              General LMS User
            </button>
            <button
              onClick={() => setActiveTab('ptezee')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'ptezee'
                  ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              PTEZEE Student
            </button>
          </div>
        </div>

        {/* General LMS User Tab */}
        {activeTab === 'general' && (
          <div className="space-y-8">
            {/* Activity Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Activity Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mx-auto mb-3">
                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activitySummary.totalHours}h
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Hours</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mx-auto mb-3">
                    <User className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activitySummary.lastLogin}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Last Login</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mx-auto mb-3">
                    <Download className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activitySummary.downloads}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg mx-auto mb-3">
                    <Play className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activitySummary.videoViews}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Video Views</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Recent Activity:</div>
                <div className="text-gray-900 dark:text-white font-medium">
                  {activitySummary.recentActivity}
                </div>
              </div>
            </div>

            {/* Book Library Usage */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Book Library Usage
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Title</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Progress</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Bookmarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookLibrary.map((book) => (
                      <tr key={book.id} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
                            <span className="text-gray-900 dark:text-white">{book.title}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${book.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem]">
                              {book.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            book.status === 'read' 
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                          }`}>
                            {book.status === 'read' ? 'Read' : 'Unread'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                          {book.bookmarks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Enrolled Courses
              </h2>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">{course.name}</h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Expires in {course.expiresIn} days
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-4">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[3rem]">
                        {course.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Unlock Premium Features</h3>
                  <p className="text-blue-100 mb-4">
                    Get full tracking, personalized feedback, and live support
                  </p>
                </div>
                <Link 
                  to="/pricing"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center"
                >
                  Upgrade Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* PTEZEE Student Tab */}
        {activeTab === 'ptezee' && (
          <div className="space-y-8">
            {/* Study Progress Tracking */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Study Progress Tracking
              </h2>
              <div className="space-y-6">
                {studyProgress.map((course) => (
                  <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">{course.courseName}</h3>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-gray-600 dark:text-gray-400">Lessons</div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {course.lessons.completed}/{course.lessons.total}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600 dark:text-gray-400">Videos</div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {course.videos.completed}/{course.videos.total}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600 dark:text-gray-400">Practices</div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {course.practices.completed}/{course.practices.total}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practices & Score Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Practices Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Recent Practices
                </h2>
                <div className="space-y-3">
                  {practices.slice(0, 5).map((practice) => (
                    <div key={practice.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{practice.date}</span>
                        <span className="font-bold text-lg text-gray-900 dark:text-white">
                          {practice.overallScore}%
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-center">
                          <div className="text-gray-600 dark:text-gray-400">Listening</div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {practice.skills.listening}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-600 dark:text-gray-400">Reading</div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {practice.skills.reading}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-600 dark:text-gray-400">Writing</div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {practice.skills.writing}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-600 dark:text-gray-400">Speaking</div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {practice.skills.speaking}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Score Trend Graph */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Score Trend (7 Days)
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={scoresTrendData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis tick={{ fontSize: 12 }} domain={[60, 100]} />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value, name) => [`${value}%`, name.charAt(0).toUpperCase() + name.slice(1)]}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={3} name="Overall" />
                      <Line type="monotone" dataKey="listening" stroke="#10B981" strokeWidth={2} name="Listening" />
                      <Line type="monotone" dataKey="reading" stroke="#F59E0B" strokeWidth={2} name="Reading" />
                      <Line type="monotone" dataKey="writing" stroke="#EF4444" strokeWidth={2} name="Writing" />
                      <Line type="monotone" dataKey="speaking" stroke="#8B5CF6" strokeWidth={2} name="Speaking" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Learning Timeline */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Learning Timeline
                </h2>
                <button
                  onClick={showReminderToast}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Set Reminder
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                {tasks.map((day) => (
                  <div key={day.date} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="text-center mb-4">
                      <div className="font-medium text-gray-900 dark:text-white">{day.dayName}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <div className="space-y-3">
                      {day.tasks.map((task) => (
                        <div key={task.id} className="space-y-2">
                          <div 
                            className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                              task.status === 'completed' 
                                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                                : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
                            }`}
                            onClick={() => toggleTaskStatus(task.id)}
                          >
                            <div className="mr-2">
                              {task.status === 'completed' ? (
                                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                              ) : (
                                <Circle className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                {getTaskIcon(task.type)}
                                <span className={`ml-2 text-xs font-medium ${
                                  task.status === 'completed' 
                                    ? 'text-green-800 dark:text-green-200 line-through'
                                    : 'text-gray-900 dark:text-white'
                                }`}>
                                  {task.title}
                                </span>
                              </div>
                            </div>
                          </div>
                          <textarea
                            value={task.notes}
                            onChange={(e) => updateTaskNotes(task.id, e.target.value)}
                            placeholder="Add notes..."
                            className="w-full text-xs p-2 border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                            rows={2}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Privileges */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Your PTEZEE Privileges
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {privileges.map((privilege) => (
                  <div key={privilege.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                          {getPrivilegeIcon(privilege.icon)}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                          {privilege.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {privilege.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}