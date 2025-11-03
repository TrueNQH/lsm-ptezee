// Short Courses Data
export const shortCourses = [
  {
    id: 'short-1',
    type: 'short',
    title: 'PTE Academic Speaking Mastery',
    instructor: 'Dr. Sarah Johnson',
    rating: 4.8,
    reviewCount: 234,
    price: 49.99,
    originalPrice: 79.99,
    duration: '6 weeks',
    level: 'Intermediate',
    enrolled: 1250,
    image: '/api/placeholder/300/200',
    description: 'Master PTE Academic Speaking with proven strategies and practice tests.',
    features: ['20+ Practice Tests', 'AI Feedback', 'Live Sessions', 'Certificate'],
    curriculum: [
      {
        id: 1,
        title: 'Introduction to PTE Speaking',
        lessons: [
          { id: 1, title: 'Overview of Speaking Tasks', duration: '15 min', type: 'video' },
          { id: 2, title: 'Scoring Criteria', duration: '12 min', type: 'video' },
          { id: 3, title: 'Practice Quiz', duration: '10 min', type: 'quiz' }
        ]
      },
      {
        id: 2,
        title: 'Read Aloud Techniques',
        lessons: [
          { id: 4, title: 'Pronunciation Tips', duration: '18 min', type: 'video' },
          { id: 5, title: 'Fluency Strategies', duration: '20 min', type: 'video' },
          { id: 6, title: 'Practice Session', duration: '25 min', type: 'practice' }
        ]
      },
      {
        id: 3,
        title: 'Describe Image Mastery',
        lessons: [
          { id: 7, title: 'Template Structures', duration: '22 min', type: 'video' },
          { id: 8, title: 'Vocabulary Building', duration: '16 min', type: 'reading' },
          { id: 9, title: 'Mock Test', duration: '30 min', type: 'quiz' }
        ]
      }
    ],
    discussions: [
      {
        id: 1,
        user: 'Mike Chen',
        avatar: '/api/placeholder/40/40',
        timestamp: '2 hours ago',
        message: 'Great course! The pronunciation tips really helped me improve my score.',
        replies: [
          {
            id: 2,
            user: 'Dr. Sarah Johnson',
            avatar: '/api/placeholder/40/40',
            timestamp: '1 hour ago',
            message: 'Thank you Mike! Keep practicing and you\'ll see even better results.',
            isInstructor: true
          }
        ]
      }
    ],
    // Enhanced course data
    instructorInfo: {
      name: 'Dr. Sarah Johnson',
      title: 'PTE Academic Expert & Linguist',
      experience: '8 years',
      qualifications: ['PhD in Applied Linguistics', 'PTE Academic Certified Trainer', 'TESOL Certified'],
      bio: 'Dr. Sarah Johnson is a renowned expert in PTE Academic preparation with over 8 years of experience helping students achieve their target scores.',
      avatar: '/api/placeholder/100/100',
      rating: 4.9,
      totalStudents: 2500,
      coursesCount: 12
    },
    reviews: [
      {
        id: 1,
        user: 'Alex Thompson',
        avatar: '/api/placeholder/40/40',
        rating: 5,
        date: '2024-01-15',
        comment: 'Excellent course! Improved my PTE score from 65 to 79. The speaking strategies are game-changing.',
        helpful: 23,
        verified: true
      },
      {
        id: 2,
        user: 'Maria Garcia',
        avatar: '/api/placeholder/40/40',
        rating: 5,
        date: '2024-01-10',
        comment: 'Dr. Johnson\'s teaching method is outstanding. The AI feedback feature is incredibly helpful.',
        helpful: 18,
        verified: true
      },
      {
        id: 3,
        user: 'David Kim',
        avatar: '/api/placeholder/40/40',
        rating: 4,
        date: '2024-01-08',
        comment: 'Great content and well-structured lessons. Would recommend to anyone preparing for PTE.',
        helpful: 15,
        verified: true
      }
    ],
    prerequisites: ['Basic English proficiency (B1 level)', 'Computer with microphone for speaking practice'],
    learningOutcomes: [
      'Master all PTE Academic speaking tasks',
      'Achieve fluency and pronunciation improvements',
      'Understand PTE scoring criteria thoroughly',
      'Develop effective test-taking strategies'
    ],
    certificateInfo: {
      available: true,
      requirements: 'Complete all lessons and achieve 80% in final assessment',
      accredited: true,
      downloadable: true
    },
    relatedCourses: ['short-2', 'short-3'],
    tags: ['PTE Academic', 'Speaking', 'Test Preparation', 'AI Feedback', 'Certificate'],
    lastUpdated: '2024-01-20',
    completionRate: 89,
    averageCompletionTime: '4-6 weeks'
  },
  {
    id: 'short-2',
    type: 'short',
    title: 'IELTS Writing Task 2 Excellence',
    instructor: 'Prof. Emma Wilson',
    rating: 4.7,
    reviewCount: 189,
    price: 0,
    duration: '4 weeks',
    level: 'Advanced',
    enrolled: 890,
    image: '/api/placeholder/300/200',
    description: 'Achieve Band 8+ in IELTS Writing Task 2 with expert guidance.',
    features: ['Essay Templates', 'Band 9 Examples', 'Personal Feedback', 'Writing Tools'],
    curriculum: [
      {
        id: 1,
        title: 'Essay Structure Fundamentals',
        lessons: [
          { id: 1, title: 'Introduction Techniques', duration: '20 min', type: 'video' },
          { id: 2, title: 'Body Paragraph Development', duration: '25 min', type: 'video' }
        ]
      }
    ],
    discussions: []
  },
  {
    id: 'short-3',
    type: 'short',
    title: 'English Grammar Bootcamp',
    instructor: 'James Rodriguez',
    rating: 4.6,
    reviewCount: 456,
    price: 29.99,
    originalPrice: 49.99,
    duration: '8 weeks',
    level: 'Beginner',
    enrolled: 2100,
    image: '/api/placeholder/300/200',
    description: 'Complete grammar foundation course for English learners.',
    features: ['Interactive Exercises', 'Grammar Checker', 'Progress Tracking', 'Mobile App'],
    curriculum: [
      {
        id: 1,
        title: 'Basic Grammar Rules',
        lessons: [
          { id: 1, title: 'Parts of Speech', duration: '18 min', type: 'video' },
          { id: 2, title: 'Sentence Structure', duration: '22 min', type: 'video' }
        ]
      }
    ],
    discussions: []
  }
]

// Group Classes Data
export const groupClasses = [
  {
    id: 'group-1',
    type: 'group',
    title: 'PTE Academic Intensive Bootcamp',
    instructor: 'Dr. Michael Chang',
    schedule: 'Mon/Wed/Fri 7:00 PM - 8:30 PM (GMT+8)',
    duration: '4 weeks',
    startDate: '2024-02-15',
    endDate: '2024-03-15',
    maxStudents: 15,
    enrolled: 12,
    price: 199.99,
    zoomLink: 'https://zoom.us/j/123456789',
    meetingId: '123 456 789',
    passcode: 'PTE2024',
    image: '/api/placeholder/300/200',
    description: 'Intensive group coaching for PTE Academic with live practice sessions.',
    features: ['Live Classes', 'Group Practice', 'Weekly Assessments', 'Study Materials'],
    preChecklist: [
      { id: 1, task: 'Complete diagnostic test', completed: true },
      { id: 2, task: 'Download course materials', completed: true },
      { id: 3, task: 'Set up Zoom account', completed: false },
      { id: 4, task: 'Join WhatsApp group', completed: false }
    ],
    postChecklist: [
      { id: 1, task: 'Review session recording', completed: false },
      { id: 2, task: 'Complete homework assignments', completed: false },
      { id: 3, task: 'Practice speaking exercises', completed: false },
      { id: 4, task: 'Submit weekly progress report', completed: false }
    ],
    upcomingSessions: [
      {
        id: 1,
        date: '2024-01-22',
        time: '7:00 PM',
        topic: 'Speaking Module Deep Dive',
        status: 'upcoming'
      },
      {
        id: 2,
        date: '2024-01-24',
        time: '7:00 PM',
        topic: 'Writing Task Practice',
        status: 'upcoming'
      }
    ]
  },
  {
    id: 'group-2',
    type: 'group',
    title: 'IELTS Speaking Confidence Builder',
    instructor: 'Sarah Thompson',
    schedule: 'Tue/Thu 6:00 PM - 7:00 PM (GMT+8)',
    duration: '6 weeks',
    startDate: '2024-02-20',
    endDate: '2024-04-02',
    maxStudents: 12,
    enrolled: 8,
    price: 149.99,
    zoomLink: 'https://zoom.us/j/987654321',
    meetingId: '987 654 321',
    passcode: 'IELTS24',
    image: '/api/placeholder/300/200',
    description: 'Build confidence in IELTS Speaking through interactive group sessions.',
    features: ['Mock Interviews', 'Peer Practice', 'Fluency Drills', 'Feedback Sessions'],
    preChecklist: [
      { id: 1, task: 'Take speaking assessment', completed: false },
      { id: 2, task: 'Prepare introduction speech', completed: false }
    ],
    postChecklist: [
      { id: 1, task: 'Practice daily speaking', completed: false },
      { id: 2, task: 'Record self-assessment', completed: false }
    ],
    upcomingSessions: []
  }
]

