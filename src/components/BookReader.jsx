import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Bookmark, 
  BookmarkCheck, 
  Highlighter, 
  StickyNote, 
  Search, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  Plus,
  Trash2,
  Edit3,
  Save,
  Type,
  Palette
} from 'lucide-react';
import BackButton from './BackButton';

const BookReader = ({ book, onClose }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chapters'); // chapters, notes, highlights, bookmarks
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState(null);
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [highlightMenuPosition, setHighlightMenuPosition] = useState({ x: 0, y: 0 });
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  
  // User data states
  const [userNotes, setUserNotes] = useState(book?.userReadingData?.notes || []);
  const [userHighlights, setUserHighlights] = useState(book?.userReadingData?.highlights || []);
  const [userBookmarks, setUserBookmarks] = useState(book?.userReadingData?.bookmarks || []);
  const [readingProgress, setReadingProgress] = useState(book?.userReadingData?.readingProgress || 0);

  const contentRef = useRef(null);
  const selectionRef = useRef(null);

  const highlightColors = [
    { name: 'Yellow', value: 'yellow', class: 'bg-yellow-200 dark:bg-yellow-300' },
    { name: 'Green', value: 'green', class: 'bg-green-200 dark:bg-green-300' },
    { name: 'Blue', value: 'blue', class: 'bg-blue-200 dark:bg-blue-300' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-200 dark:bg-pink-300' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-200 dark:bg-purple-300' }
  ];

  // Handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && selection.toString().trim()) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setSelectedText(selection.toString().trim());
      setSelectionRange(range);
      setHighlightMenuPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
      setShowHighlightMenu(true);
    } else {
      setShowHighlightMenu(false);
      setSelectedText('');
      setSelectionRange(null);
    }
  };

  // Add highlight
  const addHighlight = (color) => {
    if (!selectedText || !selectionRange) return;

    const newHighlight = {
      id: Date.now(),
      chapterId: book.chapters[currentChapter].id,
      text: selectedText,
      color: color,
      page: currentChapter + 1,
      timestamp: new Date().toISOString(),
      note: ''
    };

    setUserHighlights([...userHighlights, newHighlight]);
    setShowHighlightMenu(false);
    setSelectedText('');
    setSelectionRange(null);
    
    // Clear selection
    window.getSelection().removeAllRanges();
  };

  // Add note
  const addNote = () => {
    if (!noteContent.trim()) return;

    const newNote = {
      id: Date.now(),
      chapterId: book.chapters[currentChapter].id,
      page: currentChapter + 1,
      content: noteContent,
      timestamp: new Date().toISOString(),
      tags: []
    };

    setUserNotes([...userNotes, newNote]);
    setNoteContent('');
    setShowNoteDialog(false);
  };

  // Add bookmark
  const addBookmark = () => {
    const newBookmark = {
      id: Date.now(),
      page: currentChapter + 1,
      note: `Chapter ${currentChapter + 1}: ${book.chapters[currentChapter].title}`,
      chapter: book.chapters[currentChapter].title,
      timestamp: new Date().toISOString()
    };

    setUserBookmarks([...userBookmarks, newBookmark]);
  };

  // Remove bookmark
  const removeBookmark = (bookmarkId) => {
    setUserBookmarks(userBookmarks.filter(b => b.id !== bookmarkId));
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = [];
    book.chapters.forEach((chapter, chapterIndex) => {
      const content = chapter.content.toLowerCase();
      const searchTerm = query.toLowerCase();
      let index = content.indexOf(searchTerm);
      
      while (index !== -1) {
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + searchTerm.length + 50);
        const context = content.substring(start, end);
        
        results.push({
          chapterIndex,
          chapterTitle: chapter.title,
          context: context,
          position: index
        });
        
        index = content.indexOf(searchTerm, index + 1);
      }
    });
    
    setSearchResults(results);
  };

  // Navigate to search result
  const goToSearchResult = (chapterIndex) => {
    setCurrentChapter(chapterIndex);
    setSidebarOpen(false);
  };

  // Render chapter content with highlights
  const renderChapterContent = () => {
    const chapter = book.chapters[currentChapter];
    if (!chapter) return null;

    // Convert markdown-like content to HTML (simplified)
    let content = chapter.content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium mb-3 text-gray-700 dark:text-gray-200">$1</h3>')
      .replace(/^\*\*(.*?)\*\*/gm, '<strong class="font-semibold">$1</strong>')
      .replace(/^\*(.*?)\*/gm, '<em class="italic">$1</em>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">')
      .replace(/\n/g, '<br>');

    // Wrap in paragraph tags
    content = `<p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">${content}</p>`;

    return (
      <div 
        ref={contentRef}
        className="prose prose-lg max-w-none dark:prose-invert"
        style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
        onMouseUp={handleTextSelection}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  return (
    <div className={`fixed inset-0 z-50 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex h-full bg-white dark:bg-gray-900">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {book.title}
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {[
                { id: 'chapters', label: 'Chapters', icon: BookOpen },
                { id: 'notes', label: 'Notes', icon: StickyNote },
                { id: 'highlights', label: 'Highlights', icon: Highlighter },
                { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center p-3 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'chapters' && (
                <div className="space-y-2">
                  {book.chapters.map((chapter, index) => (
                    <button
                      key={chapter.id}
                      onClick={() => {
                        setCurrentChapter(index);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentChapter === index
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="font-medium">{chapter.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Pages {chapter.pages}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowNoteDialog(true)}
                    className="w-full flex items-center gap-2 p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Note
                  </button>
                  
                  {userNotes.map(note => (
                    <div key={note.id} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                          Page {note.page}
                        </span>
                        <button
                          onClick={() => setUserNotes(userNotes.filter(n => n.id !== note.id))}
                          className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        {note.content}
                      </p>
                      <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                        {new Date(note.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'highlights' && (
                <div className="space-y-3">
                  {userHighlights.map(highlight => (
                    <div key={highlight.id} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Page {highlight.page}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${highlightColors.find(c => c.value === highlight.color)?.class}`}></div>
                          <button
                            onClick={() => setUserHighlights(userHighlights.filter(h => h.id !== highlight.id))}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                        "{highlight.text}"
                      </p>
                      {highlight.note && (
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                          {highlight.note}
                        </p>
                      )}
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {new Date(highlight.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'bookmarks' && (
                <div className="space-y-3">
                  {userBookmarks.map(bookmark => (
                    <div key={bookmark.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                          Page {bookmark.page}
                        </span>
                        <button
                          onClick={() => removeBookmark(bookmark.id)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        {bookmark.note}
                      </p>
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                        {new Date(bookmark.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <BackButton 
                fallbackPath="/student/materials"
                showText={false}
                className="text-gray-600 dark:text-gray-400"
              />
              
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {book.chapters[currentChapter]?.title}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Chapter {currentChapter + 1} of {book.chapters.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={addBookmark}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400"
                title="Add Bookmark"
              >
                <Bookmark className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setShowNoteDialog(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400"
                title="Add Note"
              >
                <StickyNote className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Font Size:</span>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-500 w-8">{fontSize}px</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Theme:</span>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Reading Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-8">
              {renderChapterContent()}
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <button
              onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
              disabled={currentChapter === 0}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {currentChapter + 1} / {book.chapters.length}
            </div>

            <button
              onClick={() => setCurrentChapter(Math.min(book.chapters.length - 1, currentChapter + 1))}
              disabled={currentChapter === book.chapters.length - 1}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Highlight Menu */}
        {showHighlightMenu && (
          <div
            className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2"
            style={{
              left: highlightMenuPosition.x - 100,
              top: highlightMenuPosition.y - 60
            }}
          >
            <div className="flex gap-1">
              {highlightColors.map(color => (
                <button
                  key={color.value}
                  onClick={() => addHighlight(color.value)}
                  className={`w-8 h-8 rounded ${color.class} border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500`}
                  title={`Highlight in ${color.name}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Note Dialog */}
        {showNoteDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-full mx-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Add Note
              </h3>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Enter your note..."
                className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowNoteDialog(false);
                    setNoteContent('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={addNote}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookReader;