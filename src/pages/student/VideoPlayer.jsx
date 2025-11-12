import React, { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams, useNavigate } from 'react-router-dom'
import { useBackButton } from '../../hooks/useBackButton'
import BackButton from '../../components/BackButton'
import { 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Settings,
  Subtitles,
  Save,
  Edit3,
  Trash2,
  Plus,
  BookmarkPlus,
  Highlighter,
  Type,
  Languages,
  Copy,
  Share2,
  RotateCcw,
  FastForward,
  Rewind,
  ArrowLeft,
  CheckCircle,
  Clock,
  FileText,
  Brain,
  Target,
  Award,
  MessageSquare
} from 'lucide-react'
import { get, API_BASE } from '../../services/api'
import toast from 'react-hot-toast'

// Mock vocabulary dictionary
const vocabularyDictionary = {
  "grammar": {
    definition: "The set of structural rules governing the composition of clauses, phrases, and words",
    pronunciation: "/ˈɡræmər/",
    examples: ["English grammar can be challenging.", "Grammar rules help us communicate clearly."],
    synonyms: ["syntax", "structure"],
    antonyms: [],
    level: "beginner",
    partOfSpeech: "noun",
    etymology: "From Old French gramaire"
  },
  "present": {
    definition: "Existing or occurring now",
    pronunciation: "/ˈprezənt/",
    examples: ["I am present in class.", "The present situation is complex."],
    synonyms: ["current", "existing", "contemporary"],
    antonyms: ["absent", "past", "future"],
    level: "beginner",
    partOfSpeech: "adjective",
    etymology: "From Latin praesens"
  },
  "vocabulary": {
    definition: "The body of words used in a particular language",
    pronunciation: "/vəˈkæbjʊˌlɛri/",
    examples: ["Building vocabulary takes time.", "Her vocabulary is impressive."],
    synonyms: ["lexicon", "wordstock"],
    antonyms: [],
    level: "intermediate",
    partOfSpeech: "noun",
    etymology: "From Latin vocabularium"
  },
  "advanced": {
    definition: "Far on or ahead in development or progress",
    pronunciation: "/ədˈvænst/",
    examples: ["This is an advanced course.", "She has advanced skills."],
    synonyms: ["sophisticated", "complex", "developed"],
    antonyms: ["basic", "elementary", "simple"],
    level: "intermediate",
    partOfSpeech: "adjective",
    etymology: "From Old French avancier"
  }
}

