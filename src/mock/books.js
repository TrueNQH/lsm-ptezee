export const books = [
  {
    id: 'book-1',
    title: 'PTE Academic Official Guide 2024',
    author: 'Pearson Education',
    category: 'Test Prep',
    subcategory: 'PTE Academic',
    price: 29.99,
    originalPrice: 39.99,
    progress: 65,
    isPaid: true,
    isOwned: true,
    rating: 4.8,
    reviewCount: 342,
    pages: 450,
    publishedDate: '2024-01-15',
    language: 'English',
    level: 'Intermediate',
    cover: '/api/placeholder/200/300',
    description: 'The official guide to PTE Academic with authentic practice materials and expert strategies.',
    features: ['Official Content', 'Practice Tests', 'Audio Materials', 'Answer Keys'],
    tableOfContents: [
      { chapter: 1, title: 'Introduction to PTE Academic', pages: '1-25' },
      { chapter: 2, title: 'Speaking Module', pages: '26-120' },
      { chapter: 3, title: 'Writing Module', pages: '121-200' },
      { chapter: 4, title: 'Reading Module', pages: '201-320' },
      { chapter: 5, title: 'Listening Module', pages: '321-400' },
      { chapter: 6, title: 'Practice Tests', pages: '401-450' }
    ],
    // Full book content with chapters
    chapters: [
      {
        id: 1,
        title: 'Introduction to PTE Academic',
        pages: '1-25',
        content: `
# Chapter 1: Introduction to PTE Academic

## What is PTE Academic?

PTE Academic is a computer-based English language test trusted by universities, colleges and governments around the world. It tests Reading, Writing, Listening and Speaking in a single 2-hour test session.

## Test Format

The test is divided into three main parts:

### 1. Speaking & Writing (54-67 minutes)
- Personal Introduction
- Read Aloud
- Repeat Sentence
- Describe Image
- Re-tell Lecture
- Answer Short Question
- Summarize Written Text
- Essay Writing

### 2. Reading (29-30 minutes)
- Multiple Choice (Single Answer)
- Multiple Choice (Multiple Answers)
- Re-order Paragraphs
- Fill in the Blanks
- Reading & Writing Fill in the Blanks

### 3. Listening (30-43 minutes)
- Summarize Spoken Text
- Multiple Choice (Multiple Answers)
- Fill in the Blanks
- Highlight Correct Summary
- Multiple Choice (Single Answer)
- Select Missing Word
- Highlight Incorrect Words
- Write from Dictation

## Scoring System

PTE Academic uses automated scoring to ensure fair and unbiased results. The scoring system evaluates:

- **Content**: The accuracy and relevance of your response
- **Oral Fluency**: The rhythm, phrasing, and stress patterns
- **Pronunciation**: How clearly you speak
- **Formal Requirements**: Following instructions correctly
- **Grammar**: Correct use of grammar structures
- **General Linguistic Range**: Vocabulary and language complexity
- **Spelling**: Correct spelling in written responses
- **Vocabulary**: Appropriate word choice
- **Written Discourse**: Logical flow and organization

### Score Ranges
- **90-85**: Expert level
- **84-76**: Proficient level  
- **75-59**: Competent level
- **58-43**: Modest level
- **42-30**: Limited level
- **29-10**: Extremely limited level

## Test Preparation Tips

1. **Familiarize yourself with the format**: Practice with authentic materials
2. **Develop time management skills**: Each section is timed
3. **Practice speaking clearly**: The computer needs to understand you
4. **Build academic vocabulary**: Focus on academic word lists
5. **Practice typing**: Many tasks require typing responses

## Common Mistakes to Avoid

- Speaking too quietly or too loudly
- Not following instructions exactly
- Running out of time
- Using informal language in academic contexts
- Not proofreading written responses

*End of Chapter 1*
        `
      },
      {
        id: 2,
        title: 'Speaking Module',
        pages: '26-120',
        content: `
# Chapter 2: Speaking Module

## Overview

The Speaking section tests your ability to communicate effectively in English in academic settings. All speaking tasks are recorded and scored by automated systems.

## Task Types

### 1. Personal Introduction (Not Scored)
This is a warm-up task where you introduce yourself. While not scored, it helps you get comfortable with the microphone.

**Tips:**
- Speak clearly and at normal volume
- Keep it brief (25-30 seconds)
- Mention your name, background, and goals

### 2. Read Aloud (6-7 tasks)
You will see a text on screen and have 30-40 seconds to prepare, then read it aloud.

**Scoring Criteria:**
- Content: Reading all words correctly
- Oral Fluency: Natural rhythm and phrasing
- Pronunciation: Clear articulation

**Strategy:**
- Use preparation time to scan for difficult words
- Speak at natural pace, don't rush
- Pause briefly at punctuation marks
- If you make a mistake, continue reading

**Practice Text Example:**
"The concept of sustainable development has gained significant momentum in recent decades. It represents a paradigm shift towards balancing economic growth with environmental protection and social equity. This approach recognizes that long-term prosperity depends on maintaining the health of our planet's ecosystems while ensuring that all people have access to basic necessities and opportunities for advancement."

### 3. Repeat Sentence (10-12 tasks)
Listen to a sentence and repeat it exactly as you heard it.

**Scoring Criteria:**
- Content: Accuracy of repetition
- Oral Fluency: Natural delivery
- Pronunciation: Clear speech

**Strategy:**
- Listen carefully to the entire sentence
- Focus on meaning, not just individual words
- Maintain natural intonation
- Don't add or omit words

### 4. Describe Image (6-7 tasks)
Look at an image and describe what you see in 40 seconds.

**Types of Images:**
- Bar charts and graphs
- Line graphs
- Pie charts
- Tables
- Maps
- Photographs
- Diagrams

**Structure for Graphs/Charts:**
1. **Introduction**: "This [chart/graph] shows..."
2. **Main trends**: "The most significant feature is..."
3. **Supporting details**: "For example..."
4. **Conclusion**: "Overall/In conclusion..."

**Useful Vocabulary:**
- Trends: increase, decrease, fluctuate, remain stable
- Comparisons: higher than, lower than, similar to
- Extremes: peak, minimum, maximum
- Time expressions: from 2010 to 2020, during this period

### 5. Re-tell Lecture (3-4 tasks)
Listen to a lecture (60-90 seconds) and summarize the main points in 40 seconds.

**Strategy:**
- Take notes while listening
- Focus on main ideas, not details
- Use your own words
- Include key supporting points
- Speak for the full 40 seconds

**Note-taking Tips:**
- Use abbreviations and symbols
- Write key words, not full sentences
- Organize notes by main points
- Listen for signal words (first, however, in conclusion)

### 6. Answer Short Question (10-12 tasks)
Listen to a question and give a brief answer (one or a few words).

**Types of Questions:**
- Factual: "What do you call a person who studies stars?"
- Definition: "What is the opposite of 'ancient'?"
- Common knowledge: "How many days are there in a week?"

**Strategy:**
- Answer immediately after the question ends
- Keep answers brief and direct
- If unsure, make a reasonable guess
- Don't overthink simple questions

*End of Chapter 2 - Speaking Module*
        `
      }
    ],
    // User reading data
    userReadingData: {
      currentPage: 45,
      currentChapter: 2,
      readingProgress: 65,
      timeSpent: 480, // minutes
      lastReadDate: '2024-01-20',
      bookmarks: [
        { id: 1, page: 45, note: 'Important speaking strategies', chapter: 'Speaking Module', timestamp: '2024-01-18T10:30:00Z' },
        { id: 2, page: 156, note: 'Essay structure template', chapter: 'Writing Module', timestamp: '2024-01-19T14:20:00Z' },
        { id: 3, page: 278, note: 'Reading time management tips', chapter: 'Reading Module', timestamp: '2024-01-20T09:15:00Z' }
      ],
      highlights: [
        {
          id: 1,
          chapterId: 1,
          text: 'PTE Academic uses automated scoring to ensure fair and unbiased results',
          color: 'yellow',
          page: 15,
          timestamp: '2024-01-18T11:00:00Z',
          note: 'Key advantage of PTE'
        },
        {
          id: 2,
          chapterId: 2,
          text: 'Speak at natural pace, don\'t rush',
          color: 'green',
          page: 45,
          timestamp: '2024-01-18T15:30:00Z',
          note: 'Important for Read Aloud task'
        },
        {
          id: 3,
          chapterId: 2,
          text: 'Focus on meaning, not just individual words',
          color: 'blue',
          page: 52,
          timestamp: '2024-01-19T10:45:00Z',
          note: 'Repeat Sentence strategy'
        }
      ],
      notes: [
        {
          id: 1,
          chapterId: 1,
          page: 20,
          content: 'Remember to practice with official materials only. Third-party materials might not reflect actual test format.',
          timestamp: '2024-01-18T12:00:00Z',
          tags: ['preparation', 'materials']
        },
        {
          id: 2,
          chapterId: 2,
          page: 45,
          content: 'Practice speaking tasks daily for at least 30 minutes. Record yourself to identify areas for improvement.',
          timestamp: '2024-01-18T16:00:00Z',
          tags: ['speaking', 'practice', 'daily-routine']
        }
      ]
    },
    bookmarks: [
      { id: 1, page: 45, note: 'Important speaking strategies', chapter: 'Speaking Module' },
      { id: 2, page: 156, note: 'Essay structure template', chapter: 'Writing Module' },
      { id: 3, page: 278, note: 'Reading time management tips', chapter: 'Reading Module' }
    ],
    userRating: 5,
    userReview: 'Excellent resource for PTE preparation. The practice tests are very similar to the actual exam.',
    readingTime: '8 hours',
    difficulty: 'Intermediate',
    tags: ['PTE', 'Test Prep', 'Official Guide', 'Practice Tests'],
    // Enhanced book data
    reviews: [
      {
        id: 1,
        user: 'Jennifer Liu',
        avatar: '/api/placeholder/40/40',
        rating: 5,
        date: '2024-01-18',
        comment: 'This is the best PTE preparation book I\'ve used. The practice tests are incredibly realistic and helped me score 85 overall.',
        helpful: 45,
        verified: true,
        purchaseVerified: true
      },
      {
        id: 2,
        user: 'Ahmed Hassan',
        avatar: '/api/placeholder/40/40',
        rating: 5,
        date: '2024-01-12',
        comment: 'Official content makes all the difference. Scored 79 after using this guide for 3 weeks.',
        helpful: 32,
        verified: true,
        purchaseVerified: true
      },
      {
        id: 3,
        user: 'Sophie Chen',
        avatar: '/api/placeholder/40/40',
        rating: 4,
        date: '2024-01-08',
        comment: 'Great book but could use more speaking practice materials. Overall very helpful.',
        helpful: 18,
        verified: true,
        purchaseVerified: true
      }
    ],
    relatedBooks: ['book-3', 'book-4'],
    readingStats: {
      averageReadingTime: '6-10 hours',
      completionRate: 78,
      mostBookmarkedChapter: 'Speaking Module',
      averageRating: 4.8,
      totalReaders: 1250
    },
    authorInfo: {
      name: 'Pearson Education',
      bio: 'Pearson Education is the world\'s leading learning company, providing educational materials and assessments for millions of learners worldwide.',
      website: 'https://pearson.com',
      otherBooks: ['PTE Academic Practice Tests Plus', 'PTE Academic Testbuilder']
    },
    downloadableResources: [
      { name: 'Audio Files', size: '250 MB', format: 'MP3' },
      { name: 'Practice Test Answer Sheets', size: '5 MB', format: 'PDF' },
      { name: 'Vocabulary Lists', size: '2 MB', format: 'PDF' }
    ],
    lastUpdated: '2024-01-15',
    edition: '2024 Edition',
    isbn: '978-1-292-31234-5'
  },
  {
    id: 'book-2',
    title: 'IELTS Vocabulary Masterclass',
    author: 'Dr. Emma Richardson',
    category: 'Vocabulary',
    subcategory: 'IELTS',
    price: 0,
    progress: 23,
    isPaid: false,
    isOwned: true,
    rating: 4.6,
    reviewCount: 189,
    pages: 320,
    publishedDate: '2023-11-20',
    language: 'English',
    level: 'All Levels',
    cover: '/api/placeholder/200/300',
    description: 'Build your IELTS vocabulary with 2000+ essential words and phrases organized by topic.',
    features: ['2000+ Words', 'Audio Pronunciation', 'Practice Exercises', 'Topic-based Learning'],
    tableOfContents: [
      { chapter: 1, title: 'Academic Vocabulary', pages: '1-80' },
      { chapter: 2, title: 'Business & Work', pages: '81-140' },
      { chapter: 3, title: 'Environment & Nature', pages: '141-200' },
      { chapter: 4, title: 'Technology & Innovation', pages: '201-260' },
      { chapter: 5, title: 'Health & Lifestyle', pages: '261-320' }
    ],
    sampleContent: `
# Chapter 1: Academic Vocabulary

## Essential Academic Words

### 1. Analyze (verb)
**Definition:** To examine something in detail to understand it better
**Example:** Students need to analyze the data before drawing conclusions.
**Synonyms:** examine, study, investigate

### 2. Significant (adjective)  
**Definition:** Important or notable
**Example:** There was a significant improvement in test scores.
**Synonyms:** important, notable, considerable

*Continue reading to access 2000+ vocabulary words...*
    `,
    bookmarks: [],
    userRating: 0,
    userReview: '',
    readingTime: '12 hours',
    difficulty: 'Beginner to Advanced',
    tags: ['IELTS', 'Vocabulary', 'Free', 'Academic English']
  },
  {
    id: 'book-3',
    title: 'English Grammar in Use',
    author: 'Raymond Murphy',
    category: 'Grammar',
    subcategory: 'General English',
    price: 24.99,
    originalPrice: 34.99,
    progress: 0,
    isPaid: true,
    isOwned: false,
    rating: 4.9,
    reviewCount: 1250,
    pages: 380,
    publishedDate: '2023-08-10',
    language: 'English',
    level: 'Intermediate',
    cover: '/api/placeholder/200/300',
    description: 'The world\'s best-selling grammar book for intermediate learners of English.',
    features: ['Clear Explanations', 'Practice Exercises', 'Answer Key', 'Self-study Format'],
    tableOfContents: [
      { chapter: 1, title: 'Present and Past', pages: '1-60' },
      { chapter: 2, title: 'Present Perfect and Past', pages: '61-120' },
      { chapter: 3, title: 'Future', pages: '121-180' },
      { chapter: 4, title: 'Modals, Imperatives, etc.', pages: '181-240' },
      { chapter: 5, title: 'If and Wish', pages: '241-300' },
      { chapter: 6, title: 'Passive', pages: '301-380' }
    ],
    sampleContent: `
# Unit 1: Present Continuous (I am doing)

## Study this example:

Sarah is in her car. She is on her way to work.
She **is driving** to work.

This means: she is driving now, at the time of speaking.
The action is not finished.

## Form:
**am/is/are + -ing** is the present continuous:

- I am (I'm) working
- You are (you're) working  
- He/she/it is (he's/she's/it's) working
- We are (we're) working
- They are (they're) working

*Purchase the full book to continue learning...*
    `,
    bookmarks: [],
    userRating: 0,
    userReview: '',
    readingTime: '15 hours',
    difficulty: 'Intermediate',
    tags: ['Grammar', 'Self-study', 'Intermediate', 'Best-seller']
  },
  {
    id: 'book-4',
    title: 'Academic Writing Skills',
    author: 'Prof. Michael Chen',
    category: 'Writing',
    subcategory: 'Academic Writing',
    price: 19.99,
    progress: 45,
    isPaid: true,
    isOwned: true,
    rating: 4.7,
    reviewCount: 98,
    pages: 280,
    publishedDate: '2023-12-05',
    language: 'English',
    level: 'Advanced',
    cover: '/api/placeholder/200/300',
    description: 'Master academic writing with proven techniques for essays, reports, and research papers.',
    features: ['Essay Templates', 'Citation Guides', 'Sample Papers', 'Writing Exercises'],
    tableOfContents: [
      { chapter: 1, title: 'Academic Writing Fundamentals', pages: '1-50' },
      { chapter: 2, title: 'Essay Structure and Organization', pages: '51-120' },
      { chapter: 3, title: 'Research and Citations', pages: '121-180' },
      { chapter: 4, title: 'Advanced Writing Techniques', pages: '181-240' },
      { chapter: 5, title: 'Editing and Proofreading', pages: '241-280' }
    ],
    sampleContent: `
# Chapter 1: Academic Writing Fundamentals

## What is Academic Writing?

Academic writing is a formal style of writing used in universities and scholarly publications. It is characterized by:

- **Formal tone and language**
- **Clear structure and organization**  
- **Evidence-based arguments**
- **Proper citations and references**

## Key Principles

### 1. Clarity and Precision
Academic writing should be clear and precise. Avoid ambiguous language and ensure your meaning is explicit.

### 2. Objectivity
Present information objectively, avoiding personal opinions unless specifically required.

*Continue reading for comprehensive writing guidance...*
    `,
    bookmarks: [
      { id: 1, page: 67, note: 'Thesis statement examples', chapter: 'Essay Structure' },
      { id: 2, page: 145, note: 'APA citation format', chapter: 'Research and Citations' }
    ],
    userRating: 4,
    userReview: 'Very helpful for improving academic writing skills. Clear examples and practical exercises.',
    readingTime: '10 hours',
    difficulty: 'Advanced',
    tags: ['Academic Writing', 'Essays', 'Research', 'Citations']
  },
  {
    id: 'book-5',
    title: 'Business English Communication',
    author: 'Sarah Williams',
    category: 'Business English',
    subcategory: 'Communication',
    price: 22.99,
    progress: 12,
    isPaid: true,
    isOwned: true,
    rating: 4.5,
    reviewCount: 156,
    pages: 350,
    publishedDate: '2023-10-15',
    language: 'English',
    level: 'Intermediate',
    cover: '/api/placeholder/200/300',
    description: 'Essential business English skills for professional communication in the workplace.',
    features: ['Email Templates', 'Meeting Language', 'Presentation Skills', 'Negotiation Phrases'],
    tableOfContents: [
      { chapter: 1, title: 'Professional Email Writing', pages: '1-70' },
      { chapter: 2, title: 'Meeting and Conference Calls', pages: '71-140' },
      { chapter: 3, title: 'Presentations and Reports', pages: '141-210' },
      { chapter: 4, title: 'Negotiation and Persuasion', pages: '211-280' },
      { chapter: 5, title: 'Cross-cultural Communication', pages: '281-350' }
    ],
    sampleContent: `
# Chapter 1: Professional Email Writing

## Email Structure

A professional email should follow this structure:

### 1. Subject Line
- Be specific and clear
- Keep it under 50 characters
- Example: "Meeting Request: Q1 Budget Review"

### 2. Greeting
- Formal: "Dear Mr./Ms. [Last Name]"
- Semi-formal: "Hello [First Name]"
- Informal: "Hi [First Name]"

### 3. Body
- State your purpose clearly in the first paragraph
- Provide necessary details in the middle
- End with a clear call to action

*Access the complete guide with 100+ email templates...*
    `,
    bookmarks: [],
    userRating: 0,
    userReview: '',
    readingTime: '14 hours',
    difficulty: 'Intermediate',
    tags: ['Business English', 'Communication', 'Professional', 'Workplace']
  },
  {
    id: 'book-6',
    title: 'Pronunciation Perfect',
    author: 'Dr. James Anderson',
    category: 'Pronunciation',
    subcategory: 'Speaking Skills',
    price: 0,
    progress: 78,
    isPaid: false,
    isOwned: true,
    rating: 4.4,
    reviewCount: 203,
    pages: 200,
    publishedDate: '2023-09-20',
    language: 'English',
    level: 'All Levels',
    cover: '/api/placeholder/200/300',
    description: 'Improve your English pronunciation with phonetic guides and audio exercises.',
    features: ['IPA Symbols', 'Audio Examples', 'Mouth Diagrams', 'Practice Drills'],
    tableOfContents: [
      { chapter: 1, title: 'English Sound System', pages: '1-40' },
      { chapter: 2, title: 'Vowel Sounds', pages: '41-80' },
      { chapter: 3, title: 'Consonant Sounds', pages: '81-120' },
      { chapter: 4, title: 'Word Stress and Rhythm', pages: '121-160' },
      { chapter: 5, title: 'Intonation Patterns', pages: '161-200' }
    ],
    sampleContent: `
# Chapter 1: English Sound System

## The International Phonetic Alphabet (IPA)

The IPA is a system of symbols that represent the sounds of spoken language. Each symbol represents one sound.

## English Phonemes

English has approximately:
- **20 vowel sounds** (including diphthongs)
- **24 consonant sounds**

## Common Pronunciation Challenges

### 1. /θ/ and /ð/ sounds (th)
- **Voiceless /θ/**: think, three, month
- **Voiced /ð/**: this, that, mother

### 2. /r/ and /l/ sounds
- Practice: "red" vs "led", "right" vs "light"

*Continue with audio exercises and detailed practice...*
    `,
    bookmarks: [
      { id: 1, page: 45, note: 'Vowel chart reference', chapter: 'Vowel Sounds' },
      { id: 2, page: 95, note: 'Difficult consonant combinations', chapter: 'Consonant Sounds' },
      { id: 3, page: 134, note: 'Stress patterns in compound words', chapter: 'Word Stress' }
    ],
    userRating: 5,
    userReview: 'Excellent free resource! The audio examples are very helpful for pronunciation practice.',
    readingTime: '6 hours',
    difficulty: 'All Levels',
    tags: ['Pronunciation', 'Speaking', 'Free', 'Audio', 'IPA']
  },
  {
    id: 'book-7',
    title: 'Reading Comprehension Strategies',
    author: 'Lisa Martinez',
    category: 'Reading',
    subcategory: 'Reading Skills',
    price: 16.99,
    progress: 0,
    isPaid: true,
    isOwned: false,
    rating: 4.6,
    reviewCount: 87,
    pages: 240,
    publishedDate: '2023-11-30',
    language: 'English',
    level: 'Intermediate',
    cover: '/api/placeholder/200/300',
    description: 'Develop effective reading strategies for academic and professional texts.',
    features: ['Reading Techniques', 'Comprehension Exercises', 'Speed Reading', 'Critical Analysis'],
    tableOfContents: [
      { chapter: 1, title: 'Active Reading Techniques', pages: '1-48' },
      { chapter: 2, title: 'Vocabulary in Context', pages: '49-96' },
      { chapter: 3, title: 'Main Ideas and Details', pages: '97-144' },
      { chapter: 4, title: 'Critical Reading Skills', pages: '145-192' },
      { chapter: 5, title: 'Speed Reading Methods', pages: '193-240' }
    ],
    sampleContent: `
# Chapter 1: Active Reading Techniques

## What is Active Reading?

Active reading is a process where you engage with the text through various strategies to improve comprehension and retention.

## Key Strategies

### 1. Preview the Text
- Read headings and subheadings
- Look at images, charts, and captions
- Read the first and last paragraphs

### 2. Ask Questions
- What is the main topic?
- What do I already know about this?
- What do I want to learn?

### 3. Take Notes
- Summarize key points
- Write questions in margins
- Highlight important information

*Purchase to access complete reading strategies and exercises...*
    `,
    bookmarks: [],
    userRating: 0,
    userReview: '',
    readingTime: '8 hours',
    difficulty: 'Intermediate',
    tags: ['Reading', 'Comprehension', 'Study Skills', 'Academic']
  },
  {
    id: 'book-8',
    title: 'Listening Skills Development',
    author: 'Robert Kim',
    category: 'Listening',
    subcategory: 'Listening Skills',
    price: 18.99,
    progress: 33,
    isPaid: true,
    isOwned: true,
    rating: 4.3,
    reviewCount: 124,
    pages: 180,
    publishedDate: '2023-12-10',
    language: 'English',
    level: 'All Levels',
    cover: '/api/placeholder/200/300',
    description: 'Enhance your English listening skills with practical exercises and strategies.',
    features: ['Audio Materials', 'Listening Strategies', 'Note-taking Skills', 'Accent Training'],
    tableOfContents: [
      { chapter: 1, title: 'Listening Fundamentals', pages: '1-36' },
      { chapter: 2, title: 'Different Accents and Dialects', pages: '37-72' },
      { chapter: 3, title: 'Academic Listening', pages: '73-108' },
      { chapter: 4, title: 'Conversational Listening', pages: '109-144' },
      { chapter: 5, title: 'Test-taking Strategies', pages: '145-180' }
    ],
    sampleContent: `
# Chapter 1: Listening Fundamentals

## Why is Listening Difficult?

Listening in a second language can be challenging because:

- **Speed of speech** - Native speakers talk quickly
- **Connected speech** - Words blend together
- **Background noise** - Real-world listening conditions
- **Unfamiliar accents** - Different pronunciations

## Basic Listening Strategies

### 1. Predict Content
Before listening, think about:
- What topic might be discussed?
- What vocabulary might be used?
- What is the context?

### 2. Listen for Gist
Don't try to understand every word. Focus on:
- Main ideas
- Key information
- Overall meaning

*Continue with audio exercises and advanced techniques...*
    `,
    bookmarks: [
      { id: 1, page: 58, note: 'American vs British pronunciation differences', chapter: 'Accents and Dialects' }
    ],
    userRating: 4,
    userReview: 'Good book with practical exercises. The audio materials are high quality.',
    readingTime: '7 hours',
    difficulty: 'All Levels',
    tags: ['Listening', 'Audio', 'Accents', 'Test Prep']
  }
]

// Filter options for the Books tab
export const bookCategories = [
  'All Categories',
  'Test Prep',
  'Grammar',
  'Vocabulary', 
  'Writing',
  'Reading',
  'Listening',
  'Pronunciation',
  'Business English'
]

export const bookLevels = [
  'All Levels',
  'Beginner',
  'Intermediate', 
  'Advanced'
]

export const bookFilters = {
  price: ['All', 'Free', 'Paid'],
  progress: ['All', 'Not Started', 'In Progress', 'Completed'],
  owned: ['All', 'Owned', 'Not Owned']
}