import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBackButton } from '../../hooks/useBackButton'
import { BookOpen, Video, FileText, Award, Eye, CheckCircle, Star, Clock, User, TrendingUp } from 'lucide-react'
import { books } from '../../mock/books'
import { shortCourses } from '../../mock/courses'
import { practices as practiceRows, scoresTrendData } from '../../mock/center'
import { practiceTests, studyTips } from '../../mock/practice'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

// Mock data for video lessons
export const videoLessons = [
  {
    id: 1,
    courseId: 1,
    title: "Introduction to English Grammar",
    description: "Learn the core parts of speech and basic sentence structure.",
    skill: "grammar",
    level: "beginner",
    cefrLevel: "A1",
    tags: ["parts of speech", "sentence basics"],
    duration: "15:30",
    durationSec: 930,
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=60",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    completed: false,
    progress: 0.12,
    chapters: [
      { title: "Welcome & goals", start: 0 },
      { title: "Parts of speech", start: 75 },
      { title: "Simple sentences", start: 420 },
      { title: "Wrap-up", start: 870 }
    ],
    notes: [],
    subtitles: [
      { start: 0, end: 5, text: "Welcome to English Grammar basics." },
      { start: 5, end: 10, text: "Today we'll learn about sentence structure." }
    ]
  },
  {
    id: 2,
    courseId: 1,
    title: "Present Simple vs. Present Continuous",
    description: "Usage, signal words, and common mistakes.",
    skill: "grammar",
    level: "beginner",
    cefrLevel: "A2",
    tags: ["present tenses", "usage"],
    duration: "12:45",
    durationSec: 765,
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=60",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    completed: true,
    progress: 1,
    chapters: [
      { title: "Form & meaning", start: 0 },
      { title: "Signal words", start: 210 },
      { title: "Common mistakes", start: 520 }
    ],
    notes: [],
    subtitles: []
  },
  {
    id: 3,
    courseId: 2,
    title: "Advanced Vocabulary Building",
    description: "Expand your English vocabulary effectively with chunks & collocations.",
    skill: "vocabulary",
    level: "intermediate",
    cefrLevel: "B1",
    tags: ["collocations", "word families"],
    duration: "18:20",
    durationSec: 1100,
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=60",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    completed: false,
    progress: 0.2,
    chapters: [
      { title: "Why collocations", start: 0 },
      { title: "Practice with chunks", start: 420 },
      { title: "Review & homework", start: 980 }
    ],
    notes: [],
    subtitles: []
  }
]

const Materials = () => {
  const navigate = useNavigate()
  const { navigateWithState } = useBackButton()
  const [activeTab, setActiveTab] = useState('videos')
  const [selectedPractice, setSelectedPractice] = useState(null)

  // Compute practices data at top-level to respect Rules of Hooks
  const rows = useMemo(() => {
    return [...practiceRows].sort((a,b) => new Date(b.date) - new Date(a.date))
  }, [])

  const weakestSkill = useMemo(() => {
    if (!rows.length) return 'reading'
    const latest = rows[0].skills
    const entries = Object.entries(latest)
    entries.sort((a,b) => a[1] - b[1])
    return entries[0][0]
  }, [rows])

  const recommended = useMemo(() => {
    const skill = weakestSkill
    const tests = practiceTests.filter(t => t.skill === skill && (t.status === 'available' || t.completed === false))
    const tips = studyTips.filter(s => s.skill === skill)
    return { tests, tips }
  }, [weakestSkill])

  // Courses data
  const freeCourses = useMemo(() => shortCourses.filter(c => c.price === 0), [])
  const paidCourses = useMemo(() => shortCourses.filter(c => c.price > 0), [])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={course.image || 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=60'}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
        {course.price === 0 ? (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">Free</span>
        ) : (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">Paid</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{course.title}</h3>
        <p className="text-xs text-gray-600 mb-2">By {course.instructor}</p>
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{course.description}</p>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">{renderStars(course.rating)}</div>
          <span className="text-sm text-gray-600">{course.rating} ({course.reviewCount || 0})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            {course.duration}
          </div>
          <div className="text-sm font-semibold text-blue-600">
            {course.price === 0 ? 'Free' : `$${course.price}`}
          </div>
        </div>

        {course.features && (
          <div className="flex flex-wrap gap-2 mb-3">
            {course.features.slice(0, 3).map((f, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">{f}</span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/courses/${course.id}`)}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
          >Xem khóa học</button>
          {course.curriculum && (
            <span className="text-xs text-gray-500">{course.curriculum.length} modules</span>
          )}
        </div>
      </div>
    </div>
  )

  const renderVideoTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Video Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoLessons.map(video => (
            <div key={video.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => navigateWithState(`/video/${video.id}`, { videoTitle: video.title })}
                    className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Xem bài giảng
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
                {video.completed && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    video.level === 'beginner' ? 'bg-green-100 text-green-800' :
                    video.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {video.level}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {video.skill}
                  </span>
                </div>

                {video.progress > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-900 font-medium">{Math.round(video.progress * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        // style={{ width: `${video.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Render Books Tab
  const renderBooksTab = () => (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map(book => (
          <div 
            key={book.id} 
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
            onClick={() => navigateWithState(`/student/materials/books/${book.id}`, { from: '/student/materials' })}
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white opacity-80" />
              </div>
              <div className="absolute top-3 right-3">
                {book.userReadingData?.readingProgress > 0 && (
                  <div className="bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-medium text-gray-800">
                    {Math.round(book.userReadingData.readingProgress * 100)}%
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                <User className="w-3 h-3" />
                {book.author}
              </p>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{book.rating}</span>
                  <span className="text-xs text-gray-500">({book.reviews?.length || 0})</span>
                </div>
                <span className="text-xs text-gray-400">•</span>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {book.readingTime}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  book.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  book.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {book.difficulty}
                </span>
                <span className="text-sm font-semibold text-blue-600">
                  {book.price === 0 ? 'Free' : `$${book.price}`}
                </span>
              </div>

              {book.userReadingData?.readingProgress > 0 && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      // style={{ width: `${book.userReadingData.readingProgress * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Render Practice Tests Tab
  const renderPracticeTab = () => {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Practice Tests</h2>
            <p className="text-sm text-gray-600">Xem lịch sử làm bài, điểm theo kỹ năng, xu hướng điểm.</p>
          </div>
          <div className="flex items-center gap-2 text-blue-600">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Weakest: {weakestSkill}</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Practices Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">Tất cả lượt Practice</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Overall</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Listening</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Reading</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Writing</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Speaking</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rows.map(p => (
                    <tr key={p.id} className={selectedPractice?.id === p.id ? 'bg-blue-50' : ''}>
                      <td className="px-4 py-2 text-sm text-gray-700">{p.date}</td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900">{p.overallScore}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{p.skills.listening}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{p.skills.reading}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{p.skills.writing}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{p.skills.speaking}</td>
                      <td className="px-4 py-2 text-right">
                        <button
                          onClick={() => setSelectedPractice(p)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >View details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-2">Score Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoresTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="overall" stroke="#2563eb" name="Overall" strokeWidth={2} />
                  <Line type="monotone" dataKey="listening" stroke="#0ea5e9" name="Listening" />
                  <Line type="monotone" dataKey="reading" stroke="#10b981" name="Reading" />
                  <Line type="monotone" dataKey="writing" stroke="#f59e0b" name="Writing" />
                  <Line type="monotone" dataKey="speaking" stroke="#ef4444" name="Speaking" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Details & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-2">Chi tiết & Feedback</h3>
            {!selectedPractice && (
              <p className="text-sm text-gray-600">Chọn một lượt practice để xem chi tiết.</p>
            )}
            {selectedPractice && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Date</span>
                  <span className="text-sm font-medium text-gray-900">{selectedPractice.date}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-gray-50 rounded">Listening: {selectedPractice.skills.listening}</div>
                  <div className="p-2 bg-gray-50 rounded">Reading: {selectedPractice.skills.reading}</div>
                  <div className="p-2 bg-gray-50 rounded">Writing: {selectedPractice.skills.writing}</div>
                  <div className="p-2 bg-gray-50 rounded">Speaking: {selectedPractice.skills.speaking}</div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Gợi ý cải thiện cho kỹ năng yếu nhất ({weakestSkill}):</p>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {recommended.tips.slice(0,3).map(t => (
                      <li key={t.id}>{t.tips[0]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-2">Recommended Practices</h3>
            {recommended.tests.length === 0 ? (
              <p className="text-sm text-gray-600">Không có bài gợi ý — bạn đang làm rất tốt!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommended.tests.map(test => (
                  <div key={test.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{test.title}</h4>
                        <p className="text-xs text-gray-500">{test.skill} • {test.difficulty}</p>
                      </div>
                      <span className="text-xs text-gray-500">{test.duration} min</span>
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={() => navigate('/placement-test')}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                      >Practice now</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Materials</h1>
          <p className="text-gray-600">Explore courses, books, videos, and practice tests to enhance your English skills</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1 mb-8 bg-white p-1 rounded-lg border border-gray-200">
          {[
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'books', label: 'Books', icon: BookOpen },
            { id: 'videos', label: 'Videos', icon: Video },
            { id: 'practice', label: 'Practice Tests', icon: FileText },
           
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'videos' && renderVideoTab()}
          {activeTab === 'courses' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Short Courses (Free)</h2>
                {freeCourses.length === 0 ? (
                  <p className="text-sm text-gray-600">Chưa có khóa học miễn phí.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {freeCourses.map(c => <CourseCard key={c.id} course={c} />)}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Short Courses (Paid)</h2>
                {paidCourses.length === 0 ? (
                  <p className="text-sm text-gray-600">Chưa có khóa học trả phí.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paidCourses.map(c => <CourseCard key={c.id} course={c} />)}
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === 'books' && renderBooksTab()}
          {activeTab === 'practice' && renderPracticeTab()}
          
        </div>
      </div>
    </div>
  )
}

export default Materials