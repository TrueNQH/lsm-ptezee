// Mock data for practice tests and assessments

export const practiceTests = [
  {
    id: 1,
    title: "Speaking Mini Test 1",
    type: "mini",
    skill: "speaking",
    duration: 15,
    questions: 5,
    difficulty: "beginner",
    completed: true,
    score: 85,
    maxScore: 100,
    completedAt: "2024-01-15",
    description: "Basic speaking assessment covering personal introduction and simple descriptions",
    status: "completed",
    // Enhanced practice test data
    detailedQuestions: [
      {
        id: 1,
        type: "personal_introduction",
        prompt: "Please introduce yourself. You have 30 seconds to prepare and 90 seconds to speak.",
        preparationTime: 30,
        responseTime: 90,
        scoringCriteria: ["Content", "Oral Fluency", "Pronunciation"],
        sampleResponse: "Hello, my name is Sarah and I'm from Australia. I'm currently studying business administration at university..."
      },
      {
        id: 2,
        type: "describe_image",
        prompt: "Look at the image below and describe what you see. You have 25 seconds to prepare and 40 seconds to speak.",
        preparationTime: 25,
        responseTime: 40,
        imageUrl: "/api/placeholder/400/300",
        scoringCriteria: ["Content", "Oral Fluency", "Pronunciation"],
        keyPoints: ["Main subject", "Background details", "Colors and composition", "Overall impression"]
      }
    ],
    performanceAnalytics: {
      strengths: ["Clear pronunciation", "Good vocabulary usage"],
      weaknesses: ["Speaking pace could be improved", "More complex sentence structures needed"],
      recommendations: ["Practice speaking at a steady pace", "Use more linking words", "Record yourself speaking daily"],
      skillBreakdown: {
        content: 82,
        fluency: 88,
        pronunciation: 85,
        vocabulary: 80,
        grammar: 87
      }
    },
    feedback: {
      overall: "Good performance with clear pronunciation. Focus on improving speaking pace and using more complex structures.",
      detailed: [
        { skill: "Content", score: 82, comment: "Relevant content but could be more detailed" },
        { skill: "Fluency", score: 88, comment: "Good flow with minor hesitations" },
        { skill: "Pronunciation", score: 85, comment: "Clear and understandable" }
      ]
    },
    retakeAvailable: true,
    nextRecommendedTest: 2
  },
  {
    id: 2,
    title: "Reading Progress Test",
    type: "progress",
    skill: "reading",
    duration: 30,
    questions: 15,
    difficulty: "intermediate",
    completed: true,
    score: 78,
    maxScore: 100,
    completedAt: "2024-01-18",
    description: "Comprehensive reading test with multiple choice and fill-in-the-blanks",
    status: "completed",
    detailedQuestions: [
      {
        id: 1,
        type: "multiple_choice_single",
        passage: "Climate change represents one of the most significant challenges of our time...",
        question: "According to the passage, what is the primary cause of climate change?",
        options: [
          "Natural weather patterns",
          "Human activities and greenhouse gas emissions",
          "Solar radiation changes",
          "Ocean current variations"
        ],
        correctAnswer: 1,
        explanation: "The passage clearly states that human activities, particularly greenhouse gas emissions, are the primary driver of current climate change.",
        timeLimit: 120,
        difficulty: "intermediate"
      },
      {
        id: 2,
        type: "fill_in_blanks",
        passage: "The research methodology was _____ designed to ensure accurate results. Scientists used _____ techniques to collect data.",
        options: ["carefully", "various", "quickly", "simple", "complex", "randomly"],
        correctAnswers: ["carefully", "various"],
        explanation: "The context suggests a methodical approach requiring careful design and various techniques.",
        timeLimit: 90
      }
    ],
    performanceAnalytics: {
      strengths: ["Good comprehension of main ideas", "Strong vocabulary knowledge"],
      weaknesses: ["Time management needs improvement", "Detail questions challenging"],
      recommendations: ["Practice skimming techniques", "Focus on identifying key details", "Time yourself during practice"],
      skillBreakdown: {
        mainIdea: 85,
        details: 72,
        inference: 80,
        vocabulary: 82,
        timeManagement: 65
      }
    },
    passageTypes: ["Academic", "Scientific", "Opinion"],
    readingStrategies: ["Skimming", "Scanning", "Detailed reading"],
    retakeAvailable: true
  },
  {
    id: 3,
    title: "Listening Mini Test 2",
    type: "mini",
    skill: "listening",
    duration: 20,
    questions: 8,
    difficulty: "beginner",
    completed: false,
    score: null,
    maxScore: 100,
    completedAt: null,
    description: "Audio comprehension test with various accents and speaking speeds",
    status: "available",
    detailedQuestions: [
      {
        id: 1,
        type: "multiple_choice",
        audioUrl: "/api/audio/conversation1.mp3",
        transcript: "Available after completion",
        question: "What is the main topic of the conversation?",
        options: [
          "Planning a vacation",
          "Discussing work schedules",
          "Ordering food at a restaurant",
          "Asking for directions"
        ],
        correctAnswer: 1,
        explanation: "The speakers are discussing their work schedules for the upcoming week.",
        audioLength: 45,
        playLimit: 2
      }
    ],
    audioFeatures: ["Multiple accents", "Natural speaking speed", "Background noise simulation"],
    listeningSkills: ["Main idea", "Specific details", "Speaker attitude", "Inference"],
    preparationTips: [
      "Listen for keywords and phrases",
      "Pay attention to tone and context",
      "Take notes while listening",
      "Don't panic if you miss something"
    ]
  },
  {
    id: 3,
    title: "Listening Mini Test 2",
    type: "mini",
    skill: "listening",
    duration: 12,
    questions: 8,
    difficulty: "beginner",
    completed: false,
    score: null,
    maxScore: 100,
    completedAt: null,
    description: "Short listening practice focusing on gist and detail questions",
    status: "available"
  },
  {
    id: 4,
    title: "Writing Final Assessment",
    type: "final",
    skill: "writing",
    duration: 60,
    questions: 3,
    difficulty: "advanced",
    completed: false,
    score: null,
    maxScore: 100,
    completedAt: null,
    description: "Comprehensive writing test including essays and summarization tasks",
    status: "locked",
    requirements: "Complete 3 progress tests to unlock",
    detailedQuestions: [
      {
        id: 1,
        type: "essay",
        prompt: "Some people believe that technology has made our lives easier, while others argue it has made them more complicated. Discuss both views and give your opinion.",
        wordLimit: { min: 250, max: 300 },
        timeLimit: 20,
        scoringCriteria: ["Task Response", "Coherence & Cohesion", "Lexical Resource", "Grammatical Range & Accuracy"],
        sampleStructure: {
          introduction: "Hook + Background + Thesis statement",
          body1: "Arguments for technology making life easier",
          body2: "Arguments for technology making life complicated",
          conclusion: "Summary + Personal opinion"
        }
      },
      {
        id: 2,
        type: "summarize_written_text",
        passage: "A comprehensive passage about renewable energy sources and their impact on the environment...",
        wordLimit: { min: 5, max: 75 },
        timeLimit: 10,
        requirements: ["One sentence only", "Include main points", "Use your own words", "Proper grammar and punctuation"]
      }
    ],
    writingStrategies: ["Planning", "Drafting", "Reviewing", "Time management"],
    commonMistakes: ["Off-topic responses", "Poor time management", "Grammar errors", "Insufficient word count"],
    unlockCriteria: {
      requiredTests: ["Reading Progress Test", "Listening Mini Test 2", "Grammar Mini Test 1"],
      minimumScore: 70
    }
  },
  {
    id: 5,
    title: "Grammar Mini Test 1",
    type: "mini",
    skill: "grammar",
    duration: 10,
    questions: 12,
    difficulty: "beginner",
    completed: true,
    score: 92,
    maxScore: 100,
    completedAt: "2024-01-12",
    description: "Basic grammar rules and sentence structure",
    status: "completed"
  },
  {
    id: 6,
    title: "Vocabulary Progress Test",
    type: "progress",
    skill: "vocabulary",
    duration: 25,
    questions: 20,
    difficulty: "intermediate",
    completed: false,
    score: null,
    maxScore: 100,
    completedAt: null,
    description: "Academic vocabulary and word usage in context",
    status: "available"
  },
  {
    id: 7,
    title: "Speaking Progress Test",
    type: "progress",
    skill: "speaking",
    duration: 25,
    questions: 10,
    difficulty: "intermediate",
    completed: false,
    score: null,
    maxScore: 100,
    completedAt: null,
    description: "Extended speaking tasks including describe image and re-tell lecture",
    status: "available"
  },
  {
    id: 8,
    title: "Reading Mini Test 2",
    type: "mini",
    skill: "reading",
    duration: 20,
    questions: 12,
    difficulty: "intermediate",
    completed: false,
    score: null,
    maxScore: 100,
    completedAt: null,
    description: "Skimming & scanning practice with multiple choice questions",
    status: "available"
  },
  {
    id: 9,
    title: "Listening Progress Test",
    type: "progress",
    skill: "listening",
    duration: 30,
    questions: 15,
    difficulty: "intermediate",
    completed: false,
    score: null,
    maxScore: 100,
    completedAt: null,
    description: "Longer listening tasks including summarize spoken text",
    status: "available"
  },
  {
    id: 10,
    title: "Writing Mini Test 2",
    type: "mini",
    skill: "writing",
    duration: 20,
    questions: 2,
    difficulty: "intermediate",
    completed: false,
    score: null,
    maxScore: 100,
    completedAt: null,
    description: "Short writing tasks including summarize written text",
    status: "available"
  },
  {
    id: 11,
    title: "Speaking Final Assessment",
    type: "final",
    skill: "speaking",
    duration: 45,
    questions: 6,
    difficulty: "advanced",
    completed: false,
    score: null,
    maxScore: 100,
    completedAt: null,
    description: "Comprehensive speaking test across all task types",
    status: "available"
  },
  {
    id: 12,
    title: "Reading Progress Test 2",
    type: "progress",
    skill: "reading",
    duration: 35,
    questions: 18,
    difficulty: "intermediate",
    completed: false,
    score: null,
    maxScore: 100,
    completedAt: null,
    description: "Reading tasks including reorder paragraphs and fill in the blanks",
    status: "available"
  },
  {
    id: 13,
    title: "Writing Progress Test",
    type: "progress",
    skill: "writing",
    duration: 40,
    questions: 3,
    difficulty: "intermediate",
    completed: false,
    score: null,
    maxScore: 100,
    completedAt: null,
    description: "Longer writing tasks including essay and summarize written text",
    status: "available"
  }
]

export const mockQuestions = [
  {
    id: 1,
    testId: 3,
    type: "multiple-choice",
    question: "What is the main topic of the conversation?",
    options: [
      "Planning a vacation",
      "Discussing work schedules", 
      "Ordering food at a restaurant",
      "Asking for directions"
    ],
    correctAnswer: 1,
    explanation: "The speakers are discussing their work schedules for the upcoming week.",
    audioUrl: "https://example.com/audio1.mp3"
  },
  {
    id: 2,
    testId: 3,
    type: "fill-blank",
    question: "The meeting is scheduled for _______ at 3 PM.",
    correctAnswer: "Tuesday",
    explanation: "The speaker clearly mentions 'Tuesday at 3 PM' in the audio.",
    audioUrl: "https://example.com/audio2.mp3"
  },
  {
    id: 3,
    testId: 6,
    type: "multiple-choice",
    question: "Choose the word that best completes the sentence: 'The research findings were quite _______ and surprised everyone.'",
    options: [
      "predictable",
      "unexpected", 
      "boring",
      "simple"
    ],
    correctAnswer: 1,
    explanation: "'Unexpected' fits the context as it explains why the findings surprised everyone."
  }
]

export const testResults = [
  {
    testId: 1,
    userId: 1,
    score: 85,
    maxScore: 100,
    completedAt: "2024-01-15T10:30:00Z",
    timeSpent: 12, // minutes
    answers: [
      { questionId: 1, userAnswer: 1, correct: true },
      { questionId: 2, userAnswer: "Tuesday", correct: true },
      { questionId: 3, userAnswer: 0, correct: false }
    ],
    feedback: {
      strengths: ["Good pronunciation", "Clear articulation"],
      improvements: ["Work on fluency", "Expand vocabulary"],
      nextSteps: ["Practice daily conversations", "Take intermediate speaking test"]
    }
  }
]