const VideoPlayer = () => {
  const { videoId } = useParams()
  const navigate = useNavigate()
  const { goBack } = useBackButton('/student/materials')
  const videoRef = useRef(null)

  // Always fetch from server; fallback to mock only if server fails
  const [video, setVideo] = useState(null)

  useEffect(() => {
    get(`/api/materials/videos/${videoId}`)
      .then(res => {
        const v = res.video || {}
        const mapped = {
          id: v.id,
          courseId: v.courseId ?? null,
          title: v.title ?? '',
          description: v.description ?? '',
          skill: v.skill ?? '',
          level: v.level ?? '',
          cefrLevel: v.cefrLevel ?? '',
          tags: Array.isArray(v.tags) ? v.tags : [],
          duration: v.duration ?? '',
          durationSec: v.durationSec ?? null,
          thumbnail: v.thumbnail ?? '',
          videoUrl: v.videoUrl ? `${API_BASE}${v.videoUrl}` : '',
          completed: !!v.completed,
          progress: typeof v.progress === 'number' ? v.progress : 0,
          chapters: Array.isArray(v.chapters) ? v.chapters : [],
          notes: Array.isArray(v.notes) ? v.notes : [],
          subtitles: Array.isArray(v.subtitles) ? v.subtitles : [],
          createdBy: v.createdBy ?? null,
          createdAt: v.createdAt ?? null,
        }
        setVideo(mapped)
      })
      .catch(() => {
        // If API fails, keep video as null and show 'Video không tìm thấy'
        setVideo(null)
      })
  }, [videoId])

  // Video player states
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSubtitles, setShowSubtitles] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  // Note-taking states
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState('')
  const [noteTimestamp, setNoteTimestamp] = useState(0)
  const [showNoteEditor, setShowNoteEditor] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [noteType, setNoteType] = useState('text')

  // Vocabulary states
  const [vocabularySearch, setVocabularySearch] = useState('')
  const [vocabularyResults, setVocabularyResults] = useState([])
  const [savedWords, setSavedWords] = useState([])
  const [showVocabularyPanel, setShowVocabularyPanel] = useState(false)
  const [selectedWord, setSelectedWord] = useState(null)

  // Practice test states
  const [practiceQuestions, setPracticeQuestions] = useState([])
  const [practiceStarted, setPracticeStarted] = useState(false)
  const [practiceIndex, setPracticeIndex] = useState(0)
  const [practiceScore, setPracticeScore] = useState(0)
  const [practiceSelected, setPracticeSelected] = useState(null)
  const [practiceFinished, setPracticeFinished] = useState(false)

  // Progress states
  const [isCompleted, setIsCompleted] = useState(video?.completed || false)
  const [watchProgress, setWatchProgress] = useState(video?.progress || 0)

  // Right sidebar tabs + Chat states
  const [rightTab, setRightTab] = useState('chat')
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const chatListRef = useRef(null)

  // Normalize incoming notes: accept array of strings or objects
  const normalizeNotes = (raw) => {
    if (!Array.isArray(raw)) return []
    return raw.map((n, idx) => {
      if (typeof n === 'string') {
        return {
          id: Date.now() + idx,
          text: n,
          timestamp: null,
          type: 'text',
          createdAt: new Date().toISOString(),
        }
      }
      return {
        id: n.id ?? (Date.now() + idx),
        text: n.text ?? '',
        timestamp: typeof n.timestamp === 'number' ? n.timestamp : null,
        type: n.type ?? 'text',
        createdAt: n.createdAt ?? new Date().toISOString(),
      }
    })
  }

  // Sync derived states when video loads
  useEffect(() => {
    if (video) {
      setNotes(normalizeNotes(video.notes))
      setIsCompleted(!!video.completed)
      setWatchProgress(typeof video.progress === 'number' ? video.progress : 0)
    }
  }, [video])

  // Auto-save vocabulary search
  useEffect(() => {
    if (vocabularySearch.trim()) {
      const timeoutId = setTimeout(() => {
        searchVocabulary(vocabularySearch)
      }, 300)
      return () => clearTimeout(timeoutId)
    } else {
      setVocabularyResults([])
    }
  }, [vocabularySearch])

  // Load saved words from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('dla_saved_words')
      const list = raw ? JSON.parse(raw) : []
      if (Array.isArray(list)) setSavedWords(list)
    } catch {}
  }, [])

  // Update progress as video plays
  useEffect(() => {
    if (duration > 0) {
      const progress = currentTime / duration
      setWatchProgress(progress)
      
      // Auto-complete if watched 90%
      if (progress >= 0.9 && !isCompleted) {
        setIsCompleted(true)
        toast.success('Bài học đã hoàn thành!')
      }
    }
  }, [currentTime, duration, isCompleted])

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight
    }
  }, [chatMessages, chatLoading])

  if (!video) {

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Video không tìm thấy</h2>
          <button 
            onClick={() => navigate('/student/materials')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại Materials
          </button>
        </div>
      </div>
    )
  }

  // Video player functions
  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (newVolume) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  const handlePlaybackRateChange = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate
      setPlaybackRate(rate)
    }
  }

  const handleSkipForward = () => {
    const newTime = Math.min(currentTime + 10, duration)
    handleSeek(newTime)
  }

  const handleSkipBackward = () => {
    const newTime = Math.max(currentTime - 10, 0)
    handleSeek(newTime)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Note-taking functions
  const addNote = () => {
    if (currentNote.trim()) {
      const newNote = {
        id: Date.now(),
        text: currentNote,
        timestamp: noteTimestamp,
        type: noteType,
        createdAt: new Date().toISOString()
      }
      setNotes([...notes, newNote])
      setCurrentNote('')
      setShowNoteEditor(false)
      toast.success('Ghi chú đã được thêm!')
    }
  }

  const editNote = (note) => {
    setEditingNote(note)
    setCurrentNote(note.text)
    setNoteTimestamp(note.timestamp)
    setNoteType(note.type)
    setShowNoteEditor(true)
  }

  const updateNote = () => {
    if (editingNote && currentNote.trim()) {
      const updatedNotes = notes.map(note =>
        note.id === editingNote.id
          ? { ...note, text: currentNote, timestamp: noteTimestamp, type: noteType }
          : note
      )
      setNotes(updatedNotes)
      setEditingNote(null)
      setCurrentNote('')
      setShowNoteEditor(false)
      toast.success('Ghi chú đã được cập nhật!')
    }
  }

  const deleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId))
    toast.success('Ghi chú đã được xóa!')
  }

  const addTimestampedNote = () => {
    setNoteTimestamp(currentTime)
    setShowNoteEditor(true)
  }

  const jumpToTimestamp = (timestamp) => {
    if (typeof timestamp === 'number' && !Number.isNaN(timestamp)) {
      handleSeek(timestamp)
    }
  }

  // Vocabulary functions
  const searchVocabulary = (word) => {
    const results = Object.keys(vocabularyDictionary)
      .filter(key => key.toLowerCase().includes(word.toLowerCase()))
      .map(key => ({
        word: key,
        ...vocabularyDictionary[key]
      }))
    setVocabularyResults(results)
  }

  // Helper: shuffle array copy
  const shuffle = (arr) => {
    const copy = [...arr]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }

  // Generate a simple MCQ for a word
  const generatePracticeForWord = (wordData) => {
    const key = wordData.word?.toLowerCase()
    const entry = vocabularyDictionary[key]
    if (entry && entry.definition) {
      const correct = entry.definition
      const distractorsPool = Object.keys(vocabularyDictionary)
        .filter(k => k !== key)
        .map(k => vocabularyDictionary[k].definition)
      const distractors = shuffle(distractorsPool).slice(0, 3)
      const options = shuffle([correct, ...distractors])
      const correctIndex = options.indexOf(correct)
      const q = {
        id: Date.now() + Math.random(),
        type: 'definition_mcq',
        word: wordData.word,
        prompt: `Chọn nghĩa đúng của "${wordData.word}"`,
        options,
        correctIndex,
      }
      setPracticeQuestions(prev => [...prev, q])
    } else {
      // Fallback freeform question if no dictionary entry
      const q = {
        id: Date.now() + Math.random(),
        type: 'freeform',
        word: wordData.word,
        prompt: `Viết một câu có chứa từ "${wordData.word}"`,
        options: [],
        correctIndex: -1,
      }
      setPracticeQuestions(prev => [...prev, q])
    }
  }

  const saveWord = (wordData) => {
    if (!savedWords.find(w => w.word === wordData.word)) {
      const updated = [...savedWords, { ...wordData, savedAt: new Date().toISOString() }]
      setSavedWords(updated)
      try {
        localStorage.setItem('dla_saved_words', JSON.stringify(updated))
      } catch {}
      toast.success(`Từ "${wordData.word}" đã được lưu!`)
      generatePracticeForWord(wordData)
    } else {
      toast.info('Từ này đã có trong danh sách!')
    }
  }

  const removeWord = (wordToRemove) => {
    const updated = savedWords.filter(w => w.word !== wordToRemove)
    setSavedWords(updated)
    try {
      localStorage.setItem('dla_saved_words', JSON.stringify(updated))
    } catch {}
    toast.success('Từ đã được xóa khỏi danh sách!')
  }

  const handleVocabularyKeyDown = (e) => {
    if (e.key === 'Enter') {
      const raw = vocabularySearch.trim()
      if (!raw) return
      const key = raw.toLowerCase()
      const entry = vocabularyDictionary[key]
      const wordData = entry
        ? { word: key, ...entry }
        : { word: raw }
      saveWord(wordData)
      setVocabularySearch('')
    }
  }

  const startPractice = () => {
    // Điều hướng sang trang luyện tập từ vựng và gửi danh sách từ đã lưu
    if (!savedWords || savedWords.length === 0) {
      toast.error('Chưa có từ vựng. Hãy lưu từ vựng để luyện tập.')
      return
    }
    try {
      // Đồng bộ vào localStorage để trang luyện tập có thể đọc trực tiếp nếu cần
      localStorage.setItem('dla_saved_words', JSON.stringify(savedWords))
    } catch {}
    navigate('/student/vocab-practice', { state: { words: savedWords } })
  }

  const submitPracticeAnswer = () => {
    const q = practiceQuestions[practiceIndex]
    if (!q) return
    if (q.type === 'definition_mcq') {
      if (practiceSelected === null) {
        toast.error('Hãy chọn một đáp án')
        return
      }
      if (practiceSelected === q.correctIndex) {
        setPracticeScore(s => s + 1)
        toast.success('Chính xác!')
      } else {
        toast.error('Chưa đúng, thử câu tiếp theo!')
      }
    } else {
      // freeform: accept and move on
      toast.success('Đã ghi nhận câu trả lời!')
    }
    const next = practiceIndex + 1
    if (next >= practiceQuestions.length) {
      setPracticeFinished(true)
      setPracticeStarted(false)
    } else {
      setPracticeIndex(next)
      setPracticeSelected(null)
    }
  }

  const markAsCompleted = () => {
    setIsCompleted(true)
    toast.success('Bài học đã được đánh dấu hoàn thành!')
  }
  

  const sendChatMessage = async () => {
    const text = chatInput.trim()
    if (!text) return
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY
    if (!apiKey) {
      toast.error('Chưa cấu hình VITE_OPENAI_API_KEY')
      return
    }
    const userMsg = { role: 'user', content: text }
    setChatMessages(prev => [...prev, userMsg])
    setChatInput('')
    setChatLoading(true)
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini',
          temperature: 0.7,
          messages: [
            { role: 'system', content: 'Bạn là trợ lý học tập thân thiện, trả lời ngắn gọn, rõ ràng.' },
            { role: 'system', content: `Ngữ cảnh video: title="${video?.title || ''}", description="${video?.description || ''}", thời điểm=${formatTime(currentTime)}.` },
            ...chatMessages,
            userMsg,
          ],
        }),
      })
      if (!res.ok) {
        const errText = await res.text()
        throw new Error(errText)
      }
      const data = await res.json()
      const reply = data?.choices?.[0]?.message?.content || 'Không có phản hồi.'
      setChatMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (e) {
      setChatMessages(prev => [
        ...prev,
        { role: 'assistant', content: `Xin lỗi, có lỗi khi gọi AI: ${e.message}` },
      ])
    } finally {
      setChatLoading(false)
    }
  }
   
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BackButton 
                fallbackPath="/student/materials" 
                text="Quay lại" 
              />
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{video.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{video.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Target className="w-4 h-4" />
                    <span>{video.level}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>{video.cefrLevel}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600">
                Tiến độ: {Math.round(watchProgress * 100)}%
              </div>
              <button
                onClick={markAsCompleted}
                disabled={isCompleted}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isCompleted 
                    ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>{isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player - Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Video Container */}
              <div className="relative bg-black aspect-video">
                <video
                  ref={videoRef}
                  src={video.videoUrl}
                  className="w-full h-full"
                  onTimeUpdate={handleVideoTimeUpdate}
                  onLoadedMetadata={handleVideoLoadedMetadata}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                
                {/* Video Controls Overlay */}
                {showControls && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <input
                          type="range"
                          min="0"
                          max={duration || 0}
                          value={currentTime}
                          onChange={(e) => handleSeek(parseFloat(e.target.value))}
                          className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-white mt-1">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>
                      
                      {/* Control Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={handleSkipBackward}
                            className="text-white hover:text-blue-300 transition-colors"
                          >
                            <SkipBack className="w-6 h-6" />
                          </button>
                          <button
                            onClick={handleVideoPlay}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                          >
                            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                          </button>
                          <button
                            onClick={handleSkipForward}
                            className="text-white hover:text-blue-300 transition-colors"
                          >
                            <SkipForward className="w-6 h-6" />
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleVolumeChange(volume === 0 ? 1 : 0)}
                              className="text-white hover:text-blue-300 transition-colors"
                            >
                              {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </button>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={volume}
                              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                              className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                          
                          <select
                            value={playbackRate}
                            onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
                            className="bg-black/50 text-white text-sm rounded px-2 py-1 border border-white/30"
                          >
                            <option value={0.5}>0.5x</option>
                            <option value={0.75}>0.75x</option>
                            <option value={1}>1x</option>
                            <option value={1.25}>1.25x</option>
                            <option value={1.5}>1.5x</option>
                            <option value={2}>2x</option>
                          </select>
                          
                          <button
                            onClick={() => setShowSubtitles(!showSubtitles)}
                            className={`transition-colors ${showSubtitles ? 'text-blue-300' : 'text-white hover:text-blue-300'}`}
                          >
                            <Subtitles className="w-5 h-5" />
                          </button>
                          
                          <button
                            onClick={toggleFullscreen}
                            className="text-white hover:text-blue-300 transition-colors"
                          >
                            <Maximize className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Subtitles */}
                {showSubtitles && video.subtitles && (
                  <div className="absolute bottom-20 left-0 right-0 text-center">
                    {video.subtitles
                      .filter(sub => currentTime >= sub.start && currentTime <= sub.end)
                      .map((sub, index) => (
                        <div
                          key={index}
                          className="bg-black/70 text-white px-4 py-2 rounded-lg inline-block"
                        >
                          {sub.text}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{video.title}</h2>
                  <button
                    onClick={addTimestampedNote}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm ghi chú</span>
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4">{video.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {video.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Chapters */}
                {video.chapters && video.chapters.length > 0 && (
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-800 mb-3">Chương</h3>
                    <div className="space-y-2">
                      {video.chapters.map((chapter, index) => (
                        <button
                          key={index}
                          onClick={() => handleSeek(chapter.start)}
                          className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                        >
                          <span className="font-medium">{chapter.title}</span>
                          <span className="text-sm text-gray-500">{formatTime(chapter.start)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 w-full max-w-[360px] mx-auto">
            {/* Chat + Notes Tabs */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="flex">
                <button
                  onClick={() => setRightTab('chat')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-b ${rightTab === 'chat' ? 'text-blue-700 border-blue-600 bg-blue-50' : 'text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat với AI</span>
                </button>
                <button
                  onClick={() => setRightTab('note')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-b ${rightTab === 'note' ? 'text-blue-700 border-blue-600 bg-blue-50' : 'text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Ghi chú</span>
                </button>
              </div>

              {/* Chat Tab */}
              {rightTab === 'chat' && (
                <div className="p-6">
                  <div ref={chatListRef} className="space-y-3 max-h-96 overflow-y-auto">
                    {chatMessages.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        <p>Bạn có thể hỏi về nội dung video, thuật ngữ, ví dụ, v.v.</p>
                      </div>
                    ) : (
                      chatMessages.map((m, idx) => (
                        <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'} px-3 py-2 rounded-2xl max-w-[75%] whitespace-pre-wrap`}>
                            {m.role === 'assistant' ? (
                              <ReactMarkdown>{m.content}</ReactMarkdown>
                            ) : (
                              m.content
                            )}
                          </div>
                        </div>
                      ))
                    )}
                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-600 px-3 py-2 rounded-2xl text-sm">Đang nghĩ…</div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Nhập câu hỏi của bạn…"
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={sendChatMessage}
                        disabled={chatLoading}
                        className={`px-4 py-2 rounded-lg ${chatLoading ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                      >
                        Gửi
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes Tab */}
              {rightTab === 'note' && (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Ghi chú</span>
                    </h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {notes.length}
                    </span>
                  </div>

                  {showNoteEditor && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Thời gian: {formatTime(noteTimestamp)}</span>
                        <select
                          value={noteType}
                          onChange={(e) => setNoteType(e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="text">Ghi chú</option>
                          <option value="highlight">Điểm quan trọng</option>
                          <option value="bookmark">Đánh dấu</option>
                        </select>
                      </div>
                      <textarea
                        value={currentNote}
                        onChange={(e) => setCurrentNote(e.target.value)}
                        placeholder="Nhập ghi chú của bạn..."
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                        rows="3"
                      />
                      <div className="flex space-x-2 mt-3">
                        <button
                          onClick={editingNote ? updateNote : addNote}
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          {editingNote ? 'Cập nhật' : 'Lưu'}
                        </button>
                        <button
                          onClick={() => {
                            setShowNoteEditor(false)
                            setEditingNote(null)
                            setCurrentNote('')
                          }}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {notes.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">Chưa có ghi chú nào</p>
                    ) : (
                      notes.map((note) => (
                        <div key={note.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <button
                              onClick={() => jumpToTimestamp(note.timestamp)}
                              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                              {formatTime(note.timestamp)}
                            </button>
                            <div className="flex space-x-1">
                              <button
                                onClick={() => editNote(note)}
                                className="text-gray-400 hover:text-blue-600 transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteNote(note.id)}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{note.text}</p>
                          {note.type !== 'text' && (
                            <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${note.type === 'highlight' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                              {note.type === 'highlight' ? 'Quan trọng' : 'Đánh dấu'}
                            </span>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Vocabulary Panel */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>Từ vựng</span>
                </h3>
                <button
                  onClick={() => setShowVocabularyPanel(!showVocabularyPanel)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Languages className="w-5 h-5" />
                </button>
              </div>
              
              {/* Vocabulary Search */}
              <div className="mb-4">
                <input
                  type="text"
                  value={vocabularySearch}
                  onChange={(e) => setVocabularySearch(e.target.value)}
                  onKeyDown={handleVocabularyKeyDown}
                  placeholder="Tìm kiếm từ vựng..."
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              
              {/* Search Results */}
              {vocabularyResults.length > 0 && (
                <div className="mb-4 max-h-48 overflow-y-auto">
                  <h4 className="font-medium text-gray-800 mb-2">Kết quả tìm kiếm:</h4>
                  {vocabularyResults.map((result, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-800">{result.word}</span>
                        <button
                          onClick={() => saveWord(result)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{result.pronunciation}</p>
                      <p className="text-sm text-gray-700">{result.definition}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Saved Words */}
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Từ đã lưu ({savedWords.length}):</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {savedWords.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Chưa có từ nào được lưu</p>
                  ) : (
                    savedWords.map((word, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-medium text-gray-800">{word.word}</span>
                        <button
                          onClick={() => removeWord(word.word)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Practice Tests */}
              <div className="mt-6 border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">Bài luyện tập</h4>
                  <span className="text-sm text-gray-600">Câu hỏi: {practiceQuestions.length}</span>
                </div>
                {!practiceStarted && !practiceFinished && (
                  <button
                    onClick={startPractice}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Bắt đầu luyện tập
                  </button>
                )}

                {practiceStarted && practiceQuestions[practiceIndex] && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-600 mb-1">Câu {practiceIndex + 1}/{practiceQuestions.length}</div>
                    <p className="font-medium text-gray-800 mb-2">{practiceQuestions[practiceIndex].prompt}</p>
                    {practiceQuestions[practiceIndex].type === 'definition_mcq' ? (
                      <div className="space-y-2">
                        {practiceQuestions[practiceIndex].options.map((opt, i) => (
                          <label key={i} className="flex items-center gap-2 p-2 bg-white border rounded cursor-pointer">
                            <input
                              type="radio"
                              name="practice"
                              checked={practiceSelected === i}
                              onChange={() => setPracticeSelected(i)}
                            />
                            <span className="text-sm text-gray-800">{opt}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <textarea className="w-full p-2 border rounded" rows="3" placeholder="Nhập câu của bạn..." />
                      </div>
                    )}
                    <div className="flex justify-end mt-3">
                      <button
                        onClick={submitPracticeAnswer}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Gửi đáp án
                      </button>
                    </div>
                  </div>
                )}

                {practiceFinished && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                    <p className="font-medium text-green-700">Hoàn thành!</p>
                    <p className="text-sm text-green-800">Điểm: {practiceScore}/{practiceQuestions.length}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer