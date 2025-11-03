// Mock data for user progress tracking across all materials

export const userProgress = {
  userId: 1,
  userName: "Nguyễn Văn A",
  overallStats: {
    totalCoursesEnrolled: 3,
    totalCoursesCompleted: 1,
    totalBooksOwned: 5,
    totalBooksRead: 2,
    totalTestsTaken: 8,
    totalTestsPassed: 6,
    averageScore: 82.5,
    totalStudyHours: 45.5,
    currentStreak: 7, // days
    longestStreak: 15,
    lastActivityDate: "2024-01-20",
    joinDate: "2023-12-01",
    skillLevels: {
      speaking: 75,
      listening: 82,
      reading: 88,
      writing: 70,
      grammar: 85,
      vocabulary: 78
    }
  },
  
  // Course progress tracking
  courseProgress: [
    {
      courseId: 1,
      courseTitle: "PTE Academic Speaking Mastery",
      enrollmentDate: "2024-01-01",
      status: "completed",
      completionDate: "2024-01-18",
      progress: 100,
      currentLesson: null,
      completedLessons: [1, 2, 3, 4, 5, 6, 7, 8],
      totalLessons: 8,
      timeSpent: 12.5, // hours
      lastAccessDate: "2024-01-18",
      certificateEarned: true,
      certificateId: "CERT-PTE-SP-001",
      finalScore: 88,
      lessonProgress: [
        { lessonId: 1, title: "Introduction to PTE Speaking", completed: true, score: 85, timeSpent: 1.5, completedAt: "2024-01-02" },
        { lessonId: 2, title: "Personal Introduction", completed: true, score: 90, timeSpent: 1.8, completedAt: "2024-01-04" },
        { lessonId: 3, title: "Read Aloud Techniques", completed: true, score: 82, timeSpent: 2.0, completedAt: "2024-01-06" },
        { lessonId: 4, title: "Repeat Sentence", completed: true, score: 88, timeSpent: 1.2, completedAt: "2024-01-08" },
        { lessonId: 5, title: "Describe Image", completed: true, score: 85, timeSpent: 2.5, completedAt: "2024-01-10" },
        { lessonId: 6, title: "Re-tell Lecture", completed: true, score: 92, timeSpent: 2.0, completedAt: "2024-01-12" },
        { lessonId: 7, title: "Answer Short Question", completed: true, score: 87, timeSpent: 1.0, completedAt: "2024-01-15" },
        { lessonId: 8, title: "Final Speaking Assessment", completed: true, score: 88, timeSpent: 0.5, completedAt: "2024-01-18" }
      ],
      assignments: [
        { id: 1, title: "Speaking Practice 1", submitted: true, score: 85, submittedAt: "2024-01-05" },
        { id: 2, title: "Speaking Practice 2", submitted: true, score: 90, submittedAt: "2024-01-12" },
        { id: 3, title: "Final Speaking Project", submitted: true, score: 88, submittedAt: "2024-01-18" }
      ],
      notes: [
        { id: 1, lessonId: 2, content: "Remember to speak clearly and at moderate pace", createdAt: "2024-01-04" },
        { id: 2, lessonId: 5, content: "Focus on describing main elements first, then details", createdAt: "2024-01-10" }
      ]
    },
    {
      courseId: 2,
      courseTitle: "PTE Academic Writing Excellence",
      enrollmentDate: "2024-01-10",
      status: "in_progress",
      completionDate: null,
      progress: 60,
      currentLesson: 5,
      completedLessons: [1, 2, 3, 4],
      totalLessons: 8,
      timeSpent: 8.5,
      lastAccessDate: "2024-01-20",
      certificateEarned: false,
      finalScore: null,
      lessonProgress: [
        { lessonId: 1, title: "Writing Fundamentals", completed: true, score: 82, timeSpent: 2.0, completedAt: "2024-01-11" },
        { lessonId: 2, title: "Essay Structure", completed: true, score: 85, timeSpent: 2.5, completedAt: "2024-01-13" },
        { lessonId: 3, title: "Summarize Written Text", completed: true, score: 78, timeSpent: 2.0, completedAt: "2024-01-15" },
        { lessonId: 4, title: "Write Essay", completed: true, score: 80, timeSpent: 2.0, completedAt: "2024-01-17" },
        { lessonId: 5, title: "Advanced Writing Techniques", completed: false, score: null, timeSpent: 0, completedAt: null },
        { lessonId: 6, title: "Grammar and Vocabulary", completed: false, score: null, timeSpent: 0, completedAt: null },
        { lessonId: 7, title: "Practice Tests", completed: false, score: null, timeSpent: 0, completedAt: null },
        { lessonId: 8, title: "Final Assessment", completed: false, score: null, timeSpent: 0, completedAt: null }
      ],
      assignments: [
        { id: 1, title: "Essay Practice 1", submitted: true, score: 82, submittedAt: "2024-01-14" },
        { id: 2, title: "Summary Practice", submitted: true, score: 78, submittedAt: "2024-01-16" },
        { id: 3, title: "Essay Practice 2", submitted: false, score: null, submittedAt: null }
      ],
      notes: [
        { id: 1, lessonId: 3, content: "Focus on identifying main points quickly", createdAt: "2024-01-15" },
        { id: 2, lessonId: 4, content: "Use more transition words between paragraphs", createdAt: "2024-01-17" }
      ]
    }
  ],

  // Book reading progress
  bookProgress: [
    {
      bookId: 1,
      bookTitle: "PTE Academic Official Guide 2024",
      purchaseDate: "2024-01-05",
      status: "completed",
      progress: 100,
      currentPage: 320,
      totalPages: 320,
      readingTime: 15.5, // hours
      lastReadDate: "2024-01-19",
      startDate: "2024-01-05",
      completionDate: "2024-01-19",
      bookmarks: [
        { page: 45, note: "Important speaking tips", createdAt: "2024-01-06" },
        { page: 128, note: "Writing essay templates", createdAt: "2024-01-10" },
        { page: 205, note: "Reading strategies", createdAt: "2024-01-15" }
      ],
      highlights: [
        { page: 67, text: "Practice makes perfect in PTE preparation", createdAt: "2024-01-07" },
        { page: 156, text: "Time management is crucial for success", createdAt: "2024-01-12" }
      ],
      notes: [
        { page: 89, content: "Remember to practice daily speaking exercises", createdAt: "2024-01-08" },
        { page: 178, content: "Focus on academic vocabulary building", createdAt: "2024-01-13" }
      ],
      readingSessions: [
        { date: "2024-01-05", duration: 2.0, pagesRead: 25, startPage: 1, endPage: 25 },
        { date: "2024-01-06", duration: 1.5, pagesRead: 20, startPage: 26, endPage: 45 },
        { date: "2024-01-07", duration: 2.5, pagesRead: 30, startPage: 46, endPage: 75 }
        // ... more sessions
      ],
      userRating: 5,
      userReview: "Excellent comprehensive guide for PTE preparation. Highly recommended!",
      reviewDate: "2024-01-19"
    },
    {
      bookId: 2,
      bookTitle: "Advanced English Grammar for PTE",
      purchaseDate: "2024-01-12",
      status: "in_progress",
      progress: 45,
      currentPage: 135,
      totalPages: 300,
      readingTime: 6.5,
      lastReadDate: "2024-01-20",
      startDate: "2024-01-12",
      completionDate: null,
      bookmarks: [
        { page: 78, note: "Complex sentence structures", createdAt: "2024-01-14" },
        { page: 112, note: "Conditional sentences examples", createdAt: "2024-01-18" }
      ],
      highlights: [
        { page: 95, text: "Grammar accuracy affects overall PTE score", createdAt: "2024-01-16" }
      ],
      notes: [
        { page: 67, content: "Practice these grammar exercises daily", createdAt: "2024-01-14" }
      ],
      readingSessions: [
        { date: "2024-01-12", duration: 1.5, pagesRead: 25, startPage: 1, endPage: 25 },
        { date: "2024-01-14", duration: 2.0, pagesRead: 30, startPage: 26, endPage: 55 },
        { date: "2024-01-16", duration: 1.5, pagesRead: 25, startPage: 56, endPage: 80 },
        { date: "2024-01-18", duration: 1.0, pagesRead: 20, startPage: 81, endPage: 100 },
        { date: "2024-01-20", duration: 0.5, pagesRead: 35, startPage: 101, endPage: 135 }
      ],
      userRating: null,
      userReview: null,
      reviewDate: null
    }
  ],

  // Practice test progress
  testProgress: [
    {
      testId: 1,
      testTitle: "Speaking Mini Test 1",
      attempts: [
        {
          attemptNumber: 1,
          completedAt: "2024-01-15T10:30:00Z",
          score: 85,
          maxScore: 100,
          timeSpent: 12,
          status: "completed",
          answers: [
            { questionId: 1, userAnswer: "personal_intro_response", correct: true, score: 85 },
            { questionId: 2, userAnswer: "image_description_response", correct: true, score: 88 }
          ],
          feedback: {
            strengths: ["Clear pronunciation", "Good vocabulary usage"],
            weaknesses: ["Speaking pace could be improved", "More complex sentence structures needed"],
            recommendations: ["Practice speaking at a steady pace", "Use more linking words"]
          }
        }
      ],
      bestScore: 85,
      averageScore: 85,
      totalAttempts: 1,
      lastAttemptDate: "2024-01-15",
      skillImprovement: {
        content: { initial: 80, current: 85, improvement: 5 },
        fluency: { initial: 75, current: 88, improvement: 13 },
        pronunciation: { initial: 82, current: 85, improvement: 3 }
      }
    },
    {
      testId: 2,
      testTitle: "Reading Progress Test",
      attempts: [
        {
          attemptNumber: 1,
          completedAt: "2024-01-18T14:20:00Z",
          score: 78,
          maxScore: 100,
          timeSpent: 28,
          status: "completed",
          answers: [
            { questionId: 1, userAnswer: 1, correct: true, score: 80 },
            { questionId: 2, userAnswer: ["carefully", "various"], correct: true, score: 85 }
          ],
          feedback: {
            strengths: ["Good comprehension of main ideas", "Strong vocabulary knowledge"],
            weaknesses: ["Time management needs improvement", "Detail questions challenging"],
            recommendations: ["Practice skimming techniques", "Focus on identifying key details"]
          }
        }
      ],
      bestScore: 78,
      averageScore: 78,
      totalAttempts: 1,
      lastAttemptDate: "2024-01-18",
      skillImprovement: {
        mainIdea: { initial: 80, current: 85, improvement: 5 },
        details: { initial: 65, current: 72, improvement: 7 },
        vocabulary: { initial: 78, current: 82, improvement: 4 }
      }
    }
  ],

  // Study goals and achievements
  studyGoals: [
    {
      id: 1,
      title: "Complete PTE Speaking Course",
      description: "Finish all lessons in PTE Academic Speaking Mastery course",
      targetDate: "2024-01-20",
      status: "completed",
      completedDate: "2024-01-18",
      progress: 100,
      type: "course"
    },
    {
      id: 2,
      title: "Read 3 PTE Books",
      description: "Complete reading 3 PTE preparation books",
      targetDate: "2024-02-15",
      status: "in_progress",
      completedDate: null,
      progress: 67, // 2 out of 3 books
      type: "reading"
    },
    {
      id: 3,
      title: "Score 85+ in Practice Tests",
      description: "Achieve average score of 85 or higher in practice tests",
      targetDate: "2024-02-01",
      status: "in_progress",
      completedDate: null,
      progress: 75,
      type: "testing"
    }
  ],

  // Achievements and badges
  achievements: [
    {
      id: 1,
      title: "First Course Completed",
      description: "Successfully completed your first PTE course",
      earnedDate: "2024-01-18",
      icon: "🎓",
      category: "milestone"
    },
    {
      id: 2,
      title: "Speaking Master",
      description: "Scored 85+ in speaking assessment",
      earnedDate: "2024-01-15",
      icon: "🗣️",
      category: "skill"
    },
    {
      id: 3,
      title: "Consistent Learner",
      description: "Studied for 7 consecutive days",
      earnedDate: "2024-01-20",
      icon: "🔥",
      category: "consistency"
    },
    {
      id: 4,
      title: "Bookworm",
      description: "Completed reading 2 PTE books",
      earnedDate: "2024-01-19",
      icon: "📚",
      category: "reading"
    }
  ],

  // Weekly and monthly statistics
  weeklyStats: {
    currentWeek: {
      weekStart: "2024-01-15",
      weekEnd: "2024-01-21",
      studyHours: 8.5,
      lessonsCompleted: 3,
      testsCompleted: 2,
      pagesRead: 85,
      averageScore: 83
    },
    previousWeek: {
      weekStart: "2024-01-08",
      weekEnd: "2024-01-14",
      studyHours: 12.0,
      lessonsCompleted: 5,
      testsCompleted: 1,
      pagesRead: 120,
      averageScore: 80
    }
  },

  monthlyStats: {
    currentMonth: {
      month: "January 2024",
      studyHours: 45.5,
      lessonsCompleted: 12,
      testsCompleted: 8,
      pagesRead: 455,
      coursesCompleted: 1,
      booksCompleted: 2,
      averageScore: 82.5
    }
  },

  // Learning preferences and recommendations
  learningProfile: {
    preferredStudyTime: "evening", // morning, afternoon, evening
    studyDuration: 2, // hours per session
    weakestSkills: ["writing", "time_management"],
    strongestSkills: ["reading", "grammar"],
    learningStyle: "visual", // visual, auditory, kinesthetic
    recommendedNextActions: [
      "Focus on writing practice exercises",
      "Take more timed practice tests",
      "Review grammar fundamentals",
      "Practice speaking with time limits"
    ]
  }
};

// Helper functions for progress calculations
export const calculateOverallProgress = (userId) => {
  const user = userProgress;
  const totalMaterials = user.courseProgress.length + user.bookProgress.length + user.testProgress.length;
  const completedMaterials = 
    user.courseProgress.filter(c => c.status === 'completed').length +
    user.bookProgress.filter(b => b.status === 'completed').length +
    user.testProgress.filter(t => t.bestScore >= 70).length; // Consider passed if score >= 70
  
  return Math.round((completedMaterials / totalMaterials) * 100);
};

export const getRecentActivity = (userId, days = 7) => {
  const user = userProgress;
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  const activities = [];
  
  // Add course activities
  user.courseProgress.forEach(course => {
    course.lessonProgress.forEach(lesson => {
      if (lesson.completedAt && new Date(lesson.completedAt) >= cutoffDate) {
        activities.push({
          type: 'lesson',
          title: lesson.title,
          course: course.courseTitle,
          date: lesson.completedAt,
          score: lesson.score
        });
      }
    });
  });
  
  // Add test activities
  user.testProgress.forEach(test => {
    test.attempts.forEach(attempt => {
      if (new Date(attempt.completedAt) >= cutoffDate) {
        activities.push({
          type: 'test',
          title: test.testTitle,
          date: attempt.completedAt,
          score: attempt.score
        });
      }
    });
  });
  
  // Add reading activities
  user.bookProgress.forEach(book => {
    book.readingSessions?.forEach(session => {
      if (new Date(session.date) >= cutoffDate) {
        activities.push({
          type: 'reading',
          title: book.bookTitle,
          date: session.date,
          duration: session.duration,
          pages: session.pagesRead
        });
      }
    });
  });
  
  return activities.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getSkillProgress = (userId, skill) => {
  const user = userProgress;
  return user.overallStats.skillLevels[skill] || 0;
};

export const getNextRecommendations = (userId) => {
  const user = userProgress;
  return user.learningProfile.recommendedNextActions;
};