export const studyTips = [
  {
    id: 1,
    skill: "speaking",
    title: "Improve Your Pronunciation",
    description: "Practice with native speakers and use pronunciation apps",
    tips: [
      "Record yourself speaking and compare with native speakers",
      "Use tongue twisters to improve articulation",
      "Practice minimal pairs (words that differ by one sound)",
      "Focus on stress patterns in words and sentences"
    ],
    icon: "🗣️",
    difficulty: "beginner"
  },
  {
    id: 2,
    skill: "listening",
    title: "Active Listening Strategies",
    description: "Develop better listening comprehension skills",
    tips: [
      "Listen to podcasts and audiobooks regularly",
      "Practice note-taking while listening",
      "Focus on key words and main ideas",
      "Use subtitles gradually - start with native language, then English, then none"
    ],
    icon: "👂",
    difficulty: "intermediate"
  },
  {
    id: 3,
    skill: "reading",
    title: "Speed Reading Techniques",
    description: "Read faster while maintaining comprehension",
    tips: [
      "Practice skimming and scanning techniques",
      "Expand your vocabulary to reduce lookup time",
      "Use your finger or a pointer to guide your eyes",
      "Read in chunks rather than word by word"
    ],
    icon: "📖",
    difficulty: "intermediate"
  },
  {
    id: 4,
    skill: "writing",
    title: "Essay Structure Mastery",
    description: "Write clear and organized essays",
    tips: [
      "Always start with an outline",
      "Use topic sentences for each paragraph",
      "Practice different essay types (argumentative, descriptive, narrative)",
      "Proofread for grammar and spelling errors"
    ],
    icon: "✍️",
    difficulty: "advanced"
  },
  {
    id: 5,
    skill: "grammar",
    title: "Common Grammar Mistakes",
    description: "Avoid frequent grammatical errors",
    tips: [
      "Learn the difference between similar words (affect/effect, then/than)",
      "Practice verb tenses in context",
      "Understand subject-verb agreement rules",
      "Use grammar checking tools but understand the corrections"
    ],
    icon: "📝",
    difficulty: "beginner"
  },
  {
    id: 6,
    skill: "vocabulary",
    title: "Vocabulary Building Strategies",
    description: "Expand your word knowledge effectively",
    tips: [
      "Learn words in context, not in isolation",
      "Use spaced repetition for memorization",
      "Keep a vocabulary journal",
      "Practice using new words in sentences"
    ],
    icon: "📚",
    difficulty: "intermediate"
  }
]

export const tutorials = [
  {
    id: 1,
    title: "PTE Speaking Section Overview",
    description: "Complete guide to PTE Academic Speaking section",
    videoId: "dQw4w9WgXcQ", // Mock YouTube video ID
    duration: "15:30",
    views: 12500,
    category: "speaking",
    level: "beginner",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  },
  {
    id: 2,
    title: "Reading Multiple Choice Strategies",
    description: "Master multiple choice questions in reading section",
    videoId: "dQw4w9WgXcQ",
    duration: "12:45",
    views: 8900,
    category: "reading",
    level: "intermediate",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  },
  {
    id: 3,
    title: "Listening Note-Taking Techniques",
    description: "Effective note-taking for listening comprehension",
    videoId: "dQw4w9WgXcQ",
    duration: "18:20",
    views: 15600,
    category: "listening",
    level: "intermediate",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  },
  {
    id: 4,
    title: "Writing Task 1: Summarize Written Text",
    description: "Step-by-step approach to summarizing texts",
    videoId: "dQw4w9WgXcQ",
    duration: "22:10",
    views: 11200,
    category: "writing",
    level: "advanced",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  },
  {
    id: 5,
    title: "Grammar Fundamentals for PTE",
    description: "Essential grammar rules for PTE success",
    videoId: "dQw4w9WgXcQ",
    duration: "25:45",
    views: 9800,
    category: "grammar",
    level: "beginner",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  },
  {
    id: 6,
    title: "Academic Vocabulary Masterclass",
    description: "Build academic vocabulary for higher scores",
    videoId: "dQw4w9WgXcQ",
    duration: "30:15",
    views: 14300,
    category: "vocabulary",
    level: "advanced",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  }
]

export const connectedSites = [
  {
    id: 1,
    name: "PTE Academic Official",
    description: "Official PTE Academic test booking and preparation",
    url: "https://www.pearsonpte.com",
    logo: "https://via.placeholder.com/60x60?text=PTE",
    category: "official",
    features: ["Test Booking", "Official Practice", "Score Reports"]
  },
  {
    id: 2,
    name: "APEUni",
    description: "Comprehensive PTE preparation platform",
    url: "https://www.apeuni.com",
    logo: "https://via.placeholder.com/60x60?text=APE",
    category: "preparation",
    features: ["Practice Tests", "Predictions", "Study Materials"]
  },
  {
    id: 3,
    name: "PTE Tutorials",
    description: "Free PTE preparation videos and tips",
    url: "https://www.ptetutorials.com",
    logo: "https://via.placeholder.com/60x60?text=PT",
    category: "tutorials",
    features: ["Video Lessons", "Tips & Tricks", "Free Resources"]
  },
  {
    id: 4,
    name: "E2Language",
    description: "Live PTE classes and practice materials",
    url: "https://www.e2language.com",
    logo: "https://via.placeholder.com/60x60?text=E2",
    category: "classes",
    features: ["Live Classes", "Practice Materials", "Expert Teachers"]
  }
]