// One-on-One Classes Data
export const oneOnOneClasses = [
  {
    id: 'one-1',
    type: '1-1',
    title: 'Personal PTE Coaching Session',
    instructor: 'Dr. Lisa Park',
    nextSession: '2024-01-25T14:00:00Z',
    duration: '60 minutes',
    price: 89.99,
    sessionsRemaining: 3,
    totalSessions: 10,
    zoomLink: 'https://zoom.us/j/555666777',
    meetingId: '555 666 777',
    passcode: 'COACH24',
    image: '/api/placeholder/300/200',
    description: 'Personalized one-on-one coaching tailored to your PTE goals.',
    features: ['Customized Curriculum', 'Real-time Feedback', 'Flexible Scheduling', 'Progress Reports'],
    focusAreas: ['Speaking Fluency', 'Writing Structure', 'Reading Speed', 'Listening Accuracy'],
    upcomingSessions: [
      {
        id: 1,
        date: '2024-01-25',
        time: '2:00 PM',
        topic: 'Speaking Assessment & Improvement Plan',
        status: 'confirmed'
      },
      {
        id: 2,
        date: '2024-01-30',
        time: '2:00 PM',
        topic: 'Writing Task Practice & Feedback',
        status: 'pending'
      }
    ],
    calendarEvents: [
      {
        title: 'PTE Coaching Session',
        start: '2024-01-25T14:00:00Z',
        end: '2024-01-25T15:00:00Z',
        description: 'Personal coaching session with Dr. Lisa Park'
      }
    ]
  },
  {
    id: 'one-2',
    type: '1-1',
    title: 'IELTS Speaking Intensive',
    instructor: 'Mark Johnson',
    nextSession: '2024-01-28T10:00:00Z',
    duration: '45 minutes',
    price: 69.99,
    sessionsRemaining: 5,
    totalSessions: 8,
    zoomLink: 'https://zoom.us/j/888999000',
    meetingId: '888 999 000',
    passcode: 'SPEAK24',
    image: '/api/placeholder/300/200',
    description: 'Intensive speaking practice for IELTS Band 7+ achievement.',
    features: ['Mock Tests', 'Pronunciation Training', 'Vocabulary Building', 'Confidence Building'],
    focusAreas: ['Fluency & Coherence', 'Pronunciation', 'Lexical Resource', 'Grammar Range'],
    upcomingSessions: [
      {
        id: 1,
        date: '2024-01-28',
        time: '10:00 AM',
        topic: 'Part 2 & 3 Practice',
        status: 'confirmed'
      }
    ],
    calendarEvents: []
  }
]

// Combined export for backward compatibility
export const courses = [...shortCourses, ...groupClasses, ...oneOnOneClasses]

// Practice Tests Data
export const practiceTests = [
  {
    id: 'practice-1',
    title: 'PTE Academic Full Mock Test #1',
    type: 'full_test',
    duration: '3 hours',
    sections: ['Speaking', 'Writing', 'Reading', 'Listening'],
    difficulty: 'Intermediate',
    attempts: 0,
    maxAttempts: 3,
    price: 0,
    description: 'Complete PTE Academic practice test with AI scoring.'
  },
  {
    id: 'practice-2',
    title: 'IELTS Speaking Mock Interview',
    type: 'speaking_only',
    duration: '15 minutes',
    sections: ['Speaking'],
    difficulty: 'Advanced',
    attempts: 2,
    maxAttempts: 5,
    price: 9.99,
    description: 'Realistic IELTS speaking test simulation.'
  },
  {
    id: 'practice-3',
    title: 'Grammar Quick Assessment',
    type: 'skill_test',
    duration: '30 minutes',
    sections: ['Grammar'],
    difficulty: 'Beginner',
    attempts: 1,
    maxAttempts: 999,
    price: 0,
    description: 'Test your grammar knowledge with instant feedback.'
  }
]