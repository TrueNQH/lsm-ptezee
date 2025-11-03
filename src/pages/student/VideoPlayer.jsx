import React, { useState, useRef, useEffect } from 'react'
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
  Award
} from 'lucide-react'
import { videoLessons } from './Materials'
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

  // Find the video by ID
  const video = videoLessons.find(v => v.id === parseInt(videoId))

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
  const [notes, setNotes] = useState(video?.notes || [])
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

  // Progress states
  const [isCompleted, setIsCompleted] = useState(video?.completed || false)
  const [watchProgress, setWatchProgress] = useState(video?.progress || 0)

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

  if (!video) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Video không tìm thấy</h2>
          <button 
            onClick={() => navigate('/materials')}
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
    handleSeek(timestamp)
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

  const saveWord = (wordData) => {
    if (!savedWords.find(w => w.word === wordData.word)) {
      setSavedWords([...savedWords, { ...wordData, savedAt: new Date().toISOString() }])
      toast.success(`Từ "${wordData.word}" đã được lưu!`)
    } else {
      toast.info('Từ này đã có trong danh sách!')
    }
  }

  const removeWord = (wordToRemove) => {
    setSavedWords(savedWords.filter(w => w.word !== wordToRemove))
    toast.success('Từ đã được xóa khỏi danh sách!')
  }

  const markAsCompleted = () => {
    setIsCompleted(true)
    toast.success('Bài học đã được đánh dấu hoàn thành!')
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
          <div className="space-y-6">
            {/* Notes Panel */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Ghi chú</span>
                </h3>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {notes.length}
                </span>
              </div>
              
              {/* Note Editor */}
              {showNoteEditor && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Thời gian: {formatTime(noteTimestamp)}
                    </span>
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
              
              {/* Notes List */}
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
                        <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                          note.type === 'highlight' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {note.type === 'highlight' ? 'Quan trọng' : 'Đánh dấu'}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer