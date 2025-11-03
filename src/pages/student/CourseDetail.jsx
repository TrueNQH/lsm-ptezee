import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBackButton } from '../../hooks/useBackButton'
import BackButton from '../../components/BackButton'
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  ChevronDown, 
  ChevronRight,
  Clock,
  Users,
  Star,
  BookOpen,
  MessageCircle,
  Send,
  CheckCircle,
  FileText,
  Award,
  Download,
  Share2,
  Heart,
  Bookmark,
  MoreVertical
} from 'lucide-react'
import { courses } from '../../mock/courses'
import { practiceTests } from '../../mock/practice'
import toast from 'react-hot-toast'

const CourseDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { goBack } = useBackButton('/student/materials')
  const [course, setCourse] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedLessons, setExpandedLessons] = useState({})
  const [currentLesson, setCurrentLesson] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [notes, setNotes] = useState({})
  const [newNote, setNewNote] = useState('')
  const [discussions, setDiscussions] = useState([])
  const [newDiscussion, setNewDiscussion] = useState('')
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizScore, setQuizScore] = useState(null)
  const [isEnrolled, setIsEnrolled] = useState(false)

  // Derived data for practice and assessments based on course topic
  const skill = React.useMemo(() => {
    if (!course) return null
    const title = course.title?.toLowerCase() || ''
    const tags = (course.tags || []).map(t => t.toLowerCase())
    if (tags.some(t => t.includes('speaking')) || title.includes('speaking')) return 'speaking'
    if (tags.some(t => t.includes('writing')) || title.includes('writing')) return 'writing'
    if (tags.some(t => t.includes('reading')) || title.includes('reading')) return 'reading'
    if (tags.some(t => t.includes('grammar')) || title.includes('grammar')) return 'grammar'
    return null
  }, [course])

  const selectedPractices = React.useMemo(() => {
    if (!skill) return []
    return practiceTests.filter(t => t.skill === skill).slice(0, 6)
  }, [skill])

  const progressTests = React.useMemo(() => {
    if (!skill) return []
    return practiceTests.filter(t => t.type === 'progress' && t.skill === skill)
  }, [skill])

  const finalTests = React.useMemo(() => {
    if (!skill) return []
    return practiceTests.filter(t => t.type === 'final' && t.skill === skill)
  }, [skill])

  useEffect(() => {
    const foundCourse = courses.find(c => String(c.id) === id)
    if (foundCourse) {
      setCourse(foundCourse)
      // Initialize with first lesson if available
      if (foundCourse.curriculum && foundCourse.curriculum.length > 0) {
        const firstModule = foundCourse.curriculum[0]
        const firstLesson = firstModule?.lessons && firstModule.lessons.length > 0
          ? firstModule.lessons[0]
          : null
        if (firstLesson) {
          setCurrentLesson(firstLesson)
        }
      }
      // Load mock discussions
      setDiscussions([
        {
          id: 1,
          user: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
          message: 'Great course! The explanations are very clear.',
          timestamp: '2 hours ago',
          replies: []
        },
        {
          id: 2,
          user: 'Mike Chen',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
          message: 'I have a question about lesson 3. Can someone help?',
          timestamp: '1 day ago',
          replies: [
            {
              id: 3,
              user: 'Emily Davis',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
              message: 'Sure! What specific part are you struggling with?',
              timestamp: '1 day ago'
            }
          ]
        }
      ])
    }
  }, [id])

  const toggleLessonExpansion = (lessonId) => {
    setExpandedLessons(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }))
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    toast.success(isPlaying ? 'Video paused' : 'Video playing')
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
    toast.success(isMuted ? 'Audio unmuted' : 'Audio muted')
  }

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson)
    setProgress(0)
    setIsPlaying(false)
    toast.success(`Now viewing: ${lesson.title}`)
  }

  const handleAddNote = (lessonId) => {
    if (newNote.trim()) {
      setNotes(prev => ({
        ...prev,
        [lessonId]: [...(prev[lessonId] || []), {
          id: Date.now(),
          content: newNote,
          timestamp: new Date().toLocaleString()
        }]
      }))
      setNewNote('')
      toast.success('Note added successfully!')
    }
  }

  const handleAddDiscussion = () => {
    if (newDiscussion.trim()) {
      const newPost = {
        id: Date.now(),
        user: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        message: newDiscussion,
        timestamp: 'Just now',
        replies: []
      }
      setDiscussions(prev => [newPost, ...prev])
      setNewDiscussion('')
      toast.success('Discussion posted!')
    }
  }

  const handleQuizSubmit = () => {
    if (!course.quiz) return
    
    let correct = 0
    course.quiz.questions.forEach(question => {
      if (quizAnswers[question.id] === question.correct) {
        correct++
      }
    })
    
    const score = Math.round((correct / course.quiz.questions.length) * 100)
    setQuizScore(score)
    toast.success(`Quiz completed! Score: ${score}%`)
  }

  const handleEnroll = () => {
    setIsEnrolled(true)
    toast.success('Successfully enrolled in course!')
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading course...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <BackButton 
            fallbackPath="/student/materials" 
            variant="button"
            showText={false}
            className="dark:text-gray-400"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {course.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              By {course.instructor}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            {currentLesson && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="relative bg-black aspect-video">
                  {currentLesson.type === 'video' ? (
                    <video
                      src={currentLesson.videoUrl || 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'}
                      controls
                      muted={isMuted}
                      className="w-full h-full"
                      poster={currentLesson.thumbnail || course.image}
                    >
                      {currentLesson.captionsUrl && (
                        <track
                          src={currentLesson.captionsUrl}
                          kind="captions"
                          label="English"
                          default
                        />
                      )}
                    </video>
                  ) : (
                    <>
                      <img
                        src={currentLesson.thumbnail || course.image}
                        alt={currentLesson.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <button
                          onClick={handlePlayPause}
                          className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-4 transition-all"
                        >
                          {isPlaying ? (
                            <Pause className="w-8 h-8 text-white" />
                          ) : (
                            <Play className="w-8 h-8 text-white ml-1" />
                          )}
                        </button>
                      </div>
                      {/* Visual Controls (non-video types) */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <div className="flex items-center gap-4">
                          <button onClick={handlePlayPause} className="text-white">
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                          </button>
                          <button onClick={handleMute} className="text-white">
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                          </button>
                          <div className="flex-1 bg-gray-600 rounded-full h-1">
                            <div 
                              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <button className="text-white">
                            <Maximize className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {currentLesson.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {currentLesson.description}
                  </p>
                </div>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {[
                  { key: 'overview', label: 'Overview', icon: BookOpen },
                  { key: 'notes', label: 'Notes', icon: FileText },
                  { key: 'discussion', label: 'Discussion', icon: MessageCircle },
                  { key: 'quiz', label: 'Quiz', icon: Award }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                      activeTab === key
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Course Description
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{course.duration}</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Students</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{course.students}</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{course.rating}</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Award className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">Level</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{course.level || 'Intermediate'}</p>
                      </div>
                    </div>

                    {course.features && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          What You'll Learn
                        </h3>
                        <ul className="space-y-2">
                          {course.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Learning Objectives */}
                    {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Learning Objectives
                        </h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                          {course.learningOutcomes.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Selected Practice List */}
                    {selectedPractices.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Selected Practice List
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedPractices.map(pr => (
                            <div key={pr.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-medium text-gray-900 dark:text-white">{pr.title}</p>
                                <span className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                                  {pr.skill}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {pr.description}
                              </p>
                              <button
                                onClick={() => toast.success('Starting practice...')}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                              >
                                Start
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reviews */}
                    {course.reviews && course.reviews.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Reviews
                        </h3>
                        <div className="space-y-4">
                          {course.reviews.map(rv => (
                            <div key={rv.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                <img src={rv.avatar} alt={rv.user} className="w-10 h-10 rounded-full" />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-900 dark:text-white">{rv.user}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{rv.date}</span>
                                  </div>
                                  <div className="flex items-center gap-1 mb-2">
                                    {Array.from({ length: 5 }, (_, i) => (
                                      <Star key={i} className={`w-4 h-4 ${i < rv.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                    ))}
                                  </div>
                                  <p className="text-gray-700 dark:text-gray-300">{rv.comment}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Notes Tab */}
                {activeTab === 'notes' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        My Notes
                      </h3>
                      
                      {currentLesson && (
                        <div className="mb-6">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                            Notes for: {currentLesson.title}
                          </h4>
                          
                          <div className="flex gap-2 mb-4">
                            <textarea
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              placeholder="Add a note for this lesson..."
                              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              rows={3}
                            />
                            <button
                              onClick={() => handleAddNote(currentLesson.id)}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                              Add Note
                            </button>
                          </div>

                          <div className="space-y-3">
                            {(notes[currentLesson.id] || []).map(note => (
                              <div key={note.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-900 dark:text-white mb-1">{note.content}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{note.timestamp}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Discussion Tab */}
                {activeTab === 'discussion' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Course Discussion
                      </h3>
                      
                      <div className="mb-6">
                        <div className="flex gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                            alt="Your avatar"
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <textarea
                              value={newDiscussion}
                              onChange={(e) => setNewDiscussion(e.target.value)}
                              placeholder="Share your thoughts or ask a question..."
                              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              rows={3}
                            />
                            <div className="flex justify-end mt-2">
                              <button
                                onClick={handleAddDiscussion}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                              >
                                <Send className="w-4 h-4" />
                                Post
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {discussions.map(discussion => (
                          <div key={discussion.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <img
                                src={discussion.avatar}
                                alt={discussion.user}
                                className="w-10 h-10 rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {discussion.user}
                                  </span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {discussion.timestamp}
                                  </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">
                                  {discussion.message}
                                </p>
                                
                                {discussion.replies.length > 0 && (
                                  <div className="ml-4 space-y-3 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                                    {discussion.replies.map(reply => (
                                      <div key={reply.id} className="flex items-start gap-3">
                                        <img
                                          src={reply.avatar}
                                          alt={reply.user}
                                          className="w-8 h-8 rounded-full"
                                        />
                                        <div>
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-gray-900 dark:text-white text-sm">
                                              {reply.user}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                              {reply.timestamp}
                                            </span>
                                          </div>
                                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                                            {reply.message}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Quiz Tab */}
                {activeTab === 'quiz' && (
                  <div className="space-y-6">
                    {/* Milestone Tasks */}
                    {course.curriculum && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Milestone Tasks (Mini Quizzes)
                        </h3>
                        <div className="space-y-4">
                          {course.curriculum.map((mod, idx) => {
                            const miniQuizzes = (mod.lessons || []).filter(ls => ls.type === 'quiz')
                            if (miniQuizzes.length === 0) return null
                            return (
                              <div key={mod.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="font-medium text-gray-900 dark:text-white">Unit {idx + 1}: {mod.title}</p>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{miniQuizzes.length} quizzes</span>
                                </div>
                                <div className="space-y-2">
                                  {miniQuizzes.map(q => (
                                    <div key={q.id} className="flex items-center justify-between">
                                      <span className="text-sm text-gray-700 dark:text-gray-300">{q.title || 'Mini Quiz'}</span>
                                      <button
                                        onClick={() => toast.success('Starting mini quiz...')}
                                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                                      >
                                        Start
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Progress Tests */}
                    {progressTests.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Progress Tests
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {progressTests.map(pt => (
                            <div key={pt.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <p className="font-medium text-gray-900 dark:text-white mb-1">{pt.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{pt.description}</p>
                              <button
                                onClick={() => toast.success('Starting progress test...')}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                              >
                                Start
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Final Test */}
                    {finalTests.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Final Test
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {finalTests.map(ft => (
                            <div key={ft.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <p className="font-medium text-gray-900 dark:text-white mb-1">{ft.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{ft.description}</p>
                              <button
                                onClick={() => toast.success('Starting final test...')}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                              >
                                Start
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Course Quiz */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Course Quiz
                      </h3>
                      {course.quiz ? (
                        <div className="space-y-6">
                          {course.quiz.questions.map((question, index) => (
                            <div key={question.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                                {index + 1}. {question.question}
                              </h4>
                              <div className="space-y-2">
                                {question.options.map((option, optionIndex) => (
                                  <label key={optionIndex} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name={`question-${question.id}`}
                                      value={optionIndex}
                                      onChange={(e) => setQuizAnswers(prev => ({
                                        ...prev,
                                        [question.id]: parseInt(e.target.value)
                                      }))}
                                      className="text-blue-600"
                                    />
                                    <span className="text-gray-600 dark:text-gray-400">{option}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                          <div className="flex items-center justify-between">
                            <button
                              onClick={handleQuizSubmit}
                              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                              Submit Quiz
                            </button>
                            {quizScore !== null && (
                              <div className="text-right">
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                  Score: {quizScore}%
                                </p>
                                <p className={`text-sm ${quizScore >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                                  {quizScore >= 70 ? 'Passed!' : 'Try again'}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 dark:text-gray-400">
                            No quiz available for this course yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </div>
                {course.originalPrice && course.price < course.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    ${course.originalPrice}
                  </div>
                )}
              </div>

              {!isEnrolled ? (
                <button
                  onClick={handleEnroll}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-4"
                >
                  Enroll Now
                </button>
              ) : (
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Enrolled</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-4 text-sm">
                <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-red-500">
                  <Heart className="w-4 h-4" />
                  Save
                </button>
                <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-500">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Curriculum */}
            {course.curriculum && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Course Curriculum
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {course.curriculum.reduce((sum, m) => sum + ((m.lessons || []).length), 0)} lessons
                  </p>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {course.curriculum.map((module, index) => (
                    <div key={module.id} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <button
                        onClick={() => toggleLessonExpansion(module.id)}
                        className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              {expandedLessons[module.id] ? (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white text-sm">
                                {index + 1}. {module.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {(module.lessons || []).length} lessons
                              </p>
                            </div>
                          </div>
                          <Play className="w-4 h-4 text-gray-400" />
                        </div>
                      </button>
                      
                      {expandedLessons[module.id] && (
                        <div className="px-4 pb-4 space-y-2">
                          {(module.lessons || []).map(ls => (
                            <div key={ls.id} className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{ls.title}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{ls.duration} • {ls.type}</p>
                              </div>
                              <button
                                onClick={() => handleLessonSelect(ls)}
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                Start Lesson
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail