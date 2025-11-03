// Mock data for Student Center page

export const activitySummary = {
  totalHours: 12.5,
  lastLogin: '2h ago',
  recentActivity: 'Watched Grammar Video',
  downloads: 5,
  videoViews: 18
}

export const bookLibrary = [
  {
    id: 1,
    title: 'English Grammar in Use',
    progress: 75,
    status: 'read',
    bookmarks: 12
  },
  {
    id: 2,
    title: 'IELTS Vocabulary Builder',
    progress: 45,
    status: 'read',
    bookmarks: 8
  },
  {
    id: 3,
    title: 'Business English Essentials',
    progress: 0,
    status: 'unread',
    bookmarks: 0
  },
  {
    id: 4,
    title: 'Academic Writing Guide',
    progress: 30,
    status: 'read',
    bookmarks: 5
  },
  {
    id: 5,
    title: 'Pronunciation Masterclass',
    progress: 0,
    status: 'unread',
    bookmarks: 0
  }
]

export const enrolledCourses = [
  {
    id: 1,
    name: 'IELTS Preparation Course',
    progress: 68,
    expiresIn: 45
  },
  {
    id: 2,
    name: 'Business English Communication',
    progress: 32,
    expiresIn: 78
  },
  {
    id: 3,
    name: 'Academic Writing Skills',
    progress: 85,
    expiresIn: 12
  }
]

export const studyProgress = [
  {
    id: 1,
    courseName: 'IELTS Preparation Course',
    progress: 70,
    lessons: { completed: 14, total: 20 },
    videos: { completed: 28, total: 40 },
    practices: { completed: 12, total: 15 }
  },
  {
    id: 2,
    courseName: 'Business English Communication',
    progress: 45,
    lessons: { completed: 9, total: 20 },
    videos: { completed: 18, total: 40 },
    practices: { completed: 6, total: 15 }
  },
  {
    id: 3,
    courseName: 'Academic Writing Skills',
    progress: 85,
    lessons: { completed: 17, total: 20 },
    videos: { completed: 35, total: 40 },
    practices: { completed: 13, total: 15 }
  }
]

export const practices = [
  {
    id: 1,
    date: '2024-01-15',
    overallScore: 85,
    skills: {
      listening: 88,
      reading: 82,
      writing: 80,
      speaking: 90
    }
  },
  {
    id: 2,
    date: '2024-01-14',
    overallScore: 78,
    skills: {
      listening: 75,
      reading: 80,
      writing: 75,
      speaking: 82
    }
  },
  {
    id: 3,
    date: '2024-01-13',
    overallScore: 82,
    skills: {
      listening: 85,
      reading: 78,
      writing: 80,
      speaking: 85
    }
  },
  {
    id: 4,
    date: '2024-01-12',
    overallScore: 76,
    skills: {
      listening: 72,
      reading: 78,
      writing: 75,
      speaking: 79
    }
  },
  {
    id: 5,
    date: '2024-01-11',
    overallScore: 80,
    skills: {
      listening: 82,
      reading: 75,
      writing: 78,
      speaking: 85
    }
  },
  {
    id: 6,
    date: '2024-01-10',
    overallScore: 74,
    skills: {
      listening: 70,
      reading: 76,
      writing: 72,
      speaking: 78
    }
  },
  {
    id: 7,
    date: '2024-01-09',
    overallScore: 77,
    skills: {
      listening: 75,
      reading: 80,
      writing: 74,
      speaking: 79
    }
  }
]

export const scoresTrendData = practices.map(practice => ({
  date: practice.date,
  score: practice.overallScore,
  listening: practice.skills.listening,
  reading: practice.skills.reading,
  writing: practice.skills.writing,
  speaking: practice.skills.speaking
})).reverse()

export const weeklyTasks = [
  {
    date: '2024-01-15',
    dayName: 'Monday',
    tasks: [
      {
        id: 1,
        type: 'video',
        title: 'Watch Grammar Basics',
        status: 'completed',
        notes: 'Completed all exercises'
      },
      {
        id: 2,
        type: 'quiz',
        title: 'Grammar Quiz #3',
        status: 'completed',
        notes: 'Score: 85%'
      },
      {
        id: 3,
        type: 'reading',
        title: 'Read Chapter 5',
        status: 'not_started',
        notes: ''
      }
    ]
  },
  {
    date: '2024-01-16',
    dayName: 'Tuesday',
    tasks: [
      {
        id: 4,
        type: 'video',
        title: 'Listening Practice Session',
        status: 'completed',
        notes: 'Good progress on accent recognition'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Vocabulary Test',
        status: 'not_started',
        notes: ''
      },
      {
        id: 6,
        type: 'reading',
        title: 'Academic Article Analysis',
        status: 'not_started',
        notes: ''
      }
    ]
  },
  {
    date: '2024-01-17',
    dayName: 'Wednesday',
    tasks: [
      {
        id: 7,
        type: 'video',
        title: 'Speaking Techniques',
        status: 'not_started',
        notes: ''
      },
      {
        id: 8,
        type: 'quiz',
        title: 'Pronunciation Check',
        status: 'not_started',
        notes: ''
      },
      {
        id: 9,
        type: 'reading',
        title: 'Business Case Study',
        status: 'not_started',
        notes: ''
      }
    ]
  },
  {
    date: '2024-01-18',
    dayName: 'Thursday',
    tasks: [
      {
        id: 10,
        type: 'video',
        title: 'Writing Structure',
        status: 'not_started',
        notes: ''
      },
      {
        id: 11,
        type: 'quiz',
        title: 'Essay Planning Quiz',
        status: 'not_started',
        notes: ''
      },
      {
        id: 12,
        type: 'reading',
        title: 'Sample Essays Review',
        status: 'not_started',
        notes: ''
      }
    ]
  },
  {
    date: '2024-01-19',
    dayName: 'Friday',
    tasks: [
      {
        id: 13,
        type: 'video',
        title: 'Mock Test Review',
        status: 'not_started',
        notes: ''
      },
      {
        id: 14,
        type: 'quiz',
        title: 'Weekly Assessment',
        status: 'not_started',
        notes: ''
      },
      {
        id: 15,
        type: 'reading',
        title: 'Progress Summary',
        status: 'not_started',
        notes: ''
      }
    ]
  },
  {
    date: '2024-01-20',
    dayName: 'Saturday',
    tasks: [
      {
        id: 16,
        type: 'video',
        title: 'Weekend Review Session',
        status: 'not_started',
        notes: ''
      },
      {
        id: 17,
        type: 'quiz',
        title: 'Self-Assessment',
        status: 'not_started',
        notes: ''
      }
    ]
  },
  {
    date: '2024-01-21',
    dayName: 'Sunday',
    tasks: [
      {
        id: 18,
        type: 'reading',
        title: 'Weekly Reading Challenge',
        status: 'not_started',
        notes: ''
      }
    ]
  }
]

export const privileges = [
  {
    id: 1,
    title: 'Priority Support',
    description: '24/7 dedicated support with response time under 2 hours',
    icon: 'headphones'
  },
  {
    id: 2,
    title: 'Course Discounts',
    description: 'Up to 30% discount on all premium courses and materials',
    icon: 'percent'
  },
  {
    id: 3,
    title: 'Exclusive Content',
    description: 'Access to premium video content and advanced practice tests',
    icon: 'star'
  },
  {
    id: 4,
    title: 'Personal Tutor',
    description: 'One-on-one sessions with certified English instructors',
    icon: 'user'
  },
  {
    id: 5,
    title: 'Progress Analytics',
    description: 'Detailed performance analytics and personalized recommendations',
    icon: 'trending-up'
  },
  {
    id: 6,
    title: 'Certificate Priority',
    description: 'Fast-track certificate processing and verification',
    icon: 'award'
  }
]