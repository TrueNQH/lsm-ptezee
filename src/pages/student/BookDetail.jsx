import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBackButton } from '../../hooks/useBackButton'
import BackButton from '../../components/BackButton'
import BookReader from '../../components/BookReader'
import { 
  ArrowLeft, 
  BookOpen, 
  Eye, 
  ShoppingCart, 
  Heart, 
  Bookmark, 
  Star, 
  Download, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Clock,
  User,
  Calendar,
  Globe,
  Award,
  CheckCircle,
  Play,
  Pause
} from 'lucide-react'
import { books } from '../../mock/books'
import toast from 'react-hot-toast'

const BookDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { goBack } = useBackButton('/student/materials')
  const [book, setBook] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isReading, setIsReading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages] = useState(250) // Mock total pages
  const [zoomLevel, setZoomLevel] = useState(100)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [userReview, setUserReview] = useState('')
  const [readingProgress, setReadingProgress] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [isOwned, setIsOwned] = useState(false)
  const [showSample, setShowSample] = useState(false)
  const [showReader, setShowReader] = useState(false)

  useEffect(() => {
    const foundBook = books.find(b => b.id === id)
    if (foundBook) {
      setBook(foundBook)
      setIsOwned(foundBook.isOwned)
      setReadingProgress(foundBook.progress)
      setIsBookmarked(foundBook.bookmarks?.length > 0)
    }
  }, [id])

  useEffect(() => {
    let interval
    if (isReading) {
      interval = setInterval(() => {
        setReadingTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isReading])

  const handlePurchase = () => {
    setIsOwned(true)
    toast.success(`Successfully purchased "${book.title}"!`)
  }

  const handleStartReading = () => {
    if (isOwned) {
      setShowReader(true)
      toast.success('Opening book reader...')
    } else {
      toast.error('Please purchase the book first')
    }
  }

  const handleSamplePreview = () => {
    setShowSample(true)
    setActiveTab('reader')
    setCurrentPage(1)
    toast.success('Opening sample preview...')
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast.success(isBookmarked ? 'Bookmark removed' : 'Bookmark added')
  }

  const handleRatingSubmit = () => {
    if (userRating > 0) {
      toast.success(`Thank you for rating "${book.title}" ${userRating} stars!`)
    }
  }

  const handleReviewSubmit = () => {
    if (userReview.trim()) {
      toast.success('Review submitted successfully!')
      setUserReview('')
    }
  }

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
      // Update progress
      const progress = Math.round((currentPage / totalPages) * 100)
      setReadingProgress(progress)
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleZoom = (direction) => {
    if (direction === 'in' && zoomLevel < 200) {
      setZoomLevel(prev => prev + 25)
    } else if (direction === 'out' && zoomLevel > 50) {
      setZoomLevel(prev => prev - 25)
    }
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  const renderStars = (rating, interactive = false, onRate = null) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 cursor-pointer transition-colors ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300 hover:text-yellow-400'
        }`}
        onClick={() => interactive && onRate && onRate(i + 1)}
      />
    ))
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading book...</p>
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
              {book.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              By {book.author}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1 mb-8 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
          {[
            { key: 'overview', label: 'Overview', icon: BookOpen },
            { key: 'reader', label: 'Reader', icon: Eye },
            { key: 'reviews', label: 'Reviews', icon: MessageCircle }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-48 flex-shrink-0">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {book.title}
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                        By {book.author}
                      </p>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          {renderStars(book.rating)}
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                            {book.rating} ({book.reviewCount} reviews)
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          Published: {book.publishedDate}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <BookOpen className="w-4 h-4" />
                          {book.pages} pages
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Globe className="w-4 h-4" />
                          {book.language}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Award className="w-4 h-4" />
                          {book.level}
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        {book.description}
                      </p>

                      {book.features && (
                        <div className="mb-6">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Key Features
                          </h3>
                          <ul className="space-y-2">
                            {book.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {book.tags && (
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Tags
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {book.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Table of Contents */}
                {book.tableOfContents && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Table of Contents
                    </h3>
                    <div className="space-y-2">
                      {book.tableOfContents.map((chapter, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                          <span className="text-gray-600 dark:text-gray-400">
                            {chapter.title}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-500">
                            Page {chapter.page}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Purchase/Read Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {book.price === 0 ? 'Free' : `$${book.price}`}
                    </div>
                    {book.originalPrice && book.price < book.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        ${book.originalPrice}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {!isOwned ? (
                      <>
                        <button
                          onClick={handleSamplePreview}
                          className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Preview Sample (10%)
                        </button>
                        <button
                          onClick={handlePurchase}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {book.price === 0 ? 'Get Free Book' : 'Purchase Book'}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleStartReading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <BookOpen className="w-4 h-4" />
                        {readingProgress > 0 ? 'Continue Reading' : 'Start Reading'}
                      </button>
                    )}
                  </div>

                  {readingProgress > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-gray-900 dark:text-white">{readingProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${readingProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-4 text-sm mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      onClick={handleBookmark}
                      className={`flex items-center gap-1 transition-colors ${
                        isBookmarked 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-600 dark:text-gray-400 hover:text-blue-500'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-500">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Reading Stats */}
                {isOwned && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Reading Stats
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Pages Read</span>
                        <span className="text-gray-900 dark:text-white">
                          {Math.round((readingProgress / 100) * book.pages)} / {book.pages}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Reading Time</span>
                        <span className="text-gray-900 dark:text-white">
                          {formatTime(readingTime)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Estimated Time Left</span>
                        <span className="text-gray-900 dark:text-white">
                          {book.readingTime ? `${Math.round(book.readingTime * (1 - readingProgress / 100))}h` : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rate This Book */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Rate This Book
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(userRating, true, setUserRating)}
                  </div>
                  <button
                    onClick={handleRatingSubmit}
                    disabled={userRating === 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Submit Rating
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reader Tab */}
          {activeTab === 'reader' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
              {/* Reader Controls */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Page {currentPage} of {showSample ? Math.round(totalPages * 0.1) : totalPages}
                  </span>
                  {showSample && (
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                      Sample Preview
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleZoom('out')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[60px] text-center">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={() => handleZoom('in')}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Reader Content */}
              <div className="relative">
                <div 
                  className="p-8 min-h-[600px] bg-white dark:bg-gray-800 transition-all duration-300"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                >
                  {/* Mock PDF Content */}
                  <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      {book.title}
                    </h1>
                    <h2 className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                      Chapter {currentPage}: Sample Content
                    </h2>
                    
                    <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                      <p>
                        This is a sample page from "{book.title}" by {book.author}. 
                        The actual content would be displayed here when reading the full book.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                        veniam, quis nostrud exercitation ullamco laboris.
                      </p>
                      <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                      
                      {showSample && currentPage > Math.round(totalPages * 0.1) && (
                        <div className="text-center py-8">
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                            <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              Sample Preview Ended
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              Purchase the full book to continue reading.
                            </p>
                            <button
                              onClick={handlePurchase}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                              Purchase Now
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
                  <button
                    onClick={() => handlePageChange('prev')}
                    disabled={currentPage === 1}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[100px] text-center">
                    {currentPage} / {showSample ? Math.round(totalPages * 0.1) : totalPages}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange('next')}
                    disabled={currentPage >= (showSample ? Math.round(totalPages * 0.1) : totalPages)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Write Review */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Write a Review
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {renderStars(userRating, true, setUserRating)}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Review
                    </label>
                    <textarea
                      value={userReview}
                      onChange={(e) => setUserReview(e.target.value)}
                      placeholder="Share your thoughts about this book..."
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={4}
                    />
                  </div>
                  <button
                    onClick={handleReviewSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </div>

              {/* Existing Reviews */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Customer Reviews ({book.reviewCount})
                </h3>
                
                <div className="space-y-6">
                  {book.reviews?.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <img
                          src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=40&h=40&fit=crop&crop=face`}
                          alt={review.user}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {review.user}
                            </span>
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {review.comment}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-green-600">
                              <ThumbsUp className="w-4 h-4" />
                              Helpful ({review.helpful || 0})
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-red-600">
                              <ThumbsDown className="w-4 h-4" />
                              Not Helpful
                            </button>
                          </div>
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
      
      {/* Book Reader Modal */}
      {showReader && book && (
        <BookReader 
          book={book} 
          onClose={() => setShowReader(false)} 
        />
      )}
    </div>
  )
}

export default BookDetail